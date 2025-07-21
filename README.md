# v12-ui 🎨

> Professional React component library & custom hooks powered by Tailwind CSS  
> Lightweight, tree-shakable, fully typed (TypeScript) and zero-config ready.

[![npm](https://img.shields.io/npm/v/v12-ui?style=flat-square&color=0d9488)](https://www.npmjs.com/package/v12-ui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/v12-ui?style=flat-square&color=0d9488)](https://bundlephobia.com/package/v12-ui)
[![License](https://img.shields.io/npm/l/v12-ui?style=flat-square&color=0d9488)](https://github.com/araldev/v12-ui/blob/main/LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?style=flat-square&logo=storybook&logoColor=white)](https://araldev.github.io/v12-ui/)
[![Demo](https://img.shields.io/badge/Demo-Playground-0ea5e9?style=flat-square&logo=react&logoColor=white)](https://araldev.github.io/v12-ui/)

---

## ✨ Highlights

- 🧩 20+ ready-to-use components
- ⚙️ 10+ custom hooks (useToggle, useMediaQuery, useScrollLock…)
- 🎞️ Built-in GSAP & Lenis motion helpers
- 🌗 Dark-mode support via Tailwind `dark:` variant
- 🛠️ Full TypeScript definitions
- 🪄 Tree-shakable ESM & CJS builds
- 🎨 Themeable via CSS variables
- 📱 Responsive by default

---

## 📦 Install

```bash
npm i v12-ui
# or
yarn add v12-ui
# or
pnpm add v12-ui
```

## 🚀 Quick Start

```js
import { Button } from "v12-ui";

function Demo() {
  return (
    <>
      <Button variant="primary">Button</Button>
    </>
  );
}
```

| Component | Description                   | Docs                                   |
| --------- | ----------------------------- | -------------------------------------- |
| Button    | 4 variants + icon support     | [→](https://araldev.github.io/v12-ui/) |
| Modal     | Focus-trap, ESC close, portal | [→](https://araldev.github.io/v12-ui/) |
| Accordion | Smooth GSAP animation         | [→](https://araldev.github.io/v12-ui/) |
| Avatar    | Fallback & online status      | [→](https://araldev.github.io/v12-ui/) |
| …         | …                             | …                                      |

> Full API list in [Storybook](https://araldev.github.io/v12-ui/).

## 🎨 Theming and Styles

Import **v12-ui stylesheet** in your entry point like `src/main.{jsx,tsx}`.

```js
import "v12-ui/styles.css";
```

Override CSS variables or pass props to components:

```css
:root {
  --v12-primary: #0d9488;
  --v12-rounded: 0.5rem;
}
```

## 📖 **Storybook & Demo**

- [Storybook Live](https://araldev.github.io/v12-ui/)
- [Demo](https://araldev.github.io/v12-ui/)

## 🧪 Development

```bash
git clone https://github.com/araldev/v12-ui.git
cd v12-ui
pnpm i
pnpm storybook   # localhost:6006
```

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch `git switch -c feature/login-form`.
3. Commit `git commit -m "feat: add feature/login-form"`.
4. Push `git push origin feature/login-form`.
5. Open a Pull Request on GitHub.

## 📄 License

MIT © Araldev

MIT License

Copyright (c) 2025 araldev

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
