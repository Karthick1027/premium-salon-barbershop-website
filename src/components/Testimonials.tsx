import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import SampleNotice from './SampleNotice'
import { Section, SectionHeading } from './Section'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        id="testimonials-title"
        eyebrow="Testimonials"
        title={
          <>
            Hear From Our <span className="text-accent">Happy Clients</span>
          </>
        }
      >
        <SampleNotice className="mt-6">
          Sample testimonials for layout preview — real client reviews will appear here.
        </SampleNotice>
      </SectionHeading>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <figure className="relative flex h-full flex-col rounded-3xl border border-line bg-card p-7 sm:p-8">
              <Quote aria-hidden="true" className="absolute top-7 right-7 size-10 text-accent/25" />
              <div className="flex gap-1 text-accent" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={`size-4 ${index < testimonial.rating ? 'fill-current' : 'opacity-30'}`}
                  />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-white/90">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent"
                >
                  {initials(testimonial.name)}
                </span>
                <span>
                  <span className="block font-display font-semibold text-white">{testimonial.name}</span>
                  <span className="block text-sm text-muted">{testimonial.service}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
