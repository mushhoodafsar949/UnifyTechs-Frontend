import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Briefcase,
  Cpu,
  FileCheck2,
  Quote,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { ThemeMode } from '../theme'
import { Reveal } from '../components/Reveal'
import { LinkedInLogo } from '../components/SocialBrandIcons'
import { DEFAULT_SITE_TITLE } from '../constants/documentTitle'
import { COMPANY_PAGE, type ApproachPillar } from '../data/companyPage'

type AboutTeamPageProps = {
  theme: ThemeMode
}

const APPROACH_ICONS: Record<ApproachPillar['icon'], LucideIcon> = {
  zap: Zap,
  fileCheck: FileCheck2,
  cpu: Cpu,
  shield: ShieldCheck,
  workflow: Workflow,
}

function handleBackToSite(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  // Use history to clear the hash, then scroll to #about on the landing page
  window.history.pushState('', '', window.location.pathname + '#about')
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

export function AboutTeamPage(_props: AboutTeamPageProps) {
  useEffect(() => {
    document.title = COMPANY_PAGE.documentTitle
    const meta = document.querySelector('meta[name="description"]')
    const prev = meta?.getAttribute('content') ?? ''
    meta?.setAttribute('content', COMPANY_PAGE.metaDescription)
    return () => {
      document.title = DEFAULT_SITE_TITLE
      meta?.setAttribute('content', prev)
    }
  }, [])

  return (
    <main className="team-page">
      {/* Hero */}
      <section className="team-page__hero">
        <div className="team-page__hero-orb team-page__hero-orb--a" aria-hidden />
        <div className="team-page__hero-orb team-page__hero-orb--b" aria-hidden />

        <div className="container team-page__hero-inner">
          <a href="#about" className="team-page__back" onClick={handleBackToSite}>
            <ArrowLeft size={16} aria-hidden /> Back to site
          </a>
          <Reveal>
            <span className="team-page__eyebrow">{COMPANY_PAGE.eyebrow}</span>
            <h1 className="team-page__title">{COMPANY_PAGE.title}</h1>
            <p className="team-page__subtitle">{COMPANY_PAGE.subtitle}</p>
          </Reveal>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="team-page__section team-page__section--mv">
        <div className="container team-page__mv-grid">
          <Reveal>
            <article className="team-page__mv-card team-page__mv-card--mission">
              <span className="team-page__mv-tag">01</span>
              <h2>{COMPANY_PAGE.mission.heading}</h2>
              <p>{COMPANY_PAGE.mission.body}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="team-page__mv-card team-page__mv-card--vision">
              <span className="team-page__mv-tag">02</span>
              <h2>{COMPANY_PAGE.vision.heading}</h2>
              <p>{COMPANY_PAGE.vision.body}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Approach pillars */}
      <section className="team-page__section team-page__section--approach">
        <div className="container">
          <Reveal>
            <header className="team-page__section-head">
              <h2>{COMPANY_PAGE.approachHeading}</h2>
              <p className="team-page__section-lede">{COMPANY_PAGE.approachIntro}</p>
            </header>
          </Reveal>

          <div className="team-page__pillars">
            {COMPANY_PAGE.approachPillars.map((p, i) => {
              const Icon = APPROACH_ICONS[p.icon] ?? Workflow
              return (
                <motion.article
                  key={p.title}
                  className="team-page__pillar"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                >
                  <div className="team-page__pillar-icon" aria-hidden>
                    <Icon />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="team-page__section team-page__section--story">
        <div className="container team-page__story-grid">
          <Reveal>
            <div className="team-page__story-copy">
              <span className="team-page__section-eyebrow">WHY WE EXIST</span>
              <h2>{COMPANY_PAGE.story.heading}</h2>
              {COMPANY_PAGE.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <aside className="team-page__story-aside" aria-hidden>
              <div className="team-page__story-badge">
                <strong>Est. 2026</strong>
                <span>Health-informatics roots</span>
              </div>
              <div className="team-page__story-badge">
                <strong>200+</strong>
                <span>Deployments across providers &amp; payers</span>
              </div>
              <div className="team-page__story-badge">
                <strong>X12 · FHIR · REST</strong>
                <span>Interoperability by design</span>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* From the Founder */}
      <section className="team-page__section team-page__section--founder">
        <div className="container">
          <Reveal>
            <div className="team-page__founder">
              <div className="team-page__founder-portrait">
                <div className="team-page__founder-glow" aria-hidden />
                <img
                  className="team-page__founder-photo"
                  src={COMPANY_PAGE.founder.photoUrl}
                  alt={COMPANY_PAGE.founder.photoAlt}
                  loading="lazy"
                  width={420}
                  height={420}
                />
              </div>
              <div className="team-page__founder-copy">
                <span className="team-page__section-eyebrow">{COMPANY_PAGE.founder.eyebrow}</span>
                <blockquote className="team-page__founder-quote">
                  <Quote className="team-page__founder-mark" aria-hidden />
                  <p>{COMPANY_PAGE.founder.quote}</p>
                </blockquote>
                <div className="team-page__founder-id">
                  <strong>{COMPANY_PAGE.founder.name}</strong>
                  <span>{COMPANY_PAGE.founder.title}</span>
                </div>
                {COMPANY_PAGE.founder.linkedinUrl && (
                  <a
                    className="team-page__founder-link"
                    href={COMPANY_PAGE.founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY_PAGE.founder.name} on LinkedIn`}
                  >
                    <LinkedInLogo size={14} /> Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="team-page__section team-page__section--careers">
        <div className="container team-page__careers">
          <Reveal>
            <div className="team-page__careers-inner">
              <Briefcase className="team-page__careers-icon" aria-hidden />
              <h2>{COMPANY_PAGE.careers.heading}</h2>
              <p>{COMPANY_PAGE.careers.body}</p>
              <div className="team-page__careers-actions">
                <a href="#contact" className="btn btn--primary" onClick={handleBackToSite}>
                  Talk to leadership
                </a>
                <a
                  href="https://www.linkedin.com/company/unifytechs/jobs"
                  className="btn btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open roles
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
