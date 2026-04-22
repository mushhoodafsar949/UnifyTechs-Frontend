/**
 * Themes from the Executive Summary PDF — illustrative marketing copy only, not compliance advice.
 */
export const PLATFORM_VISION = {
  heroSub:
    'AI-assisted healthcare claims processing software and revenue cycle automation: ANSI X12 EDI (837/835) meets HL7 FHIR R4—automated eligibility verification, claim scrubbing, faster reimbursement, and HIPAA-conscious interoperability for US providers.',

  aboutBridge:
    'National reimbursement still flows through clearinghouse-scale X12 (837/835, 270/271, 276/277) while CMS and ONC accelerate FHIR R4, US Core, and OAuth-secured APIs. UnifyTechs is designed for both: REST/FHIR for modern integrations and EDI translation where trading partners still expect batches — without forcing teams to dismantle workflows that already clear audits.',

  technologyStack:
    'Under the hood we align with a cloud-native interoperability pattern: an API gateway with OAuth 2.0 / OpenID Connect (SMART-on-FHIR-style flows), a FHIR R4 resource tier, EDI translation between X12 and canonical claim data, durable messaging for throughput and retries, webhook callbacks for status, TLS 1.2+ in transit, strong encryption at rest, and centralized audit logging — deployed on HIPAA-eligible infrastructure with separation of tenants.',

  socialProofLead:
    'We’re an early-stage, US-focused team engaging providers and innovators in multiple states — where legacy clearinghouses and API-first workflows still share the road. Standards-first X12/FHIR automation that plugs into what you already run.',
} as const
