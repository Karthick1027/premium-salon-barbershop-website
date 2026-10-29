import type { Testimonial } from '../types'

/**
 * SAMPLE testimonials — placeholder copy, NOT real customer reviews.
 * Replace with genuine client feedback (with the client's permission)
 * before launch, then set `showSampleContentNotices` to false in siteConfig.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'sample-1',
    quote:
      'The team listened carefully to what I wanted and the cut was exactly right. The whole visit felt calm and unhurried.',
    name: 'Client Name',
    service: 'Haircut & Styling',
    rating: 5,
  },
  {
    id: 'sample-2',
    quote:
      'My bridal makeup looked natural in person and beautiful in photos, and it lasted through the entire day.',
    name: 'Client Name',
    service: 'Bridal Makeup',
    rating: 5,
  },
  {
    id: 'sample-3',
    quote:
      'Lovely hair spa experience — relaxing, friendly and spotless. I left feeling refreshed and confident.',
    name: 'Client Name',
    service: 'Hair Spa & Treatment',
    rating: 5,
  },
]
