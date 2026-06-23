## [0.5.3](https://github.com/araldev/v12-ui/compare/v0.5.2...v0.5.3) (2026-06-23)


### Bug Fixes

* **toggle:** absolute positioning for thumb to fix vertical centering ([0f601bf](https://github.com/araldev/v12-ui/commit/0f601bff87866cdc298a72398f03007f776eccd0))

## [0.5.2](https://github.com/araldev/v12-ui/compare/v0.5.1...v0.5.2) (2026-06-23)


### Bug Fixes

* **toggle:** use fixed px values for thumb ON position ([692a8ac](https://github.com/araldev/v12-ui/commit/692a8aceebf0a79bc1adcf808d0de398c6ffcce0))

## [0.5.1](https://github.com/araldev/v12-ui/compare/v0.5.0...v0.5.1) (2026-06-23)


### Bug Fixes

* **ui:** toggle thumb centering and select styling/animation polish ([8beabae](https://github.com/araldev/v12-ui/commit/8beabae84db8acbd91851a1a08e1677d464a5c05))

# [0.5.0](https://github.com/araldev/v12-ui/compare/v0.4.0...v0.5.0) (2026-06-23)


### Features

* **components:** add Accordion, Select, Toggle with Vitest tests and CI ([314324a](https://github.com/araldev/v12-ui/commit/314324a3fc61f6390a6e0438774b1ef29fd8bbd1))

# [0.4.0](https://github.com/araldev/v12-ui/compare/v0.3.3...v0.4.0) (2026-06-23)


### Features

* **buttons:** metallic wave effect for all status variants with own color tint ([d5dd346](https://github.com/araldev/v12-ui/commit/d5dd34609ffa5665d4297eda84506f6be48e7424))

## [0.3.3](https://github.com/araldev/v12-ui/compare/v0.3.2...v0.3.3) (2026-06-23)


### Bug Fixes

* **buttons:** shadow-none as default, explicit shadow-default only for status+primary variants ([ab78c62](https://github.com/araldev/v12-ui/commit/ab78c62ef406980fac73f438688b1bfeb8e25c87))

## [0.3.2](https://github.com/araldev/v12-ui/compare/v0.3.1...v0.3.2) (2026-06-23)


### Bug Fixes

* **buttons:** explicit shadow utilities in [@layer](https://github.com/layer) utilities for reliable generation ([05c0c7f](https://github.com/araldev/v12-ui/commit/05c0c7f51a3d04fb7d85d41dc8d54da89e4fb29d))

## [0.3.1](https://github.com/araldev/v12-ui/compare/v0.3.0...v0.3.1) (2026-06-23)


### Bug Fixes

* **buttons:** primary slate/metallic effect, remove shadow from muted/secondary/ghost ([1745014](https://github.com/araldev/v12-ui/commit/17450144bac1845d0ec165fc2c06dcde42706471))

# [0.3.0](https://github.com/araldev/v12-ui/compare/v0.2.5...v0.3.0) (2026-06-23)


### Bug Fixes

* **button, storybook, css:** address 4 reported issues ([9beef00](https://github.com/araldev/v12-ui/commit/9beef006e0f67edf66c723c1f55e6c614e151152))
* **button:** add native disabled attribute alongside aria-disabled for button elements ([b70f1dd](https://github.com/araldev/v12-ui/commit/b70f1dd295e1586b33244668f9c3a3dd578a3e35))
* **button:** correct hover:border-{variant}-hover typo in 8 compound variants ([ae906ed](https://github.com/araldev/v12-ui/commit/ae906edfe37424a80d22dd0ba622e617554e94aa))
* **button:** replace fixed widths with min-width in size variants ([8593e05](https://github.com/araldev/v12-ui/commit/8593e05feb4082c079ccd6074fa86cfcb134282a))
* **button:** resolve error variant WCAG AA contrast ([df232fc](https://github.com/araldev/v12-ui/commit/df232fc9e761bb72adb5bf4b36e8f343a09d438e))
* **magic-logo:** add canvas accessibility role=img aria-label and static fallback ([6349c82](https://github.com/araldev/v12-ui/commit/6349c82121a25cfa6530a1b2c4e3f4f1edcd822c))
* **magic-mouse-follower:** add canvas accessibility role=img aria-label and static fallback ([7f68f02](https://github.com/araldev/v12-ui/commit/7f68f02efe846ed7efdcd4a3edaea2f915240ff7))
* **magic-text:** add canvas accessibility role=img aria-label and static fallback ([a77c5c9](https://github.com/araldev/v12-ui/commit/a77c5c9da5d0357c72dd477c05b5712006c10307))
* **magic-text:** re-init canvas on resize and defer init to next frame ([051d662](https://github.com/araldev/v12-ui/commit/051d662f23275ea7ba64b4e25b8bd92e00e9ed8b))
* **magic-text:** remove console.log dev artifact ([a95b2de](https://github.com/araldev/v12-ui/commit/a95b2de9ad6824e12b3e78fc0f3772df03168657))
* **magic-text:** resolve alpha detection, retina centering, and reduced-motion fallback ([fc8de02](https://github.com/araldev/v12-ui/commit/fc8de02028aad827d189002b2393f889af39bb55)), closes [#333](https://github.com/araldev/v12-ui/issues/333) [#4fc3f7](https://github.com/araldev/v12-ui/issues/4fc3f7)
* **magic-text:** resolve IndexSizeError when canvas has no layout ([3178ded](https://github.com/araldev/v12-ui/commit/3178ded970da4b75155d5162dea1e093ce0e8c28))
* **storybook:** add appHoverBg to light/dark themes ([fd9ac29](https://github.com/araldev/v12-ui/commit/fd9ac291d50ce597e12785edd116a6d482664e71))
* **storybook:** remove addon-onboarding and inject iframe background via style ([a993d93](https://github.com/araldev/v12-ui/commit/a993d93cf1918cf5af20b7fb8e3362ab87f2da54))
* **storybook:** sync globals.backgrounds with custom theme toolbar ([610f706](https://github.com/araldev/v12-ui/commit/610f70690bf7fa4bcdcdc009eab4d0f1400cea09))
* **storybook:** use getter so docs theme reacts to runtime changes ([9ef9ece](https://github.com/araldev/v12-ui/commit/9ef9ece242fed69e0071f3e4534d8b14c6a6e87c))
* **storybook:** use postMessage to bridge theme from preview to manager ([4c05120](https://github.com/araldev/v12-ui/commit/4c05120cff2970392b71e015077d56fd8d2f1f35))
* **text:** wire CSS-only reduced-motion for hover transitions ([a77c234](https://github.com/araldev/v12-ui/commit/a77c234597d5526cde5b6069477e008dce7d04d5))
* **theme-tokens:** define orphan border-default and add missing utility tokens ([c20c240](https://github.com/araldev/v12-ui/commit/c20c2402eabf48482f7f9f3bf5a03507657e1d31))


### Features

* **a11y:** wire reduced-motion fallback in 5 motion components ([6110129](https://github.com/araldev/v12-ui/commit/611012907cd96ae64fc76a731d3b7a78ca64d2a5))
* **api:** export Stack from public barrel ([82fd958](https://github.com/araldev/v12-ui/commit/82fd95810631cbb13dff90c1d3f5b7a7fe565aa1))
* **hooks:** add useReducedMotion hook ([4c82dc5](https://github.com/araldev/v12-ui/commit/4c82dc50b5ca068b4d952c6093b4322f5564a8b4))
* **storybook:** bridge storybook-dark-mode to data-theme ([382a792](https://github.com/araldev/v12-ui/commit/382a79236f9d189f421ddbb34c899129e5352750))
* **storybook:** theme toolbar control and preview decorator ([fd07d97](https://github.com/araldev/v12-ui/commit/fd07d97ce6549cfcad2789fd338c6801d8db3585))
* **storybook:** use storybook-dark-mode addon for theme switching ([c4dee93](https://github.com/araldev/v12-ui/commit/c4dee9320c2422a957ecdaac711cbff413efa1b7))
* **storybook:** wire manager.ts so chrome theme tracks toolbar ([a36c0e4](https://github.com/araldev/v12-ui/commit/a36c0e446833b54a4cbe4fadb9139d8b8ebd7d1a))
* **theme-tokens:** dark-mode overrides for status shadows ([af369db](https://github.com/araldev/v12-ui/commit/af369db641bef6456b1702b30b9f779256e15bf1))
* **theme-tokens:** extend brand ramps to 950 ([03b323a](https://github.com/araldev/v12-ui/commit/03b323a754d891631dae6c2a01aa0e942725c6cb))

## [0.2.5](https://github.com/araldev/v12-ui/compare/v0.2.4...v0.2.5) (2025-08-11)


### Bug Fixes

* **magiclogo & magicmousefollwer:** fix devicePixelRatio for mobile ([1ac99da](https://github.com/araldev/v12-ui/commit/1ac99da13afb573b2a6b5c839856b122a8992844))

## [0.2.4](https://github.com/araldev/v12-ui/compare/v0.2.3...v0.2.4) (2025-08-11)


### Bug Fixes

* **package.json:** fix main and repository ([9420e8f](https://github.com/araldev/v12-ui/commit/9420e8f7b4af22fcde6e328014dde8adc5cd8458))

## [0.2.3](https://github.com/araldev/v12-ui/compare/v0.2.2...v0.2.3) (2025-08-10)


### Bug Fixes

* **package.json:** solve bugs with dependencies ([bdff8c9](https://github.com/araldev/v12-ui/commit/bdff8c9ee7b3fcaf2f9e8174e9f3f0f51404f92d))

## [0.2.2](https://github.com/araldev/v12-ui/compare/v0.2.1...v0.2.2) (2025-08-10)


### Bug Fixes

* **package.json:** added multiple version of React 18 on peerDependencies ([5ed14b2](https://github.com/araldev/v12-ui/commit/5ed14b2576d4943c9ce5b7e6f3809e2a2bb3cdd2))

## [0.2.1](https://github.com/araldev/v12-ui/compare/v0.2.0...v0.2.1) (2025-08-04)


### Bug Fixes

* **magiclogo & magicmousefollower:** added the exports to the entry point ([dfe5a1b](https://github.com/araldev/v12-ui/commit/dfe5a1bd64a3488d430f720504a56bfc53870e98))

# [0.2.0](https://github.com/araldev/v12-ui/compare/v0.1.1...v0.2.0) (2025-08-04)


### Features

* **magiclogo & magicmousefollower:** add two new premium components and improve MagicText component ([da624f2](https://github.com/araldev/v12-ui/commit/da624f28b576e5fb1c7956a9d965319402dd4c37))

## [0.1.1](https://github.com/araldev/v12-ui/compare/v0.1.0...v0.1.1) (2025-08-01)


### Bug Fixes

* **index.ts(magictext):** add export for MagicText Component ([246130f](https://github.com/araldev/v12-ui/commit/246130fbac7e1974571ce3710e65dd45e7b1625d))

# [0.1.0](https://github.com/araldev/v12-ui/compare/v0.0.26...v0.1.0) (2025-08-01)


### Features

* **magictext:** new component that generates text with animated particles ([f8916eb](https://github.com/araldev/v12-ui/commit/f8916eb0ab31aed9ee8b6e5e0916909ebef0e60c))

## [0.0.26](https://github.com/araldev/v12-ui/compare/v0.0.25...v0.0.26) (2025-07-26)


### Bug Fixes

* **Text Component:** add address to available tags ([dc9b6f8](https://github.com/araldev/v12-ui/commit/dc9b6f8ed7cb195ed59620edcef5426884f898a7))
