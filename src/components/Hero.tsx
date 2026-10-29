import { ArrowRight, Crown, Palette, Scissors, Sparkles, Star } from 'lucide-react'
import { stats } from '../data/stats'

const trustAvatars = ['/images/avatar-1.jpg', '/images/avatar-2.jpg', '/images/avatar-3.jpg', '/images/avatar-4.jpg']
const happyClients = stats.find((stat) => stat.label === 'Happy Clients')

const highlights = [
  { label: 'Hair', Icon: Scissors },
  { label: 'Makeup', Icon: Palette },
  { label: 'Bridal', Icon: Crown },
]

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Background treatment */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-navy),transparent_60%)]" />
      <div aria-hidden="true" className="absolute top-1/3 -left-40 -z-10 size-112 rounded-full bg-accent/10 blur-3xl" />
      <p
        aria-hidden="true"
        className="outline-text pointer-events-none absolute right-0 bottom-0 left-0 -z-10 text-center font-display text-[clamp(5rem,20vw,18rem)] leading-none font-extrabold tracking-tighter whitespace-nowrap select-none lg:-bottom-6"
      >
        SK SALON
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade-up">Premium Hair · Makeup · Bridal Studio</p>
          <h1
            id="home-title"
            className="mt-6 animate-fade-up text-display font-extrabold text-white [animation-delay:100ms]"
          >
            Where Beauty <br className="hidden sm:block" />
            Meets <span className="text-accent">Confidence</span>
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lead text-muted [animation-delay:200ms]">
            Discover professional hair styling, makeup, and beauty services designed to bring out your natural glow
            and confidence.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-4 [animation-delay:300ms] min-[400px]:flex-row">
            <a href="#booking" className="btn-primary px-8">
              Book Now
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a href="#services" className="btn-outline px-8">
              Explore Services
            </a>
          </div>

          <ul className="mt-12 flex animate-fade-up flex-wrap gap-x-8 gap-y-3 [animation-delay:400ms]">
            {highlights.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-muted">
                <span className="grid size-9 place-items-center rounded-full border border-line text-accent">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Photography */}
        <div className="relative mx-auto w-full max-w-md animate-fade-in [animation-delay:150ms] sm:max-w-lg lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[2.25rem] border border-accent/60" />
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card">
            <img
              src="/images/hero-stylist.jpg"
              alt="Beauty portrait of a woman with glossy copper hair, full bangs and bold red lipstick"
              width={1000}
              height={1250}
              fetchPriority="high"
              className="aspect-4/5 w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
          </div>

          <div className="absolute top-6 -right-2 flex items-center gap-2 rounded-full border border-line bg-ink/85 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md sm:-right-6">
            <Sparkles aria-hidden="true" className="size-4 text-accent" />
            Bridal & Occasion Looks
          </div>

          <div className="absolute -bottom-6 -left-2 w-[min(18rem,85%)] rounded-2xl border border-line bg-night/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:-left-8 sm:p-5">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {trustAvatars.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={160}
                    height={160}
                    className="size-10 rounded-full border-2 border-night object-cover"
                  />
                ))}
              </div>
              <div className="flex gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-white">
              {happyClients?.value} <span className="text-base font-semibold text-muted">happy clients</span>
            </p>
            <p className="text-xs text-muted">Trusted for hair, makeup and bridal looks</p>
          </div>
        </div>
      </div>
    </section>
  )
}
