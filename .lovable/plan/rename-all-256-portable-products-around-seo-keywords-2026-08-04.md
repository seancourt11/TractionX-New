# Rename all 256 portable products around SEO keywords

Today the catalog still carries invented house-brand names (Sego, QSeg, Vector, Modco, Aperture, Summit, Reflexion…). Those words have zero search demand — nobody types "Sego 10 Backwall". The names should read the way a buyer actually searches: plain, everyday language like "10ft portable booth back wall with LED lighting" or "portable 10ft lightweight back wall" — not industry jargon like SEG, silicone-edge or chroma key.

You review the draft names before anything is written into the site.

## Do we need unique identifiers? No — but every name must still be unique

A model code or SKU-style identifier (e.g. "TX-PB-1021") gives uniqueness but **zero search value** — nobody searches a code, and AI search can't match a code to a buyer question. So we do not add codes.

But 256 pages with near-identical names would cause duplicate title tags, keyword cannibalization, and exactly the "templated / scaled-content" pattern Google's March 2025 update penalizes. So each name **must** stay unique.

We resolve this with **searchable feature modifiers** instead of identifiers. Size, shape, lighting, configuration and portability are things people actually include in a query ("10ft backlit back wall", "double-sided banner stand", "curved pop up display"), so using them as the differentiator delivers uniqueness *and* search value at the same time. This also helps AI search — a page titled "10ft Portable Booth Back Wall with LED Lighting" is a near-exact match when a buyer asks an AI "what's a good 10ft portable booth with lighting?"

## Naming formula

`[size] + [plain-language product] + [searchable feature modifier]`, max ~60 characters.

## What's a searchable modifier vs jargon

**Keep** (real search terms — use freely): backlit, LED, illuminated, lit up, curved, straight, double-sided, lightweight, portable, pop up, retractable, with counter, with shelving, outdoor, with carrying case, tool-free, adjustable, freestanding, wall-mounted, table-top.

**Ban from names** (trade jargon — belongs in spec bullets only): SEG, silicone-edge, dye-sublimation, chroma key, cassette, extrusion, aluminium framing, roto-moulded, LTL, OEM.

## Examples of the direction

| Current | Proposed |
| --- | --- |
| Vector 10 Curved SEG Backwall Package | 10ft Curved Portable Booth Back Wall with LED Lighting |
| Vector 10 Straight Backwall Package | 10ft Straight Portable Back Wall Display Kit |
| Modco 10 Retail Shelf Package | 10x10 Portable Booth with Shelving and Counter |
| Sego Backlit Tower 8ft | 8ft Backlit Display Tower for Trade Shows |
| QSeg Double-Sided Lightbox 10ft | 10ft Double-Sided Backlit Display Wall |
| Teardrop Flag Large | Large Outdoor Teardrop Flag with Ground Stake |

Rules applied to every item:
- No invented brand words, and no trade jargon in the name (SEG, silicone-edge, dye-sub, chroma key stay in the spec bullets where they belong).
- Broad, high-level search terms first — "portable booth", "portable display", "back wall", "banner stand", "pop up display", "printed tent", "table cover", "backdrop" — with size and one searchable modifier (lightweight, LED lighting, backlit, with counter, double-sided, curved, outdoor) doing the separating.
- When two items would still collide after the modifier, a plain tier word (Deluxe, Pro, Plus) breaks the tie — still human language, never a code.
- Each of the 256 names stays unique, and unique within its category so the category pages don't read as duplicates.


## Data refreshed alongside the names

For every product: `slug` regenerated from the new name, `blurb` rewritten to open with the keyword and stay unique (no shared sentences across items), `bestFor` and `specs` tightened so they match the new name. Prices, sizes and setup times stay as they are.

## URL safety

Slugs change, so `/portable-displays/{category}/{old-slug}` would 404. An alias map from every old slug to its new one gets added to the product route, resolving old URLs to the new page (and to the legacy redirect data used elsewhere on the site), so nothing already published breaks.

## Draft-first workflow

1. Generate all 256 new names + slugs into a review file (`.lovable/portable-names-draft.md`) as a category-by-category table: old name → new name → new slug.
2. You review, flag anything to change.
3. Only after your OK do I rewrite `src/data/portable-products.ts`, regenerate the blurbs, add the slug aliases, and verify the catalog, category and product pages render with the new names and images intact.

## Technical notes

- Files touched on apply: `src/data/portable-products.ts` (names, slugs, blurbs), `src/data/portable-images.ts` (image map keys re-pointed to new slugs), `src/routes/portable-displays.$category.$slug.tsx` (old-slug alias resolution), sitemap picks up new slugs automatically.
- Image files themselves are untouched; only the slug keys pointing at them change.
