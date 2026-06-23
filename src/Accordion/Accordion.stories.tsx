import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Accordion, AccordionItem } from './Accordion'

const meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  component: Accordion,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Visual style variant',
      options: ['default', 'muted', 'ghost'],
      control: 'select',
    },
    size: {
      type: 'string',
      description: 'Size of the accordion items',
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable all accordion items',
      control: 'boolean',
    },
    defaultExpanded: {
      type: 'boolean',
      description: 'Default expanded state for uncontrolled accordion',
      control: 'boolean',
    },
  },
} as Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    defaultExpanded: false,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="What is React?">
        React is a JavaScript library for building user interfaces, maintained by Meta.
      </AccordionItem>
      <AccordionItem title="What is TypeScript?">
        TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
      </AccordionItem>
      <AccordionItem title="What is Tailwind CSS?">
        Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.
      </AccordionItem>
    </Accordion>
  ),
}

export const Muted: Story = {
  args: {
    variant: 'muted',
    size: 'md',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="First Item">
        This is the content of the first muted accordion item.
      </AccordionItem>
      <AccordionItem title="Second Item">
        This is the content of the second muted accordion item.
      </AccordionItem>
      <AccordionItem title="Third Item">
        This is the content of the third muted accordion item.
      </AccordionItem>
    </Accordion>
  ),
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Ghost Item One">
        This accordion uses the ghost variant styling.
      </AccordionItem>
      <AccordionItem title="Ghost Item Two">
        The ghost variant has transparent backgrounds.
      </AccordionItem>
    </Accordion>
  ),
}

export const SizeSm: Story = {
  args: {
    variant: 'default',
    size: 'sm',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Small Item">
        This is a small-sized accordion item.
      </AccordionItem>
      <AccordionItem title="Another Small Item">
        Another small accordion item with compact padding.
      </AccordionItem>
    </Accordion>
  ),
}

export const SizeMd: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Medium Item">
        This is a medium-sized accordion item.
      </AccordionItem>
      <AccordionItem title="Another Medium Item">
        Another medium accordion item.
      </AccordionItem>
    </Accordion>
  ),
}

export const SizeLg: Story = {
  args: {
    variant: 'default',
    size: 'lg',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Large Item">
        This is a large-sized accordion item with more padding.
      </AccordionItem>
      <AccordionItem title="Another Large Item">
        Another large accordion item.
      </AccordionItem>
    </Accordion>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Disabled Item One">
        This item is disabled and cannot be expanded.
      </AccordionItem>
      <AccordionItem title="Disabled Item Two">
        This item is also disabled.
      </AccordionItem>
    </Accordion>
  ),
}

export const Controlled: Story = {
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'An accordion with controlled expanded state using `expanded` and `onToggle` props.',
      },
    },
  },
  render: () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const items = [
      { title: 'First Controlled', content: 'This is controlled via React state.' },
      { title: 'Second Controlled', content: 'Click to expand a different item.' },
      { title: 'Third Controlled', content: 'Only one item can be expanded at a time.' },
    ]

    return (
      <Accordion
        variant="default"
        size="md"
        expanded={expandedIndex !== null}
        onToggle={(expanded) => setExpandedIndex(expanded ? 0 : null)}
      >
        {items.map((item, index) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            defaultExpanded={index === expandedIndex}
          >
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    )
  },
}

export const DefaultExpanded: Story = {
  name: 'Default Expanded',
  args: {
    variant: 'default',
    size: 'md',
    defaultExpanded: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem title="Expanded by Default">
        This item is expanded when the accordion first renders.
      </AccordionItem>
      <AccordionItem title="Collapsed by Default">
        This item is collapsed when the accordion first renders.
      </AccordionItem>
    </Accordion>
  ),
}
