export interface NavLink {
  label: string
  /** Section id, without the leading `#`. */
  href: string
}

export interface Service {
  id: string
  title: string
  description: string
  /** Starting price in the currency configured in siteConfig. */
  startingPrice: number
  image: string
  imageAlt: string
}

export interface PricingPackage {
  id: string
  name: string
  price: number
  summary: string
  features: string[]
  /** Highlights the card with an orange accent border. */
  featured?: boolean
}

export type GalleryCategory = 'Hair' | 'Makeup' | 'Bridal' | 'Salon'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  category: GalleryCategory
  /** Sets the tile's aspect ratio in the gallery layout. */
  orientation: 'portrait' | 'square' | 'landscape'
}

export interface Article {
  id: string
  category: string
  title: string
  excerpt: string
  /** Extra paragraphs revealed by "Read more". */
  body: string[]
  image: string
  imageAlt: string
  readTime: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  service: string
  rating: 1 | 2 | 3 | 4 | 5
}

export interface Stat {
  value: string
  label: string
}

export interface BookingOption {
  /** Unique value used by the booking form `<select>`. */
  value: string
  label: string
  group: 'Services' | 'Packages'
}

export interface OpeningHours {
  days: string
  hours: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  logoSrc: string
  whatsappNumber: string
  phoneDisplay: string
  email: string
  address: { line1: string; line2: string; city: string }
  social: { instagram: string; facebook: string }
  openingHours: OpeningHours[]
  bookingSlots: { firstSlot: string; lastSlot: string; intervalMinutes: number }
  locale: string
  currencyCode: string
  showSampleContentNotices: boolean
  copyrightYear: number
}
