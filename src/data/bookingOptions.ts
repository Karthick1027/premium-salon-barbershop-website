import type { BookingOption } from '../types'
import { pricingPackages } from './pricing'
import { services } from './services'

/** Everything a visitor can request in the booking form, built from the service and package data. */
export const bookingOptions: BookingOption[] = [
  ...services.map((service): BookingOption => ({
    value: `service:${service.id}`,
    label: service.title,
    group: 'Services',
  })),
  ...pricingPackages.map((pkg): BookingOption => ({
    value: `package:${pkg.id}`,
    label: `${pkg.name} (package)`,
    group: 'Packages',
  })),
]

export const serviceOptionValue = (serviceId: string) => `service:${serviceId}`
export const packageOptionValue = (packageId: string) => `package:${packageId}`
