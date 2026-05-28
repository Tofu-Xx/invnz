export function m2oMap(data: (readonly [string | readonly string[], string])[]): ReadonlyMap<string, string> {
  const map = new Map<string, string>()
  for (const [key, val] of data) {
    const keys = Array.isArray(key) ? key : [key]
    keys.forEach(el => map.set(el, val))
  }
  return map
}
