import type { Meta, StoryObj } from '@storybook/react-vite'

import { MagicLogo } from './MagicLogo'

const meta = {
  title: 'Premium Components/MagicLogo',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        height: '100%',
        width: '100%'
      }
    }
  },
  component: MagicLogo,
  argTypes: {
    imageUrl: {
      type: 'string',
      description: 'URL of the image to use as the logo',
      control: 'text',
      table: {
        category: 'Image URL'
      }
    },
    imageElement: {
      type: 'symbol',
      description: 'React element to use as the logo image',
      control: 'text',
      table: {
        category: 'Image Element'
      }
    },
    svgContent: {
      type: 'string',
      description: 'Inline SVG content for the logo',
      control: 'text',
      table: {
        category: 'SVG Content'
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
    color: {
      type: 'string',
      description: 'Color of the logo in hex format (e.g., #ffffff)',
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
    className: {
      type: 'string',
      description: 'Custom CSS class for additional styling',
      control: 'text',
      table: {
        category: 'Styling'
      }
    }
  }
} satisfies Meta<typeof MagicLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    imageUrl: '/src/assets/brand-araldev-miniatura.webp',
    imageElement: undefined,
    svgContent: undefined,
    particles: 750,
    dotSize: 0.9,
    repulsion: 50,
    friction: 0.82,
    returnSpeed: 0.01,
    glow: true,
    trace: true,
    attractMode: false
  }
}
