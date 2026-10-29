import type { NavLink, SiteConfig } from '../types'

/**
 * Central, editable salon configuration.
 *
 * Before publishing, replace every empty string below with the salon's real
 * details. Empty values are handled gracefully on the page (a neutral
 * "coming soon" message is shown instead), so nothing breaks while they are
 * missing — but bookings cannot be sent until `whatsappNumber` is set.
 */
export const siteConfig: SiteConfig = {
  name: 'SK Salon',
  tagline: 'Hair · Makeup · Bridal',
  description:
    'Premium hair styling, makeup, beauty and bridal services, delivered with care in a calm, modern studio.',

  /**
   * Optional logo image, e.g. '/images/logo.svg'. Leave empty to use the
   * built-in text logo.
   */
  logoSrc: '',

  /**
   * WhatsApp Business number in international format, DIGITS ONLY:
   * country code + number, no "+", spaces, dashes or leading zero.
   * Example format (not a real number): '919800000000' for India.
   */
  whatsappNumber: '',

  /** Phone number exactly as it should be displayed, e.g. '+91 98000 00000'. */
  phoneDisplay: '',
  email: '',

  address: {
    line1: '',
    line2: '',
    city: '',
  },

  social: {
    instagram: '',
    facebook: '',
  },

  /** SAMPLE hours — confirm with the salon owner before launch. */
  openingHours: [
    { days: 'Monday – Saturday', hours: '10:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: '10:00 AM – 6:00 PM' },
  ],

  /** Appointment time slots offered in the booking form (24-hour clock). */
  bookingSlots: {
    firstSlot: '10:00',
    lastSlot: '19:00',
    intervalMinutes: 30,
  },

  /** Locale for number and date formatting, and the currency (ISO 4217) for all prices. */
  locale: 'en-IN',
  currencyCode: 'INR',

  /**
   * While true, small notices tell visitors that statistics, prices and
   * testimonials are sample content. Set to false only after every sample
   * value in `src/data` has been replaced with verified information.
   */
  showSampleContentNotices: true,

  copyrightYear: 2026,
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: 'home' },
  { label: 'About Us', href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Gallery', href: 'gallery' },
  { label: 'Pricing', href: 'pricing' },
  { label: 'Contact', href: 'contact' },
]
