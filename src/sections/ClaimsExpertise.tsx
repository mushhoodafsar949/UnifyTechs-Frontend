import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ClipboardList,
  Database,
  FileStack,
  Landmark,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { TechOrbit } from '../components/TechOrbit'

const POINTS = [
  {
    icon: ClipboardList,
    title: 'Professional & institutional claims',
    body: 'CMS-1500, UB-04, dental — line-level edits, ICD/CPT pairing, modifiers, and NCCI-style checks before transmission.',
  },
  {
    icon: Database,
    title: 'ANSI X12 end-to-end',
    body: '837/835/270/271/276/277 familiarity — trading partners, envelopes, acknowledgements (999/277CA), and ERA logic, not “API-only” ivory tower.',
  },
  {
    icon: FileStack,
    title: 'Denials → appeals → cash',
    body: 'CARC/RARC-informed workflows, payer rulesets, reopenings, corrected claims, and documentation prompts — built with billing managers, not generic ticket queues.',
  },
  {
    icon: RefreshCw,
    title: 'Remittance & reconciliation',
    body: '835 posting patterns, payer splits, takebacks, and tying payments back to encounters so finance closes the loop.',
  },
  {
    icon: Landmark,
    title: 'National & regional payers',
    body: 'Designed for multi-payer reality: carve-outs, delegated risk, portals, attachments, and the long tail of state-specific quirks.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance by design',
    body: 'HIPAA-aware controls, audit-ready logs, PHI minimization in integrations, BAA-aligned hosting patterns — transparency for compliance reviews.',
  },
]

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const gridItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Update CSS custom properties so a radial-gradient "spotlight" tracks the cursor. */
function handleSpotlight(e: ReactMouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export function ClaimsExpertise() {
  return (
    <section id="claims-expertise" className="claims-expertise section-pad section-dark">
      <TechOrbit />
      <div className="container claims-expertise__content">
        <Reveal>
          <header className="section-head">
            <span className="eyebrow">CLAIMS REIMBURSEMENT DEPTH</span>
            <h2>Built Where Revenue Cycle Actually Lives</h2>
            <p className="section-head__sub claims-expertise__intro">
              UnifyTechs is shaped by practitioners from health informatics, payer operations, and revenue integrity — teams that
              lived implementation timelines, payer bulletins, denial war rooms, and auditor questions. Marketing copy can’t fake
              that. Everything here is grounded in{' '}
              <strong className="claims-expertise__strong">national standards (X12, HIPAA, FHIR trends)</strong> and the messy
              middle between EHR billing modules and payer adjudication systems.
            </p>
          </header>
        </Reveal>

        <motion.div
          className="claims-expertise__grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {POINTS.map(({ icon: Icon, title, body }) => (
            <motion.article
              key={title}
              className="claims-card claims-card--spot"
              variants={gridItem}
              onMouseMove={handleSpotlight}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <Icon className="claims-card__icon" aria-hidden />
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.blockquote
          className="claims-expertise__quote"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Providers and practice managers rightly treat claims data as PHI and fiduciary duty. UnifyTechs presents the
            controls and domain depth they expect from a reimbursement partner — not anonymous “AI magic.” We invite technical
            and billing stakeholders to a live session with our solutions architects before any PHI moves.
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
