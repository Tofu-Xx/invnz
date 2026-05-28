<script setup lang="ts">
import { pinyinTable } from '@invnz/data/pinyinTable'
// Avoid eager network fetches; cards will load on scroll if needed
import { pinyin2invenma } from '@invnz/pinyin2invenma'
import { computed, ref } from 'vue'

const FINALS = [
  'a',
  'o',
  'e',
  'ai',
  'ei',
  'ao',
  'ou',
  'an',
  'en',
  'ang',
  'eng',
  'er',
  'i',
  'ia',
  'ie',
  'iao',
  'iu',
  'ian',
  'in',
  'iang',
  'ing',
  'iong',
  'u',
  'ua',
  'uo',
  'uai',
  'ui',
  'uan',
  'un',
  'uang',
  'ong',
  'ü',
  'üe',
  'üan',
  'ün',
]

const ZERO: Record<string, string> = {
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

interface Syllable {
  pinyin: string
  invenma: string | null
  invenz: string | null
}

const all: Syllable[] = []

for (const f of FINALS) {
  const p = ZERO[f]
  if (p) {
    all.push({ pinyin: p, invenma: pinyin2invenma(p), invenz: p })
  }
}

for (const [init, finals] of Object.entries(pinyinTable)) {
  if (init === 'zero')
    continue
  for (const f of finals) {
    const pinyin = 'jqx'.includes(init) && f.startsWith('ü')
      ? init + f.replace('ü', 'u')
      : init + f
    all.push({ pinyin, invenma: pinyin2invenma(pinyin), invenz: pinyin })
  }
}

const searchQuery = ref('')
const currentPage = ref(1)
const PAGE_SIZE = 50

const filtered = computed(() => {
  if (!searchQuery.value)
    return all
  const q = searchQuery.value.toLowerCase()
  return all.filter(s =>
    s.pinyin.includes(q) || (s.invenma && s.invenma.includes(q)) || (s.invenz && s.invenz.includes(q)),
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paginated = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

function goPage(n: number) {
  currentPage.value = Math.max(1, Math.min(n, totalPages.value))
  document.getElementById('sb-top')?.scrollIntoView({ behavior: 'smooth' })
}

function onSearch() {
  currentPage.value = 1
}
</script>

<template>
  <div id="sb-top" class="sb-container">
    <div class="sb-search">
      <input
        v-model="searchQuery"
        placeholder="搜索拼音、音韵码、音韵字…"
        class="sb-input"
        @input="onSearch"
      >
      <span class="sb-count">{{ filtered.length }} / {{ all.length }}</span>
    </div>

    <div class="sb-grid">
      <div
        v-for="s in paginated"
        :key="s.pinyin"
        class="sb-card"
      >
        <div class="sb-invnz">
          {{ s.invenz ?? '—' }}
        </div>
        <div class="sb-label">
          {{ s.pinyin }}<span v-if="s.invenma"> · {{ s.invenma }}</span>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="sb-pagination">
      <button :disabled="currentPage <= 1" class="sb-btn" @click="goPage(currentPage - 1)">
        ‹
      </button>
      <span class="sb-page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage >= totalPages" class="sb-btn" @click="goPage(currentPage + 1)">
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.sb-container {
  margin: 16px 0;
}

.sb-search {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.sb-input {
  flex: 1;
  padding: 10px 16px;
  font-family: var(--font-serif), serif;
  font-size: 1em;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--ink-black);
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.sb-input:focus {
  border-color: var(--vermillion);
  box-shadow: 0 0 0 3px rgba(178, 34, 34, 0.1);
}

.sb-count {
  font-family: var(--font-mono), monospace;
  font-size: 0.85em;
  color: var(--ink-lighter);
  white-space: nowrap;
}

.sb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
}

.sb-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 8px;
  text-align: center;
  transition: all 0.3s;
  cursor: default;
}

.sb-card:hover {
  border-color: var(--vermillion);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.sb-invnz {
  font-family: var(--font-serif), serif;
  font-size: 1.6em;
  color: var(--ink-black);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sb-label {
  font-size: 0.8em;
  color: var(--ink-lighter);
  margin-top: 4px;
  font-family: var(--font-mono), monospace;
}

.sb-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.sb-btn {
  padding: 6px 14px;
  font-size: 1.2em;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--ink-black);
  cursor: pointer;
  transition: all 0.3s;
}

.sb-btn:hover:not(:disabled) {
  border-color: var(--vermillion);
  color: var(--vermillion);
}

.sb-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.sb-page-info {
  font-family: var(--font-mono), monospace;
  font-size: 0.9em;
  color: var(--ink-lighter);
}
</style>
