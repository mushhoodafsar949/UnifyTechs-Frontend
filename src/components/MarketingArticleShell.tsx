import { useCallback, useEffect, useId, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, FileText, Megaphone } from 'lucide-react'
import type { ThemeMode } from '../theme'
import { DEFAULT_SITE_TITLE } from '../constants/documentTitle'
import { Reveal } from './Reveal'
import { parseInlineRichText } from '../utils/marketingRichText'

export type MarketingFigure =
  | { mode: 'image'; src: string; alt: string }
  | {
      mode: 'officialPdf'
      alt: string
      embedUrl: string
      heading: string
      cmsLandingUrl: string
    }

export type MarketingSection = {
  heading: string
  paragraphs: readonly string[]
  bullets?: readonly string[]
  illustration?: MarketingFigure
}

type MarketingArticleShellProps = {
  theme: ThemeMode
  variant: 'blog' | 'press'
  title: string
  subtitle: string
  updated: string
  metaDescription: string
  documentTitle: string
  intro: string
  sections: readonly MarketingSection[]
  /** Wide hero image above the article card (blog). */
  heroVisual?: { src: string; alt: string }
}

export function MarketingArticleShell({
  theme,
  variant,
  title,
  subtitle,
  updated,
  metaDescription,
  documentTitle,
  intro,
  sections,
  heroVisual,
}: MarketingArticleShellProps) {
  const baseId = useId()
  const isLight = theme === 'light'
  const Icon = variant === 'blog' ? BookOpen : Megaphone
  const eyebrow = variant === 'blog' ? 'Blog' : 'Press'
  const isBlogRich = variant === 'blog' && Boolean(heroVisual)

  const sectionIds = useMemo(
    () => sections.map((_, i) => `marketing-sec-${variant}-${i}`),
    [sections, variant],
  )

  const tocItems = useMemo(
    () => sections.map((s, i) => ({ id: sectionIds[i]!, label: s.heading })),
    [sections, sectionIds],
  )

  useEffect(() => {
    document.title = documentTitle
    const meta = document.querySelector('meta[name="description"]')
    const prev = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', metaDescription)
    return () => {
      document.title = DEFAULT_SITE_TITLE
      meta?.setAttribute('content', prev)
    }
  }, [documentTitle, metaDescription])

  useEffect(() => {
    const id = `seo-jsonld-${variant}`
    const schema =
      variant === 'blog'
        ? {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description: metaDescription,
            datePublished: '2025-04-01',
            dateModified: '2025-04-21',
            author: { '@type': 'Organization', name: 'UnifyTechs' },
            publisher: { '@type': 'Organization', name: 'UnifyTechs', url: 'https://unifytechs.us/' },
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: metaDescription,
          }
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [variant, title, metaDescription, updated])

  /** SPA route hash for this page — TOC must not use bare #section ids or they replace #/blog and unload the article. */
  const routeHash = variant === 'blog' ? '#/blog' : '#/press'

  const goHome = useCallback(() => {
    window.location.hash = '#home'
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      window.history.replaceState(null, '', routeHash)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [routeHash],
  )

  return (
    <main
      className={isLight ? 'legal-doc legal-doc--light' : 'legal-doc legal-doc--dark'}
      id={`main-${variant}`}
    >
      <div className="legal-doc__masthead" aria-hidden>
        <div className="legal-doc__masthead-grid" />
        <div className="legal-doc__masthead-glow" />
      </div>

      <div
        className={`container legal-doc__layout ${isBlogRich ? 'legal-doc__layout--blog-rich' : ''}`}
      >
        <aside className="legal-doc__toc" aria-label="On this page">
          <div className="legal-doc__toc-inner">
            <span className="legal-doc__toc-label">
              <FileText size={15} aria-hidden /> On this page
            </span>
            <ol className="legal-doc__toc-list">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={routeHash}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.id)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className={`legal-doc__column ${isBlogRich ? 'legal-doc__column--blog-rich' : ''}`}>
          <button type="button" className="legal-doc__back" onClick={goHome}>
            <ArrowLeft size={18} aria-hidden />
            Back to home
          </button>

          {heroVisual && (
            <motion.div
              className="marketing-article__hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="marketing-article__hero-frame">
                <img
                  className="marketing-article__hero-img"
                  src={heroVisual.src}
                  alt={heroVisual.alt}
                  width={1600}
                  height={900}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="marketing-article__hero-scrim" aria-hidden />
                <p className="marketing-article__hero-eyebrow">
                  Insights · Claims automation · EDI &amp; RCM
                </p>
              </div>
            </motion.div>
          )}

          <div className={`legal-doc__sheet ${isBlogRich ? 'legal-doc__sheet--blog-rich' : ''}`}>
            <header className="legal-doc__sheet-head">
              <div className="legal-doc__brand-mark">
                <span className="legal-doc__brand-icon" aria-hidden>
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <span className="legal-doc__brand-text">{eyebrow}</span>
              </div>
              <p className="legal-doc__subtitle">{parseInlineRichText(subtitle)}</p>
              <h1 className="legal-doc__title">{title}</h1>

              <div className="legal-doc__trust-strip">
                <div className="legal-doc__trust-item">
                  <span className="legal-doc__trust-k">Last updated</span>
                  <span className="legal-doc__trust-v">{updated}</span>
                </div>
                <div className="legal-doc__trust-div" aria-hidden />
                <div className="legal-doc__trust-item legal-doc__trust-item--wide">
                  <span className="legal-doc__trust-k">Focus</span>
                  <span className="legal-doc__trust-v">US healthcare · claim automation · RCM</span>
                </div>
              </div>

              <p className="legal-doc__intro">{parseInlineRichText(intro)}</p>
            </header>

            <article className="legal-doc__article" aria-labelledby={`${baseId}-h1`}>
              <span id={`${baseId}-h1`} className="sr-only">
                {title}
              </span>
              {sections.map((section, i) => {
                const hasIllustration = Boolean(section.illustration)
                const body = (
                  <>
                    <h2 className="legal-doc__h2">
                      <span className="legal-doc__h2-num">{String(i + 1).padStart(2, '0')}</span>
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="legal-doc__p">
                        {parseInlineRichText(p)}
                      </p>
                    ))}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="legal-doc__bullet-list">
                        {section.bullets.map((b) => (
                          <li key={b}>
                            <span className="legal-doc__bullet-dot" aria-hidden />
                            {parseInlineRichText(b)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )

                return (
                  <Reveal key={section.heading} delay={i * 0.05}>
                    <section
                      id={sectionIds[i]}
                      className={`legal-doc__block ${hasIllustration ? 'marketing-article__section' : ''}`}
                    >
                      {hasIllustration && section.illustration ? (
                        <div
                          className={`marketing-article__split ${
                            i % 2 === 1 ? 'marketing-article__split--flip' : ''
                          }`}
                        >
                          <div className="marketing-article__copy">{body}</div>
                          <figure
                            className={`marketing-article__figure ${
                              section.illustration.mode === 'officialPdf'
                                ? 'marketing-article__figure--official-pdf'
                                : ''
                            }`}
                          >
                            {section.illustration.mode === 'image' ? (
                              <>
                                <motion.img
                                  className="marketing-article__figure-img"
                                  src={section.illustration.src}
                                  alt={section.illustration.alt}
                                  loading="lazy"
                                  decoding="async"
                                  width={920}
                                  height={613}
                                  initial={{ opacity: 0.88, scale: 0.97 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true, amount: 0.25 }}
                                  transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                                <motion.div
                                  className="marketing-article__figure-ring"
                                  aria-hidden
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, delay: 0.08 }}
                                />
                              </>
                            ) : (
                              <>
                                <div
                                  className="marketing-article__official-pdf"
                                  role="group"
                                  aria-label={section.illustration.alt}
                                >
                                  <div className="marketing-article__official-pdf-head">
                                    <span className="marketing-article__official-pdf-heading">
                                      {section.illustration.heading}
                                    </span>
                                    <a
                                      className="marketing-article__official-pdf-source"
                                      href={section.illustration.cmsLandingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      CMS.gov file
                                    </a>
                                  </div>
                                  <div className="marketing-article__official-pdf-clip">
                                    <iframe
                                      className="marketing-article__official-pdf-iframe"
                                      title={section.illustration.heading}
                                      src={`${section.illustration.embedUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                    />
                                  </div>
                                </div>
                                <motion.div
                                  className="marketing-article__figure-ring"
                                  aria-hidden
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.6, delay: 0.08 }}
                                />
                              </>
                            )}
                          </figure>
                        </div>
                      ) : (
                        body
                      )}
                    </section>
                  </Reveal>
                )
              })}
            </article>

            <footer className="legal-doc__footnote">
              <Megaphone size={18} aria-hidden />
              <p>
                Educational overview for US healthcare operators evaluating medical claim automation software and revenue cycle
                automation; not clinical, legal, or payer-specific advice. See our{' '}
                <a href="#/terms">Terms</a>{' '}
                and book a demo for product specifics.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  )
}
