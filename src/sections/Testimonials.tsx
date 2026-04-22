import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { ContentModal } from '../components/ContentModal'
import { Reveal } from '../components/Reveal'
import { CASE_STUDIES, type CaseStudyId } from '../data/caseStudies'

const ITEMS = [
  {
    quote:
      'Before UnifyTechs, our billing team spent 60% of their time on data entry alone. Now they focus exclusively on exception handling. Our denial rate dropped from 28% to just 2.9%.',
    name: 'Dr. Sarah K.',
    role: 'Revenue Cycle Director, MedCore Health Group',
    initials: 'SK',
    tint: 'var(--clr-accent)',
  },
  {
    quote:
      'The ICD-10 validator alone saved us from $1.4M in potential audit exposure last year. This platform is not a luxury — it is essential infrastructure.',
    name: 'James W.',
    role: 'CFO, BlueCross Digital Partners',
    initials: 'JW',
    tint: 'var(--clr-primary-light)',
  },
  {
    quote:
      'Integration with our existing EHR took less than a week. The API documentation is exceptional and the support team treats you like a partner, not a ticket.',
    name: 'Priya M.',
    role: 'Health IT Lead, CarePath Systems',
    initials: 'PM',
    tint: 'var(--clr-accent-warm)',
  },
]

const CASE_CARDS: { caseId: CaseStudyId; label: string }[] = [
  { caseId: 'medcore', label: 'MedCore: 87% Faster Claims' },
  { caseId: 'bluecross', label: 'BlueCross: $1.4M Saved' },
  { caseId: 'carepath', label: 'CarePath: 14-day ROI' },
]

function TestimonialCard({
  quote,
  name,
  role,
  initials,
  tint,
}: (typeof ITEMS)[number]) {
  return (
    <article className="testimonial-card">
      <span className="testimonial-card__quote" aria-hidden>
        "
      </span>
      <p className="testimonial-card__text">{quote}</p>
      <div className="testimonial-card__meta">
        <div className="testimonial-card__avatar" style={{ background: tint }} aria-hidden>
          {initials}
        </div>
        <div>
          <div className="testimonial-card__name">{name}</div>
          <div className="testimonial-card__role">{role}</div>
        </div>
        <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="testimonial-card__star" fill="currentColor" aria-hidden />
          ))}
        </div>
      </div>
    </article>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [caseStudyId, setCaseStudyId] = useState<CaseStudyId | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const tick = () => setIndex((i) => (i + 1) % ITEMS.length)
    if (!mq.matches) return undefined
    const id = window.setInterval(tick, 5000)
    return () => window.clearInterval(id)
  }, [])

  const caseDetail = caseStudyId ? CASE_STUDIES[caseStudyId] : null

  const openContact = () => {
    setCaseStudyId(null)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="testimonials" className="testimonials section-pad section-dark">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="eyebrow">CLIENT VOICES</span>
            <h2>Heard from the Billing Departments That Got Their Lives Back</h2>
          </header>
        </Reveal>

        <div className="testimonial-carousel testimonial-carousel--mobile">
          <div className="testimonial-carousel__viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="testimonial-carousel__slide"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35 }}
              >
                <TestimonialCard {...ITEMS[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-carousel__dots" role="tablist" aria-label="Select testimonial">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                className={i === index ? 'is-active' : ''}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="testimonial-grid-desktop">
          {ITEMS.map((t) => (
            <Reveal key={t.name} delay={0.05}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="case-row">
            {CASE_CARDS.map((c) => (
              <button
                key={c.caseId}
                type="button"
                className="case-card"
                onClick={() => setCaseStudyId(c.caseId)}
                aria-haspopup="dialog"
              >
                <span>{c.label}</span>
                <span className="case-card__arrow">Read Case Study →</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <ContentModal open={!!caseDetail} onClose={() => setCaseStudyId(null)} title={caseDetail?.headline ?? ''}>
        {caseDetail && (
          <>
            <p className="content-modal__meta">
              <strong>{caseDetail.client}</strong>
              <span className="content-modal__sep"> · </span>
              {caseDetail.segment}
            </p>
            <h3 className="content-modal__h">Challenge</h3>
            <p className="content-modal__lede">{caseDetail.challenge}</p>
            <h3 className="content-modal__h">Solution</h3>
            <ul className="content-modal__list">
              {caseDetail.solution.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3 className="content-modal__h">Results</h3>
            <ul className="content-modal__list">
              {caseDetail.results.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="content-modal__fine">{caseDetail.disclaimer}</p>
            <div className="content-modal__actions">
              <button type="button" className="btn btn--primary" onClick={openContact}>
                Discuss a similar rollout
              </button>
              <button type="button" className="btn btn--outline content-modal__ghost" onClick={() => setCaseStudyId(null)}>
                Close
              </button>
            </div>
          </>
        )}
      </ContentModal>
    </section>
  )
}
