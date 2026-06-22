// This file is automatically loaded by Storybook as a manager entry
// because it sits at .storybook/manager.ts. It runs once in the manager
// (chrome) bundle, never inside the preview iframe.
//
// We use the addons API to listen on the Storybook channel for the
// 'v12-ui/theme-changed' event emitted by the preview Decorator
// (see .storybook/preview.tsx). When the event fires, we call
// addons.setConfig({ theme }) which is the official Storybook API
// to swap the manager chrome theme without a full page reload.

import { addons } from 'storybook/manager-api'

addons.getChannel().on('v12-ui/theme-changed', (theme) => {
  addons.setConfig({ theme })
})