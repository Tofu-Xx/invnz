import { m2oMap } from '../tools/m2oMap'

export const vowel2phonemesMap: ReadonlyMap<string, string> = m2oMap([
  // 只做零声母
  ['weng', 'u_eng'],
  // 其他
  [['uai', 'wai'], 'u_ai'],
  [['ia', 'ya'], 'i_a'],
  [['ua', 'wa'], 'u_a'],
  [['iao', 'yao'], 'i_ao'],
  [['iu', 'you'], 'i_ou'],
  [['ui', 'wei'], 'u_ei'],
  [['ing', 'ying'], 'i_eng'],
  [['in', 'yin'], 'i_en'],
  [['un', 'wen'], 'u_en'],
  [['ün', 'yun'], 'v_en'],
  [['ian', 'yan'], 'ie_an'],
  [['iang', 'yang'], 'i_ang'],
  [['uan', 'wan'], 'u_an'],
  [['uang', 'wang'], 'u_ang'],
  [['üan', 'yuan'], 've_an'],
  [['iong', 'yong'], 'iong'],
])
