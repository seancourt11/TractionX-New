# Conversion, Flow & Search Upgrade

A focused pass over the site's design, decision flow, CTAs and search readiness. Grounded in what's already built: three competing hero CTAs, a 22-second popup nudge, a mixed anchor/modal quote path, and no visible proof near the decision points.

## 1. Fix CTA hierarchy (biggest lift)

Right now the hero offers three equal-weight actions (Request a Quote → anchor, Free 3D design, Book a meeting) plus a header quote button and a 4-button mobile bar. Choice overload flattens click-through.

- One primary hero CTA: **"Start my free 3D design"** — it's the lowest-friction, highest-value offer and it's already the core promise. Quote becomes a secondary outlined button; "Book a meeting" drops to a quiet text link.
- Make the hero "Request a Quote" open the quote modal instead of jumping to `#contact` — same behavior as everywhere else on the site.
- Mobile bar: 3 actions, not 4 (Call · Free 3D · Get quote). Meeting moves into the modal as a secondary option.
- One consistent verb set sitewide: *Start my free 3D design* / *Get my exact quote* / *Book a 10-min call*. No synonyms.

## 2. Reduce commitment anxiety at the ask

Each CTA gains a one-line risk-reversal microcopy directly beneath it (proximity matters more than page-level reassurance):

- Free 3D: "No cost, no obligation. Concept back in 2–3 business days."
- Quote: "Takes about 60 seconds. A designer reviews it before we send numbers."
- Meeting: "10 minutes. No deck, no pressure."

Plus a small trust strip under the hero CTA row: response time, install-and-dismantle-included, 15+ years, 6 continents.

## 3. Move proof next to decisions, not into a separate section

Testimonials currently sit far below the fold in their own block. Social proof only converts when it's adjacent to the action.

- Pull one short, specific quote into the hero area and one into the quote modal's first step.
- Convert the client logo grid from plain text names into a specificity line: "L3, Thales, Air Canada, TELUS, Meta — 700+ builds."
- Add a single outcome-anchored stat near the offerings ("Rescue builds delivered in under 3 weeks").

## 4. Clarify the homepage decision flow

The three offerings currently link to a floor-plan page, a Las Vegas page and a Web Summit page — narrow landing pages standing in for category entry points.

- Repoint the three cards to the real hubs: Custom Exhibits, Booth Rentals, Portable Displays.
- Add a short "Which is right for me?" triage row above the cards (Buy vs Rent vs Portable), each answer routing to its hub with a pre-set quote intent.
- Give the homepage one mid-page CTA band and one closing band — remove any third redundant band.

## 5. Modal and form friction

- Quote modal: show a step counter and a "2 min" time estimate up front (completion rates rise when the end is visible).
- Ask for the easy fields first (show/city/size), contact details last — sunk-cost commitment.
- Replace generic validation text with specific, non-blaming messages.
- Keep the popup nudge but delay it to first meaningful scroll depth rather than a flat 22 seconds, and never fire it while a modal is open.

## 6. Search + AI-search layer

- Homepage: add `WebSite` + `SearchAction`, `AggregateRating` only if real ratings exist (do not invent), and a `Service` graph linking the three hubs.
- Add a 40–60 word "short answer" block at the top of the homepage and each hub page — the format AI assistants extract verbatim.
- Ensure every hub page carries FAQPage schema with questions phrased the way buyers actually search ("how much does a 10x20 trade show booth cost to rent").
- Internal linking: each city/show/venue page should link up to its category hub and across to two sibling pages — currently many are leaf-only.
- Confirm `og:image` is set with an absolute URL on the homepage and each hub (real hero photos exist for these).

## 7. Accessibility and polish that also affect ranking

- Focus-visible rings on all custom buttons and modal focus trapping.
- Contrast pass on `text-white/40` and `text-white/50` body copy — several fall under 4.5:1.
- Mobile bar currently overlaps footer content; add bottom padding to `PageLayout`.

## Technical notes

- CTA copy and hierarchy centralize in `src/components/GlobalCta.tsx` and `src/components/MobileCtaBar.tsx`.
- Hero changes are in `src/routes/index.tsx`; the anchor-to-modal swap uses the existing `useCta().openQuote`.
- Modal step ordering and microcopy live in `src/components/QuoteModal.tsx`.
- Schema additions follow the existing `head()` pattern; `absUrl()` in `src/lib/seo.ts` builds absolute URLs.
- No backend changes; nothing touches the pricing engine in `src/lib/estimator.ts`.

## Scope

I'd suggest doing sections 1–3 first — they carry most of the conversion impact and are self-contained. Say the word if you'd rather do all seven in one pass, or want me to narrow to just the homepage.
