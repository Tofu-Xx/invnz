<script setup lang="ts">
// InvnzSvg component will call getInvnz; avoid calling it from computed to prevent eager fetch
import { pinyin } from 'pinyin-pro'
import { computed, ref } from 'vue'
import InvnzSvg from './InvnzSvg.vue'

const tab = ref<'pinyin' | 'hanzi'>('pinyin')
const pinyinText = ref('')
const hanziText = ref('')

interface PinyinResult {
  pinyin: string
  invenz: string | null
}

interface HanziResult {
  char: string
  pinyin: string
  invenz: string | null
}

const pinyinResults = computed<PinyinResult[]>(() => {
  const parts = pinyinText.value.trim().toLowerCase().split(/\s+/)
  if (!parts[0])
    return []
  return parts.map(p => ({
    pinyin: p,
    // pass pinyin through; InvnzSvg will fetch via getInvnz
    invenz: p,
  }))
})

const hanziResults = computed<HanziResult[]>(() => {
  const chars: HanziResult[] = []
  for (const char of hanziText.value.trim()) {
    if (/[\u4E00-\u9FFF]/.test(char)) {
      const py = pinyin(char, { toneType: 'none', type: 'array' })[0] || ''
      chars.push({ char, pinyin: py, invenz: py })
    }
    else if (char.trim()) {
      chars.push({ char, pinyin: '', invenz: null })
    }
  }
  return chars
})
</script>

<template>
  <div class="realtime-container">
    <div class="rt-tabs">
      <button class="rt-tab" :class="[{ active: tab === 'pinyin' }]" @click="tab = 'pinyin'">
        拼音 → 音韵字
      </button>
      <button class="rt-tab" :class="[{ active: tab === 'hanzi' }]" @click="tab = 'hanzi'">
        汉字 → 音韵字
      </button>
    </div>

    <div v-if="tab === 'pinyin'">
      <div class="rt-input-wrap">
        <input
          v-model="pinyinText"
          class="rt-input"
          placeholder="输入拼音，空格分隔。例如：zhong tian guang yong"
        >
      </div>

      <div v-if="pinyinResults.length" class="rt-results">
        <div v-for="(item, i) in pinyinResults" :key="i" class="rt-result-item">
          <div class="rt-result-label">
            {{ item.pinyin }}
          </div>
          <div class="rt-result-svg">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="64" />
            <span v-else class="rt-na">—</span>
          </div>
        </div>
      </div>
      <div v-else-if="!pinyinText.trim()" class="rt-hint">
        输入拼音后实时显示音韵字…
      </div>
    </div>

    <div v-if="tab === 'hanzi'">
      <div class="rt-input-wrap">
        <input
          v-model="hanziText"
          class="rt-input"
          placeholder="输入汉字。例如：中国山水"
        >
      </div>

      <div v-if="hanziResults.length" class="rt-results">
        <div v-for="(item, i) in hanziResults" :key="i" class="rt-result-item">
          <div class="rt-result-char">
            {{ item.char }}
          </div>
          <div class="rt-result-label">
            {{ item.pinyin || '—' }}
          </div>
          <div class="rt-result-svg">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="64" />
            <span v-else class="rt-na">—</span>
          </div>
        </div>
      </div>
      <div v-else-if="!hanziText.trim()" class="rt-hint">
        输入汉字后显示每个字的音韵字…
      </div>
    </div>
  </div>
</template>

<style scoped>
.realtime-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 44px 32px 32px; /* 增加顶部内边距以避免 tabs 覆盖 */
  margin: 32px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  position: relative;
}

  .rt-tabs {
  display: inline-flex;
  gap: 8px;
  margin-top: 0;
  padding: 6px 8px;
  background: var(--card-bg);
  border-radius: 18px;
}

.rt-tab {
  padding: 10px 24px;
  font-family: var(--font-nav), serif;
  font-size: 0.95em;
  letter-spacing: 0.08em;
  border: none;
  background: transparent;
  color: var(--ink-lighter);
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}
.rt-tab:hover { color: var(--ink-black); }
.rt-tab.active { color: var(--vermillion); border-bottom-color: var(--vermillion); }

.rt-input-wrap { position: relative; }

.rt-input {
  width: 100%;
  padding: 16px 20px;
  font-family: var(--font-serif), serif;
  font-size: 1.2em;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--ink-black);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}
.rt-input:focus {
  border-color: var(--vermillion);
  box-shadow: 0 0 0 3px rgba(178,34,34,0.1);
}
.rt-input::placeholder {
  color: var(--ink-lighter);
  font-style: italic;
  opacity: 0.6;
}

 .rt-results {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
   gap: 16px;
   margin-top: 28px;
 }

.rt-result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  min-width: 100px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.rt-result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.rt-result-label {
  font-family: var(--font-mono), monospace;
  font-size: 0.85em;
  color: var(--ink-lighter);
  letter-spacing: 0.05em;
}

.rt-result-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.rt-result-char {
  font-size: 1.4em;
  font-family: var(--font-serif), serif;
  color: var(--ink-black);
}

.rt-na {
  color: var(--ink-lighter);
  font-size: 1.2em;
}

.rt-hint {
  margin-top: 24px;
  text-align: center;
  color: var(--ink-lighter);
  font-style: italic;
  font-family: var(--font-nav), serif;
  letter-spacing: 0.05em;
  padding: 24px;
}

@media (max-width: 768px) {
  .rt-results { justify-content: center; }
}
</style>
