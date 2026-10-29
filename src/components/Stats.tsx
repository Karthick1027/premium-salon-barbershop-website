import { stats } from '../data/stats'
import SampleNotice from './SampleNotice'

export default function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative bg-night pb-20 sm:pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-title" className="sr-only">
          SK Salon at a glance
        </h2>
        <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col-reverse rounded-3xl border border-line bg-card/70 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/60 sm:p-8"
            >
              <dt className="mt-2 text-sm font-semibold text-muted sm:text-base">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-none font-extrabold text-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 text-center">
          <SampleNotice>Sample figures shown for illustration — to be confirmed by the salon.</SampleNotice>
        </div>
      </div>
    </section>
  )
}
