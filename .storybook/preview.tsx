import "@/index.css";
import "@/sotoryBook-safeList.css";
import { themes } from 'storybook/theming';

// Light theme — used as Storybook manager theme when darkMode = 'light'
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

// Dark theme — used as Storybook manager theme when darkMode = 'dark'
const darkTheme = {
  ...themes.dark,
  base: 'dark' as const,
  appHoverBg: '#252525',
};

const preview = {
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

    // storybook-dark-mode: applies 'dark' / 'light' class to <html data-theme>
    // AND sets the manager chrome theme via addons.setConfig under the hood.
    // The lightTheme / darkTheme objects are passed to the addon.
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
      // Default to system preference; stored in localStorage by the addon.
      current: 'light',
      // Apply dark/light class to <html> in the preview iframe so our
      // CSS variables (--v12-*) react to the theme.
      classTarget: 'html',
      stylePreview: true,
    },

    // storybook-dark-mode sets `parameters.docs.theme` via addons.setConfig
    // automatically, so we don't need to set it here.
    docs: {},
  },
};

export default preview;