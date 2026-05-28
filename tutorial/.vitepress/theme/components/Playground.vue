<template>
  <div class="playground-container">
    <div class="playground-tabs">
      <button :class="['playground-tab', { active: tab === 'pinyin' }]" @click="tab = 'pinyin'">
        拼音 → 音韵字
      </button>
      <button :class="['playground-tab', { active: tab === 'hanzi' }]" @click="tab = 'hanzi'">
        汉字 → 音韵字
      </button>
    </div>

    <div v-if="tab === 'pinyin'">
      <div class="pg-input-wrap">
        <input
          v-model="pinyinInput"
          class="playground-input"
          placeholder="输入拼音，空格分隔。例如：zhong tian guang yong"
        />
      </div>

      <div class="playground-results" v-if="pinyinItems.length">
        <div class="pg-item" v-for="(item, i) in pinyinItems" :key="i">
          <div class="pg-label">{{ item.pinyin }}</div>
          <div class="pg-arrow">→</div>
          <div class="pg-invenz">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="56" />
            <span v-else class="pg-na">—</span>
          </div>
        </div>
      </div>
      <div class="pg-hint" v-else-if="!pinyinInput.trim()">
        输入拼音后实时显示音韵字…
      </div>
    </div>

    <div v-if="tab === 'hanzi'">
      <div class="pg-input-wrap">
        <input
          v-model="hanziInput"
          class="playground-input"
          placeholder="输入汉字。例如：中国山水"
        />
      </div>

      <div class="playground-results" v-if="hanziItems.length">
        <div class="pg-item" v-for="(item, i) in hanziItems" :key="i">
          <div class="pg-char">{{ item.char }}</div>
          <div class="pg-label">{{ item.pinyin || '—' }}</div>
          <div class="pg-arrow">→</div>
          <div class="pg-invenz">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="56" />
            <span v-else class="pg-na">—</span>
          </div>
        </div>
      </div>
      <div class="pg-hint" v-else-if="!hanziInput.trim()">
        输入汉字后显示每个字的音韵字…
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { pinyin } from 'pinyin-pro'
import { getInvnz } from '@invnz/main'
import InvnzSvg from './InvnzSvg.vue'

const tab = ref<'pinyin' | 'hanzi'>('pinyin')
const pinyinInput = ref('')
const hanziInput = ref('')

interface PinyinItem {
  pinyin: string
  invenz: string | null
}

interface HanziItem {
  char: string
  pinyin: string
  invenz: string | null
}

const pinyinItems = computed<PinyinItem[]>(() => {
  const parts = pinyinInput.value.trim().toLowerCase().split(/\s+/)
  if (!parts[0]) return []
  return parts.map(p => ({ pinyin: p, invenz: getInvnz(p) }))
})

const hanziItems = computed<HanziItem[]>(() => {
  const items: HanziItem[] = []
  for (const char of hanziInput.value.trim()) {
    if (/[\u4e00-\u9fff]/.test(char)) {
      const py = pinyin(char, { toneType: 'none', type: 'array' })[0] || ''
      items.push({ char, pinyin: py, invenz: getInvnz(py) })
    } else if (char.trim()) {
      items.push({ char, pinyin: '', invenz: null })
    }
  }
  return items
})
</script>

<style scoped>
.playground-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  margin: 24px 0;
}

.playground-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border-color);
}

.playground-tab {
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
.playground-tab:hover { color: var(--ink-black); }
.playground-tab.active { color: var(--vermillion); border-bottom-color: var(--vermillion); }

.pg-input-wrap { position: relative; }

.playground-input {
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
.playground-input:focus {
  border-color: var(--vermillion);
  box-shadow: 0 0 0 3px rgba(178,34,34,0.1);
}
.playground-input::placeholder {
  color: var(--ink-lighter);
  font-style: italic;
  opacity: 0.6;
}

.playground-results {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.pg-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.pg-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.pg-label {
  font-family: var(--font-mono), monospace;
  font-size: 0.9em;
  color: var(--ink-lighter);
  letter-spacing: 0.05em;
}

.pg-char {
  font-size: 1.4em;
  font-family: var(--font-serif), serif;
  color: var(--ink-black);
}

.pg-arrow {
  color: var(--vermillion);
  font-size: 1.2em;
}

.pg-invenz {
  display: flex;
  align-items: center;
}

.pg-na {
  color: var(--ink-lighter);
  font-size: 0.9em;
}

.pg-hint {
  margin-top: 24px;
  text-align: center;
  color: var(--ink-lighter);
  font-style: italic;
  font-family: var(--font-nav), serif;
  letter-spacing: 0.05em;
  padding: 24px;
}

@media (max-width: 768px) {
  .playground-results { justify-content: center; }
}
</style>
