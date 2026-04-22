import type { LegalSlug } from '../legal/routes'

export type LegalSection = {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export type LegalPageMeta = {
  title: string
  subtitle: string
  docId: string
  audience: string
  intro: string
  highlights: string[]
  updated: string
  sections: LegalSection[]
}

export const LEGAL_PAGES: Record<LegalSlug, LegalPageMeta> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Transparency & data stewardship',
    docId: 'UT-LGL-PRIV-1.3',
    audience: 'Visitors, prospects & trial users',
    intro:
      'UnifyTechs handles information consistent with enterprise healthcare expectations: purpose-limited processing, disciplined retention, and security controls scaled to sensitive workflows. This policy summarizes practices for our public websites and pre-contract experiences. It does not replace negotiated agreements with customers.',
    highlights: [
      'No sale of personal information (as commonly defined in U.S. state privacy laws)',
      'Contractual overlays (DPA / BAA when applicable) supersede this overview',
    ],
    updated: 'April 2026',
    sections: [
      {
        heading: 'Information we process',
        paragraphs: [
          'Depending on how you interact with UnifyTechs, we may process identifiers and professional context you provide (such as business contact details and organization name), technical data emitted by browsers and devices (logs, approximate region, timestamps), diagnostic signals used to maintain reliability, and correspondence you initiate with sales or support.',
          'Enterprise customers engaging production services typically define additional categories, subprocessors, and instructional roles through orders, DPAs, and HIPAA Business Associate Agreements where PHI is involved.',
        ],
      },
      {
        heading: 'Purposes & legal bases',
        paragraphs: [
          'We use information to deliver and secure the site, personalize legitimate follow-up related to expressions of interest, measure aggregate performance (where optional analytics are enabled), comply with regulatory obligations, and defend against misuse or fraud.',
          'Where consent is required for non-essential technologies, our cookie preference center records your election for this browser.',
        ],
      },
      {
        heading: 'Retention & safeguards',
        paragraphs: [
          'Retention periods follow the shortest interval consistent with operational need, contractual requirement, or legal hold. Administrative, technical, and organizational safeguards — including least-privilege access, encryption in transit for modern protocols, vendor reviews, and incident-response procedures — scale with deployment risk.',
        ],
      },
      {
        heading: 'Rights & inquiries',
        paragraphs: [
          'Individuals may exercise applicable access, deletion, correction, or opt-out rights subject to verification and carve-outs for transaction records required by law. Submit requests via the Contact section of this site; escalation paths exist for unresolved concerns.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Marketing site & evaluation access',
    docId: 'UT-LGL-TERMS-2.1',
    audience: 'Website visitors using unifytechs digital properties',
    intro:
      'These terms establish the rules for accessing informational content, demos, sandboxes, and downloadable collateral made available prior to an executed enterprise agreement. They establish no professional services obligations and are distinct from negotiated commercial contracts.',
    highlights: [
      'Trial / demo artifacts are illustrative — not clinical or billing advice',
      'Paid production workloads require a countersigned Order Form / MSA',
    ],
    updated: 'April 2026',
    sections: [
      {
        heading: 'Permitted use',
        paragraphs: [
          'You may browse, bookmark, reproduce limited excerpts internally for vendor evaluation, and share links within your organization provided you do not remove proprietary notices or imply endorsement without written consent.',
        ],
      },
      {
        heading: 'Restrictions',
        bullets: [
          'No probing, interference, or attempts to circumvent authentication boundaries without written authorization.',
          'No scraping or harvesting at rates that degrade shared infrastructure.',
          'No reverse engineering of compiled artifacts except where mandatory law permits.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'All trademarks, imagery, narrative copy, UI orchestration, and simulation outputs remain the exclusive property of UnifyTechs or licensors. Except for temporary copies created automatically by a browser, no license grants reproduction for competitive benchmarking decks without permission.',
        ],
      },
      {
        heading: 'Disclaimers & liability cap',
        paragraphs: [
          'Materials are provided “as is” for informational evaluation. To the maximum extent permitted by applicable law, UnifyTechs disclaims implied warranties not expressly stated in a binding contract. Aggregate liability arising from marketing-site use shall not exceed one hundred U.S. dollars unless mandatory consumer law dictates otherwise.',
        ],
      },
      {
        heading: 'Priority of enterprise agreements',
        paragraphs: [
          'Upon execution of an Order Form or Master Services Agreement, those instruments — including exhibits addressing SLAs, data processing, HIPAA, indemnities, and liability — replace conflicting provisions found here.',
        ],
      },
    ],
  },
  'hipaa-notice': {
    title: 'HIPAA Notice',
    subtitle: 'Protected health information handling',
    docId: 'UT-LGL-HIPAA-N1',
    audience: 'Covered entities & designated workforce evaluators',
    intro:
      'When UnifyTechs acts as a Business Associate to a Covered Entity, permitted uses and disclosures of PHI follow the underlying BAA, HIPAA Privacy & Security Rules, and HITECH provisions. This summary aids workforce orientation and does not replace regulatory text or customer-specific BAAs.',
    highlights: [
      'Minimum necessary standard applies to workforce access pathways',
      'PHI subprocessor flows align with customer-approved vendor lists where contractually required',
    ],
    updated: 'April 2026',
    sections: [
      {
        heading: 'Roles & responsibilities',
        paragraphs: [
          'The Covered Entity determines permissible purposes in its Notice of Privacy Practices. UnifyTechs processes PHI only on documented instructions unless another use is expressly permitted under HIPAA or required by law.',
        ],
      },
      {
        heading: 'Administrative, physical & technical safeguards',
        bullets: [
          'Risk analysis cadence tied to significant application or infrastructure changes.',
          'Identity lifecycle management including periodic access reviews.',
          'Encryption strategies aligned with NIST guidance for data classification tiers in scope.',
        ],
      },
      {
        heading: 'Individual rights pathways',
        paragraphs: [
          'Patients exercising access or amendment requests generally route through the Covered Entity’s privacy office. UnifyTechs assists timely fulfillment when PHI resides in managed systems and contractual turnaround windows apply.',
        ],
      },
      {
        heading: 'Breach notification alignment',
        paragraphs: [
          'Suspected unauthorized acquisition is escalated through joint incident bridges. Notification timelines honor both contractual milestones and regulatory clocks when UnifyTechs acts as discoverer.',
        ],
      },
    ],
  },
  soc2: {
    title: 'SOC 2',
    subtitle: 'Trust services & assurance',
    docId: 'UT-LGL-SOC2-BRIEF',
    audience: 'Security & compliance reviewers',
    intro:
      'SOC 2 reports communicate how service organizations design and operate controls mapped to Trust Services Criteria (security is baseline; availability, confidentiality, processing integrity, or privacy may appear depending on examination scope). UnifyTechs maintains control narratives, evidence repositories, and independent audit cadences suitable for enterprise diligence.',
    highlights: [
      'Report distribution follows confidentiality — typically under mutual NDA',
      'Bridge letters may be available between annual examination cycles',
    ],
    updated: 'April 2026',
    sections: [
      {
        heading: 'What an examination covers',
        paragraphs: [
          'Auditors evaluate whether controls stated in management’s description operated effectively across the review window. Readers should interpret complementary user entity controls — customer responsibilities documented in contracts — jointly with vendor controls.',
        ],
      },
      {
        heading: 'Accessing artifacts',
        paragraphs: [
          'Prospective enterprise customers may request the latest SOC package through their solutions engineer. Provide anticipated deployment profile (cloud region, PHI involvement, integrations) so the correct scope variant is supplied.',
        ],
      },
      {
        heading: 'Subprocessor assurance',
        bullets: [
          'Critical infrastructure vendors undergo recurring assurance reviews.',
          'Contractual security schedules align baseline expectations across the processing chain.',
          'Customers receive advance notice of material subprocessor substitutions where agreements require.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie Settings',
    subtitle: 'Transparency & consent controls',
    docId: 'UT-LGL-COOKIE-CTL',
    audience: 'All site visitors',
    intro:
      'Cookies and similar storage technologies support authentication hygiene, resilience testing, aggregate analytics (when enabled), and optional personalization. Functional storage required for routing and fraud prevention cannot be disabled without impairing core operations.',
    highlights: [
      'Selections persist locally in this browser unless cleared',
      'Changing browsers or devices requires re-saving preferences',
    ],
    updated: 'April 2026',
    sections: [
      {
        heading: 'Technology overview',
        paragraphs: [
          'First-party cookies originate from unifytechs domains; third-party cookies appear only where integrated analytics or embedded experiences require them and you have opted in.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'Use the toggles in the preference center above. After saving, reload-sensitive features may update on the next navigation event. Browser-level “Do Not Track” signals are honored only when technically determinable — prefer explicit choices here.',
        ],
      },
    ],
  },
}
