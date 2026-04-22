import { useMemo } from 'react'
import type { ThemeMode } from '../theme'
import { pexelsUrl } from '../constants/images'
import {
  MarketingArticleShell,
  type MarketingFigure,
  type MarketingSection,
} from '../components/MarketingArticleShell'
import { BLOG_PAGE } from '../data/blogSeoContent'
import { BLOG_HERO_IMAGE, BLOG_SECTION_VISUALS, type BlogSectionVisual } from '../data/blogArticleVisuals'

type BlogPageProps = {
  theme: ThemeMode
}

function sectionVisualToFigure(vis: BlogSectionVisual): MarketingFigure {
  if (vis.mode === 'officialPdf') {
    return {
      mode: 'officialPdf',
      alt: vis.alt,
      embedUrl: vis.embedUrl,
      heading: vis.heading,
      cmsLandingUrl: vis.cmsLandingUrl,
    }
  }
  return {
    mode: 'image',
    src: pexelsUrl(vis.raw, 960),
    alt: vis.alt,
  }
}

export function BlogPage({ theme }: BlogPageProps) {
  const heroVisual = useMemo(
    () => ({
      src: pexelsUrl(BLOG_HERO_IMAGE.raw, 1800),
      alt: BLOG_HERO_IMAGE.alt,
    }),
    [],
  )

  const sections = useMemo((): MarketingSection[] => {
    return BLOG_PAGE.sections.map((section, i) => {
      const vis = BLOG_SECTION_VISUALS[i]
      if (!vis) return { ...section }
      return {
        ...section,
        illustration: sectionVisualToFigure(vis),
      }
    })
  }, [])

  return (
    <MarketingArticleShell
      theme={theme}
      variant="blog"
      title={BLOG_PAGE.title}
      subtitle={BLOG_PAGE.subtitle}
      updated={BLOG_PAGE.updated}
      metaDescription={BLOG_PAGE.metaDescription}
      documentTitle={BLOG_PAGE.documentTitle}
      intro={BLOG_PAGE.intro}
      sections={sections}
      heroVisual={heroVisual}
    />
  )
}
