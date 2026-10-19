# What Pure Exhibits does well, and what we should copy

I re-read their 20x40 rental page, their homepage link graph and their process content. Their SEO edge is not backlinks or volume of pages — it's that each **booth-size page is a full destination**: filterable inventory, a spec table, a dated countdown, named case studies and ~1,500 words of genuinely specific copy. Our size pages are the thinnest high-intent pages we own (229 lines, four generic FAQs, no long-form). That's the gap.

## Fix first: a contradiction

Our booth-size FAQ still says shipping and I&D are "quoted as separate lines," which directly contradicts the promise we just published ("Install and dismantle included"). Rewrite that FAQ everywhere it appears: I&D included; drayage, electrical and rigging billed by the venue.

## 1. Rebuild the booth-size template (biggest win)

Each `/booth-size/{size}` page gains, in this order:

- **Inventory count in the hero** — "214 of our 20×20 designs" pulled live from the rental data, the way Pure leads with "215 products found."
- **Planner's Brief spec table** — footprint, staffing plan, comfortable concurrent capacity, what fits (demo stations, meeting rooms, theatre, hospitality), overhead/rigging note, and an explicit "in the price" line. This is the block AI answers extract verbatim, and we can state it truthfully per size.
- **Countdown to show day** — T−12 weeks through show close, mapped to our real process (brief, 3D approval, fabrication, graphics due, pre-build photo approval, freight, supervised install, dismantle). Ties straight to the new promise page.
- **Long-form body, ~1,200–1,600 words per size**: who chooses this footprint (named industries, linked to our industry pages), what fits in the square footage, layout strategies, rent vs. buy at this size, and what drives cost up or down. Written per size, not templated filler.
- **"Built at this scale"** — two or three real projects from our case-study data with the show named, linking to the case study.
- **Location + budget filter** on the catalogue block, matching the size/city/budget triage Pure runs.
- **Short-answer block** (`#tldr`) and Speakable schema, as on our city pages.

## 2. Size × city pages

Pure runs size pages and city pages separately. We already have 139 city pages and the rental data is city-aware, so we can go one level deeper: `/booth-size/{size}/{city}` for the top ~20 show cities — same spec table, city-specific venue, drayage and labour notes from our existing proof data, and the catalogue pre-filtered. Roughly 200 high-intent pages nobody in the category holds.

## 3. Save-a-booth library

Their "+ My Gallery" / My Booth Library lets a visitor collect designs and then submit the shortlist. It's the softest possible conversion and it captures intent we currently lose. Add a save control to every catalogue tile and gallery image, a `/my-booth-library` page, and one email field to send the shortlist — routed through the existing lead seam.

## 4. Per-service pages with proof

They split services into eight separate URLs including **warehouse pre-build**, which is their differentiator page. We have services pages but no pre-build page — and it's now promise #1. Add `/services/warehouse-pre-build` with the photo-approval process, and cross-link it from every size page and the promise page.

## 5. Named-client case studies as standalone URLs

Pure gives each client its own URL (`/teramind`, `/appdome`) with the show named in the title. Ours live under `/case-studies/{slug}`, which is fine — what's missing is the **show and venue named in the title and H1**, and reciprocal links from the matching show, venue and industry pages.

## 6. Copy patterns worth stealing

- A stat bar of hard numbers near the top of commercial pages (projects, cities, install turnaround, pre-build rate) — ours exist, they're just not on the money pages.
- Concrete named shows inside body copy (RSA, HIMSS, Money 20/20), each an internal link to our show page. Pure does this constantly and it's why their pages rank for show-plus-size queries.
- A one-line objection handler under every CTA ("No obligation," "No stress, no surprises"). We now have the promise strip doing this — extend it to the size and catalogue pages.

## Suggested order

1. Fix the I&D contradiction + rebuild the booth-size template (items 1 and 6).
2. Warehouse pre-build service page + case-study titling and cross-links (items 4 and 5).
3. Save-a-booth library (item 3).
4. Size × city expansion (item 2).

## Technical notes

- All of this is frontend and data-file work; no backend. Long-form size copy goes in `src/data/booth-sizes.ts` as structured fields (spec, timeline, sections) so the template stays one file.
- Inventory counts come from `src/data/rental-booths.ts` at render time — no hardcoded numbers that can drift.
- Size × city routes generate from the existing city and proof data and get added to `sitemap.xml`; each needs a unique canonical and genuinely city-specific content, or they're doorway pages.
- The booth library persists in `localStorage` and submits through `submitLead()`.
