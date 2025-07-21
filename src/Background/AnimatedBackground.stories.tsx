import type { Meta, StoryObj } from '@storybook/react-vite'

import { AnimatedBackground, type PropsAnimatedBackground } from './AnimatedBackground'

const meta = {
  title: 'Components/AnimatedBackground',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // This is to ensure the background takes
    // full viewport height on the storybook page
    docs: {
      story: {
        inline: false,
        height: '40vh',
        width: '40wh'
      }
    }
  },
  component: AnimatedBackground,
  argTypes: {
    theme: {
      type: 'string',
      options: ['dark', 'light', 'transparent'],
      control: 'select',
      description: 'Background theme'
    },
    bubbleGradiant1: {
      table: {
        type: { summary: 'HexColor[]' }
      },
      description: 'First bubble gradient colors',
      control: 'select',
      options: [['#004e92', '#000428'], ['#00C9FF', '#92FE9D'], ['#e0f7f4', '#a3e9ff']]
    },
    bubbleGradiant2: {
      table: {
        type: { summary: 'HexColor[]' }
      },
      description: 'Second bubble gradient colors',
      control: 'select',
      options: [['#004e92', '#000428'], ['#00C9FF', '#92FE9D'], ['#e0f7f4', '#a3e9ff']]
    },
    bubbleGradiant3: {
      table: {
        type: { summary: 'HexColor[]' }
      },
      description: 'Third bubble gradient colors',
      control: 'select',
      options: [['#004e92', '#000428'], ['#00C9FF', '#92FE9D'], ['#e0f7f4', '#a3e9ff']]
    },
    zIndex: {
      type: 'number',
      description: 'z-index of the background',
      control: 'number',
      defaultValue: -9999
    },
    className: {
      type: 'string',
      description: 'Add your own styles',
      control: 'text'
    }
  }
} satisfies Meta<PropsAnimatedBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    theme: 'dark',
    bubbleGradiant1: ['#004e92', '#000428'],
    bubbleGradiant2: ['#00C9FF', '#92FE9D'],
    bubbleGradiant3: ['#e0f7f4', '#a3e9ff'],
    zIndex: -9999,
    className: ''
  }
}
