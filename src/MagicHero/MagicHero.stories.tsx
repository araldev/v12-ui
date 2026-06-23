import type { Meta, StoryObj } from '@storybook/react-vite'
import { MagicHero } from './MagicHero'

const meta = {
  title: 'Premium Components/MagicHero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A scroll-driven hero section with GSAP ScrollTrigger animations. As the user scrolls, the hero content fades and scales, revealing a gradient text overlay. The SVG mask creates a unique reveal effect.',
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
    gradientFrom: {
      type: 'string',
      description: 'Gradient start color (background color of the section)',
      control: 'color',
    },
    gradientAccent: {
      type: 'string',
      description: 'Gradient accent color (middle transition color)',
      control: 'color',
    },
    gradientTo: {
      type: 'string',
      description: 'Gradient end color (top reveal color)',
      control: 'color',
    },
    backgroundColor: {
      type: 'string',
      description: 'Background color of the hero section',
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

// Sample SVG path - this creates a "DESIGN" text shape
const sampleSvgPath =
  'M0.69875 46V1.2H21.1788C25.2748 1.2 28.7948 1.86133 31.7388 3.184C34.7254 4.50667 37.0294 6.42666 38.6508 8.944C40.2721 11.4187 41.0828 14.3627 41.0828 17.776C41.0828 21.1467 40.2721 24.0693 38.6508 26.544C37.0294 29.0187 34.7254 30.9387 31.7388 32.304C28.7948 33.6267 25.2748 34.288 21.1788 34.288H7.73875L13.3708 28.784V46H0.69875ZM13.3708 30.128L7.73875 24.304H20.4108C23.0561 24.304 25.0188 23.728 26.2988 22.576C27.6214 21.424 28.2828 19.824 28.2828 17.776C28.2828 15.6853 27.6214 14.064 26.2988 12.912C25.0188 11.76 23.0561 11.184 20.4108 11.184H7.73875L13.3708 5.36V30.128ZM47.2613 46V1.2H67.7413C71.8373 1.2 75.3573 1.86133 78.3013 3.184C81.2879 4.50667 83.5919 6.42666 85.2133 8.944C86.8346 11.4187 87.6453 14.3627 87.6453 17.776C87.6453 21.1467 86.8346 24.0693 85.2133 26.544C83.5919 28.976 81.2879 30.8533 78.3013 32.176C75.3573 33.456 71.8373 34.096 67.7413 34.096H54.3013L59.9333 28.784V46H47.2613ZM74.9733 46L63.8373 29.68H77.3413L88.5413 46H74.9733ZM59.9333 30.128L54.3013 24.304H66.9733C69.6186 24.304 71.5813 23.728 72.8613 22.576C74.1839 21.424 74.8453 19.824 74.8453 17.776C74.8453 15.6853 74.1839 14.064 72.8613 12.912C71.5813 11.76 69.6186 11.184 66.9733 11.184H54.3013L59.9333 5.36V30.128ZM117.228 46.896C113.644 46.896 110.338 46.32 107.308 45.168C104.279 44.016 101.634 42.3947 99.3723 40.304C97.1536 38.1707 95.4256 35.696 94.1883 32.88C92.9509 30.064 92.3323 26.9707 92.3323 23.6C92.3323 20.2293 92.9509 17.136 94.1883 14.32C95.4256 11.504 97.1536 9.05066 99.3723 6.96C101.634 4.82667 104.279 3.184 107.308 2.032C110.338 0.879997 113.644 0.303997 117.228 0.303997C120.855 0.303997 124.162 0.879997 127.148 2.032C130.178 3.184 132.802 4.82667 135.02 6.96C137.239 9.05066 138.967 11.504 140.204 14.32C141.484 17.136 142.124 20.2293 142.124 23.6C142.124 26.9707 141.484 30.0853 140.204 32.944C138.967 35.76 137.239 38.2133 135.02 40.304C132.802 42.3947 130.178 44.016 127.148 45.168C124.162 46.32 120.855 46.896 117.228 46.896ZM117.228 36.4C118.908 36.4 120.381 35.9467 121.648 35.04C122.914 34.1333 123.874 32.912 124.528 31.376C125.224 29.84 125.572 28.1227 125.572 26.224C125.572 24.3253 125.224 22.6293 124.528 21.136C123.874 19.6 122.914 18.3787 121.648 17.472C120.381 16.5653 118.908 16.112 117.228 16.112C115.548 16.112 114.075 16.5653 112.808 17.472C111.542 18.3787 110.582 19.6 109.928 21.136C109.274 22.6293 108.948 24.3253 108.948 26.224C108.948 28.1227 109.274 29.84 109.928 31.376C110.582 32.912 111.542 34.1333 112.808 35.04C114.075 35.9467 115.548 36.4 117.228 36.4ZM159.612 46.896C156.028 46.896 152.722 46.32 149.692 45.168C146.663 44.016 144.018 42.3947 141.756 40.304C139.538 38.1707 137.81 35.696 136.572 32.88C135.335 30.064 134.716 26.9707 134.716 23.6C134.716 20.2293 135.335 17.136 136.572 14.32C137.81 11.504 139.538 9.05066 141.756 6.96C144.018 4.82667 146.663 3.184 149.692 2.032C152.722 0.879997 156.028 0.303997 159.612 0.303997C163.239 0.303997 166.546 0.879997 169.532 2.032C172.562 3.184 175.186 4.82667 177.404 6.96C179.623 9.05066 181.351 11.504 182.588 14.32C183.868 17.136 184.508 20.2293 184.508 23.6C184.508 26.9707 183.868 30.0853 182.588 32.944C181.351 35.76 179.623 38.2133 177.404 40.304C175.186 42.3947 172.562 44.016 169.532 45.168C166.546 46.32 163.239 46.896 159.612 46.896ZM159.612 36.4C161.292 36.4 162.765 35.9467 164.032 35.04C165.298 34.1333 166.258 32.912 166.912 31.376C167.608 29.84 167.956 28.1227 167.956 26.224C167.956 24.3253 167.608 22.6293 166.912 21.136C166.258 19.6 165.298 18.3787 164.032 17.472C162.765 16.5653 161.292 16.112 159.612 16.112C157.932 16.112 156.459 16.5653 155.192 17.472C153.926 18.3787 152.966 19.6 152.312 21.136C151.658 22.6293 151.332 24.3253 151.332 26.224C151.332 28.1227 151.658 29.84 152.312 31.376C152.966 32.912 153.926 34.1333 155.192 35.04C156.459 35.9467 157.932 36.4 159.612 36.4Z'

export const Default: Story = {
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Design',
    quote2: 'that',
    quote3: 'moves',
    gradientFrom: '#111117',
    gradientAccent: '#8fc6ff',
    gradientTo: '#5a9cff',
    backgroundColor: '#111117',
    pinHeightVh: 2.5,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
        <div className="h-screen bg-neutral-900 flex items-center justify-center">
          <p className="text-white text-xl">Content after MagicHero</p>
        </div>
      </div>
    ),
  ],
}

export const BlueGradient: Story = {
  name: 'Blue Gradient',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Create',
    quote2: 'amazing',
    quote3: 'experiences',
    gradientFrom: '#0a1628',
    gradientAccent: '#3b82f6',
    gradientTo: '#60a5fa',
    backgroundColor: '#0a1628',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '250vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const PurpleGradient: Story = {
  name: 'Purple Gradient',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Build',
    quote2: 'the',
    quote3: 'future',
    gradientFrom: '#1a0a28',
    gradientAccent: '#a855f7',
    gradientTo: '#c084fc',
    backgroundColor: '#1a0a28',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '250vh' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithImage: Story = {
  name: 'With Image',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Craft',
    quote2: 'beautiful',
    quote3: 'interfaces',
    gradientFrom: '#111117',
    gradientAccent: '#8fc6ff',
    gradientTo: '#5a9cff',
    backgroundColor: '#111117',
    pinHeightVh: 2.5,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <MagicHero {...args}>
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        alt="Profile"
        className="w-64 h-64 object-cover rounded-full"
        style={{
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}
      />
    </MagicHero>
  ),
}

export const DarkGreenGradient: Story = {
  name: 'Dark Green Gradient',
  args: {
    svgPath: sampleSvgPath,
    quote1: 'Ship',
    quote2: 'faster',
    quote3: 'always',
    gradientFrom: '#0a1a0a',
    gradientAccent: '#22c55e',
    gradientTo: '#4ade80',
    backgroundColor: '#0a1a0a',
    pinHeightVh: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '250vh' }}>
        <Story />
      </div>
    ),
  ],
}
