import type { Meta, StoryObj } from '@storybook/react-vite'

import { MagicText } from './MagicText'

const meta = {
  title: 'Premium Components/MagicText',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        height: '100%',
        width: '100%'
      }
    }
  },
  component: MagicText,
  argTypes: {
    text: {
      type: 'string',
      description: 'The text to display in the magic effect',
      control: 'text',
      table: {
        category: 'Config'
      }
    },
    particles: {
      type: 'number',
      description: 'Number of particles in the effect',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    dotSize: {
      type: 'number',
      description: 'Size of each particle dot',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    repulsion: {
      type: 'number',
      description: 'Repulsion force distance between mouse and particles',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    friction: {
      type: 'number',
      description: 'Friction applied to particles movement',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    returnSpeed: {
      type: 'number',
      description: 'Speed at which particles return to their original position',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    fontFamily: {
      type: 'string',
      description: 'Font family for the text',
      control: 'text',
      table: {
        category: 'Config'
      }
    },
    fontSize: {
      type: 'number',
      description: 'Font size for the text in pixels',
      control: 'number',
      table: {
        category: 'Config'
      }
    },
    color: {
      type: 'string',
      description: 'Color of the text in hex format (#RRGGBB)',
      control: 'color',
      table: {
        category: 'Config'
      }
    },
    glow: {
      type: 'boolean',
      description: 'Enable glow effect on the logo',
      control: 'boolean',
      table: {
        category: 'Effects'
      }
    },
    trace: {
      type: 'boolean',
      description: 'Enable tracing effect on the particles',
      control: 'boolean',
      table: {
        category: 'Effects'
      }
    },
    attractMode: {
      type: 'boolean',
      description: 'Enable attract mode for particles',
      control: 'boolean',
      table: {
        category: 'Effects'
      }
    },
    ariaLabel: {
      type: 'string',
      description: 'Accessible name for the canvas role="img" element. When omitted, derived from the text prop.',
      control: 'text',
      table: {
        category: 'Accessibility'
      }
    },
    className: {
      type: 'string',
      description: 'Custom CSS class for additional styling',
      control: 'text',
      table: {
        category: 'Styling'
      }
    }
  }
} satisfies Meta<typeof MagicText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Magic Text',
    particles: 500,
    dotSize: 0.9,
    repulsion: 50,
    friction: 0.82,
    returnSpeed: 0.01,
    fontFamily: 'sans-serif',
    fontSize: 50,
    glow: true,
    trace: true,
    attractMode: false
  },
  render: (args) => (
    <MagicText {...args} />
  )
}

/**
 * Explicitly sets the `ariaLabel` prop so the accessible name is deterministic
 * rather than auto-derived from the `text` prop.
 */
export const WithAriaLabel: Story = {
  args: {
    text: 'Magic Text',
    ariaLabel: 'Animated greeting text',
    particles: 500,
    dotSize: 0.9,
    repulsion: 50,
    friction: 0.82,
    returnSpeed: 0.01,
    fontFamily: 'sans-serif',
    fontSize: 50,
    glow: true,
    trace: true,
    attractMode: false
  },
  render: (args) => (
    <MagicText {...args} />
  )
}

/**
 * Shows the reduced-motion static fallback: an `<img>` element with `alt` matching
 * the `ariaLabel`, and the `<canvas>` hidden with `aria-hidden="true"`.
 * The canvas is still present in the DOM (for layout) but is not exposed to the
 * accessibility tree.
 *
 * Note: Storybook runs in a normal browser context where `prefers-reduced-motion`
 * is respected. To see this story with the static output, either:
 * - Enable "Reduce motion" in your OS accessibility settings, or
 * - Use browser DevTools to override the `prefers-reduced-motion` media query
 */
export const ReducedMotion: Story = {
  name: 'Reduced Motion Fallback',
  args: {
    text: 'Magic Text',
    ariaLabel: 'Static greeting text',
    particles: 500,
    dotSize: 0.9,
    repulsion: 50,
    friction: 0.82,
    returnSpeed: 0.01,
    fontFamily: 'sans-serif',
    fontSize: 50,
    glow: true,
    trace: true,
    attractMode: false
  },
  render: (args) => (
    <div>
      <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
        Reduced motion mode (prefers-reduced-motion: reduce)
      </p>
      <MagicText {...args} />
    </div>
  )
}
