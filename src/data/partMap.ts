function phoneme2wordroot(phoneme: string | string[], wordroot: string) {
  return {
    phoneme,
    wordroot,
  }
}
export const vowelMap = [
  /* 韵头 */
  phoneme2wordroot(['i', 'yi'], '⿱一'),
  phoneme2wordroot(['u', 'wu'], '⿱五'),
  phoneme2wordroot(['ü', 'v', 'yu'], '⿱雨'),
  /* 韵腹 */
  phoneme2wordroot(['-a', 'ba'], '八'), // 㐅 乂
  phoneme2wordroot(['-wo', 'uo', 'huo'], '火'), //
  phoneme2wordroot(['-e', 'ge'], '戈'), // 㔾
  phoneme2wordroot(['-ai', 'cai'], '才'), // 乂歹
  phoneme2wordroot(['-ei', 'pei'], '巿'), //
  phoneme2wordroot(['-ao', 'dao'], '刀'), //
  phoneme2wordroot(['-ou', 'o', 'kou'], '口'), // 禺
  //
  phoneme2wordroot(['-ong', 'gong'], '工'),
  //
  phoneme2wordroot(['ie', 'ye'], '也'),
  phoneme2wordroot(['üe', 'yue'], '月'),
  phoneme2wordroot(['iong', 'yong'], '用'),
  phoneme2wordroot('er', '耳'),
  /* 韵尾 */
  phoneme2wordroot('en', '⿱冂'),
  phoneme2wordroot('an', '⿱𰃦'),
  phoneme2wordroot('eng', '⿹𠃌'),
  phoneme2wordroot('ang', '⿹勹'),
] as const

export const consonantMap = [
  phoneme2wordroot('', '⿰丨'),
  //
  phoneme2wordroot(['g', ''], '⿰𠂎'), // 𠂎
  phoneme2wordroot(['k', ''], '⿰丬'), // 丬
  phoneme2wordroot(['h', ''], '⿰丩'), // 丩
  //
  phoneme2wordroot(['d', 'da'], '⿱大'), //
  phoneme2wordroot(['t', 'tuo'], '⿰乇'), //
  phoneme2wordroot(['n', 'na'], '⿰𭃂'), // 𭃂
  phoneme2wordroot(['l', 'le'], '⿰了'), // 了
  //
  phoneme2wordroot(['b', 'bu'], '⿱不'),
  phoneme2wordroot(['p', 'pu'], '⿱攵'),
  phoneme2wordroot(['m', 'mu'], '⿰木'),
  phoneme2wordroot(['f', 'fu'], '⿱父'),
  //
  phoneme2wordroot('j', '⿱几'),
  phoneme2wordroot('q', '⿱七'),
  phoneme2wordroot('x', '⿱西'),
  //
  phoneme2wordroot('z', '⿰子'),
  phoneme2wordroot('c', '⿰朿'),
  phoneme2wordroot('s', '⿱四'),
  phoneme2wordroot('r', '⿰日'),
  phoneme2wordroot('zh', '⿱止'),
  phoneme2wordroot('ch', '⿱尺'),
  phoneme2wordroot('sh', '⿸尸'),
] as const
