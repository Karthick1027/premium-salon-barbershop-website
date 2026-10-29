import { ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../lib/format'
import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
  onBook: (serviceId: string) => void
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(255,133,10,0.45)]">
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={800}
          height={600}
          loading="lazy"
          className="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-2 sm:p-7 sm:pt-2">
        <h3 className="text-xl font-bold text-white sm:text-2xl">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-sm text-muted">
            From <span className="font-display text-xl font-bold text-accent">{formatPrice(service.startingPrice)}</span>
          </p>
          <button
            type="button"
            onClick={() => onBook(service.id)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-bold text-white transition hover:border-accent hover:bg-accent hover:text-ink"
          >
            Book Now
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> {service.title}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
