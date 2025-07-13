import { forwardRef } from 'react'
import type { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('flex justify-center items-center hover:cursor-pointer', {
  variants: {
    variant: {
      primary: 'bg-bg-primary hover:bg-bg-primary-hover',
      secondary: 'bg-bg-secondary hover:bg-bg-secondary-hover',
      muted: 'bg-bg-muted hover:bg-bg-muted-hover',
      accent: 'bg-bg-accent hover:bg-bg-accent-hover',
      success: 'bg-bg-success hover:bg-bg-success-hover',
      warning: 'bg-bg-warning hover:bg-bg-warning-hover',
      error: 'bg-bg-error hover:bg-bg-error-hover',
      info: 'bg-bg-info hover:bg-bg-info-hover',
      disabled: 'bg-bg-disabled hover:cursor-not-allowed'
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
    { variant: 'disabled', border: true, className: 'border-border-disabled' }
  ],
  defaultVariants: {
    variant: 'primary',
    border: true,
    shadow: 'default',
    rounded: 'pill',
    size: 'md'
  }
})

type AllowedTags = 'button' | 'a'

type PolymorphicProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
} & WithoutAs<ComponentPropsWithRef<T>> & VariantProps<typeof button>

function ButtonInner<T extends ElementType = 'button'> (
  { as, children, variant, border, shadow, rounded, size, className, ...props }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement {
  const Component = as || 'button'

  return (
    <Component
      ref={ref}
      className={cn(button({ variant, border, shadow, rounded, size }), className, '')}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonInner) as <T extends AllowedTags = 'button'> (
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement<T>
