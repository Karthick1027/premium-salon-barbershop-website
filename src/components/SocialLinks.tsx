import type { ComponentType, SVGProps } from 'react'
import { siteConfig } from '../config/siteConfig'
import { FacebookIcon, InstagramIcon } from './BrandIcons'

const socials: Array<{ label: string; url: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { label: 'Instagram', url: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: 'Facebook', url: siteConfig.social.facebook, Icon: FacebookIcon },
]

const itemClass = 'grid size-11 place-items-center rounded-full border border-line text-white transition'

/** Social profile links; unconfigured profiles render as muted "coming soon" placeholders. */
export default function SocialLinks() {
  return (
    <ul className="flex gap-3">
      {socials.map(({ label, url, Icon }) => (
        <li key={label}>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${label} (opens in a new tab)`}
              className={`${itemClass} hover:border-accent hover:bg-accent hover:text-ink`}
            >
              <Icon className="size-5" />
            </a>
          ) : (
            <span className={`${itemClass} opacity-45`} title={`${label} link coming soon`}>
              <Icon className="size-5" />
              <span className="sr-only">{label} link coming soon</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
