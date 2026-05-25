/**
 * 韵母组件 → invnz 组合逻辑。
 *
 * 将按 (韵头/韵腹/韵尾) 顺序排列的组件列表组合为一个 invnz 字符串。
 * 核心规则：
 *   - 韵尾（_n / _g）会包裹其前一个组件（韵腹或韵头），在 invnz 中出现在韵腹之前
 *   - 韵头（i / u / v）通常以 ⿱ 开头，包裹剩余部分
 */

import { COMP_INVNZ } from './data/tables'

/** 汉字结构指示符集合：⿰(左右) ⿱(上下) ⿸(左上包围) ⿹(右上包围) ⿵(上包围) */
export const IDC = new Set(['⿰', '⿱', '⿸', '⿹', '⿵'])

/**
 * 将韵母组件列表组合为 invnz 字符串。
 *
 * @param comps       组件名称数组（如 `['i', 'a', 'n']`），按韵头→韵腹→韵尾顺序
 * @param isZeroInit  是否零声母（影响单组件的输出样式及韵头 i 的特殊处理）
 * @returns 组合后的 invnz 字符串
 */
export function combineComps(comps: string[], isZeroInit: boolean): string {
  const n = comps.length
  if (n === 0)
    return ''
  if (n === 1) {
    const invnz = COMP_INVNZ.get(comps[0]) || ''
    return isZeroInit ? invnz[1] || '' : invnz
  }
  const last = comps[n - 1]
  const isCoda = COMP_INVNZ.get(last)?.[0] === '⿵' || COMP_INVNZ.get(last)?.[0] === '⿹'
  if (!isCoda) {
    const f = COMP_INVNZ.get(comps[0]) || ''
    const s = COMP_INVNZ.get(comps[1]) || ''
    return f[0] + f[1] + s[1]
  }
  const tail = COMP_INVNZ.get(last) || ''
  if (n === 2) {
    const first = COMP_INVNZ.get(comps[0]) || ''
    if (isZeroInit && comps[0] === 'i')
      return `⿱${tail[1]}${first[1]}`
    return tail[0] + tail[1] + first[1]
  }
  const head = COMP_INVNZ.get(comps[0]) || ''
  const nuc = COMP_INVNZ.get(comps[1]) || ''
  const wrapped = tail[0] + tail[1] + nuc[1]
  return head[0] + head[1] + wrapped
}
