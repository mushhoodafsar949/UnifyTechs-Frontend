/** Case study detail — opened from “Read Case Study” in Testimonials. */

export type CaseStudyId = 'medcore' | 'bluecross' | 'carepath'

export type CaseStudyDetail = {
  id: CaseStudyId
  headline: string
  client: string
  segment: string
  challenge: string
  solution: string[]
  results: string[]
  disclaimer: string
}

export const CASE_STUDIES: Record<CaseStudyId, CaseStudyDetail> = {
  medcore: {
    id: 'medcore',
    headline: 'MedCore Health Group — 87% faster claim throughput',
    client: 'MedCore Health Group',
    segment: 'Multi-specialty outpatient network',
    challenge:
      'Central billing was drowning in mixed PDF intake—professional claims, imaging addenda, and portal printouts—with limited staff to re-key into the host system before clearinghouse cutoff.',
    solution: [
      'Deployed UnifyTechs extraction profiles for CMS-1500 and attachment pairing.',
      ' Routed low-confidence fields to a dedicated exception queue with crops and payer context.',
      ' Fed structured output into existing billing host via nightly batches and same-day API for urgent lanes.',
    ],
    results: [
      '87% reduction in median time from scan arrival to clean claim ready for 837 generation.',
      'Denial rate for missing-field edits dropped materially within two production release cycles.',
      'CODING FTE hours reallocated to denial defense and patient estimates.',
    ],
    disclaimer:
      'Figures are representative of a composite enterprise rollout; your results depend on baseline operations and scope.',
  },
  bluecross: {
    id: 'bluecross',
    headline: 'BlueCross Digital Partners — audit exposure avoided',
    client: 'BlueCross Digital Partners',
    segment: 'Regional payer-aligned provider services org',
    challenge:
      'High audit risk from inconsistent ICD-10 / CPT pairing across high-dollar surgical lines; manual spreadsheets could not scale pre-submission checks.',
    solution: [
      'Turned on UnifyTechs code validator packs aligned to payer policy tables.',
      ' Integrated authorization crosswalk so missing auth stopped claims before submission.',
      ' Surfaced executive dashboards for denial drivers by facility and specialty.',
    ],
    results: [
      'Estimated eight-figure audit exposure avoided in the annual review window referenced by finance leadership.',
      'Appeal workload stabilized as preventable denials fell.',
    ],
    disclaimer:
      'Financial impact is illustrative and modeled from internal audits; not a guarantee of future performance.',
  },
  carepath: {
    id: 'carepath',
    headline: 'CarePath Systems — integration in under a week',
    client: 'CarePath Systems',
    segment: 'Community facility IT & revenue cycle',
    challenge:
      'Needed reimbursement automation without replacing the EHR or rewriting clearinghouse contracts—timeline was measured in days, not quarters.',
    solution: [
      'Used UnifyTechs SFTP watchers on existing export folders—no new VPN routes.',
      ' Mapped canonical JSON to the clearinghouse adapter already in use.',
      ' Enabled sandbox dry-runs before flipping production traffic.',
    ],
    results: [
      'First production batch live in seven calendar days from kickoff.',
      'Positive ROI narrative within first month on labor hours returned to patient-facing teams.',
    ],
    disclaimer:
      'Timeline assumes standard integration assumptions and stakeholder availability.',
  },
}
