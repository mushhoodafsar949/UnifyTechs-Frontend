import { useState, type MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Check,
  FileSearch,
  Network,
  Plug2,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ContentModal } from '../components/ContentModal'
import { Reveal } from '../components/Reveal'
import { SERVICE_DETAILS, type ServiceDetailId } from '../data/serviceDetails'
import { solutionHash, SOLUTION_SLUGS, type SolutionSlug } from '../legal/routes'

const SOLUTION_SET = new Set<string>(SOLUTION_SLUGS)
const hasSolutionPage = (id: ServiceDetailId): id is SolutionSlug => SOLUTION_SET.has(id)

/** Track cursor position inside the card so the CSS radial-gradient spotlight follows it. */
function handleSpotlight(e: ReactMouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

type Service = {
  detailId: ServiceDetailId
  title: string
  description: string
  icon: LucideIcon
  size: 'large' | 'medium'
}

const SERVICES: Service[] = [
  {
    detailId: 'ocr',
    title: 'Intelligent Form OCR & Extraction',
    description:
      'Automatically reads and extracts data from CMS-1500, UB-04, and ADA dental claim forms using vision AI.',
    icon: ScanLine,
    size: 'large',
  },
  {
    detailId: 'eligibility',
    title: 'Real-Time Eligibility Verification',
    description: 'Pings payer databases in real-time to verify patient coverage before submission.',
    icon: ShieldCheck,
    size: 'large',
  },
  {
    detailId: 'codes',
    title: 'ICD-10 / CPT Code Validator',
    description: 'Flags mismatches and upcoding issues before submission to prevent denials.',
    icon: FileSearch,
    size: 'medium',
  },
  {
    detailId: 'denials',
    title: 'Automated Denial Management',
    description:
      'When claims are denied, AI drafts appeals with supporting documentation aligned to payer policy.',
    icon: RefreshCw,
    size: 'medium',
  },
  {
    detailId: 'integrations',
    title: 'Payer API Integration Hub',
    description: 'Pre-built connectors to 200+ insurance payers and clearinghouses.',
    icon: Network,
    size: 'medium',
  },
  {
    detailId: 'analytics',
    title: 'Analytics & Audit Dashboard',
    description: 'Real-time tracking of claim status, denial rates, revenue leakage, and compliance metrics.',
    icon: BarChart3,
    size: 'medium',
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVar = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function Services() {
  const [activeDetailId, setActiveDetailId] = useState<ServiceDetailId | null>(null)
  const detail = activeDetailId ? SERVICE_DETAILS[activeDetailId] : null
  const activeService = activeDetailId ? SERVICES.find((s) => s.detailId === activeDetailId) : null
  const ActiveIcon = activeService?.icon ?? null

  const scrollToContact = () => {
    setActiveDetailId(null)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="services" className="services section-pad section-dark">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="eyebrow">WHAT WE BUILD</span>
            <h2>Healthcare Claims Processing &amp; Revenue Cycle Automation</h2>
            <p className="section-head__sub">
              Claim scrubbing, automated insurance eligibility verification, ICD-10/CPT validation, denial management,
              clearinghouse-ready EDI 837 submission, and ERA workflows—from intake to reimbursement.
            </p>
          </header>
        </Reveal>

        <motion.div
          className="services-bento"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.detailId}
              variants={itemVar}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={`service-card service-card--spot service-card--${s.size}`}
              onMouseMove={handleSpotlight}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="service-card__icon-wrap">
                <s.icon className="service-card__icon" aria-hidden />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              {hasSolutionPage(s.detailId) ? (
                <a className="service-card__link" href={solutionHash(s.detailId)}>
                  Learn More →
                </a>
              ) : (
                <button
                  type="button"
                  className="service-card__link"
                  onClick={() => setActiveDetailId(s.detailId)}
                  aria-haspopup="dialog"
                >
                  Learn More →
                </button>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>

      <ContentModal
        open={!!detail}
        onClose={() => setActiveDetailId(null)}
        title={detail?.title ?? ''}
        eyebrow="Capability deep-dive"
        icon={ActiveIcon ? <ActiveIcon aria-hidden /> : null}
      >
        {detail && (
          <>
            <p className="content-modal__lede">{detail.summary}</p>

            <section className="content-modal__section">
              <h3 className="content-modal__section-title">
                <Sparkles aria-hidden className="content-modal__section-icon" />
                Capabilities
              </h3>
              <ul className="content-modal__list">
                {detail.capabilities.map((line) => (
                  <li key={line}>
                    <Check aria-hidden className="content-modal__list-icon" strokeWidth={2.5} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="content-modal__section">
              <h3 className="content-modal__section-title">
                <TrendingUp aria-hidden className="content-modal__section-icon" />
                Outcomes
              </h3>
              <ul className="content-modal__list">
                {detail.outcomes.map((line) => (
                  <li key={line}>
                    <Check aria-hidden className="content-modal__list-icon" strokeWidth={2.5} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            {detail.integrations && detail.integrations.length > 0 && (
              <section className="content-modal__section">
                <h3 className="content-modal__section-title">
                  <Plug2 aria-hidden className="content-modal__section-icon" />
                  Integration touchpoints
                </h3>
                <ul className="content-modal__list content-modal__list--chips">
                  {detail.integrations.map((line) => (
                    <li key={line}>
                      <span className="content-modal__chip">{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="content-modal__actions">
              <button type="button" className="btn btn--primary" onClick={scrollToContact}>
                Talk to solutions
              </button>
              <button
                type="button"
                className="btn btn--outline content-modal__ghost"
                onClick={() => setActiveDetailId(null)}
              >
                Close
              </button>
            </div>
          </>
        )}
      </ContentModal>
    </section>
  )
}
