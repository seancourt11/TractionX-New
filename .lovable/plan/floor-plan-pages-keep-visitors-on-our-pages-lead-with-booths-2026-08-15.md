# Floor plan pages: keep visitors on our pages, lead with booths we rent

## The problem

Two places currently point people away or read like we only sell software help:

1. **Show pages** — the floor plan block ends with a link to the official show site "for the live floor plan". That's the strongest CTA on the block and it sends the visitor off our page before they see we rent booths for that exact show.
2. **Comparison pages** (hub + 7 platform pages) — they position us as a managed floor plan partner only. Nothing on them says we also supply the actual custom booth rentals for the shows those platforms map.

Venue floor plan guides don't link out at all today — they just need the rental showcase added.

## What changes

### 1. Show floor plan block (appears on every show page)
- Demote the outbound reference: no standalone "official site" CTA button. Keep one short, honest line in small print near the bottom — the organizer is the source of record for live hall maps — with the outbound link inline, `rel="nofollow noopener"`, opening in a new tab so our page stays open.
- Promote what we actually sell: the primary CTA row becomes booth-first — "See booths available for {Show}" and "Get my exact quote" — with the venue guide and floor plan service as secondary text links.
- Add a short "Once you've picked your booth number" band: what the plan tells you about the build (hall ceiling/rigging limits, corner vs island facing, aisle width) and that we build to that footprint, with install and dismantle included.

### 2. Show pages — booths before the exit
Ensure the existing "Available for rent in {city}" rental band renders **above** the floor plan block's outbound note on every show page, so the sequence is: plan guidance → booths we rent for it → (small print) organizer's live map.

### 3. Venue floor plan guides (35 pages)
Add a rental showcase band to each guide, keyed to the venue's city: real booths we rent that fit the halls described, plus the exhibitor-side CTA. Also add a link to that venue's shows so the internal loop closes instead of dead-ending.

### 4. Comparison hub + platform pages
- Add a consistent "We're the managed partner — and the booths" section on the hub and every platform page: we run the plan on whichever platform the organizer chooses, and we also supply the custom booth rentals for the exhibitors on that plan. Two audiences, one partner.
- Add an exhibitor-facing block linking to the rental catalogue and booth sizes, so an exhibitor who landed on "ExpoFP alternatives" still finds the thing they can buy from us.
- No outbound links to the platform vendors' sites from these pages (we currently have none — keep it that way; naming them in prose is enough).

## Technical notes

- Files: `src/components/ShowFloorPlanBlock.tsx`, `src/routes/shows.$slug.tsx` (section order), `src/routes/venue-floor-plans.$slug.tsx`, `src/routes/floor-plan-software-comparison.index.tsx`, `src/routes/floor-plan-software-comparison.$slug.tsx`.
- Reuse `RentalCrossLink` for the booth bands so booth selection stays deterministic and city-aware; reuse `QuoteButton` / `DesignCtaBand` for CTAs. No new data files.
- All outbound organizer links get `rel="nofollow noopener"` and `target="_blank"`.
- Copy stays derived from existing venue/show data — no invented specs or claims.
