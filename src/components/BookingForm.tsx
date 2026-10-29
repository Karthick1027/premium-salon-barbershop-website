import { CircleCheck, MessageCircle, Send, TriangleAlert } from 'lucide-react'
import { useId, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { siteConfig } from '../config/siteConfig'
import { bookingOptions } from '../data/bookingOptions'
import { formatDateValue, formatTimeValue, todayValue } from '../lib/format'
import { buildWhatsAppUrl, getWhatsAppNumber } from '../lib/whatsapp'
import { Section, SectionHeading } from './Section'

interface BookingFormProps {
  /** Selected service/package value, controlled by the parent so other sections can preselect it. */
  service: string
  onServiceChange: (value: string) => void
}

interface FormValues {
  name: string
  phone: string
  email: string
  date: string
  time: string
  notes: string
}

type FieldName = keyof FormValues | 'service'
type FormErrors = Partial<Record<FieldName, string>>

const NOTES_LIMIT = 500
const emptyValues: FormValues = { name: '', phone: '', email: '', date: '', time: '', notes: '' }
const fieldOrder: FieldName[] = ['name', 'phone', 'email', 'service', 'date', 'time', 'notes']

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

function buildTimeSlots() {
  const { firstSlot, lastSlot, intervalMinutes } = siteConfig.bookingSlots
  const slots: string[] = []
  for (let minutes = toMinutes(firstSlot); minutes <= toMinutes(lastSlot); minutes += intervalMinutes) {
    slots.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`)
  }
  return slots
}

const timeSlots = buildTimeSlots()

function validate(values: FormValues, service: string): FormErrors {
  const errors: FormErrors = {}
  const phoneDigits = values.phone.replace(/\D/g, '')
  const today = todayValue()

  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+\d\s()-]+$/.test(values.phone) || phoneDigits.length < 7 || phoneDigits.length > 15)
    errors.phone = 'Please enter a valid phone number (7–15 digits).'
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address, or leave it blank.'
  if (!bookingOptions.some((option) => option.value === service)) errors.service = 'Please choose a service.'
  if (!values.date) errors.date = 'Please choose a preferred date.'
  else if (values.date < today) errors.date = 'Please choose today or a future date.'
  if (!values.time) errors.time = 'Please choose a preferred time.'
  else if (values.date === today) {
    const now = new Date()
    if (toMinutes(values.time) <= now.getHours() * 60 + now.getMinutes())
      errors.time = 'That time has already passed today. Please choose a later time.'
  }
  if (values.notes.length > NOTES_LIMIT) errors.notes = `Please keep notes under ${NOTES_LIMIT} characters.`

  return errors
}

function buildMessage(values: FormValues, serviceLabel: string) {
  const lines = [
    `Hello ${siteConfig.name}! I would like to request an appointment.`,
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    `Service: ${serviceLabel}`,
    `Preferred date: ${formatDateValue(values.date)}`,
    `Preferred time: ${formatTimeValue(values.time)}`,
    ...(values.notes.trim() ? [`Notes: ${values.notes.trim()}`] : []),
    '',
    'Please let me know if this slot is available. Thank you!',
  ]
  return lines.join('\n')
}

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  optional?: boolean
  children: ReactNode
  className?: string
}

function Field({ id, label, error, hint, optional, children, className = '' }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold text-white">
        <span>
          {label}
          {!optional && (
            <span aria-hidden="true" className="ml-0.5 text-accent">
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-medium text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-300">
          <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function BookingForm({ service, onServiceChange }: BookingFormProps) {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const [configError, setConfigError] = useState(false)

  const whatsappNumber = getWhatsAppNumber()
  const errors = useMemo(() => validate(values, service), [values, service])
  const fieldId = (name: FieldName) => `${uid}-${name}`
  const visibleError = (name: FieldName) => (submitAttempted || touched[name] ? errors[name] : undefined)

  const describedBy = (name: FieldName, hasHint = false) =>
    visibleError(name) ? `${fieldId(name)}-error` : hasHint ? `${fieldId(name)}-hint` : undefined

  const fieldProps = (name: FieldName, hasHint = false) => ({
    id: fieldId(name),
    name,
    'aria-invalid': visibleError(name) ? true : undefined,
    'aria-describedby': describedBy(name, hasHint),
    onBlur: () => setTouched((current) => ({ ...current, [name]: true })),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setWhatsappUrl(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setConfigError(false)

    const firstInvalid = fieldOrder.find((name) => errors[name])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    if (!whatsappNumber) {
      setConfigError(true)
      return
    }

    const serviceLabel = bookingOptions.find((option) => option.value === service)?.label ?? service
    const url = buildWhatsAppUrl(whatsappNumber, buildMessage(values, serviceLabel))
    setWhatsappUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleReset = () => {
    setValues(emptyValues)
    onServiceChange('')
    setTouched({})
    setSubmitAttempted(false)
    setWhatsappUrl(null)
    setConfigError(false)
    formRef.current?.querySelector('input')?.focus()
  }

  const errorCount = submitAttempted ? Object.keys(errors).length : 0

  return (
    <Section id="booking" className="overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 right-0 -z-10 size-128 rounded-full bg-accent/10 blur-3xl" />
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            id="booking-title"
            eyebrow="Book an Appointment"
            align="left"
            title={
              <>
                Your Next <span className="text-accent">Beautiful Look</span> Starts Here
              </>
            }
            description="Tell us what you’d like and when. We’ll prepare a WhatsApp message with your request so you can send it to the salon in one tap."
          />
          <ol className="-mt-2 space-y-5">
            {[
              'Fill in your details and preferred slot.',
              'Tap “Send via WhatsApp” — your request opens as a ready-to-send message.',
              'Press send in WhatsApp. The salon will reply to confirm availability.',
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/60 font-display text-sm font-bold text-accent">
                  {index + 1}
                </span>
                <p className="pt-1.5 text-sm text-muted">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-2xl border border-line bg-night p-5 text-sm leading-relaxed text-muted">
            <strong className="text-white">Please note:</strong> this form does not save or confirm a booking. Your
            appointment is confirmed only after the salon replies to your WhatsApp message.
          </p>
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby="booking-title"
          className="rounded-3xl border border-line bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8 lg:col-span-3 lg:p-10"
        >
          {!whatsappNumber && (
            <div className="mb-6 flex gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-100">
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-300" />
              <p>
                <strong className="block text-amber-50">WhatsApp booking is not set up yet.</strong>
                Please contact the salon directly for now. (Site owner: add your WhatsApp number as{' '}
                <code className="text-amber-50">whatsappNumber</code> in{' '}
                <code className="text-amber-50">src/config/siteConfig.ts</code>.)
              </p>
            </div>
          )}

          <p aria-live="polite" className="sr-only">
            {errorCount > 0 ? `Please fix ${errorCount} ${errorCount === 1 ? 'field' : 'fields'} before sending.` : ''}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={fieldId('name')} label="Full name" error={visibleError('name')}>
              <input
                {...fieldProps('name')}
                type="text"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="form-field"
              />
            </Field>

            <Field id={fieldId('phone')} label="Phone number" error={visibleError('phone')}>
              <input
                {...fieldProps('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={values.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="form-field"
              />
            </Field>

            <Field id={fieldId('email')} label="Email" optional error={visibleError('email')}>
              <input
                {...fieldProps('email')}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-field"
              />
            </Field>

            <Field id={fieldId('service')} label="Service" error={visibleError('service')}>
              <select
                {...fieldProps('service')}
                required
                value={service}
                onChange={(event) => {
                  onServiceChange(event.target.value)
                  setWhatsappUrl(null)
                }}
                className="form-field form-select"
              >
                <option value="" disabled>
                  Select a service or package
                </option>
                {(['Services', 'Packages'] as const).map((group) => (
                  <optgroup key={group} label={group}>
                    {bookingOptions
                      .filter((option) => option.group === group)
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            <Field id={fieldId('date')} label="Preferred date" error={visibleError('date')}>
              <input
                {...fieldProps('date')}
                type="date"
                required
                min={todayValue()}
                value={values.date}
                onChange={handleChange}
                className="form-field scheme-dark"
              />
            </Field>

            <Field id={fieldId('time')} label="Preferred time" error={visibleError('time')}>
              <select
                {...fieldProps('time')}
                required
                value={values.time}
                onChange={handleChange}
                className="form-field form-select"
              >
                <option value="" disabled>
                  Select a time
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {formatTimeValue(slot)}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={fieldId('notes')}
              label="Additional notes"
              optional
              error={visibleError('notes')}
              hint={`${values.notes.length}/${NOTES_LIMIT} characters`}
              className="sm:col-span-2"
            >
              <textarea
                {...fieldProps('notes', true)}
                rows={4}
                maxLength={NOTES_LIMIT}
                value={values.notes}
                onChange={handleChange}
                placeholder="Hair length, reference looks, event details or anything we should know"
                className="form-field resize-y"
              />
            </Field>
          </div>

          {configError && (
            <p role="alert" className="mt-6 flex gap-2 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Your details look good, but WhatsApp booking hasn’t been configured for this site yet, so the request
              can’t be sent. Please contact the salon directly.
            </p>
          )}

          {whatsappUrl && (
            <div role="status" className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-5 text-sm text-emerald-50">
              <p className="flex items-center gap-2 font-bold">
                <CircleCheck aria-hidden="true" className="size-5 text-emerald-300" />
                Your request is ready in WhatsApp
              </p>
              <p className="mt-2 text-emerald-100/90">
                Press <strong>send</strong> in WhatsApp to share it with {siteConfig.name}. Your booking is not
                confirmed until the salon replies.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-white underline underline-offset-4 hover:text-accent"
                >
                  <MessageCircle aria-hidden="true" className="size-4" />
                  WhatsApp didn’t open? Open it here
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button type="button" onClick={handleReset} className="font-semibold text-emerald-100/90 underline underline-offset-4 hover:text-white">
                  Start a new request
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              <span className="text-accent">*</span> Required fields
            </p>
            <button type="submit" className="btn-primary w-full px-8 sm:w-auto">
              <Send aria-hidden="true" className="size-4" />
              Send via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
