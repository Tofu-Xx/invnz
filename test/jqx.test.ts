/**
 * j、q、x 声母拼音。
 *
 * 特殊规则：
 *   pinin 阶段 j/q/x 后的 i 被省略（如 ji → j, jia → jaa）
 *   j/q/x 后的 u 转为 ü（如 ju → jv, jun → jvn）
 *
 * 全部 42 条。由 scripts/gen-test-data.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinin2invnzChars, pinyin2pinin } from '../src/main'

const DATA: [string, string, string][] = [
  // ── j ──
  ['ji', 'j', '久'],
  ['jia', 'jaa', '⿱久八'],
  ['jie', 'ja', '⿱久才'],
  ['jiao', 'jao', '⿱久刀'],
  ['jiu', 'jo', '⿱久斗'],
  ['jian', 'jan', '⿱久⿵冂才'],
  ['jin', 'jn', '⿵冂久'],
  ['jiang', 'jag', '⿱久⿹勹才'],
  ['jing', 'jg', '⿹勹久'],
  ['jiong', 'jug', '⿱久⿹勹土'],
  ['ju', 'jv', '⿱久女'],
  ['jue', 'jva', '⿱久⿱女才'],
  ['juan', 'jvan', '⿱久⿱女⿵冂才'],
  ['jun', 'jvn', '⿱久⿵冂女'],

  // ── q ──
  ['qi', 'q', '七'],
  ['qia', 'qaa', '⿰七八'],
  ['qie', 'qa', '⿰七才'],
  ['qiao', 'qao', '⿰七刀'],
  ['qiu', 'qo', '⿰七斗'],
  ['qian', 'qan', '⿰七⿵冂才'],
  ['qin', 'qn', '⿵冂七'],
  ['qiang', 'qag', '⿰七⿹勹才'],
  ['qing', 'qg', '⿹勹七'],
  ['qiong', 'qug', '⿰七⿹勹土'],
  ['qu', 'qv', '⿰七女'],
  ['que', 'qva', '⿰七⿱女才'],
  ['quan', 'qvan', '⿰七⿱女⿵冂才'],
  ['qun', 'qvn', '⿰七⿵冂女'],

  // ── x ──
  ['xi', 'x', '忄'],
  ['xia', 'xaa', '⿰忄八'],
  ['xie', 'xa', '⿰忄才'],
  ['xiao', 'xao', '⿰忄刀'],
  ['xiu', 'xo', '⿰忄斗'],
  ['xian', 'xan', '⿰忄⿵冂才'],
  ['xin', 'xn', '⿵冂忄'],
  ['xiang', 'xag', '⿰忄⿹勹才'],
  ['xing', 'xg', '⿹勹忄'],
  ['xiong', 'xug', '⿰忄⿹勹土'],
  ['xu', 'xv', '⿰忄女'],
  ['xue', 'xva', '⿰忄⿱女才'],
  ['xuan', 'xvan', '⿰忄⿱女⿵冂才'],
  ['xun', 'xvn', '⿰忄⿵冂女'],
]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2pinin(pinyin)).toBe(pinin)
      expect(pinin2invnzChars(pinin)).toBe(invnz)
    },
  )
})
