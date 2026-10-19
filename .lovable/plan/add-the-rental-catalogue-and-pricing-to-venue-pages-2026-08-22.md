# Add the rental catalogue and pricing to venue pages

## Answer first

**No on both counts.** Right now each venue page (`/venues/{slug}`) ends with a small "Available for rent" band that shows **4 hand-picked booths** (one each at 10×10, 10×20, 20×20, 20×30) and links out to `/rent-a-booth`. There is no filterable catalogue on the page, and no price appears anywhere — not in the band, not in the booth cards, not in the body copy.

The interactive catalogue (size toggle + city typeahead) currently lives only on `/rent-a-booth`, `/rent-booth/{slug}` and the booth-size pages. Published starting prices live only on the booth-size pages, the pricing hub and the cost calculator.

City pages and show pages have the same gap — they use the same 4-booth band.

## What to add to venue pages

1. **Full rental catalogue, city pre-filled.** Drop the real `RentalCatalog` onto the venue page with the venue's city already selected in the city field, so a visitor on the Las Vegas Convention Center page can toggle 10×10 → 20×30 and see the whole inventory without leaving. Keep the section below the venue's logistics content so the long-form SEO copy still leads.

2. **A venue price band table.** A compact "What a booth costs at {venue}" table: each footprint with its rent-from and buy-from price, plus a market-tier note for that venue's city (standard / major / strict-union) so Las Vegas and Chicago read higher than a regional hall. This is unique per-venue data — good for information gain and AI answers — and it feeds the FAQ/Speakable blocks.

3. **Price-band FAQ + schema.** Add one venue-specific pricing Q&A ("How much does a 20×20 booth cost at {venue}?") into the existing FAQ accordion so it joins the FAQPage schema already on the page.

4. **CTA continuity.** Keep the existing behaviour: prices are starting points, the exact number comes from the quote modal / estimator, and I&D stays included per the Traction X promise.

5. **Roll the same treatment to show pages and city pages** once the venue template is right, since they share the cross-link component.

## Technical notes

- `src/routes/venues.$slug.tsx` — replace `RentalCrossLink` with `RentalCatalog` (new `initialCity` / `initialSize` props) plus a new price-band section.
- `src/components/RentalCatalog.tsx` — accept an initial city and an optional embedded/compact mode so it doesn't repeat the page-level hero copy.
- New `src/components/VenuePriceBands.tsx` — reads `BOOTH_SIZES` (`starting`, `purchaseFrom`) and `CITY_TIER` from `src/lib/estimator.ts` to produce the venue-adjusted band, so numbers stay in one place.
- `src/data/venues.ts` — map each venue's city to a market tier (derive from the existing union/drayage fields where possible).
- FAQ additions go through `src/data/venues-longform.ts` so they land in the existing schema build.

## Open question

Show the venue-adjusted band (e.g. Las Vegas reads ~28% above the base), or show one national starting price everywhere and mention the market tier as a note? The adjusted band is more useful and more unique for SEO; the flat number is simpler to defend in a sales call.
