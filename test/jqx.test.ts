/**
 * j、q、x 声母拼音。注意 jue/que/xue 当前源码暂不输出。
 * 全部 39 条，由 scripts/gen-test-data.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { pinin2invnzChars, pinyin2pinin } from '../src/main'

const DATA: [string, string, string][] = [
  ['ji', 'ji', '⿱久一'],
  ['jia', 'jiaa', '⿱久⿱一八'],
  ['jie', 'jia', '⿱久⿱一才'],
  ['jiao', 'jiao', '⿱久⿱一刀'],
  ['jiu', 'jio', '⿱久⿱一斗'],
  ['jian', 'jian', '⿱久⿱一⿵冂才'],
  ['jin', 'jin', '⿱久⿵冂一'],
  ['jiang', 'jiag', '⿱久⿱一⿹勹才'],
  ['jing', 'jig', '⿱久⿹勹一'],
  ['jiong', 'jiug', '⿱久⿱一⿹勹土'],
  ['ju', 'jv', '⿱久女'],
  ['juan', 'jvan', '⿱久⿱女⿵冂才'],
  ['jun', 'jvn', '⿱久⿵冂女'],
  ['qi', 'qi', '⿱七一'],
  ['qia', 'qiaa', '⿰七⿱一八'],
  ['qie', 'qia', '⿰七⿱一才'],
  ['qiao', 'qiao', '⿰七⿱一刀'],
  ['qiu', 'qio', '⿰七⿱一斗'],
  ['qian', 'qian', '⿰七⿱一⿵冂才'],
  ['qin', 'qin', '⿱七⿵冂一'],
  ['qiang', 'qiag', '⿰七⿱一⿹勹才'],
  ['qing', 'qig', '⿱七⿹勹一'],
  ['qiong', 'qiug', '⿰七⿱一⿹勹土'],
  ['qu', 'qv', '⿰七女'],
  ['quan', 'qvan', '⿰七⿱女⿵冂才'],
  ['qun', 'qvn', '⿰七⿵冂女'],
  ['xi', 'xi', '⿱忄一'],
  ['xia', 'xiaa', '⿰忄⿱一八'],
  ['xie', 'xia', '⿰忄⿱一才'],
  ['xiao', 'xiao', '⿰忄⿱一刀'],
  ['xiu', 'xio', '⿰忄⿱一斗'],
  ['xian', 'xian', '⿰忄⿱一⿵冂才'],
  ['xin', 'xin', '⿱忄⿵冂一'],
  ['xiang', 'xiag', '⿰忄⿱一⿹勹才'],
  ['xing', 'xig', '⿱忄⿹勹一'],
  ['xiong', 'xiug', '⿰忄⿱一⿹勹土'],
  ['xu', 'xv', '⿰忄女'],
  ['xuan', 'xvan', '⿰忄⿱女⿵冂才'],
  ['xun', 'xvn', '⿰忄⿵冂女'],
]

describe('j q x', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2pinin(pinyin)).toBe(pinin)
      expect(pinin2invnzChars(pinin)).toBe(invnz)
    },
  )
})
