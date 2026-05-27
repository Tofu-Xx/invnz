import { vowelPhonemeMap, consonantPhonemeMap } from './data/phoneme2wordroot'
import { vowel2phonemesMap } from './data/vowel2phonemes'

export interface DirectResult {
  wordroot: string
  isZeroInitial: boolean
}

function phonemeList(entry: { phoneme: string | string[] }): string[] {
  return Array.isArray(entry.phoneme) ? entry.phoneme : [entry.phoneme]
}

/**
 * 函数1：接收 pinyin，遍历 vowelPhonemeMap + consonantPhonemeMap，
 * 如果有完整匹配，返回对应的字根信息。
 * '-x' 前缀的条目匹配时标记 isZeroInitial: true。
 */
export function directSyllable(pinyin: string): DirectResult | null {
  for (const entry of vowelPhonemeMap) {
    for (const ph of phonemeList(entry)) {
      const key = ph.startsWith('-') ? ph.slice(1) : ph
      if (key === pinyin) {
        return { wordroot: entry.wordroot, isZeroInitial: ph.startsWith('-') }
      }
    }
  }
  for (const entry of consonantPhonemeMap) {
    for (const ph of phonemeList(entry)) {
      if (ph === pinyin) {
        return { wordroot: entry.wordroot, isZeroInitial: false }
      }
    }
  }
  return null
}

const DOUBLE_INITIALS = ['zh', 'ch', 'sh']
const JQX = ['j', 'q', 'x']
const BPMF = ['b', 'p', 'm', 'f']
const I_OMIT = ['j', 'q', 'x', 'z', 'c', 's', 'r', 'zh', 'ch', 'sh']

/**
 * 函数2：接收 pinyin，拆成 [consonant, phoneme, ...] 数组。
 * 应用 jqx u→v、可读声母去 i、bpmf o→uo、vowel2phonemes 分解等规则。
 */
export function splitSyllable(pinyin: string): string[] {
  let consonant = ''
  let vowel = pinyin

  for (const dc of DOUBLE_INITIALS) {
    if (pinyin.startsWith(dc)) {
      consonant = dc
      vowel = pinyin.slice(2)
      break
    }
  }
  if (!consonant) {
    const first = pinyin[0]
    consonant = first
    vowel = pinyin.slice(1)
  }

  const isRealConsonant = consonantPhonemeMap.some(
    entry => phonemeList(entry).includes(consonant),
  )
  if (!consonant || !isRealConsonant) {
    consonant = ''
    vowel = pinyin
  }

  if (consonant && JQX.includes(consonant)) {
    vowel = vowel.replace(/u/g, 'ü')
  }

  if (consonant && BPMF.includes(consonant) && vowel === 'o') {
    vowel = 'uo'
  }

  let phonemes: string[] = []
  let found = false

  function vowelList(entry: { vowel: string | string[] }): string[] {
    return Array.isArray(entry.vowel) ? entry.vowel : [entry.vowel]
  }

  search:
  for (const entry of vowel2phonemesMap) {
    for (const v of vowelList(entry)) {
      if (v === vowel) {
        phonemes = [...entry.phonemes]
        found = true
        break search
      }
    }
  }

  if (!found) {
    phonemes = [vowel]
  }

  // Recombine v-prefix decomposition (e.g. v_ong → iong/yong)
  if (phonemes[0] === 'v' && phonemes.length > 1) {
    phonemes = [vowel]
  }

  if (consonant && I_OMIT.includes(consonant)) {
    phonemes = phonemes.filter(ph => ph !== 'i')
  }

  const result = consonant ? [consonant, ...phonemes] : phonemes
  return result.map(p => p.replace(/ü/g, 'v'))
}
