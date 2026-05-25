/**
 * 通用前缀匹配工具。
 *
 * 在给定字符串中，从起始位置查找第一个命中指定 key 的条目。
 * 条目按 key 长度降序排列，确保最长匹配优先（如 "zh" > "z"）。
 */

/**
 * 在字符串 `str` 中按 `keyFn` 提取的 key 做前缀匹配。
 *
 * @param str   被搜索的字符串
 * @param items 待匹配的条目数组
 * @param keyFn 从条目中提取 key 的函数
 * @returns 第一个匹配的条目，无匹配时返回 `undefined`
 */
export function match<T>(
  str: string,
  items: T[],
  keyFn: (item: T) => string,
): T | undefined {
  return items.find(item => str.startsWith(keyFn(item)))
}
