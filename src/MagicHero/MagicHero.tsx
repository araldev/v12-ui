import {
  forwardRef,
  useId,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../utils/utils'

gsap.registerPlugin(ScrollTrigger)

export interface MagicHeroProps {
  /** SVG path data representing the title text shape (the "hole" that reveals) */
  svgPath?: string
  /** First line of the overlay quote text (revealed last) */
  quote1?: string
  /** Second line of the overlay quote text (revealed last) */
  quote2?: string
  /** Third line of the overlay quote text (revealed last) */
  quote3?: string
  /** Color of the hero section background (default: #111117) */
  backgroundColor?: string
  /** Color of the SVG mask overlay (the "title" color, default: #00C9FF) */
  titleColor?: string
  /** Color of the gradient that fades in (default: #92FE9D) */
  gradientColor?: string
  /** Gradient start for the overlay copy text (default: #111117) */
  overlayFrom?: string
  /** Gradient accent for the overlay copy text (default: #8fc6ff) */
  overlayAccent?: string
  /** Gradient end for the overlay copy text (default: #5a9cff) */
  overlayTo?: string
  /** Height of the pinned section in viewport heights (default: 2.5) */
  pinHeightVh?: number
  /** CSS class name for the container */
  className?: string
  /** Custom hero content (replaces the default example) */
  children?: ReactNode
}

/**
 * MagicHero — scroll-driven hero with SVG mask reveal and gradient overlay.
 *
 * Layering (back to front):
 *   z-0  section background
 *   z-10 hero content (image / scroll indicator)
 *   z-20 SVG mask overlay (dark rect with path-shaped hole)
 *   z-30 fade overlay (gradient that fades in, sits ABOVE the SVG)
 *   z-40 overlay copy (gradient text revealed last, always on top)
 *
 * As the user scrolls:
 *   0%    — hero content visible, SVG mask covers everything
 *   25%   — fade gradient starts appearing
 *   60-85% — gradient text reveals from bottom to top
 *   100%  — only gradient text + faded background visible
 */
function MagicHeroInner(
  {
    svgPath = '',
    quote1 = 'Design',
    quote2 = 'that',
    quote3 = 'moves',
    backgroundColor = '#111117',
    titleColor = '#00C9FF',
    gradientColor = '#92FE9D',
    overlayFrom = '#111117',
    overlayAccent = '#8fc6ff',
    overlayTo = '#5a9cff',
    pinHeightVh = 2.5,
    className,
    children,
  }: MagicHeroProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const generatedId = useId()
  const titleRevealMaskId = `${generatedId}-title-mask`

  const containerRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const heroContent = heroContentRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const titleContainer = titleContainerRef.current
    const titleMask = titleMaskRef.current

    if (
      !container ||
      !heroContent ||
      !scrollIndicator ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !titleContainer ||
      !titleMask
    ) {
      return
    }

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Disable pointer events on overlay/decorative layers
    gsap.set([fadeOverlay, svgOverlay], {
      pointerEvents: 'none',
    })

    // Set the SVG path for the title mask
    titleMask.setAttribute('d', svgPath)
    titleMask.removeAttribute('transform')

    // Calculate the scale and position of the SVG mask so that the path
    // matches the dimensions and position of the titleContainer.
    const updateMaskPosition = () => {
      const titleDimensions = titleContainer.getBoundingClientRect()
      const titleBoundingBox = titleMask.getBBox()

      if (titleBoundingBox.width === 0 || titleBoundingBox.height === 0) {
        return
      }

      const horizontalScaleRatio =
        titleDimensions.width / titleBoundingBox.width
      const verticalScaleRatio =
        titleDimensions.height / titleBoundingBox.height
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

    // Initial fade in of the hero content
    const fadeInHero = gsap.fromTo(
      heroContent,
      { x: 60, filter: 'blur(10px)' },
      { x: 0, filter: 'blur(0px)', duration: 1 }
    )

    updateMaskPosition()

    if (prefersReducedMotion) {
      // Static end state for reduced motion users
      gsap.set([heroContent, scrollIndicator], { opacity: 0 })
      gsap.set(fadeOverlay, { opacity: 1 })
      gsap.set(svgOverlay, { scale: 1 })
      overlayCopy.style.background = `linear-gradient(to bottom, ${overlayFrom} 0%, ${overlayFrom} 0%, ${overlayAccent} 40%, ${overlayTo} 100%)`
      overlayCopy.style.backgroundClip = 'text'
      overlayCopy.style.webkitBackgroundClip = 'text'
      gsap.set(overlayCopy, { opacity: 1, scale: 1 })
      return
    }

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

        // Fade out hero content in the first 15% of scroll
        const fadeOpacity = 1 - progress * (1 / 0.15)
        gsap.set([heroContent, scrollIndicator], {
          opacity: progress <= 0.15 ? fadeOpacity : 0,
        })

        // SVG mask scales down (reveals more of the gradient underneath)
        if (progress <= 0.85) {
          const normalizedProgress = progress * (1 / 0.85)

          // Hero content scales down slightly as it fades
          const heroScale = 1 - 0.5 * normalizedProgress
          gsap.set(heroContent, { scale: heroScale })

          // SVG mask scales from huge to small (the "hole" appears to grow)
          const initialOverlayScale = 350
          const overlayScale =
            initialOverlayScale *
            Math.pow(1 / initialOverlayScale, normalizedProgress)
          gsap.set(svgOverlay, { scale: overlayScale })

          // Fade overlay (gradient) fades in starting at 25% scroll
          let fadeOverlayOpacity = 0
          if (progress >= 0.25) {
            fadeOverlayOpacity = Math.min(1, (progress - 0.25) * (1 / 0.4))
          }
          gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity })
        }

        // Gradient text overlay reveals from 60% to 85%
        if (progress >= 0.6 && progress <= 0.85) {
          const revealProgress = (progress - 0.6) * (1 / 0.25)
          const gradientSpread = 200
          const gradientBottom = 240 - revealProgress * 280
          const gradientTop = gradientBottom - gradientSpread
          const copyScale = 1.25 - 0.45 * revealProgress

          overlayCopy.style.background = `linear-gradient(to bottom, ${overlayFrom} 0%, ${overlayFrom} ${gradientTop}%, ${overlayAccent} ${gradientBottom}%, ${overlayTo} ${100 + gradientBottom}%)`
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
      if (fadeInHero) fadeInHero.kill()
    }
  }, [
    svgPath,
    pinHeightVh,
    overlayFrom,
    overlayAccent,
    overlayTo,
    backgroundColor,
    titleColor,
    gradientColor,
  ])

  // Default hero example — used when no children are provided
  const defaultHero = (
    <div
      ref={heroContentRef}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6"
    >
      <div
        className="w-56 h-56 rounded-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${titleColor} 0%, ${gradientColor} 100%)`,
          }}
        />
      </div>
      <h1 className="text-2xl font-light tracking-wide opacity-90">
        MagicHero
      </h1>
    </div>
  )

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
      className={cn('relative w-full h-screen overflow-hidden', className)}
      style={{ backgroundColor }}
    >
      {/* z-10 — Hero content (default or children) */}
      {children ? (
        <div ref={heroContentRef} className="absolute inset-0 z-10">
          {children}
        </div>
      ) : (
        defaultHero
      )}

      {/* z-15 — Scroll indicator (above hero, below overlays) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[15] pointer-events-none"
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

      {/* z-20 — SVG mask overlay (dark rect with path-shaped hole that scales) */}
      <div
        ref={svgOverlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ transformOrigin: '49.7% 19%' }}
      >
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

      {/* z-30 — Fade overlay (gradient that fades in, sits ABOVE the SVG mask) */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${titleColor} 0%, ${gradientColor} 100%)`,
        }}
      />

      {/* z-40 — Title reference container (invisible, just for measuring the path position) */}
      <div
        ref={titleContainerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[250px] z-40 pointer-events-none"
      />

      {/* z-40 — Overlay copy (gradient text revealed at the end) */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-40 text-center w-full pointer-events-none">
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
