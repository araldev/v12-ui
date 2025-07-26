import React, { forwardRef } from 'react'
import type { ReactElement, ComponentPropsWithRef, Ref } from 'react'
import type { WithoutSharedProperties } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'

type AllowedTags = 'div' | 'span' | 'section' | 'article' | 'nav' | 'aside' & keyof React.JSX.IntrinsicElements

type PolymorphicProps<T extends AllowedTags = 'div'> = {
  as?: T
  children?: ReactElement | ReactElement[]
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  spacing?: number | 'none'
  className?: string
} & WithoutSharedProperties<ComponentPropsWithRef<T>>

const StackInner = <T extends AllowedTags = 'div'>(
  {
    as,
    children,
    direction = 'row',
    spacing = 4,
    className,
    ...props
  }: PolymorphicProps<T>,
  ref: Ref<any>
): ReactElement => {
  const Component: AllowedTags = as || 'div'

  return (
    <Component
      ref={ref}
      {...props}
      className={cn(
        'flex flex-wrap',
        direction != null && `flex-${String(direction)}`,
        spacing != null && `gap-${String(spacing)}`,
        className
      )}
    >
      {children}
    </Component>
  )
}

export const Stack = forwardRef(StackInner)
