import { ArrowRight, Clock } from 'lucide-react'
import { useState } from 'react'
import { articles } from '../data/articles'
import type { Article } from '../types'
import { Section, SectionHeading } from './Section'

function ArticleCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false)
  const bodyId = `${article.id}-body`

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition duration-300 hover:border-accent/50">
      <div className="overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={800}
          height={500}
          loading="lazy"
          className="aspect-8/5 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="rounded-full bg-accent/15 px-3 py-1 tracking-wider text-accent uppercase">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <Clock aria-hidden="true" className="size-3.5" />
            {article.readTime}
          </span>
        </div>
        <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">{article.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>

        <div
          id={bodyId}
          inert={!expanded}
          className={`grid transition-[grid-template-rows] duration-500 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 text-sm font-bold text-accent transition hover:gap-3"
        >
          {expanded ? 'Show Less' : 'Read More'}
          <ArrowRight
            aria-hidden="true"
            className={`size-4 transition-transform ${expanded ? '-rotate-90' : ''}`}
          />
          <span className="sr-only">: {article.title}</span>
        </button>
      </div>
    </article>
  )
}

export default function Journal() {
  return (
    <Section id="journal" className="bg-night">
      <SectionHeading
        id="journal-title"
        eyebrow="Beauty Journal"
        title={
          <>
            Beauty Tips & <span className="text-accent">Inspiration</span>
          </>
        }
        description="Simple, practical ideas from our team to help you care for your hair and skin between visits."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Section>
  )
}
