/**
 * invnz — 汉语拼音 ↔ 汉字部件转换工具。
 *
 * 本文件是库的入口 barrel，重导出所有 6 个公有函数，
 * 并定义 2 个复合转换函数（组合了底层的两阶段流程）。
 */

import { invn2invnz, invnz2invn } from './invnz-convert'
import { invn2pinyin, pinyin2invn } from './pinyin-convert'

export { invn2invnz, invnz2invn } from './invnz-convert'
export { invn2pinyin, pinyin2invn } from './pinyin-convert'

/**
 * 标准汉语拼音 → 汉字部件字符串。
 *
 * 等价于 `invn2invnz(pinyin2invn(pinyin))`。
 *
 * @param pinyin 标准拼音
 * @returns 汉字部件组合字符串
 */
export function pinyin2invnz(pinyin: string): string {
  return invn2invnz(pinyin2invn(pinyin))
}

/**
 * 汉字部件字符串 → 标准汉语拼音。
 *
 * 等价于 `invn2pinyin(invnz2invn(invnz))`。
 *
 * @param invnz 汉字部件组合字符串
 * @returns 标准汉语拼音
 */
export function invnz2pinyin(invnz: string): string {
  return invn2pinyin(invnz2invn(invnz))
}
