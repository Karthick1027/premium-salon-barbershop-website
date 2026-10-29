import type { Service } from '../types'

/** SAMPLE starting prices for demonstration — confirm with the salon owner. */
export const services: Service[] = [
  {
    id: 'haircut-styling',
    title: 'Haircut & Styling',
    description: 'Personalised haircuts and styling, shaped around your face, texture and everyday routine.',
    startingPrice: 499,
    image: '/images/service-haircut-styling.jpg',
    imageAlt: 'Stylist blow-drying a client’s short bob with a round brush',
  },
  {
    id: 'hair-coloring',
    title: 'Hair Coloring',
    description: 'Modern colour services — from soft global colour to highlights — tailored to your style.',
    startingPrice: 1999,
    image: '/images/service-hair-coloring.jpg',
    imageAlt: 'Colourist applying lightener to a strand of long dark hair beside foils',
  },
  {
    id: 'hair-spa',
    title: 'Hair Spa & Treatment',
    description: 'Relaxing hair-care treatments with a calming wash, nourishing mask and finish.',
    startingPrice: 1299,
    image: '/images/service-hair-spa.jpg',
    imageAlt: 'Client relaxing at a backwash basin while her hair is rinsed',
  },
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    description: 'Elegant, long-wear bridal looks designed around your outfit, jewellery and ceremony.',
    startingPrice: 14999,
    image: '/images/service-bridal-makeup.jpg',
    imageAlt: 'Makeup artist applying eye makeup to a bride in traditional jewellery',
  },
  {
    id: 'party-makeup',
    title: 'Party Makeup',
    description: 'Glamorous makeup for celebrations, receptions and evenings out.',
    startingPrice: 2999,
    image: '/images/service-party-makeup.jpg',
    imageAlt: 'Makeup artist lining a client’s lips for a glamorous evening look',
  },
  {
    id: 'hairstyling-saree-draping',
    title: 'Hairstyling & Saree Draping',
    description: 'Beautiful occasion hairstyles paired with neat, professional saree draping.',
    startingPrice: 999,
    image: '/images/service-saree-draping.jpg',
    imageAlt: 'Woman in a royal-blue silk saree with jasmine flowers in her hair',
  },
]
