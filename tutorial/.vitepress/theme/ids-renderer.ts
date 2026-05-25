import { CHAR_SVGS, IDS_SVGS, SVG_SIZE } from './invnz-glyphs'

const IDC = '⿰⿱⿸⿹⿵'

interface CharNode {
  t: 'char'
  c: string
}

interface IdsNode {
  t: 'ids'
  op: string
  a: CharNode | IdsNode
  b: CharNode | IdsNode
}

type IdsTree = CharNode | IdsNode | null

function isIdc(c: string): boolean {
  return IDC.includes(c)
}

function parseIds(str: string): IdsTree {
  let pos = 0
  function parse(): IdsTree {
    if (pos >= str.length)
      return null
    const c = str[pos]
    if (isIdc(c)) {
      const op = c; pos++
      const a = parse(); const b = parse()
      if (!a || !b)
        return null
      return { t: 'ids', op, a, b }
    }
    if (c.trim()) { pos++; return { t: 'char', c } }
    pos++; return parse()
  }
  return parse()
}

function createSvg(size: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`)
  svg.setAttribute('fill', 'currentColor')
  return svg
}

function createPaths(svg: SVGSVGElement, strokes: string[]) {
  for (const d of strokes) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', d)
    svg.appendChild(path)
  }
}

/** 直接使用预取的完整 IDS SVG 数据 */
function renderPrefetched(text: string, size: number): SVGSVGElement | null {
  const data = IDS_SVGS[text]
  if (!data)
    return null
  const svg = createSvg(size)
  svg.setAttribute('viewBox', `0 0 ${SVG_SIZE} ${SVG_SIZE}`)
  createPaths(svg, data.strokes)
  return svg
}

/** 兜底：用单个字的笔画数据通过 IDS 布局规则组合 */
function renderFallback(tree: IdsTree, size: number): SVGSVGElement {
  const svg = createSvg(size)
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`)

  function draw(node: IdsTree, x: number, y: number, w: number, h: number) {
    if (!node)
      return
    if (node.t === 'char') {
      const data = CHAR_SVGS[node.c]
      if (!data)
        return
      const scale = Math.min(w, h) * 0.85 / SVG_SIZE
      const tx = x + (w - SVG_SIZE * scale) / 2
      const ty = y + (h - SVG_SIZE * scale) / 2
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('transform', `translate(${tx}, ${ty}) scale(${scale})`)
      for (const d of data.strokes) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', d)
        g.appendChild(path)
      }
      svg.appendChild(g)
      return
    }
    switch (node.op) {
      case '⿰':
        draw(node.a, x, y, w / 2, h)
        draw(node.b, x + w / 2, y, w / 2, h)
        break
      case '⿱':
        draw(node.a, x, y, w, h / 2)
        draw(node.b, x, y + h / 2, w, h / 2)
        break
      case '⿵':
        draw(node.a, x, y, w, h * 0.35)
        draw(node.b, x, y + h * 0.35, w, h * 0.65)
        break
      case '⿹':
        draw(node.a, x + w * 0.5, y, w * 0.5, h * 0.4)
        draw(node.b, x, y + h * 0.15, w, h * 0.85)
        break
      case '⿸':
        draw(node.a, x, y, w * 0.5, h * 0.4)
        draw(node.b, x, y + h * 0.15, w, h * 0.85)
        break
    }
  }

  draw(tree, 0, 0, size, size)
  return svg
}

function replaceIdsInCodeElements(): void {
  const codeElements = document.querySelectorAll('code:not([data-ids-rendered])')
  codeElements.forEach((code) => {
    const text = code.textContent || ''
    if (!isIdc(text[0])) {
      code.setAttribute('data-ids-rendered', 'skip')
      return
    }

    const fontSize = Number.parseFloat(getComputedStyle(code).fontSize) || 16

    // 1. Try pre-fetched exact match
    const preSvg = renderPrefetched(text, 100)
    if (preSvg) {
      preSvg.style.width = `${fontSize}px`
      preSvg.style.height = `${fontSize}px`
      preSvg.style.overflow = 'visible'
      preSvg.style.display = 'inline-block'
      preSvg.style.verticalAlign = 'middle'
      code.textContent = ''
      code.appendChild(preSvg)
      code.setAttribute('data-ids-rendered', 'yes')
      return
    }

    // 2. Fallback: parse tree and compose from individual chars
    const tree = parseIds(text)
    if (!tree) {
      code.setAttribute('data-ids-rendered', 'skip')
      return
    }

    const fbSvg = renderFallback(tree, 100)
    fbSvg.style.width = `${fontSize}px`
    fbSvg.style.height = `${fontSize}px`
    fbSvg.style.overflow = 'visible'
    fbSvg.style.display = 'inline-block'
    fbSvg.style.verticalAlign = 'middle'

    code.textContent = ''
    code.appendChild(fbSvg)
    code.setAttribute('data-ids-rendered', 'yes')
  })
}

let started = false

export function startIdsRenderer(): void {
  if (started)
    return
  started = true
  if (typeof window === 'undefined' || typeof document === 'undefined')
    return

  function run() { replaceIdsInCodeElements() }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', run)
  else run()

  let timeout: ReturnType<typeof setTimeout>
  const observer = new MutationObserver(() => {
    clearTimeout(timeout)
    timeout = setTimeout(run, 50)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
