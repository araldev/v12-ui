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
  svgPath?: string
  imageSrc?: string
  imageAlt?: string
  scrollDownText?: string
  quote1?: string
  quote2?: string
  quote3?: string
  children?: ReactNode

  backgroundColor?: string
  maskColor?: string
  gradientStart?: string
  gradientEnd?: string
  quoteColorFrom?: string
  quoteColorAccent?: string
  quoteColorTo?: string

  pinMultiplier?: number
  imageWidth?: number
  className?: string
}

/**
 * MagicHero — scroll-driven hero with optional SVG mask + gradient overlay.
 *
 * Z-index layering (back to front):
 *   z-1  section background
 *   z-2  hero content (image + scroll hint) — ALWAYS VISIBLE
 *   z-3  SVG mask (positioned in middle, doesn't cover scroll hint)
 *   z-4  gradient text (revealed last)
 *   z-5  gradient overlay (fades in, semi-transparent)
 *
 * The hero + scroll hint are NEVER covered by the mask. The mask sits
 * in the middle of the section. The gradient overlay is the LAST layer
 * and fades in semi-transparent so the hero remains partially visible.
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
  const titleMaskRef = useRef<SVGPathElement>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const heroContent = heroContentRef.current
    const heroImgCopy = heroImgCopyRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const titleMask = titleMaskRef.current

    if (
      !hero ||
      !heroContent ||
      !heroImgCopy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
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

    // Set the path if provided (no getBBox dependency)
    if (svgPath) {
      titleMask.setAttribute('d', svgPath)
    }

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
      onUpdate: (self) => {
        const scrollProgress = self.progress

        // 1) Fade out hero content + scroll hint in the first 15%
        const fadeOpacity = 1 - scrollProgress * (1 / 0.15)
        gsap.set([heroContent, heroImgCopy], {
          opacity: scrollProgress <= 0.15 ? fadeOpacity : 0,
        })

        // 2) Scale + fade overlay opacity in 0%..85%
        if (scrollProgress <= 0.85) {
          const normalizedProgress = scrollProgress * (1 / 0.85)

          const heroScale = 1 - 0.5 * normalizedProgress
          gsap.set(heroContent, { scale: heroScale })

          // SVG mask scales subtly (1 → 2) for decorative effect
          const overlayScale = 1 + normalizedProgress
          gsap.set(svgOverlay, { scale: overlayScale })

          // Gradient overlay fades in starting at 25% (max 70% opacity)
          let fadeOverlayOpacity = 0
          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(
              0.7,
              (scrollProgress - 0.25) * (1 / 0.4) * 0.7
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
      {/* z-2: hero content (children + image + scroll hint) — ALWAYS VISIBLE */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {children ? (
          children
        ) : (
          <div
            className="absolute"
            style={{
              top: '18%',
              left: '65%',
              transform: 'translate(-50%, -50%)',
              width: `${imageWidth}px`,
              height: 'auto',
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

        {/* "Scroll Down" hint — positioned ABOVE the SVG mask area */}
        <div
          ref={heroImgCopyRef}
          className="absolute flex flex-col items-center pointer-events-none"
          style={{
            bottom: '3%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'opacity',
            fontSize: '0.65rem',
            gap: '10px',
            zIndex: 10,
            animation:
              'magicHeroBounce 1s ease-in-out both infinite alternate',
          }}
        >
          <p
            style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              lineHeight: 1,
              opacity: 0.8,
              color: 'white',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              letterSpacing: '0.1em',
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
            style={{
              opacity: 0.8,
              color: 'white',
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
            }}
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

      {/* z-3: SVG overlay (decorative mask in the middle area).
          Positioned between hero (top) and scroll hint (bottom).
          Smaller area so it doesn't interfere with other elements. */}
      {svgPath && (
        <div
          ref={svgOverlayRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: '30%',
            width: '70%',
            height: '30%',
            zIndex: 3,
            transformOrigin: 'center center',
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

      {/* z-4: gradient text (revealed last) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          zIndex: 4,
          textAlign: 'center',
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

      {/* z-5: gradient overlay (fades in semi-transparent on top) */}
      <div
        ref={fadeOverlayRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 5,
          background: `linear-gradient(180deg, transparent 0%, transparent 40%, ${gradientStart} 70%, ${gradientEnd} 100%)`,
          willChange: 'opacity',
        }}
      />

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
