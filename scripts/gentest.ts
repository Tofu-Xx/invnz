import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pinyin2pinin, pinin2invnzChars } from '../src/main'
import { finalMap } from '../src/data'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEST_DIR = path.resolve(__dirname, '../test')

const FINAL_ORDER = Object.keys(finalMap)

function sortKey(finalCol: string): number {
  const i = FINAL_ORDER.indexOf(finalCol)
  return i >= 0 ? i : 999
}

const ZERO_INITIAL: Record<string, string> = {
  a: 'a', o: 'o', e: 'e', ai: 'ai', ei: 'ei', ao: 'ao', ou: 'ou',
  an: 'an', en: 'en', ang: 'ang', eng: 'eng', er: 'er',
  i: 'yi', ia: 'ya', ie: 'ye', iao: 'yao', iu: 'you',
  ian: 'yan', in: 'yin', iang: 'yang', ing: 'ying', iong: 'yong',
  u: 'wu', ua: 'wa', uo: 'wo', uai: 'wai', ui: 'wei',
  uan: 'wan', un: 'wen', uang: 'wang', ong: 'weng',
  ü: 'yu', üe: 'yue', üan: 'yuan', ün: 'yun',
}

const JQX_FINALS = ['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'ü', 'üe', 'üan', 'ün']

function pinyinFor(initial: string, final: string): string {
  if (initial === 'Ø') return ZERO_INITIAL[final]
  const p = initial + final
  if ('jqx'.includes(initial) && final.startsWith('ü')) {
    return initial + final.replace('ü', 'u')
  }
  return p
}

interface Entry {
  group: 'zero' | 'bpmf' | 'jqx' | 'zhch'
  finalCol: string
  pinyin: string
  pinin: string
  invnz: string
}

const all: Entry[] = []

function add(initial: string, finalCol: string, pinyin: string) {
  let group: Entry['group']
  if (initial === 'Ø') group = 'zero'
  else if ('jqx'.includes(initial)) group = 'jqx'
  else if (['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(initial)) group = 'zhch'
  else group = 'bpmf'

  try {
    const pinin = pinyin2pinin(pinyin)
    const invnz = pinin2invnzChars(pinin)
    all.push({ group, finalCol, pinyin, pinin, invnz })
  }
  catch {
    // skip if error
  }

  if (initial === 'n' && finalCol.startsWith('ü')) {
    const vPy = pinyin.replace('ü', 'v')
    try {
      const pinin = pinyin2pinin(vPy)
      const invnz = pinin2invnzChars(pinin)
      all.push({ group, finalCol, pinyin: vPy, pinin, invnz })
    }
    catch { /* skip */ }
  }

  if (initial === 'l' && finalCol.startsWith('ü')) {
    const vPy = pinyin.replace('ü', 'v')
    try {
      const pinin = pinyin2pinin(vPy)
      const invnz = pinin2invnzChars(pinin)
      all.push({ group, finalCol, pinyin: vPy, pinin, invnz })
    }
    catch { /* skip */ }
  }
}

// ----- Zero initial -----
const zeroFinals = Object.keys(ZERO_INITIAL)
for (const f of zeroFinals) {
  add('Ø', f, ZERO_INITIAL[f])
}

// ----- Initial + final combinations -----
const initials: Record<string, string[]> = {
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

for (const [initial, finals] of Object.entries(initials)) {
  for (const f of finals) {
    add(initial, f, pinyinFor(initial, f))
  }
}

all.sort((a, b) => {
  if (a.group !== b.group) {
    const gOrder: Record<string, number> = { zero: 0, bpmf: 1, jqx: 2, zhch: 3 }
    return gOrder[a.group] - gOrder[b.group]
  }
  const sk = sortKey(a.finalCol) - sortKey(b.finalCol)
  if (sk !== 0) return sk
  const initialOrder: Record<string, number> = {
    Ø: -1, b: 0, p: 1, m: 2, f: 3, d: 4, t: 5, n: 6, l: 7,
    g: 8, k: 9, h: 10, j: 11, q: 12, x: 13,
    zh: 14, ch: 15, sh: 16, r: 17, z: 18, c: 19, s: 20,
  }
  const iA = a.pinyin.match(/^(zh|ch|sh|[a-z])/)?.[0] ?? ''
  const iB = b.pinyin.match(/^(zh|ch|sh|[a-z])/)?.[0] ?? ''
  return (initialOrder[iA] ?? 99) - (initialOrder[iB] ?? 99)
})

function getInitial(pinyin: string): string {
  if (/^(zh|ch|sh)/.test(pinyin)) return pinyin.slice(0, 2)
  if (/^[a-z]/.test(pinyin)) return pinyin[0]
  return ''
}

function isZeroInitial(e: Entry): boolean {
  const p = e.pinyin
  const finalsWithoutYw = ['a','o','e','ai','ei','ao','ou','an','en','ang','eng','er']
  if (finalsWithoutYw.includes(p)) return true
  if (/^y[aeio]/.test(p) || /^w[aeiou]/.test(p)) return true
  if (['yi','wu','yu','yue','yuan','yun'].includes(p)) return true
  if (p.startsWith('y') || p.startsWith('w')) return true
  if (p.includes('ü')) return true
  return false
}

function writeTestFile(
  entries: Entry[],
  filename: string,
  description: string,
  groupName: string,
) {
  const lines: string[] = [
    `/**`,
    ` * ${description}`,
    ` * 由 scripts/gentest.ts 自动生成，勿手动修改。`,
    ` */`,
    '',
    `import { describe, expect, it } from 'vitest'`,
    `import { pinin2invnzChars, pinyin2pinin } from '../src/main'`,
    '',
    `const DATA: [string, string, string][] = [`,
  ]

  for (const e of entries) {
    lines.push(`  ['${e.pinyin}', '${e.pinin}', '${e.invnz}'],`)
  }

  lines.push(
    ']',
    '',
    `describe('${groupName}', () => {`,
    `  it.each(DATA)(`,
    `    '%s → %s → %s',`,
    `    (pinyin, pinin, invnz) => {`,
    `      expect(pinyin2pinin(pinyin)).toBe(pinin)`,
    `      expect(pinin2invnzChars(pinin)).toBe(invnz)`,
    `    },`,
    `  )`,
    `})`,
    '',
  )

  fs.writeFileSync(path.join(TEST_DIR, filename), lines.join('\n'))
}

writeTestFile(
  all.filter(e => e.group === 'zero'),
  'zero-initial.test.ts',
  '零声母拼音（含 y/w/ü 开头的介音）。',
  '零声母',
)

writeTestFile(
  all.filter(e => e.group === 'bpmf'),
  'bpmfdtnlgkh.test.ts',
  '普通声母拼音，不含 jqx 和 zh/ch/sh/r/z/c/s。',
  '普通声母（b p m f d t n l g k h）',
)

writeTestFile(
  all.filter(e => e.group === 'jqx'),
  'jqx.test.ts',
  'j、q、x 声母拼音。',
  'j q x',
)

writeTestFile(
  all.filter(e => e.group === 'zhch'),
  'zhchshrzcs.test.ts',
  '舌尖/卷舌声母拼音。',
  '舌尖/卷舌音（zh ch sh r z c s）',
)

console.log('Done! 4 test files generated.')
