# Add the rental catalogue to every booth-size page

Right now `/booth-size/10x20-booths` (and the other size pages) only show a "what's included" list, a gallery link and a quote form. The filterable rental catalogue — the size / city / search browser with real booth cards — lives only on `/rent-a-booth`. Visitors landing on a size page can't browse the ~300 actual designs.

## What changes

On the four size pages (8×10, 10×10, 10×20, 20×20), add a full rental catalogue section between the "standard package" block and the "other booth sizes" block:

- The same component used on `/rent-a-booth`, pre-filtered to that page's footprint, so `/booth-size/10x20-booths` opens already showing 10×20 designs.
- Visitors can still switch size, pick their show city, search by name/code, load more, and open the instant/customize quote pop-up from any booth card.
- Heading and intro written per size ("10×20 custom rental booths — pick a design, pick your city"), so the four pages don't share duplicate copy.
- 8×10 has no matching footprint in the rental catalogue, so it opens on the nearest available size (10×10) with a line explaining 8×10 in-lines are built from the same 10×10 designs trimmed to the space.

## What does not change

- Accessory / portable pages (`counters`, `banner-stands`, `printed-tents`, `table-covers`, `literature-stands`, `hanging-banners`, `accessories`, `private-enclosures`) get no catalogue — they aren't rentable booth footprints.
- No changes to the catalogue data, pricing, or the quote flow itself.

## Technical notes

- `src/routes/booth-size.$slug.tsx`: import `RentalCatalog` from `@/components/RentalCatalog`, render it inside a `<Section>` only when `e.category === "size"`, passing `initialSize` derived from `e.gallerySize` mapped against `RENTAL_SIZES` (8×10 → `10x10`).
- Use `showQuotePaths={false}` so the page keeps one quote path (the existing `QuoteForm` / global CTA) rather than stacking two.
- `RentalCatalog` already auto-selects the visitor's city from `useCityContext`, so city-page arrivals stay pre-filled — no extra wiring needed.
