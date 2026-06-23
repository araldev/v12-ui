# v12-ui

> React component library & hooks — Tailwind CSS v4, fully typed, tree-shakable.

[![npm](https://img.shields.io/npm/v/v12-ui?style=flat-square&color=0d9488)](https://www.npmjs.com/package/v12-ui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/v12-ui?style=flat-square&color=0d9488)](https://bundlephobia.com/package/v12-ui)
![GitHub License](https://img.shields.io/github/license/araldev/v12-ui)
[![semantic-release: conventional-commits](https://img.shields.io/badge/semantic--release-conventional%20commits-e10079?logo=semantic-release)](https://www.conventionalcommits.org/)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?style=flat-square&logo=storybook&logoColor=white)](https://araldev.github.io/v12-ui/)

---

## Features

- **7 components** — Button, Stack, Text, AnimatedBackground, MagicText, MagicLogo, MagicMouseFollower
- **2 hooks** — `useDataTheme`, `useReducedMotion`
- **Polymorphic components** — Button renders as `<button>` or `<a>`, Text and Stack render as any HTML tag
- **Automatic dark mode** — reads `data-theme` on `<html>`; falls back to `prefers-color-scheme`
- **Canvas particle effects** — MagicText, MagicLogo, MagicMouseFollower animate canvas-based particles with spring physics and mouse interaction
- **Reduced motion support** — all animation components respect `prefers-reduced-motion: reduce`
- **Themeable via CSS variables** — override `--v12-*` tokens in your own stylesheet
- **Tailwind CSS v4** — uses Tailwind v4 `@theme` directive; semantic color tokens map to utility classes
- **Full TypeScript** — autocomplete, strict types, polymorphic refs
- **Tree-shakable** — ESM + CJS builds via Vite
- **Zero-config** — import and use; no plugins, no providers

---

## Install

```bash
npm i v12-ui
```

## Quick Start

```jsx
import { Button } from "v12-ui";
import "v12-ui/styles.css";

function Demo() {
  return <Button variant="primary">Button</Button>;
}
```

## Components

| Component          | Description                        | Docs |
| ------------------ | ---------------------------------- | ---- |
| Button             | Polymorphic button with variants   | [→](https://araldev.github.io/v12-ui/?path=/docs/components-button--docs) |
| Stack              | Flexbox layout container           | [→](https://araldev.github.io/v12-ui/?path=/docs/components-stack--docs) |
| Text               | Polymorphic text with variants     | [→](https://araldev.github.io/v12-ui/?path=/docs/components-text--docs) |
| AnimatedBackground | Canvas-based light-source animation | [→](https://araldev.github.io/v12-ui/?path=/docs/components-animatedbackground--docs) |
| MagicText          | Text assembled from animated particles | [→](https://araldev.github.io/v12-ui/?path=/docs/components-magictext--docs) |
| MagicLogo          | Logo image disassembled into particles | [→](https://araldev.github.io/v12-ui/?path=/docs/components-magiclogo--docs) |
| MagicMouseFollower | Particle trail that follows the cursor | [→](https://araldev.github.io/v12-ui/?path=/docs/components-magicmousefollower--docs) |

## Hooks

| Hook              | Description                                      |
| ----------------- | ------------------------------------------------ |
| `useDataTheme`    | Reads `data-theme` attribute; falls back to OS preference |
| `useReducedMotion`| Returns `true` when `prefers-reduced-motion: reduce` is set |

## Theming

Import the stylesheet in your entry file:

```js
import "v12-ui/styles.css";
```

Override CSS variables to customize the theme:

```css
:root {
  --v12-primary: #0d9488;
  --v12-background: #fafafa;
  --v12-foreground: #1a1a1a;
}

[data-theme="dark"] {
  --v12-background: #0a0a0a;
  --v12-foreground: #f5f5f5;
}
```

All components use semantic `--v12-*` tokens. Reference the full list in [index.css](src/index.css).

## Storybook

Explore all components and their variants:

- [Storybook Live](https://araldev.github.io/v12-ui/)

## Development

```bash
git clone https://github.com/araldev/v12-ui.git
cd v12-ui
npm install
npm run storybook   # localhost:6006
```

## Scripts

| Script             | Description                  |
| ------------------ | ---------------------------- |
| `npm run build`    | Type-check + build           |
| `npm run dev`      | Watch mode build             |
| `npm run storybook`| Storybook dev server         |
| `npm run build-storybook` | Build Storybook static  |
| `npm run lint`     | ESLint check                 |
| `npm run lint:fix` | ESLint auto-fix              |
| `npm run commit`   | Commitizen interactive commit|

## License

MIT © Araldev
