import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { vowelMap } from '../src/data'
import { invn2invnz, pinyin2invn } from '../src/main'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEST_DIR = path.resolve(__dirname, '../test')

const FINAL_ORDER = vowelMap.map(v => v.pinyin)

const FINAL_COMMENT: Record<string, string> = {
  i: '头',
  u: '头',
  ü: '头',
  ai: '腹',
  ei: '腹',
  ou: '腹',
  a: '腹',
  o: '腹',
  e: '腹',
  ao: '腹',
  er: '腹',
  en: '尾',
  eng: '尾',
  ie: '头腹',
  iu: '头腹',
  ia: '头腹',
  iao: '头腹',
  uai: '头腹',
  ui: '头腹',
  ua: '头腹',
  uo: '头腹',
  üe: '头腹',
  in: '头尾',
  ing: '头尾',
  un: '头尾',
  ong: '头尾',
  ün: '头尾',
  an: '腹尾',
  ang: '腹尾',
  ian: '头腹尾',
  iang: '头腹尾',
  iong: '头腹尾',
  uan: '头腹尾',
  uang: '头腹尾',
  üan: '头腹尾',
}

function sortKey(finalCol: string): number {
  const i = FINAL_ORDER.indexOf(finalCol)
  return i >= 0 ? i : 999
}

const ZERO_INITIAL: Record<string, string> = {
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

const JQX_FINALS = ['i', 'ia', 'ie', 'iao', 'iu', 'ian', 'in', 'iang', 'ing', 'iong', 'ü', 'üe', 'üan', 'ün']

function pinyinFor(initial: string, final: string): string {
  if (initial === 'Ø')
    return ZERO_INITIAL[final]
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
  if (initial === 'Ø')
    group = 'zero'
  else if ('jqx'.includes(initial))
    group = 'jqx'
  else if (['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(initial))
    group = 'zhch'
  else group = 'bpmf'

  try {
    const pinin = pinyin2invn(pinyin)
    const invnz = invn2invnz(pinin)
    all.push({ group, finalCol, pinyin, pinin, invnz })
  }
  catch {
    // skip if error
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
  if (a.group === 'zero' && b.group === 'zero') {
    const cat = (p: string) => p.startsWith('y') ? 0 : p.startsWith('w') ? 1 : 2
    const ca = cat(a.pinyin)
    const cb = cat(b.pinyin)
    if (ca !== cb)
      return ca - cb
  }
  const sk = sortKey(a.finalCol) - sortKey(b.finalCol)
  if (sk !== 0)
    return sk
  const initialOrder: Record<string, number> = {
    Ø: -1,
    b: 0,
    p: 1,
    m: 2,
    f: 3,
    d: 4,
    t: 5,
    n: 6,
    l: 7,
    g: 8,
    k: 9,
    h: 10,
    j: 11,
    q: 12,
    x: 13,
    zh: 14,
    ch: 15,
    sh: 16,
    r: 17,
    z: 18,
    c: 19,
    s: 20,
  }
  const iA = a.pinyin.match(/^(zh|ch|sh|[a-z])/)?.[0] ?? ''
  const iB = b.pinyin.match(/^(zh|ch|sh|[a-z])/)?.[0] ?? ''
  return (initialOrder[iA] ?? 99) - (initialOrder[iB] ?? 99)
})

function writeTestFile(
  entries: Entry[],
  filename: string,
  description: string,
  groupName: string,
  commentStyle: 'y-w-other' | 'final' = 'final',
) {
  const lines: string[] = [
    `/**`,
    ` * ${description}`,
    ` * 由 scripts/gentest.ts 自动生成，勿手动修改。`,
    ` */`,
    '',
    `import { describe, expect, it } from 'vitest'`,
    `import { invn2invnz, invn2pinyin, invnz2invn, invnz2pinyin, pinyin2invn, pinyin2invnz } from '../src/main'`,
    '',
    `const DATA: [string, string, string][] = [`,
  ]

  if (commentStyle === 'y-w-other') {
    let prevCat = ''
    for (const e of entries) {
      const cat = e.pinyin.startsWith('y') ? 'y开头' : e.pinyin.startsWith('w') ? 'w开头' : '其他'
      if (cat !== prevCat) {
        lines.push(`  // ${cat}`)
        prevCat = cat
      }
      lines.push(`  ['${e.pinyin}', '${e.pinin}', '${e.invnz}'],`)
    }
  }
  else {
    let prevFinal = ''
    for (const e of entries) {
      if (e.finalCol !== prevFinal) {
        const tag = FINAL_COMMENT[e.finalCol]
        lines.push(`  // ${e.finalCol}${tag ? ` (${tag})` : ''}`)
        prevFinal = e.finalCol
      }
      lines.push(`  ['${e.pinyin}', '${e.pinin}', '${e.invnz}'],`)
    }
  }

  lines.push(
    ']',
    '',
    `describe('${groupName}', () => {`,
    `  it.each(DATA)(`,
    `    '%s → %s → %s',`,
    `    (_, invn, invnz) => {`,
    `      expect(pinyin2invnz(invnz2pinyin(invnz))).toBe(invn2invnz(invn))`,
    `      expect(pinyin2invn(invn2pinyin(invn))).toBe(invnz2invn(invnz))`,
    `    },`,
    `  )`,
    `})`,
    '',
  )

  fs.writeFileSync(path.join(TEST_DIR, filename), lines.join('\n'))
}

writeTestFile(
  all.filter(e => e.group === 'zero'),
  'zeroinitial.test.ts',
  '零声母拼音（含 y/w/ü 开头的介音）。',
  '零声母',
  'y-w-other',
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
