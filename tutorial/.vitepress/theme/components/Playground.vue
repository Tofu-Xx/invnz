<template>
  <div class="playground-container">
    <!-- Tab switcher -->
    <div style="display:flex; gap: 0; margin-bottom: 24px; border-bottom: 2px solid var(--border-color);">
      <button
        :class="['playground-tab', { active: tab === 'pinyin' }]"
        @click="tab = 'pinyin'"
      >
        🔤 拼音 → 音韵字
      </button>
      <button
        :class="['playground-tab', { active: tab === 'hanzi' }]"
        @click="tab = 'hanzi'"
      >
        📝 汉字 → 音韵字
      </button>
    </div>

    <!-- Tab: Pinyin input -->
    <div v-if="tab === 'pinyin'">
      <label style="display: block; font-family: var(--font-nav), serif; font-size: 0.85em; color: var(--ink-lighter); letter-spacing: 0.08em; margin-bottom: 8px;">
        输入拼音（无声调）
      </label>
      <input
        v-model="pinyinInput"
        class="playground-input"
        placeholder="例如：zhong tian guang yong"
        @keydown="handleKeydown"
      />

      <div class="playground-output" v-if="pinyinResult">
        <div class="pipeline-step">
          <span class="pipeline-label">拼音</span>
          <span class="pipeline-value">{{ pinyinResult.pinyin }}</span>
          <span class="pipeline-arrow">→</span>
        </div>
        <div class="pipeline-step">
          <span class="pipeline-label">音韵码</span>
          <span class="pipeline-value" style="font-family: var(--font-mono)">{{ pinyinResult.invenma }}</span>
          <span class="pipeline-arrow">→</span>
        </div>
        <div class="pipeline-step">
          <span class="pipeline-label">音韵字</span>
          <span class="pipeline-value" style="font-size: 1.5em" v-html="renderIds(pinyinResult.invenz)"></span>
        </div>
      </div>

      <div class="playground-output" v-else-if="pinyinInput.trim() && pinyinResult === null" style="color: var(--ink-lighter);">
        未找到该拼音的映射
      </div>

      <div class="playground-output" v-else style="color: var(--ink-lighter); font-style: italic;">
        输入拼音后实时显示音韵字…
      </div>
    </div>

    <!-- Tab: Hanzi input -->
    <div v-if="tab === 'hanzi'">
      <label style="display: block; font-family: var(--font-nav), serif; font-size: 0.85em; color: var(--ink-lighter); letter-spacing: 0.08em; margin-bottom: 8px;">
        输入汉字
      </label>
      <input
        v-model="hanziInput"
        class="playground-input"
        placeholder="例如：中国山水"
      />

      <div class="playground-output" v-if="hanziChars.length">
        <div
          v-for="(char, idx) in hanziChars"
          :key="idx"
          style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px dashed var(--border-color);"
        >
          <span style="font-size: 1.8em; min-width: 40px; text-align: center;">{{ char.char }}</span>
          <span style="color: var(--ink-lighter); font-size: 0.9em; min-width: 80px;">{{ char.pinyin }}</span>
          <span style="color: var(--vermillion); font-weight: bold; margin: 0 4px;">→</span>
          <span style="font-size: 1.3em; font-family: var(--font-serif);" v-html="renderIds(char.invenz)"></span>
        </div>
      </div>

      <div class="playground-output" v-else-if="hanziInput.trim() && !hanziChars.length" style="color: var(--ink-lighter);">
        未能识别输入的汉字
      </div>

      <div class="playground-output" v-else style="color: var(--ink-lighter); font-style: italic;">
        输入汉字后显示每个字的音韵字…
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { pinyin } from 'pinyin-pro'
import { getInvnz } from '@invnz/main'
import { pinyin2invenma } from '@invnz/pinyin2invenma'

const tab = ref<'pinyin' | 'hanzi'>('pinyin')
const pinyinInput = ref('')
const hanziInput = ref('')

interface PinyinResult {
  pinyin: string
  invenma: string | null
  invenz: string | null
}

interface HanziResult {
  char: string
  pinyin: string
  invenz: string | null
}

const pinyinResult = computed<PinyinResult | null>(() => {
  const text = pinyinInput.value.trim().toLowerCase().split(/\s+/)[0]
  if (!text) return null
  const invenz = getInvnz(text)
  if (invenz === null) return null
  const invenma = pinyin2invenma(text)
  return { pinyin: text, invenma, invenz }
})

const hanziChars = computed<HanziResult[]>(() => {
  const text = hanziInput.value.trim()
  if (!text) return []
  const chars: HanziResult[] = []
  for (const char of text) {
    if (/[\u4e00-\u9fff]/.test(char)) {
      const py = pinyin(char, { toneType: 'none', type: 'array' })[0] || ''
      const invnz = getInvnz(py)
      chars.push({ char, pinyin: py, invenz: invnz })
    } else if (char.trim()) {
      chars.push({ char, pinyin: '', invenz: null })
    }
  }
  return chars
})

function renderIds(invenz: string | null): string {
  if (!invenz) return '<span style="color: var(--ink-lighter)">—</span>'
  const escaped = invenz
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return `<code style="font-family: var(--font-serif); font-size: 1em; background: transparent;">${escaped}</code>`
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    const text = pinyinInput.value.trim().toLowerCase()
    const parts = text.split(/\s+/)
    if (parts.length > 1) {
      pinyinInput.value = parts[0]
    }
  }
}
</script>

<style scoped>
.playground-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  margin: 24px 0;
}

.playground-tab {
  padding: 10px 20px;
  font-family: var(--font-serif), serif;
  font-size: 1em;
  border: none;
  background: transparent;
  color: var(--ink-lighter);
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.playground-tab:hover {
  color: var(--ink-black);
}

.playground-tab.active {
  color: var(--vermillion);
  border-bottom-color: var(--vermillion);
}

.playground-input {
  width: 100%;
  padding: 14px 18px;
  font-family: var(--font-serif), serif;
  font-size: 1.2em;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--ink-black);
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.playground-input:focus {
  border-color: var(--vermillion);
  box-shadow: 0 0 0 3px rgba(178, 34, 34, 0.1);
}

.playground-output {
  margin-top: 24px;
  padding: 24px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  min-height: 80px;
}

.pipeline-step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px dashed var(--border-color);
}

.pipeline-step:last-child {
  border-bottom: none;
}

.pipeline-label {
  font-family: var(--font-nav), serif;
  font-size: 0.85em;
  color: var(--ink-lighter);
  min-width: 80px;
  letter-spacing: 0.05em;
}

.pipeline-value {
  font-family: var(--font-serif), serif;
  font-size: 1.1em;
  color: var(--ink-black);
}

.pipeline-arrow {
  color: var(--vermillion);
  font-size: 1.3em;
}
</style>
