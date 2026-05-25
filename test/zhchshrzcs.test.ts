/**
 * 舌尖/卷舌声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, invn2pinyin, invnz2invn, invnz2pinyin, pinyin2invn, pinyin2invnz } from '../src/main'

const DATA: [string, string, string][] = [
  // i (头)
  ['zhi', 'zh', '止'],
  ['chi', 'ch', '尺'],
  ['shi', 'sh', '尸'],
  ['ri', 'r', '日'],
  ['zi', 'z', '子'],
  ['ci', 'c', '朿'],
  ['si', 's', '四'],
  // u (头)
  ['zhu', 'zhu', '⿰止土'],
  ['chu', 'chu', '⿱尺土'],
  ['shu', 'shu', '⿸尸土'],
  ['ru', 'ru', '⿰日土'],
  ['zu', 'zu', '⿰子土'],
  ['cu', 'cu', '⿰朿土'],
  ['su', 'su', '⿱四土'],
  // ai (腹)
  ['zhai', 'zha', '⿰止才'],
  ['chai', 'cha', '⿱尺才'],
  ['shai', 'sha', '⿸尸才'],
  ['zai', 'za', '⿰子才'],
  ['cai', 'ca', '⿰朿才'],
  ['sai', 'sa', '⿱四才'],
  // ei (腹)
  ['zhei', 'zhe', '⿰止巿'],
  ['shei', 'she', '⿸尸巿'],
  ['zei', 'ze', '⿰子巿'],
  ['sei', 'se', '⿱四巿'],
  // ou (腹)
  ['zhou', 'zho', '⿰止斗'],
  ['chou', 'cho', '⿱尺斗'],
  ['shou', 'sho', '⿸尸斗'],
  ['rou', 'ro', '⿰日斗'],
  ['zou', 'zo', '⿰子斗'],
  ['cou', 'co', '⿰朿斗'],
  ['sou', 'so', '⿱四斗'],
  // a (腹)
  ['zha', 'zhaa', '⿰止八'],
  ['cha', 'chaa', '⿱尺八'],
  ['sha', 'shaa', '⿸尸八'],
  ['ra', 'raa', '⿰日八'],
  ['za', 'zaa', '⿰子八'],
  ['ca', 'caa', '⿰朿八'],
  ['sa', 'saa', '⿱四八'],
  // e (腹)
  ['zhe', 'zhee', '⿰止戈'],
  ['che', 'chee', '⿱尺戈'],
  ['she', 'shee', '⿸尸戈'],
  ['re', 'ree', '⿰日戈'],
  ['ze', 'zee', '⿰子戈'],
  ['ce', 'cee', '⿰朿戈'],
  ['se', 'see', '⿱四戈'],
  // ao (腹)
  ['zhao', 'zhao', '⿰止刀'],
  ['chao', 'chao', '⿱尺刀'],
  ['shao', 'shao', '⿸尸刀'],
  ['rao', 'rao', '⿰日刀'],
  ['zao', 'zao', '⿰子刀'],
  ['cao', 'cao', '⿰朿刀'],
  ['sao', 'sao', '⿱四刀'],
  // en (尾)
  ['zhen', 'zhn', '⿵冂止'],
  ['chen', 'chn', '⿵冂尺'],
  ['shen', 'shn', '⿵冂尸'],
  ['ren', 'rn', '⿵冂日'],
  ['zen', 'zn', '⿵冂子'],
  ['cen', 'cn', '⿵冂朿'],
  ['sen', 'sn', '⿵冂四'],
  // eng (尾)
  ['zheng', 'zhg', '⿹勹止'],
  ['cheng', 'chg', '⿹勹尺'],
  ['sheng', 'shg', '⿹勹尸'],
  ['reng', 'rg', '⿹勹日'],
  ['zeng', 'zg', '⿹勹子'],
  ['ceng', 'cg', '⿹勹朿'],
  ['seng', 'sg', '⿹勹四'],
  // uai (头腹)
  ['zhuai', 'zhua', '⿰止⿱土才'],
  ['chuai', 'chua', '⿱尺⿱土才'],
  ['shuai', 'shua', '⿸尸⿱土才'],
  // ui (头腹)
  ['zhui', 'zhue', '⿰止⿱土巿'],
  ['chui', 'chue', '⿱尺⿱土巿'],
  ['shui', 'shue', '⿸尸⿱土巿'],
  ['rui', 'rue', '⿰日⿱土巿'],
  ['zui', 'zue', '⿰子⿱土巿'],
  ['cui', 'cue', '⿰朿⿱土巿'],
  ['sui', 'sue', '⿱四⿱土巿'],
  // ua (头腹)
  ['zhua', 'zhuaa', '⿰止⿱土八'],
  ['chua', 'chuaa', '⿱尺⿱土八'],
  ['shua', 'shuaa', '⿸尸⿱土八'],
  ['rua', 'ruaa', '⿰日⿱土八'],
  // uo (头腹)
  ['zhuo', 'zhuoo', '⿰止⿱土乇'],
  ['chuo', 'chuoo', '⿱尺⿱土乇'],
  ['shuo', 'shuoo', '⿸尸⿱土乇'],
  ['ruo', 'ruoo', '⿰日⿱土乇'],
  ['zuo', 'zuoo', '⿰子⿱土乇'],
  ['cuo', 'cuoo', '⿰朿⿱土乇'],
  ['suo', 'suoo', '⿱四⿱土乇'],
  // un (头尾)
  ['zhun', 'zhun', '⿰止⿵冂土'],
  ['chun', 'chun', '⿱尺⿵冂土'],
  ['shun', 'shun', '⿸尸⿵冂土'],
  ['run', 'run', '⿰日⿵冂土'],
  ['zun', 'zun', '⿰子⿵冂土'],
  ['cun', 'cun', '⿰朿⿵冂土'],
  ['sun', 'sun', '⿱四⿵冂土'],
  // ong (头尾)
  ['zhong', 'zhug', '⿰止⿹勹土'],
  ['chong', 'chug', '⿱尺⿹勹土'],
  ['rong', 'rug', '⿰日⿹勹土'],
  ['zong', 'zug', '⿰子⿹勹土'],
  ['cong', 'cug', '⿰朿⿹勹土'],
  ['song', 'sug', '⿱四⿹勹土'],
  // an (腹尾)
  ['zhan', 'zhan', '⿰止⿵冂才'],
  ['chan', 'chan', '⿱尺⿵冂才'],
  ['shan', 'shan', '⿸尸⿵冂才'],
  ['ran', 'ran', '⿰日⿵冂才'],
  ['zan', 'zan', '⿰子⿵冂才'],
  ['can', 'can', '⿰朿⿵冂才'],
  ['san', 'san', '⿱四⿵冂才'],
  // ang (腹尾)
  ['zhang', 'zhag', '⿰止⿹勹才'],
  ['chang', 'chag', '⿱尺⿹勹才'],
  ['shang', 'shag', '⿸尸⿹勹才'],
  ['rang', 'rag', '⿰日⿹勹才'],
  ['zang', 'zag', '⿰子⿹勹才'],
  ['cang', 'cag', '⿰朿⿹勹才'],
  ['sang', 'sag', '⿱四⿹勹才'],
  // uan (头腹尾)
  ['zhuan', 'zhuan', '⿰止⿱土⿵冂才'],
  ['chuan', 'chuan', '⿱尺⿱土⿵冂才'],
  ['shuan', 'shuan', '⿸尸⿱土⿵冂才'],
  ['ruan', 'ruan', '⿰日⿱土⿵冂才'],
  ['zuan', 'zuan', '⿰子⿱土⿵冂才'],
  ['cuan', 'cuan', '⿰朿⿱土⿵冂才'],
  ['suan', 'suan', '⿱四⿱土⿵冂才'],
  // uang (头腹尾)
  ['zhuang', 'zhuag', '⿰止⿱土⿹勹才'],
  ['chuang', 'chuag', '⿱尺⿱土⿹勹才'],
  ['shuang', 'shuag', '⿸尸⿱土⿹勹才'],
]

describe('舌尖/卷舌音（zh ch sh r z c s）', () => {
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
