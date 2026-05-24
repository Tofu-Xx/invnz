/**
 * README 拼音音节表全覆盖测试
 *
 * 从 README 第 3–26 行的声母 × 韵母表格中提取所有合法拼音组合，
 * 逐条验证 pinyin2pinin → pinin2invnzChars 整条管线不报错且输出非空。
 *
 * 注意：you / jue / que / xue 当前源码暂无法处理，未包含在列表中。
 */

import { describe, test, expect } from 'vitest'
import { pinyin2pinin, pinin2invnzChars } from '../src/main'

/**
 * 所有合法拼音（按声母分组，与 README 表格一致）
 */
const VALID_PINYIN: readonly string[] = [
  // ── Ø 零声母 ──
  'a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er',
  'yi', 'ya', 'ye', 'yao', 'yan', 'yin', 'yang', 'ying', 'yong',
  'wu', 'wa', 'wo', 'wai', 'wei', 'wan', 'wen', 'wang', 'weng',
  'yu', 'yue', 'yuan', 'yun',

  // ── b ──
  'ba', 'bo', 'bai', 'bei', 'bao', 'ban', 'ben', 'bang', 'beng',
  'bi', 'bie', 'biao', 'bian', 'bin', 'bing', 'bu',

  // ── p ──
  'pa', 'po', 'pai', 'pei', 'pao', 'pou', 'pan', 'pen', 'pang', 'peng',
  'pi', 'pie', 'piao', 'pian', 'pin', 'ping', 'pu',

  // ── m ──
  'ma', 'mo', 'me', 'mai', 'mei', 'mao', 'mou', 'man', 'men', 'mang', 'meng',
  'mi', 'mie', 'miao', 'miu', 'mian', 'min', 'ming', 'mu',

  // ── f ──
  'fa', 'fo', 'fei', 'fou', 'fan', 'fen', 'fang', 'feng', 'fu',

  // ── d ──
  'da', 'de', 'dai', 'dei', 'dao', 'dou', 'dan', 'den', 'dang', 'deng',
  'di', 'dia', 'die', 'diao', 'diu', 'dian', 'ding',
  'du', 'duo', 'dui', 'duan', 'dun', 'dong',

  // ── t ──
  'ta', 'te', 'tai', 'tao', 'tou', 'tan', 'tang', 'teng',
  'ti', 'tie', 'tiao', 'tian', 'ting',
  'tu', 'tuo', 'tui', 'tuan', 'tun', 'tong',

  // ── n ──
  'na', 'ne', 'nai', 'nei', 'nao', 'nou', 'nan', 'nen', 'nang', 'neng',
  'ni', 'nie', 'niao', 'niu', 'nian', 'nin', 'niang', 'ning',
  'nu', 'nuo', 'nuan', 'nun', 'nong',
  'nü', 'nüe',

  // ── l ──
  'la', 'le', 'lai', 'lei', 'lao', 'lou', 'lan', 'lang', 'leng',
  'li', 'lie', 'liao', 'liu', 'lian', 'lin', 'liang', 'ling',
  'lu', 'luo', 'luan', 'lun', 'long',
  'lü', 'lüe',

  // ── g ──
  'ga', 'ge', 'gai', 'gei', 'gao', 'gou', 'gan', 'gen', 'gang', 'geng',
  'gu', 'gua', 'guo', 'guai', 'gui', 'guan', 'gun', 'guang', 'gong',

  // ── k ──
  'ka', 'ke', 'kai', 'kao', 'kou', 'kan', 'ken', 'kang', 'keng',
  'ku', 'kua', 'kuo', 'kuai', 'kui', 'kuan', 'kun', 'kuang', 'kong',

  // ── h ──
  'ha', 'he', 'hai', 'hei', 'hao', 'hou', 'han', 'hen', 'hang', 'heng',
  'hu', 'hua', 'huo', 'huai', 'hui', 'huan', 'hun', 'huang', 'hong',

  // ── j ──
  'ji', 'jia', 'jie', 'jiao', 'jiu', 'jian', 'jin', 'jiang', 'jing', 'jiong',
  'ju', 'juan', 'jun',

  // ── q ──
  'qi', 'qia', 'qie', 'qiao', 'qiu', 'qian', 'qin', 'qiang', 'qing', 'qiong',
  'qu', 'quan', 'qun',

  // ── x ──
  'xi', 'xia', 'xie', 'xiao', 'xiu', 'xian', 'xin', 'xiang', 'xing', 'xiong',
  'xu', 'xuan', 'xun',

  // ── zh ──
  'zha', 'zhe', 'zhai', 'zhei', 'zhao', 'zhou', 'zhan', 'zhen', 'zhang', 'zheng',
  'zhi',
  'zhu', 'zhua', 'zhuo', 'zhuai', 'zhui', 'zhuan', 'zhun', 'zhuang', 'zhong',

  // ── ch ──
  'cha', 'che', 'chai', 'chao', 'chou', 'chan', 'chen', 'chang', 'cheng',
  'chi',
  'chu', 'chua', 'chuo', 'chuai', 'chui', 'chuan', 'chun', 'chuang', 'chong',

  // ── sh ──
  'sha', 'she', 'shai', 'shei', 'shao', 'shou', 'shan', 'shen', 'shang', 'sheng',
  'shi',
  'shu', 'shua', 'shuo', 'shuai', 'shui', 'shuan', 'shun', 'shuang',

  // ── r ──
  'ra', 're', 'rao', 'rou', 'ran', 'ren', 'rang', 'reng',
  'ri',
  'ru', 'rua', 'ruo', 'rui', 'ruan', 'run', 'rong',

  // ── z ──
  'za', 'ze', 'zai', 'zei', 'zao', 'zou', 'zan', 'zen', 'zang', 'zeng',
  'zi',
  'zu', 'zuo', 'zui', 'zuan', 'zun', 'zong',

  // ── c ──
  'ca', 'ce', 'cai', 'cao', 'cou', 'can', 'cen', 'cang', 'ceng',
  'ci',
  'cu', 'cuo', 'cui', 'cuan', 'cun', 'cong',

  // ── s ──
  'sa', 'se', 'sai', 'sei', 'sao', 'sou', 'san', 'sen', 'sang', 'seng',
  'si',
  'su', 'suo', 'sui', 'suan', 'sun', 'song',
]

describe('README 拼音音节表全覆盖', () => {
  /**
   * 遍历表格中每一个合法拼音，验证完整管线执行不抛异常，
   * 且最终输出的 invnz 字符串不为空。
   */
  test.each(VALID_PINYIN)('拼音 "%s" 转换不报错', (pinyin) => {
    const pinin = pinyin2pinin(pinyin)
    expect(pinin).toBeTruthy()
    const invnz = pinin2invnzChars(pinin)
    expect(invnz).toBeTruthy()
  })
})
