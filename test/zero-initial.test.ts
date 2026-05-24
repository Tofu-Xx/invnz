/**
 * 零声母拼音（含 y/w/ü 开头的介音，不含 you）。
 * 全部 34 条，由 scripts/gen-test-data.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinin2invnzChars, pinyin2pinin } from '../src/main'

const DATA: [string, string, string][] = [
  ['a', 'aa', '八'],
  ['o', 'ee', '么'],
  ['e', 'ee', '么'],
  ['ai', 'a', '才'],
  ['ei', 'e', '贝'],
  ['ao', 'ao', '刀'],
  ['ou', 'o', '斗'],
  ['an', 'an', '⿵冂才'],
  ['en', 'en', '⿵冂贝'],
  ['ang', 'ag', '⿹勹才'],
  ['eng', 'eg', '⿹勹贝'],
  ['er', 'er', '耳'],
  ['yi', 'i', '一'],
  ['ya', 'iaa', '⿱一八'],
  ['ye', 'ia', '⿱一才'],
  ['yao', 'iao', '⿱一刀'],
  ['yan', 'ian', '⿱一⿵冂才'],
  ['yin', 'in', '⿱冂一'],
  ['yang', 'iag', '⿱一⿹勹才'],
  ['ying', 'ig', '⿱勹一'],
  ['yong', 'iug', '⿱一⿹勹土'],
  ['wu', 'u', '土'],
  ['wa', 'uaa', '⿱土八'],
  ['wo', 'uee', '⿱土么'],
  ['wai', 'ua', '⿱土才'],
  ['wei', 'ue', '⿱土贝'],
  ['wan', 'uan', '⿱土⿵冂才'],
  ['wen', 'un', '⿵冂土'],
  ['wang', 'uag', '⿱土⿹勹才'],
  ['weng', 'ug', '⿹勹土'],
  ['yu', 'v', '女'],
  ['yue', 'va', '⿱女才'],
  ['yuan', 'van', '⿱女⿵冂才'],
  ['yun', 'vn', '⿵冂女'],
]

describe('零声母', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2pinin(pinyin)).toBe(pinin)
      expect(pinin2invnzChars(pinin)).toBe(invnz)
    },
  )
})
