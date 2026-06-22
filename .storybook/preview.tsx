import "@/index.css";
import "@/sotoryBook-safeList.css";
import { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import { useGlobals } from 'storybook/internal/preview-api';

// Themes for the Storybook manager chrome — picked up by storybook-dark-mode
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

// Watch the iframe <html> for class="dark" / class="light" applied by
// storybook-dark-mode, and mirror them as data-theme="dark" / "light"
// so our CSS variables (--v12-*) react to the theme. This is the only way
// to bridge the gap between storybook-dark-mode (which uses CSS classes)
// and our existing CSS (which uses [data-theme="dark"]).
const withThemeMirror: Decorator = (Story) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const sync = () => {
      const html = document.documentElement
      const isDark = html.classList.contains('dark')
      const isLight = html.classList.contains('light')
      if (isDark) {
        html.setAttribute('data-theme', 'dark')
      } else if (isLight) {
        html.setAttribute('data-theme', 'light')
      }
    }

    sync()

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return <Story />
}

const preview: Preview = {
  decorators: [withThemeMirror],

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

    // storybook-dark-mode configuration. It registers a toolbar item
    // and calls addons.setConfig({ theme }) so the manager chrome updates.
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
      current: 'light',
      // Apply the dark/light class to <html> in the preview iframe so our
      // mirror Decorator above picks it up and converts it to data-theme.
      classTarget: 'html',
      stylePreview: true,
    },

    docs: {},
  },
}

export default preview