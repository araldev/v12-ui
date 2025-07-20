import { forwardRef } from 'react'
import type { ReactElement, ComponentPropsWithRef, ElementType, Ref } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'

type AllowedTags = 'div' | 'span' | 'section' | 'article' | 'nav' | 'aside'

type PolymorphicProps<T extends ElementType = 'div'> = {
  as?: T
  children?: ReactElement | ReactElement[]
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  spacing?: number
  className?: string
} & WithoutAs<ComponentPropsWithRef<T>>

const StackInner = <T extends ElementType = 'div'>(
  {
    as,
    children,
    direction = 'row',
    spacing = 4,
    className,
    ...props
  }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement => {
  const Component = as || 'div'

  return (
    <Component
      ref={ref}
      className={cn(
        'flex flex-wrap',
        direction != null && `flex-${String(direction)}`,
        spacing != null && `gap-${String(spacing)}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Stack = forwardRef(StackInner) as <T extends AllowedTags = 'div'>(
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement
