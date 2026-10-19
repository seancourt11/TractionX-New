# Homepage on-page SEO keyword expansion

## Diagnosis

The homepage reads well but under-targets the industry's highest-volume search terms:

**What's missing or under-used:**
- "trade show booth" — the #1 term in the industry — never appears as an exact phrase in headings
- "trade show booth rental" / "booth rental" — appears once in body copy only
- "exhibit design" / "exhibit design company" / "exhibit house" — absent
- "booth builder" / "trade show booth builders" — absent
- "modular exhibits", "custom trade show displays", "trade show display company", "convention booth", "expo booth" — absent
- Booth-size terms ("10x10 booth", "10x20", "20x20 island") only appear in the self-triage cards, not in indexable prose
- H2s are branded slogans ("Recent projects.", "One production partner...") — none carry a keyword
- FAQ section exists but questions are logistical ("Where can you deliver?"), not the buying-intent queries Google surfaces ("how much does a trade show booth cost", "rent vs buy")
- Image alts are generic ("Custom trade show exhibit on the show floor")

**What's already good:** title tag, meta description, short-answer block, JSON-LD, city-adaptive footer, internal links to product pages.

## Changes (all in `src/routes/index.tsx`)

1. **H1 + hero subcopy** — work "trade show booth design, rentals & custom exhibits" into the H1 or the eyebrow line directly above it so the exact head term sits in the highest-weight position. Keep the current visual hierarchy.

2. **Keyword-bearing H2s** — rewrite section H2s to carry terms while keeping the voice:
   - "Recent projects" → "Recent custom exhibits & booth rentals"
   - "One production partner..." → "A trade show exhibit company that handles everything"
   - Process heading → "From booth design to install and dismantle"
   - Finder heading → "Find your trade show booth rental"

3. **New "Exhibit sizes & services" prose section** (~150 words) — a compact block naming 10×10 inline booths, 10×20s, 20×20 island exhibits, double-deck exhibits, modular exhibits, portable displays, and custom fabrication, each phrase linking to its existing page. Adds indexable keyword prose plus internal links with descriptive anchors.

4. **Expanded keyword FAQ** — add 4–5 buying-intent questions to the existing FAQ (and its FAQPage JSON-LD if present):
   - "How much does a trade show booth cost?"
   - "Should I rent or buy a trade show booth?"
   - "How much does a 10x10 booth rental cost?"
   - "What is a trade show exhibit company / what does an exhibit house do?"
   - Answers reuse the real pricing already on the site ($16,250+ 10×10 rental, $12,500 custom 10×10) — no invented numbers.

5. **Image alt text** — descriptive, varied alts on offering and project images (e.g. "20x20 custom island exhibit with hanging sign", "modular booth rental for a 10x20 footprint"). No keyword stuffing — one natural phrase each.

6. **Meta description / title** — minor tune only if length allows; current tags are already solid.

## What this does NOT do
- No keyword stuffing, no hidden text, no city-name dumping on the homepage (the geo pages own that).
- No changes to design, layout, or CTAs beyond the one new text section.
- Site stays noindex until launch — this prepares the copy for when indexing turns on.

## Technical details
- Single file edit: `src/routes/index.tsx` (copy/constants only).
- FAQ JSON-LD already generated from the FAQ array — new questions flow into schema automatically.
- Verify: tsc passes, homepage renders, view-source check that new phrases appear in rendered HTML (SSR).
