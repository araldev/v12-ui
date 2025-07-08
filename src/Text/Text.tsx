import { forwardRef } from 'react'
import type { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'

type AllowedTags =
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'strong' | 'small' | 'em'
  | 'b' | 'i' | 'u' | 'mark' | 'del' | 'ins'
  | 'code' | 'kbd' | 'samp' | 'var' | 'cite'
  | 'q' | 'pre' | 'blockquote'

type PolymorphicProps<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
} & WithoutAs<ComponentPropsWithRef<T>>

function TextInner<T extends AllowedTags = 'p'> (
  { as, children, className, ...props }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement {
  const Component = as || 'p' as ElementType

  return (
    <Component
      ref={ref}
      className={cn('text-3xl font-bold underline', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Text = forwardRef(TextInner) as <T extends AllowedTags = 'p'>(
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement
