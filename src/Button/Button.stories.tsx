import '../index.css'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  component: Button,
  argTypes: {
    as: {
      type: 'string',
      description: 'HTMLButtonElement / HTMLAnchorElement',
      options: ['button', 'a'],
      control: 'select'
    },
    children: {
      description: 'The button label',
      control: 'text'
    },
    variant: {
      type: 'string',
      options: ['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error', 'info', 'ghost'],
      control: 'select',
      description: 'Colors variants'
    },
    border: {
      type: 'boolean',
      description: 'Button border'
    },
    shadow: {
      type: 'string',
      description: 'box-shadow',
      options: ['default', 'success', 'warning', 'error', 'info'],
      control: 'select'
    },
    rounded: {
      type: 'string',
      description: 'border-radius',
      options: ['none', 'sm', 'md', 'lg', 'pill', 'circle'],
      control: 'select'
    },
    size: {
      type: 'string',
      description: 'Button size',
      options: ['sm', 'md', 'lg', 'fit', 'full'],
      control: 'select'
    },
    disabled: {
      type: 'boolean',
      description: 'To disable the button'
    },
    className: {
      type: 'string',
      description: 'Add your own styles',
      control: 'text'
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'button',
    children: 'Button',
    variant: 'primary',
    border: true,
    shadow: 'default',
    rounded: 'pill',
    size: 'fit',
    disabled: false,
    className: ''
  }
}

export const Border: Story = {
  args: {
    children: 'Button border',
    border: true
  }
}
