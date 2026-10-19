# Build Your Booth Plan — Exhibit Needs Analyzer

Your draft is strong, but as written it's 14 steps and roughly 90 inputs — that's a specification interview, not a 2–3 minute lead magnet. The fix is to keep every one of your questions but only ever *show* the ones that matter for the path the visitor is on, and to move the long tail into an optional "add detail" section after the recommendation is already on screen.

What follows is the same concept, tuned to Traction X: it reuses the pricing model, tier language, catalogue and PDF engine the site already has, so the recommendation is grounded in real Traction X numbers instead of a generic range.

## The core improvement: earn the answers

Three phases instead of one long form.

```text
PHASE 1 — Profile      6-8 adaptive questions, no email asked      ~2 min
PHASE 2 — Result       plan renders immediately, partially blurred  instant
PHASE 3 — Deepen       optional detail + upload, after the payoff   optional
```

Contact details are asked once, between phase 2 and 3, to unlock the itemized figure and the PDF — the pattern the cost calculator already uses. The visitor sees their recommendation shape, tier and score first; the dollar range and downloadable plan are what the email buys.

## Phase 1 — the adaptive path

Progress bar, "about 2 minutes", back button, answers persisted so a refresh doesn't lose them.

1. **Space** — your size list, plus Pavilion and Not sure. Pre-selected when they arrive from a booth-size page.
2. **The allocation question** — your "what matters most" question moved to position 2, where it does the most work. It sets the default weighting for everything after it.
3. **Path** — Portable & self-managed vs Modular / custom. Auto-skipped and locked to modular for 20×20 and larger.
4. **Portable branch** (3 short questions): travel method, size, must-haves. Ends fast — a portable lead shouldn't sit through island-booth questions.
5. **Modular branch**: impact tier as four visual cards mapped directly to Traction X's existing **Standard / Elevated / Premium / Architect** tiers (same names as the estimator, so nothing contradicts the pricing pages), then goals ("what needs to happen in the booth"), then the five priority sliders.
6. **Components** — your six component groups, but pre-ticked from the tier and goals so most visitors confirm rather than build a list from scratch. Grouped in collapsible sections, chip-based, so it reads as one screen.
7. **Rent vs buy + turnkey level** — combined into one screen: frequency of use, rent/buy/compare, and Exhibit only / Exhibit + logistics / Full turnkey.
8. **Event + timeline** — show name and city with the existing typeahead (autofilled if they came from a show, city or venue page), dates, booth number, timeline, and stage in the process.

Budget is asked last, framed exactly as you wrote it, with the "your budget doesn't determine whether we can help" line — and with the live estimate range already visible next to it so the bands feel informed rather than like a screening test.

## Phase 2 — the result

Not a thank-you. A plan.

- **Recommended solution** headline — e.g. "20×30 Elevated custom rental with custom millwork features".
- **Booth profile radar/bars** — Visual impact, Customization, Technology, Functionality, Portability, Turnkey support, each scored out of 10 from their answers.
- **Suggested booth elements** — a written spec list generated from components + tier + footprint (structure height, display sizes, counter, storage, meeting capacity, lighting).
- **Why this approach** — two or three sentences explaining the modular-vs-custom recommendation in plain language.
- **Matching booths** — pulls real designs from the rental catalogue at that footprint, so the plan is illustrated with actual Traction X builds, not stock imagery.
- **Estimated investment** — the range comes from the existing estimator model (footprint × tier × scaled add-ons, I&D included), phrased as "projects with this combination typically fall between $X and $Y". Blurred until contact details are entered.
- **Two CTAs** — "See available times" (the existing 30-minute strategy call, auto-qualified because we know their budget band) and "Email me my booth plan".
- **Rush warning** where the timeline is under 4 weeks, using the real rush logic already on the site.

## Phase 3 — optional deepening

After the plan is on screen: existing booth (with photo upload), exhibitor manual / floor plan upload, and anything the branch skipped. Framed as "add these and we'll bring concept sketches to the call" — voluntary, and the highest-intent leads will do it.

## The PDF

"Email me my booth plan" generates a Traction X-branded plan document in the same all-black style as the spec sheets: cover with company and show name, recommended solution, booth profile scores, element list, investment range, what's included, next steps. It downloads instantly and is attached to the lead record.

## Sales output and scoring

Your scoring model, with two additions: **fit multiplier** (island + turnkey + named show inside 6 months scores higher than the sum of its parts) and **negative signals** (under $10K with full turnkey, or "just researching" with no event) so the board doesn't fill with false highs. Score bands: 70+ high priority, 40–69 nurture, under 40 self-serve — each with a suggested next action rather than a bare number.

The lead lands in the existing `/admin/leads` view with the structured summary you drafted, sortable by score, and can be pushed straight into the pipeline as a deal with the configuration pre-loaded into a quote.

## Naming and placement

**Build Your Booth Plan** — "Answer a few questions about your event, budget and goals and we'll recommend the right exhibit approach."

Lives at `/build-your-booth-plan` as a full SEO page (FAQ and HowTo schema, a crawlable written explanation of how booth type is chosen by size, budget and service level — the "there is no one best booth" philosophy as indexable content). Entry points: header, homepage hero secondary CTA, end of the cost calculator, booth-size pages, city/show/venue pages (with context pre-filled), and the exit-intent offer.

## Technical notes

- New `src/lib/booth-plan.ts` — question graph, branching rules, scoring, profile calculation and recommendation text. Pure functions, no UI.
- New `src/components/BoothPlanner.tsx` plus a results panel; reuses `ChoiceChips`, `Autocomplete`, `FileAttach`, `SmsOptIn`, `ResponsePromise` and `SuccessPanel`.
- Investment range calls the existing `src/lib/estimator.ts` model so the planner can never contradict the calculator or pricing pages.
- Plan PDF added to `src/lib/pdf.ts` alongside the existing guide and breakdown generators.
- Answers persist to `localStorage` and encode into a shareable URL, same scheme as the estimator.
- Submits through `submitLead()` with `source: "booth-planner"`, full answers and score in `meta`; new score/tier columns surfaced in `/admin/leads`.
- GA4 events per step via the existing `track()` helper, so drop-off per question is visible.
- No backend, no schema changes.

## Order of work

1. Question graph, scoring and recommendation engine
2. Planner UI with branching and persistence
3. Result page, profile scores and catalogue matching
4. Gate, PDF and lead payload
5. SEO route, entry points and admin scoring columns
