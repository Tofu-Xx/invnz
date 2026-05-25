/**
 * 注音拼音（invn）↔ 汉字部件字符串（invnz）双向转换。
 *
 * invn2invnz：
 *   将双字母注音拼音解析为声母 + 韵母组件，按汉字结构指示符（IDC）
 *   组合规则生成 invnz 字符串。
 *
 * invnz2invn：
 *   反向解析 invnz 字符串，提取末位部首字符，通过 `ROOT_TO_COMP`
 *   反查表还原为注音拼音。
 */

import { combineComps, IDC } from './combine'
import {
  CONSONANTS,
  READABLE,
  ROOT_TO_COMP,
  VOWEL_BY_INVN,
} from './data/tables'
import { match } from './tools/match'

/**
 * 注音拼音（invn）→ 汉字部件字符串（invnz）。
 *
 * @param invn 双字母注音拼音
 * @returns 汉字部件组合字符串
 */
export function invn2invnz(invn: string): string {
  const cons = match(invn, CONSONANTS, c => c.invn)
  if (cons) {
    const rest = invn.slice(cons.invn.length)
    if (READABLE.has(cons.invn) && rest === '')
      return cons.invnzPart.at(-1)!
    const vowel = VOWEL_BY_INVN.get(rest)
    if (!vowel) {
      const whole = VOWEL_BY_INVN.get(invn)
      if (whole) {
        const comps = whole.invnPart.split('_').filter(Boolean)
        return combineComps(comps, true)
      }
      return cons.invnzPart
    }
    const comps = vowel.invnPart.split('_').filter(Boolean)
    const vInvnz = combineComps(comps, false)
    if (vInvnz.length === 2 && IDC.has(vInvnz[0])) {
      const vIDC = vInvnz[0]
      const vRoot = vInvnz[1]
      if (vIDC === '⿵' || vIDC === '⿹')
        return vIDC + vRoot + cons.invnzPart[1]
      const cIDC = cons.invnzPart[0]
      const cRoot = cons.invnzPart[1]
      if (cIDC === '⿰' && comps.length === 1 && comps[0] === 'i')
        return `⿱${cRoot}${vRoot}`
      return cIDC + cRoot + vRoot
    }
    return cons.invnzPart + vInvnz
  }
  const vowel = VOWEL_BY_INVN.get(invn)
  if (!vowel)
    return ''
  const comps = vowel.invnPart.split('_').filter(Boolean)
  return combineComps(comps, true)
}

/**
 * 汉字部件字符串（invnz）→ 注音拼音（invn）。
 *
 * 通过收集所有非 IDC 的末位部首字符，
 * 利用 `ROOT_TO_COMP` 反查表还原组件，再按「非韵尾在前、韵尾在后」的规则拼接。
 *
 * @param invnz 汉字部件组合字符串
 * @returns 双字母注音拼音
 */
export function invnz2invn(invnz: string): string {
  const roots: string[] = []
  for (const ch of invnz) {
    if (!IDC.has(ch))
      roots.push(ch)
  }
  const comps = roots.map(r => ROOT_TO_COMP.get(r)).filter(Boolean)
  const nonCoda = comps.filter(c => !c!.isCoda).map(c => c!.invn)
  const codas = comps.filter(c => c!.isCoda).map(c => c!.invn)
  return [...nonCoda, ...codas].join('')
}
