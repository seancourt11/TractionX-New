# Social Library Visual Upgrade

## Goal
Turn the internal `/admin/social` library from a text-caption tool into a visual content engine. Every post keeps its real catalogue/venue/show link, but now ships with platform-sized visuals built from existing site assets, plus Traction X promise overlays on booth imagery.

## What we will build

### 1. Visual post formats
Add a `format` field to each social post so the admin UI knows how to render and export it:
- `photo` — single existing asset, cropped to each platform's aspect ratio.
- `carousel` — 2–5 existing assets stitched into a swipeable preview and exported as separate numbered files.
- `overlay` — single existing asset with a text headline overlay (still using site fonts/colours), useful for FAQ and timeline posts.
- `split` — two existing assets side-by-side, e.g. before/after or modular-vs-custom.
- `promise` — booth imagery with one or more Traction X Promise badges baked in (e.g. "Pre-built & photographed", "I&D always included", "No surprise line items").

### 2. Promise overlay system
Extend the visual generator so any booth-backed post can layer promise badges directly onto the image:
- Pull from the existing `PROMISES` data in `src/data/promises.ts`.
- Support 1–3 promise badges per image, placed in a clean corner or lower-third strip.
- Use the site's existing dark/light styling so overlays look native, not pasted.
- Default promise sets per theme: cost posts get "I&D always included" + "Fixed scope"; custom posts get "Pre-built & photographed" + "No surprise line items"; timeline posts get "On the floor with you".

### 3. Asset resolver expansion
Extend `src/lib/social.ts` so a post can resolve an image from more sources than just rental/portable catalogues:
- `boothSlug` → rental catalogue image.
- `productSlug` → portable product image.
- `gallerySlug` → gallery/portfolio image.
- `venueSlug` → venue hero image (`src/data/hero-images.ts`).
- `showSlug` → show hero image.
- `image` → explicit override.

Posts that reference a city/venue/show will automatically pull the same hero imagery used on the public page, giving the "venue/show page look" the user wants.

### 4. Platform-specific sizing
Generate two downloadable crops for every resolved image:
- **LinkedIn feed:** 1200 × 627 px (landscape).
- **Instagram:** 1080 × 1080 px (square) and 1080 × 1350 px (vertical) — user can pick which to download.

Because we are only using existing site assets, the implementation will be a lightweight HTML Canvas compositor in the browser: load the source asset, crop/letterbox to the target aspect, optionally paint the overlay headline and promise badges, and export as PNG.

### 5. Admin UI updates (`src/routes/admin.social.tsx`)
- Add a visual preview row to each post card showing the LinkedIn and Instagram crops.
- Add per-post download buttons: "Download LinkedIn", "Download Instagram square", "Download Instagram vertical", and "Download all".
- For carousel posts, show the sequence and export a ZIP of numbered PNGs.
- Add a `format` filter alongside the existing theme filter.
- Add a promise-badge toggle so the user can preview and export with or without promise overlays.
- Keep copy buttons, posted-state toggles, and CSV export as-is.

### 6. CSV export update
`postsToCsv` will include new columns:
- `format`
- `promises` (comma-separated promise IDs)
- `linkedin_image`
- `instagram_square_image`
- `instagram_vertical_image`
- `carousel_count`

### 7. Backfill the 60 existing posts
Re-tag the existing 60 posts with the most appropriate `format`, richer asset pointers, and default promise badges:
- Catalogue/portable posts → `photo` or `promise` with existing booth/product image.
- FAQ/timeline posts that benefit from a headline card → `overlay` with a gallery or venue hero image.
- Comparison posts (rent vs buy, modular vs custom) → `split`.
- City/venue posts → `photo` with the matching venue hero.
- Cost/pricing posts → `promise` format with "I&D always included" and "Fixed scope".

No new images will be generated; every visual comes from an existing asset already in `src/assets/`.

## Out of scope
- AI-generated imagery (user chose existing assets only).
- Video/Reels/animation exports.
- Scheduled publishing or social API posting.

## Success criteria
- `/admin/social` shows a visual preview for every post.
- Every post can download a LinkedIn-sized PNG and at least one Instagram-sized PNG.
- Booth-backed posts can carry promise badges baked into the exported image.
- City/venue posts use the same hero image as their public page.
- CSV export includes the new visual columns.
- Typecheck and build pass.
