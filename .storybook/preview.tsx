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

// Storybook 9 toolbar control — drives <html data-theme="..."> and persists
// the choice to localStorage.v12-theme. Replaces the previous OS-preference-only
// mechanism (legacy theme lookup + full-page reload on system-flip, both removed).
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

let currentTheme = localStorage.getItem('v12-theme') as 'light' | 'dark' | 'system' | null === 'dark' ? darkTheme : lightTheme;

const withTheme: Decorator = (Story, context) => {
  const selected = (context.globals.theme ?? 'system') as 'light' | 'dark' | 'system';

  const resolvedTheme = selected === 'system'
    ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
    : selected;

  currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  // Apply data-theme AND override iframe background by injecting a
  // high-specificity <style> with !important. The Decorator runs in the
  // story iframe so `document` IS the iframe's document.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const bgColor = resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff';
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('v12-theme', selected);

    const applyToIframe = () => {
      // Try the current document first
      const targets: Document[] = [document];

      // Also walk parent if we're not in an iframe
      try {
        let win: Window | null = window.parent;
        while (win && win !== window.top) {
          const iframes = win.document.querySelectorAll('iframe');
          iframes.forEach((iframe) => {
            try {
              const doc = iframe.contentDocument;
              if (doc) targets.push(doc);
            } catch {
              // cross-origin
            }
          });
          win = win.parent;
        }
      } catch {
        // cross-origin parent
      }

      targets.forEach((doc) => {
        // setAttribute on documentElement (no !important needed for inline)
        doc.documentElement.style.background = bgColor;
        doc.documentElement.style.backgroundColor = bgColor;
        if (doc.body) {
          doc.body.style.background = bgColor;
          doc.body.style.backgroundColor = bgColor;
        }

        // Also inject a high-specificity style element as fallback
        let styleEl = doc.getElementById('storybook-theme-bg') as HTMLStyleElement | null;
        if (!styleEl) {
          styleEl = doc.createElement('style');
          styleEl.id = 'storybook-theme-bg';
          doc.head.insertBefore(styleEl, doc.head.firstChild);
        }
        styleEl.textContent = `html body, body, html { background: ${bgColor} !important; background-color: ${bgColor} !important; }`;
      });
    };

    // Run immediately and also after RAF to ensure Storybook has finished its initial render
    applyToIframe();
    requestAnimationFrame(applyToIframe);
  }, [resolvedTheme, selected]);

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
      // Theme follows data-theme attribute set by withTheme Decorator.
      // Use lightTheme as the default but Storybook will read data-theme from
      // the html element to decide which theme to apply.
      theme: currentTheme,
    },
    // backgrounds omitted — withTheme Decorator injects a high-specificity
    // <style> to set the iframe background based on data-theme. Using the
    // backgrounds addon with globals.backgrounds triggers Storybook's
    // instrumenter warnings when changed from a Decorator.
  },
};

export default preview;