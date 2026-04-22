import { useRef } from 'react'
import type { ComponentType } from 'react'
import { useInView } from 'framer-motion'
import CountUpImport from 'react-countup'
import type { CountUpProps } from 'react-countup'
import { Reveal } from '../components/Reveal'
import { PLATFORM_VISION } from '../data/platformVision'

/** Default export interop — some bundlers expose `{ default: Component }` which triggers "got: object". */
const CountUp = (
  typeof CountUpImport === 'function'
    ? CountUpImport
    : (CountUpImport as unknown as { default: ComponentType<CountUpProps> }).default
) as ComponentType<CountUpProps>

/** Early-stage milestones — labeled as pilot-era so we stay honest vs. mature-vendor benchmarks. */
const PILOT_STATS = [
  {
    end: 8,
    decimals: 0,
    prefix: '',
    suffix: '',
    suffixAfter: ' states',
    label: 'US states with active outreach or pilots',
  },
  {
    end: 12400,
    decimals: 0,
    separator: ',',
    prefix: '',
    suffix: '+',
    label: 'Claims & remits exercised in pilots (cumulative)',
  },
  {
    end: 34,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'Median cycle-time improvement in pilot benchmarks',
  },
  {
    end: 9,
    decimals: 0,
    prefix: '',
    suffix: '',
    label: 'Pilot & design-partner organizations to date',
  },
] as const

export function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section className="social-proof" aria-label="Social proof" ref={ref}>
      <div className="container social-proof__container">
        <Reveal>
          <header className="social-proof__header">
            <span className="social-proof__eyebrow">Trusted footprint</span>
            <h2 className="social-proof__title">Built where EDI and FHIR meet production</h2>
            <p className="social-proof__lead">{PLATFORM_VISION.socialProofLead}</p>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="social-proof__marquee-shell social-proof__coming-soon-shell">
            <p className="social-proof__coming-soon" role="status">
              Coming soon
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="social-proof__stats-label">Impact at a glance</p>
          <p className="social-proof__stats-note">Pilot-era metrics — we’re growing with our first customers.</p>
        </Reveal>

        <div className="social-proof__stats stats-grid">
          {PILOT_STATS.map((stat, idx) => (
            <Reveal key={stat.label} delay={0.05 + idx * 0.05}>
              <div className="stat-card">
                <div className="stat-card__value" aria-live="polite">
                  {inView ? (
                    <>
                      <CountUp
                        end={stat.end}
                        decimals={stat.decimals}
                        duration={2.2}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        {...('separator' in stat && stat.separator ? { separator: stat.separator } : {})}
                      />
                      {'suffixAfter' in stat && stat.suffixAfter ? stat.suffixAfter : null}
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
