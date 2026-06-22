import "@/index.css";
import "@/sotoryBook-safeList.css";
import { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import { useGlobals } from 'storybook/internal/preview-api';
import { addons } from 'storybook/preview-api';

// ============================================================================
// Light/dark themes — applied to the Storybook manager chrome via the local
// addon in .storybook/addons/v12-theme-bridge/register.ts (see that file
// for the manager-side handler that listens to the channel event below).
// ============================================================================

const lightTheme = {
  base: 'light' as const,
  colorPrimary: '#1ea7fd',
  colorSecondary: '#585C6D',
  appBg: '#ffffff',
  appHoverBg: '#f5f5f5',
  appContentBg: '#fafafa',
  appPreviewBg: '#f3f3f3',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 4,
  textColor: '#333333',
  textInverseColor: '#ffffff',
  textMutedColor: '#888888',
  fontBase: '"Inter", "Arial", sans-serif',
  fontCode: 'monospace',
  barTextColor: '#333333',
  barSelectedColor: '#1ea7fd',
  barBg: '#ffffff',
  barHoverColor: '#e0e0e0',
  inputBg: '#ffffff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#333333',
  inputBorderRadius: 4,
  booleanBg: '#f3f3f3',
  booleanSelectedBg: '#1ea7fd',
  buttonBg: '#1ea7fd',
  buttonBorder: '#1ea7fd',
};

const darkTheme = {
  base: 'dark' as const,
  colorPrimary: '#1ea7fd',
  colorSecondary: '#585C6D',
  appBg: '#1a1a1a',
  appHoverBg: '#252525',
  appContentBg: '#2a2a2a',
  appPreviewBg: '#222222',
  appBorderColor: '#404040',
  appBorderRadius: 4,
  textColor: '#ffffff',
  textInverseColor: '#333333',
  textMutedColor: '#888888',
  fontBase: '"Inter", "Arial", sans-serif',
  fontCode: 'monospace',
  barTextColor: '#ffffff',
  barSelectedColor: '#1ea7fd',
  barBg: '#2a2a2a',
  barHoverColor: '#404040',
  inputBg: '#2a2a2a',
  inputBorder: '#404040',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
  booleanBg: '#222222',
  booleanSelectedBg: '#1ea7fd',
  buttonBg: '#1ea7fd',
  buttonBorder: '#1ea7fd',
};

// ============================================================================
// Custom toolbar — light/dark/system with the icons you originally had
// ============================================================================

const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for v12-ui stories',
    defaultValue: 'system',
    toolbar: {
      icon: 'circlehollow' as const,
      items: [
        { value: 'light', icon: 'sun' as const, title: 'Light' },
        { value: 'dark', icon: 'moon' as const, title: 'Dark' },
        { value: 'system', icon: 'mirror' as const, title: 'System' },
      ],
      dynamicTitle: true,
    },
  },
};

// ============================================================================
// Channel event used to push theme changes from the preview (Decorators) to
// the manager (chrome). The local addon in .storybook/addons/v12-theme-bridge/
// listens to this event and calls addons.setConfig({ theme }) so the manager
// UI re-renders.
// ============================================================================

export const V12_THEME_CHANGED = 'v12-ui/theme-changed'

const withTheme: Decorator = (Story, context) => {
  const selected = (context.globals.theme ?? 'system') as 'light' | 'dark' | 'system'
  const [globals, setGlobals] = useGlobals()

  const resolvedTheme =
    selected === 'system'
      ? typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : selected

  useEffect(() => {
    if (typeof window === 'undefined') return

    const currentBg = globals.backgrounds
    if (currentBg !== resolvedTheme) {
      setGlobals({ backgrounds: resolvedTheme })
    }

    // Apply data-theme to <html> in the iframe so our CSS variables react
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    localStorage.setItem('v12-theme', selected)

    // Tell the manager chrome to swap themes via the Storybook channel
    const newTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme
    addons.getChannel()?.emit(V12_THEME_CHANGED, newTheme)
  }, [resolvedTheme, selected, globals.backgrounds, setGlobals])

  return <Story {...context} />
}

const preview: Preview = {
  globalTypes,
  decorators: [withTheme],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Premium Components', 'Layout', 'Components', 'Hooks', 'Utilities'],
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#1a1a1a' },
      },
    },
  },

  initialGlobals: {
    backgrounds: window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  },
}

export default preview