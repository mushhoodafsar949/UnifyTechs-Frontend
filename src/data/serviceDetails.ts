/** Rich copy for each service — opened from “Learn More” in Services section. */

export type ServiceDetailId =
  | 'ocr'
  | 'eligibility'
  | 'codes'
  | 'denials'
  | 'integrations'
  | 'analytics'

export type ServiceDetail = {
  id: ServiceDetailId
  title: string
  summary: string
  capabilities: string[]
  outcomes: string[]
  integrations?: string[]
}

export const SERVICE_DETAILS: Record<ServiceDetailId, ServiceDetail> = {
  ocr: {
    id: 'ocr',
    title: 'Intelligent Form OCR & Extraction',
    summary:
      'Vision models locate tables, boxes, and handwriting on CMS-1500, UB-04, and ADA dental forms—then normalize fields into a canonical claim model your billing engine can consume.',
    capabilities: [
      'Layout-aware parsing for multi-page packets and skewed scans',
      'Field-level confidence scores with reviewer crops for low-trust regions',
      'Support for institutional (UB-04) revenue codes and professional (CMS-1500) line items',
      'Attachment linking so clinical PDFs stay tied to the correct encounter line',
    ],
    outcomes: [
      'Replace manual re-keying for standard professional and institutional packets',
      'Cut intake QA time by routing only exceptions to human queues',
    ],
    integrations: ['SFTP / object storage intake', 'REST webhook on extraction complete', 'Export to JSON or vendor flat files'],
  },
  eligibility: {
    id: 'eligibility',
    title: 'Real-Time Eligibility Verification',
    summary:
      'Before you submit, UnifyTechs queries payer connectivity (270/271-style flows or payer APIs) to confirm active coverage, plan type, and authorization requirements where available.',
    capabilities: [
      'Batch or real-time checks keyed by subscriber ID, member ID, or policy number',
      'Caching with TTL to avoid redundant payer calls during peak windows',
      'Mismatch alerts when demographics on the claim disagree with payer response',
    ],
    outcomes: [
      'Fewer denials for inactive or wrong-plan submissions',
      'Cleaner prior-auth handoffs when authorization is required pre-service',
    ],
    integrations: ['Clearinghouse eligibility routes', 'Direct payer APIs where contracted', 'Audit log for every inquiry'],
  },
  codes: {
    id: 'codes',
    title: 'ICD-10 / CPT Code Validator',
    summary:
      'Deterministic rules plus reference data flag impossible procedure/diagnosis combinations, missing modifiers, and frequency edits before the claim leaves your four walls.',
    capabilities: [
      'ICD-10-CM pointers aligned to CPT/HCPCS lines',
      'NCCI-style bundling hints and mutually exclusive procedure checks (configurable)',
      'Specialty packs for E&M levels, surgical global periods, and lab panels',
    ],
    outcomes: [
      'Catch upcoding and unsupported combinations prior to payer audit',
      'Reduce denial codes tied to medical necessity or code pairing',
    ],
  },
  denials: {
    id: 'denials',
    title: 'Automated Denial Management',
    summary:
      'When payers return denials (835 / portal exports), UnifyTechs triages reason codes, drafts appeal shells, and attaches the right clinical or auth artifacts for your team to approve.',
    capabilities: [
      'Reason-code playbooks: resubmission vs. appeal vs. corrected claim',
      'Template letters with merge fields from the original packet',
      'SLA timers so aging denials escalate before timely filing windows close',
    ],
    outcomes: [
      'Shrink dollars left on the table from abandoned appeals',
      'Give auditors a single thread from denial → evidence → resubmission',
    ],
  },
  integrations: {
    id: 'integrations',
    title: 'Payer API Integration Hub',
    summary:
      'A connector layer maps your canonical claim to payer-specific schemas—clearinghouse envelopes, REST payloads, or batched SFTP drops—without one-off scripts per payer.',
    capabilities: [
      'Catalog of 200+ payer profiles maintained with versioned adapters',
      'Dry-run submission to sandbox endpoints before production enablement',
      'Automatic 997/999 correlation IDs stored next to each outbound artifact',
    ],
    outcomes: [
      'Onboard new payer mixes without standing up a new integration project per site',
      'Centralize credential rotation and endpoint changes',
    ],
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics & Audit Dashboard',
    summary:
      'Operations and compliance leaders see throughput, denial drivers, leakage by payer, and extraction quality—filterable by facility, specialty, and time.',
    capabilities: [
      'Role-based dashboards for RC leadership vs. compliance readers',
      'Exports for finance tie-out and internal audit sampling',
      'Drill-down from a KPI to the underlying packets and rule hits',
    ],
    outcomes: [
      'Prove ROI with before/after cycle times and denial rates',
      'Answer regulator or payer questions with traceable evidence',
    ],
  },
}
