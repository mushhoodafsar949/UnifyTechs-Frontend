import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, PlayCircle, Check } from 'lucide-react'
import { HeroGlobe } from '../components/HeroGlobe'
import { PLATFORM_VISION } from '../data/platformVision'
import type { ThemeMode } from '../theme'

function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="hero-orb hero-orb--a"
        aria-hidden
        animate={{ x: [0, 28, 0], y: [0, -22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-orb hero-orb--b"
        aria-hidden
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-orb hero-orb--c"
        aria-hidden
        animate={{ x: [0, 18, 0], y: [0, 26, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

function DashboardMockup() {
  return (
    <motion.div
      className="dash-card"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="dash-card__chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="dash-card__title">Claim #RX-20482 — Processing</div>
      <div className="dash-card__progress-wrap">
        <motion.div
          className="dash-card__progress-fill"
          initial={{ width: 0 }}
          animate={{ width: '78%' }}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
        />
      </div>
      <ul className="dash-card__steps">
        <li>
          <Check className="dash-card__icon dash-card__icon--ok" aria-hidden /> Form Data Extracted
        </li>
        <li>
          <Check className="dash-card__icon dash-card__icon--ok" aria-hidden /> ICD-10 Codes Verified
        </li>
        <li>
          <Check className="dash-card__icon dash-card__icon--ok" aria-hidden /> Patient Eligibility Confirmed
        </li>
        <li className="dash-card__pending">
          <span className="dash-card__spinner" aria-hidden />
          Reimbursement Submitted
        </li>
      </ul>
      <div className="dash-card__footer">
        <div>
          <span className="dash-card__muted">Estimated Time</span>
          <strong>4.2 seconds</strong>
        </div>
        <div className="dash-card__sep" aria-hidden />
        <div>
          <span className="dash-card__muted">Manual Process</span>
          <strong className="dash-card__strike">~3 days</strong>
        </div>
      </div>
    </motion.div>
  )
}

type HeroProps = {
  theme: ThemeMode
}

export function Hero({ theme }: HeroProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero section-pad">
      <div className="hero__globe" aria-hidden>
        <HeroGlobe theme={theme} />
      </div>
      <div className="hero__mesh" aria-hidden />
      <div className="hero__dots" aria-hidden />
      <FloatingOrbs />

      <div className="container hero__shell">
        <div className="hero__grid">
          <div className="hero__copy">
            <div className="hero__badge">
              <span className="hero__pulse" aria-hidden />
              <span className="mono">AI-POWERED</span>
              <span>Claim Automation Platform</span>
            </div>

            <h1 className="hero__title">
              <span className="hero__title-main">
                Automate Your Healthcare{' '}
                <span className="hero__typewrap">
                  <TypeAnimation
                    sequence={['Claims', 2200, 'Reimbursements', 2200, 'Approvals', 2200, 'Claims', 800]}
                    wrapper="span"
                    speed={45}
                    repeat={Infinity}
                  />
                </span>
              </span>
              <span className="hero__title-sub">Eliminate the Wait.</span>
            </h1>

            <p className="hero__sub">{PLATFORM_VISION.heroSub}</p>

            <div className="hero__cta-row">
              <button type="button" className="btn btn--primary btn--pulse" onClick={() => scrollTo('contact')}>
                Request a Live Demo <ArrowRight className="btn__ico" aria-hidden />
              </button>
              <button type="button" className="btn btn--outline" onClick={() => scrollTo('how-it-works')}>
                <PlayCircle className="btn__ico" aria-hidden /> Watch 2-min Video
              </button>
            </div>

            <ul className="hero__trust" aria-label="Trust indicators">
              <li>
                <Check className="hero__check" aria-hidden /> HIPAA Compliant
              </li>
              <li className="hero__trust-dot" aria-hidden>
                ·
              </li>
              <li>
                <Check className="hero__check" aria-hidden /> FHIR &amp; X12-ready
              </li>
              <li className="hero__trust-dot" aria-hidden>
                ·
              </li>
              <li>
                <Check className="hero__check" aria-hidden /> 99.9% Uptime SLA
              </li>
            </ul>
          </div>

          <div className="hero__viz">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
