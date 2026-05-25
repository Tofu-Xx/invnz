/**
 * j、q、x 声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, invn2pinyin, invnz2invn, invnz2pinyin, pinyin2invn, pinyin2invnz } from '../src/main'

const DATA: [string, string, string][] = [
  // i (头)
  ['ji', 'ji', '⿱久一'],
  ['qi', 'qi', '⿱七一'],
  ['xi', 'xi', '⿱忄一'],
  // ü (头)
  ['ju', 'jv', '⿱久女'],
  ['qu', 'qv', '⿰七女'],
  ['xu', 'xv', '⿰忄女'],
  // ie (头腹)
  ['jie', 'jia', '⿱久⿱一才'],
  ['qie', 'qia', '⿰七⿱一才'],
  ['xie', 'xia', '⿰忄⿱一才'],
  // iu (头腹)
  ['jiu', 'jio', '⿱久⿱一斗'],
  ['qiu', 'qio', '⿰七⿱一斗'],
  ['xiu', 'xio', '⿰忄⿱一斗'],
  // ia (头腹)
  ['jia', 'jiaa', '⿱久⿱一八'],
  ['qia', 'qiaa', '⿰七⿱一八'],
  ['xia', 'xiaa', '⿰忄⿱一八'],
  // iao (头腹)
  ['jiao', 'jiao', '⿱久⿱一刀'],
  ['qiao', 'qiao', '⿰七⿱一刀'],
  ['xiao', 'xiao', '⿰忄⿱一刀'],
  // üe (头腹)
  ['jue', 'jva', '⿱久⿱女才'],
  ['que', 'qva', '⿰七⿱女才'],
  ['xue', 'xva', '⿰忄⿱女才'],
  // in (头尾)
  ['jin', 'jin', '⿱久⿵冂一'],
  ['qin', 'qin', '⿰七⿵冂一'],
  ['xin', 'xin', '⿰忄⿵冂一'],
  // ing (头尾)
  ['jing', 'jig', '⿱久⿹勹一'],
  ['qing', 'qig', '⿰七⿹勹一'],
  ['xing', 'xig', '⿰忄⿹勹一'],
  // ün (头尾)
  ['jun', 'jvn', '⿱久⿵冂女'],
  ['qun', 'qvn', '⿰七⿵冂女'],
  ['xun', 'xvn', '⿰忄⿵冂女'],
  // ian (头腹尾)
  ['jian', 'jian', '⿱久⿱一⿵冂才'],
  ['qian', 'qian', '⿰七⿱一⿵冂才'],
  ['xian', 'xian', '⿰忄⿱一⿵冂才'],
  // iang (头腹尾)
  ['jiang', 'jiag', '⿱久⿱一⿹勹才'],
  ['qiang', 'qiag', '⿰七⿱一⿹勹才'],
  ['xiang', 'xiag', '⿰忄⿱一⿹勹才'],
  // iong (头腹尾)
  ['jiong', 'jiug', '⿱久⿱一⿹勹土'],
  ['qiong', 'qiug', '⿰七⿱一⿹勹土'],
  ['xiong', 'xiug', '⿰忄⿱一⿹勹土'],
  // üan (头腹尾)
  ['juan', 'jvan', '⿱久⿱女⿵冂才'],
  ['quan', 'qvan', '⿰七⿱女⿵冂才'],
  ['xuan', 'xvan', '⿰忄⿱女⿵冂才'],
]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (_, invn, invnz) => {
      expect(pinyin2invnz(invnz2pinyin(invnz))).toBe(invn2invnz(invn))
      expect(pinyin2invn(invn2pinyin(invn))).toBe(invnz2invn(invnz))
    },
  )
})
