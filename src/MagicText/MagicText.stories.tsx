import type { Meta, StoryObj } from '@storybook/react-vite'

import { MagicText } from './MagicText'

const meta = {
  title: 'Components/MagicText',
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
      control: 'text'
    },
    particles: {
      type: 'number',
      description: 'Number of particles in the effect',
      control: 'number'
    },
    dotSize: {
      type: 'number',
      description: 'Size of each particle dot',
      control: 'number'
    },
    repulsion: {
      type: 'number',
      description: 'Repulsion force distance between mouse and particles',
      control: 'number'
    },
    friction: {
      type: 'number',
      description: 'Friction applied to particles movement',
      control: 'number'
    },
    returnSpeed: {
      type: 'number',
      description: 'Speed at which particles return to their original position',
      control: 'number'
    },
    fontFamily: {
      type: 'string',
      description: 'Font family for the text',
      control: 'text'
    },
    fontSize: {
      type: 'number',
      description: 'Font size for the text in pixels',
      control: 'number'
    },
    textColor: {
      type: 'string',
      description: 'Color of the text in hex format (#RRGGBB)',
      control: 'color'
    }
  }
} satisfies Meta<typeof MagicText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Magic Text',
    particles: 100000,
    dotSize: 1.5,
    repulsion: 100,
    friction: 0.82,
    returnSpeed: 0.01,
    fontFamily: 'sans-serif',
    fontSize: 80
  },
  render: (args) => (
    <MagicText {...args} />
  )
}
