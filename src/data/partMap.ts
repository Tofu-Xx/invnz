function factory(pinyinPart: string | string[], invnzPart = '') {
  return {
    pinyinPart,
    invnzPart,
  }
}

export const vowelMap = [
  /* 韵头 */
  factory(['i', 'yi'], '⿱一'),
  factory(['u', 'wu'], '⿱五'),
  factory(['ü', 'yu'], '⿱雨'),
  /* 韵腹 */
  factory('a', '八'),
  factory(['uo', '_o', 'wo'], '乇'),
  factory('e', '戈'),
  factory('ai', '才'), // 乂歹
  factory('ei', '巿'),
  factory('ao', '刀'),
  factory(['ou', '[o]'], '斗'),
  factory(['ie', 'ye'], '也'),
  factory(['üe', 'yue'], '月'),
  factory('er', '耳'),
  /* 韵尾 */
  factory('en', '⿱冂'),
  factory('an', '⿱𰃦'),
  factory('eng', '⿹𠃌'),
  factory('ang', '⿹勹'),
  // 组合
  factory(['uai', 'wai'], 'u_ai'),
  factory(['ia', 'ya'], 'i_a'),
  factory(['ua', 'wa'], 'u_a'),
  factory(['iao', 'yao'], 'i_ao'),
  factory(['iu', 'you'], 'i_ou'),
  factory(['ui', 'wei'], 'u_ei'),
  factory(['ing', 'ying'], 'i_eng'),
  factory(['in', 'yin'], 'i_en'),
  factory(['ong', 'weng'], 'u_eng'),
  factory(['un', 'wen'], 'u_en'),
  factory(['ün', 'yun'], 'v_en'),
  factory(['iong', 'yong'], 'v_eng'),
  factory(['ian', 'yan'], 'ie_an'),
  factory(['iang', 'yang'], 'i_ang'),
  factory(['uan', 'wan'], 'u_an'),
  factory(['uang', 'wang'], 'u_ang'),
  factory(['üan', 'yuan'], 've_an'),
] as const

export const consonantMap = {
  ordinary: [
    factory('b', '⿰匕'),
    factory('p', '⿰片'),
    factory('m', '⿰木'),
    factory('f', '⿰方'),
    factory('d', '⿰歹'),
    factory('t', '⿰屯'),
    factory('n', '⿰牛'),
    factory('l', '⿰立'),
    factory('g', '⿰弓'),
    factory('k', '⿰口'),
    factory('h', '⿰火'),
    [],
  ],
  readable: [
    factory('j', '⿰己'),
    factory('q', '⿰七'),
    factory('x', '⿰夕'),
    factory('z', '⿰子'),
    factory('c', '⿰朿'),
    factory('s', '⿱四'),
    factory('r', '⿰日'),
    factory('zh', '⿰止'),
    factory('ch', '⿱尺'),
    factory('sh', '⿸尸'),
    [],
  ],
} as const
