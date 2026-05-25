/**
 * 拼音 ↔ 注音拼音（invn）双向转换。
 *
 * pinyin2invn：
 *   标准汉语拼音 → 双字母注音拼音。
 *   处理 jqx 后的 u→ü 音变、可读声母（zh/ch/sh/r/z/c/s）后 i 的省略、
 *   以及零声母音节（y/w/ü）的拼写还原。
 *
 * invn2pinyin：
 *   注音拼音 → 标准汉语拼音。
 *   反向处理上述规则，并对零声母音节施加 y/w/yu 正写法。
 */

import {
  CONSONANTS,
  JQX,
  READABLE,
  VOWEL_BY_INVN,
  VOWEL_BY_PINYIN,
} from './data/tables'
import { TO_UNDERLYING, ZI } from './data/zeroinitial'
import { match } from './tools/match'

/**
 * 标准汉语拼音 → 注音拼音（invn）。
 *
 * @param pinyin 标准拼音字符串（无声调，v 视为 ü）
 * @returns 双字母注音拼音
 */
export function pinyin2invn(pinyin: string): string {
  pinyin = pinyin.replace(/v/g, 'ü')
  const cons = match(pinyin, CONSONANTS, c => c.pinyin)
  if (cons) {
    let rest = pinyin.slice(cons.pinyin.length)
    if (JQX.has(cons.invn) && rest.startsWith('u')) {
      rest = `ü${rest.slice(1)}`
    }
    if (READABLE.has(cons.invn) && rest === 'i')
      return cons.invn
    const vowel = VOWEL_BY_PINYIN.get(rest)
    return cons.invn + (vowel ? vowel.invnPart.replace(/_/g, '') : '')
  }
  let vp = TO_UNDERLYING[pinyin] || pinyin
  if (vp.startsWith('yu'))
    vp = `ü${vp.slice(2)}`
  else if (vp.startsWith('yi'))
    vp = `i${vp.slice(2)}`
  else if (vp.startsWith('y'))
    vp = `i${vp.slice(1)}`
  else if (vp.startsWith('wu'))
    vp = `u${vp.slice(2)}`
  else if (vp.startsWith('w'))
    vp = `u${vp.slice(1)}`
  const vowel = VOWEL_BY_PINYIN.get(vp)
  return vowel ? vowel.invnPart.replace(/_/g, '') : ''
}

/**
 * 注音拼音（invn）→ 标准汉语拼音。
 *
 * @param invn 双字母注音拼音
 * @returns 标准汉语拼音
 */
export function invn2pinyin(invn: string): string {
  const cons = match(invn, CONSONANTS, c => c.invn)
  if (cons) {
    let rest = invn.slice(cons.invn.length)
    if (rest === '' && READABLE.has(cons.invn))
      rest = 'i'
    const vowel = VOWEL_BY_INVN.get(rest)
    if (!vowel) {
      const whole = VOWEL_BY_INVN.get(invn)
      if (whole) {
        const vp = whole.pinyin
        return ZI[vp] || vp
      }
      return cons.pinyin
    }
    let vp = vowel.pinyin
    if (JQX.has(cons.invn) && vp.startsWith('ü'))
      vp = `u${vp.slice(1)}`
    return cons.pinyin + vp
  }
  const vowel = VOWEL_BY_INVN.get(invn)
  if (!vowel)
    return ''
  const vp = vowel.pinyin
  return ZI[vp] || vp
}
