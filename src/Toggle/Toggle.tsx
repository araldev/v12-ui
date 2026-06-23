import {
  forwardRef,
  useId,
  useCallback,
  useState,
  type KeyboardEvent,
  type ReactElement,
} from 'react'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const toggleTrack = cva(
  'relative flex shrink-0 cursor-pointer overflow-hidden items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default',
  {
    variants: {
      variant: {
        default: 'bg-bg-secondary border border-border-secondary',
        muted: 'bg-bg-muted border border-border-muted',
      },
      size: {
        sm: 'h-5 w-9 rounded-full',
        md: 'h-6 w-11 rounded-full',
        lg: 'h-7 w-14 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const toggleThumb = cva(
  'pointer-events-none absolute rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-[left] duration-200',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export type ToggleProps = VariantProps<typeof toggleTrack> & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  children?: React.ReactNode
}

function useIsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ToggleInner(
  {
    variant = 'default',
    size = 'md',
    checked,
    defaultChecked = false,
    disabled,
    readonly,
    onChange,
    className,
    children,
  }: ToggleProps,
  ref: React.Ref<HTMLButtonElement>
): ReactElement {
  const generatedId = useId()
  const trackId = `toggle-track-${generatedId}`

  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = isControlled ? checked : internalChecked

  const reducedMotion = useIsReducedMotion()

  const handleClick = useCallback(() => {
    if (disabled || readonly) return
    const next = !isChecked
    if (!isControlled) {
      setInternalChecked(next)
    }
    onChange?.(next)
  }, [disabled, readonly, isChecked, isControlled, onChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || readonly) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const next = !isChecked
        if (!isControlled) {
          setInternalChecked(next)
        }
        onChange?.(next)
      }
    },
    [disabled, readonly, isChecked, isControlled, onChange]
  )

  const trackClasses = cn(
    toggleTrack({ variant, size }),
    isChecked && 'bg-bg-success border-border-success',
    (disabled || readonly) && 'opacity-50 cursor-not-allowed',
    className
  )

  // Absolute positioning: inset:0 + margin:auto = vertical center
  // Horizontal: OFF left=4px, ON left = track_w - thumb_w - 4px
  // sm: 36-12-4=20, md: 44-16-4=24, lg: 56-20-4=32
  const thumbLeft = isChecked
    ? (size === 'sm' ? 'left-[20px]' : size === 'lg' ? 'left-[32px]' : 'left-[24px]')
    : 'left-[4px]'

  const thumbClasses = cn(
    toggleThumb({ size }),
    'inset-y-0 my-auto',
    reducedMotion ? '' : 'transition-[left] duration-200',
    thumbLeft
  )

  return (
    <button
      ref={ref}
      id={trackId}
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled ?? readonly ?? undefined}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={trackClasses}
      data-checked={isChecked}
      data-reduced-motion={reducedMotion}
    >
      <span className={thumbClasses} aria-hidden="true" />
      {children && (
        <span className="ml-2 text-sm text-text-default">{children}</span>
      )}
    </button>
  )
}

export const Toggle = forwardRef(ToggleInner)
