import { CalendarHeart } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { navLinks } from '../config/siteConfig'
import { scrollToSection } from '../lib/scroll'

interface MobileMenuProps {
  id: string
  open: boolean
  active: string
  onClose: (returnFocus?: boolean) => void
}

export default function MobileMenu({ id, open, active, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) panelRef.current?.querySelector('a')?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()
    onClose()
    requestAnimationFrame(() => scrollToSection(sectionId, { focus: true }))
  }

  return (
    <div
      id={id}
      ref={panelRef}
      inert={!open}
      className={`grid border-line bg-ink/95 transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
        open ? 'grid-rows-[1fr] border-b opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <ul className="flex flex-col gap-1 px-4 pt-2 pb-6 sm:px-6">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(event) => handleNavigate(event, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-12 items-center rounded-xl px-4 font-display text-lg font-semibold transition-colors ${
                    isActive ? 'bg-card text-accent' : 'text-white hover:bg-card'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li className="mt-3">
            <a href="#booking" onClick={(event) => handleNavigate(event, 'booking')} className="btn-primary w-full">
              <CalendarHeart aria-hidden="true" className="size-4" />
              Book Appointment
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
