/**
 * j、q、x 声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invnma2invnz, pinyin2invnma } from '../src/main'

const DATA: [string, string, string][] = [

]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, invnma, invnz) => {
      expect(pinyin2invnma(pinyin)).toBe(invnma)
      expect(invnma2invnz(invnma)).toBe(invnz)
    },
  )
})
