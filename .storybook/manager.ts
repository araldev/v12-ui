import { addons } from 'storybook/manager-api'

// The preview Decorator (preview.tsx) posts window.parent.postMessage
// when the theme toolbar changes. We listen for those messages and call
// addons.setConfig so the chrome re-renders without a full page reload.

window.addEventListener('message', (event) => {
  if (event.data?.type === 'v12-ui/theme-changed') {
    addons.setConfig({ theme: event.data.theme })
  }
})