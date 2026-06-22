import "@/index.css";
import "@/sotoryBook-safeList.css";
import { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import { useGlobals } from 'storybook/internal/preview-api';

// ============================================================================
// Light/dark themes — applied to the Storybook manager chrome via postMessage
// to .storybook/manager.ts which calls addons.setConfig({ theme }).
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
  colorPrimary: '#4fc3f7',
  colorSecondary: '#7ec8e3',
  appBg: '#222222',
  appHoverBg: '#2e2e2e',
  appContentBg: '#2a2a2a',
  appPreviewBg: '#1e1e1e',
  appBorderColor: '#505050',
  appBorderRadius: 4,
  textColor: '#f0f0f0',
  textInverseColor: '#222222',
  textMutedColor: '#999999',
  fontBase: '"Inter", "Arial", sans-serif',
  fontCode: 'monospace',
  barTextColor: '#f0f0f0',
  barSelectedColor: '#4fc3f7',
  barBg: '#333333',
  barHoverColor: '#4a4a4a',
  inputBg: '#333333',
  inputBorder: '#505050',
  inputTextColor: '#f0f0f0',
  inputBorderRadius: 4,
  booleanBg: '#2a2a2a',
  booleanSelectedBg: '#4fc3f7',
  buttonBg: '#4fc3f7',
  buttonBorder: '#4fc3f7',
};

// ============================================================================
// Custom toolbar — light/dark/system with your original icons
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

const V12_THEME_CHANGED = 'v12-ui/theme-changed'

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

    // Sync iframe background with themes addon
    const currentBg = globals.backgrounds
    if (currentBg !== resolvedTheme) {
      setGlobals({ backgrounds: resolvedTheme })
    }

    // Apply data-theme to <html> so CSS variables (--v12-*) react
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    localStorage.setItem('v12-theme', selected)

    // Inject CSS for Docs page background — Storybook's Docs mode renders
    // inside the iframe but its background comes from inline CSS that
    // doesn't respond to data-theme changes.
    let styleEl = document.getElementById('v12-docs-theme')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'v12-docs-theme'
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = resolvedTheme === 'dark'
      ? `body, .sbdocs-wrapper, .sbdocs-content { background-color: #1a1a1a !important; }`
      : `body, .sbdocs-wrapper, .sbdocs-content { background-color: #ffffff !important; }`

    // Tell the manager chrome to swap themes via cross-frame postMessage.
    // .storybook/manager.ts listens on the parent window for these messages
    // and calls addons.setConfig({ theme }), which updates the chrome.
    const newTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme
    window.parent.postMessage(
      { type: V12_THEME_CHANGED, theme: newTheme },
      '*'
    )
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