import { services } from '../data/services'
import SampleNotice from './SampleNotice'
import { Section, SectionHeading } from './Section'
import ServiceCard from './ServiceCard'

interface ServicesProps {
  onBook: (serviceId: string) => void
}

export default function Services({ onBook }: ServicesProps) {
  return (
    <Section id="services">
      <SectionHeading
        id="services-title"
        eyebrow="What We Do"
        title={
          <>
            Our <span className="text-accent">Signature</span> Services
          </>
        }
        description="From everyday grooming to special occasions, discover beauty services tailored to your style."
      >
        <SampleNotice className="mt-6">Starting prices are samples for demonstration only.</SampleNotice>
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onBook={onBook} />
        ))}
      </div>
    </Section>
  )
}
