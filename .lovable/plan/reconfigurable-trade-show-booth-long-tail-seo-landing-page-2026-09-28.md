# Reconfigurable Trade Show Booth — long-tail SEO landing page

## Keyword strategy (Semrush, US database)

- "reconfigurable trade show booth" — no volume data (unknown demand, not zero). Target it as the differentiator and exact-match page focus; low competition expected on a term competitors don't optimize for.
- Anchor terms with proven demand the page also targets: "modular trade show booth" (480/mo, difficulty 16/100, high paid competition — an underserved organic gap), "modular trade show booth rental" (50/mo, difficulty 0).
- Secondary phrases worked into prose: reconfigurable booth rental, reconfigurable exhibit system, modular exhibit system, booth that reconfigures between shows, "10×10 to 20×20 reconfiguration", metric aliases via `src/lib/units.ts`.

## Route & file

- New standalone route: `src/routes/reconfigurable-trade-show-booths.tsx` (long-form pattern like the double-deck page, not a products.$slug entry).
- Slug: `/reconfigurable-trade-show-booths`. No legacy redirect needed (new page).

## Page structure

1. **Hero** — eyebrow "Reconfigurable exhibits", H1 "Reconfigurable Trade Show Booths", intro naming size/shape/component reconfiguration + rental and custom framing. CTAs: complimentary 3D design offer + quote button.
2. **Short-answer block** — 2–3 sentence direct answer to "what is a reconfigurable trade show booth" for featured-snippet eligibility.
3. **"What reconfigurable really means"** — three cards: reconfigure the size (same inventory, 10×10 → 10×20 → 20×20), reconfigure the shape (inline ↔ endcap ↔ island), reconfigure the components (counters, storage, towers, lightboxes, AV re-used show to show).
4. **Reconfiguration examples** — a worked example table: one inventory across a 4-show program (e.g. CES 10×20 → HIMSS 10×10 → DEFSEC 20×20), showing what changes (graphics, footprint) and what doesn't (frame, counters). This is the information-gain section competitors don't have.
5. **Rent or buy your reconfigurable system** — short rent-vs-buy framing linking to `/compare/rent-vs-buy-trade-show-booth`, both options promoted.
6. **Pricing anchor** — real starting prices only: custom 10×10 from $12,500; rental 10×10 from $16,250, 10×20 from $22,750, 20×20 from $39,000 (matches existing site pricing; no invented numbers).
7. **FAQ (4–5 questions, wired into FAQPage JSON-LD)** — "What is a reconfigurable trade show booth?", "Is reconfigurable the same as modular?", "Can a reconfigurable booth change size between shows?", "How much does a reconfigurable booth cost?", "Should I rent or buy a reconfigurable exhibit?".
8. **Internal links with descriptive anchors** — modular catalog (`/products/modular-catalog`), custom exhibits, rental pricing, booth cost calculator, gallery.

## CTAs (existing system, reused)

- `DesignCtaBand` (complimentary 3D design offer) + `QuoteButton`/quote form + `CTABand` with the 10-min / 30-min ($10K+) meeting tiers.

## SEO head & schema

- Title: "Reconfigurable Trade Show Booths — Rent or Buy | Traction X"; meta description with starting price + reconfigure angle; canonical + og:url to the page; robots meta from `robotsMeta()` (site stays noindex until launch).
- JSON-LD: Product (AggregateOffer from $16,250 rental), FAQPage, BreadcrumbList (Home → Trade Show Displays → this page).

## Navigation & cross-links

- Add "Reconfigurable Booths" to NAV (Custom Exhibits children, near the modular catalog entry) and link the modular-catalog product page to this page so authority flows both ways.
- Add a link from `/trade-show-displays` four-format grid copy.

## Out of scope

- No changes to the modular-catalog page copy beyond a link, no homepage changes, no new pricing claims. Site remains noindex until launch.
