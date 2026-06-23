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

  /** Optional SVG path for the title reveal effect. If provided, the
   *  hero content will be hidden by a dark mask at scroll start, then
   *  revealed through the path-shaped hole. If omitted, the hero is
   *  always visible and only the gradient overlay + text reveal. */
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

  /** Custom hero content. If provided, replaces the default avatar slot. */
  children?: ReactNode

  // ----------------------------------------------------------------
  // COLORS
  // ----------------------------------------------------------------

  /** Background color of the entire hero section. */
  backgroundColor?: string

  /** Color of the SVG mask (the dark fill behind the path). */
  maskColor?: string

  /** First stop of the fade-overlay gradient. */
  gradientStart?: string

  /** Second stop of the fade-overlay gradient. */
  gradientEnd?: string

  /** Color of the gradient text that reveals last. */
  quoteColorFrom?: string
  quoteColorAccent?: string
  quoteColorTo?: string

  // ----------------------------------------------------------------
  // LAYOUT
  // ----------------------------------------------------------------

  /** Multiplier for scroll pin distance. Default 1.5. */
  pinMultiplier?: number

  /** Width of the hero image in px. */
  imageWidth?: number

  /** Class name. */
  className?: string
}

/**
 * MagicHero — scroll-driven hero with optional SVG mask reveal + gradient
 * overlay + gradient text.
 *
 * Faithful port of araldev-portfolio's AnimatedTitle. Key fix vs the
 * original: the SVG mask starts SMALL (covering only the title area)
 * so the hero content (image + scroll hint) is visible from the start.
 *
 * Layered (back to front):
 *   section   z-1   background (#111117)
 *   .hero     z-1   children + image + scroll hint (always visible)
 *   .fade     z-1   gradient (opacity 0→1)
 *   .mask     z-1   dark rect with path-shaped hole (scale 0→1, starts small)
 *   .title    z-2   FIXED invisible ref (w:300 h:250)
 *   .copy     z-2   gradient text (revealed 60-85%)
 */
function MagicHeroInner(
  {
    // content
    svgPath,
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
    className,
  }: MagicHeroProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const titleRevealMaskId = useId()

  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroImgCopyRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<SVGPathElement>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const heroContent = heroContentRef.current
    const heroImgCopy = heroImgCopyRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const titleContainer = titleContainerRef.current
    const titleMask = titleMaskRef.current

    if (
      !hero ||
      !heroContent ||
      !heroImgCopy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !titleContainer ||
      !titleMask
    ) {
      return
    }

    gsap.set([fadeOverlay, svgOverlay], { pointerEvents: 'none' })

    const handleResizeDebounce = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)
    }
    window.addEventListener('resize', handleResizeDebounce)

    // Initial fade in of the hero content
    const fadeInImg = gsap.fromTo(
      heroContent,
      { x: 60, filter: 'blur(10px)' },
      { x: 0, filter: 'blur(0px)', duration: 1 }
    )

    // Set the path if provided
    if (svgPath) {
      titleMask.setAttribute('d', svgPath)
    }

    const updateMaskPosition = () => {
      if (!svgPath) return
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
        if (svgPath) updateMaskPosition()
        const scrollProgress = self.progress

        // 1) Fade out hero content + scroll hint in the first 15%
        const fadeOpacity = 1 - scrollProgress * (1 / 0.15)
        gsap.set([heroContent, heroImgCopy], {
          opacity: scrollProgress <= 0.15 ? fadeOpacity : 0,
        })

        // 2) Scale + fade overlay opacity in 0%..85%
        if (scrollProgress <= 0.85) {
          const normalizedProgress = scrollProgress * (1 / 0.85)

          // Hero content scales down slightly as it fades
          const heroScale = 1 - 0.5 * normalizedProgress
          gsap.set(heroContent, { scale: heroScale })

          // SVG mask scales from TINY (0.01) to NORMAL (1)
          // Original starts at 350 and shrinks to 1 — but that covers
          // the hero content with dark color. We invert: start small,
          // grow to normal. At scale 0.01 the path "hole" is tiny, so
          // the hero content shows through normally (mask hole is small).
          // As scroll progresses, the hole grows and reveals the title.
          const initialOverlayScale = 0.01
          const finalOverlayScale = 1
          const overlayScale =
            initialOverlayScale +
            (finalOverlayScale - initialOverlayScale) *
              normalizedProgress
          gsap.set(svgOverlay, { scale: overlayScale })

          // Fade overlay (gradient) fades in starting at 25% scroll
          let fadeOverlayOpacity = 0
          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(1, (scrollProgress - 0.25) * (1 / 0.4))
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
      {/* z-1: hero content (children + image + scroll hint) — ALWAYS VISIBLE */}
      <div
        ref={heroContentRef}
        className="absolute top-0 left-0 w-screen h-full flex items-center justify-center"
        style={{ maxWidth: '100%' }}
      >
        {/* Custom children override the default avatar slot */}
        {children ? (
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        ) : (
          <div
            className="absolute"
            style={{
              top: '18%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              width: `${imageWidth}px`,
              height: 'auto',
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

        {/* "Scroll Down" hint at the bottom */}
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

      {/* z-1: SVG overlay (dark with path-shaped mask) — only renders if svgPath provided */}
      {svgPath && (
        <div
          ref={svgOverlayRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            zIndex: 1,
            transformOrigin: '50% 50%',
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
      )}

      {/* z-2: title container (invisible FIXED ref for mask position) */}
      {svgPath && (
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
      )}

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

      <style>{`
        @keyframes magicHeroBounce {
          from { transform: translate(-50%, -100%); }
          to   { transform: translate(-50%, -60%); }
        }
      `}</style>
    </section>
  )
}

export const MagicHero = forwardRef(MagicHeroInner)
