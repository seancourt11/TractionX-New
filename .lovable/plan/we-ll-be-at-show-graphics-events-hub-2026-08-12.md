# "We'll Be At" Show Graphics + Events Hub

Two deliverables: a set of ready-to-post branded show graphics in the style of the competitor post, and a crawlable "Where to find us" hub on the site that turns those posts into real SEO value.

## 1. Branded show graphics (ready-to-post PNGs)

Same layout language as the reference, rebuilt in Traction X branding:
- Black base, light-purple accent (`oklch(0.78 0.13 300)`) diagonal wedge replacing the orange
- Montserrat headings / Inter details
- Traction X logo lockup bottom-right
- Dimmed trade-show floor photo from our own project gallery (real booths we built, not stock)
- Conversion-led copy stack instead of a flat "see you there": a qualifying hook ("Exhibiting at CES?"), then SHOW NAME, dates, city, venue, a booking-deadline line, and a single strong offer button — "Get a free 3D booth design →" with the low-friction reassurance line ("10-min intro calls, no pressure").
- The urgency line is a **booth booking deadline, not the show date**. Deadlines are calculated back from each show's opening day:
  - Architect / flagship custom builds — book by show date minus 4 months
  - Standard custom rental or purchase — book by show date minus 3 months
  - 45 days or less to show — rescue build territory; graphic swaps to "Under 45 days out? We still build these" instead of a deadline
  Each graphic shows the deadline that is still ahead of today, so the post is always accurate the day it's published.
- Psychology applied: self-selection hook so the right exhibitor stops scrolling, a real booking deadline for urgency, risk reversal on the offer, our own build photo as social proof, one CTA per graphic rather than competing asks.

Starter set of 6, pulled from `src/data/shows.ts` with their real cities, venues and cadence:
1. CES — Las Vegas Convention Center
2. NRF Big Show — Javits Center, New York
3. DEFSEC Atlantic — Halifax Convention Centre
4. Web Summit Vancouver — Vancouver Convention Centre
5. HIMSS Global — Orlando
6. PDAC — Toronto

Delivered as downloadable PNGs (1200x675, LinkedIn/X friendly) plus a 1080x1080 square variant of each for Instagram. Exact 2027 show dates get confirmed from each show's site before they go on a graphic; anything unverified is left off rather than guessed.

## 2. On-site events hub (the SEO half)

New route `/events` — "Where You'll Find Traction X" — plus per-show announcement blocks:
- Grid of upcoming shows, each card: show name, dates, city, venue, and the post graphic
- Every card links through to its existing `/shows/{slug}` page and its `/city/{slug}` page (internal link equity into the pages we already built)
- `Event` JSON-LD per show with `location`, `startDate`, `organizer`, plus `BreadcrumbList`
- Standard `PageLayout`, the 3D-design CTA band and the two-length virtual meeting CTA
- Added to nav under Locations & Shows, and to `sitemap.xml`
- Each `/shows/{slug}` page gets an "Meet us at this show" block reusing the same graphic, so the asset earns links in two places

## 3. Additional content-format ideas (delivered as a written list)

Grounded in pages we already have, so each one feeds internal linking:
- **Booth-size visual cards** — "What $30K actually gets you at a 20×20", pulled from the cost calculator tiers
- **Venue fact cards** — drayage windows, dock hours, hanging-sign height limits per convention centre, from `venues-longform`
- (Before/after build carousels: on hold until the portfolio images are uploaded)
- **Booking-deadline countdown posts** — "Book by X for CES 2027", straight from each show's `bookingWindow`
- **Industry myth-busters** — one per vertical from `src/data/industries.ts`
- **Glossary term cards** — one term per post from the exhibit glossary, each linking back to the glossary page
- **Rent vs. buy comparison graphics** — from the comparison pages
- **Show recap posts** — our booth at a show we just did, linking show + city + gallery

## Technical notes

- Graphics rendered as static PNGs written to the documents folder for download; no runtime image generation, no new dependencies in the app bundle.
- New file `src/data/events.ts` holds the upcoming-show schedule (show slug, dates, booth number if known) plus a small helper that derives the three booking deadlines (−4 months architect, −3 months standard, 45-day rescue cutoff) from each show's start date, so both the graphics and the hub read the same dates.
- New route `src/routes/events.tsx` with its own `head()` (title, description, og/twitter), robots meta from `src/lib/seo.ts` so it stays noindex until launch like every other page.
