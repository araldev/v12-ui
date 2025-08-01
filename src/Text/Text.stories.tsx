import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'Components/Text',
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
  component: Text,
  argTypes: {
    as: {
      type: 'string',
      description: 'HTML element to render',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'strong', 'small', 'em',
        'b', 'i', 'u', 'mark', 'del', 'ins',
        'code', 'kbd', 'samp', 'var', 'cite',
        'q', 'pre', 'blockquote'],
      control: 'select'
    },
    children: {
      type: 'string',
      description: 'Text content',
      control: 'text',
      defaultValue: 'This is a sample text.'
    },
    variant: {
      type: 'string',
      options: ['default', 'primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error', 'info'],
      control: 'select',
      description: 'Text variant'
    },
    hover: {
      type: 'boolean',
      description: 'Enable hover effect',
      control: 'boolean'
    },
    textShadow: {
      type: 'string',
      options: ['none', 'black_p', 'black_title', 'success_p', 'success_title', 'warning_p', 'warning_title', 'error_p', 'error_title', 'info_p', 'info_title'],
      control: 'select',
      description: 'Text shadow effect'
    },
    fontSize: {
      type: 'string',
      options: ['small_responsive', 'paragraph_responsive', 'subtitle_responsive', 'title_responsive'],
      control: 'select',
      description: 'Font size'
    },
    fontWeight: {
      type: 'string',
      options: ['auto', 'small', 'paragraph', 'subtitle', 'title'],
      control: 'select',
      description: 'Font weight'
    },
    className: {
      type: 'string',
      description: 'Add your own styles',
      control: 'text'
    }
  }
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'p',
    children: 'This is a sample text.',
    variant: 'default',
    hover: false,
    textShadow: 'none',
    fontSize: 'paragraph_responsive',
    fontWeight: 'auto',
    className: ''
  }
}
