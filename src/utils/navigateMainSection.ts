import { parseSiteHash } from '../legal/routes'

/**
 * Navigate to an on-homepage section anchor (`#home`, `#services`, …).
 * When viewing a satellite route (`#/blog`, `#/press`, `#/privacy`, …),
 * {@link window.history.replaceState} does **not** fire `hashchange`, so React never
 * switches back to the main layout — use `location.hash` so `App`'s listener runs.
 */
export function navigateToMainSection(sectionId: string): void {
  const onSatelliteRoute = parseSiteHash(window.location.hash) !== null
  if (onSatelliteRoute) {
    window.location.hash = `#${sectionId}`
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}#${sectionId}`,
  )
}
