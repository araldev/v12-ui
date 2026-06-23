import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from './Toggle'

const renderToggle = (
  props?: React.ComponentProps<typeof Toggle>
) => {
  return render(<Toggle {...props} />)
}

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders with default state (off)', () => {
      renderToggle()
      const toggle = screen.getByRole('switch')
      expect(toggle).toBeInTheDocument()
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    it('renders with on state', () => {
      renderToggle({ defaultChecked: true })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-checked', 'true')
    })

    it('renders with default variant', () => {
      renderToggle({ variant: 'default' })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('bg-bg-secondary')
    })

    it('renders with muted variant', () => {
      renderToggle({ variant: 'muted' })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('bg-bg-muted')
    })

    it('renders with sm size', () => {
      renderToggle({ size: 'sm' })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('h-5', 'w-9', 'rounded-full')
    })

    it('renders with md size', () => {
      renderToggle({ size: 'md' })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('h-6', 'w-11', 'rounded-full')
    })

    it('renders with lg size', () => {
      renderToggle({ size: 'lg' })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveClass('h-7', 'w-14', 'rounded-full')
    })

    it('renders with children label', () => {
      renderToggle({ children: 'Enable notifications' })
      expect(screen.getByText('Enable notifications')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('toggles on click', async () => {
      const user = userEvent.setup()
      renderToggle()
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'true')
    })

    it('toggles off on second click', async () => {
      const user = userEvent.setup()
      renderToggle({ defaultChecked: true })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    it('calls onChange when toggled', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderToggle({ onChange })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('calls onChange with false when toggled off', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderToggle({ onChange, defaultChecked: true })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(onChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Keyboard activation', () => {
    it('toggles on Enter key', async () => {
      const user = userEvent.setup()
      renderToggle()
      const toggle = screen.getByRole('switch')
      toggle.focus()
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-checked', 'true')
    })

    it('toggles on Space key', async () => {
      renderToggle()
      const toggle = screen.getByRole('switch')
      toggle.focus()
      fireEvent.keyDown(toggle, { key: ' ' })
      await waitFor(() => {
        expect(toggle).toHaveAttribute('aria-checked', 'true')
      })
    })
  })

  describe('Accessibility', () => {
    it('has role="switch"', () => {
      renderToggle()
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('has aria-checked attribute', () => {
      renderToggle()
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-checked')
    })

    it('has aria-readonly when readonly', () => {
      renderToggle({ readonly: true })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-readonly', 'true')
    })
  })

  describe('Disabled state', () => {
    it('disabled toggle cannot be toggled', async () => {
      const user = userEvent.setup()
      renderToggle({ disabled: true })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderToggle({ disabled: true, onChange })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Readonly state', () => {
    it('readonly toggle visual state unchanged on click', async () => {
      const user = userEvent.setup()
      renderToggle({ readonly: true })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })

    it('does not call onChange when readonly', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      renderToggle({ readonly: true, onChange })
      const toggle = screen.getByRole('switch')
      await user.click(toggle)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Controlled mode', () => {
    it('reflects controlled checked prop', () => {
      renderToggle({ checked: true })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-checked', 'true')
    })

    it('reflects controlled false checked prop', () => {
      renderToggle({ checked: false })
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('aria-checked', 'false')
    })
  })

  describe('prefers-reduced-motion', () => {
    it('sets data-reduced-motion when motion is reduced', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      })

      renderToggle()
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('data-reduced-motion', 'true')
    })

    it('does not set data-reduced-motion when motion is allowed', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      })

      renderToggle()
      const toggle = screen.getByRole('switch')
      expect(toggle).toHaveAttribute('data-reduced-motion', 'false')
    })
  })
})
