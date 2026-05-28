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
    // add a floating theme toggle button for demo/testing
    if (typeof document !== 'undefined') {
      if (!document.getElementById('theme-toggle')) {
        const btn = document.createElement('button')
        btn.id = 'theme-toggle'
        btn.title = '切换亮/暗模式'
        btn.style.position = 'fixed'
        btn.style.top = '12px'
        btn.style.right = '12px'
        btn.style.zIndex = '9999'
        btn.style.width = '40px'
        btn.style.height = '40px'
        btn.style.borderRadius = '20px'
        btn.style.border = '1px solid var(--border-color)'
        btn.style.background = 'var(--card-bg)'
        btn.style.cursor = 'pointer'
        btn.innerText = document.documentElement.classList.contains('dark') ? '🌙' : '☀️'
        btn.addEventListener('click', () => {
          const el = document.documentElement
          const isDark = el.classList.toggle('dark')
          localStorage.setItem('site-theme', isDark ? 'dark' : 'light')
          btn.innerText = isDark ? '🌙' : '☀️'
        })
        document.body.appendChild(btn)
      }
    }
  },
}
