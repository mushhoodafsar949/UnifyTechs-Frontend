import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Brief full-screen loader — avoids a blank flash before fonts/CSS paint and signals “premium app”.
 */
export function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = reduceMotion ? 0 : 480

    let done = false
    const finish = () => {
      if (done) return
      done = true
      setVisible(false)
    }

    const started = performance.now()

    const tryFinish = async () => {
      const elapsed = performance.now() - started
      const wait = Math.max(0, minMs - elapsed)
      await new Promise((r) => window.setTimeout(r, wait))

      try {
        if ('fonts' in document) await document.fonts.ready
      } catch {
        /* ignore */
      }

      if (document.readyState === 'complete') finish()
      else window.addEventListener('load', finish, { once: true })
    }

    void tryFinish()

    const safety = window.setTimeout(finish, 6500)
    return () => window.clearTimeout(safety)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pageloader"
          className="page-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading UnifyTechs"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="page-loader__mesh" aria-hidden />
          <div className="page-loader__brand">
            <img className="page-loader__logo-img" src="/brand/unifytechs-mark.svg" alt="" width={42} height={42} />
            <span className="page-loader__text">
              Unify<span>Techs</span>
            </span>
          </div>
          <div className="page-loader__track" aria-hidden>
            <div className="page-loader__bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
