import type { CanvasHTMLAttributes, ReactElement } from 'react'
import { useRef, useEffect } from 'react'
import { useDataTheme } from '../Hooks/useDataTheme'
import { cn } from '../utils/utils'

class ParticleLogoEffect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private particles: ParticleCords[] = []
  private mouse: { x: number, y: number } | null = null
  private animationId: number | null = null
  private readonly dpr: number
  private readonly config: RequiredConfigProps

  constructor (canvas: HTMLCanvasElement, config: RequiredConfigProps) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas')
    this.ctx = ctx
    this.dpr = window.devicePixelRatio || 1
    this.config = config

    this.setupCanvas()
    this.generateParticles()
    this.animate = this.animate.bind(this)
    this.animate()
  }

  private setupCanvas (): void {
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * this.dpr
    this.canvas.height = rect.height * this.dpr
    this.canvas.style.width = `${rect.width}px`
    this.canvas.style.height = `${rect.height}px`
    this.ctx.scale(this.dpr, this.dpr)
    this.ctx.imageSmoothingEnabled = true
    if (this.ctx.imageSmoothingQuality) this.ctx.imageSmoothingQuality = 'high'
  }

  private createTextMask (): ImageData {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.font = `bold ${this.config.fontSize || 50}px ${this.config.fontFamily || 'sans-serif'}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = `${this.config.color || '#fff'}`

    this.ctx.fillText(this.config.text, this.canvas.width / 2, this.canvas.height / 2)

    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  private extractPositions (imageData: ImageData): PixelInfo[] {
    const positions: PixelInfo[] = []
    const { data, width, height } = imageData

    // 1. Definir densidad objetivo: 1 partícula cada 4 píxeles (ajustable)
    const targetPixelPerParticle = 4
    const maxAcceptableStep = Math.max(1, targetPixelPerParticle)

    // 2. Primero: contar cuántos píxeles visibles hay
    let visiblePixelCount = 0
    for (let i = 0; i < data.length; i += 4) {
      const [a] = data.slice(i, i + 4)
      if (a > 50) {
        visiblePixelCount++
      }
    }

    // 3. Calcular step óptimo para cubrir sin huecos
    const estimatedStep = Math.max(
      1,
      Math.floor(Math.sqrt(visiblePixelCount / (this.config.particles || 6000)))
    )
    const step = Math.min(maxAcceptableStep, estimatedStep)

    // 4. Recorrer la imagen con el step calculado
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4
        const [a] = data.slice(idx, idx + 4)
        const isVisible = a > 50

        if (isVisible) {
          positions.push({
            x: x / this.dpr,
            y: y / this.dpr
          })
        }
      }
    }

    return positions
  }

  private generateParticles (): void {
    const imageData = this.createTextMask()
    const positions = this.extractPositions(imageData)

    if (positions.length === 0) {
      console.warn('No se encontraron píxeles visibles en la imagen')
      return
    }

    // Radio grande para que salgan de la pantalla
    const scatterRadius = Math.max(this.canvas.width, this.canvas.height) * 2

    this.particles = positions.map(pos => ({
      tx: pos.x, // posición final (píxel real)
      ty: pos.y,
      // posición inicial: fuera del canvas
      x: pos.x + (Math.random() - 0.5) * scatterRadius,
      y: pos.y + (Math.random() - 0.5) * scatterRadius,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2, // 0…2π
      age: 0,
      isImmune: Math.random() < 0.05 // ≈ 5 % no se repelen
    }))
  }

  private updateParticle (p: ParticleCords): void {
    const dx = p.tx - p.x
    const dy = p.ty - p.y

    if (this.mouse && this.config.attractMode) {
      const mx = this.mouse.x - p.x
      const my = this.mouse.y - p.y
      const dist = Math.hypot(mx, my)

      if (dist < this.config.repulsion && dist > 0) {
        const force = Math.max(0, 1 - dist / this.config.repulsion)
        const strength = 10 * force // fuerza suave
        p.vx += (mx / dist) * strength // + en vez de –
        p.vy += (my / dist) * strength
      }
    } else if (this.mouse && !this.config.attractMode) {
      const mx = this.mouse.x - p.x
      const my = this.mouse.y - p.y
      const dist = Math.hypot(mx, my)

      if (dist < this.config.repulsion && dist > 0) {
        let force: number

        if (!this.config.trace) {
          // Repulsión fuerte para todos
          force = Math.max(0, 1 - dist / this.config.repulsion)
        } else {
          // Repulsión suave o nula según isImmune
          if (p.isImmune) {
            // Suavísima o nula
            force = (this.config.repulsion - dist) / this.config.repulsion * 0.1
          } else {
            // Suave
            force = Math.max(0, 1 - dist / this.config.repulsion)
          }
        }

        const strength = 20 * force
        p.vx -= (mx / dist) * strength
        p.vy -= (my / dist) * strength
      }
    }

    // Movimiento elástico hacia el destino
    const spring = 0.04
    const damping = 0.73
    p.vx += dx * spring
    p.vy += dy * spring
    p.vx *= damping
    p.vy *= damping

    p.x += p.vx
    p.y += p.vy
  }

  private drawParticles (): void {
    const canvasWidth = this.canvas.width / this.dpr
    const canvasHeight = this.canvas.height / this.dpr

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    for (const p of this.particles) {
      this.updateParticle(p)

      p.age += 1
      // ciclo de ~40 frames (puedes ajustar)
      const blink = (Math.sin(p.phase + p.age * 0.15) + 1) / 2 // 0…1

      this.ctx.fillStyle = this.config.color || '#fff'
      if (this.config.glow) this.ctx.globalAlpha = blink
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, this.config.dotSize, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.globalAlpha = 1 // reset
  }

  private readonly handleMouseMove = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect()
    this.mouse = {
      x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
      y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
    }
  }

  private readonly handleMouseLeave = (): void => {
    this.mouse = null
  }

  private animate (): void {
    this.drawParticles()
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave)
    this.animationId = requestAnimationFrame(this.animate)
  }

  public destroy (): void {
    this.canvas.removeEventListener('mousemove', this.handleMouseMove)
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave)
    if (this.animationId) cancelAnimationFrame(this.animationId)
  }
}

interface PixelInfo {
  x: number
  y: number
}

interface ParticleCords {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  phase: number
  age: number
  isImmune: boolean
}

interface RequiredConfigProps {
  text: string
  particles: number
  dotSize: number
  repulsion: number
  friction: number
  returnSpeed: number
  fontFamily: string
  fontSize: number
  color: string
  glow: boolean
  trace: boolean
  attractMode: boolean
}

interface MagicLogoProps extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'className'> {
  text: string
  particles?: number
  dotSize?: number
  repulsion?: number
  friction?: number
  returnSpeed?: number
  fontFamily?: string
  fontSize?: number
  color?: string
  glow?: boolean
  trace?: boolean
  attractMode?: boolean
  className?: string
}

export function MagicText ({
  text = 'Magic Text',
  particles = 500,
  dotSize = 0.9,
  repulsion = 50,
  friction = 0.82,
  returnSpeed = 0.01,
  fontFamily = 'sans-serif',
  fontSize = 50,
  color,
  glow = true,
  trace = true,
  attractMode = false,
  className,
  ...props
}: MagicLogoProps): ReactElement {
  const { theme } = useDataTheme()
  const textColorDetected = color || (theme === 'dark' ? '#fff' : '#000')
  console.log('Theme:', theme, 'Color detected:', textColorDetected)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Si se proporciona imageElement, validar que esté disponible
    if (!text) {
      console.warn('MagicText: text needed')
      return
    }

    /* -------------------  Construir el objeto final  ------------------ */
    const config: RequiredConfigProps = {
      text,
      particles,
      dotSize,
      repulsion,
      friction,
      returnSpeed,
      fontFamily,
      fontSize,
      color: textColorDetected,
      glow,
      trace,
      attractMode
    }

    const effect = new ParticleLogoEffect(canvas, config)

    return () => {
      if (effect) effect.destroy()
    }
  }, [text, particles, dotSize, repulsion, friction, returnSpeed, fontFamily, fontSize, theme, color, glow, trace, attractMode])

  return (
    <canvas
      ref={canvasRef}
      {...props}
      className={cn('block mx-auto overflow-visible z-0 w-fit h-fit', className)}
    />
  )
}
