import { Reveal } from '../components/Reveal'
import { PLATFORM_VISION } from '../data/platformVision'

const TAGS = [
  '🧠 Custom NLP Models',
  '☁️ HIPAA-eligible cloud',
  '🔐 AES-256 · TLS 1.2+',
  '📋 HL7 FHIR R4 · US Core',
  '🔗 X12 837/835 · 270/271 · 276/277',
  '📊 Kafka / durable queues',
  '🐳 Kubernetes · IaC',
  '🤖 GPT-4 Vision OCR',
  '🔁 Webhooks · async callbacks',
  '🔑 OAuth 2 · SMART-style FHIR',
]

export function Technology() {
  return (
    <section id="technology" className="technology section-pad section-light tech-section">
      <TechBackground />
      <div className="container technology__grid">
        <Reveal>
          <div className="technology__copy">
            <span className="eyebrow eyebrow--on-light">UNDER THE HOOD</span>
            <h2 className="title-on-light">Built on a Foundation of Clinical Intelligence</h2>
            <p className="body-on-light">
              UnifyTechs runs on HIPAA-conscious cloud infrastructure with FHIR R4-ready APIs, multi-tenant isolation, and
              a zero-trust security model—so innovation never outpaces governance.
            </p>
            <p className="body-on-light">{PLATFORM_VISION.technologyStack}</p>

            <pre className="code-block mono" role="region" aria-label="Sample API usage">
              <code>
                <span className="code-line code-c">// Submit a claim via UnifyTechs API</span>
                {'\n'}
                <span className="code-k">const</span> response = <span className="code-k">await</span> unifytechs.
                <span className="code-f">submit</span>({'{\n'}
                {'  '}
                <span className="code-k">claimType</span>: <span className="code-s">&apos;CMS-1500&apos;</span>,{'\n'}
                {'  '}
                <span className="code-k">patientId</span>: <span className="code-s">&apos;PT-48291&apos;</span>,{'\n'}
                {'  '}
                <span className="code-k">providerId</span>: <span className="code-s">&apos;NPI-1234567890&apos;</span>,{'\n'}
                {'  '}
                <span className="code-k">diagnoses</span>: [<span className="code-s">&apos;Z00.00&apos;</span>,{' '}
                <span className="code-s">&apos;J06.9&apos;</span>],{'\n'}
                {'  '}
                <span className="code-k">autoVerify</span>: <span className="code-k">true</span>,{'\n'}
                {'  '}
                <span className="code-k">notifyOnDenial</span>: <span className="code-k">true</span>
                {'\n'}
                {'});'}
                {'\n'}
                <span className="code-line code-c">// Response: {'{'} claimId: &apos;CE-928471&apos;, status: &apos;SUBMITTED&apos;, eta: &apos;4.2s&apos; {'}'}</span>
              </code>
            </pre>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-tags">
            {TAGS.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Subtle "under the hood" backdrop — a faint dot grid with horizontal data
 * pipes and traveling pulses. Scales to cover the section via preserveAspectRatio.
 */
function TechBackground() {
  const lines = [
    { y: 120, dur: 9, delay: 0 },
    { y: 280, dur: 12, delay: 2 },
    { y: 460, dur: 10, delay: 1 },
    { y: 640, dur: 14, delay: 4 },
  ]
  return (
    <svg
      className="technology__bg-svg"
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="tech-bg-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--clr-text-muted)" opacity="0.3" />
        </pattern>
        <linearGradient id="tech-bg-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--clr-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="tech-bg-glow-a" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--clr-accent)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--clr-accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tech-bg-glow-b" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--clr-primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--clr-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dot grid */}
      <rect width="1400" height="800" fill="url(#tech-bg-dots)" />

      {/* Soft corner glows tying the palette into the section */}
      <circle cx="180" cy="160" r="260" fill="url(#tech-bg-glow-a)" />
      <circle cx="1220" cy="640" r="300" fill="url(#tech-bg-glow-b)" />

      {/* Data pipe lines + traveling pulses */}
      {lines.map((l, i) => (
        <g key={i}>
          <line
            x1="0"
            y1={l.y}
            x2="1400"
            y2={l.y}
            stroke="url(#tech-bg-pipe)"
            strokeWidth="1"
            strokeDasharray="2 10"
            opacity="0.45"
          />
          <circle cx="0" cy={l.y} r="2.6" fill="var(--clr-accent)" opacity="0.85">
            <animate
              attributeName="cx"
              from="-20"
              to="1420"
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="0" cy={l.y} r="6" fill="var(--clr-accent)" opacity="0.18">
            <animate
              attributeName="cx"
              from="-20"
              to="1420"
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* A few "node" markers to break the monotony of the grid */}
      <g fill="var(--clr-accent)" opacity="0.25">
        <circle cx="336" cy="120" r="3" />
        <circle cx="812" cy="280" r="3" />
        <circle cx="1064" cy="460" r="3" />
        <circle cx="476" cy="640" r="3" />
      </g>
    </svg>
  )
}
