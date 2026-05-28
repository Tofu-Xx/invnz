<template>
  <span ref="container" class="invnz-svg" :style="{ width: displaySize + 'px', height: displaySize + 'px' }"></span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { renderIds } from '../ids-renderer'

const props = withDefaults(defineProps<{
  invenz: string | null
  size?: number
}>(), {
  size: 100,
})

const container = ref<HTMLElement>()
const displaySize = props.size

function render() {
  const el = container.value
  if (!el) return
  el.innerHTML = ''
  if (!props.invenz) return

  const svg = renderIds(props.invenz, props.size)
  if (svg) el.appendChild(svg)
}

onMounted(render)
watch(() => props.invenz, render)
</script>

<style scoped>
.invnz-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.invnz-svg :deep(svg) {
  display: block;
}
</style>
