import { vowel2phonemesMap } from './data/vowel2phonemes'

const CONSONANTS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's'] as const

/** 转换 v → ü */
function normalize(pinyin: string): string {
  return pinyin.replace(/v/g, 'ü')
}

/**
 * jqx/zhchsh/zcsr 后省略韵母 i（iong/ie 等整体音素不省略）。
 * 如果 invenma 以 "cons_i_" 开头，去掉 "_i"。
 */
function dropI(invenma: string): string {
  return invenma.replace(
    /^([jqxr]|zh|ch|sh|[zcs])_i(?=(_|$))/,
    '$1',
  )
}

/**
 * pinyin → invenma（音素用 `_` 分隔）。
 * 分解失败返回 null（由 getDirectSyllable 兜底）。
 */
export function pinyin2invenma(pinyin: string): string | null {
  pinyin = normalize(pinyin)

  // 1. 直接命中 vowel2phonemesMap（复合韵母分解）
  if (vowel2phonemesMap.has(pinyin))
    return vowel2phonemesMap.get(pinyin)!

  // 2. y／w 零声母
  if (pinyin.startsWith('y')) {
    const rest = pinyin.slice(1)
    // yi / ye / yu / yue 已在 vowelPhonemeMap 中
    if (rest === 'i' || rest === 'e' || rest === 'u' || rest === 'ue')
      return null
    // y → i / ü
    const iForm = `i${rest}`
    if (vowel2phonemesMap.has(iForm))
      return vowel2phonemesMap.get(iForm)!
    const vForm = `ü${rest}`
    if (vowel2phonemesMap.has(vForm))
      return vowel2phonemesMap.get(vForm)!
    return null
  }

  if (pinyin.startsWith('w')) {
    const rest = pinyin.slice(1)
    if (rest === 'u')
      return null // wu 由 vowelPhonemeMap 处理
    const uForm = `u${rest}`
    if (vowel2phonemesMap.has(uForm))
      return vowel2phonemesMap.get(uForm)!
    return null
  }

  // 3. 声母 + 韵母
  for (const cons of CONSONANTS) {
    if (pinyin.startsWith(cons)) {
      let final = pinyin.slice(cons.length)
      if (final === '')
        return null // 纯声母

      // jqx + u → ü（v）
      if ('jqx'.includes(cons) && final.startsWith('u'))
        final = `ü${final.slice(1)}`

      // bpmf + o → uo
      if ('bpmf'.includes(cons) && final === 'o')
        final = 'uo'

      const invenma = vowel2phonemesMap.has(final)
        ? `${cons}_${vowel2phonemesMap.get(final)!}`
        : `${cons}_${final}`

      return dropI(invenma)
    }
  }

  // 4. 纯韵母（a / o / e / an / en …）由 getDirectSyllable 处理
  return null
}
