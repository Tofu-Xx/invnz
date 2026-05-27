/**
 * 普通声母拼音，不含 jqx 和 zh/ch/sh/r/z/c/s。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinyin2invnma } from '../src/main'

const DATA: [string, string][] = [
  ['ba', 'ba'],
  ['ban', 'ban'],
  ['bian', 'biean'],
  ['ti', 'ti'],
  ['tian', 'tiean'],
  ['guan', 'guan'],
  ['huo', 'huo'],
  ['po', 'puo'],
  ['hong', 'hong'],
]

describe('普通声母（b p m f d t n l g k h）', () => {
  it.each(DATA)(
    '%s → %s',
    (pinyin, invnma) => {
      expect(pinyin2invnma(pinyin)).toBe(invnma)
    },
  )
})
