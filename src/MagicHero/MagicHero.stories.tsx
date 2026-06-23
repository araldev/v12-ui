import type { Meta, StoryObj } from '@storybook/react-vite'
import { MagicHero } from './MagicHero'

const meta = {
  title: 'Premium Components/MagicHero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A scroll-driven hero section with GSAP ScrollTrigger animations. As the user scrolls, the hero content fades and scales, revealing a gradient overlay. The SVG mask creates a unique title reveal effect. The component ships with a default hero example so it works out of the box — pass `children` to replace it.',
      },
    },
  },
  component: MagicHero,
  argTypes: {
    svgPath: {
      type: 'string',
      description:
        'SVG path data representing the title text shape. This creates the mask reveal effect.',
      control: 'text',
    },
    quote1: {
      type: 'string',
      description: 'First line of the overlay quote text',
      control: 'text',
    },
    quote2: {
      type: 'string',
      description: 'Second line of the overlay quote text',
      control: 'text',
    },
    quote3: {
      type: 'string',
      description: 'Third line of the overlay quote text',
      control: 'text',
    },
    backgroundColor: {
      type: 'string',
      description: 'Background color of the hero section',
      control: 'color',
    },
    titleColor: {
      type: 'string',
      description: 'Color of the SVG mask overlay (the "title" color)',
      control: 'color',
    },
    gradientColor: {
      type: 'string',
      description: 'Color of the gradient that fades in',
      control: 'color',
    },
    overlayFrom: {
      type: 'string',
      description: 'Gradient start for the overlay copy text',
      control: 'color',
    },
    overlayAccent: {
      type: 'string',
      description: 'Gradient accent for the overlay copy text',
      control: 'color',
    },
    overlayTo: {
      type: 'string',
      description: 'Gradient end for the overlay copy text',
      control: 'color',
    },
    pinHeightVh: {
      type: 'number',
      description: 'Height of the pinned section in viewport heights',
      control: { type: 'range', min: 1, max: 5, step: 0.5 },
    },
  },
} as Meta<typeof MagicHero>

export default meta
type Story = StoryObj<typeof MagicHero>

// Sample SVG path - creates a "PRO" text shape
const sampleSvgPath =
  'M0.69875 46V1.2H21.1788C25.2748 1.2 28.7948 1.86133 31.7388 3.184C34.7254 4.50667 37.0294 6.42666 38.6508 8.944C40.2721 11.4187 41.0828 14.3627 41.0828 17.776C41.0828 21.1467 40.2721 24.0693 38.6508 26.544C37.0294 29.0187 34.7254 30.9387 31.7388 32.304C28.7948 33.6267 25.2748 34.288 21.1788 34.288H7.73875L13.3708 28.784V46H0.69875ZM13.3708 30.128L7.73875 24.304H20.4108C23.0561 24.304 25.0188 23.728 26.2988 22.576C27.6214 21.424 28.2828 19.824 28.2828 17.776C28.2828 15.6853 27.6214 14.064 26.2988 12.912C25.0188 11.76 23.0561 11.184 20.4108 11.184H7.73875L13.3708 5.36V30.128ZM47.2613 46V1.2H67.7413C71.8373 1.2 75.3573 1.86133 78.3013 3.184C81.2879 4.50667 83.5919 6.42666 85.2133 8.944C86.8346 11.4187 87.6453 14.3627 87.6453 17.776C87.6453 21.1467 86.8346 24.0693 85.2133 26.544C83.5919 28.976 81.2879 30.8533 78.3013 32.176C75.3573 33.456 71.8373 34.096 67.7413 34.096H54.3013L59.9333 28.784V46H47.2613Z'

export const Default: Story = {
  name: 'Default (with example hero)',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Design',
    quote2: 'that',
    quote3: 'moves',
    backgroundColor: '#111117',
    titleColor: '#00C9FF',
    gradientColor: '#92FE9D',
    overlayFrom: '#111117',
    overlayAccent: '#8fc6ff',
    overlayTo: '#5a9cff',
    pinHeightVh: 2.5,
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
    quote1: 'Create',
    quote2: 'amazing',
    quote3: 'experiences',
    backgroundColor: '#0a1628',
    titleColor: '#3b82f6',
    gradientColor: '#06b6d4',
    overlayFrom: '#0a1628',
    overlayAccent: '#3b82f6',
    overlayTo: '#60a5fa',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const PurplePink: Story = {
  name: 'Purple → Pink',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Build',
    quote2: 'the',
    quote3: 'future',
    backgroundColor: '#1a0a28',
    titleColor: '#a855f7',
    gradientColor: '#ec4899',
    overlayFrom: '#1a0a28',
    overlayAccent: '#a855f7',
    overlayTo: '#c084fc',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const Sunset: Story = {
  name: 'Sunset (orange → red)',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Set',
    quote2: 'the',
    quote3: 'sun',
    backgroundColor: '#1a0a0a',
    titleColor: '#f97316',
    gradientColor: '#ef4444',
    overlayFrom: '#1a0a0a',
    overlayAccent: '#f97316',
    overlayTo: '#ef4444',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithCustomHero: Story = {
  name: 'With custom hero content',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Craft',
    quote2: 'beautiful',
    quote3: 'interfaces',
    backgroundColor: '#0f172a',
    titleColor: '#06b6d4',
    gradientColor: '#8b5cf6',
    overlayFrom: '#0f172a',
    overlayAccent: '#06b6d4',
    overlayTo: '#8b5cf6',
    pinHeightVh: 2.5,
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
        <div
          className="w-48 h-48 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${args.titleColor} 0%, ${args.gradientColor} 100%)`,
            maskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        />
        <h1 className="text-3xl font-light tracking-wide">Custom Hero</h1>
        <p className="text-sm opacity-70">Pass any children to replace the default</p>
      </div>
    </MagicHero>
  ),
}
