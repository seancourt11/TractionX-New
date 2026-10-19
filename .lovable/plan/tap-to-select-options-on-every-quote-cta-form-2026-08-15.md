# Tap-to-select options on every quote & CTA form

Today most forms ask people to type or use dropdowns. On mobile that's slow and it loses us leads. This change turns the key qualifying questions into big tappable option buttons (chips), the same style already used in the 5-step booth configurator.

## What changes for the visitor

Every lead form gets tappable buttons for the questions that have a fixed set of answers:

- Booth size / footprint — 10×10, 10×20, 10×30, 20×20, 20×30, 20×40, 40×40, Larger, Not sure yet
- Budget band — Under $15K, $15K–$30K, $30K–$60K, $60K–$120K, $120K+, Not sure yet
- Timeline — Show in under 30 days, 1–3 months, 3–6 months, 6+ months, No date yet
- Project type (where relevant) — Custom rental, Custom build, Portable, Not sure yet

Free-text fields stay free text (name, email, phone, city, show name, notes). Selected chips highlight in the purple accent; "Not sure yet" is always an option so nobody gets stuck.

## Where it applies

| Form | Options added |
|---|---|
| Quote pop-up (instant / email / customize) | Footprint chips replace the dropdown; budget band; timeline |
| Start your 3D design form | Footprint chips replace the dropdown; budget band; project type |
| 30-min meeting request | Budget band replaces the "over $10,000" checkbox (the $10K+ bands qualify) |
| Cost calculator lead form (accurate breakdown) | Budget band; timeline |
| Pricing guide gate | Footprint chips; timeline |
| Booth configurator (`QuoteForm`) | Already chip-based — add the same budget band step for consistency |

Where a page already knows the booth size (booth detail pages, size pages), that chip is pre-selected.

## Lead data

Budget, timeline and project type are sent with every lead and shown in the admin leads view, so a PM can triage by budget before calling. Instant-quote pricing logic is unchanged — the chips only capture what's already being asked.

## Technical notes

- New shared component `src/components/ChoiceChips.tsx`: label + options array + value/onChange, single- or multi-select, keyboard accessible (`role="radiogroup"`, arrow keys), styled from existing tokens.
- New `src/data/lead-options.ts` holding the footprint, budget, timeline and project-type option lists so every form uses identical values (clean reporting).
- Update `QuoteModal.tsx`, `GlobalCta.tsx` (design form + 30-min meeting gate), `CostEstimator.tsx`, `PricingGuideGate.tsx`, `QuoteForm.tsx` to use it.
- Extend the lead payload in `src/lib/leads.ts` meta with `budget`, `timeline`, `projectType`; surface these columns in `/admin/leads`.
- Required-field validation moves to chip selection (submit disabled until required chips chosen); no backend/schema changes.
