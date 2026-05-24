import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pinin2invnzChars, pinyin2pinin } from '../src/main'

const __dirname = dirname(fileURLToPath(import.meta.url))

type Row = [string, string, string]

function gen(rows: Row[], category: string, description: string) {
  return [
    `/**`,
    ` * ${description}`,
    ` * 全部 ${rows.length} 条，由 scripts/gen-test-data.ts 自动生成，勿手动修改。`,
    ` */`,
    ``,
    `import { describe, it, expect } from 'vitest'`,
    `import { pinyin2pinin, pinin2invnzChars } from '../src/main'`,
    ``,
    `const DATA: [string, string, string][] = [`,
    ...rows.map(([p, pinin, invnz]) => `  ['${p}', '${pinin}', '${invnz}'],`),
    `]`,
    ``,
    `describe('${category}', () => {`,
    `  it.each(DATA)(`,
    `    '%s → %s → %s',`,
    `    (pinyin, pinin, invnz) => {`,
    `      expect(pinyin2pinin(pinyin)).toBe(pinin)`,
    `      expect(pinin2invnzChars(pinin)).toBe(invnz)`,
    `    },`,
    `  )`,
    `})`,
    ``,
  ].join('\n')
}

// ── 零声母（不含 you）──
const zeroInitial: Row[] = [
  'a',
  'o',
  'e',
  'ai',
  'ei',
  'ao',
  'ou',
  'an',
  'en',
  'ang',
  'eng',
  'er',
  'yi',
  'ya',
  'ye',
  'yao',
  'yan',
  'yin',
  'yang',
  'ying',
  'yong',
  'wu',
  'wa',
  'wo',
  'wai',
  'wei',
  'wan',
  'wen',
  'wang',
  'weng',
  'yu',
  'yue',
  'yuan',
  'yun',
].map(p => [p, pinyin2pinin(p), pinin2invnzChars(pinyin2pinin(p))])

writeFileSync(
  resolve(__dirname, '../test/zero-initial.test.ts'),
  gen(zeroInitial, '零声母', '零声母拼音（含 y/w/ü 开头的介音，不含 you）。'),
  'utf-8',
)
console.log(`zero-initial: ${zeroInitial.length} rows`)

// ── 普通声母 b p m f d t n l g k h（含 n/l 的 ü/üe）──
const regularInitials: Record<string, string[]> = {
  b: ['ba', 'bo', 'bai', 'bei', 'bao', 'ban', 'ben', 'bang', 'beng', 'bi', 'bie', 'biao', 'bian', 'bin', 'bing', 'bu'],
  p: ['pa', 'po', 'pai', 'pei', 'pao', 'pou', 'pan', 'pen', 'pang', 'peng', 'pi', 'pie', 'piao', 'pian', 'pin', 'ping', 'pu'],
  m: ['ma', 'mo', 'me', 'mai', 'mei', 'mao', 'mou', 'man', 'men', 'mang', 'meng', 'mi', 'mie', 'miao', 'miu', 'mian', 'min', 'ming', 'mu'],
  f: ['fa', 'fo', 'fei', 'fou', 'fan', 'fen', 'fang', 'feng', 'fu'],
  d: ['da', 'de', 'dai', 'dei', 'dao', 'dou', 'dan', 'den', 'dang', 'deng', 'di', 'dia', 'die', 'diao', 'diu', 'dian', 'ding', 'du', 'duo', 'dui', 'duan', 'dun', 'dong'],
  t: ['ta', 'te', 'tai', 'tao', 'tou', 'tan', 'tang', 'teng', 'ti', 'tie', 'tiao', 'tian', 'ting', 'tu', 'tuo', 'tui', 'tuan', 'tun', 'tong'],
  n: ['na', 'ne', 'nai', 'nei', 'nao', 'nou', 'nan', 'nen', 'nang', 'neng', 'ni', 'nie', 'niao', 'niu', 'nian', 'nin', 'niang', 'ning', 'nu', 'nuo', 'nuan', 'nun', 'nong', 'nü', 'nüe'],
  l: ['la', 'le', 'lai', 'lei', 'lao', 'lou', 'lan', 'lang', 'leng', 'li', 'lie', 'liao', 'liu', 'lian', 'lin', 'liang', 'ling', 'lu', 'luo', 'luan', 'lun', 'long', 'lü', 'lüe'],
  g: ['ga', 'ge', 'gai', 'gei', 'gao', 'gou', 'gan', 'gen', 'gang', 'geng', 'gu', 'gua', 'guo', 'guai', 'gui', 'guan', 'gun', 'guang', 'gong'],
  k: ['ka', 'ke', 'kai', 'kao', 'kou', 'kan', 'ken', 'kang', 'keng', 'ku', 'kua', 'kuo', 'kuai', 'kui', 'kuan', 'kun', 'kuang', 'kong'],
  h: ['ha', 'he', 'hai', 'hei', 'hao', 'hou', 'han', 'hen', 'hang', 'heng', 'hu', 'hua', 'huo', 'huai', 'hui', 'huan', 'hun', 'huang', 'hong'],
}

const regularRows: Row[] = []
for (const _k in regularInitials) {
  for (const p of regularInitials[_k]) {
    regularRows.push([p, pinyin2pinin(p), pinin2invnzChars(pinyin2pinin(p))])
  }
}
writeFileSync(
  resolve(__dirname, '../test/b-p-m-f-d-t-n-l-g-k-h.test.ts'),
  gen(regularRows, '普通声母（b p m f d t n l g k h）', '普通声母拼音，不含 jqx 和 zh/ch/sh/r/z/c/s。'),
  'utf-8',
)
console.log(`b-p-m-f-d-t-n-l-g-k-h: ${regularRows.length} rows`)

// ── 舌尖/卷舌音 zh ch sh r z c s ──
const retroflexInitials: Record<string, string[]> = {
  zh: ['zha', 'zhe', 'zhai', 'zhei', 'zhao', 'zhou', 'zhan', 'zhen', 'zhang', 'zheng', 'zhi', 'zhu', 'zhua', 'zhuo', 'zhuai', 'zhui', 'zhuan', 'zhun', 'zhuang', 'zhong'],
  ch: ['cha', 'che', 'chai', 'chao', 'chou', 'chan', 'chen', 'chang', 'cheng', 'chi', 'chu', 'chua', 'chuo', 'chuai', 'chui', 'chuan', 'chun', 'chuang', 'chong'],
  sh: ['sha', 'she', 'shai', 'shei', 'shao', 'shou', 'shan', 'shen', 'shang', 'sheng', 'shi', 'shu', 'shua', 'shuo', 'shuai', 'shui', 'shuan', 'shun', 'shuang'],
  r: ['ra', 're', 'rao', 'rou', 'ran', 'ren', 'rang', 'reng', 'ri', 'ru', 'rua', 'ruo', 'rui', 'ruan', 'run', 'rong'],
  z: ['za', 'ze', 'zai', 'zei', 'zao', 'zou', 'zan', 'zen', 'zang', 'zeng', 'zi', 'zu', 'zuo', 'zui', 'zuan', 'zun', 'zong'],
  c: ['ca', 'ce', 'cai', 'cao', 'cou', 'can', 'cen', 'cang', 'ceng', 'ci', 'cu', 'cuo', 'cui', 'cuan', 'cun', 'cong'],
  s: ['sa', 'se', 'sai', 'sei', 'sao', 'sou', 'san', 'sen', 'sang', 'seng', 'si', 'su', 'suo', 'sui', 'suan', 'sun', 'song'],
}

const retroflexRows: Row[] = []
for (const _k in retroflexInitials) {
  for (const p of retroflexInitials[_k]) {
    retroflexRows.push([p, pinyin2pinin(p), pinin2invnzChars(pinyin2pinin(p))])
  }
}
writeFileSync(
  resolve(__dirname, '../test/zh-ch-sh-r-z-c-s.test.ts'),
  gen(retroflexRows, '舌尖/卷舌音（zh ch sh r z c s）', '舌尖/卷舌声母拼音。'),
  'utf-8',
)
console.log(`zh-ch-sh-r-z-c-s: ${retroflexRows.length} rows`)

// ── jqx ──
const jqxInitials: Record<string, string[]> = {
  j: ['ji', 'jia', 'jie', 'jiao', 'jiu', 'jian', 'jin', 'jiang', 'jing', 'jiong', 'ju', 'juan', 'jun'],
  q: ['qi', 'qia', 'qie', 'qiao', 'qiu', 'qian', 'qin', 'qiang', 'qing', 'qiong', 'qu', 'quan', 'qun'],
  x: ['xi', 'xia', 'xie', 'xiao', 'xiu', 'xian', 'xin', 'xiang', 'xing', 'xiong', 'xu', 'xuan', 'xun'],
}

const jqxRows: Row[] = []
for (const _k in jqxInitials) {
  for (const p of jqxInitials[_k]) {
    jqxRows.push([p, pinyin2pinin(p), pinin2invnzChars(pinyin2pinin(p))])
  }
}
writeFileSync(
  resolve(__dirname, '../test/jqx.test.ts'),
  gen(jqxRows, 'j q x', 'j、q、x 声母拼音。注意 jue/que/xue 当前源码暂不输出。'),
  'utf-8',
)
console.log(`jqx: ${jqxRows.length} rows`)

console.log('\n全部文件生成完毕。')
