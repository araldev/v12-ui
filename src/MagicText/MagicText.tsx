import type { ReactElement } from 'react'
import { useRef, useEffect } from 'react'
import { useDataTheme } from '../Hooks/useDataTheme'

class ParticleLogoEffect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private particles: any[] = []
  private mouse: { x: number, y: number } | null = null
  private animationId: number | null = null
  private readonly dpr: number
  private readonly config: Required<ParticleCanvasProps>

  constructor (canvas: HTMLCanvasElement, config: Required<ParticleCanvasProps>) {
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

    this.ctx.font = `bold ${this.config.fontSize || 80}px ${this.config.fontFamily || 'sans-serif'}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = `${this.config.textColor || '#fff'}`

    this.ctx.fillText(this.config.text, this.canvas.width / 2, this.canvas.height / 2)

    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  private extractPositions (imageData: ImageData): Array<{ x: number, y: number }> {
    const positions = []
    const totalPixels = imageData.width * imageData.height
    const step = Math.max(1, Math.floor(Math.sqrt(totalPixels / this.config.particles)))

    for (let y = 0; y < imageData.height; y += step) {
      for (let x = 0; x < imageData.width; x += step) {
        const idx = (y * imageData.width + x) * 4
        if (imageData.data[idx + 3] > 128) {
          positions.push({ x, y })
        }
      }
    }

    return positions
  }

  private generateParticles (): void {
    const imageData = this.createTextMask()
    const positions = this.extractPositions(imageData)

    const shuffled = positions.sort(() => Math.random() - 0.5)

    this.particles = shuffled
      .slice(0, Math.min(this.config.particles, shuffled.length))
      .map(pos => ({
        tx: pos.x,
        ty: pos.y,
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: 0,
        vy: 0
      }))
  }

  private updateParticle (p: ParticleCords): void {
    const dx = p.tx - p.x
    const dy = p.ty - p.y

    p.vx += dx * this.config.returnSpeed
    p.vy += dy * this.config.returnSpeed

    p.vx *= this.config.friction
    p.vy *= this.config.friction

    p.x += p.vx
    p.y += p.vy

    if (this.mouse) {
      const mx = this.mouse.x - p.x
      const my = this.mouse.y - p.y
      const dist = Math.hypot(mx, my)

      if (dist < this.config.repulsion && dist > 0) {
        const force = (this.config.repulsion - dist) / this.config.repulsion
        const repulsionStrength = 10
        p.vx -= (mx / dist) * force * repulsionStrength
        p.vy -= (my / dist) * force * repulsionStrength
      }

      // También aplicar retorno
      p.vx += dx * this.config.returnSpeed * 0.5
      p.vy += dy * this.config.returnSpeed * 0.5
    } else {
      // solo retorno
      p.vx += dx * this.config.returnSpeed
      p.vy += dy * this.config.returnSpeed
    }
  }

  private drawParticles (): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (const p of this.particles) {
      this.updateParticle(p)
      this.ctx.fillStyle = `${this.config.textColor || '#fff'}`
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, this.config.dotSize, 0, Math.PI * 2)
      this.ctx.fill()
    }
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

interface ParticleCords {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
}

type HexColor = `#${string}`

interface ParticleCanvasProps {
  text: string
  particles?: number
  dotSize?: number
  repulsion?: number
  friction?: number
  returnSpeed?: number
  fontFamily?: string
  fontSize?: number
  textColor?: HexColor
}

export function MagicText ({
  text = 'Magic Text',
  particles = 100000,
  dotSize = 1.5,
  repulsion = 100,
  friction = 0.82,
  returnSpeed = 0.01,
  fontFamily = 'sans-serif',
  fontSize = 80,
  textColor
}: ParticleCanvasProps): ReactElement {
  const { theme } = useDataTheme()
  const textColorDetected = textColor || (theme === 'dark' ? '#fff' : '#000')
  console.log('Theme:', theme, 'Color detected:', textColorDetected)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const effect = new ParticleLogoEffect(canvas, {
      text,
      particles,
      dotSize,
      repulsion,
      friction,
      returnSpeed,
      fontFamily,
      fontSize,
      textColor: textColorDetected
    })

    return () => {
      if (effect) effect.destroy()
    }
  }, [text, particles, dotSize, repulsion, friction, returnSpeed, fontFamily, fontSize, theme, textColor])

  return (
    <canvas
      ref={canvasRef}
      className='block mx-auto'
      style={{ width: '100%', height: '100%' }}
    />
  )
}
