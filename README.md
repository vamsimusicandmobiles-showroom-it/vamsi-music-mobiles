# Vamsi Music & Mobiles

Website for **Vamsi Music & Mobiles**, Sriharipuram, Opp New Ramalayam,
Visakhapatnam 530011.

Next.js 15 (App Router) · React 19 · Tailwind CSS 3.4 · Framer Motion · Lenis · TypeScript

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Requirements: Node 18.18 or newer.

`next/font/google` downloads the two typefaces (Sofia Sans Extra Condensed and
Instrument Sans) at build time and serves them from your own domain, so the
**first build needs an internet connection**. After that the fonts are bundled.

## Optional setting

Create `.env.local` once the domain is known:

```
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

This lets the canonical URL, social-share image and structured data use the
real address. The site works without it.

## Where things live

```
app/
  layout.tsx            fonts, SEO metadata, LocalBusiness JSON-LD, skip link
  page.tsx              page order
  globals.css           type scale, hero keyframes, artwork, reduced-motion rules
  opengraph-image.tsx   social-share image
  icon.svg              favicon
components/
  Navbar  Hero  HeroVisual  Marquee  Statement  Categories  CategoryVisual
  Benefits  Showroom  FinalCTA  Footer  MobileDock
  Button  MaskHeading  Cursor  SmoothScroll  Providers   (shared pieces)
lib/
  site.ts               ALL business details, copy data and links
```

## Changing content

Almost everything is in **`lib/site.ts`**:

- `business`: name, phone, WhatsApp number, email, address, map search text
- `categories`: the six category entries and their WhatsApp enquiry messages
- `featuredBenefit` / `benefits`: the "Why Vamsi" content
- `TERMS_SHORT` / `TERMS_LONG`: the disclaimer wording
- `whatsappLink()`, `telLink`, `mailLink`, `directionsLink`: every CTA is built here

Headline wording lives in the section components (`Hero.tsx`, `Categories.tsx`,
`Benefits.tsx`, `Showroom.tsx`, `FinalCTA.tsx`).

## Adding real photos

Until photos exist, the site shows abstract artwork and looks complete. When you
have them, put the files in `public/images/` and set the paths in `lib/site.ts`:

```ts
export const media = {
  heroImage: '/images/showroom-front.jpg',   // sits under the hero artwork
  heroAlt: 'Inside the Vamsi Music & Mobiles showroom',
  showroomImage: '/images/storefront.jpg',   // shown above the map
  showroomAlt: 'The Vamsi Music & Mobiles storefront in Sriharipuram',
};
```

Write an honest `alt` text that describes the actual photo. Each category can
also take an optional `image` field in the `categories` array to replace its
artwork with a photo.

## Making the map exact

The map and "Get directions" use a text search for the business name and
address, so no API key is needed and no coordinates are invented. Once the shop
has a Google Maps listing, set `business.mapQuery` in `lib/site.ts` to the name
exactly as it appears on Google Maps for a more precise pin.

## What is deliberately not on the site

No prices, reviews, ratings, customer counts, years in business, awards, brand
partnerships, stock claims or opening hours, because none were supplied. Add
them to `lib/site.ts` and the relevant section only when they are real and
confirmed. If opening hours are added, also add them to the JSON-LD in
`app/layout.tsx`.

## Motion and accessibility

- Reduced motion is respected: the hero sequence, spinning disc, equaliser,
  marquee, smooth scrolling, magnetic buttons and cursor ring are all switched
  off, and the scroll-lit statement becomes plain text.
- Touch devices keep native scrolling; the category section reacts to scroll
  position instead of hover.
- Skip link, visible focus rings, a keyboard-closable mobile menu (Escape),
  semantic headings (one `h1`) and labelled map and navigation landmarks.
