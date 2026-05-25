function ternary(pinyin: string, invnPart: string, invnzPart = '') {
  return {
    pinyin,
    invnPart,
    invnzPart,
  }
}

export const vowelMap = [
  /* 韵头 */
  ternary('i', 'i_', '⿱一'),
  ternary('u', 'u_', '⿱土'),
  ternary('ü', 'v_', '⿱女'),
  /* 韵腹 */
  ternary('ai', '_a_', '⿱才'),
  ternary('ei', '_e_', '⿱贝'),
  ternary('ou', '_o_', '⿱斗'),
  ternary('a', '_aa_', '⿱八'),
  ternary('o', '_oo_', '⿱乇'),
  ternary('e', '_ee_', '⿱么'),
  ternary('ao', '_ao_', '⿱刀'),
  ternary('er', '_er_', '⿱耳'),
  /* 韵尾 */
  ternary('en', '_n', '⿵冂'),
  ternary('eng', '_g', '⿹勹'),
  /* 头腹 */
  ternary('ie', 'i_a_'),
  ternary('iu', 'i_o_'),
  ternary('ia', 'i_aa_'),
  ternary('iao', 'i_ao_'),
  ternary('uai', 'u_a_'),
  ternary('ui', 'u_e_'),
  ternary('ua', 'u_aa_'),
  ternary('uo', 'u_oo_'),
  ternary('üe', 'v_a_'),
  /* 头尾 */
  ternary('in', 'i_n'),
  ternary('ing', 'i_g'),
  ternary('un', 'u_n'),
  ternary('ong', 'u_g'),
  ternary('ün', 'v_n'),
  /* 腹尾 */
  ternary('an', '_a_n'),
  ternary('ang', '_a_g'),
  /* 头腹尾 */
  ternary('ian', 'i_a_n'),
  ternary('iang', 'i_a_g'),
  ternary('iong', 'i_u_g'),
  ternary('uan', 'u_a_n'),
  ternary('uang', 'u_a_g'),
  ternary('üan', 'v_a_n'),
]

export const consonantMap = {
  ordinary: [
    ternary('b', 'b', '⿰匕'),
    ternary('p', 'p', '⿰片'),
    ternary('m', 'm', '⿰木'),
    ternary('f', 'f', '⿰方'),
    ternary('d', 'd', '⿰丁'),
    ternary('t', 't', '⿰田'),
    ternary('n', 'n', '⿰牛'),
    ternary('l', 'l', '⿰立'),
    ternary('g', 'g', '⿱工'),
    ternary('k', 'k', '⿰口'),
    ternary('h', 'h', '⿰火'),
  ],
  jqx: [
    ternary('j', 'j', '⿱久'),
    ternary('q', 'q', '⿰七'),
    ternary('x', 'x', '⿰忄'),
  ],
  readable: [
    ternary('zh', 'zh', '⿰止'),
    ternary('ch', 'ch', '⿸厂'),
    ternary('sh', 'sh', '⿰山'),
    ternary('r', 'r', '⿰日'),
    ternary('z', 'z', '⿰子'),
    ternary('c', 'c', '⿱艹'),
    ternary('s', 's', '⿰纟'),
  ],
  zero: [
    ternary('Ø', '', ''),
    ternary('y', 'i', '⿵冂'),
    ternary('w', 'u', '⿹勹'),
  ],
} as const
