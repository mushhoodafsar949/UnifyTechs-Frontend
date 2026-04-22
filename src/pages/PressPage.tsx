import type { ThemeMode } from '../theme'
import { MarketingArticleShell } from '../components/MarketingArticleShell'
import { PRESS_PAGE } from '../data/pressSeoContent'

type PressPageProps = {
  theme: ThemeMode
}

export function PressPage({ theme }: PressPageProps) {
  return (
    <MarketingArticleShell
      theme={theme}
      variant="press"
      title={PRESS_PAGE.title}
      subtitle={PRESS_PAGE.subtitle}
      updated={PRESS_PAGE.updated}
      metaDescription={PRESS_PAGE.metaDescription}
      documentTitle={PRESS_PAGE.documentTitle}
      intro={PRESS_PAGE.intro}
      sections={PRESS_PAGE.sections}
    />
  )
}
