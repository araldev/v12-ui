import { forwardRef, useEffect, useRef, useState } from 'react'
import type { Ref, ComponentPropsWithRef, ReactElement } from 'react'

type HexColor = `#${string}`

type PropsAnimatedBackground = {
  bubbleGradiant1?: [HexColor, HexColor]
  bubbleGradiant2?: [HexColor, HexColor]
  bubbleGradiant3?: [HexColor, HexColor]
  zIndex?: number
} & ComponentPropsWithRef<'div'>

interface PropsCanvasSize {
  width: number | null
  height: number | null
}

export const AnimatedBackground = forwardRef<HTMLDivElement, PropsAnimatedBackground>(({
  bubbleGradiant1 = ['#004e92', '#000428'],
  bubbleGradiant2 = ['#00C9FF', '#92FE9D'],
  bubbleGradiant3 = ['#e0f7f4', '#a3e9ff'],
  zIndex = -999,
  className = '',
  ...props
}: PropsAnimatedBackground,
ref: Ref<HTMLDivElement>): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasSize, setCanvasSize] = useState<PropsCanvasSize>({
    width: null,
    height: null
  })
  const idTimeoutRef = useRef< ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let idTimeout = idTimeoutRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let { width, height } = canvasSize

    width = (canvas.width = window.innerWidth)
    height = (canvas.height = window.innerHeight)

    const colors = [
      bubbleGradiant1,
      bubbleGradiant2,
      bubbleGradiant3
    ]

    const shadow = {
      colors: [
        { r: 0, g: 201, b: 255, a: 0.7 },
        { r: 0, g: 78, b: 146, a: 0.7 },
        { r: 224, g: 247, b: 244, a: 0.7 }
      ],
      blur: 10,
      spread: 10,
      x: 0,
      y: 0
    }

    const particles = Array.from({ length: 10 }, () => {
      const duration = Math.random() * 20 + 50 // 50s - 70s
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 15,
        scale: 0,
        speed: height / (duration * 60), // speed per frame
        duration,
        colorIndex: Math.floor(Math.random() * colors.length),
        shadowIndex: Math.floor(Math.random() * shadow.colors.length)
      }
    })

    function createRadialGradient (
      context: CanvasRenderingContext2D,
      x0: number,
      y0: number,
      r0: number = 0,
      x1: number,
      y1: number,
      r1: number,
      color1: string,
      color2: string
    ): CanvasGradient {
      const gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1)
      gradient.addColorStop(0, color1)
      gradient.addColorStop(1, color2)
      return gradient
    }

    function drawCircleWithShadow (
      x: number,
      y: number,
      baseRadius: number,
      startAngle: number,
      endAngle: number,
      ctx: CanvasRenderingContext2D,
      shadowColorIndex: number
    ): void {
      for (let i = 0; i < 3; i++) {
        const subtractAlpha = 0.2 * i
        const plusblur = 15 * i
        const spread = 4 * i
        const radius = baseRadius + spread

        ctx.beginPath()
        ctx.arc(x, y, radius, startAngle, endAngle)
        ctx.shadowColor = `rgba(
          ${shadow.colors[shadowColorIndex].r},
          ${shadow.colors[shadowColorIndex].g},
          ${shadow.colors[shadowColorIndex].b},
          ${shadow.colors[shadowColorIndex].a - subtractAlpha})`
        ctx.shadowBlur = shadow.blur + plusblur// Difuminado de la sombra
        ctx.shadowOffsetX = shadow.x // Desplazamiento horizontal
        ctx.shadowOffsetY = shadow.y
        ctx.fill()
        ctx.closePath()
      }
    }

    function draw (): void {
      if (!ctx || !width || !height) return

      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        p.y -= p.speed
        p.scale = Math.max(0, 1 - p.y / height)

        // reset if off screen
        if (p.y + p.r < -30) {
          p.y = height + Math.random() * 30
          p.x = Math.random() * width
          p.scale = 0
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.abs(p.r * p.scale), 0, Math.PI * 2)
        ctx.fillStyle = createRadialGradient(
          ctx,
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r,
          colors[p.colorIndex][0],
          colors[p.colorIndex][1]
        )
        ctx.fill()
        ctx.closePath()
        drawCircleWithShadow(
          p.x,
          p.y,
          Math.abs(p.r * p.scale),
          0,
          Math.PI * 2,
          ctx,
          p.colorIndex)
      })

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = (): void => {
      if (idTimeout) clearTimeout(idTimeout)

      idTimeout = setTimeout(() => {
        setCanvasSize(prevState => {
          const newWidth = canvas.width = window.innerWidth
          const newHeight = canvas.height = window.innerHeight

          if (prevState.width === newWidth && prevState.height === newHeight) return prevState

          return {
            width: newWidth,
            height: newHeight
          }
        })
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [canvasSize])

  return (
    <div style={{ zIndex }} className={`fixed top-0 left-0 pointer-events-none w-full h-screen ${className}`} {...props} ref={ref}>
      <canvas
        className='w-full h-full'
        ref={canvasRef}
      />
    </div>
  )
}
)
