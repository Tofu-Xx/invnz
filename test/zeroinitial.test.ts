/**
 * 零声母拼音（含 y/w/ü 开头的介音）。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, invn2pinyin, invnz2invn, invnz2pinyin, pinyin2invn, pinyin2invnz } from '../src/main'

const DATA: [string, string, string][] = [
  // 重复
  ['yi', 'i', '一'],
  ['ye', 'ia', '⿱一才'],
  ['you', 'io', '⿱一斗'],
  ['ya', 'iaa', '⿱一八'],
  ['yao', 'iao', '⿱一刀'],
  ['yin', 'in', '⿱冂一'],
  ['ying', 'ig', '⿱勹一'],
  ['yan', 'ian', '⿱一⿵冂才'],
  ['yang', 'iag', '⿱一⿹勹才'],
  ['yong', 'iug', '⿱一⿹勹土'],
  ['wu', 'u', '土'],
  // 冗余
  ['yu', 'v', '女'],
  ['yue', 'va', '⿱女才'],
  ['yun', 'vn', '⿵冂女'],
  ['yuan', 'van', '⿱女⿵冂才'],
  ['wai', 'ua', '⿱土才'],
  ['wei', 'ue', '⿱土巿'],
  ['wa', 'uaa', '⿱土八'],
  ['wo', 'uoo', '⿱土乇'],
  ['wen', 'un', '⿵冂土'],
  ['wan', 'uan', '⿱土⿵冂才'],
  ['wang', 'uag', '⿱土⿹勹才'],
  // 整体
  ['ai', 'a', '才'],
  ['ei', 'e', '巿'],
  ['ou', 'o', '斗'],
  ['a', 'aa', '八'],
  ['o', 'oo', '乇'],
  ['e', 'ee', '戈'],
  ['ao', 'ao', '刀'],
  ['er', 'er', '耳'],
  ['en', 'n', '冂'],
  ['eng', 'g', '勹'],
  // 组合
  ['ong', 'ug', '⿹勹土'],
  ['an', 'an', '⿵冂才'],
  ['ang', 'ag', '⿹勹才'],
]

describe('零声母', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, invn, invnz) => {
      expect(invnz2pinyin(invnz)).toBe(pinyin)
      expect(pinyin2invnz(pinyin)).toBe(invnz)
      expect(invn2pinyin(invn)).toBe(pinyin)
      expect(pinyin2invn(pinyin)).toBe(invn)
      expect(invn2invnz(invn)).toBe(invnz)
      expect(invnz2invn(invnz)).toBe(invn)
    },
  )
})
