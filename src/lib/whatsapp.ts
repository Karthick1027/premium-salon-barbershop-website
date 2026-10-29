import { siteConfig } from '../config/siteConfig'

/**
 * Returns the configured WhatsApp number as digits only, or null when it is
 * missing or not a plausible international number (8–15 digits, E.164 limit,
 * no leading zero). Common formatting characters are tolerated and stripped.
 */
export function getWhatsAppNumber(): string | null {
  const digits = siteConfig.whatsappNumber.replace(/[\s()+-]/g, '')
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null
}

export function buildWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const isWhatsAppConfigured = () => getWhatsAppNumber() !== null

/** Link for a general enquiry, or null when WhatsApp is not configured. */
export function getEnquiryUrl() {
  const number = getWhatsAppNumber()
  return number ? buildWhatsAppUrl(number, `Hello ${siteConfig.name}, I have a question about your services.`) : null
}
