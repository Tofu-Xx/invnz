<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { getInvnz } from '@invnz/main'

const props = withDefaults(defineProps<{
  invenz: string | null
  size?: number
}>(), {
  size: 100,
})

const container = ref<HTMLElement | null>(null)
const displaySize = props.size

// Simple in-memory session cache for fetched SVGs
const cache = (globalThis as any).__invnzSvgCache ??= new Map<string, string>()

let currentAbort: AbortController | null = null
let lastRequestId = 0
let io: IntersectionObserver | null = null

async function fetchAndRender(idsOrPinyin: string | null) {
  const el = container.value
  if (!el) return
  el.innerHTML = ''
  if (!idsOrPinyin) return

  const key = idsOrPinyin
  if (cache.has(key)) {
    el.innerHTML = cache.get(key) as string
    normalizeSvg(el, props.size)
    return
  }

  if (currentAbort) currentAbort.abort()
  const ac = new AbortController()
  currentAbort = ac
  const reqId = ++lastRequestId

  // loading placeholder
  el.innerHTML = '<span class="invnz-loading">⏳</span>'

  try {
    const svgText = await getInvnz(idsOrPinyin)
    if (ac.signal.aborted) return
    if (!svgText) {
      el.innerHTML = '<span class="rt-na">—</span>'
      return
    }

    // parse and insert only the svg element
    const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml')
    const svgEl = doc.querySelector('svg')
    if (!svgEl) {
      el.innerHTML = '<span class="rt-na">—</span>'
      return
    }

    // normalize attributes
    svgEl.setAttribute('width', String(props.size))
    svgEl.setAttribute('height', String(props.size))
    svgEl.setAttribute('fill', 'currentColor')
    svgEl.style.overflow = 'visible'

    el.innerHTML = ''
    el.appendChild(svgEl)
    cache.set(key, svgEl.outerHTML)
  }
  catch (err) {
    if (ac.signal.aborted) return
    el.innerHTML = '<span class="rt-na">—</span>'
  }
}

function normalizeSvg(containerEl: HTMLElement, size: number) {
  const svg = containerEl.querySelector('svg')
  if (!svg) return
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.style.overflow = 'visible'
}

function observeAndMaybeLoad() {
  const el = container.value
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') {
    // no IO support: load immediately
    void fetchAndRender(props.invenz)
    return
  }
  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        void fetchAndRender(props.invenz)
        if (io && el) { io.unobserve(el); io.disconnect(); io = null }
      }
    }
  }, { root: null, threshold: 0 })
  if (el) io.observe(el)
}

onMounted(() => { observeAndMaybeLoad() })
watch(() => props.invenz, (v) => {
  // when ids changes, reset observer and refire
  if (io) { io.disconnect(); io = null }
  observeAndMaybeLoad()
})

onBeforeUnmount(() => {
  if (currentAbort) currentAbort.abort()
  if (io) { io.disconnect(); io = null }
})
</script>

<template>
  <span ref="container" class="invnz-svg" :style="{ width: `${displaySize}px`, height: `${displaySize}px` }" />
</template>

<style scoped>
.invnz-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-black);
}
.invnz-svg :deep(svg) {
  display: block;
}
.invnz-svg :deep(svg *) {
  fill: currentColor;
  stroke: currentColor;
}
</style>
