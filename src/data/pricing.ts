import type { PricingPackage } from '../types'

/**
 * SAMPLE package prices for demonstration only — these are not the salon's
 * actual prices. Edit them here; every price on the site reads from this file
 * or from services.ts.
 */
export const pricingPackages: PricingPackage[] = [
  {
    id: 'essential-beauty',
    name: 'Essential Beauty',
    price: 1499,
    summary: 'A refreshing everyday reset.',
    features: ['Consultation & haircut', 'Wash & blow-dry', 'Express cleanup', 'Eyebrow shaping'],
  },
  {
    id: 'signature-experience',
    name: 'Signature Experience',
    price: 3499,
    summary: 'Our most-loved pampering session.',
    features: [
      'Precision haircut & styling',
      'Hair spa treatment',
      'Classic facial',
      'Manicure',
      'Complimentary hair finish',
    ],
    featured: true,
  },
  {
    id: 'premium-glam',
    name: 'Premium Glam',
    price: 5999,
    summary: 'Event-ready from hair to makeup.',
    features: ['Party makeup', 'Occasion hairstyling', 'Saree draping', 'Lash application', 'Touch-up kit guidance'],
  },
  {
    id: 'bridal-experience',
    name: 'Bridal Experience',
    price: 24999,
    summary: 'A complete, unhurried bridal day.',
    features: [
      'Pre-bridal consultation',
      'Bridal makeup & trial look',
      'Bridal hairstyling',
      'Saree / lehenga draping',
      'Dupatta & jewellery setting',
    ],
  },
]
