# Image assets

All photos live in `public/images/` and are served from `/images/...`. They are
**stock placeholders** from [Unsplash](https://unsplash.com). The
[Unsplash License](https://unsplash.com/license) allows free commercial use
without attribution. It does not allow selling the photos unaltered or using
them to build a competing image service. None of them shows SK Salon's own
work, staff or premises.

**Replace them before launch** with SK Salon's own photography wherever
possible, especially the gallery, which visitors will read as the salon's real
portfolio.

## How to replace an image

1. Export the new photo as JPEG (quality ~70–80) at the size listed below.
2. Save it in `public/images/` under the **same filename**, or update the path in
   the data file listed.
3. Update the matching alt text so it describes the new photo.

| File | Used in | Size (px) | Current content | Source |
|---|---|---|---|---|
| `hero-stylist.jpg` | Hero (`Hero.tsx`) | 1000×1250 | Beauty portrait, copper hair with bangs, red lips | [Unsplash dNmmjX2Owxk](https://unsplash.com/photos/dNmmjX2Owxk) |
| `about-salon-experience.jpg` | About (`About.tsx`) | 1000×1200 | Stylist placing a pearl accessory in a client's bun | [Unsplash g0cSOCHaHiY](https://unsplash.com/photos/g0cSOCHaHiY) |
| `service-haircut-styling.jpg` | Services (`data/services.ts`) | 800×600 | Stylist blow-drying a short bob | [Unsplash WXmHwPcFamo](https://unsplash.com/photos/WXmHwPcFamo) |
| `service-hair-coloring.jpg` | Services | 800×600 | Lightener applied to hair beside foils | [Unsplash lps3FolQ6Ro](https://unsplash.com/photos/lps3FolQ6Ro) |
| `service-hair-spa.jpg` | Services | 800×600 | Hair rinse at a backwash basin | [Unsplash Md_DhaFsnCQ](https://unsplash.com/photos/Md_DhaFsnCQ) |
| `service-bridal-makeup.jpg` | Services | 800×600 | Artist applying eye makeup to a bride | [Unsplash n42VxNU5288](https://unsplash.com/photos/n42VxNU5288) |
| `service-party-makeup.jpg` | Services | 800×600 | Artist lining a client's lips | [Unsplash YGmk9UZMdZg](https://unsplash.com/photos/YGmk9UZMdZg) |
| `service-saree-draping.jpg` | Services | 800×600 | Woman in a royal-blue silk saree | [Unsplash tjRs987fPfg](https://unsplash.com/photos/tjRs987fPfg) |
| `gallery-bridal-look.jpg` | Gallery (`data/gallery.ts`) | 800×1000 | Bride in a red lehenga with kundan jewellery | [Unsplash zW7hVlt6Oa0](https://unsplash.com/photos/zW7hVlt6Oa0) |
| `gallery-makeup-detail.jpg` | Gallery | 800×800 | Gold eyeshadow close-up | [Unsplash I3y-aJ4DWng](https://unsplash.com/photos/I3y-aJ4DWng) |
| `gallery-salon-interior.jpg` | Gallery | 1200×800 | Black-and-white salon interior | [Unsplash VjRpkGtS55w](https://unsplash.com/photos/VjRpkGtS55w) |
| `gallery-haircut-transformation.jpg` | Gallery | 800×1000 | Stylist cutting long wet hair | [Unsplash V2HDOQTJh3o](https://unsplash.com/photos/V2HDOQTJh3o) |
| `gallery-party-makeup.jpg` | Gallery | 800×800 | Smoky-eye glam makeup | [Unsplash KIBfEAXNT6k](https://unsplash.com/photos/KIBfEAXNT6k) |
| `gallery-hairstyling-updo.jpg` | Gallery | 800×800 | Low chignon with a pearl hairpiece | [Unsplash EEo_VkcATgw](https://unsplash.com/photos/EEo_VkcATgw) |
| `gallery-hair-coloring.jpg` | Gallery | 800×1000 | Ash-blonde balayage, back view | [Unsplash CIrRI0ujiRo](https://unsplash.com/photos/CIrRI0ujiRo) |
| `gallery-salon-station.jpg` | Gallery | 800×800 | Row of classic leather styling chairs | [Unsplash dU6eE_j2My8](https://unsplash.com/photos/dU6eE_j2My8) |
| `journal-everyday-beauty.jpg` | Journal (`data/articles.ts`) | 800×500 | Makeup flat lay | [Unsplash xwM61TPMlYk](https://unsplash.com/photos/xwM61TPMlYk) |
| `journal-skincare-glow.jpg` | Journal | 800×500 | Facial oil dropper on a hand | [Unsplash 80wCkpt-IKE](https://unsplash.com/photos/80wCkpt-IKE) |
| `journal-hairstyle-care.jpg` | Journal | 800×500 | Long wavy hair, back view | [Unsplash WCPg9ROZbM0](https://unsplash.com/photos/WCPg9ROZbM0) |
| `avatar-1.jpg` … `avatar-4.jpg` | Hero trust card | 160×160 | Stock headshots | Unsplash [mEZ3PoFGs_k](https://unsplash.com/photos/mEZ3PoFGs_k), [iFgRcqHznqg](https://unsplash.com/photos/iFgRcqHznqg), [QXevDflbl8A](https://unsplash.com/photos/QXevDflbl8A), [rDEOVtE7vOs](https://unsplash.com/photos/rDEOVtE7vOs) |

## Notes

- **Avatars:** replace them with photos of real clients who have agreed to it,
  or remove the avatar row from `Hero.tsx`.
- **Gallery order:** the order in `data/gallery.ts` balances the masonry columns.
  If you add or remove photos, reorder them until the columns end at similar
  heights.
- **Logo:** the site uses a text logo. To use an image logo, add it to
  `public/images/` and set `logoSrc` in `src/config/siteConfig.ts`.
- **Favicon:** `public/favicon.svg` is a simple "SK" monogram. Replace it with
  the brand mark when one is available.
- **Social preview image:** no `og:image` is set, because it needs the site's
  final absolute URL. After deploying, add
  `<meta property="og:image" content="https://your-domain/images/hero-stylist.jpg" />`
  to `index.html`.
