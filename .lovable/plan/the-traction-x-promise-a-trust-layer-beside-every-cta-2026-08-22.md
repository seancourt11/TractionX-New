# The Traction X Promise — a trust layer beside every CTA

## What the competitors actually do

Pure Exhibits' strength is not better words — it is **one named, checkable commitment repeated everywhere**: the "100% prebuilt guarantee" (booth fully assembled in their facility, photo proofs approved before shipping), plus "fixed pricing / one transparent invoice, no hidden fees", "all mandatory show forms filed on time", and a numbered stage line (Design → Contract → Project Setup → Show Coordination → Pre-Staging & Proofs → Show Time) where every stage lists what the client receives. Classic Exhibits leans on a Limited Lifetime Warranty and "stress-free installation".

Our current promise is a single response-time line ("We reply within one business day — preliminary concept direction and investment within two"). It is credible but it only covers the first 48 hours. Nothing on the site promises anything about what happens after they sign — which is exactly the fear buyers have.

## The promise set (draft copy)

Six short, named, verifiable promises. Each has a one-line badge version for CTAs and a paragraph version for the guarantee page.

1. **Pre-build & photo proof** — "Your booth is fully assembled and photographed in our shop before it ships. You approve the real booth, not a render." (Directly answers Pure's strongest claim.)
2. **One contract, one invoice, one producer** — "Design, fabrication, freight, install and dismantle on one agreement with one accountable producer. Show-services costs are quoted separately and shown before you commit."
3. **Fixed scope, no surprise line items** — "The price on your signed scope is the price. Anything that changes it is a written change order you approve first — never a post-show invoice."
4. **Install and dismantle included** — "I&D labour is in every booth price we publish. You will not be quoted a booth and billed the labour later."
5. **We answer, fast** — "A designer acknowledges a complete brief within one business day, with preliminary concept direction and investment within two. Complimentary 3D design, yours to keep." (Existing promise, kept and folded in.)
6. **On the floor, not on the phone** — "A Traction X producer is on site for install and through show open. If something is wrong at 6am on move-in day, the person fixing it already knows your booth."

Optional seventh, only if you confirm it is true — say the word and it goes in:
- **Show paperwork filed on time** — we file booth approvals, utilities, rigging and mandatory forms with show management and the GC.
- **Rescue window** — a stated "if your supplier fails, we will tell you within X hours whether we can make your date."

Nothing above is invented pricing or a warranty we cannot honour. Confirm #1 (do we pre-build and photograph every booth, or only custom builds?) and #6 (producer on site always, or on request?) — I will scope the wording to whatever is actually true.

## Where they appear

- **Beside every CTA and form.** A compact `PromiseStrip` (3 short badges: pre-build proof · fixed scope, I&D included · reply in 1 business day) rendered under the submit button in the quote modal, design CTA, meeting form, booth planner, estimator and contact form — replacing/absorbing today's single `ResponsePromise` line.
- **Hero strip** on the homepage, city, show, venue and industry templates — a thin one-line bar under the hero.
- **Dedicated `/our-promise` page** — all six promises expanded, tied to the delivery process stages, with FAQ + JSON-LD, linked from the main nav and footer, and cross-linked from `/how-we-build` and `/contact`.
- **Closing CTA bands** (`CTABand`, `DesignCtaBand`, `OrganizerCtaBand`) get the promise line above the buttons.

## Technical notes

- New `src/data/promises.ts` holds the single source of truth: id, short badge label, headline, body, icon. Every surface reads from it, so the wording never drifts again (the same drift the turnaround-messaging pass fixed).
- New `src/components/Promises.tsx` exports `PromiseStrip` (inline, beside CTAs), `PromiseBar` (hero strip) and `PromiseGrid` (page).
- `ResponsePromise` in `Conversion.tsx` stays as promise #5's renderer so existing usages keep working, and gains the strip beneath it.
- New route `src/routes/our-promise.tsx` using `PageLayout`, with its own `head()` (unique title/description/og), FAQPage JSON-LD, and an entry in `sitemap.xml`, the header nav (About group) and the footer.
- No pricing, form logic or business rules change — copy and presentation only.

## Order of work

1. `promises.ts` + `Promises.tsx` components.
2. Wire the strip into the quote modal, global CTAs, booth planner, estimator and contact form.
3. Build `/our-promise`, add nav/footer/sitemap links.
4. Add the hero bar to homepage and the city/show/venue/industry templates.
5. Preview check on mobile (440px) — the strip must not push CTAs below the fold.
