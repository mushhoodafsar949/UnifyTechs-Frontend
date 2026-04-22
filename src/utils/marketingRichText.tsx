import type { ReactNode } from 'react'

/**
 * Inline emphasis for marketing/legal prose: wrap phrases in `**double asterisks**`
 * to render bold, highlighted `<strong class="legal-doc__emph">` spans.
 */
export function parseInlineRichText(text: string): ReactNode {
  if (!text.includes('**')) return text

  const nodes: ReactNode[] = []
  let rest = text
  let k = 0

  while (rest.length > 0) {
    const open = rest.indexOf('**')
    if (open === -1) {
      nodes.push(rest)
      break
    }
    if (open > 0) nodes.push(rest.slice(0, open))

    const afterOpen = rest.slice(open + 2)
    const close = afterOpen.indexOf('**')
    if (close === -1) {
      nodes.push(rest.slice(open))
      break
    }

    const inner = afterOpen.slice(0, close)
    nodes.push(
      <strong key={`rich-${k++}`} className="legal-doc__emph">
        {inner}
      </strong>,
    )
    rest = afterOpen.slice(close + 2)
  }

  return <>{nodes}</>
}
