import { forwardRef, useEffect, useRef, useState } from 'react'
import type { Ref, ComponentPropsWithRef, ReactElement } from 'react'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const div = cva("overflow-hidden fixed top-0 left-0 pointer-events-none w-full h-screen before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-black/30", {
  variants: {
    theme: {
      dark: 'bg-[#111117]',
      light: 'bg-[#ddd]',
      transparent: 'bg-transparent'
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
})

const canvas = cva('absolute inset-0 w-full h-full', {
  variants: {
    theme: {
      dark: 'bg-[radial-gradient(circle,_#111117_0%,_rgba(17,17,23,0)_100%)]',
      light: 'bg-[radial-gradient(circle,_#ddd_0%,_rgba(17,17,23,0)_100%)]',
      transparent: 'bg-transparent'
    }
  },
  defaultVariants: {
    theme: 'dark'
  }
})

type HexColor = `#${string}`

interface PropsAnimatedBackground extends
  ComponentPropsWithRef<'div'>,
  VariantProps<typeof div>,
  VariantProps<typeof canvas> {
  bubbleGradiant1?: [HexColor, HexColor]
  bubbleGradiant2?: [HexColor, HexColor]
  bubbleGradiant3?: [HexColor, HexColor]
  zIndex?: number
}

interface PropsCanvasSize {
  width: number
  height: number
}

export const AnimatedBackground = forwardRef<HTMLDivElement, PropsAnimatedBackground>(({
  theme,
  bubbleGradiant1 = ['#004e92', '#000428'],
  bubbleGradiant2 = ['#00C9FF', '#92FE9D'],
  bubbleGradiant3 = ['#e0f7f4', '#a3e9ff'],
  zIndex = -9999,
  className = '',
  ...props
}: PropsAnimatedBackground,
ref: Ref<HTMLDivElement>): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasSize, setCanvasSize] = useState<PropsCanvasSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const idTimeoutRef = useRef< ReturnType<typeof setTimeout> | null>(null)
  const idAnimationFrameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)

  useEffect(() => {
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
        colorIndex: Math.floor(Math.random() * colors.length)
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

        const gradientColors = colors[p.colorIndex]
        if (!gradientColors) return
        ctx.fillStyle = createRadialGradient(
          ctx,
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r,
          gradientColors[0],
          gradientColors[1]
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

      idAnimationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = (): void => {
      if (idTimeoutRef.current) clearTimeout(idTimeoutRef.current)

      idTimeoutRef.current = setTimeout(() => {
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
    return () => {
      window.removeEventListener('resize', handleResize)
      if (idAnimationFrameRef.current) cancelAnimationFrame(idAnimationFrameRef.current)
      if (idTimeoutRef.current) clearTimeout(idTimeoutRef.current)
    }
  }, [canvasSize, bubbleGradiant1, bubbleGradiant2, bubbleGradiant3])

  return (
    <div
      ref={ref}
      style={{ zIndex }}
      className={cn(div({ theme }), className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className={cn(canvas({ theme }))}
      />
    </div>
  )
})
