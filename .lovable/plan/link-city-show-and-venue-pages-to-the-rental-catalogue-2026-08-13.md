# Link city, show and venue pages to the rental catalogue

You're right — they don't. I checked the three templates and none of them link to the rental catalogue:

- `city/$slug` links to: shows, venues, pricing, FAQs, contact, the Las Vegas page — no rental catalogue.
- `shows/$slug` links to: shows, venues, events, booth cost calculator — no rental catalogue.
- `venues/$slug` links to: venues, shows only.

So a visitor landing from Google on "trade show booth rental Chicago" never sees the ~300 rentable booths we actually have. That's a missed conversion path and a missed internal-linking signal to `/rent-a-booth` and the size pages.

## What to add

A consistent "Available for rent in {place}" band on all three page types, placed above the quote form:

- Short intro line naming the city/venue/show ("Every booth below is available as a custom rental for {X} — designed, built, installed and dismantled by our team").
- A row of size shortcuts (10x10, 10x20, 20x20, 20x30, 10x30 / 20x40) linking to the existing `/booth-size/$slug` pages.
- 3–4 real booth cards pulled from the rental catalogue data, deterministically seeded off the page slug so each page shows a different mix (same technique the project photography block already uses).
- Primary button to `/rent-a-booth` ("See all custom rental booths"), secondary to the quote pop-up.

Also add the rental catalogue to the related-links / footer-of-page navigation on each of the three templates so the link exists even for pages where the band is scrolled past.

## Where

- `src/routes/city.$slug.tsx`
- `src/routes/shows.$slug.tsx`
- `src/routes/venues.$slug.tsx`
- New shared component `src/components/RentalCrossLink.tsx` so the three stay identical and future page types can drop it in.

## Technical notes

- Booth data comes from `src/data/rental-booths.ts`; pick items with a slug-seeded index so output is stable between SSR and hydration (no `Math.random`).
- Links use `<Link to="/rent-booth/$slug" params={...}>` and `<Link to="/booth-size/$slug" params={...}>`, never raw `<a href>`.
- Quote button uses the existing `useCta().openQuote` with a `source` of `city-{slug}` / `show-{slug}` / `venue-{slug}` so lead attribution stays intact.
- No schema changes; the band is presentational and inherits the existing dark/purple tokens.

## Not included

No new routes, no pricing changes, and no changes to the rental catalogue itself.
