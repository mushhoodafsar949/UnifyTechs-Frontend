import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export type FormSelectOption = {
  value: string
  label: string
}

type Props = {
  id?: string
  name: string
  options: FormSelectOption[]
  placeholder?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  'aria-labelledby'?: string
}

/**
 * Themed replacement for a native `<select>`. Keeps a hidden `<input>` in the
 * DOM so `FormData(form).get(name)` on submit still works exactly like before.
 * Keyboard: ArrowUp/Down/Home/End to move highlight, Enter/Space to select,
 * Escape to close, Tab closes and moves focus.
 */
export function FormSelect({
  id,
  name,
  options,
  placeholder = 'Select…',
  defaultValue = '',
  value,
  onChange,
  ...ariaProps
}: Props) {
  const internalId = useId()
  const rootId = id ?? internalId
  const listId = `${rootId}-listbox`

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const current = isControlled ? value! : internalValue

  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === defaultValue)
    return idx >= 0 ? idx : 0
  })

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === current)
  const label = selected?.label ?? placeholder

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
      setOpen(false)
      requestAnimationFrame(() => triggerRef.current?.focus())
    },
    [isControlled, onChange],
  )

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLLIElement>(`[data-index='${highlight}']`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [open, highlight])

  // Move focus onto the listbox as soon as it opens so arrow-key nav works.
  useEffect(() => {
    if (open) listRef.current?.focus()
  }, [open])

  const handleTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
      const activeIdx = options.findIndex((o) => o.value === current)
      setHighlight(activeIdx >= 0 ? activeIdx : 0)
    }
  }

  const handleListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(options.length - 1, h + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(0, h - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setHighlight(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setHighlight(options.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const opt = options[highlight]
      if (opt) commit(opt.value)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const hasValue = !!selected

  return (
    <div ref={rootRef} className={`form-select${open ? ' form-select--open' : ''}`}>
      {/* Preserves existing FormData(form).get(name) plumbing */}
      <input type="hidden" name={name} value={current} />

      <button
        ref={triggerRef}
        id={rootId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={`form-select__trigger${hasValue ? '' : ' form-select__trigger--placeholder'}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKey}
        {...ariaProps}
      >
        <span className="form-select__label">{label}</span>
        <ChevronDown size={16} className="form-select__chevron" aria-hidden />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${rootId}-opt-${highlight}`}
          className="form-select__menu"
          onKeyDown={handleListKey}
        >
          {options.map((opt, i) => {
            const isActive = opt.value === current
            const isHi = i === highlight
            return (
              <li
                key={opt.value || `opt-${i}`}
                id={`${rootId}-opt-${i}`}
                role="option"
                aria-selected={isActive}
                data-index={i}
                className={`form-select__option${isHi ? ' is-highlight' : ''}${isActive ? ' is-active' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  // prevent the trigger from losing focus before we commit
                  e.preventDefault()
                  commit(opt.value)
                }}
              >
                <span>{opt.label}</span>
                {isActive && <Check size={14} aria-hidden className="form-select__check" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
