# Trade Show Exhibit Rental Company Comparison Page

A buyer-facing page that names the major exhibit rental providers, gives an honest read on each one's strengths and weaknesses, and positions Traction X where it genuinely wins. This is the page that captures searches like "GES vs Freeman", "best trade show booth rental companies", "Freeman booth rental alternatives" — high-intent terms nobody on our site currently targets.

## Where it lives

New route at `/compare/trade-show-exhibit-rental-companies`, listed on the `/compare` hub alongside the existing rent-vs-buy and custom-vs-modular pages. Because it compares many vendors rather than two options, it does not fit the existing A-vs-B `Comparison` shape — it gets its own data file and page component.

## Who is covered

Six provider profiles plus Traction X:

- **Freeman** — the general-service contractor giant
- **GES (Viad)** — the other GSC giant
- **Czarnowski** — large national exhibit house
- **Skyline Exhibits** — franchise/dealer network, portable to modular
- **Nimlok / Orbus** — modular systems through dealers
- **Local/regional exhibit houses** — the category, not a named firm
- **Traction X** — how we differ

Each profile is written as a fair assessment: what they're genuinely good at, where exhibitors commonly get frustrated, and who they are the right fit for. No invented pricing for competitors, no claims we can't stand behind — general, defensible observations only (scale, service model, ownership of official-contractor status, dealer structure, customisation ceiling, responsiveness).

## Page structure

1. **Hero** — "Trade show exhibit rental companies compared" with a one-line honest framing: there is no single best exhibit partner, there's the right one for your show, footprint and service level.
2. **TL;DR block** — three-sentence answer for AI overviews and featured snippets: when a GSC makes sense, when a national exhibit house makes sense, when a specialist custom-rental partner makes sense.
3. **At-a-glance comparison table** — rows for service model, custom fabrication depth, rental catalogue, footprint sweet spot, official-contractor advantages, design turnaround, best fit. Horizontally scrollable on mobile.
4. **Provider profiles** — one card per company: what they do well (3-4 bullets), common trade-offs (3-4 bullets), best for (one line).
5. **How to actually choose** — a short decision framework: footprint, number of shows, how custom the build needs to be, whether you need official-contractor services bundled, and who owns the design.
6. **Questions to ask any exhibit partner** — a checklist of 8-10 procurement questions (who owns the drawings, what's included vs billed by the venue, install and dismantle labour, rush policy, refurbishment between shows).
7. **Where Traction X fits** — honest positioning: 100% custom rentals, design-to-budget with tiered and à la carte pricing, I&D included, complimentary 3D design, direct access to the people building the booth. Explicitly says when a GSC is the better call.
8. **FAQ** — 6-8 questions ("Is Freeman or GES cheaper?", "Do I have to use the official contractor?", "What's the difference between a GSC and an exhibit house?", "Can I use my own exhibit house at a Freeman show?").
9. **CTAs** — the complimentary 3D design offer and the two-length virtual meeting, plus cross-links to the cost calculator, booth planner and rental catalogue.

## SEO

- Unique title/description, canonical, og/twitter tags.
- `FAQPage` JSON-LD from the FAQ block, plus `ItemList` for the provider set and `BreadcrumbList`.
- Internal links to `/booth-cost-calculator`, `/build-your-booth-plan`, `/rent-a-booth`, `/compare` and the pricing hub.
- Crawlable comparison content in real HTML tables and prose, not images.
- Added to the sitemap and to the `/compare` hub grid.

## Technical notes

- New `src/data/exhibit-companies.ts` — provider records (name, category, model, strengths, trade-offs, best-for) plus the table rows, FAQs and checklist. Pure data.
- New `src/routes/compare.trade-show-exhibit-rental-companies.tsx` using `PageLayout`, `PageHero`, `Section`, `CTABand`, `FaqAccordion` and `DesignCtaBand`, matching the existing compare pages' dark styling.
- `/compare` hub updated to include the new page as a distinct card; sitemap route updated.
- No backend changes.
