import type { CanvasHTMLAttributes, ReactElement } from 'react'
import { useRef, useEffect } from 'react'
import { cn } from '../utils/utils'

class ParticleLogoEffect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private particles: ParticleCords[] = []
  private mouse: { x: number, y: number } | null = null
  private animationId: number | null = null
  private readonly dpr: number
  private readonly config: RequiredConfigProps
  private imageElement: HTMLImageElement | null = null

  constructor (canvas: HTMLCanvasElement, config: RequiredConfigProps) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas')
    this.ctx = ctx
    this.dpr = window.devicePixelRatio || 1
    this.config = config

    this.setupCanvas()
    void this.initializeEffect()
  }

  private async initializeEffect (): Promise<void> {
    // Si hay imagen o SVG, cargarlos primero
    try {
      if (this.config.imageUrl) {
        console.log('MagicLogo: Cargando imagen desde URL:', this.config.imageUrl)
        await this.loadImage(this.config.imageUrl)
      } else if (this.config.svgContent) {
        console.log('MagicLogo: Cargando SVG como imagen')
        await this.loadSVGAsImage(this.config.svgContent)
      } else if (this.config.imageElement) {
        console.log('MagicLogo: Cargando elemento de imagen existente')
        await this.loadImageElement(this.config.imageElement)
      }

      console.log('MagicLogo: Imagen cargada exitosamente, generando partículas...')
      this.generateParticles()
      this.setupEventListeners()
      this.animate = this.animate.bind(this)
      this.animate()
    } catch (error) {
      console.error('MagicLogo: Error al inicializar el efecto:', error)
    }
  }

  private async loadImage (url: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      const img = new Image()

      const handleLoad = (): void => {
        this.imageElement = img
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        resolve()
      }

      const handleError = (error: Event): void => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        reject(new Error(`Error al cargar la imagen desde URL: ${url} - ${error.type}`))
      }

      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
      img.crossOrigin = 'anonymous' // Para evitar problemas de CORS
      img.src = url

      // Timeout de seguridad
      setTimeout(() => {
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        reject(new Error(`Timeout: La imagen desde URL ${url} tardó demasiado en cargar`))
      }, 10000) // 10 segundos
    })
  }

  private async loadImageElement (imageElement: HTMLImageElement): Promise<void> {
    return await new Promise((resolve, reject) => {
      // Verificar si la imagen ya está cargada
      if (imageElement.complete && imageElement.naturalWidth > 0) {
        this.imageElement = imageElement
        resolve()
      } else {
        // Si no está cargada, esperar a que se cargue
        const handleLoad = (): void => {
          this.imageElement = imageElement
          imageElement.removeEventListener('load', handleLoad)
          imageElement.removeEventListener('error', handleError)
          resolve()
        }

        const handleError = (error: Event): void => {
          imageElement.removeEventListener('load', handleLoad)
          imageElement.removeEventListener('error', handleError)
          reject(new Error(`Error al cargar la imagen: ${error.type}`))
        }

        imageElement.addEventListener('load', handleLoad)
        imageElement.addEventListener('error', handleError)

        // Timeout de seguridad por si la imagen nunca se carga
        setTimeout(() => {
          imageElement.removeEventListener('load', handleLoad)
          imageElement.removeEventListener('error', handleError)
          reject(new Error('Timeout: La imagen tardó demasiado en cargar'))
        }, 10000) // 10 segundos
      }
    })
  }

  private async loadSVGAsImage (svgContent: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      const svg = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svg)

      const img = new Image()

      const handleLoad = (): void => {
        this.imageElement = img
        URL.revokeObjectURL(url) // Limpiar el URL temporal
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        resolve()
      }

      const handleError = (error: Event): void => {
        URL.revokeObjectURL(url) // Limpiar el URL temporal
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        reject(new Error(`Error al cargar SVG como imagen: ${error.type}`))
      }

      img.addEventListener('load', handleLoad)
      img.addEventListener('error', handleError)
      img.crossOrigin = 'anonymous' // Para evitar problemas de CORS
      img.src = url

      // Timeout de seguridad
      setTimeout(() => {
        URL.revokeObjectURL(url)
        img.removeEventListener('load', handleLoad)
        img.removeEventListener('error', handleError)
        reject(new Error('Timeout: El SVG tardó demasiado en cargar'))
      }, 10000) // 10 segundos
    })
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

  private createImageMask (): ImageData {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Para imágenes externas o SVG convertido a imagen
    if (this.imageElement) {
      this.drawImageToCanvas(this.imageElement)
    }

    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawImageToCanvas (img: HTMLImageElement): void {
    const cssWidth = this.canvas.width / this.dpr
    const cssHeight = this.canvas.height / this.dpr

    // 1. Factor para que la imagen *quepa* en el canvas
    const fitScale = Math.min(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)

    // 2. Dejar un 20 % de margen (80 % del canvas)
    const scale = fitScale * 0.8

    // 3. Dimensiones finales
    const drawWidth = img.naturalWidth * scale
    const drawHeight = img.naturalHeight * scale

    // 4. Centrar
    const drawX = (cssWidth - drawWidth) / 2
    const drawY = (cssHeight - drawHeight) / 2

    this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
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
      const [r, g, b, a] = data.slice(i, i + 4)
      if (a > 50 && (r < 220 || g < 220 || b < 220)) {
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
        const [r, g, b, a] = data.slice(idx, idx + 4)
        const isVisible = a > 50 && (r < 220 || g < 220 || b < 220)

        if (isVisible) {
          positions.push({
            x: x / this.dpr,
            y: y / this.dpr,
            color: `rgb(${r},${g},${b})`
          })
        }
      }
    }

    return positions
  }

  private generateParticles (): void {
    // Solo generar partículas si tenemos una imagen cargada
    if (!this.imageElement) {
      console.warn('No hay imagen cargada para generar partículas')
      return
    }

    const imageData = this.createImageMask()
    const positions = this.extractPositions(imageData)

    if (positions.length === 0) {
      console.warn('No se encontraron píxeles visibles en la imagen')
      return
    }

    // Radio grande para que salgan de la pantalla
    const scatterRadius = Math.max(this.canvas.width, this.canvas.height) * 2

    this.particles = positions.map((pos, idx) => ({
      tx: pos.x, // posición final (píxel real)
      ty: pos.y,
      // posición inicial: fuera del canvas
      x: pos.x + (Math.random() - 0.5) * scatterRadius,
      y: pos.y + (Math.random() - 0.5) * scatterRadius,
      vx: 0,
      vy: 0,
      color: pos.color,
      phase: Math.random() * Math.PI * 2, // 0…2π
      age: 0,
      order: idx
    }))
  }

  private updateParticle (p: ParticleCords): void {
    const dx = p.tx - p.x
    const dy = p.ty - p.y

    if (this.mouse) {
      const mx = this.mouse.x - p.x
      const my = this.mouse.y - p.y
      const dist = Math.hypot(mx, my)

      // espaciado fijo entre “capas”
      const spacing = 0.08 // píxeles entre partícula y partícula
      const targetRadius = p.order * spacing

      // fuerza proporcional a cuánto se desvía de su radio asignado
      const delta = dist - targetRadius
      const force = delta * 0.1 // 0.1 = suavidad

      if (dist > 0) {
        p.vx += (mx / dist) * force
        p.vy += (my / dist) * force
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

      this.ctx.fillStyle = this.config.color || p.color || '#fff'
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
      x: (e.clientX - rect.left) * (this.canvas.width / this.dpr / rect.width),
      y: (e.clientY - rect.top) * (this.canvas.height / this.dpr / rect.height)
    }
  }

  private readonly handleMouseLeave = (): void => {
    this.mouse = null
  }

  private animate (): void {
    this.drawParticles()
    this.animationId = requestAnimationFrame(this.animate)
  }

  private setupEventListeners (): void {
    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave)
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
  color: string
}

interface ParticleCords {
  tx: number
  ty: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  phase: number
  age: number
  order: number
}

// Union type discriminado para las fuentes de imagen
type ImageSource =
  | { imageUrl: string, imageElement?: never, svgContent?: never }
  | { imageUrl?: never, imageElement: HTMLImageElement, svgContent?: never }
  | { imageUrl?: never, imageElement?: never, svgContent: string }

type RequiredConfigProps = ImageSource & {
  particles: number
  dotSize: number
  repulsion: number
  friction: number
  returnSpeed: number
  color?: string
  glow: boolean
}

interface MagicMouseFollowerProps extends Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'className'> {
  particles?: number
  dotSize?: number
  repulsion?: number
  friction?: number
  returnSpeed?: number
  color?: string
  glow?: boolean
  className?: string
}

export function MagicMouseFollower ({
  imageUrl,
  imageElement,
  svgContent,
  particles = 750,
  dotSize = 0.9,
  repulsion = 80,
  friction = 0.82,
  returnSpeed = 0.01,
  color,
  glow = true,
  className,
  ...props
}: MagicMouseFollowerProps & ImageSource): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Si se proporciona imageElement, validar que esté disponible
    if (imageElement && (!imageElement.complete || imageElement.naturalWidth === 0)) {
      console.warn('MagicLogo: imageElement no está completamente cargado')
      return
    }

    /* ------------------- 1.  Elegir la rama correcta  ------------------- */
    let imageSource: ImageSource
    if (imageUrl != null) {
      imageSource = { imageUrl }
    } else if (imageElement != null) {
      imageSource = { imageElement }
    } else if (svgContent != null) {
      imageSource = { svgContent }
    } else {
      console.warn('MagicLogo: falta una fuente de imagen')
      return
    }

    /* ------------------- 2.  Construir el objeto final  ------------------ */
    const config: RequiredConfigProps = {
      particles,
      dotSize,
      repulsion,
      friction,
      returnSpeed,
      color,
      glow,
      ...imageSource
    }

    const effect = new ParticleLogoEffect(canvas, config)

    return () => {
      if (effect) effect.destroy()
    }
  }, [imageUrl, imageElement, svgContent, particles, dotSize, repulsion, friction, returnSpeed, color, glow])

  return (
    <canvas
      ref={canvasRef}
      {...props}
      className={cn('block mx-auto overflow-visible z-0 w-auto h-auto', className)}
    />
  )
}
