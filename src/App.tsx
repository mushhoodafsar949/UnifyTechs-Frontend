import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  FileCheck2,
  Layers3,
  Menu,
  Network,
  Route,
  ShieldCheck,
  X,
} from 'lucide-react'
import { apiBaseUrl } from './config'

type VisualKey = 'documents' | 'workflow' | 'products' | 'cloud'

const visualStories: Array<{
  key: VisualKey
  number: string
  eyebrow: string
  title: string
  copy: string
  href: string
  cta: string
}> = [
  {
    key: 'documents',
    number: '01',
    eyebrow: 'Process automation',
    title: 'Document intake that ends in usable data.',
    copy: 'Capture documents, validate critical fields, route exceptions, and send structured records to the systems your team already uses.',
    href: '/process-automation#document-processing',
    cta: 'Explore document automation',
  },
  {
    key: 'workflow',
    number: '02',
    eyebrow: 'Workflow design',
    title: 'Approvals that move without losing control.',
    copy: 'Replace inbox chasing and spreadsheet status columns with traceable routing, clear ownership, and reliable exception handling.',
    href: '/process-automation#workflow-automation',
    cta: 'Explore workflow automation',
  },
  {
    key: 'products',
    number: '03',
    eyebrow: 'Web & app engineering',
    title: 'Digital products built around real operations.',
    copy: 'Create portals, SaaS platforms, internal tools, and mobile products that fit the way customers and teams actually work.',
    href: '/web-app-engineering',
    cta: 'Explore product engineering',
  },
  {
    key: 'cloud',
    number: '04',
    eyebrow: 'Cloud & infrastructure',
    title: 'A dependable foundation behind every workflow.',
    copy: 'Design APIs, deployment pipelines, observability, and cloud architecture that make systems easier to operate and improve.',
    href: '/cloud-infrastructure',
    cta: 'Explore cloud foundations',
  },
]

const landingBanners = [
  {
    image: '/banners/process-automation.png',
    eyebrow: 'Process Automation',
    title: 'Turn documents into dependable operations.',
    copy: 'Capture, validate, route, and connect the work that currently slows your team down.',
    href: '/process-automation#document-processing',
  },
  {
    image: '/banners/workflow-automation.png',
    eyebrow: 'Workflow Automation',
    title: 'Move approvals forward without losing control.',
    copy: 'Replace inbox chasing with clear routing, ownership, exception handling, and traceable decisions.',
    href: '/process-automation#workflow-automation',
  },
  {
    image: '/banners/web-app-engineering.png',
    eyebrow: 'Web & App Engineering',
    title: 'Build digital products around real work.',
    copy: 'Create professional platforms, portals, internal tools, and mobile products that teams can depend on.',
    href: '/web-app-engineering',
  },
  {
    image: '/banners/cloud-infrastructure.png',
    eyebrow: 'Cloud & Infrastructure',
    title: 'Give every system a reliable foundation.',
    copy: 'Design APIs, deployments, observability, and resilient cloud architecture as one operating system.',
    href: '/cloud-infrastructure',
  },
] as const

const healthcareSolutions = [
  ['Document OCR & Extraction', 'Turn scanned claim packets into validated, structured records.', '/process-automation/healthcare/document-extraction'],
  ['Eligibility Verification', 'Coordinate coverage checks before downstream claim work begins.', '/process-automation/healthcare/eligibility-verification'],
  ['Code Validation', 'Surface coding inconsistencies for review before submission.', '/process-automation/healthcare/code-validation'],
  ['Denial Workflows', 'Route denials, documentation, and appeal tasks through traceable playbooks.', '/process-automation/healthcare/denial-workflows'],
  ['Payer Integrations', 'Connect canonical workflows with payer, clearinghouse, and EDI endpoints.', '/process-automation/healthcare/payer-integrations'],
] as const

const solutionDetail: Record<string, { title: string; eyebrow: string; intro: string; steps: string[] }> = {
  'document-extraction': {
    title: 'Healthcare document intake and extraction',
    eyebrow: 'Process Automation / Healthcare',
    intro: 'A controlled workflow for turning scanned CMS-1500, UB-04, and supporting documents into structured records, with confidence checks and human review where needed.',
    steps: ['Receive documents from approved channels', 'Classify pages and locate required fields', 'Validate extracted values and confidence', 'Route exceptions to a reviewer', 'Deliver structured output to the downstream system'],
  },
  'eligibility-verification': {
    title: 'Eligibility verification workflows',
    eyebrow: 'Process Automation / Healthcare',
    intro: 'Coordinate eligibility requests, normalize responses, and surface mismatches before they create avoidable work later in the revenue cycle.',
    steps: ['Collect subscriber and encounter data', 'Route the request to the configured endpoint', 'Normalize the response', 'Flag coverage or demographic exceptions', 'Record the decision and source response'],
  },
  'code-validation': {
    title: 'Claim code validation',
    eyebrow: 'Process Automation / Healthcare',
    intro: 'Apply transparent validation rules to diagnosis, procedure, modifier, and claim-line data without hiding the reason a record needs attention.',
    steps: ['Parse claim and service lines', 'Apply configured validation rules', 'Attach the rule and source to each flag', 'Route warnings and blockers', 'Record reviewer action before submission'],
  },
  'denial-workflows': {
    title: 'Denial and appeal workflows',
    eyebrow: 'Process Automation / Healthcare',
    intro: 'Turn denial inputs into consistent, time-aware work queues that bring together the reason, supporting evidence, owner, and next action.',
    steps: ['Ingest denial and remittance data', 'Classify the reason and required response', 'Assign the correct playbook', 'Assemble supporting documentation', 'Track approval, filing, and follow-up'],
  },
  'payer-integrations': {
    title: 'Payer and clearinghouse integrations',
    eyebrow: 'Process Automation / Healthcare',
    intro: 'Create a stable integration layer between internal claim workflows and the formats, protocols, and acknowledgements used by external endpoints.',
    steps: ['Define one canonical internal model', 'Map the receiving endpoint requirements', 'Transmit through the approved protocol', 'Correlate acknowledgements and responses', 'Log failures and route exceptions'],
  },
}

const workPatterns = [
  {
    slug: 'approval-workflows',
    title: 'Approval workflows',
    summary: 'Request → policy check → owner review → approval → audit record',
    intro: 'Replace approval chains hidden in email and chat with a controlled workflow that applies policy, assigns ownership, records decisions, and keeps every request visible.',
    steps: ['Capture the request and supporting evidence', 'Apply policy and routing rules', 'Assign the accountable reviewer', 'Record approval, rejection, or revision', 'Publish the outcome and audit history'],
  },
  {
    slug: 'client-onboarding',
    title: 'Client onboarding',
    summary: 'Intake → evidence → verification → provisioning → status visibility',
    intro: 'Coordinate customer intake, verification, account setup, and handoffs in one transparent onboarding journey for clients and internal teams.',
    steps: ['Collect structured client information', 'Validate required evidence', 'Route exceptions to the right owner', 'Provision services and system access', 'Share status and next actions'],
  },
  {
    slug: 'operational-portals',
    title: 'Operational portals',
    summary: 'Customer requests → work queues → decisions → notifications',
    intro: 'Give customers and delivery teams one dependable place to submit requests, manage work, make decisions, and see progress without repeated follow-up.',
    steps: ['Capture customer requests', 'Create prioritized work queues', 'Coordinate decisions and approvals', 'Notify stakeholders at key events', 'Measure service status and throughput'],
  },
  {
    slug: 'api-integrations',
    title: 'API integrations',
    summary: 'Canonical data → adapters → retries → reconciliation → logging',
    intro: 'Connect systems through resilient integration services that normalize data, handle failures safely, and make every exchange traceable.',
    steps: ['Define the canonical data contract', 'Build endpoint-specific adapters', 'Validate and transmit each message', 'Retry and reconcile failed exchanges', 'Monitor activity, errors, and ownership'],
  },
  {
    slug: 'cloud-modernization',
    title: 'Cloud modernization',
    summary: 'Assessment → target architecture → staged migration → observability',
    intro: 'Modernize infrastructure through a staged plan that protects service continuity while improving delivery, security, visibility, and operational ownership.',
    steps: ['Assess applications and dependencies', 'Define the target architecture', 'Prioritize migration waves', 'Release with verification and rollback controls', 'Operate with telemetry and cost visibility'],
  },
  {
    slug: 'mobile-products',
    title: 'Mobile products',
    summary: 'Product strategy → UX → engineering → release → iteration',
    intro: 'Turn a mobile product opportunity into a focused, maintainable application with a clear user journey, reliable backend services, and a disciplined release process.',
    steps: ['Define the user and product outcome', 'Prototype the critical experience', 'Engineer the app and service layer', 'Test and release through app stores', 'Learn from usage and improve'],
  },
] as const

const workPatternDetail: Record<string, { title: string; eyebrow: string; intro: string; steps: string[] }> = Object.fromEntries(
  workPatterns.map(({ slug, title, intro, steps }) => [slug, { title, eyebrow: 'Work / Solution pattern', intro, steps: [...steps] }]),
)

// Add only links confirmed by the client. Empty links remain hidden from visitors.
const verifiedSocialLinks: Record<'LinkedIn' | 'Facebook', string> = {
  LinkedIn: '',
  Facebook: '',
}

function go(path: string) {
  window.location.href = path
}

const LANDING_BANNER_STORAGE_KEY = 'unifytechs:service-banner:last-shown'
const LANDING_BANNER_INTERVAL_MS = 3 * 60 * 60 * 1000

function LandingBanner() {
  const [open, setOpen] = useState(() => {
    if (window.location.pathname !== '/') return false
    try {
      const lastShown = Number(window.localStorage.getItem(LANDING_BANNER_STORAGE_KEY) || 0)
      return !lastShown || Date.now() - lastShown >= LANDING_BANNER_INTERVAL_MS
    } catch {
      return true
    }
  })
  const [bannerIndex, setBannerIndex] = useState(() => {
    const values = new Uint32Array(1)
    window.crypto.getRandomValues(values)
    return values[0] % landingBanners.length
  })
  const banner = landingBanners[bannerIndex]

  useEffect(() => {
    if (!open) return
    try {
      window.localStorage.setItem(LANDING_BANNER_STORAGE_KEY, String(Date.now()))
    } catch {
      // The banner still works when storage is unavailable.
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const rotation = window.setInterval(() => {
      setBannerIndex((current) => (current + 1) % landingBanners.length)
    }, 2000)
    return () => window.clearInterval(rotation)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeButton = document.querySelector<HTMLButtonElement>('.landing-banner__close')
    closeButton?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!open) return null
  return (
    <section className="landing-banner" role="dialog" aria-modal="true" aria-labelledby="landing-banner-title">
      <div className="landing-banner__panel">
        <div className="landing-banner__media" key={`media-${banner.image}`}>
          <img className="landing-banner__image" src={banner.image} alt={`${banner.eyebrow} service architecture`} fetchPriority="high" />
          <span className="landing-banner__count">One of four service stories</span>
        </div>
        <div className="landing-banner__content" key={`content-${banner.image}`}>
          <div className="landing-banner__brand"><img src="/brand/unify-techs-mark-latest.png" alt="" /><span>Unify Techs</span></div>
          <span className="eyebrow eyebrow--light">{banner.eyebrow}</span>
          <h2 id="landing-banner-title">{banner.title}</h2>
          <p>{banner.copy}</p>
          <div className="landing-banner__actions">
            <a className="button button--white" href={banner.href}>Check now <ArrowRight /></a>
            <button type="button" className="landing-banner__skip" onClick={() => setOpen(false)}>Continue to homepage</button>
          </div>
        </div>
        <button className="landing-banner__close" type="button" onClick={() => setOpen(false)} aria-label="Close service banner"><X /></button>
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const isActive = (href: string) => href === '/process-automation'
    ? currentPath.startsWith('/process-automation')
    : currentPath === href
  const navLink = (href: string, label: string) => (
    <a className={isActive(href) ? 'nav-link active' : 'nav-link'} href={href} aria-current={isActive(href) ? 'page' : undefined}>{label}</a>
  )
  return (
    <header className="nav-shell">
      <div className="site-width nav-inner">
        <a className="brand" href="/" aria-label="Unify Techs home">
          <img src="/brand/unify-techs-mark-latest.png" alt="" width="42" height="42" />
          <span>Unify Techs</span>
        </a>
        <button className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {navLink('/process-automation', 'Process Automation')}
          {navLink('/web-app-engineering', 'Web & App')}
          {navLink('/cloud-infrastructure', 'Cloud')}
          {navLink('/work', 'Work')}
          {navLink('/about', 'About')}
          {navLink('/insights', 'Insights')}
          <a className={isActive('/contact') ? 'nav-cta active' : 'nav-cta'} href="/contact" aria-current={isActive('/contact') ? 'page' : undefined}>Discuss Your Project <ArrowRight size={16} /></a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const socialLinks = Object.entries(verifiedSocialLinks).filter((entry): entry is [string, string] => Boolean(entry[1]))
  return (
    <footer className="footer">
      <div className="site-width footer-grid">
        <div className="footer-brand">
          <a className="brand brand--footer" href="/"><img src="/brand/unify-techs-mark-latest.png" alt="" width="46" height="46" /><span>Unify Techs</span></a>
          <p>Process automation, digital products, and cloud foundations designed as one connected system.</p>
          {socialLinks.length > 0 && <div className="footer-socials">{socialLinks.map(([label,href])=><a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>}
        </div>
        <div><strong>Services</strong><a href="/process-automation">Process Automation</a><a href="/web-app-engineering">Web & App Engineering</a><a href="/cloud-infrastructure">Cloud & Infrastructure</a><a href="/process-automation/healthcare">Healthcare Automation</a></div>
        <div><strong>Company</strong><a href="/work">Work</a><a href="/engagement-model">How We Engage</a><a href="/about">About</a><a href="/insights">Insights</a><a href="/contact">Contact</a></div>
        <div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a></div>
      </div>
      <div className="site-width footer-bottom"><span>© {new Date().getFullYear()} Unify Techs. All rights reserved.</span><span>Technology that follows the work.</span></div>
    </footer>
  )
}

function VisualPanel({ kind }: { kind: VisualKey }) {
  if (kind === 'documents') return <div className="visual visual--documents" aria-label="Documents entering a validated processing workflow"><span className="visual-kicker">INTAKE / VALIDATE / ROUTE</span><span className="visual-index">01</span><div className="visual-orbit orbit-a"/><div className="doc-stack"><span>PDF</span><span>FORM</span><span>SCAN</span></div><div className="flow-line"><i /><i /><i /></div><div className="data-card"><small>VALIDATED RECORD</small><b>24 fields mapped</b><div className="data-meter"><i/></div><em><Check size={15} /> Ready for review</em></div><span className="visual-caption">STRUCTURED OUTPUT · EXCEPTIONS VISIBLE</span></div>
  if (kind === 'workflow') return <div className="visual visual--workflow" aria-label="Multi-step approval workflow"><span className="visual-kicker">CONTROLLED WORKFLOW</span><span className="visual-index">02</span><div className="visual-orbit orbit-b"/><div className="workflow-node node-a"><small>REQUEST</small><b>Submitted</b><i>09:42</i></div><div className="workflow-node node-b"><small>REVIEW</small><b>Policy check</b><i>Passed</i></div><div className="workflow-node node-c"><small>APPROVAL</small><b>Owner assigned</b><i>In progress</i></div><div className="workflow-node node-d"><small>COMPLETE</small><b>Logged</b><i>Traceable</i></div><svg viewBox="0 0 700 460" aria-hidden><path d="M150 115 C330 115 250 230 350 230 S480 345 570 345" /><path d="M350 230 C410 230 430 115 565 115" /></svg><span className="visual-caption">OWNERSHIP · ROUTING · AUDIT TRAIL</span></div>
  if (kind === 'products') return <div className="visual visual--products" aria-label="Connected client portal and operational product interfaces"><span className="visual-kicker">ONE PRODUCT · EVERY CONTEXT</span><span className="visual-index">03</span><div className="visual-orbit orbit-c"/><div className="browser-card"><div className="browser-top"><i /><i /><i /><span>portal.unify</span></div><aside><b>U</b><i/><i/><i/></aside><main><small>OPERATIONS</small><h3>Work queue</h3><div className="mini-row active"><i/><span>Ready for review</span><b>12</b></div><div className="mini-row"><i/><span>Waiting on input</span><b>04</b></div><div className="mini-row"><i/><span>Completed today</span><b>28</b></div></main></div><div className="phone-card"><div className="phone-pill" /><small>MOBILE</small><b>3 items ready</b><span>Review queue</span></div><span className="visual-caption">PORTAL · PLATFORM · MOBILE</span></div>
  return <div className="visual visual--cloud" aria-label="Cloud architecture with APIs, services, and observability"><span className="visual-kicker">OBSERVABLE BY DESIGN</span><span className="visual-index">04</span><div className="cloud-grid" /><div className="visual-orbit orbit-d"/><div className="cloud-node api"><Code2 /><small>API</small><i>Healthy</i></div><div className="cloud-node services"><Layers3 /><small>SERVICES</small><i>6 running</i></div><div className="cloud-node platform"><Cloud /><small>PLATFORM</small><i>Stable</i></div><div className="cloud-node observe"><ShieldCheck /><small>OBSERVE</small><i>Live</i></div><svg viewBox="0 0 700 460" aria-hidden><path d="M130 230 H570" /><path d="M350 100 V360" /></svg><span className="visual-caption">APIS · DEPLOYMENT · RELIABILITY</span></div>
}

function CapabilityStory() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-story]'))
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.story))
    }, { rootMargin: '-40% 0px -48% 0px', threshold: [0, .5, .8] })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="site-width story-heading"><span className="eyebrow">Four connected capabilities</span><h2 id="story-title">One operation. Four ways to make it work better.</h2></div>
      <div className="site-width story-layout">
        <div className="story-copy">
          {visualStories.map((item, index) => <article key={item.key} data-story={index} className={active === index ? 'story-step active' : 'story-step'}>
            <span className="story-number">{item.number} / 04</span><span className="eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.copy}</p><a href={item.href}>{item.cta} <ArrowRight size={18} /></a><div className="story-mobile-visual"><VisualPanel kind={item.key} /></div>
          </article>)}
        </div>
        <div className="story-sticky"><div className="story-visual-frame"><div className="story-visual-stage" key={visualStories[active].key}><VisualPanel kind={visualStories[active].key} /></div></div><div className="story-dots">{visualStories.map((item, index) => <button key={item.key} className={active === index ? 'active' : ''} onClick={() => document.querySelector(`[data-story="${index}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })} aria-label={`Show ${item.title}`} />)}</div></div>
      </div>
    </section>
  )
}

function HomePage() {
  return <>
    <main>
      <section className="hero">
        <div className="site-width hero-grid">
          <div className="hero-copy"><span className="eyebrow">Process automation · Product engineering · Cloud</span><h1>From manual work to systems that scale.</h1><p>We map fragmented workflows, automate repetitive operations, build professional digital products, and design the infrastructure that keeps everything dependable.</p><div className="button-row"><a className="button button--primary" href="/contact?intent=assessment">Request a Process Assessment <ArrowRight /></a><a className="button button--secondary" href="#capabilities">Explore Our Capabilities</a></div></div>
          <div className="hero-system" aria-label="Manual inputs becoming one reliable automated system"><div className="system-sources"><span><FileCheck2 /> Documents</span><span><Route /> Approvals</span><span><Network /> Systems</span></div><div className="system-core"><img src="/brand/unify-techs-mark-latest.png" alt="" /><small>UNIFIED OPERATION</small><b>Mapped · Automated · Monitored</b></div><div className="system-output"><small>RELIABLE OUTPUT</small><span><Check /> Routed</span><span><Check /> Logged</span><span><Check /> Visible</span></div></div>
        </div>
        <div className="site-width hero-foot"><span>Built for founders, operations leaders, product teams, and CTOs.</span><a href="#capabilities">Scroll to see the system <ChevronDown /></a></div>
      </section>
      <div id="capabilities"><CapabilityStory /></div>
      <section className="before-after section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow">Process automation deep dive</span><h2>Map the work before selecting the technology.</h2><p>Automation works when the full process—including decisions, exceptions, ownership, and system boundaries—is understood first.</p></div><div className="compare-grid"><div className="compare-card before"><span>BEFORE</span><h3>Work held together by memory</h3>{['Spreadsheets and status columns', 'Email approvals and follow-ups', 'Repeated data entry', 'Disconnected tools', 'Limited operational visibility'].map(x => <p key={x}><X size={16} />{x}</p>)}</div><div className="compare-arrow"><ArrowRight /></div><div className="compare-card after"><span>AFTER</span><h3>A process the business can operate</h3>{['Mapped workflows and ownership', 'Automated routing and approvals', 'Connected systems and structured data', 'Traceable decisions', 'Visible exceptions and next actions'].map(x => <p key={x}><Check size={16} />{x}</p>)}</div></div><div className="process-line">{['Discover', 'Map', 'Design', 'Build', 'Integrate', 'Monitor', 'Improve'].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, '0')}</span><b>{x}</b></div>)}</div></div></section>
      <section className="delivery-evidence section-pad"><div className="site-width delivery-evidence__grid"><figure><img src="/work/product-team-premium.webp" alt="Software engineers reviewing an application together" loading="lazy" /><figcaption>Engineering decisions made visible.</figcaption></figure><div><span className="eyebrow">What professional delivery looks like</span><h2>Useful progress, visible every week.</h2><p>Clients should not need to decode technical activity. We organize delivery around decisions, working increments, quality evidence, and the next business outcome.</p><div className="evidence-list">{[['A shared delivery view','Priorities, owners, risks, and acceptance criteria stay visible.'],['Working increments','Review real behavior early instead of waiting for a final reveal.'],['Operational readiness','Release, monitoring, recovery, and support are designed before launch.']].map(([title,body],i)=><div key={title}><span>0{i+1}</span><section><h3>{title}</h3><p>{body}</p></section></div>)}</div></div></div></section>
      <section className="healthcare-feature section-pad"><div className="site-width healthcare-grid"><div><span className="eyebrow eyebrow--light">Focused industry depth</span><h2>Claims workflows with clear controls.</h2><p>Document intake, eligibility, validation, denials, and payer connectivity—treated as one operational system.</p><a className="text-link light" href="/process-automation/healthcare">Explore healthcare automation <ArrowRight /></a></div><div className="healthcare-list">{healthcareSolutions.slice(0, 4).map(([title], i) => <span key={title}><b>0{i + 1}</b>{title}</span>)}</div></div></section>
      <section className="engage section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Choose the right starting point</span><h2>One problem. A clear first engagement.</h2></div><a className="text-link" href="/engagement-model">Compare engagement models <ArrowRight /></a></div><div className="engage-grid">{[['Automation Assessment','Map the process and leave with a prioritized implementation roadmap.','/contact?intent=assessment'],['Defined Project','Design and deliver a specific product, workflow, or platform outcome.','/contact?intent=project'],['Startup Partnership','Explore qualified low-upfront product delivery with defined commercial rights.','/engagement-model']].map(([title,body,href],i)=><a href={href} key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p><b>Explore option <ArrowRight size={16}/></b></a>)}</div></div></section>
      <section className="insights-preview section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Decision briefs</span><h2>Short reads for the next technology decision.</h2></div><a className="text-link" href="/insights">View all insights <ArrowRight /></a></div><div className="insight-grid">{[['How to Identify a Process Worth Automating','automation-opportunity'],['Why Automating a Broken Workflow Makes It Worse','broken-workflow'],['From Spreadsheet to Operational System','spreadsheet-system']].map(([title,slug],i)=><a href={`/insights#${slug}`} key={title}><span>{['PROCESS AUTOMATION','WORKFLOW DESIGN','SYSTEM DESIGN'][i]}</span><h3>{title}</h3><p>Read brief <ArrowRight size={16}/></p></a>)}</div></div></section>
      <section className="final-cta"><div className="site-width"><span className="eyebrow eyebrow--light">Start with the workflow</span><h2>What manual process is slowing your business down?</h2><p>Show us the workflow, tools, and handoffs involved. We’ll help determine what should be simplified, integrated, or automated.</p><div className="button-row"><a className="button button--white" href="/contact?intent=assessment">Request a Process Assessment <ArrowRight /></a><a className="button button--outline" href="/contact">Discuss a Web, App, or Cloud Project</a></div></div></section>
    </main>
  </>
}

const pageCopy: Record<string, { eyebrow: string; title: string; intro: string; sections: Array<[string, string]> }> = {
  '/process-automation': { eyebrow: 'Primary specialization', title: 'Process Automation', intro: 'Turn repetitive work, approvals, documents, operational logs, and disconnected systems into dependable automated workflows.', sections: [['Business process mapping','Make the actual flow of work visible before deciding what to automate.'],['Workflow automation','Route tasks, approvals, evidence, and exceptions through a controlled process.'],['Document processing','Convert unstructured inputs into validated data with review where confidence is low.'],['System integration','Synchronize data across APIs, databases, files, and operational tools.'],['Operational visibility','Build logging, dashboards, alerts, and exception queues into the workflow.'],['Healthcare claims operations','Apply the same discipline to claim intake, validation, denials, and payer connectivity.']] },
  '/web-app-engineering': { eyebrow: 'B2B digital products & platforms', title: 'Web & App Engineering', intro: 'Professional websites, client portals, SaaS platforms, internal applications, and mobile products built around real business workflows.', sections: [['Business websites','Clear, credible digital experiences designed for decision-makers and customers.'],['SaaS product development','Focused platforms that make a valuable repeatable workflow easier.'],['Client & partner portals','Secure spaces for requests, documents, status, communication, and action.'],['Internal operational tools','Purpose-built interfaces that replace fragile spreadsheet and inbox workflows.'],['Mobile applications','Practical mobile experiences connected to the same operational system.'],['API development','Stable interfaces that keep products, partners, and infrastructure connected.']] },
  '/cloud-infrastructure': { eyebrow: 'Dependable technical foundations', title: 'Cloud & Infrastructure', intro: 'Secure, observable, and scalable technical foundations for modern applications and automated operations.', sections: [['Solution architecture','Define boundaries, responsibilities, data flows, and operational requirements.'],['Cloud architecture','Choose managed services and deployment patterns that fit the workload.'],['DevOps & CI/CD','Make builds, tests, releases, and rollback consistent and repeatable.'],['Observability','Understand system health through useful logs, metrics, traces, and alerts.'],['Reliability planning','Design for failures, capacity, recovery, and operational ownership.'],['Cloud modernization','Move legacy workloads through a staged, measurable improvement plan.']] },
}

const serviceVisuals: Record<string, { image: string; alt: string; label: string; title: string; points: string[] }> = {
  'Process Automation': {
    image: '/work/document-workflow-premium.webp',
    alt: 'A paper document being prepared for digital scanning',
    label: 'From manual intake to controlled flow',
    title: 'Start where time and control are being lost.',
    points: ['Repeated handoffs', 'Unstructured documents', 'Approval delays', 'Invisible exceptions'],
  },
  'Web & App Engineering': {
    image: '/work/product-team-premium.webp',
    alt: 'Software engineers reviewing application code together',
    label: 'Product engineering in practice',
    title: 'One product view—from user need to production.',
    points: ['Product strategy', 'Experience design', 'Application engineering', 'Release ownership'],
  },
  'Cloud & Infrastructure': {
    image: '/work/infrastructure-premium.webp',
    alt: 'Professional server infrastructure in a controlled environment',
    label: 'Infrastructure that can be operated',
    title: 'Reliability is designed, tested, and owned.',
    points: ['Architecture boundaries', 'Delivery controls', 'Operational telemetry', 'Recovery planning'],
  },
}

function ServiceVisual({ service }: { service: string }) {
  const visual = serviceVisuals[service]
  return <section className="service-visual"><div className="site-width service-visual__grid"><figure><img src={visual.image} alt={visual.alt} loading="lazy" /></figure><div><span className="eyebrow eyebrow--light">{visual.label}</span><h2>{visual.title}</h2><div className="service-visual__points">{visual.points.map((point,i)=><span key={point}><b>0{i+1}</b>{point}</span>)}</div></div></div></section>
}

function StandardPage({ data }: { data: (typeof pageCopy)[string] }) {
  return <main><section className="page-hero"><div className="site-width"><span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><div className="button-row"><a className="button button--primary" href="/contact">Discuss your project <ArrowRight /></a><a className="button button--secondary" href="/work">See solution patterns</a></div></div></section><ServiceVisual service={data.title} /><section className="page-grid-section section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Capabilities</span><h2>Focused expertise, combined around the outcome.</h2></div><p>Select the capabilities you need. We connect them into one delivery plan with explicit ownership and acceptance criteria.</p></div><div className="service-grid">{data.sections.map(([title,body],i)=><article id={title.toLowerCase().replaceAll(' ','-')} key={title}><span>{String(i+1).padStart(2,'0')}</span><h2>{title}</h2><p>{body}</p>{title === 'Healthcare claims operations' && <a href="/process-automation/healthcare">Explore healthcare automation <ArrowRight size={16}/></a>}</article>)}</div></div></section><ServiceDepth service={data.title} /><PageCta eyebrow="Next step" title={`Turn your ${data.title.toLowerCase()} priority into a delivery plan.`} copy="Share the current situation, the outcome you need, and the systems involved. We’ll propose a practical starting point." button="Start the conversation" /></main>
}

function ServiceDepth({ service }: { service: string }) {
  if (service === 'Process Automation') return <>
    <section className="service-proof section-pad"><div className="site-width service-proof__grid"><div><span className="eyebrow eyebrow--light">Built around the real process</span><h2>Automation that can handle the normal path—and the exceptions.</h2><p>We begin with the people, decisions, evidence, systems, and edge cases involved. The resulting workflow is designed to be operated, reviewed, and improved after launch.</p></div><div className="proof-list">{[['01','Map ownership','Clarify who acts, decides, approves, and resolves exceptions.'],['02','Connect the systems','Use APIs, files, queues, and data synchronization without forcing a full replacement.'],['03','Make work visible','Include status, history, alerts, operational logs, and recovery paths.'],['04','Improve safely','Measure bottlenecks and refine the process without breaking daily operations.']].map(([n,t,b])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{b}</p></div></article>)}</div></div></section>
    <section className="industry-section section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Designed across operating environments</span><h2>The workflow changes. The engineering discipline does not.</h2></div><p>Process automation can support healthcare, fintech, logistics, professional services, customer operations, finance teams, and growing internal operations.</p></div><div className="industry-tags">{['Document-heavy operations','Multi-step approvals','Client onboarding','Claims and financial workflows','Operational reporting','Cross-system reconciliation','Audit-sensitive work','High-volume exception queues'].map(x=><span key={x}>{x}</span>)}</div></div></section>
  </>
  if (service === 'Web & App Engineering') return <>
    <section className="product-showcase section-pad"><div className="site-width product-showcase__grid"><div><span className="eyebrow">From concept to maintained product</span><h2>Professional products—not disconnected screens.</h2><p>Strategy, UX, application architecture, APIs, deployment, and operational support are considered together. That creates a product customers can understand and a system teams can maintain.</p><div className="product-types">{['B2B SaaS platforms','Client and partner portals','Internal operations software','Mobile applications','Professional company websites','API-connected products'].map(x=><span key={x}><Check />{x}</span>)}</div></div><div className="product-composition" aria-label="Connected web, portal, and mobile product surfaces"><div className="product-screen screen-web"><small>WEB PRODUCT</small><i/><i/><i/></div><div className="product-screen screen-portal"><small>CLIENT PORTAL</small><b>12</b><i/><i/></div><div className="product-phone"><small>MOBILE</small><i/><i/><i/></div><div className="product-core">API</div></div></div></section>
    <section className="play-console section-pad"><div className="site-width play-console__grid"><div className="play-console__mark"><img src="/brand/unify-techs-mark-latest-source.png" alt="Unify Techs Google Play Console developer icon" /></div><div><span className="eyebrow eyebrow--light">Mobile product delivery</span><h2>Google Play Console presence with two applications in active development.</h2><p>Unify Techs maintains a Google Play Console developer account. Two mobile applications are currently moving through development and release preparation. We apply the same product discipline to store assets, release tracks, testing, application quality, and post-launch iteration.</p><div className="release-steps">{['Product & UX','Application engineering','Quality assurance','Release preparation','Store delivery','Ongoing improvement'].map((x,i)=><span key={x}><b>{String(i+1).padStart(2,'0')}</b>{x}</span>)}</div></div></div></section>
    <section className="audience-section section-pad" id="buyer-moments"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">When teams call us</span><h2>Four moments that need more than another developer.</h2></div><p>We enter where product ambition meets an operating constraint—then make the path to a dependable release visible.</p></div><div className="buyer-moments">{[
      ['01','Founders','The service works. The software does not exist yet.','Shape the first credible product.'],
      ['02','Operations leaders','The team is moving faster than its tools.','Replace manual handoffs with one operating flow.'],
      ['03','Product leaders','The roadmap is clear. Delivery capacity is not.','Add focused engineering without losing architecture.'],
      ['04','Agencies & consultancies','The client need is real. The specialist bench is missing.','Extend delivery under clear ownership.'],
    ].map(([n,role,moment,outcome])=><article className="buyer-moment" key={role}><div className="buyer-moment__top"><span>{n}</span><b>{role}</b></div><h3>{moment}</h3><p>{outcome}</p><a href={`/contact?intent=${encodeURIComponent(role.toLowerCase())}`}>Start from this moment <ArrowRight size={16}/></a></article>)}</div></div></section>
  </>
  return <>
    <section className="service-proof section-pad"><div className="site-width service-proof__grid"><div><span className="eyebrow eyebrow--light">Architecture that can be operated</span><h2>Cloud decisions tied to reliability, delivery speed, and ownership.</h2><p>We design the platform as an operating model—not a diagram that stops at deployment. Security boundaries, releases, failures, telemetry, recovery, and cost are considered from the beginning.</p></div><div className="proof-list">{[['01','Architecture boundaries','Define services, data ownership, integration contracts, and trust zones.'],['02','Delivery systems','Build repeatable CI/CD, environments, testing gates, and rollback paths.'],['03','Operational visibility','Use logs, metrics, traces, alerts, and service-level indicators that answer real questions.'],['04','Reliability planning','Design for capacity, failure, recovery, continuity, and accountable response.']].map(([n,t,b])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{b}</p></div></article>)}</div></div></section>
    <section className="cloud-layers section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow">Connected platform layers</span><h2>From source code to production confidence.</h2></div><div className="cloud-layer-flow">{[['Source','Application and infrastructure definitions'],['Build','Automated checks and reproducible artifacts'],['Deploy','Controlled releases and environment promotion'],['Observe','Logs, metrics, traces, and alerts'],['Recover','Rollback, resilience, and continuity plans']].map(([t,b],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{b}</p></article>)}</div></div></section>
  </>
}

function HealthcarePage() {
  return <main><section className="page-hero page-hero--dark"><div className="site-width"><span className="eyebrow eyebrow--light">Process Automation / Healthcare</span><h1>Healthcare claims operations</h1><p>Focused workflow and integration patterns for claim intake, eligibility, validation, denials, and payer connectivity.</p><a className="button button--white" href="/contact">Discuss a healthcare workflow <ArrowRight /></a></div></section><section className="section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow">Capabilities</span><h2>Existing healthcare depth, organized under Process Automation.</h2><p>These pages describe solution approaches—not customer claims, guaranteed outcomes, or compliance certifications.</p></div><div className="healthcare-cards">{healthcareSolutions.map(([title,body,href],i)=><a href={href} key={title}><span>0{i+1}</span><h2>{title}</h2><p>{body}</p><b>Explore capability <ArrowRight size={16}/></b></a>)}</div></div></section><PageCta eyebrow="Healthcare workflow assessment" title="Start with one operational bottleneck." copy="Identify the documents, decisions, systems, and owners involved before defining the automation." button="Discuss the workflow" /></main>
}

function SolutionDetailPage({ data }: { data: (typeof solutionDetail)[string] }) {
  return <main><section className="page-hero"><div className="site-width"><span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><a className="button button--primary" href="/contact">Discuss this workflow <ArrowRight /></a></div></section><section className="detail-flow section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow">Example architecture</span><h2>A controlled path from input to outcome.</h2></div><div className="detail-steps">{data.steps.map((step,i)=><div key={step}><span>{String(i+1).padStart(2,'0')}</span><h3>{step}</h3></div>)}</div><p className="pattern-note">This is a solution pattern. Final architecture, controls, integrations, and operating responsibilities depend on discovery and the systems involved.</p></div></section><PageCta eyebrow="Adapt the pattern" title={`Make ${data.title.toLowerCase()} fit your operation.`} copy="Discovery defines the controls, integrations, roles, and service levels needed in your environment." button="Review this pattern" /></main>
}

function WorkPage() {
  const showcases = [
    {number:'01',category:'Process automation',title:'Turn document-heavy operations into controlled workflows.',body:'Capture incoming files, validate required information, route exceptions, and deliver clean records without losing the audit trail.',image:'/work/document-workflow-premium.webp',alt:'A document being prepared for digital scanning',capabilities:['Document intake','Data validation','Exception queues','System delivery']},
    {number:'02',category:'Web & app engineering',title:'Connect customer experiences to the work behind them.',body:'Bring requests, status, approvals, notifications, and internal ownership into one maintainable digital product.',image:'/work/product-team-premium.webp',alt:'Software engineers reviewing an application together',capabilities:['B2B platforms','Client portals','Mobile delivery','API architecture']},
    {number:'03',category:'Cloud & infrastructure',title:'Build a platform the team can release and operate with confidence.',body:'Design delivery, security boundaries, telemetry, recovery, and ownership as one production operating model.',image:'/work/engineering-premium.webp',alt:'Infrastructure specialist working inside a data center',capabilities:['Cloud architecture','CI/CD systems','Observability','Reliability planning']}
  ]
  const clientScenarios = [
    {number:'01',sector:'Logistics · Client onboarding',title:'Every new client starts another document chase.',friction:'Evidence arrives through inboxes, status lives in spreadsheets, and activation waits for manual follow-up.',build:'A secure onboarding portal with structured intake, validation, exception queues, and visible ownership.',result:'One traceable path from first submission to service activation.',image:'/work/scenario-logistics-premium.webp',alt:'Warehouse operations professional scanning inventory with a handheld device',href:'/work/client-onboarding'},
    {number:'02',sector:'Healthcare · Claims operations',title:'Claim packets arrive faster than teams can structure them.',friction:'Scanned forms and supporting records create re-keying, inconsistent checks, and invisible exceptions.',build:'Controlled document intake, field extraction, confidence checks, human review, and an audit-ready handoff.',result:'Clean records move forward while uncertain fields reach the right reviewer.',image:'/work/scenario-healthcare-premium.webp',alt:'Healthcare professionals reviewing digital records in a medical office',href:'/process-automation/healthcare/document-extraction'},
    {number:'03',sector:'SaaS · Cloud operations',title:'Product growth has outpaced release confidence.',friction:'Environments drift, failures are difficult to diagnose, and every deployment depends on specialist memory.',build:'Repeatable delivery pipelines, production telemetry, rollback controls, recovery plans, and named ownership.',result:'Releases become observable, recoverable, and easier to operate as the platform grows.',image:'/work/infrastructure-premium.webp',alt:'Professional server infrastructure in a controlled environment',href:'/work/cloud-modernization'},
  ]
  return <main>
    <section className="page-hero work-hero"><div className="site-width"><span className="eyebrow">Work & solution patterns</span><h1>Serious systems begin with the real work.</h1><p>We design around operating processes, customer needs, and technical realities. The examples below show our delivery thinking without inventing client names, testimonials, or performance claims.</p><div className="button-row"><a className="button button--primary" href="/engagement-model">See how we charge and deliver <ArrowRight /></a></div><div className="work-hero__facts"><span><b>01</b>Understand the operation</span><span><b>02</b>Design the complete system</span><span><b>03</b>Deliver with ownership</span></div></div></section>
    <section className="work-showcases">{showcases.map((item,i)=><article className={`work-showcase ${i%2?'work-showcase--reverse':''}`} key={item.title}><div className="site-width work-showcase__grid"><div className="work-showcase__media"><img src={item.image} alt={item.alt} loading={i===0?'eager':'lazy'} /><span>Representative delivery environment</span></div><div className="work-showcase__copy"><div className="work-showcase__label"><span>{item.category}</span><b>{item.number}</b></div><h2>{item.title}</h2><p>{item.body}</p><div className="work-capabilities">{item.capabilities.map(capability=><span key={capability}><Check size={16}/>{capability}</span>)}</div><a className="text-link" href="/contact">Discuss a similar challenge <ArrowRight /></a></div></div></article>)}</section>
    <section className="client-scenarios section-pad" id="client-scenarios"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow eyebrow--light">Where Unify Techs can help</span><h2>See the problem. See the system around it.</h2></div><div><p>Three representative client situations, translated into practical delivery responses.</p><small>Illustrative scenarios—not claims about named clients or guaranteed results.</small></div></div><div className="client-scenario-grid">{clientScenarios.map((scenario,i)=><article className={`client-scenario ${i===0?'client-scenario--lead':''}`} key={scenario.title}><figure><img src={scenario.image} alt={scenario.alt} loading="lazy" /><figcaption>{scenario.sector}</figcaption></figure><div className="client-scenario__body"><span className="client-scenario__number">{scenario.number}</span><h3>{scenario.title}</h3><dl><div><dt>The friction</dt><dd>{scenario.friction}</dd></div><div><dt>What we build</dt><dd>{scenario.build}</dd></div><div><dt>Operational result</dt><dd>{scenario.result}</dd></div></dl><a href={scenario.href}>Explore the solution pattern <ArrowRight size={17}/></a></div></article>)}</div></div></section>
    <section className="work-patterns section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Additional solution patterns</span><h2>Common systems we can help define and deliver.</h2></div><p>Each engagement begins with discovery. Architecture, controls, integrations, and scope are adapted to the organization.</p></div><div className="pattern-grid pattern-grid--work">{workPatterns.map((pattern,i)=><article key={pattern.slug}><span>PATTERN {String(i+1).padStart(2,'0')}</span><h3>{pattern.title}</h3><p>{pattern.summary}</p><a href={`/work/${pattern.slug}`}>Explore this pattern <ArrowRight size={16}/></a></article>)}</div></div></section>
    <section className="work-method section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow eyebrow--light">Delivery evidence</span><h2>See the work becoming ready.</h2><p>Clear decisions, working increments, release controls, and operating ownership replace presentation theatre.</p></div><div className="work-method__grid">{[['Discovery baseline','Process, constraints, owners, and intended outcome.'],['System definition','Experience flows, boundaries, and integration contracts.'],['Delivery proof','Working software, quality checks, and acceptance evidence.'],['Operational handoff','Runbooks, telemetry, release controls, and named ownership.']].map(([title,body],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <PageCta eyebrow="Have a similar challenge?" title="Show us where the work slows down." copy="A short discovery conversation is enough to identify the right next step." button="Discuss your workflow" />
  </main>
}

function InsightsPage() {
  const posts = [
    {slug:'automation-opportunity',cat:'Process Automation',title:'How to identify a process worth automating',summary:'Look for stable rules, measurable volume, clear ownership, and a costly failure mode.',takeaway:'A five-signal opportunity test'},
    {slug:'broken-workflow',cat:'Workflow Design',title:'Why automating a broken workflow makes it worse',summary:'Remove redundant approvals, unclear decisions, and unnecessary handoffs before adding automation.',takeaway:'Simplify before you automate'},
    {slug:'spreadsheet-system',cat:'System Design',title:'From spreadsheet to operational system',summary:'Risk rises when one file becomes the database, task queue, approval tool, and reporting layer.',takeaway:'Know when the operating model has outgrown the file'},
    {slug:'client-portal',cat:'Web & App Engineering',title:'When your business needs a client portal',summary:'Portals work when customers repeatedly submit information, request status, or collaborate across a service.',takeaway:'Design around customer jobs, not a feature list'},
    {slug:'observability',cat:'Cloud Architecture',title:'What good observability looks like for a growing platform',summary:'Useful telemetry connects technical signals to customer impact and gives an owner enough context to act.',takeaway:'Logs, metrics, traces, and accountable response'},
    {slug:'build-or-buy',cat:'Product Strategy',title:'Off-the-shelf software or a custom application?',summary:'Buy standard capabilities. Build where the workflow differentiates the business or must connect fragmented systems.',takeaway:'A practical build-versus-buy framework'}
  ]
  return <main>
    <section className="page-hero insights-hero"><div className="site-width"><span className="eyebrow">Insights</span><h1>Clear thinking for better technology decisions.</h1><p>Practical field notes for leaders improving operational workflows, digital products, integrations, and cloud platforms.</p><div className="insight-topics"><span>Automation</span><span>Product engineering</span><span>Cloud architecture</span><span>Decision frameworks</span></div></div></section>
    <section className="featured-insight section-pad"><div className="site-width featured-insight__grid"><div className="featured-insight__copy"><span className="eyebrow eyebrow--light">Featured framework · Process automation</span><h2>Five questions to ask before automating a workflow.</h2><p>The strongest automation opportunities are not simply repetitive. They are understood well enough to define, valuable enough to improve, and owned well enough to maintain.</p><div className="featured-insight__meta"><span>7 minute briefing</span><span>For operations and technology leaders</span></div></div><ol className="insight-checklist">{['Is the trigger and desired outcome clear?','Are the rules stable enough to express?','Where do exceptions require human judgment?','Can value and failure be measured?','Who will own the workflow after launch?'].map((item,i)=><li key={item}><b>{String(i+1).padStart(2,'0')}</b><span>{item}</span></li>)}</ol></div></section>
    <section className="insight-library section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">The field guide</span><h2>One idea per brief. No filler.</h2></div><p>Concise perspectives grounded in process clarity, maintainable architecture, and responsible delivery.</p></div><div className="insight-list">{posts.map((post,i)=><article id={post.slug} key={post.title}><div className="insight-card__top"><span>{post.cat}</span><b>{String(i+1).padStart(2,'0')}</b></div><h3>{post.title}</h3><p>{post.summary}</p><div className="insight-takeaway"><Check size={17}/><span>{post.takeaway}</span></div></article>)}</div></div></section>
    <section className="decision-brief section-pad"><div className="site-width decision-brief__grid"><div><span className="eyebrow">A useful operating principle</span><h2>Technology should reduce uncertainty—not hide it.</h2></div><div><p>Professional systems make ownership, status, exceptions, and outcomes visible. Before selecting a platform or starting a build, document the decisions people make, the information they need, and the point where the current process loses control.</p><a className="text-link" href="/contact">Discuss a decision with our team <ArrowRight /></a></div></div></section>
    <PageCta eyebrow="Need a second view?" title="Bring us the decision you are weighing." copy="We’ll help separate the business requirement from the technology assumptions." button="Discuss the decision" />
  </main>
}

function AboutPage(){ return <main><section className="page-hero"><div className="site-width"><span className="eyebrow">About Unify Techs</span><h1>We design technology around the work it needs to support.</h1><p>Unify Techs is a technology consultancy focused on process automation, B2B digital products, and dependable cloud infrastructure.</p></div></section><section className="section-pad about-body"><div className="site-width two-col"><h2>One connected view of operations, applications, and infrastructure.</h2><div><p>Business processes rarely stop at the boundary of one application. A useful solution may involve workflow mapping, interface design, APIs, data movement, deployment, logging, and operational ownership.</p><p>Our approach is to understand that complete system first, then select and build the smallest set of technology needed to make it dependable.</p></div></div><div className="site-width values-grid">{['Map the process before selecting technology','Prefer clear architecture over unnecessary complexity','Build visibility and exception handling into the workflow','Communicate with business and technical stakeholders','Leave systems maintainable after delivery'].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></section><PageCta eyebrow="Work with Unify Techs" title="Start with the outcome your team needs." copy="We’ll help frame the process, product, and platform decisions around it." button="Introduce your project" /></main> }

function EngagementModelPage(){
  const requirements=[['01','Qualify','Problem, commitment, evidence, and partnership fit.'],['02','Discover','Users, workflow, decisions, data, exceptions, and risk.'],['03','Define','Priorities, architecture, acceptance, and success gate.'],['04','Control','Backlog, decision log, and impact-assessed changes.']]
  const delivery=[['Discover','Prototype the riskiest assumptions first.'],['Build','Ship small, reviewable product increments.'],['Assure','Test quality, security, accessibility, and performance.'],['Release','Deploy with approval, monitoring, and rollback readiness.']]
  const support=[['Support desk','Defined hours, priorities, response targets, and escalation.'],['Reliability','Monitoring, backups, recovery, security updates, and capacity.'],['Product care','Defect triage, improvements, releases, and service reviews.'],['Clear billing','License, support, infrastructure, and third-party costs separated.']]
  return <main>
    <section className="page-hero engagement-hero"><div className="site-width"><span className="eyebrow">How we engage</span><h1>Build now. Pay when it works.</h1><p>Selected startups get enterprise-grade product delivery without an upfront development fee. Ownership, success, and operating costs are agreed before we build.</p><div className="button-row"><a className="button button--primary" href="/contact">Apply for a product partnership <ArrowRight /></a><a className="button button--secondary" href="#commercial-model">See the model</a></div><div className="engagement-summary"><span><b>£0 / $0</b>Upfront development*</span><span><b>Defined</b>Success milestone</span><span><b>Predictable</b>Operating cost</span><span><b>Licensed</b>Product access</span></div></div></section>
    <section className="commercial-model section-pad" id="commercial-model"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">The commercial model</span><h2>Three clear stages.</h2></div><p>Available to qualified startups with a credible problem, committed founders, and a realistic route to adoption.</p></div><div className="commercial-steps"><article className="commercial-step commercial-step--primary"><span>01 · BUILD</span><h3>No upfront development fee*</h3><p>We fund the agreed initial product build. You provide domain access, decisions, and validation users.</p></article><article className="commercial-step"><span>02 · PROVE</span><h3>Reach the success gate</h3><p>We agree one measurable activation event before development begins.</p></article><article className="commercial-step"><span>03 · OPERATE</span><h3>Start predictable monthly payments</h3><p>Pay the product license, managed support, and itemized usage costs.</p></article></div><details className="model-details"><summary>What counts as success?</summary><p>Examples include production acceptance plus the first paying customer, contracted usage, or another objective milestone. The exact trigger is written into the agreement before delivery starts.</p></details><div className="commercial-alternative"><div><span className="eyebrow">Standard delivery option</span><h3>Want conventional paid development?</h3></div><p>Choose affordable fixed-scope phases for discovery, MVP, and production readiness, with ownership terms agreed for that engagement.</p></div></div></section>
    <section className="ownership-model section-pad"><div className="site-width"><div className="section-heading ownership-heading"><span className="eyebrow eyebrow--light">Product ownership</span><h2>Clear rights. No surprises.</h2><p>The partnership uses a license model: Unify Techs owns the technology; the startup owns its business and receives the right to commercialize the product.</p></div><div className="ownership-cards"><article><span>UNIFY TECHS OWNS</span><h3>Product technology</h3><ul><li>Source code</li><li>Reusable components</li><li>Architecture and deployment assets</li><li>Product improvements</li></ul></article><article><span>THE STARTUP OWNS</span><h3>Business assets</h3><ul><li>Company and brand</li><li>Customers and relationships</li><li>Business and customer data</li><li>Pre-existing IP and content</li></ul></article><article><span>THE STARTUP RECEIVES</span><h3>Commercial rights</h3><ul><li>Operate and sell the product</li><li>Defined market and duration</li><li>Agreed exclusivity, if applicable</li><li>Exit and buyout options, if agreed</li></ul></article></div><details className="model-details model-details--dark"><summary>How is the license defined?</summary><p>Scope, territory, duration, exclusivity, sublicensing, data export, exit assistance, and any buyout option are written into the signed agreement.</p></details></div><p className="site-width model-disclaimer">*Commercial overview only. Eligibility, fees, rights, success events, service levels, termination, and transition terms are governed by a signed agreement.</p></section>
    <section className="requirements-process section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Requirement engineering</span><h2>Understand before building.</h2></div><p>Four steps turn an idea into a controlled product baseline.</p></div><div className="engagement-process-grid">{requirements.map(([n,t,b])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div><details className="model-details"><summary>View requirement outputs</summary><div className="delivery-artifacts">{['Opportunity brief','Process map','Prioritized requirements','Experience flows','Solution architecture','Quality requirements','Acceptance criteria','Success gate'].map(x=><span key={x}><Check size={15}/>{x}</span>)}</div></details></div></section>
    <section className="product-delivery section-pad"><div className="site-width"><div className="section-heading split"><div><span className="eyebrow">Product delivery</span><h2>Short cycles. Strong controls.</h2></div><p>Working software moves through four repeatable stages.</p></div><div className="delivery-method-grid">{delivery.map(([t,b],i)=><article key={t}><b>{String(i+1).padStart(2,'0')}</b><h3>{t}</h3><p>{b}</p></article>)}</div><details className="model-details"><summary>View enterprise quality controls</summary><p>Code review, automated checks, security review, accessibility, performance testing, acceptance testing, versioned environments, CI/CD, release approval, rollback planning, and monitored production launch are applied in proportion to risk.</p></details></div></section>
    <section className="operational-support section-pad"><div className="site-width"><div className="section-heading"><span className="eyebrow eyebrow--light">Operational support</span><h2>We stay accountable after launch.</h2><p>Support is matched to business criticality and documented in a clear service schedule.</p></div><div className="support-grid">{support.map(([t,b],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{b}</p></article>)}</div><details className="model-details model-details--dark"><summary>View incident priority model</summary><div className="support-severity"><span><b>P1</b>Production unavailable or critical data risk</span><span><b>P2</b>Major function materially degraded</span><span><b>P3</b>Limited defect with a workaround</span><span><b>P4</b>Question or planned improvement</span></div></details></div></section>
    <PageCta eyebrow="Product partnership" title="Have a credible problem and committed validation users?" copy="Share the product opportunity, founder commitment, and route to adoption so we can assess partnership fit." button="Apply for consideration" />
  </main>
}

function ContactPage(){ const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle'); const [message,setMessage]=useState(''); async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault(); const form=e.currentTarget; if(!form.reportValidity()) return; const fd=new FormData(form); if(fd.get('website')) return; setStatus('sending'); try{const res=await fetch(`${apiBaseUrl}/api/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({first:String(fd.get('first')||''),last:String(fd.get('last')||''),email:String(fd.get('email')||''),org:String(fd.get('org')||''),volume:String(fd.get('volume')||'not-applicable'),challenge:String(fd.get('challenge')||'')})}); if(!res.ok) throw new Error(); setStatus('success'); form.reset()}catch{setStatus('error');setMessage('We could not send the request. Please email us through LinkedIn or try again shortly.')}} return <main><section className="contact-page"><div className="site-width contact-grid"><div><span className="eyebrow eyebrow--light">Start a conversation</span><h1>Show us the process, product, or platform.</h1><p>Tell us what is happening today, where work slows down, and what a better outcome would look like.</p><div className="contact-points"><span><Check/>Process assessments</span><span><Check/>Defined project delivery</span><span><Check/>Technical delivery partnerships</span></div></div><form onSubmit={submit} noValidate><div className="form-row"><label>First name<input name="first" autoComplete="given-name" required /></label><label>Last name<input name="last" autoComplete="family-name" required /></label></div><label>Work email<input type="email" name="email" autoComplete="email" required /></label><label>Organization<input name="org" autoComplete="organization" /></label><label>What would you like to improve?<textarea name="challenge" rows={6} required placeholder="Describe the workflow, systems, handoffs, and current bottleneck." /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button button--primary" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send project details'} <ArrowRight/></button>{status==='success'&&<p className="form-success" role="status">Thank you. Your request has been sent.</p>}{status==='error'&&<p className="form-error" role="alert">{message}</p>}<small>By sending this form, you agree to our Privacy Policy. Please do not include sensitive personal, financial, or health information.</small></form></div></section></main> }

function LegalPage({type}:{type:'privacy'|'terms'}){return <main><section className="page-hero"><div className="site-width"><span className="eyebrow">Legal</span><h1>{type==='privacy'?'Privacy Policy':'Terms of Use'}</h1><p>Last updated August 15, 2026</p></div></section><article className="legal site-width">{type==='privacy'?<><h2>Information we collect</h2><p>When you contact Unify Techs, we receive the information you submit, such as your name, work email, organization, and project details.</p><h2>How information is used</h2><p>We use submitted information to respond to inquiries, understand requested services, operate the website, and improve our communications.</p><h2>Data minimization</h2><p>Do not submit protected health information, payment data, credentials, or other sensitive records through the public contact form.</p><h2>Contact</h2><p>Questions about this policy can be sent through the contact page.</p></>:<><h2>Website use</h2><p>This website provides general information about Unify Techs and its services. Content is not a binding offer or professional legal, financial, or compliance advice.</p><h2>Solution patterns</h2><p>Architectures and workflows presented on this website are examples. They must be assessed and adapted for each organization’s requirements.</p><h2>Third-party services</h2><p>References to technologies, standards, or industries do not imply endorsement, certification, or partnership.</p><h2>Contact</h2><p>Questions about these terms can be sent through the contact page.</p></>}</article></main>}

function PageCta({eyebrow='A practical next step',title='Bring us the workflow, not a preselected tool.',copy='We’ll help define what should be simplified, connected, automated, or built.',button='Discuss your project'}:{eyebrow?:string;title?:string;copy?:string;button?:string}){return <section className="page-cta"><div className="site-width page-cta__panel"><div className="page-cta__copy"><span className="eyebrow eyebrow--light">{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div><a className="button button--white" href="/contact">{button} <ArrowRight/></a></div></section>}

function App() {
  const path = useMemo(() => window.location.pathname.replace(/\/$/, '') || '/', [])
  useEffect(() => {
    window.scrollTo(0, 0)
    const meta: Record<string, [string, string]> = {
      '/': ['Unify Techs | Process Automation, Web & App Engineering, Cloud', 'Unify Techs maps and automates operational processes, builds professional digital products, and designs reliable cloud infrastructure.'],
      '/process-automation': ['Process Automation Services | Unify Techs', 'Business process mapping, workflow automation, document processing, system integrations, and operational visibility.'],
      '/web-app-engineering': ['B2B Web & App Engineering | Unify Techs', 'Professional websites, client portals, SaaS platforms, internal applications, and mobile products.'],
      '/cloud-infrastructure': ['Cloud & Infrastructure Consulting | Unify Techs', 'Cloud architecture, platform engineering, CI/CD, observability, reliability, and modernization services.'],
      '/process-automation/healthcare': ['Healthcare Process Automation | Unify Techs', 'Workflow and integration patterns for healthcare claim intake, eligibility, validation, denials, and payer connectivity.'],
      '/work': ['Solution Patterns & Work | Unify Techs', 'Example architectures for document processing, approval workflows, operational portals, integrations, and cloud modernization.'],
      '/engagement-model': ['Startup Product Partnership | Unify Techs', 'No-upfront product development for qualified startup partners, with defined ownership, delivery, operating costs, and support.'],
      '/about': ['About Unify Techs', 'A technology consultancy focused on process automation, B2B digital products, and dependable cloud infrastructure.'],
      '/insights': ['Technology Insights | Unify Techs', 'Practical guidance for teams improving workflows, products, integrations, and infrastructure.'],
      '/contact': ['Discuss Your Project | Unify Techs', 'Request a process assessment or discuss a web, app, cloud, or technical delivery project with Unify Techs.'],
      '/privacy': ['Privacy Policy | Unify Techs', 'How Unify Techs handles information submitted through this website.'],
      '/terms': ['Terms of Use | Unify Techs', 'Terms governing use of the Unify Techs website.'],
    }
    const activeWorkPattern = path.startsWith('/work/') ? workPatternDetail[path.split('/').pop() || ''] : undefined
    const fallback: [string, string] = activeWorkPattern
      ? [`${activeWorkPattern.title} | Unify Techs`, activeWorkPattern.intro]
      : path.startsWith('/process-automation/healthcare/')
        ? ['Healthcare Workflow Solution | Unify Techs', 'A healthcare process automation solution pattern from Unify Techs.']
        : ['Unify Techs', 'Process automation, digital products, and cloud infrastructure.']
    const [title, description] = meta[path] || fallback
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://unifytechs.us${path === '/' ? '/' : path}`)
  }, [path])
  let page
  if (path === '/') page = <HomePage />
  else if (pageCopy[path]) page = <StandardPage data={pageCopy[path]} />
  else if (path === '/process-automation/healthcare') page = <HealthcarePage />
  else if (path.startsWith('/process-automation/healthcare/')) page = <SolutionDetailPage data={solutionDetail[path.split('/').pop() || 'document-extraction'] || solutionDetail['document-extraction']} />
  else if (path === '/work') page = <WorkPage />
  else if (path.startsWith('/work/') && workPatternDetail[path.split('/').pop() || '']) page = <SolutionDetailPage data={workPatternDetail[path.split('/').pop() || '']} />
  else if (path === '/engagement-model') page = <EngagementModelPage />
  else if (path === '/insights') page = <InsightsPage />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/contact') page = <ContactPage />
  else if (path === '/privacy') page = <LegalPage type="privacy" />
  else if (path === '/terms') page = <LegalPage type="terms" />
  else page = <main><section className="page-hero"><div className="site-width"><span className="eyebrow">404</span><h1>Page not found.</h1><p>The page may have moved as part of the Unify Techs website redesign.</p><button className="button button--primary" onClick={() => go('/')}>Return home <ArrowRight /></button></div></section></main>
  return <><LandingBanner /><Header />{page}<Footer /></>
}

export default App
