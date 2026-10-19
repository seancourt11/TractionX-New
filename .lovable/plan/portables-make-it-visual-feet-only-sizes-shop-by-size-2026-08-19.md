# Portables: make it visual, feet-only sizes, shop by size

Three changes to the portable displays section, using modularexhibits.ca as the visual reference: big photo-led grids, sizes stated in feet, and a real "shop by size" path.

## 1. Make the portables pages visual

Today the hub page opens with long paragraphs and the product cards are small. The section becomes image-first:

- **Category tiles with photos.** The hub (`/portable-booths`) leads with a large image tile per category (10×10 packages, 10×20 packages, 20×20 islands, backwalls, banner stands, tents, counters, flags, table covers…), each showing a representative product photo, the category name, the product count and a "from $X" price. Text intro moves below the visual grid.
- **Bigger product cards.** Larger image area, white product plate, price and setup time on the image edge, hover zoom, and a quick "Get pricing" action on hover so people can act from the grid.
- **Sticky filter bar** on catalog and category pages: size chips + category chips + search stay visible while scrolling the grid.
- **Product pages** get a larger hero image with a thumbnail strip, plus a photo-led "goes well with" row of related products in the same footprint.

### Missing photography

129 of the 385 portable products (all the recently added Beaumont items — fabric tube displays, snap frames, LED lighting, slatwall, cases, outdoor furniture, hygiene stands, plus some banner stands, hanging banners, backdrops, table covers and counters) currently have **no image**, so their cards render as text-only blocks. Product images will be generated for all 129 so every card in the grid has a photo on a clean white plate matching the existing catalog look.

## 2. Everything in feet, nothing in metres

Metric sizing is replaced with the nearest standard imperial booth size:

- Web Summit page package selector and package labels: 3×3m → 10×10ft, 3×6m → 10×20ft, 6×6m → 20×20ft, 9×9m+ → 30×30ft+.
- Booth finder chips: 3x3m / 3x6m / 6x6m → 10×10 / 10×20 / 20×20.
- Six rental booth entries carrying metric names and slugs (ACADA DSEI 5x6m, AH! YES! 4x4m, Infosys 8x9m, Paramount Commerce 5x6m, Sarepta 2x6m and 2x8m) get feet-based names and slugs, with the old slugs kept as aliases so existing links don't 404.
- Any metric wording in portable specs and blurbs is converted to feet.

International venue pages that quote official hall sizes in square metres keep the official figure (it's the venue's published number) but gain a square-feet equivalent alongside it.

## 3. Shop portables by size

Right now a size only exists as a category ("10×20 Portable Booth Packages"), so a 10×20 shopper doesn't see the 10×20-capable backwalls, lightboxes, tents and counters sitting in other categories.

- Every product gets a normalised footprint tag: `10x10`, `10x20`, `20x20`, `tabletop`, `outdoor`, `accessory` (derived from its existing size field, category and name).
- New pages `/portable-displays/size/10x10`, `/10x20`, `/20x20`, `/tabletop` list **every** portable product that fits that footprint, across all categories, grouped by category with its own title, description, intro copy, FAQ and schema.
- Size chips appear at the top of the portables hub, the catalog filter bar and each category page, so clicking "10×20" anywhere shows all 10×20 portables.
- The existing booth-size pages (10×10, 10×20, 20×20) gain a "Portable options for this size" block linking into the matching size page.

## Technical notes

- `src/data/portable-products.ts`: add a `footprint` field (derived, then stored) plus a `PORTABLE_FOOTPRINTS` list; no price/spec changes.
- New route `src/routes/portable-displays.size.$size.tsx` with ItemList + Breadcrumb + FAQ schema, added to the sitemap and site search index.
- `src/components/PortableCatalog.tsx`: new card layout, sticky filter bar, size chip row.
- `src/routes/portable-booths.tsx` and `portable-displays.$category.tsx`: image-led category tiles and hero layout.
- `src/data/portable-images.ts`: 129 new generated product images added.
- Metric → feet edits in `web-summit-vancouver-booth-rentals.tsx`, `BoothFinder.tsx`, `rental-booths.ts` (+ slug aliases in `legacy-redirects.ts`).
