import { type ReactNode, useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ContentModalProps = {
  open: boolean
  onClose: () => void
  title: string
  /** Optional small label rendered above the title ("Capability deep-dive"). */
  eyebrow?: string
  /** Optional icon shown in the header chip. Typically the same icon as the card the user clicked. */
  icon?: ReactNode
  children: ReactNode
}

/**
 * Accessible modal built on the native `<dialog>` element.
 *
 * The tricky bit is coordinating the browser's own open/close semantics with
 * framer-motion's enter/exit animations:
 *   - when the parent flips `open` from true → false, we want the exit animation
 *     to run *before* the dialog goes away, so we postpone `dialog.close()` until
 *     AnimatePresence fires `onExitComplete`.
 *   - Esc normally closes the dialog instantly. We intercept the native `cancel`
 *     event, preventDefault it, and route through the parent's `onClose` so the
 *     exit animation always plays.
 */
export function ContentModal({ open, onClose, title, eyebrow, icon, children }: ContentModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    // Do NOT close here when open=false — that happens after AnimatePresence exits.
  }, [open])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    el.addEventListener('cancel', onCancel)
    return () => el.removeEventListener('cancel', onCancel)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      className="content-modal"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <AnimatePresence
        onExitComplete={() => {
          const el = ref.current
          if (el?.open) el.close()
        }}
      >
        {open && (
          <motion.div
            key="panel"
            className="content-modal__panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="content-modal__accent-bar" aria-hidden />
            <header className="content-modal__header">
              {icon && (
                <div className="content-modal__icon-chip" aria-hidden>
                  {icon}
                </div>
              )}
              <div className="content-modal__heading">
                {eyebrow && <span className="content-modal__eyebrow">{eyebrow}</span>}
                <h2 id={titleId} className="content-modal__title">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                className="content-modal__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X aria-hidden strokeWidth={2.25} />
              </button>
            </header>
            <div className="content-modal__body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  )
}
