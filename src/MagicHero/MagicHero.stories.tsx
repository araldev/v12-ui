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
          'A scroll-driven hero section with GSAP ScrollTrigger animations. The section is pinned while the user scrolls, then a SVG mask reveals a title shape and a gradient text overlay fades in. All content (SVG path, image, quotes, colors, scroll distance) is parameterizable.',
      },
    },
  },
  component: MagicHero,
  argTypes: {
    svgPath: {
      type: 'string',
      description:
        'SVG path data representing the title text shape. The path is the "hole" that reveals the fade-overlay gradient.',
      control: 'text',
    },
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
    maskColor: {
      type: 'string',
      control: 'color',
      description: 'Color of the SVG mask rect (the dark "title" fill).',
    },
    gradientStart: { type: 'string', control: 'color' },
    gradientEnd: { type: 'string', control: 'color' },
    quoteColorFrom: { type: 'string', control: 'color' },
    quoteColorAccent: { type: 'string', control: 'color' },
    quoteColorTo: { type: 'string', control: 'color' },

    pinMultiplier: {
      type: 'number',
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description:
        'Multiplier for scroll pin distance (default 1.5 = 1.5 viewports of scroll).',
    },
    imageWidth: {
      type: 'number',
      control: { type: 'range', min: 100, max: 600, step: 50 },
    },
    maskOriginX: {
      type: 'number',
      control: { type: 'range', min: 0, max: 100, step: 0.1 },
    },
    maskOriginY: {
      type: 'number',
      control: { type: 'range', min: 0, max: 100, step: 0.1 },
    },
  },
} as Meta<typeof MagicHero>

export default meta
type Story = StoryObj<typeof MagicHero>

const sampleSvgPath =
  'M0.69875 46V1.2H21.1788C25.2748 1.2 28.7948 1.86133 31.7388 3.184C34.7254 4.50667 37.0294 6.42666 38.6508 8.944C40.2721 11.4187 41.0828 14.3627 41.0828 17.776C41.0828 21.1467 40.2721 24.0693 38.6508 26.544C37.0294 29.0187 34.7254 30.9387 31.7388 32.304C28.7948 33.6267 25.2748 34.288 21.1788 34.288H7.73875L13.3708 28.784V46H0.69875ZM13.3708 30.128L7.73875 24.304H20.4108C23.0561 24.304 25.0188 23.728 26.2988 22.576C27.6214 21.424 28.2828 19.824 28.2828 17.776C28.2828 15.6853 27.6214 14.064 26.2988 12.912C25.0188 11.76 23.0561 11.184 20.4108 11.184H7.73875L13.3708 5.36V30.128ZM47.2613 46V1.2H67.7413C71.8373 1.2 75.3573 1.86133 78.3013 3.184C81.2879 4.50667 83.5919 6.42666 85.2133 8.944C86.8346 11.4187 87.6453 14.3627 87.6453 17.776C87.6453 21.1467 86.8346 24.0693 85.2133 26.544C83.5919 28.976 81.2879 30.8533 78.3013 32.176C75.3573 33.456 71.8373 34.096 67.7413 34.096H54.3013L59.9333 28.784V46H47.2613Z'

export const Default: Story = {
  name: 'Default (cyan → green)',
  args: {
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Design',
    quote2: 'that',
    quote3: 'moves',
    backgroundColor: '#111117',
    maskColor: '#111117',
    gradientStart: '#00C9FF',
    gradientEnd: '#92FE9D',
    quoteColorFrom: '#111117',
    quoteColorAccent: '#8fc6ff',
    quoteColorTo: '#5a9cff',
    pinMultiplier: 1.5,
    imageWidth: 350,
    maskOriginX: 49.7,
    maskOriginY: 19,
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
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Create',
    quote2: 'amazing',
    quote3: 'experiences',
    backgroundColor: '#0a1628',
    maskColor: '#0a1628',
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
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Build',
    quote2: 'the',
    quote3: 'future',
    backgroundColor: '#1a0a28',
    maskColor: '#1a0a28',
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

export const Sunset: Story = {
  name: 'Sunset (orange → red)',
  args: {
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Set',
    quote2: 'the',
    quote3: 'sun',
    backgroundColor: '#1a0a0a',
    maskColor: '#1a0a0a',
    gradientStart: '#f97316',
    gradientEnd: '#ef4444',
    quoteColorFrom: '#1a0a0a',
    quoteColorAccent: '#f97316',
    quoteColorTo: '#ef4444',
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
    svgPath: sampleSvgPath,
    imageSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    imageAlt: 'Profile',
    scrollDownText: 'Scroll down',
    quote1: 'Craft',
    quote2: 'beautiful',
    quote3: 'interfaces',
    backgroundColor: '#111117',
    maskColor: '#111117',
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
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Custom',
    quote2: 'hero',
    quote3: 'slot',
    backgroundColor: '#0f172a',
    maskColor: '#0f172a',
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white pointer-events-none">
        <div
          className="w-48 h-48 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${args.gradientStart} 0%, ${args.gradientEnd} 100%)`,
            maskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        />
        <h1 className="text-3xl font-light tracking-wide">Custom Hero</h1>
        <p className="text-sm opacity-70">Pass any children to replace the default image</p>
      </div>
    </MagicHero>
  ),
}

export const ShortScroll: Story = {
  name: 'Short scroll distance',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Quick',
    quote2: 'reveal',
    quote3: 'now',
    backgroundColor: '#0a0a0a',
    maskColor: '#0a0a0a',
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
