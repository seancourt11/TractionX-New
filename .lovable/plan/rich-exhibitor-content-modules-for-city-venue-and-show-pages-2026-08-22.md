# Rich exhibitor content modules for city, venue and show pages

Goal: give each city/venue/show page something a competitor cannot copy — practical tools and local facts an exhibitor actually uses while planning. Each module is one reusable component fed by existing data (`src/data/venues.ts`, `cities.ts`, `shows.ts`, `page-proof.ts`, `market-tier.ts`), so all pages inherit it automatically and the text stays unique per location.

## The modules

**1. Landed-cost estimator (not just booth price)**
Beside the existing price bands: a small interactive that adds the show-floor services exhibitors always forget — drayage, electrical, rigging, cleaning, labour — using the market-tier percentages we already publish. Enter footprint, see "booth + services = real budget" for this city. This is the single biggest planning question and nobody answers it per-city.

**2. Show-week countdown planner**
A dated work-back schedule generated from the show date (or a date the visitor types on venue/city pages): advance-warehouse cut-off, discount-price deadline, graphics-approval date, rigging order date, carrier dispatch, install day. Downloadable as a checklist and a lead capture point.

**3. Move-in and freight reality card**
Per venue: dock count, marshalling yard rules, POV/hand-carry rules, target-time behaviour, typical dock wait, and the closest advance warehouse. Venue-specific operational detail is exactly the "information gain" signal that outranks generic city copy.

**4. Local rules and gotchas strip**
Union jurisdiction lines (who may touch what), fire-marshal and ceiling-height limits, hanging-sign rules, and the two or three mistakes we see most in that hall. Short, scannable, quotable by AI search.

**5. Exhibitor logistics quick-facts**
Airport-to-hall drive times, hotel blocks near the hall, closest print/repair resources, load-in traffic notes, weather for the show month. Some of this exists in `page-proof.ts` — this promotes it into a consistent, structured card on every page.

**6. "What this footprint looks like here" visual**
For each city/venue, a scaled plan graphic of 10x10 / 10x20 / 20x20 against that hall's aisle and ceiling limits, linked into the rental catalogue already on the page.

**7. Comparable builds in this hall**
Pull matching projects from the gallery/case data by city, so each page shows real work in that room rather than stock shots.

## Suggested order

Start with 1 and 2 — highest exhibitor value, strongest lead capture, applies to all 200+ pages immediately from data we already have. Then 3 and 4 (venue-specific, biggest SEO differentiation), then 5-7.

## Technical notes

- New components under `src/components/` (e.g. `LandedCostBand.tsx`, `ShowCountdown.tsx`, `MoveInCard.tsx`), rendered from `src/routes/city.$slug.tsx`, `venues.$slug.tsx`, `shows.$slug.tsx`.
- Cost logic extends `src/lib/market-tier.ts` and `src/lib/estimator.ts`; no new pricing source.
- Venue-specific facts extend `src/data/page-proof.ts` and `src/data/venues.ts` with optional fields, so pages without data simply omit the card.
- Each module contributes to the existing FAQPage/Speakable JSON-LD on those routes; countdown adds HowTo schema.
- No backend needed; all client-side, lead capture reuses `GlobalCta` / `QuoteModal`.
