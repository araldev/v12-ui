import { forwardRef, type ComponentPropsWithRef, type ElementType, type ReactElement, type ReactNode } from 'react'

type AllowedTextTags =
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'strong' | 'small' | 'em'
  | 'b' | 'i' | 'u' | 'mark' | 'del' | 'ins'
  | 'code' | 'kbd' | 'samp' | 'var' | 'cite'
  | 'q' | 'pre' | 'blockquote'

type PropsText<Tag extends AllowedTextTags = 'p'> = {
  children?: ReactNode
  as?: Tag
} & Omit<ComponentPropsWithRef<Tag>, 'as'>

export const Text = forwardRef(<Tag extends AllowedTextTags = 'p'>({
  as,
  children,
  className = '',
  ref,
  ...props
}: PropsText<Tag>): ReactElement => {
  const Component = (as || 'p') as ElementType

  return (
    <Component className={`text-3xl font-bold underline ${className}`} {...props} ref={ref}>
      {children}
    </Component>
  )
})
