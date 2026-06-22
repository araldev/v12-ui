import "@/index.css";
import "@/sotoryBook-safeList.css";
import { useEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';

// Definir temas base personalizados
const lightTheme = {
  base: 'light' as const,
  colorPrimary: '#1ea7fd',
  colorSecondary: '#585C6D',
  appBg: '#ffffff',
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

// Storybook 9 toolbar control — drives <html data-theme="..."> and persists
// the choice to localStorage.v12-theme. Replaces the previous OS-preference-only
// mechanism (legacy theme lookup + full-page reload on system-flip, both removed).
const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for v12-ui stories',
    defaultValue: 'system',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
        { value: 'system', icon: 'mirror', title: 'System' },
      ],
      dynamicTitle: true,
    },
  },
};

const withTheme: Decorator = (Story, context) => {
  const selected = (context.globals.theme ?? 'system') as 'light' | 'dark' | 'system';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    if (selected === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', selected);
    }

    localStorage.setItem('v12-theme', selected);
  }, [selected]);

  return <Story {...context} />;
};

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
        order: ['Introduction','Premium Components', 'Layout' , 'Components', 'Hooks', 'Utilities'],
      },
    },
    docs: {
      theme: lightTheme,
    },
    backgrounds: {
      default: 'auto',
      // Storybook's canvas chrome (the manager UI surrounding the iframe)
      // lives OUTSIDE the <html> cascade, so these background swatches must
      // remain literal hex values — they cannot read the data-theme attribute
      // we set above (that only affects the story iframe document, not the
      // surrounding Storybook chrome). See spec A6.5.a.
      values: [
        {
          name: 'auto',
          value: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#1a1a1a' : '#ffffff'
        },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export default preview;