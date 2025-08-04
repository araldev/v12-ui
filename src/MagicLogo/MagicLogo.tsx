import type { ReactElement } from 'react'
import { useRef, useEffect } from 'react'

class ParticleLogoEffect {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private particles: ParticleCords[] = []
  private mouse: { x: number, y: number } | null = null
  private animationId: number | null = null
  private readonly dpr: number
  private readonly config: RequiredParticleCanvasProps
  private imageElement: HTMLImageElement | null = null

  constructor (canvas: HTMLCanvasElement, config: RequiredParticleCanvasProps) {
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
    this.ctx.clearRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr)

    // Para imágenes externas o SVG convertido a imagen
    if (this.imageElement) {
      this.drawImageToCanvas(this.imageElement)
    }

    return this.ctx.getImageData(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr)
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
    const totalPixels = imageData.width * imageData.height
    const step = Math.max(1, Math.floor(Math.sqrt(totalPixels / this.config.particles)))

    for (let y = 0; y < imageData.height; y += step) {
      for (let x = 0; x < imageData.width; x += step) {
        const idx = (y * imageData.width + x) * 4
        const [r, g, b, a] = imageData.data.slice(idx, idx + 4)

        // Para imágenes: verificar si el píxel no es transparente y no es blanco puro
        const isVisible = a > 50 && (r < 240 || g < 240 || b < 240)

        if (isVisible) {
          positions.push({
            x: x / this.dpr,
            y: y / this.dpr,
            color: `rgb(${r}, ${g}, ${b})`
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

    const shuffled = positions.sort(() => Math.random() - 0.5)
    const canvasWidth = this.canvas.width / this.dpr
    const canvasHeight = this.canvas.height / this.dpr

    this.particles = shuffled
      .slice(0, Math.min(this.config.particles, shuffled.length))
      .map(pos => ({
        tx: pos.x,
        ty: pos.y,
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: 0,
        vy: 0,
        color: pos.color
      }))
  }

  private updateParticle (p: ParticleCords): void {
    const dx = p.tx - p.x
    const dy = p.ty - p.y

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
    }

    // Aplicar retorno a la posición original
    p.vx += dx * this.config.returnSpeed
    p.vy += dy * this.config.returnSpeed

    // Aplicar fricción
    p.vx *= this.config.friction
    p.vy *= this.config.friction

    // Actualizar posición
    p.x += p.vx
    p.y += p.vy
  }

  private drawParticles (): void {
    const canvasWidth = this.canvas.width / this.dpr
    const canvasHeight = this.canvas.height / this.dpr

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    for (const p of this.particles) {
      this.updateParticle(p)
      this.ctx.fillStyle = `${this.config.color || p.color || '#fff'}`
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, this.config.dotSize, 0, Math.PI * 2)
      this.ctx.fill()
    }
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
}

// Union type discriminado para las fuentes de imagen
type ImageSource =
  | { imageUrl: string, imageElement?: never, svgContent?: never }
  | { imageUrl?: never, imageElement: HTMLImageElement, svgContent?: never }
  | { imageUrl?: never, imageElement?: never, svgContent: string }

interface MagicLogoProps {
  particles?: number
  dotSize?: number
  repulsion?: number
  friction?: number
  returnSpeed?: number
  color?: string
}

type RequiredParticleCanvasProps = Required<Omit<MagicLogoProps, 'color'>> & ImageSource & {
  color?: string
}

export function MagicLogo ({
  imageUrl,
  imageElement,
  svgContent,
  particles = 100000,
  dotSize = 1.5,
  repulsion = 50,
  friction = 0.82,
  returnSpeed = 0.01,
  color
}: MagicLogoProps & ImageSource): ReactElement {
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
    const config: RequiredParticleCanvasProps = {
      particles,
      dotSize,
      repulsion,
      friction,
      returnSpeed,
      color,
      ...imageSource
    }

    const effect = new ParticleLogoEffect(canvas, config)

    return () => {
      if (effect) effect.destroy()
    }
  }, [imageUrl, imageElement, svgContent, particles, dotSize, repulsion, friction, returnSpeed, color])

  return (
    <canvas
      ref={canvasRef}
      className='block mx-auto overflow-visible'
      style={{ width: '100%', height: '100%' }}
    />
  )
}
