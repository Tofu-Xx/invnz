/**
 * 舌尖/卷舌声母拼音。
 * 由 scripts/gentest.ts 自动生成，勿手动修改。
 */

import { describe, expect, it } from 'vitest'
import { invn2invnz, pinyin2invn } from '../src/main'

const DATA: [string, string, string][] = [
  // i (前)
  ['zhi', 'zh', '止'],
  ['chi', 'ch', '厂'],
  ['shi', 'sh', '山'],
  ['ri', 'r', '日'],
  ['zi', 'z', '子'],
  ['ci', 'c', '艹'],
  ['si', 's', '纟'],
  // u (前)
  ['zhu', 'zhu', '⿰止土'],
  ['chu', 'chu', '⿸厂土'],
  ['shu', 'shu', '⿰山土'],
  ['ru', 'ru', '⿰日土'],
  ['zu', 'zu', '⿰子土'],
  ['cu', 'cu', '⿱艹土'],
  ['su', 'su', '⿰纟土'],
  // ai (本)
  ['zhai', 'zha', '⿰止才'],
  ['chai', 'cha', '⿸厂才'],
  ['shai', 'sha', '⿰山才'],
  ['zai', 'za', '⿰子才'],
  ['cai', 'ca', '⿱艹才'],
  ['sai', 'sa', '⿰纟才'],
  // ei (本)
  ['zhei', 'zhe', '⿰止贝'],
  ['shei', 'she', '⿰山贝'],
  ['zei', 'ze', '⿰子贝'],
  ['sei', 'se', '⿰纟贝'],
  // ou (本)
  ['zhou', 'zho', '⿰止斗'],
  ['chou', 'cho', '⿸厂斗'],
  ['shou', 'sho', '⿰山斗'],
  ['rou', 'ro', '⿰日斗'],
  ['zou', 'zo', '⿰子斗'],
  ['cou', 'co', '⿱艹斗'],
  ['sou', 'so', '⿰纟斗'],
  // a (本)
  ['zha', 'zhaa', '⿰止八'],
  ['cha', 'chaa', '⿸厂八'],
  ['sha', 'shaa', '⿰山八'],
  ['ra', 'raa', '⿰日八'],
  ['za', 'zaa', '⿰子八'],
  ['ca', 'caa', '⿱艹八'],
  ['sa', 'saa', '⿰纟八'],
  // e (本)
  ['zhe', 'zhee', '⿰止么'],
  ['che', 'chee', '⿸厂么'],
  ['she', 'shee', '⿰山么'],
  ['re', 'ree', '⿰日么'],
  ['ze', 'zee', '⿰子么'],
  ['ce', 'cee', '⿱艹么'],
  ['se', 'see', '⿰纟么'],
  // ao (本)
  ['zhao', 'zhao', '⿰止刀'],
  ['chao', 'chao', '⿸厂刀'],
  ['shao', 'shao', '⿰山刀'],
  ['rao', 'rao', '⿰日刀'],
  ['zao', 'zao', '⿰子刀'],
  ['cao', 'cao', '⿱艹刀'],
  ['sao', 'sao', '⿰纟刀'],
  // en (尾)
  ['zhen', 'zhn', '⿵冂止'],
  ['chen', 'chn', '⿵冂厂'],
  ['shen', 'shn', '⿵冂山'],
  ['ren', 'rn', '⿵冂日'],
  ['zen', 'zn', '⿵冂子'],
  ['cen', 'cn', '⿵冂艹'],
  ['sen', 'sn', '⿵冂纟'],
  // eng (尾)
  ['zheng', 'zhg', '⿹勹止'],
  ['cheng', 'chg', '⿹勹厂'],
  ['sheng', 'shg', '⿹勹山'],
  ['reng', 'rg', '⿹勹日'],
  ['zeng', 'zg', '⿹勹子'],
  ['ceng', 'cg', '⿹勹艹'],
  ['seng', 'sg', '⿹勹纟'],
  // uai (前本)
  ['zhuai', 'zhua', '⿰止⿱土才'],
  ['chuai', 'chua', '⿸厂⿱土才'],
  ['shuai', 'shua', '⿰山⿱土才'],
  // ui (前本)
  ['zhui', 'zhue', '⿰止⿱土贝'],
  ['chui', 'chue', '⿸厂⿱土贝'],
  ['shui', 'shue', '⿰山⿱土贝'],
  ['rui', 'rue', '⿰日⿱土贝'],
  ['zui', 'zue', '⿰子⿱土贝'],
  ['cui', 'cue', '⿱艹⿱土贝'],
  ['sui', 'sue', '⿰纟⿱土贝'],
  // ua (前本)
  ['zhua', 'zhuaa', '⿰止⿱土八'],
  ['chua', 'chuaa', '⿸厂⿱土八'],
  ['shua', 'shuaa', '⿰山⿱土八'],
  ['rua', 'ruaa', '⿰日⿱土八'],
  // uo (前本)
  ['zhuo', 'zhuoo', '⿰止⿱土乇'],
  ['chuo', 'chuoo', '⿸厂⿱土乇'],
  ['shuo', 'shuoo', '⿰山⿱土乇'],
  ['ruo', 'ruoo', '⿰日⿱土乇'],
  ['zuo', 'zuoo', '⿰子⿱土乇'],
  ['cuo', 'cuoo', '⿱艹⿱土乇'],
  ['suo', 'suoo', '⿰纟⿱土乇'],
  // un (前尾)
  ['zhun', 'zhun', '⿰止⿵冂土'],
  ['chun', 'chun', '⿸厂⿵冂土'],
  ['shun', 'shun', '⿰山⿵冂土'],
  ['run', 'run', '⿰日⿵冂土'],
  ['zun', 'zun', '⿰子⿵冂土'],
  ['cun', 'cun', '⿱艹⿵冂土'],
  ['sun', 'sun', '⿰纟⿵冂土'],
  // ong (前尾)
  ['zhong', 'zhug', '⿰止⿹勹土'],
  ['chong', 'chug', '⿸厂⿹勹土'],
  ['rong', 'rug', '⿰日⿹勹土'],
  ['zong', 'zug', '⿰子⿹勹土'],
  ['cong', 'cug', '⿱艹⿹勹土'],
  ['song', 'sug', '⿰纟⿹勹土'],
  // an (本尾)
  ['zhan', 'zhan', '⿰止⿵冂才'],
  ['chan', 'chan', '⿸厂⿵冂才'],
  ['shan', 'shan', '⿰山⿵冂才'],
  ['ran', 'ran', '⿰日⿵冂才'],
  ['zan', 'zan', '⿰子⿵冂才'],
  ['can', 'can', '⿱艹⿵冂才'],
  ['san', 'san', '⿰纟⿵冂才'],
  // ang (本尾)
  ['zhang', 'zhag', '⿰止⿹勹才'],
  ['chang', 'chag', '⿸厂⿹勹才'],
  ['shang', 'shag', '⿰山⿹勹才'],
  ['rang', 'rag', '⿰日⿹勹才'],
  ['zang', 'zag', '⿰子⿹勹才'],
  ['cang', 'cag', '⿱艹⿹勹才'],
  ['sang', 'sag', '⿰纟⿹勹才'],
  // uan (前本尾)
  ['zhuan', 'zhuan', '⿰止⿱土⿵冂才'],
  ['chuan', 'chuan', '⿸厂⿱土⿵冂才'],
  ['shuan', 'shuan', '⿰山⿱土⿵冂才'],
  ['ruan', 'ruan', '⿰日⿱土⿵冂才'],
  ['zuan', 'zuan', '⿰子⿱土⿵冂才'],
  ['cuan', 'cuan', '⿱艹⿱土⿵冂才'],
  ['suan', 'suan', '⿰纟⿱土⿵冂才'],
  // uang (前本尾)
  ['zhuang', 'zhuag', '⿰止⿱土⿹勹才'],
  ['chuang', 'chuag', '⿸厂⿱土⿹勹才'],
  ['shuang', 'shuag', '⿰山⿱土⿹勹才'],
]

describe('舌尖/卷舌音（zh ch sh r z c s）', () => {
  it.each(DATA)(
    '%s → %s → %s',
    (pinyin, pinin, invnz) => {
      expect(pinyin2invn(pinyin)).toBe(pinin)
      expect(invn2invnz(pinin)).toBe(invnz)
    },
  )
})
