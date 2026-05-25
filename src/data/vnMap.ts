function PIW(pinyin: string, invnPart: string, invnzPart = '') {
  return {
    pinyin,
    invnPart,
    invnzPart,
  }
}

export const vowelMap = [
  /* 韵头 */
  PIW('i', 'i_', '⿱一'),
  PIW('u', 'u_', '⿱土'),
  PIW('ü', 'v_', '⿱女'),
  /* 韵腹 */
  PIW('ai', '_a_', '⿱才'),
  PIW('ei', '_e_', '⿱贝'),
  PIW('ou', '_o_', '⿱斗'),
  PIW('a', '_aa_', '⿱八'),
  PIW('o', '_oo_', '⿱乇'),
  PIW('e', '_ee_', '⿱么'),
  PIW('ao', '_ao_', '⿱刀'),
  PIW('er', '_er_', '⿱耳'),
  /* 韵尾 */
  PIW('en', '_n', '⿵冂'),
  PIW('eng', '_g', '⿹勹'),
  /* 头腹 */
  PIW('ie', 'i_a_'),
  PIW('iu', 'i_o_'),
  PIW('ia', 'i_aa_'),
  PIW('iao', 'i_ao_'),
  PIW('uai', 'u_a_'),
  PIW('ui', 'u_e_'),
  PIW('ua', 'u_aa_'),
  PIW('uo', 'u_oo_'),
  PIW('üe', 'v_a_'),
  /* 头尾 */
  PIW('in', 'i_n'),
  PIW('ing', 'i_g'),
  PIW('un', 'u_n'),
  PIW('ong', 'u_g'),
  PIW('ün', 'v_n'),
  /* 腹尾 */
  PIW('an', '_a_n'),
  PIW('ang', '_a_g'),
  /* 头腹尾 */
  PIW('ian', 'i_a_n'),
  PIW('iang', 'i_a_g'),
  PIW('iong', 'i_u_g'),
  PIW('uan', 'u_a_n'),
  PIW('uang', 'u_a_g'),
  PIW('üan', 'v_a_n'),
]

export const consonantMap = {
  ordinary: [
    PIW('b', 'b', '⿰匕'),
    PIW('p', 'p', '⿰片'),
    PIW('m', 'm', '⿰木'),
    PIW('f', 'f', '⿰方'),
    PIW('d', 'd', '⿰丁'),
    PIW('t', 't', '⿰田'),
    PIW('n', 'n', '⿰牛'),
    PIW('l', 'l', '⿰立'),
    PIW('g', 'g', '⿱工'),
    PIW('k', 'k', '⿰口'),
    PIW('h', 'h', '⿰火'),
  ],
  jqx: [
    PIW('j', 'j', '⿱久'),
    PIW('q', 'q', '⿰七'),
    PIW('x', 'x', '⿰忄'),
  ],
  readable: [
    PIW('zh', 'zh', '⿰止'),
    PIW('ch', 'ch', '⿸厂'),
    PIW('sh', 'sh', '⿰山'),
    PIW('r', 'r', '⿰日'),
    PIW('z', 'z', '⿰子'),
    PIW('c', 'c', '⿱艹'),
    PIW('s', 's', '⿰纟'),
  ],
  void: [
    PIW('Ø', '', ''),
    PIW('y', 'i', '⿵冂'),
    PIW('w', 'u', '⿹勹'),
  ],
} as const
