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
import { cn } from '../utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

const selectTrigger = cva(
  'w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-bg-default border border-border-default text-text-default',
        muted: 'bg-bg-muted border border-border-muted text-text-muted',
        ghost: 'bg-bg-ghost border border-border-ghost text-text-ghost',
      },
      size: {
        sm: 'text-sm py-2 px-3 min-h-9 rounded-md',
        md: 'text-base py-3 px-4 min-h-11 rounded-lg',
        lg: 'text-lg py-4 px-5 min-h-14 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const selectDropdown = cva('w-full border border-border-default', {
  variants: {
    variant: {
      default: 'bg-bg-default shadow-shadow-lg rounded-lg',
      muted: 'bg-bg-muted shadow-shadow-md rounded-lg',
      ghost: 'bg-bg-ghost shadow-shadow-md rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const selectOption = cva(
  'cursor-pointer px-4 py-3 text-base transition-colors duration-100',
  {
    variants: {
      variant: {
        default: 'text-text-default hover:bg-bg-secondary/60',
        muted: 'text-text-muted hover:bg-bg-secondary/60',
        ghost: 'text-text-ghost hover:bg-bg-secondary/60',
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
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const containerRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const resolvedOptions = children ? [] : options
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
      if (!isControlled) {
        setInternalValue(option.value)
      }
      onChange?.(option.value)
      setIsOpen(false)
    },
    [isControlled, onChange]
  )

  const handleOptionMouseEnter = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  // Close on click outside
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
    !disabled && !error && 'hover:border-border-input-hover',
    !disabled && !error && !isOpen && 'active:bg-bg-secondary/40',
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'border-border-error ring-2 ring-ring-error/30',
    isOpen && 'ring-2 ring-ring-focus',
    className
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

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className={cn(
            selectDropdown({ variant }),
            'absolute z-50 mt-1 max-h-60 overflow-y-auto border-t-2 border-t-border-accent',
            !reducedMotion && 'animate-dropdown-in',
            reducedMotion && 'opacity-100'
          )}
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
                option.value === currentValue &&
                  'bg-bg-accent/10 font-semibold text-text-accent',
                option.disabled && 'opacity-40 cursor-not-allowed',
                index === activeIndex &&
                  !option.disabled &&
                  'bg-bg-secondary/80',
                !option.disabled && 'hover:bg-bg-secondary/60'
              )}
            >
              <span className="flex items-center justify-between">
                <span>{option.label}</span>
                {option.value === currentValue && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text-accent shrink-0 ml-2"
                  >
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const Select = forwardRef(SelectInner)
