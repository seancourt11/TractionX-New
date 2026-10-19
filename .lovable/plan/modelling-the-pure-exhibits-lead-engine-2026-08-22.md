# Modelling the Pure Exhibits lead engine

I re-read their live site. Their advantage is not content volume — we already out-page them.
It's that a visitor sees a **number on every design**, can **search by city, size and budget in
the first screen**, and can **collect designs and send them as one quote**. We have the
catalog, the pricing model and the city index to do all three; they just aren't connected.

Building all three, in this order. Proof bar and client logos are skipped for now per your call.

## 1. A price on every design

Today none of our 299 rental designs shows a price. Pure prints a fixed range on every card,
which is why their size pages convert.

- Derive a rent range and a buy-from price for each design from its footprint, using the
  numbers already in the estimator, then adjust by the selected city's cost index.
- Show it on every catalog card, on each `/rent-booth/<slug>` page, and in the size-filtered
  catalog on booth-size, city, venue and show pages.
- Keep it honest: ranges are labelled as starting/typical and carry the same estimate
  disclaimer we already use, so nothing conflicts with our fixed-scope promise.
- Because each design page now carries a price, it can also emit `Offer` / `priceRange` schema
  — rich-result eligibility we currently can't claim on 299 URLs.

## 2. Homepage Booth Finder

A three-input search above the fold: city (type-ahead), booth size, optional budget. It lands
on the catalog pre-filtered to that combination. Same inputs Pure leads with, reusing our
existing typeahead and catalog filters, and it inherits the visitor's city when they arrived
from a city page.

## 3. Shortlist — save and compare

- A "Save" control on every booth card and booth detail page.
- A counter in the header showing how many designs are saved.
- A `/shortlist` page comparing the saved designs side by side — image, size, price, code,
  cities available — with one CTA that submits the whole shortlist as a quote.
- Saved in the browser, no account, and it survives across pages and sessions.

This is the part with no equivalent on our site today: it converts a browser into a lead
without asking for anything up front.

## Also worth adding (small, same build)

- **`/services/warehouse-pre-build`** — Pure's strongest trust page: the booth stands complete
  in the shop, photographed, and you approve it before it crates. Our "pre-built and
  photographed" promise currently has no page behind it. Slots straight into the existing
  services template, nav and sitemap.
- **"Exhibit companies in <city>" coverage** — they rank for that phrase; our city pages only
  target rentals. Add a short section to the city template covering the comparison intent, no
  new URLs needed.
- **Logo 30% larger** — the header logo is the only place it appears; it goes from 36px tall to
  roughly 48px, with the header bar and mobile menu spacing adjusted so nothing crowds it.

## Technical notes

- Pricing derives from `FOOTPRINTS` in `src/lib/estimator.ts`, the tier multipliers, and
  `cityCostIndex` in `src/lib/market-tier.ts`. A new `src/lib/booth-pricing.ts` exposes one
  function so cards, detail pages and schema all read the same number. No hand-entered prices.
- Sizes in `rental-booths.ts` that have no estimator footprint (`Larger`, `Custom`, `40x40`,
  `40x50`) fall back to a "priced on request" label rather than a guessed number.
- Shortlist: `src/lib/shortlist.ts` — localStorage store plus a provider mounted in
  `__root.tsx`, mirroring `src/lib/city-context.tsx`. `/shortlist` is `noindex`; submission
  reuses `submitLead` with the saved slugs attached.
- Finder reuses `CityTypeahead` and the filter state in `src/components/RentalCatalog.tsx`;
  it passes selections through search params so the result URL is shareable.
- Warehouse pre-build is a new entry in `src/data/services.ts` rendered by `/services/$slug`.
