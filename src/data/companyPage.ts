/**
 * Copy + content model for the public "About / Team" page (`#/team`).
 */

export type ApproachPillar = {
  /** Short heading (2-5 words). */
  title: string
  /** 1-2 sentence description. */
  body: string
  /** lucide-react icon name — resolved in the page component. */
  icon: 'zap' | 'fileCheck' | 'cpu' | 'shield' | 'workflow'
}

export const COMPANY_PAGE = {
  documentTitle: 'About UnifyTechs · Vision, Mission & Leadership',
  metaDescription:
    'UnifyTechs is building the revenue-cycle infrastructure healthcare deserves. Meet the founding team, our mission, vision, and how we partner with providers and payers.',

  eyebrow: 'ABOUT UNIFYTECHS',
  title: 'Redefining Healthcare Revenue Cycle Management',
  subtitle:
    'We combine revenue-cycle software, clinical AI, and payer-operations discipline so healthcare organizations can run more efficiently — and shift effort from administration back to patient care.',

  mission: {
    heading: 'Our Mission',
    body: 'Shift funding from the administration of healthcare to the delivery of care. We eliminate a meaningful share of the administrative waste draining the U.S. healthcare system by making claim reimbursement intelligent, automated, and auditable.',
  },

  vision: {
    heading: 'Our Vision',
    body: 'A future where revenue-cycle management is no longer a burden on providers — where the claim lifecycle becomes a seamless, automated process that runs quietly in the background, so clinicians, billers, and finance leaders get their time back.',
  },

  approachHeading: 'Turning a Breaking Point Into an Opportunity',
  approachIntro:
    'Healthcare organizations are under immense pressure. Manual processes, costly errors, and fragmented revenue-cycle operations drain billions every year. At UnifyTechs we don\u2019t just see the challenge — we\u2019re built to solve it.',
  approachPillars: [
    {
      title: 'RCM Automation',
      body: 'Eliminate inefficiencies and reduce the hidden costs that slow down cash flow, from eligibility and coding to denials and posting.',
      icon: 'zap',
    },
    {
      title: 'Clinical Documentation Integrity',
      body: 'Improve reimbursement accuracy by capturing and validating every detail that downstream adjudication depends on.',
      icon: 'fileCheck',
    },
    {
      title: 'AI in RCM',
      body: 'Surface new revenue opportunities and lower administrative costs so your teams can focus on what matters most — patients.',
      icon: 'cpu',
    },
  ] as const satisfies readonly ApproachPillar[],

  story: {
    heading: 'Our Story',
    paragraphs: [
      'UnifyTechs was born from the friction of legacy claim processing. Our founders are health-informatics engineers and former payer-operations leaders who lived the backlog, the denials, and the audit scrambles firsthand — and refused to accept that "this is just how it works."',
      'We stay close to enrollment desks, revenue integrity, and clearinghouse reality — not slide decks. Strategically, we treat the platform as a multi-payer interoperability layer: REST / FHIR where modern connectivity wins, ANSI X12 where the industry still runs on batch, always under HIPAA-conscious controls.',
      'That combination — clinical grounding, payer-operations depth, and modern engineering — positions UnifyTechs as a trusted, scalable, and flexible revenue-cycle partner for practices, facilities, and provider groups.',
    ],
  },

  founder: {
    eyebrow: 'FROM THE FOUNDER',
    name: 'Mushhood Afsar',
    title: 'Founder & CEO · UnifyTechs',
    photoUrl: '/about/mushhoodceo.png',
    photoAlt: 'Portrait of Mushhood Afsar, Founder and CEO of UnifyTechs',
    linkedinUrl: 'https://www.linkedin.com/in/mushhood-afsar/',
    quote:
      'I started UnifyTechs because I watched too many providers lose time and revenue to claim-processing friction that software should have solved a decade ago. Our job is to build the revenue-cycle infrastructure healthcare actually deserves — transparent, auditable, and deeply respectful of the clinical teams it serves.',
  },

  careers: {
    heading: 'Careers at UnifyTechs',
    body: 'We\u2019re building the future of healthcare revenue-cycle infrastructure and need bold, curious minds to help lead the way. Whether you\u2019re an engineer, clinician, billing leader, or compliance pro — if you\u2019ve felt the friction of broken claims, we\u2019d love to talk.',
  },
} as const
