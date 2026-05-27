function phoneme2wordroot(phoneme: string | string[], wordroot: string) {
  return {
    phoneme,
    wordroot,
  }
}
export const vowelPhonemeMap = [
  /* 介音，后面可能会接其他vowel phoneme */
  phoneme2wordroot(['i', 'yi'], '⿱一'),
  phoneme2wordroot(['u', 'wu'], '⿱五'),
  phoneme2wordroot(['v', 'ü', 'yu'], '⿱雨'),
  // 不存在的韵尾
  phoneme2wordroot(['ie', 'ye'], '也'),
  phoneme2wordroot(['ve', 'üe', 'yue'], '月'),
  /* （2.2）须提前 */
  phoneme2wordroot('en', '⿵冂'),
  phoneme2wordroot('an', '⿵𰃦'),
  phoneme2wordroot('eng', '⿹𠃌'),
  phoneme2wordroot('ang', '⿹勹'),
  /* （2.3）零声母是前面加上‘丨’ */
  phoneme2wordroot(['-a', 'ba'], '八'),
  phoneme2wordroot(['-wo', 'uo', 'huo'], '火'),
  phoneme2wordroot(['-e', 'ge'], '戈'),
  phoneme2wordroot(['-ai', 'cai'], '才'),
  phoneme2wordroot(['-ei', 'pei'], '巿'),
  phoneme2wordroot(['-ao', 'dao'], '刀'),
  phoneme2wordroot(['-ou', '-o', 'kou'], '口'),
  // 无零声母
  phoneme2wordroot(['-ong', 'gong'], '工'),
  // 只做零声母
  phoneme2wordroot('er', '耳'),
] as const

export const consonantPhonemeMap = [
  // 零声母
  phoneme2wordroot('', '⿰丨'),
  // 象形
  phoneme2wordroot('g', '⿰𠂎'),
  phoneme2wordroot('k', '⿰丬'),
  phoneme2wordroot('h', '⿰丩'),
  phoneme2wordroot('d', '⿱𠂊'),
  phoneme2wordroot('t', '⿰七'),
  phoneme2wordroot('n', '⿱冖'),
  phoneme2wordroot('l', '⿺𠃊'),
  // 无介音u
  phoneme2wordroot(['b', 'bu'], '⿱不'),
  phoneme2wordroot(['p', 'pu'], '⿱攵'),
  phoneme2wordroot(['m', 'mu'], '⿰木'),
  phoneme2wordroot(['f', 'fu'], '⿱父'),
  // 默认介音i
  phoneme2wordroot(['j', 'ji'], '⿱几'),
  phoneme2wordroot(['q', 'qi'], '⿱七'),
  phoneme2wordroot(['x', 'xi'], '⿱西'),
  // 假声母i
  phoneme2wordroot(['z', 'zi'], '⿰子'),
  phoneme2wordroot(['c', 'ci'], '⿰朿'),
  phoneme2wordroot(['s', 'si'], '⿱四'),
  phoneme2wordroot(['r', 'ri'], '⿰日'),
  phoneme2wordroot(['zh', 'zhi'], '⿱止'),
  phoneme2wordroot(['ch', 'chi'], '⿱尺'),
  phoneme2wordroot(['sh', 'shi'], '⿸尸'),
] as const
