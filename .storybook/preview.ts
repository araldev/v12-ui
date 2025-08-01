import "@/index.css";
import "@/sotoryBook-safeList.css";
import type { Preview } from '@storybook/react-vite';
import {useDataTheme} from '../src/Hooks/useDataTheme';

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

const getTheme = () => {
  // Verificar si hay un tema guardado en localStorage
  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  
  if (savedTheme) {
    return savedTheme === 'dark' ? darkTheme : lightTheme;
  }
  
  // Si no hay tema guardado, usar prefer-color-scheme
  const prefersDark = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches 
    : false;
    
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      window.location.reload();
    });
  }

  return prefersDark ? darkTheme : lightTheme;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Layout', 'Components', 'Hooks', 'Utilities'],
      },
    },
    docs: {
      theme: getTheme(),
    },
    backgrounds: {
      default: 'auto',
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
