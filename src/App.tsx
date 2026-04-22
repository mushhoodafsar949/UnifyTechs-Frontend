import { lazy, Suspense, useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { PageLoader } from './components/PageLoader'
import { ScrollProgress } from './components/ScrollProgress'
import { BackToTop } from './components/BackToTop'
import { useScrollSpy } from './hooks/useScrollSpy'
import type { ThemeMode } from './theme'
import {
  parseSiteHash,
  parseSolutionSlug,
  isLegalSlug,
  type SiteHashSlug,
  type SolutionSlug,
} from './legal/routes'
import { Hero } from './sections/Hero'
import { SocialProof } from './sections/SocialProof'
import { About } from './sections/About'
import { ClaimsExpertise } from './sections/ClaimsExpertise'
import { Services } from './sections/Services'
import { HowItWorks } from './sections/HowItWorks'
import { Technology } from './sections/Technology'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contact } from './sections/Contact'

/** Route-level code-split: these pages pull in heavy MD-style content (~40-80KB each) that the
 *  landing page never needs on first paint. */
const LegalDocument = lazy(() => import('./pages/LegalDocument').then((m) => ({ default: m.LegalDocument })))
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const PressPage = lazy(() => import('./pages/PressPage').then((m) => ({ default: m.PressPage })))
const AboutTeamPage = lazy(() =>
  import('./pages/AboutTeamPage').then((m) => ({ default: m.AboutTeamPage })),
)
const SolutionPage = lazy(() =>
  import('./pages/SolutionPage').then((m) => ({ default: m.SolutionPage })),
)

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-label="Loading page">
      <div className="route-fallback__spinner" aria-hidden />
    </div>
  )
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'claims-expertise', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'technology', label: 'Technology' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const

/** Mutable copies computed once at module load — avoids `[...NAV_ITEMS]` on every render,
 *  which would break referential equality for `Navbar`'s `items` prop. */
const NAV_ITEMS_MUTABLE = [...NAV_ITEMS]
const SECTION_IDS: readonly string[] = NAV_ITEMS.map((n) => n.id)

/** Stable empty array referenced when we're on a legal/blog/press sub-route so the
 *  scroll spy hook doesn't run section-scanning work it can't use. */
const EMPTY_SECTION_IDS: readonly string[] = []

export default function App() {
  const [siteSlug, setSiteSlug] = useState<SiteHashSlug | null>(() => parseSiteHash(window.location.hash))
  const [solutionSlug, setSolutionSlug] = useState<SolutionSlug | null>(() =>
    parseSolutionSlug(window.location.hash),
  )

  const onSubRoute = siteSlug !== null || solutionSlug !== null
  const activeId = useScrollSpy(onSubRoute ? EMPTY_SECTION_IDS : SECTION_IDS)

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored =
      localStorage.getItem('unifytechs-theme') ?? localStorage.getItem('claimease-theme')
    return stored === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('unifytechs-theme', theme)
  }, [theme])

  useEffect(() => {
    /** Keep React route in sync with the URL — hashchange + popstate (browser Back/Forward). */
    const syncSlugFromHash = () => {
      const nextSite = parseSiteHash(window.location.hash)
      const nextSolution = parseSolutionSlug(window.location.hash)
      setSiteSlug(nextSite)
      setSolutionSlug(nextSolution)
      if (nextSite || nextSolution) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', syncSlugFromHash)
    window.addEventListener('popstate', syncSlugFromHash)
    return () => {
      window.removeEventListener('hashchange', syncSlugFromHash)
      window.removeEventListener('popstate', syncSlugFromHash)
    }
  }, [])

  /** Deep-link section ids e.g. #services — scroll after first paint (skip legal routes #/…) */
  useEffect(() => {
    if (siteSlug || solutionSlug) return
    const raw = window.location.hash.replace(/^#/, '')
    if (!raw || raw.startsWith('/') || !document.getElementById(raw)) return
    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [siteSlug, solutionSlug])

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar
        items={NAV_ITEMS_MUTABLE}
        activeId={activeId}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />
      {solutionSlug ? (
        <Suspense fallback={<RouteFallback />}>
          <SolutionPage slug={solutionSlug} />
        </Suspense>
      ) : siteSlug && isLegalSlug(siteSlug) ? (
        <Suspense fallback={<RouteFallback />}>
          <LegalDocument slug={siteSlug} theme={theme} />
        </Suspense>
      ) : siteSlug === 'blog' ? (
        <Suspense fallback={<RouteFallback />}>
          <BlogPage theme={theme} />
        </Suspense>
      ) : siteSlug === 'press' ? (
        <Suspense fallback={<RouteFallback />}>
          <PressPage theme={theme} />
        </Suspense>
      ) : siteSlug === 'team' ? (
        <Suspense fallback={<RouteFallback />}>
          <AboutTeamPage theme={theme} />
        </Suspense>
      ) : (
        <main>
          <Hero theme={theme} />
          <SocialProof />
          <About />
          <ClaimsExpertise />
          <Services />
          <HowItWorks />
          <Technology />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
      )}
      <Footer />
      <BackToTop />
    </>
  )
}
