/**
 * Deep-dive solution page data — one record per SolutionSlug.
 * Visual-only metadata (icons, process steps, metrics, hero kind) lives here so
 * the page component can stay presentational while remaining data-driven.
 */

import type { SolutionSlug } from '../legal/routes'
import { SERVICE_DETAILS, type ServiceDetail } from './serviceDetails'

export type SolutionIconId =
  | 'scan'
  | 'scroll'
  | 'shield'
  | 'send'
  | 'inbox'
  | 'search'
  | 'userSearch'
  | 'badgeCheck'
  | 'bell'
  | 'list'
  | 'link'
  | 'layers'
  | 'stethoscope'
  | 'check'
  | 'mail'
  | 'tag'
  | 'split'
  | 'fileText'
  | 'fileJson'
  | 'plug'
  | 'arrows'
  | 'clock'
  | 'upload'
  | 'fileOutput'
  | 'network'
  | 'refresh'

export type ProcessStep = {
  icon: SolutionIconId
  title: string
  body: string
}

export type Metric = {
  value: string
  label: string
}

export type SolutionContent = {
  slug: SolutionSlug
  detail: ServiceDetail
  eyebrow: string
  shortTitle: string
  hook: string
  heroKind: SolutionSlug
  metrics: Metric[]
  processHeading: string
  processLede: string
  processSteps: ProcessStep[]
  ctaHeading: string
  ctaBody: string
}

export const SOLUTIONS: Record<SolutionSlug, SolutionContent> = {
  ocr: {
    slug: 'ocr',
    detail: SERVICE_DETAILS.ocr,
    eyebrow: 'DOCUMENT AI',
    shortTitle: 'Form OCR & Extraction',
    hook: 'Turn faxed CMS-1500s, scanned UB-04 packets, and ADA dental claims into clean, structured data your billing engine can act on — without re-keying.',
    heroKind: 'ocr',
    metrics: [
      { value: '98%+', label: 'Field-level accuracy on clean packets' },
      { value: '< 30s', label: 'Median time from upload to structured output' },
      { value: '3 forms', label: 'CMS-1500, UB-04, and ADA J430D supported' },
    ],
    processHeading: 'How extraction works',
    processLede:
      'Every packet walks the same deterministic pipeline — from raw scan to canonical claim — with confidence scores you can audit at every hop.',
    processSteps: [
      {
        icon: 'upload',
        title: 'Ingest',
        body: 'Drop scans into SFTP, object storage, or the REST endpoint. Multi-page TIFF, PDF, and image inputs are all welcome.',
      },
      {
        icon: 'scan',
        title: 'Layout',
        body: 'Vision models locate form regions — boxes, grids, handwriting blocks — even on skewed or mixed-quality scans.',
      },
      {
        icon: 'search',
        title: 'Extract',
        body: 'Field-aware readers pull named values with pixel coordinates so every answer links back to its source crop.',
      },
      {
        icon: 'badgeCheck',
        title: 'Confidence',
        body: 'Each field carries a 0–1 score. Low-trust regions surface in a reviewer queue with the original image snippet.',
      },
      {
        icon: 'fileOutput',
        title: 'Normalize',
        body: 'Output emits a canonical claim model — JSON, flat file, or downstream webhook — ready for your clearinghouse or PM system.',
      },
    ],
    ctaHeading: 'Ready to stop re-keying packets?',
    ctaBody:
      'We can benchmark extraction on a redacted sample set from your existing intake queue and share field-level accuracy before you commit.',
  },

  eligibility: {
    slug: 'eligibility',
    detail: SERVICE_DETAILS.eligibility,
    eyebrow: 'BEFORE SUBMISSION',
    shortTitle: 'Eligibility Verification',
    hook: 'Catch inactive coverage, wrong plans, and missing prior auths before the claim ever leaves your four walls.',
    heroKind: 'eligibility',
    metrics: [
      { value: '270 / 271', label: 'ANSI eligibility envelopes supported end-to-end' },
      { value: 'Real-time', label: 'Plus batch windows for overnight schedules' },
      { value: '< 3s', label: 'Typical round-trip when payer endpoint is healthy' },
    ],
    processHeading: 'How eligibility checks run',
    processLede:
      'One unified API regardless of whether the payer answers over a clearinghouse, direct REST, or legacy batch.',
    processSteps: [
      {
        icon: 'userSearch',
        title: 'Lookup',
        body: 'Keyed by subscriber ID, member ID, DOB, or policy number — with demographic fallbacks for imperfect captures.',
      },
      {
        icon: 'send',
        title: 'Inquire',
        body: 'Route the 270 inquiry to the right gateway (clearinghouse, direct payer API, or batch) based on contract.',
      },
      {
        icon: 'inbox',
        title: 'Response',
        body: 'Parse the 271 response into a normalized coverage record — active dates, copay, deductible, plan tier.',
      },
      {
        icon: 'shield',
        title: 'Verify',
        body: 'Determine active vs. terminated, identify plan type mismatches, and flag when authorization is required pre-service.',
      },
      {
        icon: 'bell',
        title: 'Cache & Alert',
        body: 'Cache with sensible TTLs to avoid redundant payer calls. Alert when demographics on the claim disagree with payer record.',
      },
    ],
    ctaHeading: 'See your real denial rate shrink',
    ctaBody:
      'Pull one week of eligibility-driven denials with us. We’ll show which would have been caught upstream in a live trial.',
  },

  codes: {
    slug: 'codes',
    detail: SERVICE_DETAILS.codes,
    eyebrow: 'CLAIM SCRUBBING',
    shortTitle: 'ICD-10 / CPT Validator',
    hook: 'Deterministic rules, specialty packs, and reference data catch impossible code combinations, missing modifiers, and frequency edits before the payer audit finds them.',
    heroKind: 'codes',
    metrics: [
      { value: 'ICD-10 · CPT · HCPCS', label: 'Full code set coverage, updated on release' },
      { value: 'NCCI-aligned', label: 'MUE and mutually-exclusive edits configurable per specialty' },
      { value: '0 black boxes', label: 'Every flag links to the rule that fired' },
    ],
    processHeading: 'How code validation runs',
    processLede:
      'Each claim line runs the same cascade — parse, point, bundle, specialty-check, verdict — with full provenance for every flag.',
    processSteps: [
      {
        icon: 'list',
        title: 'Parse Lines',
        body: 'Split the claim into diagnosis pointers and service lines with their CPT / HCPCS codes and modifiers.',
      },
      {
        icon: 'link',
        title: 'Pointer Check',
        body: 'Confirm each CPT line has a supporting ICD-10 pointer and that the diagnosis actually justifies the procedure.',
      },
      {
        icon: 'layers',
        title: 'Bundling',
        body: 'Apply NCCI-style bundling, MUE thresholds, and mutually-exclusive pair checks. Configurable per specialty or payer.',
      },
      {
        icon: 'stethoscope',
        title: 'Specialty Pack',
        body: 'E&M level matrix, surgical global periods, lab panels — specialty-specific rulesets enrich the base checks.',
      },
      {
        icon: 'check',
        title: 'Verdict',
        body: 'Each line comes back as pass, warn, or block — with the exact rule ID and remediation hint attached.',
      },
    ],
    ctaHeading: 'Catch errors before the payer does',
    ctaBody:
      'Send us an anonymized sample of recent rejections — we’ll show which ones our validator would have blocked upstream.',
  },

  denials: {
    slug: 'denials',
    detail: SERVICE_DETAILS.denials,
    eyebrow: 'POST-SUBMISSION',
    shortTitle: 'Denial Management',
    hook: 'When 835 remarks land or the portal spits out a denial, UnifyTechs triages, drafts the appeal, and attaches the right evidence — so your team approves rather than assembles.',
    heroKind: 'denials',
    metrics: [
      { value: '835 + portal', label: 'Ingests ERAs and non-EDI denial exports alike' },
      { value: 'Playbook-driven', label: 'Resubmit · Appeal · Corrected-claim routing by reason' },
      { value: 'Timely filing', label: 'SLA timers escalate before appeal windows close' },
    ],
    processHeading: 'How denials get reworked',
    processLede:
      'From the moment an ERA arrives to the moment you send the rebuttal, every step is timestamped and auditable.',
    processSteps: [
      {
        icon: 'mail',
        title: 'Ingest 835 / ERA',
        body: 'Pull 835 remittances from the clearinghouse or parse portal denial exports into a normalized denial record.',
      },
      {
        icon: 'tag',
        title: 'Reason Triage',
        body: 'Classify by remark and adjustment codes — medical necessity, bundling, auth missing, coordination of benefits, and more.',
      },
      {
        icon: 'split',
        title: 'Playbook',
        body: 'Each reason fans out to the right workflow: resubmission, formal appeal, corrected claim, or write-off recommendation.',
      },
      {
        icon: 'fileText',
        title: 'Draft + Evidence',
        body: 'Template letters auto-merge the original packet, auth IDs, and clinical attachments relevant to that reason code.',
      },
      {
        icon: 'send',
        title: 'Approve & File',
        body: 'Your team reviews, tweaks, and approves. The trail — denial → playbook → evidence → resubmission — stays intact.',
      },
    ],
    ctaHeading: 'Stop leaving appeal dollars on the table',
    ctaBody:
      'Share your top ten denial reason codes and we’ll map them to a playbook — even if we never sell you anything.',
  },

  integrations: {
    slug: 'integrations',
    detail: SERVICE_DETAILS.integrations,
    eyebrow: 'CONNECTIVITY LAYER',
    shortTitle: 'Payer Integration Hub',
    hook: 'One canonical claim model. Many payer shapes. The hub translates between them so you stop writing one-off scripts per payer per year.',
    heroKind: 'integrations',
    metrics: [
      { value: '200+', label: 'Payer profiles with versioned adapters' },
      { value: 'X12 · REST · SFTP', label: 'Every protocol major payers still use' },
      { value: '997 / 999', label: 'Acknowledgement correlation stored alongside each artifact' },
    ],
    processHeading: 'How submissions reach the payer',
    processLede:
      'Your system speaks one schema to UnifyTechs. We speak every payer’s dialect and correlate the acknowledgements back to you.',
    processSteps: [
      {
        icon: 'fileJson',
        title: 'Canonical Model',
        body: 'Your systems emit one well-defined claim shape. No payer-specific fields bleed into your application layer.',
      },
      {
        icon: 'plug',
        title: 'Adapter',
        body: 'The hub selects the right payer adapter — version-pinned per production contract so changes never surprise you.',
      },
      {
        icon: 'arrows',
        title: 'Map Schema',
        body: 'Map to X12 837P / 837I envelopes, REST JSON payloads, or SFTP flat files — whichever the payer accepts.',
      },
      {
        icon: 'send',
        title: 'Submit',
        body: 'Credentials are rotated centrally. Dry-run submission to sandbox endpoints before flipping production traffic.',
      },
      {
        icon: 'clock',
        title: 'Correlation',
        body: '997 / 999 acknowledgements tie back to the outbound artifact so you always know which submission a response refers to.',
      },
    ],
    ctaHeading: 'One integration, every payer',
    ctaBody:
      'Give us your current payer mix and we’ll scope which adapters are already live and which would ship in the first integration window.',
  },
}

export const SOLUTION_ORDER: SolutionSlug[] = ['ocr', 'eligibility', 'codes', 'denials', 'integrations']
