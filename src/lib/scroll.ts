const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface ScrollOptions {
  /** Move keyboard focus to the section (or a specific element inside it) after scrolling. */
  focus?: boolean | HTMLElement | null
}

/** Smoothly scrolls to a section (respecting reduced motion) and updates the URL hash. */
export function scrollToSection(id: string, { focus = false }: ScrollOptions = {}) {
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)

  if (focus instanceof HTMLElement) {
    focus.focus({ preventScroll: true })
  } else if (focus) {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }
}
