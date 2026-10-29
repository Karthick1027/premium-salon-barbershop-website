import { Info } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

interface SampleNoticeProps {
  children: string
  className?: string
}

/** Small disclaimer shown while `siteConfig.showSampleContentNotices` is true. */
export default function SampleNotice({ children, className = '' }: SampleNoticeProps) {
  if (!siteConfig.showSampleContentNotices) return null

  return (
    <p
      className={`inline-flex items-start gap-2 rounded-full border border-line bg-night/80 px-4 py-2 text-left text-xs text-muted ${className}`}
    >
      <Info aria-hidden="true" className="mt-px size-4 shrink-0 text-accent" />
      <span>{children}</span>
    </p>
  )
}
