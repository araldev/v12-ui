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
    bottom: '20%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    zIndex: 2,
    textAlign: 'center' as const,
    pointerEvents: 'none' as const,
    width: '100%',
    height: 'min-content',
  } satisfies CSSProperties,
  overlay_copy_h2: {
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    transformOrigin: 'center top',
    textTransform: 'uppercase' as const,
    fontSize: 'clamp(2rem, 6vw, 5rem)',
    fontWeight: 700,
    letterSpacing: '-0.05rem',
    lineHeight: 0.9,
    pointerEvents: 'none' as const,
    width: '100%',
    height: '100%',
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

  // ----- 8 refs, exact names from the original -----
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgContainerRef = useRef<HTMLDivElement>(null)
  const heroImgTitleRef = useRef<HTMLDivElement>(null)
  const heroImgCopyRef = useRef<HTMLDivElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const svgOverlayRef = useRef<HTMLDivElement>(null)
  const overlayCopyRef = useRef<HTMLHeadingElement>(null)
  const overlayCopyContainerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<SVGPathElement>(null)
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
    const titleContainer = titleContainerRef.current
    const titleMask = titleMaskRef.current

    if (
      !hero ||
      !heroImgContainer ||
      !heroImgTitle ||
      !heroImgCopy ||
      !fadeOverlay ||
      !svgOverlay ||
      !overlayCopy ||
      !overlayCopyContainer ||
      !titleContainer ||
      !titleMask
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

    // ----- Calculate SVG path position — EXACT formula from original -----
    const updateMaskPosition = () => {
      titleMask.setAttribute('d', svgPath)
      titleMask.removeAttribute('transform')

      const titleDimensions = titleContainer.getBoundingClientRect()
      const titleBoundingBox = titleMask.getBBox()

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
      onRefresh: updateMaskPosition,
      onUpdate: (self) => {
        updateMaskPosition()
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

      {/* overlay — SVG mask (fullscreen, path reveals the title) */}
      <div ref={svgOverlayRef} style={styles.overlay}>
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
            fill="#111117"
            mask={`url(#${titleRevealMaskId})`}
          />
        </svg>
      </div>

      {/* title_container — invisible FIXED ref for mask position calculation */}
      <div ref={titleContainerRef} style={styles.title_container} />

      {/* overlay_copy — gradient text revealed at the end */}
      <div ref={overlayCopyContainerRef} style={styles.overlay_copy}>
        <h2 ref={overlayCopyRef} style={styles.overlay_copy_h2}>
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
