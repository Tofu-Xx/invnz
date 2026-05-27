/**
 * 舌尖/卷舌声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinyin2invnma } from '../src/main'

const DATA: [string, string][] = [
  ['zi', 'z'],
  ['zhi', 'zh'],
  ['ci', 'c'],
  ['chi', 'ch'],
  ['si', 's'],
  ['shi', 'sh'],
  ['ri', 'r'],
]

describe('舌尖/卷舌音（zh ch sh r z c s）', () => {
  it.each(DATA)(
    '%s → %s',
    (pinyin, invnma) => {
      expect(pinyin2invnma(pinyin)).toBe(invnma)
    },
  )
})
