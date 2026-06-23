import React, {
  forwardRef,
  useId,
  useCallback,
  useState,
  useContext,
  useRef,
  useEffect,
  createContext,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const accordionTrigger = cva(
  'flex w-full items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'text-text-default hover:text-text-default-hover',
        muted: 'text-text-muted hover:text-text-muted-hover',
        ghost: 'text-text-ghost hover:text-text-ghost-hover',
      },
      size: {
        sm: 'text-sm py-2.5 px-4',
        md: 'text-base py-3 px-5',
        lg: 'text-lg py-4 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const accordionContent = cva(
  'overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-text-default',
        muted: 'text-text-muted',
        ghost: 'text-text-ghost',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

type AccordionVariant = 'default' | 'muted' | 'ghost'
type AccordionSize = 'sm' | 'md' | 'lg'

interface AccordionContextValue {
  variant: AccordionVariant
  size: AccordionSize
  disabled?: boolean
  defaultExpanded: boolean
  expanded?: boolean
  onToggle?: (expanded: boolean) => void
  reducedMotion?: boolean
  registerItem?: (id: string, triggerRef: HTMLButtonElement | null) => void
  unregisterItem?: (id: string) => void
  onFocusChange?: (currentId: string, direction: 'next' | 'prev') => void
}

const AccordionContext = createContext<AccordionContextValue>({
  variant: 'default',
  size: 'md',
  defaultExpanded: false,
})

export type AccordionProps = VariantProps<typeof accordionTrigger> & {
  children?: ReactNode
  className?: string
  disabled?: boolean
  defaultExpanded?: boolean
  expanded?: boolean
  onToggle?: (expanded: boolean) => void
}

export interface AccordionItemProps
  extends VariantProps<typeof accordionTrigger> {
  title: string
  children: ReactNode
  disabled?: boolean
  defaultExpanded?: boolean
  expanded?: boolean
  onToggle?: (expanded: boolean) => void
}

function useIsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function AccordionItemInner(
  {
    title,
    children,
    variant,
    size,
    disabled,
    defaultExpanded = false,
    expanded,
    onToggle,
  }: AccordionItemProps,
  ref: React.Ref<HTMLButtonElement>
): ReactElement {
  const ctx = useContext(AccordionContext)

  const resolvedVariant = (variant ?? ctx.variant) as AccordionVariant
  const resolvedSize = (size ?? ctx.size) as AccordionSize
  const resolvedDisabled = disabled ?? ctx.disabled
  const resolvedDefaultExpanded = defaultExpanded ?? ctx.defaultExpanded
  const resolvedReducedMotion = ctx.reducedMotion ?? false

  const generatedId = useId()
  const contentId = `accordion-content-${generatedId}`
  const triggerId = `accordion-trigger-${generatedId}`

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    ctx.registerItem?.(triggerId, triggerRef.current)
    return () => ctx.unregisterItem?.(triggerId)
  }, [ctx, triggerId])

  const isControlled = expanded !== undefined || ctx.expanded !== undefined
  const [internalExpanded, setInternalExpanded] = useState(resolvedDefaultExpanded)
  const effectiveExpanded = isControlled
    ? (expanded ?? ctx.expanded)
    : internalExpanded

  const handleToggle = useCallback(() => {
    if (resolvedDisabled) return
    const next = !effectiveExpanded
    if (!isControlled) {
      setInternalExpanded(next)
    }
    onToggle?.(next)
    ctx.onToggle?.(next)
  }, [resolvedDisabled, effectiveExpanded, isControlled, onToggle, ctx])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggle()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        ctx.onFocusChange?.(triggerId, 'next')
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        ctx.onFocusChange?.(triggerId, 'prev')
      }
    },
    [handleToggle, ctx, triggerId]
  )

  return (
    <div
      data-accordion-item
      className={cn(
        'border-b border-border-default last:border-b-0',
        resolvedDisabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <button
        ref={(node) => {
          triggerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref && 'current' in ref) {
            ref.current = node
          }
        }}
        id={triggerId}
        type="button"
        role="button"
        aria-expanded={effectiveExpanded}
        aria-controls={contentId}
        aria-disabled={resolvedDisabled ?? undefined}
        disabled={resolvedDisabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          accordionTrigger({ variant: resolvedVariant, size: resolvedSize }),
          resolvedDisabled && 'cursor-not-allowed hover:cursor-not-allowed'
        )}
      >
        <span className="flex-1 font-medium">{title}</span>
        <span
          className={cn(
            'flex-shrink-0 transition-transform duration-200 ease-out',
            effectiveExpanded ? 'rotate-180' : 'rotate-0'
          )}
          aria-hidden="true"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6.75L9 11.25L13.5 6.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid',
          !resolvedReducedMotion && 'transition-[grid-template-rows] duration-200 ease-out'
        )}
        style={
          effectiveExpanded
            ? { gridTemplateRows: '1fr' }
            : { gridTemplateRows: '0fr' }
        }
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              accordionContent({ variant: resolvedVariant, size: resolvedSize }),
              // Indent content relative to trigger with left border accent
              'pl-5 py-3 border-l-2 border-border-accent/30'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export const AccordionItem = forwardRef(AccordionItemInner)

function AccordionRoot(
  {
    children,
    className,
    variant = 'default',
    size = 'md',
    disabled,
    defaultExpanded = false,
    expanded,
    onToggle,
  }: AccordionProps,
  ref: React.Ref<HTMLDivElement>
): ReactElement {
  const reducedMotion = useIsReducedMotion()
  const itemRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map())

  const registerItem = useCallback(
    (id: string, triggerRef: HTMLButtonElement | null) => {
      itemRefs.current.set(id, triggerRef)
    },
    []
  )

  const unregisterItem = useCallback((id: string) => {
    itemRefs.current.delete(id)
  }, [])

  const onFocusChange = useCallback(
    (currentId: string, direction: 'next' | 'prev') => {
      const ids = Array.from(itemRefs.current.keys())
      const currentIndex = ids.indexOf(currentId)
      if (currentIndex === -1) return

      let nextIndex: number
      if (direction === 'next') {
        nextIndex = currentIndex === ids.length - 1 ? 0 : currentIndex + 1
      } else {
        nextIndex = currentIndex === 0 ? ids.length - 1 : currentIndex - 1
      }

      const nextId = ids[nextIndex]
      const nextRef = itemRefs.current.get(nextId)
      nextRef?.focus()
    },
    []
  )

  const contextValue: AccordionContextValue = {
    variant: (variant ?? 'default') as AccordionVariant,
    size: (size ?? 'md') as AccordionSize,
    disabled,
    defaultExpanded,
    expanded,
    onToggle,
    reducedMotion,
    registerItem,
    unregisterItem,
    onFocusChange,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn('w-full', className)}
        data-reduced-motion={reducedMotion}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export const Accordion = forwardRef(AccordionRoot)
