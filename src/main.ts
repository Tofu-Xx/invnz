import { getDirectSyllable } from './getDirectSyllable'
import { invenma2invenz } from './invenma2invenz'
import { pinyin2invenma } from './pinyin2invenma'

export function getInvnz(pinyin: string): string | null {
  const directSyllable = getDirectSyllable(pinyin)
  if (directSyllable)
    return directSyllable

  const invenma = pinyin2invenma(pinyin)
  if (invenma)
    return invenma2invenz(invenma)

  return null
}
