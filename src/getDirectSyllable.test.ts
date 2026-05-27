import { describe, expect, it } from 'vitest'
import { getInvnz } from './main'
import { pinyinTable } from './data/pinyinTable'

const FINALS = [
  'a','o','e','ai','ei','ao','ou','an','en','ang','eng','er',
  'i','ia','ie','iao','iu','ian','in','iang','ing','iong',
  'u','ua','uo','uai','ui','uan','un','uang','ong',
  'ü','üe','üan','ün',
]

const ZERO: Record<string, string> = {
  a:'a',o:'o',e:'e',ai:'ai',ei:'ei',ao:'ao',ou:'ou',
  an:'an',en:'en',ang:'ang',eng:'eng',er:'er',
  i:'yi',ia:'ya',ie:'ye',iao:'yao',iu:'you',
  ian:'yan',in:'yin',iang:'yang',ing:'ying',iong:'yong',
  u:'wu',ua:'wa',uo:'wo',uai:'wai',ui:'wei',
  uan:'wan',un:'wen',uang:'wang',ong:'ong',
  ü:'yu',üe:'yue',üan:'yuan',ün:'yun',
}

const EXPECTED: Record<string, string> = {
  a:'⿰丨八',o:'⿰丨口',e:'⿰丨戈',ai:'⿰丨才',ei:'⿰丨巿',
  ao:'⿰丨刀',ou:'⿰丨口',an:'𰃦',en:'冂',ang:'勹',eng:'𠃌',er:'耳',
  yi:'一',ya:'⿱一八',ye:'也',yao:'⿱一刀',you:'⿱一口',
  yan:'⿵𰃦也',yin:'⿵冂一',yang:'⿹勹一',ying:'⿹𠃌一',yong:'用',
  wu:'五',wa:'⿱五八',wo:'⿰丨火',wai:'⿱五才',wei:'⿱五巿',
  wan:'⿵𰃦五',wen:'⿵冂五',wang:'⿹勹五',
  ong:'⿰丨工',
  yu:'雨',yue:'月',yuan:'⿵𰃦月',yun:'⿵冂雨',

  ba:'八',bo:'⿱不火',bai:'⿱不才',bei:'⿱不巿',bao:'⿱不刀',
  ban:'⿱不𰃦',ben:'⿱不冂',bang:'⿱不勹',beng:'⿱不𠃌',
  bi:'⿱不一',bie:'⿱不也',biao:'⿱不⿱一刀',bian:'⿱不⿵𰃦也',
  bin:'⿱不⿵冂一',bing:'⿱不⿹𠃌一',bu:'不',

  pa:'⿱攵八',po:'⿱攵火',pai:'⿱攵才',pei:'巿',pao:'⿱攵刀',
  pou:'⿱攵口',pan:'⿱攵𰃦',pen:'⿱攵冂',pang:'⿱攵勹',peng:'⿱攵𠃌',
  pi:'⿱攵一',pie:'⿱攵也',piao:'⿱攵⿱一刀',pian:'⿱攵⿵𰃦也',
  pin:'⿱攵⿵冂一',ping:'⿱攵⿹𠃌一',pu:'攵',

  ma:'⿰木八',mo:'⿰木火',me:'⿰木戈',mai:'⿰木才',mei:'⿰木巿',
  mao:'⿰木刀',mou:'⿰木口',man:'⿵𰃦木',men:'⿵冂木',
  mang:'⿹勹木',meng:'⿹𠃌木',mi:'⿱木一',mie:'⿰木也',
  miao:'⿰木⿱一刀',miu:'⿰木⿱一口',mian:'⿰木⿵𰃦也',
  min:'⿰木⿵冂一',ming:'⿰木⿹𠃌一',mu:'木',

  fa:'⿱父八',fo:'⿱父火',fei:'⿱父巿',fou:'⿱父口',
  fan:'⿱父𰃦',fen:'⿱父冂',fang:'⿱父勹',feng:'⿱父𠃌',fu:'父',

  da:'⿱𠂊八',de:'⿱𠂊戈',dai:'⿱𠂊才',dei:'⿱𠂊巿',dao:'刀',
  dou:'⿱𠂊口',dan:'⿱𠂊𰃦',den:'⿱𠂊冂',dang:'⿱𠂊勹',deng:'⿱𠂊𠃌',
  di:'⿱𠂊一',dia:'⿱𠂊⿱一八',die:'⿱𠂊也',diao:'⿱𠂊⿱一刀',
  diu:'⿱𠂊⿱一口',dian:'⿱𠂊⿵𰃦也',ding:'⿱𠂊⿹𠃌一',
  du:'⿱𠂊五',duo:'⿱𠂊火',dui:'⿱𠂊⿱五巿',
  duan:'⿱𠂊⿵𰃦五',dun:'⿱𠂊⿵冂五',dong:'⿱𠂊工',

  ta:'⿰七八',te:'⿰七戈',tai:'⿰七才',tao:'⿰七刀',tou:'⿰七口',
  tan:'⿵𰃦七',tang:'⿹勹七',teng:'⿹𠃌七',ti:'⿱七一',
  tie:'⿰七也',tiao:'⿰七⿱一刀',tian:'⿰七⿵𰃦也',ting:'⿰七⿹𠃌一',
  tu:'⿰七五',tuo:'⿰七火',tui:'⿰七⿱五巿',
  tuan:'⿰七⿵𰃦五',tun:'⿰七⿵冂五',tong:'⿰七工',

  na:'⿱冖八',ne:'⿱冖戈',nai:'⿱冖才',nei:'⿱冖巿',nao:'⿱冖刀',
  nou:'⿱冖口',nan:'⿱冖𰃦',nen:'⿱冖冂',nang:'⿱冖勹',neng:'⿱冖𠃌',
  ni:'⿱冖一',nie:'⿱冖也',niao:'⿱冖⿱一刀',niu:'⿱冖⿱一口',
  nian:'⿱冖⿵𰃦也',nin:'⿱冖⿵冂一',niang:'⿱冖⿹勹一',ning:'⿱冖⿹𠃌一',
  nu:'⿱冖五',nuo:'⿱冖火',nuan:'⿱冖⿵𰃦五',nun:'⿱冖⿵冂五',nong:'⿱冖工',
  nü:'⿱冖雨',nüe:'⿱冖月',

  la:'⿺𠃊八',le:'⿺𠃊戈',lai:'⿺𠃊才',lei:'⿺𠃊巿',lao:'⿺𠃊刀',
  lou:'⿺𠃊口',lan:'⿺𠃊𰃦',lang:'⿺𠃊勹',leng:'⿺𠃊𠃌',
  li:'⿺𠃊一',lie:'⿺𠃊也',liao:'⿺𠃊⿱一刀',liu:'⿺𠃊⿱一口',
  lian:'⿺𠃊⿵𰃦也',lin:'⿺𠃊⿵冂一',liang:'⿺𠃊⿹勹一',ling:'⿺𠃊⿹𠃌一',
  lu:'⿺𠃊五',luo:'⿺𠃊火',luan:'⿺𠃊⿵𰃦五',lun:'⿺𠃊⿵冂五',long:'⿺𠃊工',
  lü:'⿺𠃊雨',lüe:'⿺𠃊月',

  ga:'⿰𠂎八',ge:'戈',gai:'⿰𠂎才',gei:'⿰𠂎巿',gao:'⿰𠂎刀',
  gou:'⿰𠂎口',gan:'⿵𰃦𠂎',gen:'⿵冂𠂎',gang:'⿹勹𠂎',geng:'⿹𠃌𠂎',
  gu:'⿰𠂎五',gua:'⿰𠂎⿱五八',guo:'⿰𠂎火',guai:'⿰𠂎⿱五才',
  gui:'⿰𠂎⿱五巿',guan:'⿰𠂎⿵𰃦五',gun:'⿰𠂎⿵冂五',
  guang:'⿰𠂎⿹勹五',gong:'工',

  ka:'⿰丬八',ke:'⿰丬戈',kai:'⿰丬才',kao:'⿰丬刀',kou:'口',
  kan:'⿵𰃦丬',ken:'⿵冂丬',kang:'⿹勹丬',keng:'⿹𠃌丬',
  ku:'⿰丬五',kua:'⿰丬⿱五八',kuo:'⿰丬火',kuai:'⿰丬⿱五才',
  kui:'⿰丬⿱五巿',kuan:'⿰丬⿵𰃦五',kun:'⿰丬⿵冂五',
  kuang:'⿰丬⿹勹五',kong:'⿰丬工',

  ha:'⿰丩八',he:'⿰丩戈',hai:'⿰丩才',hei:'⿰丩巿',hao:'⿰丩刀',
  hou:'⿰丩口',han:'⿵𰃦丩',hen:'⿵冂丩',hang:'⿹勹丩',heng:'⿹𠃌丩',
  hu:'⿰丩五',hua:'⿰丩⿱五八',huo:'火',huai:'⿰丩⿱五才',
  hui:'⿰丩⿱五巿',huan:'⿰丩⿵𰃦五',hun:'⿰丩⿵冂五',
  huang:'⿰丩⿹勹五',hong:'⿰丩工',

  ji:'几',jia:'⿱几八',jie:'⿱几也',jiao:'⿱几刀',jiu:'⿱几口',
  jian:'⿱几⿵𰃦也',jin:'⿱几冂',jiang:'⿱几勹',jing:'⿱几𠃌',
  jiong:'⿱几用',ju:'⿱几雨',jue:'⿱几月',juan:'⿱几⿵𰃦月',
  jun:'⿱几⿵冂雨',

  qi:'七',qia:'⿱七八',qie:'⿱七也',qiao:'⿱七刀',qiu:'⿱七口',
  qian:'⿱七⿵𰃦也',qin:'⿱七冂',qiang:'⿱七勹',qing:'⿱七𠃌',
  qiong:'⿱七用',qu:'⿱七雨',que:'⿱七月',quan:'⿱七⿵𰃦月',
  qun:'⿱七⿵冂雨',

  xi:'西',xia:'⿱西八',xie:'⿱西也',xiao:'⿱西刀',xiu:'⿱西口',
  xian:'⿱西⿵𰃦也',xin:'⿱西冂',xiang:'⿱西勹',xing:'⿱西𠃌',
  xiong:'⿱西用',xu:'⿱西雨',xue:'⿱西月',xuan:'⿱西⿵𰃦月',
  xun:'⿱西⿵冂雨',

  zha:'⿱止八',zhe:'⿱止戈',zhai:'⿱止才',zhei:'⿱止巿',zhao:'⿱止刀',
  zhou:'⿱止口',zhan:'⿱止𰃦',zhen:'⿱止冂',zhang:'⿱止勹',zheng:'⿱止𠃌',
  zhi:'止',zhu:'⿱止五',zhua:'⿱止⿱五八',zhuo:'⿱止火',
  zhuai:'⿱止⿱五才',zhui:'⿱止⿱五巿',zhuan:'⿱止⿵𰃦五',
  zhun:'⿱止⿵冂五',zhuang:'⿱止⿹勹五',zhong:'⿱止工',

  cha:'⿱尺八',che:'⿱尺戈',chai:'⿱尺才',chao:'⿱尺刀',chou:'⿱尺口',
  chan:'⿱尺𰃦',chen:'⿱尺冂',chang:'⿱尺勹',cheng:'⿱尺𠃌',chi:'尺',
  chu:'⿱尺五',chua:'⿱尺⿱五八',chuo:'⿱尺火',chuai:'⿱尺⿱五才',
  chui:'⿱尺⿱五巿',chuan:'⿱尺⿵𰃦五',chun:'⿱尺⿵冂五',
  chuang:'⿱尺⿹勹五',chong:'⿱尺工',

  sha:'⿸尸八',she:'⿸尸戈',shai:'⿸尸才',shei:'⿸尸巿',shao:'⿸尸刀',
  shou:'⿸尸口',shan:'⿸尸𰃦',shen:'⿸尸冂',shang:'⿸尸勹',sheng:'⿸尸𠃌',
  shi:'尸',shu:'⿸尸五',shua:'⿸尸⿱五八',shuo:'⿸尸火',
  shuai:'⿸尸⿱五才',shui:'⿸尸⿱五巿',
  shuan:'⿸尸⿵𰃦五',shun:'⿸尸⿵冂五',
  shuang:'⿸尸⿹勹五',

  ra:'⿰日八',re:'⿰日戈',rao:'⿰日刀',rou:'⿰日口',
  ran:'⿵𰃦日',ren:'⿵冂日',rang:'⿹勹日',reng:'⿹𠃌日',ri:'日',
  ru:'⿰日五',rua:'⿰日⿱五八',ruo:'⿰日火',rui:'⿰日⿱五巿',
  ruan:'⿰日⿵𰃦五',run:'⿰日⿵冂五',rong:'⿰日工',

  za:'⿰子八',ze:'⿰子戈',zai:'⿰子才',zei:'⿰子巿',zao:'⿰子刀',
  zou:'⿰子口',zan:'⿵𰃦子',zen:'⿵冂子',zang:'⿹勹子',zeng:'⿹𠃌子',
  zi:'子',zu:'⿰子五',zuo:'⿰子火',zui:'⿰子⿱五巿',
  zuan:'⿰子⿵𰃦五',zun:'⿰子⿵冂五',zong:'⿰子工',

  ca:'⿰朿八',ce:'⿰朿戈',cai:'才',cao:'⿰朿刀',cou:'⿰朿口',
  can:'⿵𰃦朿',cen:'⿵冂朿',cang:'⿹勹朿',ceng:'⿹𠃌朿',ci:'朿',
  cu:'⿰朿五',cuo:'⿰朿火',cui:'⿰朿⿱五巿',
  cuan:'⿰朿⿵𰃦五',cun:'⿰朿⿵冂五',cong:'⿰朿工',

  sa:'⿱四八',se:'⿱四戈',sai:'⿱四才',sei:'⿱四巿',sao:'⿱四刀',
  sou:'⿱四口',san:'⿱四𰃦',sen:'⿱四冂',sang:'⿱四勹',seng:'⿱四𠃌',
  si:'四',su:'⿱四五',suo:'⿱四火',sui:'⿱四⿱五巿',
  suan:'⿱四⿵𰃦五',sun:'⿱四⿵冂五',song:'⿱四工',
}

const allSyllables: string[] = []

for (const f of FINALS) {
  const p = ZERO[f]
  if (p) allSyllables.push(p)
}

for (const [init, finals] of Object.entries(pinyinTable)) {
  if (init === 'zero') continue
  for (const f of finals) {
    allSyllables.push(
      'jqx'.includes(init) && f.startsWith('ü')
        ? init + f.replace('ü', 'u')
        : init + f,
    )
  }
}

describe('getInvnz 全音节表', () => {
  it.each(allSyllables)('%s → %s', (pinyin) => {
    const result = getInvnz(pinyin)
    expect(result).toBe(EXPECTED[pinyin])
  })
})
