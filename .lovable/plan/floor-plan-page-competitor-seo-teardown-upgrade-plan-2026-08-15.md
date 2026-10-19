# Floor Plan Page: Competitor SEO Teardown + Upgrade Plan

## What the research found

Sources: Semrush (US database, live data) for expofp.com and mapyourshow.com, plus a read of ExpoFP, Map Your Show, EXPOCAD and A2Z Events pages.

**1. Nobody wins this category on the "software" page.**
ExpoFP gets an estimated 19,000 organic visits/month from ~32,000 keywords — and almost none of it lands on their product page. Their top pages are *venue* pages and *show* pages:

| Keyword | Vol/mo | Their page |
|---|---|---|
| mccormick place exhibition hall | 27,100 | /mccormick-place |
| las vegas convention center | 60,500 | /las-vegas-convention-center |
| pax unplugged | 8,100 | /pennsylvania-convention-center/pax-unplugged-2024 |
| nra show 2026 | 4,400 | /mccormick-place/national-restaurant-association-show-2026 |

Map Your Show (est. 14,500 visits/mo) does the same thing with live show instances: "modex 2026", "namm 2026 map", "sema 2025 floor plan", "md&m west 2026 exhibitor list".

The pattern is: **venue page → show page → floor plan / exhibitor list / show map.** Attendees and exhibitors search for the *map of a specific hall or show*, land on the vendor's page, and organizers see the product in action. We already have city, venue and show pages — we are one content layer away from competing here.

**2. The head term is soft.** "trade show floor plan software" has a keyword difficulty of only 21/100 (easy). The top 10 includes Quora, YouTube and a listicle farm. This is winnable with one strong page.

**3. ExpoFP's second engine is a comparison hub.** 18 "ExpoFP vs X" pages plus an "alternatives" hub, each with published pricing ($149/mo), a free plan, a 7-day trial, a "quick verdict" and a "last verified" date. They rank for every competitor's brand name.

**4. Every competitor publishes pricing and a demo path.** We currently publish neither on this page in a scannable form, and the page still carries stale claims (7-day free trial, self-serve tiers) that read like software marketing rather than the managed service we actually sell.

## What to change

### A. Rebuild the money page around the real search intent
Rewrite `/custom-trade-show-floor-plans` so it targets the cluster, not one phrase:
- H1 and intro built on "interactive trade show floor plan software and management" with natural coverage of: event floor plan software, booth sales, exhibitor directory, attendee wayfinding, convention floor plan design, expo map.
- Add a scannable **answer block** at the top (what it is, who it's for, what it costs, how fast it goes live) so AI search and featured snippets have a clean target.
- Add a **published price band** — a starting monthly/per-show figure and what changes it — matching the market's transparency, with the "exact quote" CTA we use elsewhere.
- Add a **comparison table** of our managed program vs DIY software vs GSC-provided plans.
- Fix stale/unverifiable copy: remove the "7-day free trial, no credit card" and self-serve pricing language unless that is a real offer; replace with a demo + pilot-plan offer.

### B. Build the programmatic layer (the actual traffic engine)
This is the highest-leverage item and reuses data we already maintain:
- **Venue floor plan pages**: for each venue we already publish, a `/venues/{venue}/floor-plan` section or page covering hall names, square footage, ceiling heights, dock/rigging notes, aisle and booth-numbering conventions, and a downloadable/embeddable plan reference.
- **Show floor plan pages**: for each show we publish, a "{Show} {year} floor plan and exhibitor map" block covering hall assignment, booth numbering, move-in/move-out, and what exhibitors need from the plan.
- Interlink: show page ↔ venue floor plan ↔ the floor plan service page ↔ the rental catalogue.
- Each page gets its own `head()` metadata, breadcrumb and `Place`/`Event` schema. No duplicated boilerplate between venues — each needs its own real facts.

### C. Add a comparison / alternatives hub
Mirroring the tactic that works for ExpoFP, but honestly and from a service-provider angle:
- `/floor-plan-software-comparison` hub, plus individual pages for the platforms organizers actually shortlist (ExpoFP, Map Your Show, EXPOCAD, A2Z Events, Cvent, MapD).
- Each page: what the platform is best at, where a managed partner adds value, and who should pick which. We position as the team that runs the plan on whichever platform they choose — not as a fake head-to-head.
- Include a "last verified" date stamp on each page.

### D. Trust and proof on the page
- Named organizer/venue proof (shows we have laid out, square footage managed, booths sold) pulled from our existing testimonials data — no invented numbers.
- A visible process timeline with the same turnaround language used site-wide.
- FAQ expanded with the questions the SERP actually shows (cost, CAD conversion, integrations, show-day updates, who owns the data).

### E. Technical SEO
- Keep one canonical URL for the service page; add `HowTo`, `Service`, `FAQPage`, `BreadcrumbList` and `Speakable` schema.
- Drop the `keywords` meta tag (no ranking value).
- Register every new page in the sitemap, footer and site search index.
- Note: the site is still `noindex` until the tractionx.ca launch, so none of this ranks until that flip.

## Suggested order

1. Rewrite the floor plan service page (A) — one page, immediate.
2. Venue floor plan layer (B, venues first) — biggest traffic upside.
3. Show floor plan layer (B, shows) — refreshed annually.
4. Comparison hub (C).
5. Proof + schema pass (D, E).

## Technical notes

- New/edited files: `src/routes/custom-trade-show-floor-plans.tsx`, `src/routes/venues.$slug.tsx` (or new `venues.$slug.floor-plan.tsx`), `src/routes/shows.$slug.tsx`, new `src/routes/floor-plan-software-comparison.tsx` + `src/routes/floor-plan-software-comparison.$slug.tsx`, `src/data/` additions for per-venue hall specs and per-platform comparison data, plus `src/lib/site.ts` nav, `src/components/SiteFooter.tsx`, `src/lib/search-index.ts` and `src/routes/sitemap[.]xml.ts`.
- Per-venue hall facts must be researched and unique per venue; generic filler would trigger the same thin-content problem the March update punishes.
- Pricing figures on the page need your sign-off before they go in.

## Questions before build

- Is there a real floor plan price we can publish (e.g. "from $X per show"), or do you want a range-only band with a quote CTA?
- Is the 7-day free trial / self-serve tier real, or should that come out?
- Should the comparison pages name competitors directly, or stay generic ("DIY floor plan platforms")?
