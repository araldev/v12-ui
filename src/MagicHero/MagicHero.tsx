import {
  forwardRef,
  useId,
  useLayoutEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../utils/utils'

gsap.registerPlugin(ScrollTrigger)

export interface MagicHeroProps {
  // ----------------------------------------------------------------
  // CONTENT — all fully modifiable
  // ----------------------------------------------------------------

  /** SVG path data representing the title text shape. The path is the
   *  "hole" through which the fade-overlay gradient is revealed. */
  svgPath?: string

  /** Hero image src (renders as a circular avatar with bottom fade). */
  imageSrc?: string

  /** Alt text for the hero image. */
  imageAlt?: string

  /** Text shown next to the scroll-down arrow. */
  scrollDownText?: string

  /** Three-line quote that reveals at the end of the scroll with a
   *  gradient background. */
  quote1?: string
  quote2?: string
  quote3?: string

  /** Custom hero content (overrides the default avatar). */
  children?: ReactNode

  // ----------------------------------------------------------------
  // COLORS — all fully modifiable
  // ----------------------------------------------------------------

  /** Background color of the entire hero section. */
  backgroundColor?: string

  /** Color of the SVG mask rect (the "title" fill). Same as background by default. */
  maskColor?: string

  /** First stop of the fade overlay gradient (left side). */
  gradientStart?: string

  /** Second stop of the fade overlay gradient (right side). */
  gradientEnd?: string

  /** Color of the gradient text that reveals last. */
  quoteColorFrom?: string
  quoteColorAccent?: string
  quoteColorTo?: string

  // ----------------------------------------------------------------
  // LAYOUT
  // ----------------------------------------------------------------

  /** Multiplier for scroll pin distance (default 1.5 = 1.5 viewports of scroll). */
  pinMultiplier?: number

  /** Width of the hero image in px. */
  imageWidth?: number

  /** Distance from top of viewport for the SVG mask transform-origin. */
  maskOriginX?: number
  maskOriginY?: number

  /** Class name. */
  className?: string
}

/**
 * MagicHero — scroll-driven hero with SVG mask reveal and gradient overlay.
 *
 * Faithful port of the original `AnimatedTitle` component from
 * araldev-portfolio. Layered (back to front):
 *
 *   z-1   .hero_container      — children + image + scroll hint
 *   z-1   .fade_overlay        — gradient (opacity 0→1, fills the "hole" in the mask)
 *   z-1   .overlay (SVG)       — dark rect with path-shaped mask (scales 350→1)
 *   z-2   .title_container     — FIXED invisible ref (w:300 h:250) for mask position
 *   z-2   .overlay_copy        — gradient text that reveals 60-85% scroll
 *   z-9   .hero_img_copy       — "Scroll Down" hint (on top of overlays)
 */
function MagicHeroInner(
  {
    // content
    svgPath = '',
    imageSrc,
    imageAlt = '',
    scrollDownText = 'Scroll down',
    quote1 = 'Design',
    quote2 = 'that',
    quote3 = 'moves',
    children,

    // colors
    backgroundColor = '#111117',
    maskColor = '#111117',
    gradientStart = '#00C9FF',
    gradientEnd = '#92FE9D',
    quoteColorFrom = '#111117',
    quoteColorAccent = '#8fc6ff',
    quoteColorTo = '#5a9cff',

    // layout
    pinMultiplier = 1.5,
    imageWidth = 350,
    maskOriginX = 49.7,
    maskOriginY = 19,
    className,
  }: MagicHeroProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const titleRevealMaskId = useId()

  // All refs — names mirror the original `useAnimatedTitle` hook
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgContainerRef = useRef<HTMLDivElement>(null)
  const heroImgCopyRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<SVGPathElement>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const heroImgContainer = heroImgContainerRef.current
    const heroImgCopy = heroImgCopyRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const titleContainer = titleContainerRef.current
    const titleMask = titleMaskRef.current

    if (
      !hero ||
      !heroImgContainer ||
      !heroImgCopy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !titleContainer ||
      !titleMask
    ) {
      return
    }

    // Disable pointer events on overlay layers (mobile-friendly)
    gsap.set([fadeOverlay, svgOverlay], { pointerEvents: 'none' })

    // Resize debounce → refresh ScrollTrigger
    const handleResizeDebounce = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)
    }
    window.addEventListener('resize', handleResizeDebounce)

    // Initial fade in of the image
    const fadeInImg = gsap.fromTo(
      heroImgContainer,
      { x: 60, filter: 'blur(10px)' },
      { x: 0, filter: 'blur(0px)', duration: 1 }
    )

    // Calculate scale + translate of the SVG path so that it matches
    // the bounding box of the (invisible) title_container.
    const updateMaskPosition = () => {
      titleMask.setAttribute('d', svgPath)
      titleMask.removeAttribute('transform')

      const titleDimensions = titleContainer.getBoundingClientRect()
      const titleBoundingBox = titleMask.getBBox()

      if (
        titleBoundingBox.width === 0 ||
        titleBoundingBox.height === 0
      ) {
        return
      }

      const horizontalScaleRatio =
        titleDimensions.width / titleBoundingBox.width
      const verticalScaleRatio =
        titleDimensions.height / titleBoundingBox.height
      const titleScaleFactor = Math.min(
        horizontalScaleRatio,
        verticalScaleRatio
      )

      const titleHorizontalPosition =
        titleDimensions.left +
        (titleDimensions.width -
          titleBoundingBox.width * titleScaleFactor) /
          2 -
        titleBoundingBox.x * titleScaleFactor

      const titleVerticalPosition =
        titleDimensions.top +
        (titleDimensions.height -
          titleBoundingBox.height * titleScaleFactor) /
          2 -
        titleBoundingBox.y * titleScaleFactor

      titleMask.setAttribute(
        'transform',
        `translate(${titleHorizontalPosition}, ${titleVerticalPosition}) scale(${titleScaleFactor})`
      )
    }

    updateMaskPosition()

    // Main ScrollTrigger
    const trigger = ScrollTrigger.create({
      id: 'magic-hero-trigger',
      trigger: hero,
      start: 'top top',
      end: () => `+=${window.innerHeight * pinMultiplier}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      pinType: 'transform',
      onRefresh: updateMaskPosition,
      onUpdate: (self) => {
        updateMaskPosition()
        const scrollProgress = self.progress

        // 1) Fade out hero image + scroll hint in the first 15% of scroll
        const fadeOpacity = 1 - scrollProgress * (1 / 0.15)
        gsap.set([heroImgContainer, heroImgCopy], {
          opacity: scrollProgress <= 0.15 ? fadeOpacity : 0,
        })

        // 2) Scaling + fade-overlay opacity in 0%..85%
        if (scrollProgress <= 0.85) {
          const normalizedProgress = scrollProgress * (1 / 0.85)

          const heroImgContainerScale = 1 - 0.5 * normalizedProgress
          gsap.set(heroImgContainer, { scale: heroImgContainerScale })

          const initialOverlayScale = 350
          const overlayScale =
            initialOverlayScale *
            Math.pow(1 / initialOverlayScale, normalizedProgress)
          gsap.set(svgOverlay, { scale: overlayScale })

          let fadeOverlayOpacity = 0
          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(
              1,
              (scrollProgress - 0.25) * (1 / 0.4)
            )
          }
          gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity })
        }

        // 3) Reveal gradient text in 60%..85%
        if (scrollProgress >= 0.6 && scrollProgress <= 0.85) {
          const revealProgress = (scrollProgress - 0.6) * (1 / 0.25)
          const gradientSpread = 200
          const gradientBottom = 240 - revealProgress * 280
          const gradientTop = gradientBottom - gradientSpread
          const overlayCopyScale = 1.25 - 0.45 * revealProgress

          overlayCopy.style.background = `linear-gradient(
            to bottom,
            ${quoteColorFrom} 0%,
            ${quoteColorFrom} ${gradientTop}%,
            ${quoteColorAccent} ${gradientBottom}%,
            ${quoteColorTo} ${100 + gradientBottom}%
          )`
          overlayCopy.style.backgroundClip = 'text'
          overlayCopy.style.webkitBackgroundClip = 'text'

          gsap.set(overlayCopy, {
            scale: overlayCopyScale,
            opacity: revealProgress,
          })
        } else if (scrollProgress < 0.6) {
          gsap.set(overlayCopy, { opacity: 0 })
        }
      },
    })

    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', handleResizeDebounce)
      if (timeoutId.current) clearTimeout(timeoutId.current)
      if (trigger) trigger.kill()
      if (fadeInImg) fadeInImg.kill()
    }
  }, [
    svgPath,
    pinMultiplier,
    gradientStart,
    gradientEnd,
    quoteColorFrom,
    quoteColorAccent,
    quoteColorTo,
    maskColor,
    backgroundColor,
  ])

  return (
    <section
      ref={(node: HTMLDivElement | null) => {
        heroRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref && 'current' in ref) {
          ref.current = node
        }
      }}
      className={cn(
        'relative w-full max-w-full max-h-full overflow-hidden',
        className
      )}
      style={{
        height: '100svh',
        backgroundColor,
        zIndex: 1,
      }}
    >
      {/* z-1: hero container (children + image + scroll hint) */}
      <div
        className="absolute top-0 left-0 w-screen h-full"
        style={{ maxWidth: '100%' }}
      >
        {/* Slot for custom children (overrides image) */}
        {children}

        {/* Hero image — only shown when no children */}
        {!children && (
          <div
            ref={heroImgContainerRef}
            className="absolute"
            style={{
              top: '18%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              width: `${imageWidth}px`,
              height: 'auto',
              objectFit: 'contain',
              zIndex: 1,
            }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                  maskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              />
            )}
          </div>
        )}

        {/* "Scroll Down" hint */}
        <div
          ref={heroImgCopyRef}
          className="absolute flex flex-col items-center"
          style={{
            bottom: '2%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'opacity',
            fontSize: '0.65rem',
            gap: '10px',
            width: '100%',
            zIndex: 9,
            animation:
              'magicHeroBounce 1s ease-in-out both infinite alternate',
          }}
        >
          <p
            style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              lineHeight: 1,
              opacity: 0.7,
            }}
          >
            {scrollDownText}
          </p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.7 }}
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
      </div>

      {/* z-1: fade overlay (gradient that fades in on scroll) */}
      <div
        ref={fadeOverlayRef}
        className="absolute top-0 left-0 w-screen h-full"
        style={{
          maxWidth: '100%',
          background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
          willChange: 'opacity',
        }}
      />

      {/* z-1: SVG overlay (dark with path-shaped mask) */}
      <div
        ref={svgOverlayRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          zIndex: 1,
          transformOrigin: `${maskOriginX}% ${maskOriginY}%`,
        }}
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
            fill={maskColor}
            mask={`url(#${titleRevealMaskId})`}
          />
        </svg>
      </div>

      {/* z-2: title container (invisible FIXED ref for mask position) */}
      <div
        ref={titleContainerRef}
        className="fixed"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '250px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* z-2: overlay copy (gradient text revealed last) */}
      <div
        className="absolute"
        style={{
          bottom: '20%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '100%',
          height: 'min-content',
        }}
      >
        <h2
          ref={overlayCopyRef}
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            transformOrigin: 'center top',
            textTransform: 'uppercase',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.05rem',
            lineHeight: 0.9,
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
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

      {/* keyframes for the bounce animation on the scroll hint */}
      <style>{`
        @keyframes magicHeroBounce {
          from { transform: translate(-50%, -100%); }
          to   { transform: translate(-50%, -60%); }
        }
        @media (max-width: 1600px) { .__hero_img { left: 70% !important; } }
        @media (max-width: 1300px) { .__hero_img { left: 75% !important; } }
        @media (max-width: 1050px) { .__hero_img { left: 78% !important; } }
        @media (max-width: 900px)  { .__mask_origin { transform-origin: 49% 19% !important; } }
        @media (max-width: 850px)  { .__hero_img { left: 80% !important; width: 250px !important; } }
        @media (max-width: 760px)  { .__hero_img { top: 3% !important; left: 80% !important; width: 200px !important; } }
        @media (max-width: 500px)  { .__hero_img { top: 5% !important; left: 70% !important; width: 150px !important; } }
        @media (max-height: 600px) { .__overlay_copy { bottom: 0% !important; } }
      `}</style>
    </section>
  )
}

export const MagicHero = forwardRef(MagicHeroInner)
