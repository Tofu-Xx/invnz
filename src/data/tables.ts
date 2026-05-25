/**
 * 预计算查找表。
 *
 * 在模块加载时从 `ternary.ts` 的原始数据构建所有运行时所需的索引表，
 * 避免每次转换都遍历原始数组。
 */

import { consonantMap, vowelMap } from './ternary'

/** 声母条目 */
export interface Consonant {
  pinyin: string
  invn: string
  invnzPart: string
}

/**
 * 声母表（不含 void 组），按 invn 长度降序排列。
 * 用于 pinyin 和 invn 字符串的最长前缀匹配。
 */
export const CONSONANTS: Consonant[] = []

/** j q x 声母的 invn 集合，用于触发 u→ü 转换 */
export const JQX = new Set<string>()

/** zh ch sh r z c s 声母的 invn 集合，用于处理「可读声母 + i」特例 */
export const READABLE = new Set<string>()

/** 韵母表：pinyin → { invnPart, invnzPart } */
export const VOWEL_BY_PINYIN = new Map<string, { invnPart: string, invnzPart: string }>()

/**
 * 韵母表：去除下划线后的 invn 字符串 → { pinyin, invnPart, invnzPart }。
 * 例如 `'ia' → { pinyin: 'ie', invnPart: 'i_a_', invnzPart: '' }`。
 */
export const VOWEL_BY_INVN = new Map<string, { pinyin: string, invnPart: string, invnzPart: string }>()

/**
 * 韵母组件 → invnzPart 映射。
 * 每个韵母组件是 invnPart 中去掉 `_` 后的一段字符串，
 * 例如 `'i' → '⿱一'`、`'n' → '⿵冂'`。
 */
export const COMP_INVNZ = new Map<string, string>()

/**
 * 末位部首字符 → 组件信息。
 * 用于 `invnz2invn` 逆向解析：给定一个汉字部首，反查到对应的 invn 字符串及其类型。
 */
export const ROOT_TO_COMP = new Map<string, { invn: string, isCoda: boolean, isConsonant: boolean }>()

/* ---- 初始化 ---- */

for (const g of ['ordinary', 'jqx', 'readable'] as const) {
  for (const c of consonantMap[g]) {
    const entry: Consonant = { pinyin: c.pinyin, invn: c.invnPart, invnzPart: c.invnzPart }
    CONSONANTS.push(entry)
    const root = c.invnzPart.at(-1)!
    ROOT_TO_COMP.set(root, { invn: c.invnPart, isCoda: false, isConsonant: true })
  }
}
/* 最长匹配优先 */
CONSONANTS.sort((a, b) => b.invn.length - a.invn.length || b.pinyin.length - a.pinyin.length)

for (const c of consonantMap.jqx) JQX.add(c.invnPart)
for (const c of consonantMap.readable) READABLE.add(c.invnPart)

for (const v of vowelMap) {
  VOWEL_BY_PINYIN.set(v.pinyin, { invnPart: v.invnPart, invnzPart: v.invnzPart })
  const stripped = v.invnPart.replace(/_/g, '')
  VOWEL_BY_INVN.set(stripped, { pinyin: v.pinyin, invnPart: v.invnPart, invnzPart: v.invnzPart })
  const parts = v.invnPart.split('_').filter(Boolean)
  if (parts.length === 1 && v.invnzPart) {
    COMP_INVNZ.set(parts[0], v.invnzPart)
  }
}
for (const [comp, invnz] of COMP_INVNZ) {
  const root = invnz.at(-1)!
  const isCoda = invnz[0] === '⿵' || invnz[0] === '⿹'
  ROOT_TO_COMP.set(root, { invn: comp, isCoda, isConsonant: false })
}
