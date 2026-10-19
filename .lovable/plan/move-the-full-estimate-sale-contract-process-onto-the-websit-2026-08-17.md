# Move the full estimate → sale → contract process onto the website

Today the site captures interest well but the deal only *starts* online. Verified current state: every form funnels through `submitLead()` (validated, then kept in the browser's localStorage — `deliverLead()` is still the unimplemented backend seam), and the `/admin` workspace plus the `/sign/$token` signing page run entirely off a seeded localStorage store. So quotes, documents and signatures exist as a working prototype, but nothing is stored server-side, nothing is emailed, and a client can't come back to their own deal.

Per your answers this stays frontend-only for now (no database), signature-only (no card payments yet), with magic-link access plus an optional client account, built end to end in stages.

## What's missing today

1. **No client-facing quote.** A visitor gets an estimate range, then the thread goes to email. There's no shareable, itemized, accept-able quote document.
2. **No self-serve scoping depth.** The estimator asks size/tier/add-ons; it never captures floor position (inline/corner/peninsula/island), ceiling height limits, storage, AV, hanging sign, furniture, graphics count, I&D dates, or venue rules — the things that actually move the number.
3. **No accept/decline/negotiate loop.** Clients can sign a finished SOW, but can't accept a quote, request changes, or pick between options A/B/C.
4. **No return path.** Once a visitor closes the tab, their configuration, uploads and quote are gone.
5. **No change orders after signature**, no artwork/asset intake, no show-timeline milestones, no deposit instructions.
6. **No status visibility** — client can't see where their project is; you can't see who opened what.

## The pipeline to build

```text
Estimate  →  Quote        →  Approval    →  Contract     →  Post-sign
(public)     (private link)  (accept/ask)   (SOW + e-sign)  (portal)
```

### Stage 1 — Deep estimator → saved deal
- Extend the estimator into a **scoping wizard**: footprint & floor position, build tier, ceiling/rigging, storage, AV & screens, furniture, graphics count, flooring, install/dismantle dates, venue, show, budget band. Every step tappable (existing `ChoiceChips`) and prefilled from the city/show the visitor landed on.
- Optional design/RFP upload stays where it is.
- On submit, the configuration becomes a **Deal** with a generated reference (e.g. `TX-2027-0481`) and a private link, saved locally and mirrored into the lead payload so nothing is lost.
- "Resume where you left off" banner when a saved deal is detected.

### Stage 2 — Client quote page (`/quote/$ref`)
- A real, branded, itemized quote: line items, quantities, unit rates, tier, add-ons, subtotals, tax region, exclusions (drayage/venue-billed items stated clearly), validity date, what's included (I&D always included).
- **Up to three options side by side** (e.g. Standard / Elevated / Premium, or two layouts) so the client chooses rather than only accepts.
- Buttons: **Accept this option**, **Request changes**, **Book a 10/30-min call**, **Download PDF** (reuses the existing PDF generator), **Email me this quote**.
- Accepting or commenting logs an event on the deal and fires a lead with `source: "quote-accept"` so you're notified through the same funnel.

### Stage 3 — Approval → contract
- Accepted quote generates the matching document in the existing document builder (rental SOW / purchase agreement) with line items, payment stages and tax carried over — one click, no re-keying.
- Client gets the existing `/sign/$token` experience, upgraded: initials per key clause, typed + drawn signature, timestamp, IP-less audit trail of view/open/sign events, countersignature by Traction X, and a signed PDF download for both sides.
- Payment stages are shown with instructions (EFT/cheque/invoice) — the structure is built so online payment can be switched on later without redoing the flow.

### Stage 4 — After signing: client portal
- `/portal` with **both access modes**: the magic link from the email works with no login, and the client can optionally set a passcode to see all their deals across shows.
- Portal contents: project status timeline tied to the show date (design → approval → production → graphics deadline → ship → install → show → dismantle), 3D design approval with comments, artwork/asset upload against a spec checklist, documents & signed contracts, change-order requests, and the show countdown.
- **Change orders**: client requests a change, you price it, it becomes a signable change-order document that appends to the original contract.

### Stage 5 — Your side (`/admin`)
- Pipeline board (New → Scoping → Quoted → Verbal → Contract sent → Signed → In production) with each deal card showing value, show date and days to deadline.
- Activity feed: quote viewed, option compared, document opened, signed.
- One-screen "build quote from lead" using the deep scoping answers.
- Templates for line items, clauses and payment schedules so quotes go out in minutes.

## Important limitation to decide on later

Frontend-only means all of this lives in the visitor's browser and yours separately — a quote link opened on another device won't find the deal unless the data travels in the link itself. The plan handles this by encoding the deal into the URL (compressed, shareable, works anywhere) plus local persistence, which is how the existing estimator share link already works. Long documents and uploaded files can't travel that way, so contracts and file attachments remain device-local until a backend exists. Turning on Lovable Cloud later swaps this out at the same seams (`submitLead()` and the admin store) without rebuilding the UI.

## Technical notes

- New `src/lib/deal.ts`: deal model, reference generator, URL encode/decode, localStorage persistence — the single seam a future backend replaces.
- Estimator wizard extends `src/components/CostEstimator.tsx` and `src/lib/estimator.ts`; new option sets go in `src/data/lead-options.ts`.
- New routes: `quote.$ref.tsx`, `portal.index.tsx`, `portal.$ref.tsx`; all `noindex` via `noindexMeta()`.
- Quote → document reuses `src/lib/admin/from-lead.ts`, `doc-math.ts` and `DocumentPreview.tsx`; signing extends `src/routes/sign.$token.tsx`.
- PDFs via the existing `src/lib/pdf.ts`.
- Every state change also emits through `submitLead()` so you keep one notification funnel.

I'll build this in the five stages above so you can review each before the next.
