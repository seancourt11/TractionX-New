# Social content engine — 60 posts, LinkedIn + Instagram

Right now the site has zero social content. Everything the posts need already exists in the
project: 299 rental booths with real photos and city lists, ~490 portable products, the pricing
tiers and estimator, the guides, glossary and exhibitor resources. So instead of writing 60
one-off captions, this builds a small library where each post is tied to a real page and a real
image — which is also what makes it useful for SEO, because every post drives a link back to a
specific booth, size, city or venue page.

## What gets built

**1. A post library (`/admin/social`)** — admin-only, noindex, same shell as the existing admin
pages. Shows all 60 posts as cards with:
- LinkedIn caption and Instagram caption side by side (different lengths and tone, same idea)
- Hashtag set, suggested image (real catalogue photo, shown inline), and the target link
- Filters by theme, size, city/venue, and platform; copy-to-clipboard on each caption
- "Mark posted" toggle so you can track what's gone out

**2. CSV export** — one click, download of all 60 rows (date, platform, caption, hashtags, image
path, link) in the column shape Buffer / Later / Hootsuite import.

**3. Content plan spread over ~12 weeks** — each post gets a suggested week and slot so the mix
stays balanced rather than five pricing posts in a row.

## The 60 posts

| Theme | Count | What they look like |
| --- | --- | --- |
| FAQ / objection | 10 | "What does a 10×20 booth actually cost?", "Rent or buy?", "What's I&D and why is it already in our price?" — each answers in the caption and links to the matching FAQ or pricing page |
| Timelines / deadlines | 6 | 16-week work-back, advance warehouse cut-offs, "booking 4 weeks out — here's what's still possible" |
| Cost / pricing | 8 | Tier-1 starting prices by size, what changes the number, city cost differences, links to the calculator |
| Rental catalogue showcase | 12 | A real booth photo + its size, what's in it, and the city it shipped to — links to the booth page |
| Portables | 8 | Real product photos: BC34 lightbox, banner stands, tabletop, tents — setup time, price from, use case |
| Custom fabrication | 6 | Millwork, double-decks, brand activations, before/after process |
| Resources / tools | 6 | Budget worksheet, deadline tracker, graphic specs, ROI calculator, glossary — the link-earning posts |
| Automated pricing / 3D design | 4 | Instant quote, free 3D design offer, booth plan analyzer, virtual meeting CTA |

Every post carries one of the two site CTAs (free 3D design, or the 10-min / 30-min meeting) so
social stays consistent with the site.

## City and venue tie-ins

Roughly a third of the posts get a location angle, pulled from real data we already hold — the
booth's actual `cities` list and the venue facts in `page-proof.ts`. So a 20×20 that shipped to
Las Vegas becomes "20×20 island, installed at Las Vegas Convention Center West Hall" and links to
that venue page. No invented locations: if a booth has no city on record, it runs as a
non-location post.

For SEO this matters less as ranking signal and more as link and brand-search fuel — repeated
"trade show booth rental + [city]" mentions with a link to a page that actually serves that city.

## Competitor and keyword check

Before writing captions, I'll run a quick pass on how the main exhibit-rental competitors post
(themes, cadence, formats that get engagement) and validate the FAQ/cost topics against Semrush
search demand, so the caption hooks use phrases people actually search. Findings summarized back
to you, not shipped as a page.

## Technical notes

- Content in `src/data/social-posts.ts`, typed `SocialPost` with `theme`, `week`, `linkedin`,
  `instagram`, `hashtags`, `image`, `href`, optional `city` / `venue`. Images reference existing
  `/rentals/*.jpg` and portable assets — no new image generation.
- Route `src/routes/admin.social.tsx` reusing the existing admin layout; CSV built client-side
  with a Blob download, matching the pattern already used in the admin document tools.
- Posted/not-posted state uses the existing local admin store, same as the pipeline board.
- Nothing public-facing changes; no sitemap or robots impact.

## Build order

Phase 1: competitor + keyword pass, data model, first 20 posts (FAQ, cost, timelines).
Phase 2: remaining 40 (catalogue, portables, custom, resources), admin page and filters.
Phase 3: CSV export and the 12-week calendar view.
