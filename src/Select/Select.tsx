import {
  forwardRef,
  useId,
  useCallback,
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

const selectTrigger = cva(
  'relative flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-bg-default border border-border-default text-text-default hover:border-border-input-hover',
        muted: 'bg-bg-muted border border-border-muted text-text-muted hover:border-border-muted',
        ghost: 'bg-bg-ghost border border-border-ghost text-text-ghost hover:border-border-ghost-hover',
      },
      size: {
        sm: 'text-sm py-2 px-3 min-h-9',
        md: 'text-base py-3 px-4 min-h-11',
        lg: 'text-lg py-4 px-5 min-h-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const selectDropdown = cva(
  'absolute z-50 w-full overflow-hidden border border-border-default shadow-shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-bg-default',
        muted: 'bg-bg-muted',
        ghost: 'bg-bg-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const selectOption = cva(
  'cursor-pointer px-4 py-2 text-base transition-colors duration-100',
  {
    variants: {
      variant: {
        default: 'text-text-default hover:bg-bg-secondary',
        muted: 'text-text-muted hover:bg-bg-secondary',
        ghost: 'text-text-ghost hover:bg-bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type SelectProps = VariantProps<typeof selectTrigger> & {
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  children?: ReactNode
}

function useIsReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function SelectInner(
  {
    options = [],
    placeholder = 'Select an option',
    variant = 'default',
    size = 'md',
    disabled,
    error,
    value,
    defaultValue,
    onChange,
    className,
    children,
  }: SelectProps,
  ref: React.Ref<HTMLButtonElement>
): ReactElement {
  const generatedId = useId()
  const listboxId = `select-listbox-${generatedId}`
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : defaultValue ?? ''

  const resolvedOptions = children
    ? ([] as SelectOption[])
    : options

  const allOptions = resolvedOptions

  const selectedOption = allOptions.find((opt) => opt.value === currentValue)

  const reducedMotion = useIsReducedMotion()

  const handleTriggerClick = useCallback(() => {
    if (disabled) return
    setIsOpen((prev) => !prev)
  }, [disabled])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setActiveIndex((prev) => Math.min(prev + 1, allOptions.length - 1))
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (isOpen) {
            setActiveIndex((prev) => Math.max(prev - 1, 0))
          }
          break
        case 'Enter':
          e.preventDefault()
          if (isOpen && allOptions[activeIndex]) {
            const opt = allOptions[activeIndex]
            if (!opt.disabled) {
              onChange?.(opt.value)
              setIsOpen(false)
            }
          } else {
            setIsOpen(true)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
        case 'Tab':
          setIsOpen(false)
          break
      }
    },
    [disabled, isOpen, allOptions, activeIndex, onChange]
  )

  const handleOptionClick = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return
      onChange?.(option.value)
      setIsOpen(false)
    },
    [onChange]
  )

  const handleOptionMouseEnter = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const triggerClasses = cn(
    selectTrigger({ variant, size }),
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'border-border-error',
    isOpen && 'ring-2 ring-ring-focus',
    className
  )

  const dropdownClasses = cn(
    selectDropdown({ variant }),
    !reducedMotion && 'transition-all duration-150 ease-out',
    reducedMotion ? '' : isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
  )

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled ?? undefined}
        aria-errormessage={error ? 'select-error' : undefined}
        aria-activedescendant={
          isOpen && activeIndex >= 0
            ? `${listboxId}-option-${activeIndex}`
            : undefined
        }
        disabled={disabled}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        className={triggerClasses}
      >
        <span className={cn(!selectedOption && 'text-text-muted')}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span
          className={cn(
            'ml-2 inline-block transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {error && (
        <span id="select-error" className="text-sm text-text-error mt-1">
          Please select an option
        </span>
      )}

      {isOpen &&
        createPortal(
          <div
            id={listboxId}
            role="listbox"
            aria-label={placeholder}
            className={cn(
              dropdownClasses,
              'max-h-60 overflow-y-auto'
            )}
            style={{
              position: 'fixed',
              top: containerRef.current
                ? containerRef.current.getBoundingClientRect().bottom + 4
                : 0,
              left: containerRef.current
                ? containerRef.current.getBoundingClientRect().left
                : 0,
              width: containerRef.current
                ? containerRef.current.getBoundingClientRect().width
                : '100%',
            }}
          >
            {allOptions.map((option, index) => (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={option.value === currentValue}
                aria-disabled={option.disabled ?? undefined}
                data-active={index === activeIndex}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
                className={cn(
                  selectOption({ variant }),
                  option.value === currentValue && 'bg-bg-secondary font-medium',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                  index === activeIndex && !option.disabled && 'bg-bg-secondary'
                )}
              >
                {option.label}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  )
}

export const Select = forwardRef(SelectInner)
