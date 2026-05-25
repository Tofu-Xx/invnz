/**
 * 零声母音节正写法映射表。
 *
 * 汉语拼音中，零声母音节（i / u / ü 开头）有固定的书写变形规则，
 * 例如 i → yi、u → wu、ü → yu。
 * 本文件定义双向映射所需的常量表。
 */

/** invn → pinyin：零声母时，将韵母拼音改写为拼写形式 */
export const ZI: Record<string, string> = {
  i: 'yi',
  in: 'yin',
  ing: 'ying',
  iu: 'you',
  ie: 'ye',
  ia: 'ya',
  iao: 'yao',
  ian: 'yan',
  iang: 'yang',
  iong: 'yong',
  u: 'wu',
  ui: 'wei',
  un: 'wen',
  ua: 'wa',
  uo: 'wo',
  uai: 'wai',
  uan: 'wan',
  uang: 'wang',
  ü: 'yu',
  üe: 'yue',
  ün: 'yun',
  üan: 'yuan',
}

/**
 * pinyin → 底层韵母：少数音节经 y/w 改写后无法直接还原为韵母表条目，
 * 需要此表做特例映射。
 */
export const TO_UNDERLYING: Record<string, string> = {
  you: 'iu',
  wei: 'ui',
  wen: 'un',
  weng: 'ong',
}
