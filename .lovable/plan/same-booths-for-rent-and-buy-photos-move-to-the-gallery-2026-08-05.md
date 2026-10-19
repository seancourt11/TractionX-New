# Same booths for rent and buy — photos move to the gallery

## What I found first

I checked the pages before writing this. The `/booth-size/10x10-booths` page (the "10×10 Booths" link under Custom Exhibits) renders **no photos at all** today — it's copy, an inclusions grid, FAQs and a quote form. The only booth photography on the site is the 294-image catalog on `/rent-a-booth` and its `/rent-booth/...` detail pages, filtered by the size chips (10×10, 10×20, 20×20…).

So "the booths shown under Custom Exhibits → 10×10" are those size-filtered catalog photos. They are past-project photos, not a bookable product list — which is exactly the point you're making. The plan below moves the photography into the gallery and keeps the size/catalog pages as the commercial pages, serving rent and buy equally.

## 1. Gallery becomes the home of the photos

`/gallery` (already under Resources) gains the 294 project photos alongside the 37 images it has now, with:

- Size filter chips: All, 10×10, 10×20, 10×30, 20×20, 20×30, 40×40, Larger.
- Deep-linkable filters — `/gallery?size=10x10` — so any page can link straight to the right slice.
- The existing lightbox, lazy loading and descriptive alt text ("10×20 custom trade show booth — [project]").
- One CTA band per screenful: "Get my exact quote" plus the complimentary 3D design offer.

Photos stay presentational. No prices, no "rent this booth" buttons — that's the change in framing.

## 2. Size pages serve rent and buy equally

Each `/booth-size/...` page (8×10, 10×10, 10×20, 20×20, and the larger footprints) gets:

- Two starting prices side by side — rental starting from, purchase starting from — with the "starting from, exact quote after designer review" framing used elsewhere.
- Copy that states plainly these are the same booth designs whether you rent or buy; renting reconfigures an existing build, buying keeps it.
- A "See 10×10 booths we've built" strip linking to `/gallery?size=10x10` instead of implying a pickable product grid.

## 3. Menus stay separate, catalog is shared

Custom Exhibits and Booth Rentals keep their own top-level panels and their own intent-led copy, but the "By booth size" / "Rentals by size" children keep pointing at the same `/booth-size/...` pages they already share. No URL changes, no new routes, no redirects.

`/rent-a-booth` keeps the catalog for browsing designs, but its cards link to the gallery slice for photography context and each detail page shows both rental and purchase starting points.

## 4. Housekeeping

- `Resources → Gallery` added to the Resources panel and footer (it currently sits only under Custom Exhibits' "Proof & industries"); the Custom Exhibits entry stays too.
- `head()` on `/gallery` updated for the larger, filterable set; `ImageGallery` JSON-LD added.

## Technical notes

- `src/routes/gallery.tsx`: merge `RENTAL_BOOTHS` image paths with the existing `src/assets/gallery/*` glob, add size chips driven by `RENTAL_SIZES`, read/write a `size` search param via TanStack Router's `validateSearch`.
- `src/data/booth-sizes.ts`: add a `purchaseFrom` field beside `starting`; source values from `src/data/pricing-tiers.ts` so rent/buy numbers stay consistent with the calculator and the PDFs.
- `src/routes/booth-size.$slug.tsx`: render both prices, swap the generic "See booth photos" link for the size-filtered gallery link.
- `src/components/RentalCatalog.tsx` / `src/routes/rent-booth.$slug.tsx`: add the gallery link and the purchase starting price; no data restructuring.
- `src/lib/site.ts`: one added nav child under Resources.
