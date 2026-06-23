import type { Meta, StoryObj } from '@storybook/react-vite'
import { MagicHero } from './MagicHero'

const sampleSvgPath =
  'M0.69875 46V1.2H21.1788C25.2748 1.2 28.7948 1.86133 31.7388 3.184C34.7254 4.50667 37.0294 6.42666 38.6508 8.944C40.2721 11.4187 41.0828 14.3627 41.0828 17.776C41.0828 21.1467 40.2721 24.0693 38.6508 26.544C37.0294 29.0187 34.7254 30.9387 31.7388 32.304C28.7948 33.6267 25.2748 34.288 21.1788 34.288H7.73875L13.3708 28.784V46H0.69875ZM13.3708 30.128L7.73875 24.304H20.4108C23.0561 24.304 25.0188 23.728 26.2988 22.576C27.6214 21.424 28.2828 19.824 28.2828 17.776C28.2828 15.6853 27.6214 14.064 26.2988 12.912C25.0188 11.76 23.0561 11.184 20.4108 11.184H7.73875L13.3708 5.36V30.128ZM47.2613 46V1.2H67.7413C71.8373 1.2 75.3573 1.86133 78.3013 3.184C81.2879 4.50667 83.5919 6.42666 85.2133 8.944C86.8346 11.4187 87.6453 14.3627 87.6453 17.776C87.6453 21.1467 86.8346 24.0693 85.2133 26.544C83.5919 28.976 81.2879 30.8533 78.3013 32.176C75.3573 33.456 71.8373 34.096 67.7413 34.096H54.3013L59.9333 28.784V46H47.2613Z'

const meta = {
  title: 'Premium Components/MagicHero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'EXACT port of araldev-portfolio/AnimatedTitle. Scroll-driven hero with GSAP ScrollTrigger. As you scroll: hero image and scroll hint fade out, SVG mask scales from 350x to 1x revealing the gradient overlay, gradient text (quote) reveals from 60-85% scroll.',
      },
    },
  },
  component: MagicHero,
  argTypes: {
    svgPath: {
      type: 'string',
      description: 'SVG path data for the title mask.',
      control: 'text',
    },
    imageSrc: {
      type: 'string',
      description: 'Hero image src. If omitted, shows a gradient circle.',
      control: 'text',
    },
    imageAlt: { type: 'string', control: 'text' },
    scrollDownText: { type: 'string', control: 'text' },
    quote1: { type: 'string', control: 'text' },
    quote2: { type: 'string', control: 'text' },
    quote3: { type: 'string', control: 'text' },
    pinMultiplier: {
      type: 'number',
      control: { type: 'range', min: 0.5, max: 5, step: 0.5 },
      description: 'Scroll pin distance in viewport heights (default 1.5).',
    },
  },
} as Meta<typeof MagicHero>

export default meta
type Story = StoryObj<typeof MagicHero>

export const Default: Story = {
  name: 'Default (PRO title)',
  args: {
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Design',
    quote2: 'that',
    quote3: 'moves',
    pinMultiplier: 1.5,
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
    pinMultiplier: 1.5,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const CustomContent: Story = {
  name: 'Custom quote text',
  args: {
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll to discover',
    quote1: 'Build',
    quote2: 'the',
    quote3: 'future',
    pinMultiplier: 1.5,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const ShortScroll: Story = {
  name: 'Short scroll distance',
  args: {
    svgPath: sampleSvgPath,
    scrollDownText: 'Scroll down',
    quote1: 'Quick',
    quote2: 'reveal',
    quote3: 'now',
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
