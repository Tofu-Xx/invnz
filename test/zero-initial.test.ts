/**
 * 零声母拼音（含 y/w/ü 开头的介音）。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, pinyin2invn } from '../src/main'

const DATA: [string, string, string][] = [
  // y开头
  ['yi', 'i', '一'],
  ['yu', 'v', '女'],
  ['ye', 'ia', '⿱一才'],
  ['you', 'io', '⿱一斗'],
  ['ya', 'iaa', '⿱一八'],
  ['yao', 'iao', '⿱一刀'],
  ['yue', 'va', '⿱女才'],
  ['yin', 'in', '⿱冂一'],
  ['ying', 'ig', '⿱勹一'],
  ['yun', 'vn', '⿵冂女'],
  ['yan', 'ian', '⿱一⿵冂才'],
  ['yang', 'iag', '⿱一⿹勹才'],
  ['yong', 'iug', '⿱一⿹勹土'],
  ['yuan', 'van', '⿱女⿵冂才'],
  // w开头
  ['wu', 'u', '土'],
  ['wai', 'ua', '⿱土才'],
  ['wei', 'ue', '⿱土贝'],
  ['wa', 'uaa', '⿱土八'],
  ['wo', 'uoo', '⿱土乇'],
  ['wen', 'un', '⿵冂土'],
  ['weng', 'ug', '⿹勹土'],
  ['wan', 'uan', '⿱土⿵冂才'],
  ['wang', 'uag', '⿱土⿹勹才'],
  // 其他
  ['ai', 'a', '才'],
  ['ei', 'e', '贝'],
  ['ou', 'o', '斗'],
  ['a', 'aa', '八'],
  ['o', 'oo', '乇'],
  ['e', 'ee', '么'],
  ['ao', 'ao', '刀'],
  ['er', 'er', '耳'],
  ['en', 'n', '冂'],
  ['eng', 'g', '勹'],
  ['an', 'an', '⿵冂才'],
  ['ang', 'ag', '⿹勹才'],
]

describe('零声母', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2invn(pinyin)).toBe(pinin)
      expect(invn2invnz(pinin)).toBe(invnz)
    },
  )
})
