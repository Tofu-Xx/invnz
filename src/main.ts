import { getDirectSyllable } from './getDirectSyllable'
import { invenma2invenz } from './invenma2invenz'
import { pinyin2invenma } from './pinyin2invenma'

/**
 * Return IDS expression (e.g. '⿰丩⿱五巿') for a given pinyin.
 */
export function getIdsExps(pinyin: string): string {
  const directSyllable = getDirectSyllable(pinyin)
  if (directSyllable)
    return directSyllable

  return invenma2invenz(pinyin2invenma(pinyin))
}

const ZU_ZI_API = 'http://zu.zi.tools/'

/**
 * Fetch SVG (raw SVG text) for the IDS expression or pinyin.
 * If called with pinyin, it will first obtain IDS via getIdsExps.
 */
export async function getInvnz(pinyinOrIds: string): Promise<string | null> {
  // If the input already looks like an IDS (starts with an IDC or single char),
  // use it directly; otherwise, resolve via getIdsExps.
  const isIds = /^[⿰⿲⿱⿳⿸⿺⿹⿽⿵⿷⿶⿼⿴⿻⿾⿿㇯]/.test(pinyinOrIds) || pinyinOrIds.length === 1
  const ids = isIds ? pinyinOrIds : getIdsExps(pinyinOrIds)
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
