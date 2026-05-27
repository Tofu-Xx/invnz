/**
 * 零声母拼音（含 y/w/ü 开头的介音）。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinyin2invnma } from '../src/main'

const DATA: [string, string][] = [
  ['a', 'a'],
  ['wo', 'wo'],
  ['yong', 'yong'],
  ['weng', 'ueng'],
  ['er', 'er'],
]

describe('零声母', () => {
  it.each(DATA)(
    '%s → %s',
    (pinyin, invnma) => {
      expect(pinyin2invnma(pinyin)).toBe(invnma)
    },
  )
})
