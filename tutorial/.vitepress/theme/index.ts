import DefaultTheme from 'vitepress/theme'
import { startIdsRenderer } from './ids-renderer'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    startIdsRenderer()
  },
}
