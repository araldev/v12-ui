import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stack } from './Stack'
import type { ComponentPropsWithRef } from 'react'

const meta = {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  component: Stack,
  argTypes: {
    childrenQuantity: {
      type: 'number',
      description: 'Number of children to render',
      control: 'number'
    },
    children: {
      type: 'symbol',
      description: 'The Stack content',
      control: false
    },
    as: {
      type: 'string',
      description: 'HTMLElement',
      options: ['div', 'span', 'section', 'article', 'nav', 'aside'],
      control: 'select'
    },
    direction: {
      type: 'string',
      description: 'Chose the direction of inner items',
      options: ['row', 'col', 'row-reverse', 'col-reverse'],
      control: 'select'
    },
    spacing: {
      type: 'number',
      description: 'Spacing between items',
      control: 'number'
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
  render: ({ childrenQuantity = 4, ...props }: InnerComponentAndStackProps) => {
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
