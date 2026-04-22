import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Plug2, Sparkles, TrendingUp } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SolutionHeroArt } from '../components/SolutionHeroArt'
import { SolutionProcessFlow } from '../components/SolutionProcessFlow'
import { SOLUTIONS, SOLUTION_ORDER } from '../data/solutions'
import { DEFAULT_SITE_TITLE } from '../constants/documentTitle'
import { type SolutionSlug, solutionHash } from '../legal/routes'

type SolutionPageProps = {
  slug: SolutionSlug
}

function handleBackToSite(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  window.history.pushState('', '', window.location.pathname + '#services')
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

function scrollToId(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.history.pushState('', '', window.location.pathname + `#${id}`)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}

export function SolutionPage({ slug }: SolutionPageProps) {
  const solution = SOLUTIONS[slug]

  useEffect(() => {
    const title = `${solution.detail.title} · UnifyTechs`
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    const prev = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', solution.hook)
    return () => {
      document.title = DEFAULT_SITE_TITLE
      meta?.setAttribute('content', prev)
    }
  }, [solution])

  const otherSolutions = SOLUTION_ORDER.filter((s) => s !== slug).map((s) => SOLUTIONS[s])

  return (
    <main className="solution-page">
      {/* Hero */}
      <section className="solution-page__hero">
        <div className="solution-page__hero-orb solution-page__hero-orb--a" aria-hidden />
        <div className="solution-page__hero-orb solution-page__hero-orb--b" aria-hidden />

        <div className="container solution-page__hero-inner">
          <a href="#services" className="solution-page__back" onClick={handleBackToSite}>
            <ArrowLeft size={16} aria-hidden /> Back to solutions
          </a>

          <div className="solution-page__hero-grid">
            <Reveal>
              <div className="solution-page__hero-copy">
                <span className="solution-page__eyebrow">{solution.eyebrow}</span>
                <h1 className="solution-page__title">{solution.detail.title}</h1>
                <p className="solution-page__hook">{solution.hook}</p>
                <p className="solution-page__summary">{solution.detail.summary}</p>
                <div className="solution-page__hero-actions">
                  <a href="#contact" className="btn btn--primary" onClick={scrollToId('contact')}>
                    Talk to solutions
                  </a>
                  <a
                    href="#solution-process"
                    className="btn btn--outline"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('solution-process')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    See the pipeline
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="solution-page__hero-art">
                <SolutionHeroArt kind={solution.heroKind} />
              </div>
            </Reveal>
          </div>

          {/* Metrics strip */}
          <div className="solution-page__metrics" role="list">
            {solution.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                role="listitem"
                className="solution-page__metric"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
              >
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process flow */}
      <section id="solution-process" className="solution-page__section solution-page__section--flow">
        <div className="container">
          <Reveal>
            <SolutionProcessFlow
              heading={solution.processHeading}
              lede={solution.processLede}
              steps={solution.processSteps}
            />
          </Reveal>
        </div>
      </section>

      {/* Capabilities + Outcomes */}
      <section className="solution-page__section solution-page__section--cap">
        <div className="container solution-page__cap-grid">
          <Reveal>
            <article className="solution-page__panel">
              <header>
                <Sparkles className="solution-page__panel-icon" aria-hidden />
                <span className="solution-page__section-eyebrow">CAPABILITIES</span>
                <h2>What ships in the box</h2>
              </header>
              <ul className="solution-page__list">
                {solution.detail.capabilities.map((line) => (
                  <li key={line}>
                    <Check className="solution-page__list-icon" aria-hidden strokeWidth={2.4} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="solution-page__panel solution-page__panel--outcomes">
              <header>
                <TrendingUp className="solution-page__panel-icon" aria-hidden />
                <span className="solution-page__section-eyebrow">OUTCOMES</span>
                <h2>What changes for your team</h2>
              </header>
              <ul className="solution-page__list">
                {solution.detail.outcomes.map((line) => (
                  <li key={line}>
                    <Check className="solution-page__list-icon" aria-hidden strokeWidth={2.4} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Integrations */}
      {solution.detail.integrations && solution.detail.integrations.length > 0 && (
        <section className="solution-page__section solution-page__section--integ">
          <div className="container">
            <Reveal>
              <header className="solution-page__section-head">
                <Plug2 className="solution-page__panel-icon" aria-hidden />
                <span className="solution-page__section-eyebrow">TOUCHPOINTS</span>
                <h2>Where it plugs in</h2>
              </header>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="solution-page__chips">
                {solution.detail.integrations.map((line) => (
                  <li key={line}>
                    <span className="solution-page__chip">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="solution-page__section solution-page__section--cta">
        <div className="container">
          <Reveal>
            <div className="solution-page__cta">
              <h2>{solution.ctaHeading}</h2>
              <p>{solution.ctaBody}</p>
              <div className="solution-page__cta-actions">
                <a href="#contact" className="btn btn--primary" onClick={scrollToId('contact')}>
                  Book a working session
                </a>
                <a href="#services" className="btn btn--outline" onClick={handleBackToSite}>
                  Back to all solutions
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other solutions */}
      <section className="solution-page__section solution-page__section--more">
        <div className="container">
          <Reveal>
            <header className="solution-page__section-head">
              <span className="solution-page__section-eyebrow">KEEP EXPLORING</span>
              <h2>Other solutions</h2>
            </header>
          </Reveal>
          <div className="solution-page__more-grid">
            {otherSolutions.map((s, i) => (
              <motion.a
                key={s.slug}
                href={solutionHash(s.slug)}
                className="solution-page__more-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
              >
                <span className="solution-page__more-eyebrow">{s.eyebrow}</span>
                <h3>{s.shortTitle}</h3>
                <p>{s.hook}</p>
                <span className="solution-page__more-cta">
                  View solution <ArrowRight size={14} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
