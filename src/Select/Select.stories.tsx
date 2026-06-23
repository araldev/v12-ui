import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Select } from './Select'

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  component: Select,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Visual style variant',
      options: ['default', 'muted', 'ghost'],
      control: 'select',
    },
    size: {
      type: 'string',
      description: 'Size of the select',
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable the select',
      control: 'boolean',
    },
    error: {
      type: 'boolean',
      description: 'Show error state',
      control: 'boolean',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder text when no option is selected',
      control: 'text',
    },
  },
} as Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
]

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    options: sampleOptions,
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions,
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions,
  },
}

export const SizeSm: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'Small select',
    options: sampleOptions.slice(0, 3),
  },
}

export const SizeMd: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Medium select',
    options: sampleOptions,
  },
}

export const SizeLg: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    placeholder: 'Large select',
    options: sampleOptions,
  },
}

export const WithPlaceholder: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Choose your preferred language',
    options: [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
      { value: 'rust', label: 'Rust' },
      { value: 'go', label: 'Go' },
    ],
  },
}

export const WithSelectedValue: Story = {
  name: 'With Selected Value',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions,
  },
  render: (args) => {
    return (
      <Select
        {...args}
        defaultValue="react"
      />
    )
  },
}

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    error: true,
    options: sampleOptions,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Disabled select',
    disabled: true,
    options: sampleOptions,
  },
}

export const Controlled: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'A select with controlled `value` and `onChange` props.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-64 space-y-4">
        <Select
          variant="default"
          size="md"
          placeholder="Select a framework"
          value={value}
          onChange={setValue}
          options={sampleOptions}
        />
        <p className="text-sm text-text-muted">Selected: {value || 'none'}</p>
      </div>
    )
  },
}
