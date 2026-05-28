import DefaultTheme from 'vitepress/theme'
import Playground from './components/Playground.vue'
import RealtimeInput from './components/RealtimeInput.vue'
// ids-renderer has been removed; no client-side automatic IDS replacement
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Playground', Playground)
    app.component('RealtimeInput', RealtimeInput)
    // no-op: previously would auto-render IDS inside <code> elements
  },
}
