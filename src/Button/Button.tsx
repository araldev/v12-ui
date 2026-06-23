import { forwardRef } from 'react'
import type { Ref, ReactElement, KeyboardEvent } from 'react'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('size-text-button font-weight-button flex justify-center items-center hover:cursor-pointer disabled:opacity-50 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-inherit active:ring-active', {
  variants: {
    variant: {
      primary: 'text-text-primary bg-bg-primary hover:bg-bg-primary-hover focus-visible:ring-border-primary',
      secondary: 'text-text-secondary bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:ring-border-secondary',
      muted: 'text-text-muted bg-bg-muted hover:bg-bg-muted-hover focus-visible:ring-border-muted',
      accent: 'text-text-accent bg-bg-accent hover:bg-bg-accent-hover focus-visible:ring-border-accent',
      success: 'text-text-success bg-bg-success hover:bg-bg-success-hover focus-visible:ring-border-success',
      warning: 'text-text-warning bg-bg-warning hover:bg-bg-warning-hover focus-visible:ring-border-warning',
      error: 'text-text-error bg-bg-error hover:bg-bg-error-hover focus-visible:ring-border-error',
      info: 'text-text-info bg-bg-info hover:bg-bg-info-hover focus-visible:ring-border-info',
      ghost: 'text-text-ghost bg-bg-ghost hover:bg-bg-ghost-hover focus-visible:ring-border-ghost'
    },
    border: {
      true: 'border-1'
    },
    shadow: {
      none: 'shadow-none',
      default: 'shadow-shadow-primary',
      success: 'shadow-shadow-success',
      warning: 'shadow-shadow-warning',
      error: 'shadow-shadow-error',
      info: 'shadow-shadow-info',
      accent: 'shadow-shadow-accent'
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      pill: 'rounded-4xl',
      circle: 'rounded-full aspect-square'
    },
    size: {
      sm: 'px-3 py-1 min-w-20 h-9',
      md: 'px-6 py-2 min-w-30 h-11',
      lg: 'px-10 py-3 min-w-35 h-14',
      fit: 'px-8 py-3 w-fit h-fit',
      full: 'px-10 py-3 w-full h-14'
    }
  },
  compoundVariants: [
    { variant: 'primary', border: true, shadow: 'default', className: 'border-border-primary hover:border-border-primary-hover' },
    { variant: 'secondary', border: true, className: 'border-border-secondary hover:border-border-secondary-hover' },
    { variant: 'muted', border: true, className: 'border-border-muted' },
    { variant: 'accent', border: true, shadow: 'accent', className: 'border-border-accent hover:border-border-accent-hover' },
    { variant: 'success', border: true, shadow: 'default', className: 'border-border-success hover:border-border-success-hover' },
    { variant: 'warning', border: true, shadow: 'default', className: 'border-border-warning hover:border-border-warning-hover' },
    { variant: 'error', border: true, shadow: 'default', className: 'border-border-error hover:border-border-error-hover' },
    { variant: 'info', border: true, shadow: 'default', className: 'border-border-info hover:border-border-info-hover' },
    { variant: 'ghost', border: true, className: 'border-border-ghost hover:border-border-ghost-hover' }
  ],
  defaultVariants: {
    variant: 'primary',
    border: true,
    shadow: 'none',
    rounded: 'pill',
    size: 'fit'
  }
})

// Discriminated union: href only exists when as="a"
export type ButtonProps = VariantProps<typeof button> & {
  disabled?: boolean
  children?: React.ReactNode
  className?: string
} & ({
  as: 'a'
  href: string
  target?: string
  rel?: string
} | {
  as?: 'button'
  href?: never
  target?: never
  rel?: never
})

function ButtonInner(
  props: ButtonProps,
  ref: Ref<any>
): ReactElement {
  const { as, disabled, children, variant, border, shadow, rounded, size, className, href, target, rel, ...restProps } = props
  const isAnchor = as === 'a'

  if (process.env.NODE_ENV !== 'production') {
    if (isAnchor && !href) {
      throw new Error('When using as="a", href is required.')
    }
  }

  function handleKeyDown (e: KeyboardEvent<HTMLElement>): void {
    const target = e.currentTarget as HTMLElement | null

    if (!target || target.tagName === 'BUTTON') return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      target.click()
    }
  }

  if (!isAnchor) {
    return (
      <button
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...restProps}
        className={cn(
          button({ variant, border, shadow, rounded, size }),
          disabled && 'bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled',
          className
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <a
      role="button"
      href={href}
      target={target}
      rel={rel}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      ref={ref}
      {...restProps}
      className={cn(
        button({ variant, border, shadow, rounded, size }),
        disabled && 'bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled',
        className
      )}
    >
      {children}
    </a>
  )
}

export const Button = forwardRef(ButtonInner)
