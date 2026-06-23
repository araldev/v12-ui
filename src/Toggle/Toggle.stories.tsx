import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Toggle,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Visual style variant',
      options: ['default', 'muted'],
      control: 'select',
    },
    size: {
      type: 'string',
      description: 'Size of the toggle',
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable the toggle',
      control: 'boolean',
    },
    readonly: {
      type: 'boolean',
      description: 'Make the toggle read-only',
      control: 'boolean',
    },
    checked: {
      type: 'boolean',
      description: 'Controlled checked state',
      control: 'boolean',
    },
    defaultChecked: {
      type: 'boolean',
      description: 'Default checked state for uncontrolled toggle',
      control: 'boolean',
    },
  },
} as Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    readonly: false,
    defaultChecked: false,
  },
}

export const On: Story = {
  name: 'On State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: true,
  },
}

export const Off: Story = {
  name: 'Off State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: false,
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'md',
  },
}

export const SizeSm: Story = {
  args: {
    variant: 'default',
    size: 'sm',
  },
}

export const SizeMd: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
}

export const SizeLg: Story = {
  args: {
    variant: 'default',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
  },
}

export const DisabledOn: Story = {
  name: 'Disabled (On)',
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
    defaultChecked: true,
  },
}

export const Readonly: Story = {
  args: {
    variant: 'default',
    size: 'md',
    readonly: true,
  },
}

export const ReadonlyOn: Story = {
  name: 'Readonly (On)',
  args: {
    variant: 'default',
    size: 'md',
    readonly: true,
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'A toggle with controlled `checked` and `onChange` props.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-3">
        <Toggle
          variant="default"
          size="md"
          checked={checked}
          onChange={setChecked}
        />
        <span className="text-sm text-text-muted">
          {checked ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    )
  },
}

export const WithLabel: Story = {
  name: 'With Label',
  parameters: {
    docs: {
      description: {
        story: 'A toggle with a label using the children prop.',
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-3">
        <Toggle
          variant="default"
          size="md"
          checked={checked}
          onChange={setChecked}
        >
          Accept terms and conditions
        </Toggle>
      </div>
    )
  },
}
