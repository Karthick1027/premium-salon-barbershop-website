import type { GalleryCategory, GalleryItem } from '../types'

export const galleryCategories: Array<'All' | GalleryCategory> = ['All', 'Hair', 'Makeup', 'Bridal', 'Salon']

/**
 * Replace these with photos of the salon's own work before launch (see docs/ASSETS.md).
 * The order is tuned so the masonry columns end at similar heights.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'bridal-look',
    src: '/images/gallery-bridal-look.jpg',
    alt: 'Bride in a red embroidered lehenga with gold kundan jewellery',
    title: 'Bridal Look',
    category: 'Bridal',
    orientation: 'portrait',
  },
  {
    id: 'makeup-detail',
    src: '/images/gallery-makeup-detail.jpg',
    alt: 'Close-up of shimmering gold eyeshadow being applied with a brush',
    title: 'Makeup Artistry',
    category: 'Makeup',
    orientation: 'square',
  },
  {
    id: 'salon-interior',
    src: '/images/gallery-salon-interior.jpg',
    alt: 'Black-and-white salon interior with styling chairs facing tall mirrors',
    title: 'The Studio',
    category: 'Salon',
    orientation: 'landscape',
  },
  {
    id: 'haircut-transformation',
    src: '/images/gallery-haircut-transformation.jpg',
    alt: 'Stylist cutting a section of long dark hair with scissors and a comb',
    title: 'Precision Cutting',
    category: 'Hair',
    orientation: 'portrait',
  },
  {
    id: 'party-makeup',
    src: '/images/gallery-party-makeup.jpg',
    alt: 'Glamorous smoky-eye makeup with winged liner and glossy nude lips',
    title: 'Party Glam',
    category: 'Makeup',
    orientation: 'square',
  },
  {
    id: 'hairstyling-updo',
    src: '/images/gallery-hairstyling-updo.jpg',
    alt: 'Sleek low chignon with finger waves and a pearl hairpiece',
    title: 'Occasion Hairstyling',
    category: 'Hair',
    orientation: 'square',
  },
  {
    id: 'hair-coloring',
    src: '/images/gallery-hair-coloring.jpg',
    alt: 'Long wavy hair with a dark-root to ash-blonde balayage',
    title: 'Hair Colouring',
    category: 'Hair',
    orientation: 'portrait',
  },
  {
    id: 'salon-station',
    src: '/images/gallery-salon-station.jpg',
    alt: 'Row of classic leather styling chairs in a softly lit salon',
    title: 'Styling Station',
    category: 'Salon',
    orientation: 'square',
  },
]
