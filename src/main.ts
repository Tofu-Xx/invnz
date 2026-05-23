import { finalMap, initialMap, Pinin2Hanz, voidInitialMap } from './data'

function match<T extends Record<string, string>>(
  str: keyof T extends string ? string : never,
  map: T,
  direction: 'start' | 'end' = 'start',
): keyof T | undefined {
  return Object.keys(map)
    .sort((a, b) => b.length - a.length) // 🔥 最长匹配优先
    .find(key => str[`${direction}sWith`](key))
}

export function pinyin2pinin(pinyin: string) {
  // v 替换为 ü
  pinyin = pinyin.replace(/v/g, 'ü')
  // ✅ 1. 零声母处理（只匹配一次）
  const voidKey = match(pinyin, voidInitialMap)
  if (voidKey) {
    pinyin = voidInitialMap[voidKey] + pinyin.slice(voidKey.length)
  }

  // ✅ 2. 声母提取（最长匹配）
  const initialKey = match(pinyin, initialMap) ?? ''

  // ✅ 3. 韵母提取（严格前缀截断）
  const finalKey = pinyin.slice(initialKey.length)

  /* jqx不用i */
  const pininInitial = initialMap[initialKey as keyof typeof initialMap] ?? ''
  const pininFinal = /^[jqx]$/.test(pininInitial)
    ? finalMap[finalKey as keyof typeof finalMap].replace(/^i/, '') // 第一个字符是i的话就删除
    : finalMap[finalKey as keyof typeof finalMap] ?? ''

  /* pinin */
  const pinin = [pininInitial, pininFinal]
    .filter(Boolean)
    .join('')
  return pinin
}

export function pinin2invnzChars(pinin: string) {
  const result: (string | undefined)[] = []
  while (pinin) {
    const pininChar = result.length === 0
      && match(pinin, Pinin2Hanz.initial)
      || match(pinin, Pinin2Hanz.vowel)
    pinin = pinin.slice(pininChar?.length)
    if (pininChar) {
      result.push(Pinin2Hanz.initial[pininChar as keyof typeof Pinin2Hanz.initial] ?? Pinin2Hanz.vowel[pininChar as keyof typeof Pinin2Hanz.vowel])
    }
    else {
      const finalPininChar = match(pinin, Pinin2Hanz.final)
      if (!finalPininChar) {
        break
      }
      pinin = pinin.slice(finalPininChar.length)
      const prev = result.pop()
      result.push(Pinin2Hanz.final[finalPininChar], prev)
    }
  }

  result[result.length - 1] = result[result.length - 1]?.at(-1)
  // 如果最后一个字符是“一”，将第一个项的首字符替换为“⿱”
  if (result.at(-1) === '一' && typeof result[0] === 'string' && result[0].length > 0) {
    result[0] = `⿱${result[0].slice(1)}`
  }
  return result.filter(Boolean).join('')
}
