import { Activity, Layers, Link2, Lock, ShieldCheck, Zap, Brain } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SystemFlow } from '../components/SystemFlow'
import { PLATFORM_VISION } from '../data/platformVision'
import { marketingHash } from '../legal/routes'

const LOGO_HIGHLIGHTS = [
  { icon: ShieldCheck, text: 'Audit-ready architecture' },
  { icon: Layers, text: 'X12 · FHIR · REST APIs' },
  { icon: Activity, text: 'End-to-end RCM focus' },
] as const

const PILLARS = [
  { icon: Lock, label: 'HIPAA & SOC2 Compliant' },
  { icon: Zap, label: 'Sub-5 Second Processing' },
  { icon: Brain, label: 'AI-Powered Form Intelligence' },
  { icon: Link2, label: 'EHR & PMS Integrations' },
]

export function About() {
  return (
    <section id="about" className="about section-pad section-light">
      <div className="container">
        <div className="about__grid">
        <Reveal>
          <div className="about__visual">
            <div className="about__frame about__frame--logo">
              <div className="about-logo-panel">
                <div className="about-logo-panel__mesh" aria-hidden />
                <div className="about-logo-panel__glow" aria-hidden />
                <div className="about-logo-panel__inner">
                  <p className="about-logo-panel__kicker">Revenue cycle &amp; claims automation</p>
                  <img
                    className="about-logo-panel__mark"
                    src="/brand/unifytechs-logo.svg"
                    alt="UnifyTechs"
                    width={340}
                    height={73}
                    loading="lazy"
                  />
                  <p className="about-logo-panel__tagline">
                    Where payer ops discipline meets modern integration — shipped as software you can defend in an audit.
                  </p>
                  <ul className="about-logo-panel__highlights">
                    {LOGO_HIGHLIGHTS.map(({ icon: Icon, text }) => (
                      <li key={text}>
                        <Icon className="about-logo-panel__hi-icon" aria-hidden />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="about__badge">Est. 2026 · 200+ Deployments</div>
            </div>
          </div>
        </Reveal>

        <div className="about__copy">
          <Reveal delay={0.08}>
            <span className="eyebrow eyebrow--on-light">WHO WE ARE</span>
            <h2 className="title-on-light">Built by Healthcare Tech Veterans. Designed for Real-World Claims.</h2>
            <p className="body-on-light">
              UnifyTechs is a specialized software house born from the friction of legacy claim processing—founded by health
              informatics engineers and former insurance operations leaders who lived the backlog, the denials, and the
              audit scrambles firsthand.
            </p>
            <p className="body-on-light">
              Our mission is to attack the administrative waste draining healthcare productivity—starting with intelligent,
              automated, and fully auditable claim reimbursement—so clinical and financial teams recover time for patient
              care instead of paperwork.
            </p>
            <p className="body-on-light">{PLATFORM_VISION.aboutBridge}</p>
            <p className="body-on-light">
              Today our team blends former payer operations analysts, HL7-oriented engineers, and billing directors who ran
              multi-site practices — so product decisions stay anchored in cleared claims and audit defense, not vanity
              dashboards.
            </p>

            <div className="pillar-grid">
              {PILLARS.map(({ icon: Icon, label }) => (
                <div key={label} className="pillar-card">
                  <Icon className="pillar-card__icon" aria-hidden />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a className="link-teal link-teal--btn" href={marketingHash('team')}>
              Meet our founding team →
            </a>
          </Reveal>
        </div>
        </div>

        <Reveal delay={0.12}>
          <SystemFlow />
        </Reveal>
      </div>
    </section>
  )
}
