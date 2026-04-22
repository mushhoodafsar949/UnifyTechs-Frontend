import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SEO_FAQ_ITEMS } from '../data/seoFaq'
import { navigateToMainSection } from '../utils/navigateMainSection'

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    const id = 'seo-faq-jsonld'
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(faqJsonLd())
    return () => {
      document.getElementById(id)?.remove()
    }
  }, [])

  const scrollToContact = () => {
    navigateToMainSection('contact')
  }

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <section id="faq" className="faq section-pad section-light" aria-labelledby="faq-heading">
      <div className="container faq__inner">
        <Reveal>
          <header className="section-head">
            <span className="eyebrow">COMMON QUESTIONS</span>
            <h2 id="faq-heading">Healthcare claim automation questions</h2>
            <p className="section-head__sub">
              Straight answers on revenue cycle automation, HIPAA-conscious workflows, claim scrubbing, EDI 837, and AI
              denial prevention—what billing and RCM leaders ask before a demo.
            </p>
          </header>
        </Reveal>

        <ul className="faq__list">
          {SEO_FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i
            const contentId = `faq-answer-${i}`
            return (
              <Reveal key={item.question} delay={i * 0.04}>
                <li className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq__summary faq__summary--btn"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggle(i)}
                  >
                    <span className="faq__summary-text">{item.question}</span>
                    <motion.span
                      className="faq__summary-icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={contentId}
                        className="faq__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            )
          })}
        </ul>

        <Reveal>
          <div className="faq__footer">
            <p className="faq__footer-copy">Ready to see automated medical billing software mapped to your payers?</p>
            <button type="button" className="btn btn--primary" onClick={scrollToContact}>
              Book a free demo
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
