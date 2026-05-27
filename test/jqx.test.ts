/**
 * j、q、x 声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinyin2invnma } from '../src/main'

const DATA: [string, string][] = [
  ['xiong', 'xiong'],
  ['xia', 'xa'],
  ['xian', 'xiean'],
  ['xue', 'xve'],
  ['ju', 'jv'],
  ['ji', 'j'],
]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s',
    (pinyin, invnma) => {
      expect(pinyin2invnma(pinyin)).toBe(invnma)
    },
  )
})
