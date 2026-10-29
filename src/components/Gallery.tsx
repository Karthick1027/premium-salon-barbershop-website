import { Expand } from 'lucide-react'
import { useState } from 'react'
import { galleryCategories, galleryItems } from '../data/gallery'
import type { GalleryCategory, GalleryItem } from '../types'
import Lightbox from './Lightbox'
import { Section, SectionHeading } from './Section'

type Filter = 'All' | GalleryCategory

const aspectClasses: Record<GalleryItem['orientation'], string> = {
  portrait: 'aspect-4/5',
  square: 'aspect-square',
  landscape: 'aspect-3/2',
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visibleItems = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter)

  return (
    <Section id="gallery">
      <SectionHeading
        id="gallery-title"
        eyebrow="Gallery"
        title={
          <>
            Our Work, <span className="text-accent">Your Inspiration</span>
          </>
        }
        description="A glimpse of the looks, colour and craft we love creating — from everyday cuts to bridal mornings."
      />

      <div role="group" aria-label="Filter gallery by category" className="mb-10 flex flex-wrap justify-center gap-2.5">
        {galleryCategories.map((category) => {
          const selected = filter === category
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(category)}
              className={`min-h-11 rounded-full border px-5 text-sm font-bold transition ${
                selected
                  ? 'border-accent bg-accent text-ink'
                  : 'border-line text-muted hover:border-accent/60 hover:text-white'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visibleItems.length} {visibleItems.length === 1 ? 'photo' : 'photos'}
        {filter === 'All' ? '' : ` in ${filter}`}
      </p>

      {/* CSS columns give a gap-free masonry layout for any filter combination. */}
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-4 lg:gap-5">
        {visibleItems.map((item, index) => (
          <li key={item.id} className="mb-3 animate-fade-in break-inside-avoid sm:mb-4 lg:mb-5">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View larger: ${item.alt}`}
              className={`group relative block w-full overflow-hidden rounded-2xl border border-line bg-card ${aspectClasses[item.orientation]}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-end justify-between gap-3 bg-linear-to-t from-ink/85 via-ink/10 to-transparent p-4 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="text-left">
                  <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-accent uppercase">
                    {item.category}
                  </span>
                  <span className="block font-display text-sm font-semibold text-white sm:text-base">{item.title}</span>
                </span>
                <Expand aria-hidden="true" className="hidden size-5 shrink-0 text-white sm:block" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={visibleItems}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Section>
  )
}
