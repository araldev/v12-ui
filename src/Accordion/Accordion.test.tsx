import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem } from './Accordion'

const getButtons = () => screen.getAllByRole('button')

const renderAccordion = (props?: React.ComponentProps<typeof Accordion>) => {
  return render(
    <Accordion {...props}>
      <AccordionItem title="First Item">First content</AccordionItem>
      <AccordionItem title="Second Item">Second content</AccordionItem>
      <AccordionItem title="Third Item">Third content</AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  describe('Rendering', () => {
    it('renders collapsed by default', () => {
      renderAccordion()
      const buttons = getButtons()
      expect(buttons).toHaveLength(3)
      buttons.forEach((btn) => {
        expect(btn).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('renders with default variant', () => {
      renderAccordion({ variant: 'default' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-text-default')
    })

    it('renders with muted variant', () => {
      renderAccordion({ variant: 'muted' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-text-muted')
    })

    it('renders with ghost variant', () => {
      renderAccordion({ variant: 'ghost' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-text-ghost')
    })

    it('renders with sm size', () => {
      renderAccordion({ size: 'sm' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-sm')
    })

    it('renders with md size', () => {
      renderAccordion({ size: 'md' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-base')
    })

    it('renders with lg size', () => {
      renderAccordion({ size: 'lg' })
      const buttons = getButtons()
      expect(buttons[0]).toHaveClass('text-lg')
    })

    it('renders item titles', () => {
      renderAccordion()
      expect(screen.getByRole('button', { name: 'First Item' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Second Item' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Third Item' })).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('expands on click', async () => {
      const user = userEvent.setup()
      renderAccordion()
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      await user.click(firstButton)
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('collapses on second click', async () => {
      const user = userEvent.setup()
      renderAccordion()
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      await user.click(firstButton)
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      })
      await user.click(firstButton)
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('toggles with Enter key', async () => {
      const user = userEvent.setup()
      renderAccordion()
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      firstButton.focus()
      await user.keyboard('{Enter}')
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('toggles with Space key', async () => {
      renderAccordion()
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      firstButton.focus()
      fireEvent.keyDown(firstButton, { key: ' ' })
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('calls onToggle when expanded', async () => {
      const onToggle = vi.fn()
      renderAccordion({ onToggle })
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      await userEvent.click(firstButton)
      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledWith(true)
      })
    })

    it('calls onToggle when collapsed', async () => {
      const onToggle = vi.fn()
      render(
        <Accordion onToggle={onToggle}>
          <AccordionItem title="First Item" defaultExpanded>
            First content
          </AccordionItem>
        </Accordion>
      )
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      await userEvent.click(firstButton)
      await waitFor(() => {
        expect(onToggle).toHaveBeenCalledWith(false)
      })
    })
  })

  describe('Accessibility', () => {
    it('has aria-expanded on triggers', () => {
      renderAccordion()
      const buttons = getButtons()
      buttons.forEach((btn) => {
        expect(btn).toHaveAttribute('aria-expanded')
      })
    })

    it('has aria-controls linking trigger to content', () => {
      renderAccordion()
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      const contentId = firstButton.getAttribute('aria-controls')
      expect(contentId).toBeTruthy()
      expect(document.getElementById(contentId!)).toBeInTheDocument()
    })

    it('content region has role="region"', () => {
      renderAccordion()
      const regions = document.querySelectorAll('[role="region"]')
      expect(regions.length).toBeGreaterThan(0)
    })
  })

  describe('Disabled state', () => {
    it('disabled item cannot be toggled', async () => {
      render(
        <Accordion>
          <AccordionItem title="Disabled Item" disabled>
            Disabled content
          </AccordionItem>
        </Accordion>
      )
      const trigger = screen.getByRole('button', { name: 'Disabled Item' })
      expect(trigger).toHaveAttribute('aria-disabled', 'true')
      await userEvent.click(trigger)
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
      })
    })

    it('disabled accordion cannot be toggled', async () => {
      renderAccordion({ disabled: true })
      const firstButton = screen.getByRole('button', { name: 'First Item' })
      expect(firstButton).toHaveAttribute('aria-disabled', 'true')
      await userEvent.click(firstButton)
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'false')
      })
    })
  })

  describe('prefers-reduced-motion', () => {
    it('sets data-reduced-motion attribute when motion preference is reduced', () => {
      const originalMatchMedia = window.matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      })

      renderAccordion()
      const accordion = document.querySelector('[data-reduced-motion]')
      expect(accordion).toHaveAttribute('data-reduced-motion', 'true')

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      })
    })

    it('does not set data-reduced-motion when motion is allowed', () => {
      const originalMatchMedia = window.matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      })

      renderAccordion()
      const accordion = document.querySelector('[data-reduced-motion]')
      expect(accordion).toHaveAttribute('data-reduced-motion', 'false')

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      })
    })
  })
})
