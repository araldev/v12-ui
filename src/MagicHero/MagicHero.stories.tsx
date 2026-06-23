import type { Meta, StoryObj } from '@storybook/react-vite'
import { MagicHero } from './MagicHero'

const meta = {
  title: 'Premium Components/MagicHero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A scroll-driven hero section with GSAP ScrollTrigger. Hero (image + scroll hint) is visible at start. As you scroll, the hero fades and scales down, a vertical gradient overlay fades in (max 70% opacity), and a 3-line gradient text reveal appears at the bottom.',
      },
    },
  },
  component: MagicHero,
  argTypes: {
    imageSrc: {
      type: 'string',
      description: 'Hero image src. If omitted, a gradient circle is shown.',
      control: 'text',
    },
    imageAlt: {
      type: 'string',
      description: 'Alt text for the hero image.',
      control: 'text',
    },
    scrollDownText: {
      type: 'string',
      description: 'Text shown next to the scroll-down arrow.',
      control: 'text',
    },
    quote1: { type: 'string', control: 'text' },
    quote2: { type: 'string', control: 'text' },
    quote3: { type: 'string', control: 'text' },

    backgroundColor: { type: 'string', control: 'color' },
    gradientStart: { type: 'string', control: 'color' },
    gradientEnd: { type: 'string', control: 'color' },
    quoteColorFrom: { type: 'string', control: 'color' },
    quoteColorAccent: { type: 'string', control: 'color' },
    quoteColorTo: { type: 'string', control: 'color' },

    pinMultiplier: {
      type: 'number',
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description: 'Scroll pin distance in viewport heights.',
    },
    imageWidth: {
      type: 'number',
      control: { type: 'range', min: 100, max: 600, step: 50 },
    },
  },
} as Meta<typeof MagicHero>

export default meta
type Story = StoryObj<typeof MagicHero>

export const Default: Story = {
  name: 'Default (cyan → green)',
  args: {
    scrollDownText: 'Scroll down',
    quote1: 'Design',
    quote2: 'that',
    quote3: 'moves',
    backgroundColor: '#111117',
    gradientStart: '#00C9FF',
    gradientEnd: '#92FE9D',
    quoteColorFrom: '#111117',
    quoteColorAccent: '#8fc6ff',
    quoteColorTo: '#5a9cff',
    pinMultiplier: 1.5,
    imageWidth: 350,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const BlueCyan: Story = {
  name: 'Blue → Cyan',
  args: {
    scrollDownText: 'Scroll down',
    quote1: 'Create',
    quote2: 'amazing',
    quote3: 'experiences',
    backgroundColor: '#0a1628',
    gradientStart: '#3b82f6',
    gradientEnd: '#06b6d4',
    quoteColorFrom: '#0a1628',
    quoteColorAccent: '#3b82f6',
    quoteColorTo: '#60a5fa',
    pinMultiplier: 1.5,
    imageWidth: 350,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const PurplePink: Story = {
  name: 'Purple → Pink',
  args: {
    scrollDownText: 'Scroll down',
    quote1: 'Build',
    quote2: 'the',
    quote3: 'future',
    backgroundColor: '#1a0a28',
    gradientStart: '#a855f7',
    gradientEnd: '#ec4899',
    quoteColorFrom: '#1a0a28',
    quoteColorAccent: '#a855f7',
    quoteColorTo: '#c084fc',
    pinMultiplier: 1.5,
    imageWidth: 350,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithImage: Story = {
  name: 'With custom image',
  args: {
    imageSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    imageAlt: 'Profile',
    scrollDownText: 'Scroll down',
    quote1: 'Craft',
    quote2: 'beautiful',
    quote3: 'interfaces',
    backgroundColor: '#111117',
    gradientStart: '#00C9FF',
    gradientEnd: '#92FE9D',
    quoteColorFrom: '#111117',
    quoteColorAccent: '#8fc6ff',
    quoteColorTo: '#5a9cff',
    pinMultiplier: 1.5,
    imageWidth: 350,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const CustomHeroContent: Story = {
  name: 'With custom hero content (children)',
  args: {
    scrollDownText: 'Scroll down',
    quote1: 'Custom',
    quote2: 'hero',
    quote3: 'slot',
    backgroundColor: '#0f172a',
    gradientStart: '#06b6d4',
    gradientEnd: '#8b5cf6',
    quoteColorFrom: '#0f172a',
    quoteColorAccent: '#06b6d4',
    quoteColorTo: '#8b5cf6',
    pinMultiplier: 1.5,
    imageWidth: 350,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <MagicHero {...args}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white pointer-events-none">
        <h1 className="text-5xl font-bold tracking-tight text-center">
          Your Hero Title
        </h1>
        <p className="text-lg opacity-80 text-center max-w-md">
          A subtitle that explains what your product does.
        </p>
        <button
          type="button"
          className="px-6 py-3 bg-white text-black rounded-lg font-medium pointer-events-auto hover:bg-white/90 transition-colors"
        >
          Get started
        </button>
      </div>
    </MagicHero>
  ),
}

export const ShortScroll: Story = {
  name: 'Short scroll distance',
  args: {
    quote1: 'Quick',
    quote2: 'reveal',
    quote3: 'now',
    backgroundColor: '#0a0a0a',
    gradientStart: '#22c55e',
    gradientEnd: '#84cc16',
    quoteColorFrom: '#0a0a0a',
    quoteColorAccent: '#22c55e',
    quoteColorTo: '#84cc16',
    pinMultiplier: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
      </div>
    ),
  ],
}
