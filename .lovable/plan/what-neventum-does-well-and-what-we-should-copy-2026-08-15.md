# What Neventum does well — and what we should copy

Neventum ranks because it is a **directory**, not a brochure. It indexes ~19,400 trade shows across 1,771 cities and 149 countries, then slices that one dataset into thousands of crawlable, internally-linked pages: show pages, city pages, country pages, sector pages, calendar-by-month pages, venue pages, and a supplier ("stand builder") directory layered on top. Every page is a real answer to a real search, and every page links to a dozen sibling pages.

We already have the same page *types* (62 shows, 142 cities, 38 venues, 15 industries) — what we are missing is **scale, the calendar/date dimension, and the cross-slice hub pages** that turn a list of pages into a link graph.

## What to build

### 1. A show calendar dimension (biggest gap)
Neventum's highest-intent traffic comes from date-based searches: "trade shows in Las Vegas 2027", "March 2027 trade show calendar", "medical trade shows 2027".

- `/trade-show-calendar` hub — all upcoming shows, sorted by date.
- `/trade-show-calendar/2027` and `/trade-show-calendar/2027/march` — year and month pages.
- Add explicit `startDate` / `endDate` / `edition year` to each show record so shows can be sorted, filtered, and marked up with `Event` schema (currently we only carry a text `cadence`).
- Each show page gains an "Upcoming editions" block and next/previous edition links.

### 2. Cross-slice hub pages (the link graph)
Right now cities, shows, venues and industries are four flat lists. Neventum multiplies them:

- `/trade-shows/{city}` — every show we cover in that city, linked to our booth rental offer.
- `/trade-shows/{industry}` — every show in that sector.
- `/trade-shows/{industry}/{city}` for the ~40 highest-volume combinations only (e.g. medical shows in Chicago), not a blind matrix — thin combos get filtered out.
- Country/region index pages: `/trade-shows/united-states`, `/trade-shows/canada`.

Each hub is a genuine page with counts, a calendar strip, venue links, and our rental CTA — not a bare link list.

### 3. Show dataset expansion
Depth is the moat. Grow from 62 shows to roughly 250–300 across the US and Canada, prioritising shows at the 38 venues and 142 cities we already cover, so every existing page gets richer and every new show page has a parent to link from.

### 4. Directory-grade internal linking
Add a shared "related" footer block to every show, city, venue and industry page: nearby cities, same-venue shows, same-sector shows, the month calendar, the parent country. This is the single mechanical thing Neventum does that we don't.

### 5. Structured data upgrades
`Event` schema with real dates on every show page, `ItemList` on every hub and calendar page, and `BreadcrumbList` reflecting the new hierarchy (Country → City → Venue → Show).

## What we should *not* copy

- Neventum is a neutral directory monetised by listings; we are a vendor. Every hub keeps a clear commercial spine ("we build and rent the booth for this show") rather than pure listings.
- Multilingual duplication — not worth it for a North American service business.
- Auto-generating thousands of empty combination pages; we cap combos to ones with real content behind them.

## Technical notes

- Extend `src/data/shows.ts` with `startDate`, `endDate`, `editionYear`, `sectorSlugs`; add a derived helper module for date sorting and grouping.
- New routes: `trade-show-calendar.index.tsx`, `trade-show-calendar.$year.tsx`, `trade-show-calendar.$year.$month.tsx`, `trade-shows.$slug.tsx` (city/industry/country hub resolved from one slug map), `trade-shows.$industry.$city.tsx`.
- New shared component `RelatedDirectoryLinks.tsx` used by show/city/venue/industry pages.
- Register every new URL in `src/routes/sitemap[.]xml.ts`, `src/lib/search-index.ts`, and the footer/nav in `src/lib/site.ts`.
- Site stays `noindex` until launch; canonical handling continues through `src/lib/seo.ts`.

## Suggested sequence

1. Show dataset schema change + dates on existing 62 shows.
2. Calendar routes and `Event` schema.
3. City / industry / country hub routes + related-links component.
4. Show dataset expansion to ~250–300.
5. Selective industry×city combo pages.
