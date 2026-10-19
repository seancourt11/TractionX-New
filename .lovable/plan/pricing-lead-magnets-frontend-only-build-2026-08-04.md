# Pricing Lead Magnets — Frontend-Only Build

Build features 4, 5 and 6 with no Lovable Cloud, no database, no server email. Everything runs in the browser and routes through one clearly marked handoff file so the custom backend is a single-file swap at launch.

## The handoff seam

Every lead-producing form on the site currently just flips a local "sent" flag — nothing is captured anywhere. Introduce one shared module that all of them call:

`src/lib/leads.ts` — exports a single `submitLead(payload)` function plus a `LeadPayload` type covering every field any form collects (name, email, phone, company, footprint, city, show, source, message, and a free-form `meta` object for estimator configuration).

Its default implementation:
- Validates the payload with zod (email format, length caps, required fields).
- Writes the lead to `localStorage` under a rolling key so nothing is lost during the pre-launch period and you can export what came in.
- Logs a clearly labelled console entry so you can watch submissions during testing.
- Returns a typed result so callers can show success or error states.

At launch, replace the body of that one function with a `fetch` to your own endpoint. Every form, gate and download on the site starts posting to your backend with no other changes. The file carries a prominent comment block marking it as the integration point.

Then wire all five existing forms through it: CostEstimator, QuoteModal, QuickQuoteModal, Design3DModal and MeetingModal. Today they capture nothing — after this they all produce structured payloads with a `source` field identifying which form and page they came from.

## Feature 4 — 2026 Pricing Guide PDF

A downloadable one-page guide gated behind Name + Email only. Low friction on purpose — this catches people in budgeting mode who aren't ready for a quote form.

The PDF is generated in the browser at download time rather than being a static file, so it never falls out of sync with the pricing shown on the page. It pulls its numbers directly from the same tier data the pricing page renders.

Contents:
- Starting prices for every footprint, custom rental and owned build side by side.
- What's included in every rental price.
- What's billed separately, and by whom.
- Show services as a percentage of booth cost, with the union-city premium noted.
- Contact details and the complimentary 3D design offer.

Component: `src/components/PricingGuideGate.tsx` — a compact bordered card matching the existing dark/purple treatment, with Name and Email fields and a download button. On submit it calls `submitLead`, generates the PDF and triggers the download immediately. No waiting, no email round-trip needed.

Placed on the pricing hub after the tier cards, on the cost calculator after the estimator, and on the rent-a-booth page.

## Feature 5 — Email me this breakdown

Once a visitor has unlocked the itemized breakdown in the estimator, offer a second action that packages their exact configuration into a shareable brief.

Because there's no server to send mail, this produces the brief two ways:
- A "Download this breakdown" button that generates a PDF of their specific configuration — footprint, build type, finish, city tier, every selected add-on with its scaled cost, per-show and annual ranges, and the disclaimer.
- A "Copy summary" button that puts a clean plain-text version on the clipboard for pasting into an email to their boss.

Both actions fire `submitLead` with the full estimator configuration in `meta`, so when your backend is live you'll receive exactly what each person configured. The UI copy says the breakdown is theirs to download and share — it does not promise an email that won't arrive.

## Feature 6 — Save and share an estimate

Let visitors save their configuration and get a link back to it.

The estimator's full state is encoded into the URL as a compact query parameter. Saving produces a shareable link the visitor can bookmark, revisit or send to a colleague, and the estimator reads that parameter on load and restores every input.

Saving asks for an email first — that's the capture point — then shows the link with a copy button. The configuration also persists in `localStorage` so a returning visitor on the same browser lands back on their last estimate without needing the link.

No server involved: the link is self-contained, so it works immediately and keeps working after you move to your own infrastructure.

## What stays untouched

- Public starting price ranges, the quick-answer blocks and the FAQ schema stay fully crawlable. They are the SEO and AI search assets and nothing gets moved behind a gate.
- The headline live estimate range stays frictionless with no email required.
- No new popups or interstitials. The existing 22-second design nudge is the only automatic interruption and it stays as-is.

## Technical notes

- PDF generation uses a lightweight browser-side library added as a dependency; it runs entirely client-side with no worker or server involvement.
- All form input keeps the existing length caps and gains zod validation at the seam.
- Estimator state encoding uses a short scheme so shared links stay reasonably tidy rather than carrying a long blob.
- Nothing in this work depends on Lovable Cloud, server functions or email infrastructure, so none of it needs unwinding when you migrate.
