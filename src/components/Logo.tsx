import { siteConfig } from '../config/siteConfig'

interface LogoProps {
  className?: string
}

/** Text logo by default; set `siteConfig.logoSrc` to swap in an image logo. */
export default function Logo({ className = '' }: LogoProps) {
  if (siteConfig.logoSrc) {
    return <img src={siteConfig.logoSrc} alt={siteConfig.name} className={`h-10 w-auto ${className}`} />
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-xl border border-accent/70 font-display text-base font-extrabold text-accent"
      >
        SK
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        SK <span className="text-accent">Salon</span>
      </span>
    </span>
  )
}
