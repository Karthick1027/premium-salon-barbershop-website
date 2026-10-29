import { siteConfig } from '../config/siteConfig'

const priceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: 'currency',
  currency: siteConfig.currencyCode,
  maximumFractionDigits: 0,
})

export const formatPrice = (amount: number) => priceFormatter.format(amount)

/** Formats a `YYYY-MM-DD` value from a date input without timezone shifts. */
export function formatDateValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(siteConfig.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Formats a `HH:mm` value as a 12-hour time, e.g. "2:30 PM". */
export function formatTimeValue(value: string) {
  const [hours, minutes] = value.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`
}

/** Today's date as a `YYYY-MM-DD` string in the visitor's local timezone. */
export function todayValue() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function hasAddress() {
  return Object.values(siteConfig.address).some(Boolean)
}
