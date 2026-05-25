/**
 * j、q、x 声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, pinyin2invn } from '../src/main'

const DATA: [string, string, string][] = [
  // i (前)
  ['ji', 'ji', '⿱久一'],
  ['qi', 'qi', '⿱七一'],
  ['xi', 'xi', '⿱忄一'],
  // ü (前)
  ['ju', 'jv', '⿱久女'],
  ['qu', 'qv', '⿰七女'],
  ['xu', 'xv', '⿰忄女'],
  // ie (前本)
  ['jie', 'jia', '⿱久⿱一才'],
  ['qie', 'qia', '⿰七⿱一才'],
  ['xie', 'xia', '⿰忄⿱一才'],
  // iu (前本)
  ['jiu', 'jio', '⿱久⿱一斗'],
  ['qiu', 'qio', '⿰七⿱一斗'],
  ['xiu', 'xio', '⿰忄⿱一斗'],
  // ia (前本)
  ['jia', 'jiaa', '⿱久⿱一八'],
  ['qia', 'qiaa', '⿰七⿱一八'],
  ['xia', 'xiaa', '⿰忄⿱一八'],
  // iao (前本)
  ['jiao', 'jiao', '⿱久⿱一刀'],
  ['qiao', 'qiao', '⿰七⿱一刀'],
  ['xiao', 'xiao', '⿰忄⿱一刀'],
  // üe (前本)
  ['jue', 'jva', '⿱久⿱女才'],
  ['que', 'qva', '⿰七⿱女才'],
  ['xue', 'xva', '⿰忄⿱女才'],
  // in (前尾)
  ['jin', 'jin', '⿱久⿵冂一'],
  ['qin', 'qin', '⿰七⿵冂一'],
  ['xin', 'xin', '⿰忄⿵冂一'],
  // ing (前尾)
  ['jing', 'jig', '⿱久⿹勹一'],
  ['qing', 'qig', '⿰七⿹勹一'],
  ['xing', 'xig', '⿰忄⿹勹一'],
  // ün (前尾)
  ['jun', 'jvn', '⿱久⿵冂女'],
  ['qun', 'qvn', '⿰七⿵冂女'],
  ['xun', 'xvn', '⿰忄⿵冂女'],
  // ian (前本尾)
  ['jian', 'jian', '⿱久⿱一⿵冂才'],
  ['qian', 'qian', '⿰七⿱一⿵冂才'],
  ['xian', 'xian', '⿰忄⿱一⿵冂才'],
  // iang (前本尾)
  ['jiang', 'jiag', '⿱久⿱一⿹勹才'],
  ['qiang', 'qiag', '⿰七⿱一⿹勹才'],
  ['xiang', 'xiag', '⿰忄⿱一⿹勹才'],
  // iong (前本尾)
  ['jiong', 'jiug', '⿱久⿱一⿹勹土'],
  ['qiong', 'qiug', '⿰七⿱一⿹勹土'],
  ['xiong', 'xiug', '⿰忄⿱一⿹勹土'],
  // üan (前本尾)
  ['juan', 'jvan', '⿱久⿱女⿵冂才'],
  ['quan', 'qvan', '⿰七⿱女⿵冂才'],
  ['xuan', 'xvan', '⿰忄⿱女⿵冂才'],
]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2invn(pinyin)).toBe(pinin)
      expect(invn2invnz(pinin)).toBe(invnz)
    },
  )
})
