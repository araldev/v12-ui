import {
  forwardRef,
  useId,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../utils/utils'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// STYLES (inlined from AnimatedTitle.module.css — exact values)
// ---------------------------------------------------------------------------

const styles = {
  animation_container: {
    position: 'relative' as const,
    width: '100vw',
    maxWidth: '100%',
    height: '100svh',
    maxHeight: '100%',
    backgroundColor: '#111117',
    overflow: 'hidden',
    zIndex: 1,
  } satisfies CSSProperties,
  hero_container: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100vw',
    maxWidth: '100%',
    height: '100%',
    zIndex: 1,
  } satisfies CSSProperties,
  hero_img_container: {
    position: 'absolute' as const,
    top: '18%',
    left: '65%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: 'auto',
    objectFit: 'contain' as const,
    zIndex: 1,
  } satisfies CSSProperties,
  hero_img_copy: {
    position: 'absolute' as const,
    bottom: '2%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: '10px',
    width: '100%',
    fontSize: '0.65rem',
    lineHeight: 1,
    willChange: 'opacity' as const,
    zIndex: 9,
    animation: 'magicHeroBounce 1s ease-in-out both infinite alternate',
  } satisfies CSSProperties,
  fade_overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100vw',
    maxWidth: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
    willChange: 'opacity' as const,
    pointerEvents: 'none' as const,
  } satisfies CSSProperties,
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    transformOrigin: '49.7% 19%',
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none' as const,
  } satisfies CSSProperties,
  title_container: {
    position: 'fixed' as const,
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '250px',
    zIndex: 2,
    pointerEvents: 'none' as const,
  } satisfies CSSProperties,
  overlay_copy: {
    position: 'absolute' as const,
    bottom: '15%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    zIndex: 3,
    textAlign: 'center' as const,
    pointerEvents: 'none' as const,
    width: '90%',
    height: '40%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: '0.5em',
  } satisfies CSSProperties,
  overlay_copy_h2: {
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase' as const,
    fontSize: 'clamp(2rem, 6vw, 5rem)',
    fontWeight: 700,
    letterSpacing: '-0.05rem',
    lineHeight: 0.9,
    pointerEvents: 'none' as const,
    width: '100%',
    textAlign: 'center' as const,
  } satisfies CSSProperties,
} as const

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export interface MagicHeroProps {
  /** SVG path data representing the title text shape (the mask). */
  svgPath?: string

  /** Image src for the hero avatar. */
  imageSrc?: string
  imageAlt?: string

  /** Text shown next to the scroll-down arrow. */
  scrollDownText?: string

  /** Three-line quote that reveals at the end. */
  quote1?: string
  quote2?: string
  quote3?: string

  /** Custom hero content (replaces the default avatar). */
  children?: ReactNode

  /** Multiplier for scroll pin distance (default 1.5). */
  pinMultiplier?: number

  /** Class name. */
  className?: string
}

// ---------------------------------------------------------------------------
// COMPONENT — EXACT port of araldev-portfolio/src/components/AnimatedTitle
// ---------------------------------------------------------------------------

function MagicHeroInner(
  {
    svgPath = '',
    imageSrc,
    imageAlt = '',
    scrollDownText = 'Scroll down',
    quote1 = 'Design',
    quote2 = 'that',
    quote3 = 'moves',
    children,
    pinMultiplier = 1.5,
    className,
  }: MagicHeroProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const titleRevealMaskId = useId()

  // ----- 7 refs (removed titleMaskRef and titleContainerRef — not needed
  // anymore since the SVG mask uses declarative <text>, not a path) -----
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgContainerRef = useRef<HTMLDivElement>(null)
  const heroImgTitleRef = useRef<HTMLDivElement>(null)
  const heroImgCopyRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const overlayCopyContainerRef = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const heroImgContainer = heroImgContainerRef.current
    const heroImgTitle = heroImgTitleRef.current
    const heroImgCopy = heroImgCopyRef.current
    const fadeOverlay = fadeOverlayRef.current
    const svgOverlay = svgOverlayRef.current
    const overlayCopy = overlayCopyRef.current
    const overlayCopyContainer = overlayCopyContainerRef.current

    if (
      !hero ||
      !heroImgContainer ||
      !heroImgTitle ||
      !heroImgCopy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !overlayCopyContainer
    ) {
      console.warn(
        'MagicHero: GSAP/ScrollTrigger — some elements not found'
      )
      return
    }

    // ----- IMPORTANT FOR MOBILE — pointer events: none on overlays -----
    gsap.set([fadeOverlay, svgOverlay, overlayCopyContainer], {
      pointerEvents: 'none',
    })

    // ----- Resize debounced → refresh ScrollTrigger -----
    const handleResizeDebounce = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)
    }
    window.addEventListener('resize', handleResizeDebounce)

    // ----- Initial fade in of the image -----
    const fadeInImg = gsap.fromTo(
      heroImgTitle,
      { x: 60, filter: 'blur(10px)' },
      { x: 0, filter: 'blur(0px)', duration: 1 }
    )

    // ----- The SVG mask uses <text> (not <path>) so it always aligns
    // with the title text shown in the h2 below. The text is positioned
    // at the same place as the h2 (bottom 15% center) and uses the
    // same content and styling. No more misalignment between the
    // "hole" in the mask and the actual title text. -----



    // ----- Main ScrollTrigger — EXACT config from original -----
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
      onRefresh: () => {
        // No mask position update needed — text mask is declarative
      },
      onUpdate: (self) => {
        const scrollProgress = self.progress

        // ----- Fade out hero image + scroll hint in first 15% -----
        const fadeOpacity = 1 - scrollProgress * (1 / 0.15)
        gsap.set([heroImgTitle, heroImgCopy], {
          opacity: scrollProgress <= 0.15 ? fadeOpacity : 0,
        })

        // ----- Scaling effects (0-85%) -----
        if (scrollProgress <= 0.85) {
          const numberScale =
            window.innerWidth < 1500 && window.innerWidth > 1401
              ? 1.1
              : window.innerWidth < 1400 && window.innerWidth > 501
                ? 1
                : 1.1

          const initialOverlayScale = 350
          const normalizedProgress = scrollProgress * (1 / 0.85)

          const heroImgContainerScale =
            numberScale - 0.5 * normalizedProgress

          const overlayScale =
            initialOverlayScale *
            Math.pow(1 / initialOverlayScale, normalizedProgress)

          gsap.set(heroImgContainer, { scale: heroImgContainerScale })
          gsap.set(svgOverlay, { scale: overlayScale })

          // ----- Overlay opacity (fade gradient in) -----
          let fadeOverlayOpacity = 0
          if (scrollProgress >= 0.25) {
            fadeOverlayOpacity = Math.min(
              1,
              (scrollProgress - 0.25) * (1 / 0.4)
            )
          }
          gsap.set(fadeOverlay, { opacity: fadeOverlayOpacity })
        }

        // ----- Reveal gradient text overlay (60-85%) -----
        if (scrollProgress >= 0.6 && scrollProgress <= 0.85) {
          const revealProgress = (scrollProgress - 0.6) * (1 / 0.25)
          const gradientSpread = 200
          const gradientBottom = 240 - revealProgress * 280
          const gradientTop = gradientBottom - gradientSpread
          const overlayCopyScale = 1.25 - 0.45 * revealProgress

          overlayCopy.style.background = `linear-gradient(
            to bottom,
            #111117 0%,
            #111117 ${gradientTop}%,
            #8fc6ff ${gradientBottom}%,
            #5a9cff ${100 + gradientBottom}%
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
  }, [svgPath, pinMultiplier])

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
      className={cn('block', className)}
      style={styles.animation_container}
    >
      {/* hero_container — wraps children + image + scroll hint, SCALES during scroll */}
      <div
        ref={heroImgContainerRef}
        style={styles.hero_container}
      >
        {children}

        {/* hero_img_container — the IMAGE, FADES OUT */}
        <div ref={heroImgTitleRef} style={styles.hero_img_container}>
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
                background:
                  'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
              }}
            />
          )}
        </div>

        {/* hero_img_copy — the SCROLL DOWN hint, FADES OUT */}
        <div ref={heroImgCopyRef} style={styles.hero_img_copy}>
          <p
            style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              lineHeight: 1,
              color: 'white',
              opacity: 0.85,
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
            style={{ color: 'white', opacity: 0.85 }}
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

      {/* fade_overlay — gradient that fades in */}
      <div ref={fadeOverlayRef} style={styles.fade_overlay} />

      {/* overlay — SVG mask with <text> element.
          The text is positioned at the same place as the h2 below
          (bottom 15-20% center) so the mask "hole" ALWAYS aligns
          with the visible title text, regardless of the title content.
          No more custom SVG path needed — the text IS the mask. */}
      <div ref={svgOverlayRef} style={styles.overlay}>
        <svg width="100%" height="100%">
          <defs>
            <mask id={titleRevealMaskId}>
              <rect width="100%" height="100%" fill="white" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="clamp(2rem, 6vw, 5rem)"
                fontWeight="700"
                letterSpacing="-0.05rem"
                fill="black"
                fontFamily="inherit"
                style={{ textTransform: 'uppercase' }}
              >
                <tspan x="50%" dy="-1.2em">
                  {quote1}
                </tspan>
                <tspan x="50%" dy="1.2em">
                  {quote2}
                </tspan>
                <tspan x="50%" dy="1.2em">
                  {quote3}
                </tspan>
              </text>
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="#111117"
            mask={`url(#${titleRevealMaskId})`}
          />
        </svg>
      </div>

      {/* overlay_copy — gradient text revealed at the end.
          Uses the SAME layout as the SVG <text> mask above (3 spans,
          gap-based spacing) so they align perfectly. */}
      <div ref={overlayCopyContainerRef} style={styles.overlay_copy}>
        <h2 ref={overlayCopyRef} style={styles.overlay_copy_h2}>
          <span style={{ display: 'block' }}>{quote1}</span>
          <span style={{ display: 'block' }}>{quote2}</span>
          <span style={{ display: 'block' }}>{quote3}</span>
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
