# Menu restructure — revised after four independent reviews

## The verdict

The instinct is right, the labels are not. Four reviews (technical SEO, AI search, conversion/UX, competitor research) landed on the same shape: **group by intent internally, but keep keyword-rich nouns at the top level.**

- **Technical SEO:** net gain — the single biggest win is pulling the 173 city/venue/show pages out of footer-only into the header. But every top-level label needs a keyword; "Learn" and "Where We Work" are dead weight to a crawler.
- **AI search:** neutral. Nav labels are not a retrieval signal. What earns citations is per-page schema, differentiated city content and clean Q&A heading blocks — not the menu.
- **Conversion/UX:** rent/buy at equal weight is a real risk. A $500 portable product sitting beside a $65K custom project pulls fast-scanning visitors down the cheap self-serve path and dilutes lead quality.
- **Competitors** (Skyline, Nimlok, Steelhead, Absolute Exhibits): none use Rent/Buy/Learn. All use product-type nouns — Custom Exhibits, Modular, Portable, Rental Exhibits — with Rental as its own top-level item. Search demand is built around "trade show booth rental [city]" and "custom exhibit design"; deviating from that costs us anchor-text match for no gain.

So: adopt the intent thinking, drop the intent words.

## Proposed top-level menu

```text
Custom Exhibits | Booth Rentals | Portable Displays | Locations & Shows | Services | Resources
```

"Request a Quote", "Start your 3D design" and "Book a meeting" stay as buttons to the right, so Contact does not need a nav slot.

High-ticket first, self-serve third. Each label is a phrase people actually search.

### Custom Exhibits
Custom trade show exhibits, design, fabrication, millwork, experience studio, gallery and case studies. Panel is organised by size tier (10×10, 10×20, 20×20, 20×30+) with a "Get my exact quote" action on each tier, plus entry points by industry — because buyers think "we have a 20×30 at CES", not "custom versus rental".

### Booth Rentals
Rental overview, the rental catalog, rentals by size, what's included, rental pricing, booth cost calculator, rent for a specific show. Kept as its own top-level item, matching every major competitor and the way the demand is phrased.

### Portable Displays
The portable hub plus the 16 categories (tension fabric, backlit lightboxes, pop-ups, banner stands, counters, hanging banners, tents, table covers and the rest). This panel is the one place instant/self-serve pricing is surfaced, because that path genuinely is self-serve. The 256 individual products stay on the hub with its existing filtering.

### Locations & Shows
Top cities plus a link to the full city index, venues, shows, and regions/global. This is the crawl-depth win — hub links, not a flat list of 173.

### Services
Unchanged: design, construction, project management, install and dismantle, shipping and logistics, AV rentals, custom floor plans, preferred vendor program.

### Resources
Exhibitor guides, comparisons, glossary, pricing guide, 2027 guide download, 2026 benchmark report, industries, sustainability, FAQs, blog. Named Resources rather than Learn — buyers in a considered B2B sale want proof, not lessons.

## Dropdown treatment

Two- or three-column mega panels with small section headings, rendered as real `<a>` links in the HTML (not JS-only flyouts) so the crawl benefit is real. Each panel ends with a CTA row. Mobile renders the same groups as accordions.

## Sequencing

Ship this now, while the site is still `noindex`. Do not stack it on top of the launch — the nav change, the redirect cutover and the `noindex` removal should not land in the same week, or we will not be able to attribute any ranking movement.

## What does not change

- No page is renamed, moved, deleted or redirected. URLs, the 1,500+ legacy redirects and the sitemap are untouched.
- Every child link keeps its current keyword-rich anchor text.
- Footer keeps the full city list and mirrors the same headings.

## Technical notes

- Structure lives in `NAV` in `src/lib/site.ts`; the child type gains an optional `group` label so panels can render section headings.
- `src/components/SiteHeader.tsx` renders grouped children in a multi-column panel; the mobile drawer renders the same groups as accordions.
- `src/components/SiteFooter.tsx` regroups under matching headings.
- Before finishing, diff old versus new `NAV` href sets to confirm no link was dropped.
