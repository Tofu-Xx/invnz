import DefaultTheme from 'vitepress/theme'
import { startIdsRenderer } from './ids-renderer'
import Playground from './components/Playground.vue'
import RealtimeInput from './components/RealtimeInput.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Playground', Playground)
    app.component('RealtimeInput', RealtimeInput)
    startIdsRenderer()
  },
}
