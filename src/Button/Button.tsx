import { forwardRef } from 'react'
import type { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
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
      default: 'shadow-custom-lg',
      success: 'shadow-shadow-success',
      warning: 'shadow-shadow-warning',
      error: 'shadow-shadow-error',
      info: 'shadow-shadow-info'
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
      sm: 'px-3 py-1 w-20 h-9',
      md: 'px-6 py-2 w-30 h-11',
      lg: 'px-10 py-3 w-35 h-14',
      fit: 'px-8 py-3 w-fit h-fit',
      full: 'px-10 py-3 w-full h-14'
    }
  },
  compoundVariants: [
    { variant: 'primary', border: true, className: 'border-border-primary hover:border-primary-hover' },
    { variant: 'secondary', border: true, className: 'border-border-secondary hover:border-secondary-hover' },
    { variant: 'muted', border: true, className: 'border-border-muted' },
    { variant: 'accent', border: true, className: 'border-border-accent hover:border-accent-hover' },
    { variant: 'success', border: true, className: 'border-border-success hover:border-success-hover' },
    { variant: 'warning', border: true, className: 'border-border-warning hover:border-warning-hover' },
    { variant: 'error', border: true, className: 'border-border-error hover:border-error-hover' },
    { variant: 'info', border: true, className: 'border-border-info hover:border-info-hover' },
    { variant: 'ghost', border: true, className: 'border-border-ghost hover:border-ghost-hover' }
  ],
  defaultVariants: {
    variant: 'primary',
    border: true,
    shadow: 'default',
    rounded: 'pill',
    size: 'fit'
  }
})

type AllowedTags = 'button' | 'a'

type PolymorphicProps<T extends ElementType = 'button'> = {
  as?: T
  disabled?: boolean
  children?: ReactNode
  className?: string
} & WithoutAs<ComponentPropsWithRef<T>> & VariantProps<typeof button>

function ButtonInner<T extends ElementType = 'button'> (
  { as, disabled, children, variant, border, shadow, rounded, size, className, ...props }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement {
  const Component = as || 'button'

  if (as === 'a' && !props.href) {
    throw new Error('When using "as" prop with "a" tag, "href" must be provided.')
  }
  if (as === 'button' && props.href) {
    throw new Error('When using "as" prop with "button" tag, "href" should not be provided.')
  }

  function handleKeyDown (e: KeyboardEvent): void {
    const target = e.currentTarget as HTMLElement | null

    if (!target || target.tagName === 'BUTTON') return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      target.click()
    }
  }

  return (
    <Component
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={ref}
      aria-disabled={disabled ? -1 : 0}
      className={cn(
        button({ variant, border, shadow, rounded, size }),
        disabled && 'bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonInner) as <T extends AllowedTags = 'button'> (
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement
