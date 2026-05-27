import { consonantPhonemeMap, vowelPhonemeMap } from './data/phoneme2wordroot'

const CODA_ROOTS = new Set(['⿵冂', '⿵𰃦', '⿹𠃌', '⿹勹'])

function lookup(phoneme: string): string | null {
  for (const [key, root] of vowelPhonemeMap) {
    if (key === phoneme)
      return root
  }
  for (const [key, root] of vowelPhonemeMap) {
    if (key.startsWith('-') && key.slice(1) === phoneme)
      return root
  }
  for (const [phonemes, root] of consonantPhonemeMap) {
    const pset = Array.isArray(phonemes) ? phonemes : [phonemes]
    if (pset.includes(phoneme))
      return root
  }
  return null
}

function isConsonant(phoneme: string): boolean {
  for (const [phonemes] of consonantPhonemeMap) {
    const pset = Array.isArray(phonemes) ? phonemes : [phonemes]
    if (pset.includes(phoneme))
      return true
  }
  return false
}

function isCoda(root: string): boolean {
  return CODA_ROOTS.has(root)
}

function codaWrap(codaRoot: string, inner: string): string {
  const chars = [...codaRoot]
  return chars[0] + chars.slice(1).join('') + inner
}

/** 韵部组合：韵尾包围前一个音素字根，否则用第一个音素的 IDC */
function combineVowelGroup(roots: string[]): string {
  if (roots.length === 0)
    return ''
  if (roots.length === 1)
    return stripIdc(roots[0])

  const last = roots[roots.length - 1]
  if (isCoda(last)) {
    const inner = combineVowelGroup(roots.slice(0, -1))
    return codaWrap(last, inner)
  }

  const first = roots[0]
  const chars = [...first]
  if (chars.length === 2) {
    const rest = combineVowelGroup(roots.slice(1))
    return chars[0] + chars[1] + rest
  }

  return roots.join('')
}

function consWrap(consRoot: string, inner: string): string {
  const chars = [...consRoot]
  if (chars.length === 2)
    return chars[0] + chars[1] + inner
  return consRoot + inner
}

/** ⿰X一 → ⿱X一 */
function applySection21(s: string): string {
  const chars = [...s]
  if (chars.length === 3 && chars[0] === '⿰' && chars[2] === '一') {
    return `⿱${chars[1]}一`
  }
  return s
}

function stripIdc(root: string): string {
  const chars = [...root]
  return chars.length === 2 ? chars[1] : root
}

/**
 * invenma（`_` 分隔的音素串） → invenz（IDS 字根）。
 */
export function invenma2invenz(invenma: string): string | null {
  const parts = invenma.split('_')

  let cons = ''
  const vowelParts = isConsonant(parts[0])
    ? (cons = parts[0], parts.slice(1))
    : parts

  if (vowelParts.length === 0)
    return null

  const roots = vowelParts.map(p => lookup(p)).filter((r): r is string => r !== null)
  if (roots.length === 0)
    return null

  let result: string

  if (roots.length === 1 && isCoda(roots[0]) && cons) {
    const consRoot = lookup(cons)
    if (!consRoot) return null
    const consChars = [...consRoot]
    if (consChars.length === 2 && consChars[0] === '⿰') {
      result = codaWrap(roots[0], consChars[1])
    } else {
      result = consWrap(consRoot, stripIdc(roots[0]))
    }
  }
  else {
    result = combineVowelGroup(roots)
    if (cons) {
      const consRoot = lookup(cons)
      if (!consRoot) return null
      result = consWrap(consRoot, result)
    }
  }

  result = applySection21(result)
  return stripIdc(result)
}
