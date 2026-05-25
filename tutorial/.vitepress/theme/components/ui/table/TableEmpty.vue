<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  colspan?: number
}>()
</script>

<template>
  <tr data-slot="table-empty">
    <td :colspan="colspan || 1" :class="cn('p-6 text-center text-sm text-muted-foreground', props.class)">
      <slot />
    </td>
  </tr>
</template>
