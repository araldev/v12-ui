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
      description: 'Colors variants',
      defaultValue: 'primary'
    },
    border: {
      type: 'boolean',
      description: 'Button border',
      control: 'boolean',
      defaultValue: true
    },
    shadow: {
      type: 'string',
      description: 'box-shadow',
      options: ['default', 'success', 'warning', 'error', 'info'],
      control: 'select',
      defaultValue: 'default'
    },
    rounded: {
      type: 'string',
      description: 'border-radius',
      options: ['none', 'sm', 'md', 'lg', 'pill', 'circle'],
      control: 'select',
      defaultValue: 'pill'
    },
    size: {
      type: 'string',
      description: 'Button size',
      options: ['sm', 'md', 'lg', 'fit', 'full'],
      control: 'select',
      defaultValue: 'fit'
    },
    disabled: {
      type: 'boolean',
      description: 'To disable the button',
      control: 'boolean',
      defaultValue: false
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

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary'
  }
}
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}
export const Muted: Story = {
  args: {
    children: 'Muted',
    variant: 'muted'
  }
}
export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent'
  }
}
export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success'
  }
}
export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning'
  }
}
export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error'
  }
}
export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info'
  }
}
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}

export const Border: Story = {
  args: {
    children: 'Border',
    border: true
  }
}

export const ShadowDefault: Story = {
  args: {
    children: 'Shadow Default',
    shadow: 'default'
  }
}
export const ShadowSuccess: Story = {
  args: {
    children: 'Shadow Success',
    shadow: 'success'
  }
}
export const ShadowWarning: Story = {
  args: {
    children: 'Shadow Warning',
    shadow: 'warning'
  }
}
export const ShadowError: Story = {
  args: {
    children: 'Shadow Error',
    shadow: 'error'
  }
}
export const ShadowInfo: Story = {
  args: {
    children: 'Shadow Info',
    shadow: 'info'
  }
}

export const SizeSm: Story = {
  args: {
    children: 'Size sm',
    size: 'sm'
  }
}
export const SizeMd: Story = {
  args: {
    children: 'Size md',
    size: 'md'
  }
}
export const SizeLg: Story = {
  args: {
    children: 'Size lg',
    size: 'lg'
  }
}
export const SizeFit: Story = {
  args: {
    children: 'Size fit',
    size: 'fit'
  }
}
export const SizeFull: Story = {
  args: {
    children: 'Size full',
    size: 'full'
  }
}

export const Disabled: Story = {
  args: {
    children: 'Button disabled',
    disabled: true
  }
}

export const RoundedNone: Story = {
  args: {
    children: 'Rounded none',
    rounded: 'none'
  }
}
export const RoundedSm: Story = {
  args: {
    children: 'Rounded sm',
    rounded: 'sm'
  }
}
export const RoundedMd: Story = {
  args: {
    children: 'Rounded md',
    rounded: 'md'
  }
}
export const RoundedLg: Story = {
  args: {
    children: 'Rounded lg',
    rounded: 'lg'
  }
}
export const RoundedPill: Story = {
  args: {
    children: 'Rounded pill',
    rounded: 'pill'
  }
}
export const RoundedCircle: Story = {
  args: {
    children: 'Rounded circle',
    rounded: 'circle'
  }
}
