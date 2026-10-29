import { CalendarHeart, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navLinks } from '../config/siteConfig'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

const sectionIds = navLinks.map((link) => link.href)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const closeMenu = useCallback((returnFocus = false) => {
    setMenuOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  const solid = scrolled || menuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? 'border-b border-line/70 bg-ink/90 backdrop-blur-lg' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 font-bold text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>

        <nav
          aria-label="Main"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
        >
          <a href="#home" aria-label="SK Salon, back to top" className="shrink-0 rounded-xl">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={`#${link.href}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform ${
                      isActive ? 'text-white after:scale-x-100' : 'text-muted after:scale-x-0 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#booking" className="btn-primary hidden min-h-11 sm:inline-flex">
              <CalendarHeart aria-hidden="true" className="size-4" />
              Book Appointment
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full border border-line text-white transition hover:border-accent hover:text-accent lg:hidden"
            >
              {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </nav>

        <MobileMenu id="mobile-menu" open={menuOpen} active={active} onClose={closeMenu} />
      </header>

      {/* Kept outside the header: its backdrop-filter would otherwise contain this fixed overlay. */}
      <div
        aria-hidden="true"
        onClick={() => closeMenu()}
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
    </>
  )
}
