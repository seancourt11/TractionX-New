# Double-Deck (Two-Story) Exhibits — Authority Page

We don't have one today. Double decks only show up as passing mentions inside the booth planner options, pricing tiers, and a few venue permit notes. Every major competitor has a dedicated page for this, and the search terms behind it ("double deck trade show booth", "two story exhibit rental", "double decker booth cost") are high-intent and low-volume-but-valuable — the people typing them are running six-figure programs.

## What gets built

One long-form authority page at `/double-deck-trade-show-booths`, in the same style as the rebuilt booth-size pages.

**Positioning:** we both rent and build double decks. Quote-only — no dollar figures on the page. Every price question routes to the instant quote modal or a virtual meeting.

## Page structure

1. **Hero** — "Double-deck and two-story trade show exhibits, rented or built." Rent/Buy chips instead of price chips. Primary CTA: instant quote modal. Secondary: start your 3D design.
2. **Short-answer block (`#tldr`)** — an extractable paragraph defining a double deck, the minimum footprint it needs (20×20 practical floor, 20×30+ typical), what the second level is actually used for, and that we rent and build. Wired to Speakable schema for AI answers.
3. **Planner's brief spec table** — minimum footprint, typical deck sq ft, height envelope, occupancy load, stair vs. lift, weight and point-load, permit lead time, what's in our price vs. what the show contractor bills.
4. **Why exhibitors go vertical** — the real cases: floor space cost per sq ft vs. deck cost, private meetings above the noise, hospitality/VIP, sponsor visibility across the hall. Honest counter-case for when a bigger single-level island is the better buy.
5. **What fits upstairs** — deck configurations: closed meeting room, open lounge, presentation overlook, staff/storage. Includes seating counts and what each does to occupancy and stair placement.
6. **Engineering, permits and approvals** — the differentiator section. Stamped structural drawings, engineer of record, venue technical services review, fire-marshal occupancy sign-off, egress and stair-width rules, ADA/lift considerations, sprinkler rules under the deck. This is what people actually search for and what nobody explains well.
7. **Venue reality check** — which venue types allow them, ceiling-height limits, and the fact that some halls or specific halls within a venue prohibit them. Links to our existing venue pages.
8. **Rent vs. build a double deck** — the rental path (reconfigured structure, cheapest way to test vertical), the build path (owned asset, repeat shows), and the honest threshold between them.
9. **Countdown to show open** — a double-deck-specific timeline (longer than standard: permit submission and engineering milestones added), reusing the countdown component pattern.
10. **Proof** — case-study band plus a testimonial, same component as the size pages.
11. **FAQ** — 8–10 double-deck-specific questions with FAQPage schema: how much does one cost (answered as "it depends, here's what drives it" + CTA), how long to permit, can you rent one, minimum size, do you need an engineer, can the deck be enclosed, what does the venue charge extra for.
12. **Quote form + promise strip + CTA bands** — same conversion furniture as every other page.

## Wiring

- Nav: added under **Custom exhibits** in `src/lib/site.ts` (all three nav groups where custom exhibits appear).
- Sitemap: added to `src/routes/sitemap[.]xml.ts`.
- Internal links in: `/custom-exhibits`, the 20×20 and larger booth-size pages, `/pricing` tiers where double decks are mentioned, and the booth planner's "Double deck" option result.
- Existing scattered double-deck mentions across city/venue pages get linked to this page rather than left as dead text.

## Technical notes

- New route `src/routes/double-deck-trade-show-booths.tsx`, long-form content in `src/data/double-deck.ts` so the route file stays a thin renderer.
- Reuses `PageLayout`, `Section`, `FAQBlock`, `CaseProof`, `QuoteForm`, `DesignCtaBand`, promise components — no new design system work.
- Head: unique title/description/og, canonical, `noindex` inherited from the current pre-launch setting in `src/lib/seo.ts`.
- Schema: `Service` + `FAQPage` + `WebPage` with Speakable, matching the pattern on the booth-size pages.
- No pricing data added anywhere; the cost question is answered with cost drivers and a CTA.
