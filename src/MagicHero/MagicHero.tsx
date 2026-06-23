import { forwardRef, useId, useEffect, useRef, type ReactElement, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../utils/utils'

gsap.registerPlugin(ScrollTrigger)

export interface MagicHeroProps {
  /** SVG path data representing the title text shape */
  svgPath?: string
  /** First line of the overlay quote text */
  quote1?: string
  /** Second line of the overlay quote text */
  quote2?: string
  /** Third line of the overlay quote text */
  quote3?: string
  /** Gradient start color for the quote text (default: #111117) */
  gradientFrom?: string
  /** Gradient accent color for the quote text (default: #8fc6ff) */
  gradientAccent?: string
  /** Gradient end color for the quote text (default: #5a9cff) */
  gradientTo?: string
  /** Background color of the hero section (default: #111117) */
  backgroundColor?: string
  /** Height of the pinned section in viewport heights (default: 2.5) */
  pinHeightVh?: number
  /** CSS class name for the container */
  className?: string
  /** Child content to render in the hero */
  children?: ReactNode
}

function MagicHeroInner(
  {
    svgPath = '',
    quote1 = 'Design',
    quote2 = 'that',
    quote3 = 'moves',
    gradientFrom = '#111117',
    gradientAccent = '#8fc6ff',
    gradientTo = '#5a9cff',
    backgroundColor = '#111117',
    pinHeightVh = 2.5,
    className,
    children,
  }: MagicHeroProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const generatedId = useId()
  const titleRevealMaskId = `${generatedId}-title-mask`

  const containerRef = useRef<HTMLDivElement>(null)
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const overlayCopyContainerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const imgContainer = imgContainerRef.current
    const copy = copyRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const overlayCopyContainer = overlayCopyContainerRef.current
    const titleContainer = titleContainerRef.current
    const titleMask = titleMaskRef.current

    if (
      !container ||
      !imgContainer ||
      !copy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !overlayCopyContainer ||
      !titleContainer ||
      !titleMask
    ) {
      return
    }

    // Disable pointer events on overlay elements
    gsap.set([fadeOverlay, svgOverlay, overlayCopyContainer], {
      pointerEvents: 'none',
    })

    // Set the SVG path for the title mask
    titleMask.setAttribute('d', svgPath)
    titleMask.removeAttribute('transform')

    const updateMaskPosition = () => {
      const titleDimensions = titleContainer.getBoundingClientRect()
      const titleBoundingBox = titleMask.getBBox()

      const horizontalScaleRatio = titleDimensions.width / titleBoundingBox.width
      const verticalScaleRatio = titleDimensions.height / titleBoundingBox.height
      const scaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio)

      const horizontalPosition =
        titleDimensions.left +
        (titleDimensions.width - titleBoundingBox.width * scaleFactor) / 2 -
        titleBoundingBox.x * scaleFactor

      const verticalPosition =
        titleDimensions.top +
        (titleDimensions.height - titleBoundingBox.height * scaleFactor) / 2 -
        titleBoundingBox.y * scaleFactor

      titleMask.setAttribute(
        'transform',
        `translate(${horizontalPosition}, ${verticalPosition}) scale(${scaleFactor})`
      )
    }

    // Initial fade in of the image
    const fadeInImg = gsap.fromTo(
      imgContainer,
      { x: 60, filter: 'blur(10px)' },
      { x: 0, filter: 'blur(0px)', duration: 1 }
    )

    updateMaskPosition()

    // ScrollTrigger animation
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * pinHeightVh}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      pinType: 'transform',
      onRefresh: updateMaskPosition,
      onUpdate: (self) => {
        updateMaskPosition()
        const progress = self.progress

        // Fade out hero content
        const fadeOpacity = 1 - progress * (1 / 0.15)
        gsap.set([imgContainer, copy], {
          opacity: progress <= 0.15 ? fadeOpacity : 0,
        })

        // Scaling effects
        if (progress <= 0.85) {
          const normalizedProgress = progress * (1 / 0.85)

          const imgScale = 1 - 0.5 * normalizedProgress
          gsap.set(imgContainer, { scale: imgScale })

          const initialOverlayScale = 350
          const overlayScale =
            initialOverlayScale *
            Math.pow(1 / initialOverlayScale, normalizedProgress)
          gsap.set(svgOverlay, { scale: overlayScale })

          // Fade overlay opacity
          let fadeOverlayOpacity = 0
          if (progress >= 0.25) {
            fadeOverlayOpacity = Math.min(1, (progress - 0.25) * (1 / 0.4))
          }
          gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity })
        }

        // Reveal overlay copy with gradient
        if (progress >= 0.6 && progress <= 0.85) {
          const revealProgress = (progress - 0.6) * (1 / 0.25)
          const gradientSpread = 200
          const gradientBottom = 240 - revealProgress * 280
          const gradientTop = gradientBottom - gradientSpread
          const copyScale = 1.25 - 0.45 * revealProgress

          overlayCopy.style.background = `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientFrom} ${gradientTop}%, ${gradientAccent} ${gradientBottom}%, ${gradientTo} ${100 + gradientBottom}%)`
          overlayCopy.style.backgroundClip = 'text'
          overlayCopy.style.webkitBackgroundClip = 'text'

          gsap.set(overlayCopy, {
            scale: copyScale,
            opacity: revealProgress,
          })
        } else if (progress < 0.6) {
          gsap.set(overlayCopy, { opacity: 0 })
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      if (trigger) trigger.kill()
      if (fadeInImg) fadeInImg.kill()
    }
  }, [svgPath, pinHeightVh, gradientFrom, gradientAccent, gradientTo])

  return (
    <section
      ref={(node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref && 'current' in ref) {
          ref.current = node
        }
      }}
      className={cn(
        'relative w-full h-screen overflow-hidden z-10',
        className
      )}
      style={{ backgroundColor }}
    >
      {/* Hero content */}
      <div
        ref={imgContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        {children}
      </div>

      {/* Scroll indicator */}
      <div
        ref={copyRef}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <p className="text-xs uppercase tracking-widest opacity-70">Scroll</p>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce opacity-70"
        >
          <path
            d="M8 3V13M8 13L4 9M8 13L12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Fade overlay */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${gradientFrom} 0%, ${gradientAccent} 50%, ${gradientTo} 100%)`,
        }}
      />

      {/* SVG Overlay */}
      <div ref={svgOverlayRef} className="absolute inset-0 z-40 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <mask id={titleRevealMaskId}>
              <rect width="100%" height="100%" fill="white" />
              <path ref={titleMaskRef} />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={backgroundColor}
            mask={`url(#${titleRevealMaskId})`}
          />
        </svg>
      </div>

      {/* Title container (fixed position reference) */}
      <div
        ref={titleContainerRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-64 z-50 pointer-events-none"
      />

      {/* Overlay copy */}
      <div
        ref={overlayCopyContainerRef}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-50 text-center w-full pointer-events-none"
      >
        <h2
          ref={overlayCopyRef}
          className="text-6xl font-bold uppercase tracking-tight leading-none"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            transformOrigin: 'center top',
          }}
        >
          {quote1}
          <br />
          <br />
          {quote2}
          <br />
          <br />
          {quote3}
        </h2>
      </div>
    </section>
  )
}

export const MagicHero = forwardRef(MagicHeroInner)
