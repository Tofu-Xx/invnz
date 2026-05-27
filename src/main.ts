import { splitSyllable } from './pinyin2invenma'
export { directSyllable, splitSyllable, type DirectResult } from './pinyin2invenma'

/** pinyin → invnma */
export function pinyin2invnma(pinyin: string): string {
  return splitSyllable(pinyin).join('')
}

/** invnma → invenz (not implemented yet) */
export function invnma2invnz(_invnma: string): string {
  throw new Error('not implemented')
}

/** invenz → invnma (not implemented yet) */
export function invnz2invnma(_invnz: string): string {
  throw new Error('not implemented')
}

/** pinyin → invenz (via invnma) */
export function pinyin2invnz(pinyin: string): string {
  const invnma = pinyin2invnma(pinyin)
  return invnma2invnz(invnma)
}

/** invnma → pinyin (not implemented yet) */
export function invnma2pinyin(_invnma: string): string {
  throw new Error('not implemented')
}

/** invenz → pinyin (not implemented yet) */
export function invnz2pinyin(_invnz: string): string {
  throw new Error('not implemented')
}

// Short-name aliases for gentest.ts
export const pinyin2invn = pinyin2invnma
export const invn2invnz = invnma2invnz
export const invnz2invn = invnz2invnma
export const invn2pinyin = invnma2pinyin
