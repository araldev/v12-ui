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
  // CONTENT
  // ----------------------------------------------------------------

  /** Optional SVG path for the title shape. When provided, the SVG
   *  mask grows during scroll — its path-shaped "hole" reveals the
   *  gradient overlay and the hero behind it. */
  svgPath?: string

  /** Hero image src (renders as a circular avatar with bottom fade). */
  imageSrc?: string

  /** Alt text for the hero image. */
  imageAlt?: string

  /** Text shown next to the scroll-down arrow. */
  scrollDownText?: string

  /** Three-line quote that reveals at the end of the scroll. */
  quote1?: string
  quote2?: string
  quote3?: string

  /** Custom hero content (replaces the default avatar slot). */
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
 * MagicHero — scroll-driven hero with SVG mask reveal + gradient overlay.
 *
 * Behavior (matches the original araldev-portfolio AnimatedTitle):
 *   1. Hero (image + scroll hint) visible at start.
 *   2. As user scrolls, the SVG mask grows from scale 1 to scale ~350.
 *      The mask has a path-shaped HOLE. As the SVG grows, the hole
 *      grows. Through the hole you see the gradient overlay AND the
 *      hero behind it.
 *   3. The mask fill (`maskColor`) covers everything outside the hole.
 *      When the SVG is huge, the hole is huge, so almost the entire
 *      screen shows what's behind.
 *   4. Gradient overlay fades in 25-65% of scroll.
 *   5. Gradient text (quote) reveals 60-85%.
 *
 * Layering (back to front):
 *   section    z-1   background
 *   .hero      z-1   image + scroll hint (always visible)
 *   .fade      z-1   gradient overlay (opacity 0→1)
 *   .mask      z-1   SVG with path-shaped hole (grows 1→350)
 *   .copy      z-2   gradient text (revealed last)
 */
function MagicHeroInner(
  {
    svgPath,
    imageSrc,
    imageAlt = '',
    scrollDownText = 'Scroll down',
    quote1 = 'Design',
    quote2 = 'that',
    quote3 = 'moves',
    children,
    backgroundColor = '#111117',
    maskColor = '#111117',
    gradientStart = '#00C9FF',
    gradientEnd = '#92FE9D',
    quoteColorFrom = '#111117',
    quoteColorAccent = '#8fc6ff',
    quoteColorTo = '#5a9cff',
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

    // Calculate path position so it covers the entire section.
    // The path is HUGE from the start, so the mask "hole" is HUGE,
    // making the hero visible through the mask at all times.
    const updateMaskPosition = () => {
      if (!svgPath) return
      titleMask.setAttribute('d', svgPath)
      titleMask.removeAttribute('transform')

      const sectionDimensions = hero.getBoundingClientRect()
      const titleBoundingBox = titleMask.getBBox()

      if (
        titleBoundingBox.width === 0 ||
        titleBoundingBox.height === 0
      ) {
        return
      }

      // Make the path HUGE — cover the entire section.
      // The SVG element will be scaled further by GSAP during scroll.
      // At scroll=0: SVG scale=1, path covers section → hero visible.
      // At scroll=1: SVG scale=350, path covers 350x section → hero still visible.
      const horizontalScaleRatio =
        (sectionDimensions.width * 2) / titleBoundingBox.width
      const verticalScaleRatio =
        (sectionDimensions.height * 2) / titleBoundingBox.height
      const titleScaleFactor = Math.max(
        horizontalScaleRatio,
        verticalScaleRatio
      )

      const titleHorizontalPosition =
        sectionDimensions.left +
        (sectionDimensions.width -
          titleBoundingBox.width * titleScaleFactor) /
          2 -
        titleBoundingBox.x * titleScaleFactor

      const titleVerticalPosition =
        sectionDimensions.top +
        (sectionDimensions.height -
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

          // SVG mask grows from 1 to 350 (matches original behavior).
          // The path is already huge (covers entire section), so the
          // mask "hole" is always huge. As the SVG grows, the hole
          // grows beyond the section, making the dark mask fill
          // (which is outside the viewport) invisible. The hero
          // stays visible through the hole at all times.
          const initialOverlayScale = 1
          const finalOverlayScale = 350
          const overlayScale =
            initialOverlayScale +
            (finalOverlayScale - initialOverlayScale) *
              Math.pow(normalizedProgress, 0.5) // ease-out
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
      {/* z-1: hero content (children + image + scroll hint) */}
      <div
        ref={heroContentRef}
        className="absolute top-0 left-0 w-screen h-full flex items-center justify-center"
        style={{ maxWidth: '100%' }}
      >
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

      {/* z-1: SVG overlay (dark with path-shaped mask).
          Only renders if svgPath is provided.
          The path is HUGE (covers the entire section) so the mask
          "hole" reveals the hero behind. The SVG itself grows from
          scale 1 to scale 350 during scroll. */}
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
