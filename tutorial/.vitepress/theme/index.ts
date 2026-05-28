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
    // apply saved theme on client (if any)
    if (typeof document !== 'undefined') {
      const saved = localStorage.getItem('site-theme')
      if (saved === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }

  },
}
