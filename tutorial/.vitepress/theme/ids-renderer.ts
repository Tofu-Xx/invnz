import { GLYPHS, UNITS_PER_EM } from './invnz-glyphs'

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
      const op = c
      pos++
      const a = parse()
      const b = parse()
      if (!a || !b)
        return null
      return { t: 'ids', op, a, b }
    }
    if (c.trim()) {
      pos++
      return { t: 'char', c }
    }
    pos++
    return parse()
  }
  return parse()
}

function renderIds(tree: IdsTree, size: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', String(size))
  svg.setAttribute('height', String(size))
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`)
  svg.setAttribute('fill', 'currentColor')

  function draw(node: IdsTree, x: number, y: number, w: number, h: number) {
    if (!node)
      return
    if (node.t === 'char') {
      const glyph = GLYPHS[node.c]
      if (glyph) {
        const scale = Math.min(w, h) * 0.8 / UNITS_PER_EM
        const contentW = glyph.w * scale
        const contentH = glyph.h * scale
        const tx = x + (w - contentW) / 2 - glyph.x * scale
        const ty = y + (h - contentH) / 2 - glyph.y * scale
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', glyph.d)
        path.setAttribute('transform', `translate(${tx}, ${ty}) scale(${scale})`)
        svg.appendChild(path)
      }
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

    const tree = parseIds(text)
    if (!tree) {
      code.setAttribute('data-ids-rendered', 'skip')
      return
    }

    const fontSize = Number.parseFloat(getComputedStyle(code).fontSize) || 16
    const svg = renderIds(tree, 100)
    svg.style.width = `${fontSize}px`
    svg.style.height = `${fontSize}px`
    svg.style.overflow = 'visible'
    svg.style.display = 'inline-block'
    svg.style.verticalAlign = 'middle'

    code.textContent = ''
    code.appendChild(svg)
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

  function run(): void {
    replaceIdsInCodeElements()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run)
  }
  else {
    run()
  }

  let timeout: ReturnType<typeof setTimeout>
  const observer = new MutationObserver(() => {
    clearTimeout(timeout)
    timeout = setTimeout(run, 50)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
