# SK Salon website

A responsive single-page website for **SK Salon**, a premium hair, makeup,
beauty and bridal studio. It is built with React, Vite, TypeScript and
Tailwind CSS.

Visitors send booking requests through **WhatsApp**: the form builds a
pre-filled message, and the visitor taps send. There is no backend, database
or paid service, so the site can be hosted free as static files.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Type-checks, then builds the production site into `dist/` |
| `npm run preview` | Serves the `dist/` build locally on http://localhost:4173 |
| `npm run typecheck` | TypeScript check only |
| `npm run lint` | Lints with oxlint |

## Before publishing: configure the salon details

All business details are in **`src/config/siteConfig.ts`**. Every contact field
starts empty, and the page shows a neutral "coming soon" message until it is
filled in.

1. **WhatsApp number (required for bookings).** Set `whatsappNumber` to the
   salon's WhatsApp Business number in international format, **digits only**:
   country code + number, with no `+`, spaces, dashes or leading zero.

   ```ts
   whatsappNumber: '91XXXXXXXXXX', // e.g. India: 91 followed by the 10-digit mobile number
   ```

   Until this is set, the booking form validates normally but shows a
   "WhatsApp booking is not set up yet" message and does not open WhatsApp.
   After setting it, run `npm run dev`, submit a test booking, and check that
   WhatsApp opens a chat with the correct number.
2. `phoneDisplay`, `email`, `address`, `social.instagram`, `social.facebook`.
3. `openingHours` and `bookingSlots`. The current hours are **samples**.
4. Replace sample content in `src/data/`:
   - `stats.ts`: the 200+ / 16 / 15K+ / 12+ figures are placeholders.
   - `services.ts` and `pricing.ts`: all prices are **demonstration prices**.
   - `testimonials.ts`: sample quotes only. Use real reviews, with permission.
5. When all sample content has been replaced, set
   `showSampleContentNotices: false` to hide the "sample" notices.
6. Replace the stock photos. See [docs/ASSETS.md](docs/ASSETS.md).

## Deploy for free (static hosting)

The production build is a folder of static files (`dist/`). Nothing deploys
automatically. Check each provider's current free-tier terms and limits before
you rely on them.

### Option A: Vercel (Hobby plan)

1. Push this repository to GitHub.
2. On vercel.com, choose **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults: build command `npm run build`,
   output directory `dist`.
4. Click **Deploy**. Later pushes to `main` redeploy automatically.

Or deploy from the command line:

```bash
npm install -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Option B: Firebase Hosting (Spark / no-cost plan)

`firebase.json` is already set up for static Hosting from `dist/`. It does not
use App Hosting, Storage, Functions or any billed product.

```bash
npm install -g firebase-tools
firebase login
firebase projects:create            # or use an existing project in the Firebase console
npm run build
firebase deploy --only hosting --project <your-project-id>
```

Do not enable billing. Static Hosting works on the no-cost plan.

## Project structure

```
src/
  components/   Page sections (Navbar, Hero, About, Stats, Services, Pricing,
                Gallery, Lightbox, Journal, Testimonials, BookingForm, Contact,
                Footer) and shared pieces (Section, Logo, SampleNotice, ...)
  config/       siteConfig.ts: salon details, hours, currency, navigation
  data/         services, pricing, gallery, articles, testimonials, stats
  hooks/        useScrolled, useActiveSection
  lib/          price/date formatting, WhatsApp URL builder, scrolling
  types/        shared TypeScript types
public/images/  photography (see docs/ASSETS.md)
```

## How booking works

1. The visitor fills in the form. Name, phone, service, date and time are
   required. Date and time cannot be in the past.
2. On submit, the site builds a readable message and opens
   `https://wa.me/<number>?text=<URL-encoded message>` in a new tab.
3. The visitor presses send in WhatsApp. The site says clearly that nothing is
   saved, and the booking is confirmed only when the salon replies.

Choosing a package or a service's "Book Now" button pre-selects it in the form.
