import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Accessible name source: the id of the section heading. */
  labelledBy?: string
}

export function Section({ id, children, className = '', labelledBy = `${id}-title` }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-24 lg:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  children?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, description, align = 'center', children }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`mb-12 max-w-3xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 id={id} className="mt-4 text-h2 font-bold text-white">
        {title}
      </h2>
      {description && <p className="mt-5 text-lead text-muted">{description}</p>}
      {children}
    </div>
  )
}
