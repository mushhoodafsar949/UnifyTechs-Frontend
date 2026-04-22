import { useEffect, useState } from 'react'

/**
 * Tracks which section should be highlighted in the navbar and keeps the URL hash in sync
 * (`#home`, `#about`, …). Uses scroll position instead of intersection ratios so the hash is not
 * stuck on the last section when multiple blocks overlap (a common IO bug with footer/contact).
 *
 * Scroll handler is rAF-throttled so we do at most one DOM read per frame — avoids jank when
 * scrolling fast past 9 sections that each call getBoundingClientRect().
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(() => sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) return

    /** Section is “active” once its top edge crosses this line below the fixed navbar. */
    const OFFSET_PX = 118

    let raf = 0
    let pending = false

    const compute = () => {
      pending = false
      let active = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= OFFSET_PX) active = id
      }

      setActiveId((prev) => (prev === active ? prev : active))

      const hash = `#${active}`
      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
      }
    }

    const schedule = () => {
      if (pending) return
      pending = true
      raf = requestAnimationFrame(compute)
    }

    compute()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sectionIds])

  return activeId
}
