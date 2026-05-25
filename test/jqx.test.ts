/**
 * j、q、x 声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, invn2pinyin, invnz2invn, invnz2pinyin, pinyin2invn, pinyin2invnz } from '../src/main'

const DATA: [string, string, string][] = [
  // i (头)
  ['ji', 'ji', '⿱己一'],
  ['qi', 'qi', '⿱七一'],
  ['xi', 'xi', '⿱夕一'],
  // ü (头)
  ['ju', 'jv', '⿰己女'],
  ['qu', 'qv', '⿰七女'],
  ['xu', 'xv', '⿰夕女'],
  // ie (头腹)
  ['jie', 'jia', '⿰己⿱一才'],
  ['qie', 'qia', '⿰七⿱一才'],
  ['xie', 'xia', '⿰夕⿱一才'],
  // iu (头腹)
  ['jiu', 'jio', '⿰己⿱一斗'],
  ['qiu', 'qio', '⿰七⿱一斗'],
  ['xiu', 'xio', '⿰夕⿱一斗'],
  // ia (头腹)
  ['jia', 'jiaa', '⿰己⿱一八'],
  ['qia', 'qiaa', '⿰七⿱一八'],
  ['xia', 'xiaa', '⿰夕⿱一八'],
  // iao (头腹)
  ['jiao', 'jiao', '⿰己⿱一刀'],
  ['qiao', 'qiao', '⿰七⿱一刀'],
  ['xiao', 'xiao', '⿰夕⿱一刀'],
  // üe (头腹)
  ['jue', 'jva', '⿰己⿱女才'],
  ['que', 'qva', '⿰七⿱女才'],
  ['xue', 'xva', '⿰夕⿱女才'],
  // in (头尾)
  ['jin', 'jin', '⿰己⿵冂一'],
  ['qin', 'qin', '⿰七⿵冂一'],
  ['xin', 'xin', '⿰夕⿵冂一'],
  // ing (头尾)
  ['jing', 'jig', '⿰己⿹勹一'],
  ['qing', 'qig', '⿰七⿹勹一'],
  ['xing', 'xig', '⿰夕⿹勹一'],
  // ün (头尾)
  ['jun', 'jvn', '⿰己⿵冂女'],
  ['qun', 'qvn', '⿰七⿵冂女'],
  ['xun', 'xvn', '⿰夕⿵冂女'],
  // ian (头腹尾)
  ['jian', 'jian', '⿰己⿱一⿵冂才'],
  ['qian', 'qian', '⿰七⿱一⿵冂才'],
  ['xian', 'xian', '⿰夕⿱一⿵冂才'],
  // iang (头腹尾)
  ['jiang', 'jiag', '⿰己⿱一⿹勹才'],
  ['qiang', 'qiag', '⿰七⿱一⿹勹才'],
  ['xiang', 'xiag', '⿰夕⿱一⿹勹才'],
  // iong (头腹尾)
  ['jiong', 'jiug', '⿰己⿱一⿹勹土'],
  ['qiong', 'qiug', '⿰七⿱一⿹勹土'],
  ['xiong', 'xiug', '⿰夕⿱一⿹勹土'],
  // üan (头腹尾)
  ['juan', 'jvan', '⿰己⿱女⿵冂才'],
  ['quan', 'qvan', '⿰七⿱女⿵冂才'],
  ['xuan', 'xvan', '⿰夕⿱女⿵冂才'],
]

describe('j q x', () => {
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
