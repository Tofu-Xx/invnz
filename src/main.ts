import { finalMap, initialMap, Pinin2Hanz, voidInitialMap } from './data'

// 映射表匹配工具：按 key 长度降序，从 str 头部或尾部匹配首个存在的 key
// 项目全局复用——声母查找、零声母查找、韵母查找、介音查找均经由此函数
function match<T extends Record<string, string>>(
  str: keyof T extends string ? string : never, // 被匹配的源字符串（拼音或 pinin）
  map: T, // 映射表（initialMap / finalMap / voidInitialMap / Pinin2Hanz 子表）
  direction: 'start' | 'end' = 'start', // 匹配方向：start 为前缀，end 为后缀
): keyof T | undefined {
  // 按 key 长度降序排列，确保最长匹配优先（避免 "zh" 被 "z" 误吞、 "iang" 被 "ian" 误截）
  return Object.keys(map)
    .sort((a, b) => b.length - a.length)
    // 根据 direction 参数动态调用 startsWith 或 endsWith
    .find(key => str[`${direction}sWith`](key))
}

// 【核心步骤一】标准汉语拼音 → 注音拼音（pinin）
// 输入标准拼音（如 "zhong1"、"yu"），输出双字母注音拼音（如 "zhug"、"v"）
// 转换流水线：v→ü 归一 → 零声母整体处理 → 声母提取&映射 → 韵母提取&映射（jqx 后 u 变 ü）
export function pinyin2pinin(pinyin: string) {
  // 实际入参 pinyin：标准拼音字符串（无声调，可能有 v）
  pinyin = pinyin.replace(/v/g, 'ü')
  // 零声母查找：匹配 voidInitialMap 中 yi/wu/yu 等整体音节
  // 匹配后直接替换为 pinin 等价写法 + 截断余部，如 "yu" → "v"
  const voidKey = match(pinyin, voidInitialMap)
  if (voidKey) {
    pinyin = voidInitialMap[voidKey] + pinyin.slice(voidKey.length)
  }
  // 声母匹配（最长匹配原则，如 "zh" > "z"、"ch" > "c"），匹配失败时空字符串
  const initialUnreadable = match(pinyin, initialMap.unreadable) ?? ''
  const initialReadable = match(pinyin, initialMap.readable) ?? ''
  const isReadable = initialReadable.length > initialUnreadable.length
  const initialKey = isReadable ? initialReadable : initialUnreadable
  // 韵母部分：声母之后的剩余子串（紧接后缀截断，无二次匹配消耗）
  const finalKey = pinyin.slice(initialKey.length)
  // 可读声母（zh ch sh r z c s）后跟 i 时，i 非真实元音，直接以声母自身输出
  if (isReadable && finalKey === 'i') {
    return initialMap.readable[initialKey as keyof typeof initialMap.readable]
  }
  // 声母的 pinin 映射值（查 initialMap，绝大多数与 key 相同，仅做类型统一）
  const pininInitial = initialMap.unreadable[initialKey as keyof typeof initialMap.unreadable]
    ?? initialMap.readable[initialKey as keyof typeof initialMap.readable]
    ?? ''
  // 韵母的 pinin 映射值：需处理 jqx 后 u→ü 的特殊音变
  const pininFinal = /^[jqx]$/.test(pininInitial)
    // jqx 后方实际发 ü 音，将 key 中开头的 u 替换为 ü 再查 finalMap
    ? (() => {
        const key = finalKey.startsWith('u') ? `ü${finalKey.slice(1)}` : finalKey
        return finalMap[key as keyof typeof finalMap]
      })()
    // 非 jqx 声母，直接以原 finalKey 查表
    : finalMap[finalKey as keyof typeof finalMap] ?? ''
  // 拼接声母 + 韵母得完整 pinin，filter(Boolean) 排除任一侧为空的场景
  const pinin = [pininInitial, pininFinal]
    .filter(Boolean)
    .join('')
  return pinin
}

// 【核心步骤二】注音拼音（pinin）→ 汉字部件组合字符串
// 输入如 "zhug"，输出如 "⿰止⿹勹"（由 ⿰⿱⿸⿹⿵ 等部首指示符 + 部件构成）
// 解析策略：从左到右贪婪匹配，优先匹配声母 initial → 元音 vowel → 介音 final（介音需回退重组）
export function pinin2invnzChars(pinin: string) {
  // 待返回的结果栈，每项为 Pinin2Hanz 子表查出的部件组合字（或 undefined 占位）
  const result: (string | undefined)[] = []
  // 逐字符游标解析，每轮消耗 pinin 前缀直到耗尽
  while (pinin) {
    // 优先匹配声母表（Pinin2Hanz.initial），未命中则退而匹配元音表（Pinin2Hanz.vowel）
    // 逻辑优化：仅在 result 为空（首个位置）尝试声母，后续位置仅匹配元音
    const pininChar = result.length === 0
      && match(pinin, Pinin2Hanz.initial)
      || match(pinin, Pinin2Hanz.vowel)
    // 游标前移：消耗匹配到的 key 长度（未匹配时 slice(undefined) 不移动）
    pinin = pinin.slice(pininChar?.length)
    if (pininChar) {
      // 成功匹配声母或元音：查对应子表，去重（优先 initial，fallback 到 vowel），压栈
      // 若匹配到 n/g 且消耗了全部 pinin，说明是零声母音节的韵尾，应作为介音处理
      if (Pinin2Hanz.final[pininChar as keyof typeof Pinin2Hanz.final] && !pinin) {
        result.push(Pinin2Hanz.final[pininChar as keyof typeof Pinin2Hanz.final])
      }
      else {
        result.push(Pinin2Hanz.initial[pininChar as keyof typeof Pinin2Hanz.initial] ?? Pinin2Hanz.vowel[pininChar as keyof typeof Pinin2Hanz.vowel])
      }
    }
    else {
      // 既非声母也非元音，尝试匹配介音（Pinin2Hanz.final：n 或 g，对应韵尾冂/勹）
      const finalPininChar = match(pinin, Pinin2Hanz.final)
      if (!finalPininChar) {
        // 无可识别字符，终止解析（残余 pinin 被丢弃）
        break
      }
      // 消耗介音长度
      pinin = pinin.slice(finalPininChar.length)
      // 介音属于上一个字符的韵尾：弹出上一字，重新压入 [介音组合字, 原上一字]
      const prev = result.pop()
      result.push(Pinin2Hanz.final[finalPininChar], prev)
    }
  }
  // 收尾规则：每个输出字的末位部件即为最终部首（取字符串最后一个字符）
  result[result.length - 1] = result[result.length - 1]?.at(-1)
  // 特殊书写规则：若末字为"一"，将首字首位部首替换为"⿱"（表示上下覆盖结构）
  // 如 [⿰木, 一] → [⿱木, 一]，避免末位单字过于单薄
  if (result.at(-1) === '一' && result.length === 2 && typeof result[0] === 'string' && result[0].length > 1) {
    result[0] = `⿱${result[0].slice(1)}`
  }
  // 过滤掉因重组遗留的 undefined 占位，合并为最终输出
  return result.filter(Boolean).join('')
}
