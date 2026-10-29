import { Check } from 'lucide-react'
import { pricingPackages } from '../data/pricing'
import { formatPrice } from '../lib/format'
import SampleNotice from './SampleNotice'
import { Section, SectionHeading } from './Section'

interface PricingProps {
  onSelect: (packageId: string) => void
}

export default function Pricing({ onSelect }: PricingProps) {
  return (
    <Section id="pricing" className="bg-night">
      <SectionHeading
        id="pricing-title"
        eyebrow="Packages"
        title={
          <>
            Choose Your <span className="text-accent">Beauty Experience</span>
          </>
        }
        description="Thoughtfully curated packages for a quick refresh, a full pampering session or your biggest day."
      >
        <SampleNotice className="mt-6">
          Demonstration prices only — not final. Confirm current pricing with the salon when you book.
        </SampleNotice>
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {pricingPackages.map((pkg) => (
          <article
            key={pkg.id}
            aria-labelledby={`package-${pkg.id}`}
            className={`relative flex flex-col rounded-3xl border p-7 transition duration-300 hover:-translate-y-1.5 sm:p-8 ${
              pkg.featured
                ? 'border-accent bg-linear-to-b from-accent/12 to-card shadow-[0_30px_80px_-40px_rgba(255,133,10,0.6)]'
                : 'border-line bg-card hover:border-accent/50'
            }`}
          >
            {pkg.featured && (
              <p className="absolute -top-3.5 left-7 rounded-full bg-accent px-4 py-1 text-xs font-bold tracking-wider text-ink uppercase">
                Recommended
              </p>
            )}
            <h3 id={`package-${pkg.id}`} className="text-xl font-bold text-white">
              {pkg.name}
            </h3>
            <p className="mt-2 min-h-10 text-sm text-muted">{pkg.summary}</p>

            <p className="mt-7 flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold text-white">{formatPrice(pkg.price)}</span>
              <span className="text-xs font-semibold tracking-wider text-muted uppercase">sample</span>
            </p>

            <ul className="mt-7 flex-1 space-y-3.5 border-t border-line pt-7">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-muted">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={3} />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onSelect(pkg.id)}
              className={`${pkg.featured ? 'btn-primary' : 'btn-outline'} mt-9 w-full`}
            >
              Choose Package
              <span className="sr-only">: {pkg.name}</span>
            </button>
          </article>
        ))}
      </div>
    </Section>
  )
}
