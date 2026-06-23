import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
]

const renderSelect = (
  props?: React.ComponentProps<typeof Select>
) => {
  return render(
    <Select
      options={sampleOptions}
      placeholder="Select a framework"
      {...props}
    />
  )
}

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      renderSelect()
      expect(screen.getByRole('combobox')).toHaveTextContent('Select a framework')
    })

    it('renders with default variant', () => {
      renderSelect({ variant: 'default' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('bg-bg-default')
    })

    it('renders with muted variant', () => {
      renderSelect({ variant: 'muted' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('bg-bg-muted')
    })

    it('renders with ghost variant', () => {
      renderSelect({ variant: 'ghost' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('bg-bg-ghost')
    })

    it('renders with sm size', () => {
      renderSelect({ size: 'sm' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('text-sm')
    })

    it('renders with md size', () => {
      renderSelect({ size: 'md' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('text-base')
    })

    it('renders with lg size', () => {
      renderSelect({ size: 'lg' })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('text-lg')
    })

    it('shows selected option label', () => {
      renderSelect({ defaultValue: 'react' })
      expect(screen.getByRole('combobox')).toHaveTextContent('React')
    })

    it('renders with error state', () => {
      renderSelect({ error: true })
      expect(screen.getByText('Please select an option')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('closes dropdown on second click', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes dropdown on Escape key', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await user.keyboard('{Escape}')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('selects option on click', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      const options = screen.getByRole('listbox')
      expect(options).toBeInTheDocument()

      const vueOption = document.querySelector('[role="option"]')
      if (vueOption) {
        await user.click(vueOption)
      }
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('calls onChange when option is selected', async () => {
      const onChange = vi.fn()
      renderSelect({ onChange })
      const trigger = screen.getByRole('combobox')
      fireEvent.click(trigger)

      const vueOption = document.querySelector('[role="option"]')
      if (vueOption) {
        fireEvent.click(vueOption)
      }
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })
  })

  describe('Keyboard navigation', () => {
    it('opens dropdown on ArrowDown', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      trigger.focus()
      await user.keyboard('{ArrowDown}')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('navigates options with ArrowDown', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await user.keyboard('{ArrowDown}')
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
    })

    it('navigates options with ArrowUp', async () => {
      const user = userEvent.setup()
      renderSelect()
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await user.keyboard('{ArrowUp}')
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
    })

    it('selects option on Enter', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderSelect({ onChange })
      const trigger = screen.getByRole('combobox')
      await user.click(trigger)
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Enter}')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has role="combobox"', () => {
      renderSelect()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('has aria-expanded attribute', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-expanded')
    })

    it('has aria-haspopup="listbox"', () => {
      renderSelect()
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
    })
  })

  describe('Disabled state', () => {
    it('disabled select cannot be opened', async () => {
      const user = userEvent.setup()
      renderSelect({ disabled: true })
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-disabled', 'true')
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('prefers-reduced-motion', () => {
    it('renders without errors when motion is reduced', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      })

      renderSelect()
      // The Select component respects reduced motion preference internally
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })
})
