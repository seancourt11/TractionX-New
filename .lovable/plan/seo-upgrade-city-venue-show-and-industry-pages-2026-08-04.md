# SEO Upgrade: City, Venue, Show and Industry Pages

## The situation

The March 2026 core + spam updates (rolled out together, in under 20 hours) targeted one thing above all: **scaled content abuse** — large sets of pages built from a template where only the entity name changes. Alongside it Google pushed an "information gain" filter that rewards pages containing something no other page has, and heavier E-E-A-T weighting.

That is exactly the shape of our biggest page clusters. Right now:

- Venue and show long-form content is machine-assembled from shared sentence templates (`venues-longform.ts`, `shows-longform.ts`). Every venue page repeats the same paragraph about docks, marshalling yards, advance-order electrical and rigging approvals, with only the venue name swapped.
- City page FAQs are the same six questions with the city name substituted — and each one emits `FAQPage` schema, which means dozens of pages publishing near-identical structured data.
- The same three price points ($12,500 / $17,500 / $30,000) appear verbatim in the TL;DR of every city, venue and show page.
- Industry pages follow a fixed field layout (intro, audience, priorities, design notes, compliance, shows, budget) across all 24.

None of this is live damage yet — the site is `noindex` + `Disallow: /`. That is a real advantage: we can fix it before Google ever forms an opinion, rather than recovering from a hit.

## What actually moves the needle

### 1. Give every page one thing only it can say (information gain)

For each cluster, add **optional** "unique proof" fields. Nothing is required — if we don't have the detail for a given venue, show or industry yet, that section simply doesn't render and the page still looks complete. No empty headings, no placeholder text, no invented facts.

- **Venue pages** — real specifics where we have them: dock counts and clearances, ceiling heights per hall, hanging-point grids, the GC's advance-order deadline, column locations. Plus a first-hand Traction X note per venue where we have one ("on the west hall the freight elevator queue backs up after 10am on move-in day two").
- **Show pages** — last edition's attendance/exhibitor count with the year cited, booth-space open and close dates, kit release date, and one thing we learned exhibiting there.
- **City pages** — hotel/labour cost reality, drayage rates observed, local fabrication or storage partner, drive times from our closest warehouse.
- **Industry pages** — an anonymised project outcome, the compliance artefact that industry asks for, the real objection buyers in that vertical raise.

Same for photography: real project photos from a given venue or show render when we have them, and the section is skipped when we don't rather than falling back to generic stock.

Goal (not a gate): every page eventually carries at least three facts that appear on no other page. We fill these in over time as material becomes available.


### 2. Kill the duplicate FAQ schema

Replace the city-wide boilerplate FAQ generator with per-city questions drawn from that market's real friction (union locals by name, specific venue rules, seasonal freight issues). Where a question genuinely is generic, answer it once on a hub page and link to it instead of restating it 30 times with `FAQPage` markup.

### 3. Fix the technical inconsistencies found in the code

- City pages emit **relative** `canonical` and `og:url` (`/city/...`) while venue pages emit absolute URLs. Standardise on absolute via `SITE.url`.
- City pages have **no** `og:image` / `twitter:image`; venue pages do. Add hero images to the city cluster.
- City pages carry a **route-level** `noindex, nofollow` on top of the sitewide one. That must be removed at launch or the whole city cluster stays invisible — easy to miss because the sitewide flag masks it.
- Add `Speakable`, `HowTo` and comparison-table patterns (already proven on the Las Vegas page) to the rest of the city cluster.

### 4. Build real entity relationships instead of flat cross-links

Google evaluates city/venue/show pages as an entity graph. Wire them so each node reinforces the others: city → its venues → the shows at those venues → the industries those shows serve → back to the city. Every link should carry descriptive anchor text about the destination, not "learn more". Add `BreadcrumbList` consistently and cross-reference `sameAs` for venues and shows pointing at their official sites and Wikipedia entries — this anchors us to known entities.

### 5. Prune before you publish

Some pages will never have enough unique material to justify existing. It is better to launch 40 strong pages than 120 templated ones. Audit each cluster and either enrich, merge into a parent, or drop with a redirect. The March update punished breadth-without-depth specifically.

### 6. E-E-A-T signals the templates cannot fake

Where available: a named project manager for that market, real project photography from that venue/show (never stock stand-ins), a "last reviewed" date, and specific counts ("11 projects at this venue since 2022") only where true. Each of these renders only when supplied — a page missing all of them still reads as finished.


## Suggested sequencing

1. Technical fixes (canonical, og:image, the hidden city `noindex`) — small, safe, immediate.
2. Entity-graph interlinking and schema consolidation.
3. De-templating pass: venues first (highest commercial intent), then shows, cities, industries.
4. Prune/merge audit, then remove the sitewide `noindex` at launch.

## What I need from you

The de-templating work is only as good as the real information behind it — but nothing is blocked on it. I'll build the optional slots and fill what I can research; you can drop in dock quirks, labour experiences, deadlines and project photos whenever you have them, show by show.

## Technical notes

- Content sources: `src/data/venues-longform.ts`, `src/data/shows-longform.ts`, `src/data/cities.ts` (inline `buildFAQs`), `src/data/industry-pages.ts`.
- Route heads: `src/routes/city.$slug.tsx`, `venues.$slug.tsx`, `shows.$slug.tsx`, `industries.$slug.tsx`.
- Add per-entity **optional** `uniqueProof` / `firstHand` fields to each data type; components conditionally render and skip the section entirely when the field is absent.
- Keep the existing override maps (`VENUE_OVERRIDES`, `SHOW_OVERRIDES`) as the mechanism — expand coverage rather than replacing the pattern.

