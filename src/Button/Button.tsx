import { forwardRef } from 'react'
import type { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      rounded: 'rounded-full',
      pill: 'rounded-full px-6',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    },
    colVariant: {
      green: 'bg-green-600 text-white hover:bg-green-700',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700'
    },
    size: {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 py-2 px-4',
      lg: 'h-11 px-8',
      full: 'w-full h-10 px-4'
    }
  },
  compoundVariants: [
    {
      variant: 'outline',
      colVariant: 'green',
      className: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
    }
  ],
  defaultVariants: {
    variant: 'default',
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
  { as, children, variant, colVariant, size, className, ...props }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement {
  const Component = as || 'button'

  return (
    <Component
      ref={ref}
      className={cn(button({ variant, colVariant, size }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonInner) as <T extends AllowedTags = 'button'> (
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement<T>
