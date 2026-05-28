<script setup lang="ts">
// InvnzSvg handles fetching; avoid eager network calls here
import { pinyin } from 'pinyin-pro'
import { computed, ref } from 'vue'
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
  if (!parts[0])
    return []
  return parts.map(p => ({ pinyin: p, invenz: p }))
})

const hanziItems = computed<HanziItem[]>(() => {
  const items: HanziItem[] = []
  for (const char of hanziInput.value.trim()) {
      if (/[\u4E00-\u9FFF]/.test(char)) {
        const py = pinyin(char, { toneType: 'none', type: 'array' })[0] || ''
        items.push({ char, pinyin: py, invenz: py })
      }
    else if (char.trim()) {
      items.push({ char, pinyin: '', invenz: null })
    }
  }
  return items
})
</script>

<template>
  <div class="playground-container">
    <div class="playground-tabs">
      <button class="playground-tab" :class="[{ active: tab === 'pinyin' }]" @click="tab = 'pinyin'">
        拼音 → 音韵字
      </button>
      <button class="playground-tab" :class="[{ active: tab === 'hanzi' }]" @click="tab = 'hanzi'">
        汉字 → 音韵字
      </button>
    </div>

    <div v-if="tab === 'pinyin'">
      <div class="pg-input-wrap">
        <input
          v-model="pinyinInput"
          class="playground-input"
          placeholder="输入拼音，空格分隔。例如：zhong tian guang yong"
        >
      </div>

      <div v-if="pinyinItems.length" class="playground-results">
        <div v-for="(item, i) in pinyinItems" :key="i" class="pg-item">
          <div class="pg-label">
            {{ item.pinyin }}
          </div>
          <div class="pg-arrow">
            →
          </div>
          <div class="pg-invenz">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="56" />
            <span v-else class="pg-na">—</span>
          </div>
        </div>
      </div>
      <div v-else-if="!pinyinInput.trim()" class="pg-hint">
        输入拼音后实时显示音韵字…
      </div>
    </div>

    <div v-if="tab === 'hanzi'">
      <div class="pg-input-wrap">
        <input
          v-model="hanziInput"
          class="playground-input"
          placeholder="输入汉字。例如：中国山水"
        >
      </div>

      <div v-if="hanziItems.length" class="playground-results">
        <div v-for="(item, i) in hanziItems" :key="i" class="pg-item">
          <div class="pg-char">
            {{ item.char }}
          </div>
          <div class="pg-label">
            {{ item.pinyin || '—' }}
          </div>
          <div class="pg-arrow">
            →
          </div>
          <div class="pg-invenz">
            <InvnzSvg v-if="item.invenz" :invenz="item.invenz" :size="56" />
            <span v-else class="pg-na">—</span>
          </div>
        </div>
      </div>
      <div v-else-if="!hanziInput.trim()" class="pg-hint">
        输入汉字后显示每个字的音韵字…
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 44px 32px 32px; /* 增加顶部内边距，防止 tabs 覆盖边框 */
  margin: 24px 0;
  position: relative;
}

.playground-tabs {
  display: inline-flex;
  gap: 8px;
  margin-top: -18px; /* 轻微上提以达到悬浮视觉，但仍在文档流中 */
  padding: 6px 8px;
  background: var(--card-bg);
  border-radius: 18px;
  border-bottom: none;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
    margin-top: 24px;
  }

  .pg-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
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
