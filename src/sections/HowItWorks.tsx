import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Upload, Brain, CheckCircle, Send, DollarSign } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const STEPS = [
  {
    icon: Upload,
    title: 'Ingest',
    body: 'Claim forms arrive via upload, fax-to-digital, or EHR export.',
  },
  {
    icon: Brain,
    title: 'Extract',
    body: 'AI reads every field—handwriting recognized, codes validated.',
  },
  {
    icon: CheckCircle,
    title: 'Verify',
    body: 'Eligibility, deductibles, and prior authorizations confirmed in real-time.',
  },
  {
    icon: Send,
    title: 'Submit',
    body: 'Validated claim forwarded as FHIR Claim or X12 837 — batch or synchronous — to each payer’s preferred endpoint.',
  },
  {
    icon: DollarSign,
    title: 'Reimburse',
    body: '835 ERA or FHIR ExplanationOfBenefit tied back to the original submission; partial pay, denial, and appeal events flow through reconciliation and webhooks.',
  },
]

const LINE_DURATION = 1.6
const LINE_DELAY = 0.15

/** Steps "light up" in lock-step with the filling timeline line, so the whole row reads
 *  as a single data-flowing-through-pipeline motion rather than 5 independent reveals. */
const stepsContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      // Icons arrive slightly before the line reaches them for a "flow" feel.
      delayChildren: LINE_DELAY + 0.1,
      staggerChildren: (LINE_DURATION - 0.2) / STEPS.length,
    },
  },
}

const stepVar: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HowItWorks() {
  const desktopRef = useRef<HTMLDivElement>(null)
  const inView = useInView(desktopRef, { once: true, amount: 0.3 })
  const prefersReduced = useReducedMotion()

  return (
    <section id="how-it-works" className="how section-pad section-gradient">
      <div className="container">
        <Reveal>
          <header className="section-head">
            <span className="eyebrow">THE PROCESS</span>
            <h2>From Paper Chaos to Paid Claims in Seconds</h2>
            <p className="section-head__sub">
              How automated claim submission and medical billing workflow automation moves teams from manual rework to
              monitored exceptions—aligned to how US practices and billers actually operate.
            </p>
          </header>
        </Reveal>

        <div className="timeline timeline--desktop" ref={desktopRef}>
          <div className="timeline__line" aria-hidden />
          <motion.div
            className="timeline__line-fill"
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1], delay: LINE_DELAY }}
          />

          {/* Traveling pulse — feels like a packet moving through the pipeline. Starts only after
              the rail has filled in, and respects prefers-reduced-motion. */}
          {inView && !prefersReduced && (
            <motion.span
              className="timeline__pulse"
              aria-hidden
              initial={{ left: '6%', opacity: 0 }}
              animate={{
                left: ['6%', '94%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                ease: 'easeInOut',
                times: [0, 0.1, 0.9, 1],
                delay: LINE_DURATION + LINE_DELAY + 0.1,
                repeat: Infinity,
                repeatDelay: 1.6,
              }}
            />
          )}

          <motion.div
            className="timeline__steps"
            variants={stepsContainer}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} className="timeline__step" variants={stepVar}>
                <span className="timeline__dot" aria-hidden />
                <div className="timeline__icon-ring">
                  <Icon className="timeline__icon" aria-hidden />
                </div>
                <span className="timeline__num">{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="timeline timeline--mobile">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="timeline-mobile-step">
                <div className="timeline-mobile-step__rail" aria-hidden />
                <div className="timeline-mobile-step__icon">
                  <Icon aria-hidden />
                </div>
                <div>
                  <span className="timeline-mobile-step__num">Step {i + 1}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Directional entry reinforces the "before → after" story. */}
        <div className="compare-cards">
          <motion.div
            className="compare-cards__card compare-cards__card--before"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>Before UnifyTechs</h3>
            <ul>
              <li>Manual data entry</li>
              <li>3–5 day processing</li>
              <li>24% denial rate</li>
              <li>Full-time billing staff</li>
            </ul>
          </motion.div>
          <motion.div
            className="compare-cards__card compare-cards__card--after"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h3>After UnifyTechs</h3>
            <ul>
              <li>Automated extraction</li>
              <li>Sub-5 second processing</li>
              <li>3.1% denial rate</li>
              <li>Staff focused on exceptions only</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
