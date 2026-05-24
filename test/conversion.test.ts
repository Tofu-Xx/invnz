/**
 * 代表性转化预期结果对照测试
 *
 * 针对 README 拼音音节表中各声母、韵母类型选取代表用例，
 * 分别验证 pinyin2pinin 和 pinin2invnzChars 的中间及最终输出。
 */

import { describe, it, expect } from 'vitest'
import { pinyin2pinin, pinin2invnzChars } from '../src/main'

/**
 * [input, expectedPinin, expectedInvnz]
 *
 * 覆盖场景：
 * - 零声母（含 y/w 开头的 i/u/ü 介音）
 * - 各声母组（b/p/m/f, d/t/n/l, g/k/h, j/q/x, zh/ch/sh/r, z/c/s）
 * - 韵母带 n/g 结尾（an/ang/en/eng/in/ing/ong/un/ün 等）
 * - j/q/x 的 i 介音省略规则
 * - ü 韵母
 * - er 特殊韵母
 */
const CONVERSIONS: [string, string, string][] = [
  // ── 零声母 ──
  ['a',     'aa',   '八'],
  ['er',    'er',   '耳'],
  ['yi',    'i',    '一'],
  ['wu',    'u',    '土'],
  ['yu',    'v',    '女'],
  ['yü',    'v',    '女'],
  ['yv',    'v',    '女'],
  ['yue',   'va',   '⿱女才'],
  ['weng',  'ug',   '⿹勹土'],

  // ── b/p/m/f ──
  ['ba',    'baa',  '⿰匕八'],
  ['ma',    'maa',  '⿰木八'],
  ['fo',    'fee',  '⿰方么'],
  ['fu',    'fu',   '⿰方土'],

  // ── d/t/n/l ──
  ['ni',    'ni',   '⿱牛一'],
  ['tian',  'tian', '⿰田⿱一⿵冂才'],

  // ── zh/ch/sh/r ──
  ['shi',   'shi',  '⿱山一'],
  ['zhong', 'zhug', '⿰止⿹勹土'],

  // ── j/q/x（含 u→ü 统一为 v）──
  ['ju',    'jv',   '⿱久女'],
  ['juan',  'jvan', '⿱久⿱女⿵冂才'],
  ['qu',    'qv',   '⿰七女'],
  ['xia',   'xiaa', '⿰忄⿱一八'],
  ['xu',    'xv',   '⿰忄女'],
  ['xü',    'xv',   '⿰忄女'],
  ['xv',    'xv',   '⿰忄女'],
  ['xue',   'xva',  '⿰忄⿱女才'],
  ['xun',   'xvn',  '⿰忄⿵冂女'],

  // ── 复韵母 + n/g 结尾 ──
  ['bin',   'bin',  '⿱匕⿵冂一'],
  ['dong',  'dug',  '⿰丁⿹勹土'],
  ['liang', 'liag', '⿰立⿱一⿹勹才'],

  // ── ü 韵母 ──
  ['nü',    'nv',   '⿰牛女'],
  ['lüe',   'lva',  '⿰立⿱女才'],
  ['yun',   'vn',   '⿵冂女'],
]

describe('代表性转化结果对照', () => {
  it.each(CONVERSIONS)(
    'pinyin2pinin("%s") → "%s" 且 pinin2invnzChars → "%s"',
    (input, expectedPinin, expectedInvnz) => {
      const pinin = pinyin2pinin(input)
      expect(pinin).toBe(expectedPinin)
      const invnz = pinin2invnzChars(pinin)
      expect(invnz).toBe(expectedInvnz)
    },
  )
})
