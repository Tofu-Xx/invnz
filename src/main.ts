import { getDirectSyllable } from './getDirectSyllable'
import { invenma2invenz } from './invenma2invenz'
import { pinyin2invenma } from './pinyin2invenma'

export function getIdsExps(pinyin: string): string {
  const directSyllable = getDirectSyllable(pinyin)
  if (directSyllable)
    return directSyllable

  return invenma2invenz(pinyin2invenma(pinyin))
}

const ZU_ZI_API = '/zi/'

export async function getInvnz(pinyinOrIds: string): Promise<string> {
  const ids = /^[⿰⿲⿱⿳⿸⿺⿹⿽⿵⿷⿶⿼⿴⿻⿾⿿㇯]/.test(pinyinOrIds) ? pinyinOrIds : getIdsExps(pinyinOrIds)
  if (!ids)
    return ''

  const url = `${ZU_ZI_API}${encodeURIComponent(ids)}.svg`
  try {
    const res = await fetch(url)
    if (!res.ok)
      return ''
    const text = await res.text()
    return text
  }
  catch {
    return ''
  }
}
