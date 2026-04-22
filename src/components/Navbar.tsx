import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import type { ThemeMode } from '../theme'
import { useNavScrolled } from '../hooks/useNavScrolled'
import { navigateToMainSection } from '../utils/navigateMainSection'

export type NavItem = { id: string; label: string }

type NavbarProps = {
  items: NavItem[]
  activeId: string
  theme: ThemeMode
  onToggleTheme: () => void
}

export function Navbar({ items, activeId, theme, onToggleTheme }: NavbarProps) {
  const scrolled = useNavScrolled(80)
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id: string) => {
    navigateToMainSection(id)
    setMobileOpen(false)
  }

  return (
    <header className={clsx('site-nav', scrolled && 'site-nav--scrolled')} role="banner">
      <div className="container site-nav__inner">
        <button type="button" className="site-nav__brand" onClick={() => scrollTo('home')} aria-label="UnifyTechs home">
          <img className="site-nav__logo-img" src="/brand/unifytechs-mark.svg" alt="" width={34} height={34} />
          <span className="site-nav__logo-text">
            Unify<span>Techs</span>
          </span>
        </button>

        <nav className="site-nav__desktop" aria-label="Primary">
          <LayoutGroup id="primary-nav">
            <ul className="site-nav__links">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={clsx('site-nav__link', activeId === item.id && 'is-active')}
                    onClick={() => scrollTo(item.id)}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    <span className="site-nav__link-text">{item.label}</span>
                    {activeId === item.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="site-nav__underline"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </LayoutGroup>
        </nav>

        <button
          type="button"
          className="site-nav__theme"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'light' ? (
              <motion.span
                key="moon"
                className="site-nav__theme-icon"
                aria-hidden
                initial={{ rotate: -55, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 55, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Moon size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                className="site-nav__theme-icon"
                aria-hidden
                initial={{ rotate: 55, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -55, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Sun size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button type="button" className="btn btn--primary site-nav__cta site-nav__cta--desktop" onClick={() => scrollTo('contact')}>
          Get a Demo
        </button>

        <button
          type="button"
          className="site-nav__burger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      <div
        className={clsx('site-nav__drawer', mobileOpen && 'is-open')}
        aria-hidden={!mobileOpen}
      >
        <div className="container site-nav__drawer-inner">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx('site-nav__drawer-link', activeId === item.id && 'is-active')}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="btn btn--primary site-nav__cta site-nav__cta--drawer" onClick={() => scrollTo('contact')}>
            Get a Demo
          </button>
        </div>
      </div>
    </header>
  )
}
