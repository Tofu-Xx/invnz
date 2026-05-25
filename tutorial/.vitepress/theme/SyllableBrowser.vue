<script setup lang="ts">
import { vowelMap } from '@invnz/data/ternary'
import { invn2invnz, pinyin2invn } from '@invnz/main'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FINAL_ORDER = vowelMap.map(v => v.pinyin)

const ZERO_INITIAL: Record<string, string> = {
  a: 'a',
  o: 'o',
  e: 'e',
  ai: 'ai',
  ei: 'ei',
  ao: 'ao',
  ou: 'ou',
  an: 'an',
  en: 'en',
  ang: 'ang',
  eng: 'eng',
  er: 'er',
  i: 'yi',
  ia: 'ya',
  ie: 'ye',
  iao: 'yao',
  iu: 'you',
  ian: 'yan',
  in: 'yin',
  iang: 'yang',
  ing: 'ying',
  iong: 'yong',
  u: 'wu',
  ua: 'wa',
  uo: 'wo',
  uai: 'wai',
  ui: 'wei',
  uan: 'wan',
  un: 'wen',
  uang: 'wang',
  ong: 'ong',
  ü: 'yu',
  üe: 'yue',
  üan: 'yuan',
  ün: 'yun',
}

const JQX_FINALS = ['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'ü', 'üe', 'üan', 'ün']

const INITIALS: Record<string, string[]> = {
  b: ['a', 'o', 'ai', 'ei', 'ao', 'an', 'en', 'ang', 'eng', 'i', 'ie', 'iao', 'ian', 'in', 'ing', 'u'],
  p: ['a', 'o', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'ie', 'iao', 'ian', 'in', 'ing', 'u'],
  m: ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'ie', 'iao', 'iu', 'ian', 'in', 'ing', 'u'],
  f: ['a', 'o', 'ei', 'ou', 'an', 'en', 'ang', 'eng', 'u'],
  d: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'ia', 'ie', 'iao', 'iu', 'ian', 'ing', 'u', 'uo', 'ui', 'uan', 'un', 'ong'],
  t: ['a', 'e', 'ai', 'ao', 'ou', 'an', 'ang', 'eng', 'i', 'ie', 'iao', 'ian', 'ing', 'u', 'uo', 'ui', 'uan', 'un', 'ong'],
  n: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'u', 'uo', 'uan', 'un', 'ong', 'ü', 'üe'],
  l: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'ang', 'eng', 'i', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'u', 'uo', 'uan', 'un', 'ong', 'ü', 'üe'],
  g: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'],
  k: ['a', 'e', 'ai', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'],
  h: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'],
  j: JQX_FINALS,
  q: JQX_FINALS,
  x: JQX_FINALS,
  zh: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'],
  ch: ['a', 'e', 'ai', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang', 'ong'],
  sh: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'ua', 'uo', 'uai', 'ui', 'uan', 'un', 'uang'],
  r: ['a', 'e', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'ua', 'uo', 'ui', 'uan', 'un', 'ong'],
  z: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'uo', 'ui', 'uan', 'un', 'ong'],
  c: ['a', 'e', 'ai', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'uo', 'ui', 'uan', 'un', 'ong'],
  s: ['a', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'i', 'u', 'uo', 'ui', 'uan', 'un', 'ong'],
}

interface Syllable {
  pinyin: string
  invn: string
  invnz: string
  sortKey: number
}

function pinyinFor(initial: string, final: string): string {
  if (initial === 'Ø')
    return ZERO_INITIAL[final]
  const p = initial + final
  if ('jqx'.includes(initial) && final.startsWith('ü'))
    return initial + final.replace('ü', 'u')
  return p
}

function buildSyllables(): Syllable[] {
  const result: Syllable[] = []
  const gOrder: Record<string, number> = { 零声母: 0, bpmfdtnlgkh: 1, jqx: 2, zhchshrzcs: 3 }
  for (const f of Object.keys(ZERO_INITIAL)) {
    const pinyin = ZERO_INITIAL[f]
    try {
      const invn = pinyin2invn(pinyin)
      const invnz = invn2invnz(invn)
      const sk = FINAL_ORDER.indexOf(f)
      result.push({ pinyin, invn, invnz, sortKey: (gOrder['零声母'] * 100) + (sk >= 0 ? sk : 999) })
    }
    catch { /* skip */ }
  }
  for (const [initial, finals] of Object.entries(INITIALS)) {
    const g = 'jqx'.includes(initial) ? 'jqx' : ['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(initial) ? 'zhchshrzcs' : 'bpmfdtnlgkh'
    for (const f of finals) {
      const pinyin = pinyinFor(initial, f)
      try {
        const invn = pinyin2invn(pinyin)
        const invnz = invn2invnz(invn)
        const sk = FINAL_ORDER.indexOf(f)
        result.push({ pinyin, invn, invnz, sortKey: (gOrder[g] * 100) + (sk >= 0 ? sk : 999) })
      }
      catch { /* skip */ }
    }
  }
  result.sort((a, b) => a.sortKey - b.sortKey)
  return result
}

const all = buildSyllables()
const searchQuery = ref('')
const copied = ref('')
const currentPage = ref(1)
const gridEl = ref<HTMLElement | null>(null)
const gridWidth = ref(0)
const gridHeight = ref(0)

let ro: ResizeObserver | null = null

const CARD_GAP = 8
const ROWS = 5

const cols = computed(() => {
  const w = gridWidth.value
  if (w <= 16)
    return 4
  return Math.max(2, Math.floor((w - 16 + CARD_GAP) / (90 + CARD_GAP)))
})

const cardH = computed(() => {
  const h = gridHeight.value
  if (h <= 16)
    return 100
  return Math.floor((h - 16 - (ROWS - 1) * CARD_GAP) / ROWS)
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
}))

const pageSize = computed(() => cols.value * ROWS)

const filtered = computed(() => {
  if (!searchQuery.value)
    return all
  const q = searchQuery.value.toLowerCase()
  return all.filter(s =>
    s.pinyin.includes(q) || s.invn.includes(q) || s.invnz.includes(q),
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))

const paginated = computed(() => {
  const p = pageSize.value
  const start = (currentPage.value - 1) * p
  return filtered.value.slice(start, start + p)
})

function goPage(n: number) {
  currentPage.value = Math.max(1, Math.min(n, totalPages.value))
}

function onSearch() {
  currentPage.value = 1
}

let tx = 0
function onTouchStart(e: TouchEvent) { tx = e.touches[0].clientX }
function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - tx
  if (Math.abs(dx) > 50)
    goPage(currentPage.value + (dx < 0 ? 1 : -1))
}

function onKey(e: KeyboardEvent) {
  if (e.key === ',' || e.key === 'ArrowLeft') { goPage(currentPage.value - 1); e.preventDefault() }
  if (e.key === '.' || e.key === 'ArrowRight') { goPage(currentPage.value + 1); e.preventDefault() }
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  if (gridEl.value) {
    gridWidth.value = gridEl.value.clientWidth
    gridHeight.value = gridEl.value.clientHeight
    ro = new ResizeObserver(() => {
      gridWidth.value = gridEl.value?.clientWidth ?? 0
      gridHeight.value = gridEl.value?.clientHeight ?? 0
    })
    ro.observe(gridEl.value)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  ro?.disconnect()
})

function doCopy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = text
    setTimeout(() => { copied.value = '' }, 1400)
  })
}
</script>

<template>
  <div class="flex flex-col gap-2 flex-1 min-h-0">
    <div class="flex items-center gap-2 shrink-0">
      <Input
        v-model="searchQuery"
        placeholder="搜索拼音、音韵码、音韵字…"
        class="h-9 font-sans"
        @input="onSearch"
      />
      <span class="text-xs text-muted-foreground/70 shrink-0 whitespace-nowrap font-mono">{{ filtered.length }} / {{ all.length }}</span>
    </div>

    <div class="flex-1 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div
        ref="gridEl"
        class="grid gap-2 p-2 content-start overflow-hidden size-full"
        :style="gridStyle"
        data-sb-grid
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div
          v-for="s in paginated"
          :key="s.pinyin + s.sortKey"
          class="card-sb cursor-pointer rounded-md border border-border/70 bg-[--card-bg] shadow-xs
                 hover:shadow-md hover:border-t-red-800/70 hover:border-t-[2px]
                 active:scale-[0.97] transition-all duration-150 select-none
                 flex flex-col items-center justify-center gap-0.5 h-[--card-h] px-1.5 py-2 overflow-hidden"
          :style="{ '--card-h': `${cardH}px` }"
          @click="doCopy(s.invnz)"
        >
          <code class="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-foreground leading-none truncate block text-center mx-auto max-w-full">
            {{ s.invnz }}
          </code>
          <div class="text-sm text-muted-foreground/60 font-sans leading-tight truncate text-center">
            {{ s.pinyin }} · {{ s.invn }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 shrink-0 py-0.5">
      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage <= 1"
        class="border-red-800/20 text-red-800/70 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
        @click="goPage(currentPage - 1)"
      >
        <ChevronLeft class="size-4" />
      </Button>
      <span class="text-xs text-muted-foreground min-w-[60px] text-center select-none font-mono tabular-nums">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <Button
        variant="outline"
        size="icon"
        :disabled="currentPage >= totalPages"
        class="border-red-800/20 text-red-800/70 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
        @click="goPage(currentPage + 1)"
      >
        <ChevronRight class="size-4" />
      </Button>
    </div>

    <div class="text-center text-[10px] text-muted-foreground/50 shrink-0 select-none font-sans tracking-wide">
      ↹ 滑动 / ← → / , . &nbsp;｜&nbsp; 点击卡片复制
    </div>

    <Transition name="f">
      <div
        v-if="copied"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-red-800 text-amber-100 text-xs pointer-events-none z-50 shadow-lg font-serif"
      >
        已复制
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.f-enter-active, .f-leave-active { transition: opacity .25s, transform .25s; }
.f-enter-from, .f-leave-to { opacity: 0; transform: translateX(-50%) translateY(8px); }
</style>
