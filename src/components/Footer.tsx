import { ArrowUp } from 'lucide-react'
import { navLinks, siteConfig } from '../config/siteConfig'
import { services } from '../data/services'
import { hasAddress } from '../lib/format'
import Logo from './Logo'
import SocialLinks from './SocialLinks'

const linkClass = 'text-sm text-muted transition hover:text-accent'
const headingClass = 'font-display text-sm font-bold tracking-[0.2em] text-white uppercase'

export default function Footer() {
  const { address, phoneDisplay, email, openingHours } = siteConfig
  const addressLine = [address.line1, address.line2, address.city].filter(Boolean).join(', ')

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={headingClass}>Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={`#${link.href}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className={linkClass}>
                  Book Appointment
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>{phoneDisplay || 'Phone: coming soon'}</li>
              <li className="break-words">{email || 'Email: coming soon'}</li>
              <li>{hasAddress() ? addressLine : 'Address: coming soon'}</li>
              {openingHours.map((entry) => (
                <li key={entry.days}>
                  <span className="text-white">{entry.days}:</span> {entry.hours}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <a href="#home" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition hover:text-accent">
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
