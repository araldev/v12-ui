import '../index.css'
import { forwardRef } from 'react'
import type { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react'
import type { WithoutAs } from '../utils/polymorphicTypes'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const text = cva('', {
  variants: {
    variant: {
      default: 'text-text-default',
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      accent: 'text-text-accent',
      success: 'text-text-success',
      warning: 'text-text-warning',
      error: 'text-text-error',
      info: 'text-text-info'
    },
    hover: {
      true: '',
      false: ''
    },
    textShadow: {
      none: '',
      black_p: 'text-shadow-shadow-black-p',
      black_title: 'text-shadow-shadow-black-title',
      success_p: 'text-shadow-shadow-success-p',
      success_title: 'text-shadow-shadow-success-title',
      warning_p: 'text-shadow-shadow-warning-p',
      warning_title: 'text-shadow-shadow-warning-title',
      error_p: 'text-shadow-shadow-error-p',
      error_title: 'text-shadow-shadow-error-title',
      info_p: 'text-shadow-shadow-info-p',
      info_title: 'text-shadow-shadow-info-title'
    },
    fontSize: {
      small_responsive: 'size-text-small',
      paragraph_responsive: 'size-text-paragraph',
      subtitle_responsive: 'size-text-subtitle',
      title_responsive: 'size-text-title'
    },
    fontWeight: {
      auto: '',
      small: 'font-weight-small',
      paragraph: 'font-weight-paragraph',
      subtitle: 'font-weight-subtitle',
      title: 'font-weight-title'
    }
  },
  compoundVariants: [
    { variant: 'default', hover: true, className: 'hover:text-text-inverse' },
    { variant: 'primary', hover: true, className: 'hover:text-text-primary-hover' },
    { variant: 'secondary', hover: true, className: 'hover:text-text-secondary-hover' },
    { variant: 'muted', hover: true, className: 'hover:text-text-muted-hover' },
    { variant: 'accent', hover: true, className: 'hover:text-text-accent-hover' },
    { variant: 'success', hover: true, className: 'hover:text-text-success-hover' },
    { variant: 'warning', hover: true, className: 'hover:text-text-warning-hover' },
    { variant: 'error', hover: true, className: 'hover:text-text-error-hover' },
    { variant: 'info', hover: true, className: 'hover:text-text-info-hover' },
    { fontSize: 'small_responsive', fontWeight: 'auto', className: 'font-weight-small' },
    { fontSize: 'paragraph_responsive', fontWeight: 'auto', className: 'font-weight-paragraph' },
    { fontSize: 'subtitle_responsive', fontWeight: 'auto', className: 'font-weight-subtitle' },
    { fontSize: 'title_responsive', fontWeight: 'auto', className: 'font-weight-title' }
  ],
  defaultVariants: {
    variant: 'default',
    hover: false,
    textShadow: 'none',
    fontSize: 'paragraph_responsive',
    fontWeight: 'auto'
  }
})

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
} & WithoutAs<ComponentPropsWithRef<T>> & VariantProps<typeof text>

function TextInner<T extends AllowedTags = 'p'> (
  { as, children, variant, hover, textShadow, fontSize, fontWeight, className, ...props }: PolymorphicProps<T>,
  ref: Ref<T>
): ReactElement {
  const Component = as || 'p' as ElementType

  return (
    <Component
      ref={ref}
      className={cn(text({ variant, hover, textShadow, fontSize, fontWeight }), '', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const Text = forwardRef(TextInner) as <T extends AllowedTags = 'p'>(
  props: PolymorphicProps<T> & { ref?: Ref<T> }
) => ReactElement
