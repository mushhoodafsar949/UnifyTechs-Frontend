/**
 * FAQ items aligned with keyword strategy (question-style / Tier 6 intent).
 * Used for visible FAQ markup and FAQPage JSON-LD.
 */
export type SeoFaqItem = {
  question: string
  answer: string
}

export const SEO_FAQ_ITEMS: SeoFaqItem[] = [
  {
    question: 'How does claim automation work in healthcare?',
    answer:
      'Claim automation uses software to capture claim data (from CMS-1500/UB-04/EHR/FHIR), validate ICD-10/CPT and payer rules (claim scrubbing), verify eligibility where needed, format X12 EDI 837 where required, submit to clearinghouses or payers, then track adjudication—often with ERA (835) posting and workflows for denials and appeals.',
  },
  {
    question: 'Is automated medical billing HIPAA compliant?',
    answer:
      'HIPAA compliance depends on how PHI is handled in transit and at rest (encryption, access controls, BAAs with vendors), not on the phrase “automated billing” itself. UnifyTechs is architected HIPAA-conscious cloud-native interoperability (TLS in transit, encryption at rest, audit logging); your organization remains responsible for policies, BAAs, training, and configuration.',
  },
  {
    question: 'What is a good clean claim rate in medical billing?',
    answer:
      'Industry benchmarks vary by specialty and payer mix, but practices often aim for high first-pass acceptance on clean claims—and many revenue cycle leaders track clean claim rate, denial/rejection reasons, and days in AR together. Automation typically improves consistency by validating codes, coverage, and formatting before submission.',
  },
  {
    question: 'How can AI reduce claim denials?',
    answer:
      'AI-assisted workflows can flag inconsistent codes, mismatched diagnoses/procedures, missing modifiers, eligibility issues, and payer-specific edits earlier—supporting denial prevention and faster rework. ML/OCR also reduces manual transcription errors when documents are unstructured.',
  },
  {
    question: 'What is the difference between claim rejection and claim denial?',
    answer:
      'A rejection usually means the claim never entered adjudication due to structural/editing issues (missing fields, invalid codes, formatting problems). A denial typically means the payer processed the claim but decided not to pay (or pays partially) based on medical necessity, coverage, bundling, timely filing, or similar reasons.',
  },
  {
    question: 'How does EDI 837 work in medical billing?',
    answer:
      'EDI 837 is the X12 transaction set used to submit healthcare claims electronically (professional/institutional/dental variants). Your billing system generates or translates claim data into the appropriate 837, sends it through a clearinghouse or direct submission path, and receives acknowledgments (999/277CA) while tracking toward payment or denial.',
  },
]
