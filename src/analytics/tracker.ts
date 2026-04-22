/**
 * First-party visitor-analytics tracker.
 *
 * Responsibilities:
 *  - POST a "pageview" on app mount and on every hash-route change.
 *  - Send a "heartbeat" every N seconds while the tab is visible + focused,
 *    so time-on-page reflects *active* time, not idle wall-clock time.
 *  - Flush a final "leave" beacon on `pagehide` / `visibilitychange:hidden`
 *    using `navigator.sendBeacon`, which survives the browser tearing the
 *    page down during navigation.
 *
 * The backend identifies the visitor via HttpOnly cookies (`uv_id`, `uv_sid`),
 * so no PII is stored in localStorage and the client doesn't need to read the
 * cookies itself. `credentials: 'include'` on fetch ensures cookies flow on
 * cross-origin dev calls; in production the Netlify edge proxy keeps us
 * same-origin and cookies flow automatically.
 */
import { apiBaseUrl } from '../config'

interface TrackerState {
  pageViewId: string | null
  sessionId: string | null
  visitorId: string | null
  /** Server-advertised heartbeat cadence; the server can tune this without a redeploy. */
  heartbeatIntervalSeconds: number
  /** Seconds the current page has been active since the last flush. */
  pendingActiveSeconds: number
  /** Monotonic tick used to build pendingActiveSeconds while visible & focused. */
  tickHandle: number | null
  heartbeatHandle: number | null
}

const TICK_INTERVAL_MS = 1000

const state: TrackerState = {
  pageViewId: null,
  sessionId: null,
  visitorId: null,
  heartbeatIntervalSeconds: 15,
  pendingActiveSeconds: 0,
  tickHandle: null,
  heartbeatHandle: null,
}

const CONSENT_KEY = 'unifytechs-analytics-consent'
type ConsentValue = 'granted' | 'denied'

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* ignore — tracker stays silent when storage is blocked */
  }
  if (value === 'granted' && state.pageViewId === null) {
    // Fire the page-view we skipped earlier, so the first recorded hit
    // lines up with when consent was given.
    void recordPageView()
  } else if (value === 'denied') {
    stop()
  }
}

function isTabActive(): boolean {
  return document.visibilityState === 'visible' && document.hasFocus()
}

function parseUtm() {
  // UTMs may live in the ?query or after the #hash. We also support
  // `#/path?utm_source=x` which React hash-routers sometimes produce.
  const search = window.location.search
  const hashQuery = window.location.hash.includes('?')
    ? window.location.hash.slice(window.location.hash.indexOf('?'))
    : ''
  const merged = new URLSearchParams(search + (hashQuery.startsWith('?') ? '&' + hashQuery.slice(1) : ''))
  return {
    utmSource: merged.get('utm_source') ?? undefined,
    utmMedium: merged.get('utm_medium') ?? undefined,
    utmCampaign: merged.get('utm_campaign') ?? undefined,
  }
}

function currentPath(): string {
  // We prefer the hash for a hash-routed SPA but fall back to pathname.
  const hash = window.location.hash || ''
  const cleanHash = hash.includes('?') ? hash.slice(0, hash.indexOf('?')) : hash
  return cleanHash || window.location.pathname || '/'
}

function buildUrl(path: string): string {
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path
}

async function recordPageView(): Promise<void> {
  // Flush any active time from the previous page before overwriting state.pageViewId.
  await flushHeartbeat()

  const utm = parseUtm()
  const body = {
    path: currentPath(),
    title: document.title,
    referrer: document.referrer || undefined,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    ...utm,
  }

  try {
    const res = await fetch(buildUrl('/api/analytics/pageview'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
      keepalive: true,
    })
    if (!res.ok) return
    const data = (await res.json()) as {
      pageViewId: string
      sessionId: string
      visitorId: string
      heartbeatIntervalSeconds: number
    }
    state.pageViewId = data.pageViewId
    state.sessionId = data.sessionId
    state.visitorId = data.visitorId
    state.heartbeatIntervalSeconds = Math.max(5, data.heartbeatIntervalSeconds || 15)
    state.pendingActiveSeconds = 0
  } catch {
    /* network hiccup — ignore; the next hashchange will try again */
  }
}

async function flushHeartbeat(): Promise<void> {
  if (!state.pageViewId || state.pendingActiveSeconds <= 0) return
  const delta = state.pendingActiveSeconds
  state.pendingActiveSeconds = 0
  try {
    await fetch(buildUrl('/api/analytics/heartbeat'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ pageViewId: state.pageViewId, deltaSeconds: delta }),
      keepalive: true,
    })
  } catch {
    // Give the lost seconds back so the next flush includes them.
    state.pendingActiveSeconds += delta
  }
}

function sendLeaveBeacon(): void {
  if (!state.pageViewId) return
  const payload = JSON.stringify({
    pageViewId: state.pageViewId,
    finalDeltaSeconds: state.pendingActiveSeconds,
  })
  state.pendingActiveSeconds = 0

  // sendBeacon is the only transport the browser guarantees will survive
  // `pagehide`. It always uses a text/plain Content-Type, which the server
  // is configured to parse manually (see AnalyticsController.Leave).
  const url = buildUrl('/api/analytics/leave')
  const blob = new Blob([payload], { type: 'application/json' })
  const ok = navigator.sendBeacon?.(url, blob)
  if (!ok) {
    // Fallback: a best-effort fetch with keepalive may still go out before the unload.
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: payload,
      keepalive: true,
    }).catch(() => {})
  }
}

function tick(): void {
  if (!state.pageViewId) return
  if (isTabActive()) state.pendingActiveSeconds += 1
}

function start(): void {
  if (state.tickHandle !== null) return

  state.tickHandle = window.setInterval(tick, TICK_INTERVAL_MS)
  state.heartbeatHandle = window.setInterval(() => {
    void flushHeartbeat()
  }, state.heartbeatIntervalSeconds * 1000)

  window.addEventListener('hashchange', onHashChange)
  window.addEventListener('popstate', onHashChange)
  document.addEventListener('visibilitychange', onVisibilityChange)
  window.addEventListener('pagehide', onPageHide)
  window.addEventListener('beforeunload', onPageHide)
}

function stop(): void {
  if (state.tickHandle !== null) window.clearInterval(state.tickHandle)
  if (state.heartbeatHandle !== null) window.clearInterval(state.heartbeatHandle)
  state.tickHandle = null
  state.heartbeatHandle = null
  window.removeEventListener('hashchange', onHashChange)
  window.removeEventListener('popstate', onHashChange)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  window.removeEventListener('pagehide', onPageHide)
  window.removeEventListener('beforeunload', onPageHide)
}

function onHashChange(): void {
  void recordPageView()
}

function onVisibilityChange(): void {
  if (document.visibilityState === 'hidden') {
    void flushHeartbeat()
  }
}

function onPageHide(): void {
  sendLeaveBeacon()
}

export function initTracker(): void {
  // Recording an anonymous, first-party, no-third-party-sharing page-view is
  // broadly considered "strictly necessary" analytics under GDPR recital 26.
  // If your jurisdiction requires explicit opt-in, flip this to
  // `if (getConsent() !== 'granted') return` and also start() from setConsent.
  if (getConsent() === 'denied') return
  start()
  void recordPageView()
}
