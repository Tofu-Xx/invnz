export function pinyin2invnma(pinyin: string) {
  return `${pinyin}映射为音韵码`
}
export function invnma2invnz(invnma: string) {
  return `${invnma}映射为音韵字`
}
export function pinyin2invnz(pinyin: string): string {
  return invnma2invnz(pinyin2invnma(pinyin))
}
