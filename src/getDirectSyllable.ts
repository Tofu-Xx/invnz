import { consonantPhonemeMap, vowelPhonemeMap } from './data/phoneme2wordroot'

function stripIdc(root: string): string {
  const chars = [...root]
  return chars.length === 2 ? chars[1] : root
}

export function getDirectSyllable(pinyin: string): string | null {
  for (const [key, wordroot] of vowelPhonemeMap) {
    if (key.startsWith('-')) {
      if (key.slice(1) === pinyin) {
        return stripIdc(`⿰丨${wordroot}`)
      }
    }
    else if (key === pinyin) {
      return stripIdc(wordroot)
    }
  }

  for (const [phoneme, wordroot] of consonantPhonemeMap) {
    const phonemes = Array.isArray(phoneme) ? phoneme : [phoneme]
    if ((phonemes as readonly string[]).includes(pinyin)) {
      return stripIdc(wordroot)
    }
  }

  return null
}
