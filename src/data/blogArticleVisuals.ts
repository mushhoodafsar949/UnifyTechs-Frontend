/**
 * Hero + section imagery — order matches `blogSeoContent.ts` sections index-for-index.
 * Tech / data / workflows aligned with claim automation & EDI themes.
 */

export const BLOG_HERO_IMAGE = {
  /** Abstract connectivity / data-flow — fits EDI, interoperability, clearinghouse narratives. */
  raw: 'https://images.pexels.com/photos/3862137/pexels-photo-3862137.jpeg',
  alt: 'Abstract technology and data visualization suggesting healthcare data exchange and claim connectivity.',
} as const

export type BlogSectionVisual =
  | { mode: 'pexels'; raw: string; alt: string }
  | {
      mode: 'officialPdf'
      alt: string
      embedUrl: string
      heading: string
      cmsLandingUrl: string
    }

/** Section 6 embeds the official CMS-1500 PDF from CMS.gov (`/public/forms/`). */
export const BLOG_SECTION_VISUALS: readonly BlogSectionVisual[] = [
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/7433820/pexels-photo-7433820.jpeg',
    alt: 'Multiple monitors showing dashboards and analytics for revenue cycle and claims operations.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
    alt: 'Professionals collaborating over laptops — practice operations and billing coordination.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    alt: 'Network and connectivity imagery suggesting X12 EDI 837 / 835 pipelines and FHIR-ready APIs.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg',
    alt: 'Documentation and paperwork context for claims review, scrubbing, and payer correspondence.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg',
    alt: 'Modern office technology stack — integration and payer connectivity tooling.',
  },
  {
    mode: 'officialPdf',
    alt: 'Official CMS-1500 Health Insurance Claim Form PDF from CMS.gov.',
    embedUrl: '/forms/cms1500-health-insurance-claim-form.pdf',
    heading: 'CMS-1500 — Health Insurance Claim Form',
    cmsLandingUrl: 'https://www.cms.gov/medicare/cms-forms/cms-forms/downloads/cms1500.pdf',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg',
    alt: 'Laptop on a desk with notebook, representing billing systems, ERA posting, and remittance workflows.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    alt: 'Desk with tablet and charts — compliance metrics, audit trails, and operational trust.',
  },
  {
    mode: 'pexels',
    raw: 'https://images.pexels.com/photos/6682994/pexels-photo-6682994.jpeg',
    alt: 'Healthcare technology meeting — ROI discussions and vendor evaluation.',
  },
]
