import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { siteConfig } from '../config/siteConfig'
import { hasAddress } from '../lib/format'
import { getEnquiryUrl } from '../lib/whatsapp'
import { Section, SectionHeading } from './Section'
import SocialLinks from './SocialLinks'

const comingSoon = <span className="text-muted/80 italic">Coming soon</span>

function ContactCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 rounded-3xl border border-line bg-card p-6 transition hover:border-accent/50 sm:p-7">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">{icon}</span>
      <div className="min-w-0">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="mt-1.5 text-sm leading-relaxed break-words text-muted">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const { phoneDisplay, email, address, openingHours } = siteConfig
  const enquiryUrl = getEnquiryUrl()

  return (
    <Section id="contact" className="bg-night">
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title={
          <>
            Visit or <span className="text-accent">Get in Touch</span>
          </>
        }
        description="Questions about a service, a bridal trial or availability? We’re happy to help."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          <ContactCard icon={<Phone aria-hidden="true" className="size-5" />} title="Call Us">
            {phoneDisplay ? (
              <a href={`tel:${phoneDisplay.replace(/[^\d+]/g, '')}`} className="hover:text-accent">
                {phoneDisplay}
              </a>
            ) : (
              comingSoon
            )}
          </ContactCard>

          <ContactCard icon={<Mail aria-hidden="true" className="size-5" />} title="Email">
            {email ? (
              <a href={`mailto:${email}`} className="hover:text-accent">
                {email}
              </a>
            ) : (
              comingSoon
            )}
          </ContactCard>

          <ContactCard icon={<MapPin aria-hidden="true" className="size-5" />} title="Visit the Salon">
            {hasAddress() ? (
              <address className="not-italic">
                {[address.line1, address.line2, address.city].filter(Boolean).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : (
              comingSoon
            )}
          </ContactCard>

          <ContactCard icon={<Clock aria-hidden="true" className="size-5" />} title="Opening Hours">
            <dl className="space-y-2">
              {openingHours.map((entry) => (
                <div key={entry.days}>
                  <dt>{entry.days}</dt>
                  <dd className="font-semibold text-white">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </ContactCard>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-accent/60 bg-linear-to-br from-accent/20 via-card to-card p-8">
          <div aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative">
            <MessageCircle aria-hidden="true" className="size-10 text-accent" />
            <h3 className="mt-6 text-2xl font-bold text-white">Chat with us on WhatsApp</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The quickest way to ask a question or check availability. We’ll reply during opening hours.
            </p>
          </div>
          <div className="relative mt-8 space-y-6">
            {enquiryUrl ? (
              <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                <MessageCircle aria-hidden="true" className="size-4" />
                Message on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <p className="rounded-xl border border-line bg-ink/60 p-4 text-sm text-muted">
                WhatsApp chat is coming soon.
              </p>
            )}
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.2em] text-muted uppercase">Follow us</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
