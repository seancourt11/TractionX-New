# Conversion Overhaul

A full pass across every page type. Lead routing stays as-is (forms keep saving locally through `submitLead()`), and GA4 event tracking gets installed so we can see which CTAs actually earn the lead.

One thing worth flagging first: right now a submitted form only lands in the visitor's browser and the console. Nothing reaches your inbox. Every change below improves the *rate* of people who fill a form, but until delivery is wired up, no conversion actually reaches you. Happy to leave it for this pass — just don't launch on the live domain without it.

## 1. Measurement first (so the rest is provable)

- Install GA4 via the root route, loaded after hydration so it doesn't slow first paint.
- One thin `track()` helper wraps every conversion moment: quote modal opened, each step completed, quote submitted, 3D design submitted, meeting booked (10-min vs 30-min), pricing guide unlocked, calculator unlocked, phone tap, gallery shortlist, exit-intent shown/converted.
- Every event carries the existing `source` string, so you can see "home-hero" vs "mobile-bar" vs "city-las-vegas" side by side.
- Add funnel step events inside the multi-step quote modal to expose exactly where people abandon.

## 2. Response promise and instant gratification

The single largest B2B drop-off is uncertainty about what happens next.

- A standing "We reply within one business day — concept direction in two" line directly beneath every submit button, not buried in a contact page paragraph.
- Success screens change from a generic thank-you into a next step: book the 10-minute call right there, download the pricing guide, or view matching booths. Currently a submitted form is a dead end.
- Add a visible "what happens next" 3-step strip (brief → concept + budget → build) on the quote modal's final screen.

## 3. Form friction pass

- Show a step counter and "about 2 minutes" estimate at the top of the quote modal, and a progress bar between steps.
- Reorder every multi-step form to ask the easy, low-commitment fields first (city, show, footprint, budget chips) and contact details last.
- Make phone optional everywhere it isn't already, and label it as optional — required phone fields cost B2B form completions.
- Rewrite validation messages to be specific and non-blaming.
- Persist partial form state so a closed modal reopens where it left off, and so exit-intent can offer "save my quote".

## 4. Proof next to the ask, not in its own section

- Pull one short attributed quote into the hero area, the quote modal's first step, and the rental catalog sidebar.
- Client-name specificity line ("L3, Thales, Air Canada, TELUS, Meta — 700+ builds") replacing plain logo text wherever it appears.
- Case-study proof card on industry, show, venue and city pages, adjacent to that page's CTA.
- Testimonials on the homepage move up, above the fold-and-a-half rather than near the footer.

## 5. Page-type conversion work

**Homepage** — one primary CTA already exists; tighten the trust strip beneath it (response time, I&D included, 15+ years, 6 continents) and cut any redundant third CTA band.

**City / show / venue pages** — each gets a locally-worded CTA band ("Exhibiting at {show}? We're already shipping there"), the show's booking deadline as urgency, and a prefilled quote button carrying city/show into the form.

**Rental catalog** — sticky compare/shortlist bar, "price this booth" on every card (already partly there), and a visible filter result count. Add a persistent "Not seeing your size? We build custom" capture at the end of the grid.

**Portable displays** — add clear price-visible cards and a quantity/quote request per product instead of routing everything through the generic modal.

**Gallery** — highest-engagement page; make the shortlist CTA sticky and add "get this booth priced" per image.

**Cost calculator** — keep the live range ungated, but make the unlock offer stronger and single-purpose (full itemized breakdown + free 3D concept), with the form inline rather than below the fold.

## 6. Urgency and scarcity that is actually true

- Show-deadline countdowns driven by real dates in `events.ts` (booking windows, not invented scarcity).
- Rush-fee warning surfaced *before* the form when the selected show is inside 30 days — it converts because it's real and specific.
- Early-commitment discount messaging applied consistently wherever it already exists.

## 7. Trust, speed and accessibility

- Click-to-call with a stated answer window on mobile, plus a call CTA in the header on desktop.
- Focus-visible rings on all custom buttons and focus trapping in modals.
- Contrast pass on `text-white/40` and `text-white/50` body copy — several fall below 4.5:1, which costs readability and accessibility.
- Lazy-load below-fold imagery on the heaviest pages (gallery, catalogs) so mobile visitors reach the CTA sooner.

## Technical notes

- GA4 loads from the root route head with a small `src/lib/analytics.ts` wrapper; `submitLead()` fires the conversion event centrally so no form can be missed.
- CTA copy stays centralized in `GlobalCta.tsx`, `MobileCtaBar.tsx` and `QuoteModal.tsx`.
- Partial-form persistence reuses the existing localStorage pattern from the estimator/deal code.
- Countdown and deadline logic reads `src/data/events.ts` and `src/data/shows.ts`; no new pricing or business logic.
- No backend, no database, no changes to `submitLead()`'s delivery body.

## Order of work

1. Analytics + response promise + success-screen next steps
2. Form friction and partial-save
3. Proof placement
4. Page-type work (home → city/show/venue → catalogs → gallery → calculator)
5. Urgency, trust and accessibility polish

I'd suggest reviewing after stage 2, since that's where most of the measurable lift lands.
