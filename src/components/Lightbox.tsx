import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { GalleryItem } from '../types'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const controlClass =
  'grid size-12 place-items-center rounded-full border border-white/20 bg-ink/70 text-white backdrop-blur transition hover:border-accent hover:text-accent'

/**
 * Accessible image viewer built on the native <dialog> element, which provides
 * focus trapping, Escape-to-close and focus restoration out of the box.
 */
export default function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  if (index === null || !item) {
    return <dialog ref={dialogRef} onClose={onClose} aria-label="Image viewer" />
  }

  const total = items.length
  const go = (step: number) => onIndexChange((index + step + total) % total)

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  // Clicking the dimmed area outside the image closes the viewer.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      aria-label={`Image viewer: ${item.title}`}
      className="m-0 size-full max-h-none max-w-none bg-transparent p-4 text-white backdrop:bg-ink/92 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4">
        <figure className="pointer-events-auto flex max-h-full min-h-0 flex-col items-center">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-2xl border border-line object-contain"
          />
          <figcaption className="mt-4 text-center">
            <span className="block text-xs font-bold tracking-[0.2em] text-accent uppercase">{item.category}</span>
            <span className="font-display text-lg font-semibold">{item.title}</span>
            <span className="ml-3 text-sm text-muted">
              {index + 1} / {total}
            </span>
          </figcaption>
        </figure>
      </div>

      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close image viewer"
        className={`${controlClass} absolute top-4 right-4 sm:top-6 sm:right-6`}
      >
        <X aria-hidden="true" className="size-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`${controlClass} absolute top-1/2 left-3 -translate-y-1/2 sm:left-6`}
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={`${controlClass} absolute top-1/2 right-3 -translate-y-1/2 sm:right-6`}
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </button>
        </>
      )}
    </dialog>
  )
}
