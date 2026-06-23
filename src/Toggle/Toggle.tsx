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
  'relative inline-flex shrink-0 cursor-pointer items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default',
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
  'pointer-events-none inline-block rounded-full bg-white transition-transform duration-200',
  {
    variants: {
      size: {
        // offset = (track_h - thumb_h) / 2 = 4px for all sizes; 4px = translate-x-1
        sm: 'h-3 w-3 shadow-[0_1px_2px_rgba(0,0,0,0.25)]',
        md: 'h-4 w-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]',
        lg: 'h-5 w-5 shadow-[0_1px_4px_rgba(0,0,0,0.35)]',
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

  // offset = (track_h - thumb_h) / 2 = 4px for all sizes
  const OFFSET = '4px'

  const thumbClasses = cn(
    toggleThumb({ size }),
    reducedMotion ? '' : 'transition-transform duration-200',
    isChecked
      ? `translate-x-[calc(100%-${OFFSET})]`
      : 'translate-x-1'
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
