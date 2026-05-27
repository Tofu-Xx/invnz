type M2O<K, V> = [K | K[], V]

export function m2oMap<K = string, V = string>(data: M2O<K, V>[]) {
  const map = new Map<K, V>()
  for (const [key, val] of data) {
    const keys = Array.isArray(key) ? key : [key]
    keys.forEach(el => map.set(el, val))
  }
  return map
}
