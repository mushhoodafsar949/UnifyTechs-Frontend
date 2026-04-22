export const LEGAL_SLUGS = ['privacy', 'terms', 'hipaa-notice', 'soc2', 'cookies'] as const

export type LegalSlug = (typeof LEGAL_SLUGS)[number]

/** Hash routes outside the single-page scroll view: `/blog`, `/press`, `/team`,
 *  plus legal slugs. */
export const MARKETING_SLUGS = ['blog', 'press', 'team'] as const

export type MarketingSlug = (typeof MARKETING_SLUGS)[number]

/** Solution deep-dive pages served under `#/solutions/<id>` — one per product capability. */
export const SOLUTION_SLUGS = ['ocr', 'eligibility', 'codes', 'denials', 'integrations'] as const

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number]

export type SiteHashSlug = LegalSlug | MarketingSlug

export function parseSiteHash(hash: string): SiteHashSlug | null {
  const raw = hash.replace(/^#/, '')
  if (!raw.startsWith('/')) return null
  const segment = raw.slice(1).split('/')[0]
  const all = [...LEGAL_SLUGS, ...MARKETING_SLUGS] as readonly string[]
  return all.includes(segment) ? (segment as SiteHashSlug) : null
}

/** Picks the solution id from `#/solutions/<id>` — returns null for all other hashes. */
export function parseSolutionSlug(hash: string): SolutionSlug | null {
  const raw = hash.replace(/^#/, '')
  if (!raw.startsWith('/solutions/')) return null
  const segment = raw.slice('/solutions/'.length).split('/')[0]
  return (SOLUTION_SLUGS as readonly string[]).includes(segment)
    ? (segment as SolutionSlug)
    : null
}

export function isLegalSlug(s: SiteHashSlug): s is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(s as string)
}

export function legalHash(slug: LegalSlug): string {
  return `#/${slug}`
}

export function marketingHash(slug: MarketingSlug): string {
  return `#/${slug}`
}

export function solutionHash(slug: SolutionSlug): string {
  return `#/solutions/${slug}`
}
