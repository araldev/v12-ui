import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stack } from './Stack'
import type { ComponentPropsWithRef } from 'react'

const meta = {
  title: 'Components/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  component: Stack,
  argTypes: {
    childrenQuantity: {
      type: 'number',
      description: 'Number of children to render',
      control: 'number',
      defaultValue: 3
    },
    children: {
      type: 'symbol',
      description: 'The Stack content',
      control: false,
      defaultValue: 'div'
    },
    as: {
      type: 'string',
      description: 'HTMLElement',
      control: 'text'
    },
    direction: {
      type: 'string',
      description: 'Chose the direction of inner items',
      options: ['row', 'col', 'row-reverse', 'col-reverse'],
      control: 'select',
      defaultValue: 'row'
    },
    spacing: {
      type: 'number',
      description: 'Spacing between items',
      control: 'number',
      defaultValue: 4
    },
    className: {
      type: 'string',
      description: 'Add your own classes',
      control: false
    }
  }
} satisfies Meta<InnerComponentAndStackProps>

type InnerComponentAndStackProps = ComponentPropsWithRef<typeof Stack> & {
  childrenQuantity?: number
}

export default meta
type Story = StoryObj<InnerComponentAndStackProps>

const InnerComponent: Story = {
  render: ({ childrenQuantity, ...props }: InnerComponentAndStackProps) => {
    return (
      <Stack {...props}>
        {Array.from({ length: childrenQuantity || 3 }, (_, i) => i + 1).map(Component => (
          <div key={Component} className='w-32 h-32 font-bold text-3xl flex items-center justify-center bg-amber-950 text-white p-4 rounded'>
            Item {Component}
          </div>
        )
        )}
      </Stack>
    )
  }
}

export const Default: Story = {
  ...InnerComponent,
  args: {
    childrenQuantity: 3,
    as: 'div',
    direction: 'row',
    spacing: 4,
    className: ''
  }
}
