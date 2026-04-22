import { useEffect, useState } from 'react'
import { getConsent, setConsent } from './tracker'

/**
 * Lightweight cookie-consent banner shown once per device until dismissed.
 * Decision is persisted in localStorage (not a cookie — we want the consent
 * choice itself to survive cookie purges) and toggles the analytics tracker.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getConsent() === null)
  }, [])

  if (!visible) return null

  const accept = () => {
    setConsent('granted')
    setVisible(false)
  }

  const decline = () => {
    setConsent('denied')
    setVisible(false)
  }

  return (
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <div className="consent-banner__inner">
        <p className="consent-banner__copy">
          We use first-party cookies to understand how visitors use this site (pages viewed, time
          spent, browser type). We don&apos;t share data with third parties.
        </p>
        <div className="consent-banner__actions">
          <button type="button" className="consent-banner__btn consent-banner__btn--ghost" onClick={decline}>
            Decline
          </button>
          <button type="button" className="consent-banner__btn consent-banner__btn--primary" onClick={accept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
