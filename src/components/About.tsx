import { Check } from 'lucide-react'
import { Section, SectionHeading } from './Section'

const values = [
  'Personalised consultation before every service',
  'Experienced stylists and makeup artists',
  'Clean, calm and welcoming studio',
  'Looks tailored to your style and occasion',
]

export default function About() {
  return (
    <Section id="about" className="bg-night">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] border border-line">
            <img
              src="/images/about-salon-experience.jpg"
              alt="Stylist placing a pearl hair accessory in a client’s low bun in a warmly lit salon"
              width={1000}
              height={1200}
              loading="lazy"
              className="aspect-5/6 w-full object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 rounded-2xl bg-accent px-6 py-5 text-ink shadow-xl sm:-right-6">
            <p className="font-display text-sm font-bold tracking-[0.2em] uppercase">Made for you</p>
            <p className="mt-1 max-w-[11rem] text-sm font-semibold">Beauty, comfort and confidence in every visit.</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="about-title"
            eyebrow="About SK Salon"
            align="left"
            title={
              <>
                More Than a Salon, <span className="text-accent">An Experience</span>
              </>
            }
            description="At SK Salon, beauty is more than just a look. It is a feeling of confidence, comfort, and self-expression. Our goal is to create a personalized experience that helps every client feel their best."
          />
          <ul className="-mt-4 grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <li key={value} className="flex gap-3 text-sm text-muted">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                </span>
                {value}
              </li>
            ))}
          </ul>
          <a href="#services" className="btn-outline mt-10">
            Discover Our Services
          </a>
        </div>
      </div>
    </Section>
  )
}
