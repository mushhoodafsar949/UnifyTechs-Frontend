import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Cookie,
  FileText,
  HeartPulse,
  Printer,
  Scale,
  Shield,
} from 'lucide-react'
import { LEGAL_PAGES } from '../data/legalContent'
import type { LegalSlug } from '../legal/routes'
import { DEFAULT_SITE_TITLE } from '../constants/documentTitle'

const COOKIE_STORAGE_KEY = 'unifytechs-cookie-prefs'

const SLUG_ICON: Record<LegalSlug, typeof Shield> = {
  privacy: Shield,
  terms: Scale,
  'hipaa-notice': HeartPulse,
  soc2: BadgeCheck,
  cookies: Cookie,
}

type CookiePrefs = {
  analytics: boolean
  marketing: boolean
}

const defaultCookiePrefs: CookiePrefs = { analytics: false, marketing: false }

function readCookiePrefs(): CookiePrefs {
  if (typeof localStorage === 'undefined') return { ...defaultCookiePrefs }
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY)
    if (!raw) return { ...defaultCookiePrefs }
    const p = JSON.parse(raw) as Partial<CookiePrefs>
    return {
      analytics: Boolean(p.analytics),
      marketing: Boolean(p.marketing),
    }
  } catch {
    return { ...defaultCookiePrefs }
  }
}

type LegalDocumentProps = {
  slug: LegalSlug
  theme: 'light' | 'dark'
}

export function LegalDocument({ slug, theme }: LegalDocumentProps) {
  const page = LEGAL_PAGES[slug]
  const [cookiePrefs, setCookiePrefs] = useState<CookiePrefs>(readCookiePrefs)
  const [savedHint, setSavedHint] = useState(false)
  const baseId = useId()
  const IconMast = SLUG_ICON[slug]

  const sectionIds = useMemo(
    () => page.sections.map((_, i) => `legal-sec-${slug}-${i}`),
    [page.sections, slug],
  )

  const tocItems = useMemo(
    () =>
      page.sections
        .map((s, i) => (s.heading ? { id: sectionIds[i]!, label: s.heading } : null))
        .filter((x): x is { id: string; label: string } => x !== null),
    [page.sections, sectionIds],
  )

  useEffect(() => {
    document.title = `${page.title} — UnifyTechs`
    return () => {
      document.title = DEFAULT_SITE_TITLE
    }
  }, [page.title])

  const goHome = useCallback(() => {
    window.location.hash = '#home'
    window.scrollTo(0, 0)
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const saveCookiePrefs = useCallback((next: CookiePrefs) => {
    setCookiePrefs(next)
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    setSavedHint(true)
    window.setTimeout(() => setSavedHint(false), 2500)
  }, [])

  const isLight = theme === 'light'

  return (
    <main
      className={isLight ? 'legal-doc legal-doc--light' : 'legal-doc legal-doc--dark'}
      id="main-legal"
    >
      <div className="legal-doc__masthead" aria-hidden>
        <div className="legal-doc__masthead-grid" />
        <div className="legal-doc__masthead-glow" />
      </div>

      <div className="container legal-doc__layout">
        {tocItems.length > 1 && (
          <aside className="legal-doc__toc" aria-label="On this page">
            <div className="legal-doc__toc-inner">
              <span className="legal-doc__toc-label">
                <FileText size={15} aria-hidden /> On this page
              </span>
              <ol className="legal-doc__toc-list">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#/${slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        window.history.replaceState(null, '', `#/${slug}`)
                        requestAnimationFrame(() => {
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                        })
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}

        <div className="legal-doc__column">
          <button type="button" className="legal-doc__back" onClick={goHome}>
            <ArrowLeft size={18} aria-hidden />
            Back to home
          </button>

          <div className="legal-doc__sheet">
            <header className="legal-doc__sheet-head">
              <div className="legal-doc__brand-mark">
                <span className="legal-doc__brand-icon" aria-hidden>
                  <IconMast size={26} strokeWidth={1.75} />
                </span>
                <span className="legal-doc__brand-text">Legal &amp; compliance</span>
              </div>
              <p className="legal-doc__subtitle">{page.subtitle}</p>
              <h1 className="legal-doc__title">{page.title}</h1>

              <div className="legal-doc__trust-strip">
                <div className="legal-doc__trust-item">
                  <span className="legal-doc__trust-k">Document</span>
                  <span className="legal-doc__trust-v mono">{page.docId}</span>
                </div>
                <div className="legal-doc__trust-div" aria-hidden />
                <div className="legal-doc__trust-item">
                  <span className="legal-doc__trust-k">Last updated</span>
                  <span className="legal-doc__trust-v">{page.updated}</span>
                </div>
                <div className="legal-doc__trust-div" aria-hidden />
                <div className="legal-doc__trust-item legal-doc__trust-item--wide">
                  <span className="legal-doc__trust-k">Audience</span>
                  <span className="legal-doc__trust-v">{page.audience}</span>
                </div>
              </div>

              <div className="legal-doc__actions no-print">
                <button type="button" className="legal-doc__btn-print" onClick={handlePrint}>
                  <Printer size={17} aria-hidden />
                  Print / PDF
                </button>
              </div>

              <p className="legal-doc__intro">{page.intro}</p>

              {page.highlights.length > 0 && (
                <ul className="legal-doc__highlights">
                  {page.highlights.map((h) => (
                    <li key={h}>
                      <span className="legal-doc__hi-ico" aria-hidden>
                        <CheckCircle2 size={17} strokeWidth={2.25} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {slug === 'cookies' && (
              <section className="legal-doc__cookies" aria-labelledby={`${baseId}-cookie-controls`}>
                <div className="legal-doc__cookies-head">
                  <span className="legal-doc__cookies-visual" aria-hidden>
                    <Cookie size={22} />
                  </span>
                  <div>
                    <h2 id={`${baseId}-cookie-controls`} className="legal-doc__h2 legal-doc__h2--flush">
                      Preference center
                    </h2>
                    <p className="legal-doc__cookies-lede">
                      Adjust optional categories for this browser. Strictly necessary storage cannot be disabled.
                    </p>
                  </div>
                </div>
                <div className="legal-doc__cookie-rows">
                  <div className="legal-doc__cookie-row legal-doc__cookie-row--locked">
                    <div>
                      <strong>Strictly necessary</strong>
                      <span>Session integrity, routing, fraud resistance, and load balancing.</span>
                    </div>
                    <span className="legal-doc__pill">Always on</span>
                  </div>
                  <label className="legal-doc__cookie-row">
                    <div>
                      <strong>Analytics</strong>
                      <span>Aggregated traffic and reliability metrics — no sale of personal data.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePrefs.analytics}
                      onChange={(e) => saveCookiePrefs({ ...cookiePrefs, analytics: e.target.checked })}
                      aria-describedby={`${baseId}-analytics-desc`}
                    />
                    <span id={`${baseId}-analytics-desc`} className="sr-only">
                      Toggle analytics cookies
                    </span>
                  </label>
                  <label className="legal-doc__cookie-row">
                    <div>
                      <strong>Marketing</strong>
                      <span>Product news, webinars, and event invitations — where permitted.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookiePrefs.marketing}
                      onChange={(e) => saveCookiePrefs({ ...cookiePrefs, marketing: e.target.checked })}
                      aria-describedby={`${baseId}-marketing-desc`}
                    />
                    <span id={`${baseId}-marketing-desc`} className="sr-only">
                      Toggle marketing cookies
                    </span>
                  </label>
                </div>
                {savedHint && (
                  <p className="legal-doc__saved" role="status">
                    Preferences saved on this device.
                  </p>
                )}
              </section>
            )}

            <article className="legal-doc__article">
              {page.sections.map((section, i) => (
                <section
                  key={section.heading ? `${section.heading}-${i}` : `s-${i}`}
                  id={section.heading ? sectionIds[i] : undefined}
                  className="legal-doc__block"
                >
                  {section.heading && (
                    <h2 className="legal-doc__h2">
                      <span className="legal-doc__h2-num">{String(i + 1).padStart(2, '0')}</span>
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="legal-doc__p">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="legal-doc__bullet-list">
                      {section.bullets.map((b) => (
                        <li key={b}>
                          <span className="legal-doc__bullet-dot" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            <footer className="legal-doc__footnote">
              <Shield size={18} aria-hidden />
              <p>
                This document is informational and does not constitute legal advice. Binding obligations are governed by executed
                agreements between your organization and UnifyTechs. For jurisdictional nuances, consult qualified counsel.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
