import DefaultTheme from 'vitepress/theme'
import { startIdsRenderer } from './ids-renderer'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    startIdsRenderer()
  },
}
