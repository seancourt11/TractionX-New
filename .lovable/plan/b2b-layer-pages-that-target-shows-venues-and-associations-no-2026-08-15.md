# B2B layer: pages that target shows, venues and associations (not exhibitors)

## The gap you're describing is real

Right now almost every SEO page is written for the exhibitor renting a booth. The only organizer-facing pages are `/preferred-vendor-program`, `/custom-trade-show-floor-plans`, the 35 venue floor plan guides and the platform comparison hub. There is no hub tying those together, no page for the specific things organizers and venues actually search, and the city/show/venue pages say nothing to the person who *runs* the show.

Organizer search intent is a completely different keyword set from exhibitor intent: "official show rental program", "exhibitor appointed contractor", "trade show exhibitor service kit", "convention centre preferred vendor", "association trade show partner", "booth package program for exhibitors". Low volume, very high value per lead — exactly what a B2B cluster is for.

## What to build

### 1. A partner hub: `/for-organizers`
One entry point for the non-exhibitor audience, segmented three ways (show organizers, convention centres and venues, associations and societies). Explains the four things we bring — official rental program, floor plan design and management, exhibitor service desk, rescue capacity — and links every B2B page below. Gets `#tldr` answer block, `Service` + `FAQPage` + `Speakable` schema, and a "book a 10-minute call" CTA rather than the exhibitor quote modal.

### 2. Four B2B service pages under the hub
- `/for-organizers/official-show-rental-program` — the branded exhibitor booth program: package tiers priced to your rate card, co-branded order page, deadline-aware ordering, revenue share. Targets "official show booth rental program", "exhibitor booth packages for shows".
- `/for-organizers/venue-exhibit-partner` — for convention centres: pre-approved designs that clear your hall's ceiling/rigging/fire rules, fewer compliance escalations on move-in, in-house-team support. Interlinks to all 35 venue floor plan guides.
- `/for-organizers/exhibitor-service-desk` — on-floor service desk during move-in and show days, service-kit content we write, escalation path. Targets "exhibitor service kit", "exhibitor appointed contractor".
- `/for-organizers/association-exhibitor-program` — for associations and societies: tiered member packages so a first-time member exhibitor doesn't have a bad first show and churn.

Each page: own `head()` metadata, breadcrumb, `Service` + `BreadcrumbList` + `FAQPage` schema, and a B2B CTA band (10-min call + email brief) instead of the booth quote modal.

### 3. Organizer band on the pages that already rank
A compact "Run this show or venue?" band added near the bottom of the show, venue and venue-floor-plan pages — one paragraph plus links to the hub and the relevant B2B page. Costs nothing in exhibitor conversion because it sits below the rental CTAs, and it catches the organizer who found us through an exhibitor query.

### 4. Wiring
Add a "Partners" / "For organizers" nav group in `src/lib/site.ts`, footer links, sitemap entries and search-index entries for all five new pages.

## What I'd deliberately not do

No programmatic per-city "trade show organizers in {city}" pages. Organizer intent isn't city-shaped at meaningful volume and it would be the thin-content pattern the March update punishes. The venue floor plan guides already carry the venue-specific B2B weight.

## Technical notes

- New: `src/routes/for-organizers.index.tsx`, `for-organizers.official-show-rental-program.tsx`, `for-organizers.venue-exhibit-partner.tsx`, `for-organizers.exhibitor-service-desk.tsx`, `for-organizers.association-exhibitor-program.tsx`, plus a shared `src/components/OrganizerCtaBand.tsx` and `src/components/OrganizerCrossLink.tsx`.
- Edited: `src/lib/site.ts`, `src/components/SiteFooter.tsx`, `src/lib/search-index.ts`, `src/routes/sitemap[.]xml.ts`, `src/routes/shows.$slug.tsx`, `src/routes/venues.$slug.tsx`, `src/routes/venue-floor-plans.$slug.tsx`, and `/preferred-vendor-program` (keeps its URL, becomes the application page the hub funnels into — no redirect, no lost equity).
- Copy reuses only claims already published on `/preferred-vendor-program` (no fee to the show, non-exclusive by default, works alongside the GC, 4–6 week program build, revenue share supported). Nothing new invented.
- Site stays `noindex` until the tractionx.ca launch, so this ranks only after that flip.
