# Clickable backend prototype (design you can see and use)

Yes. I'll build the whole admin system as real, working screens in this project — styled in Traction X's dark theme, driven by realistic sample data held in the browser. Everything looks and behaves like the finished product; nothing is saved to a real database. You click through it, we refine the design together, and your developer then builds the Next.js backend behind exactly these screens.

## Screens I'll build

All under `/admin`, hidden from the public site and search engines.

**Dashboard** — counts of new leads, drafts, documents out for signature, and signed this month; a recent-activity feed; and quick actions to start a SOW or open the newest lead.

**Leads** — table of incoming quote requests with contact, city, show, booth size, tier, estimated value, source page, and JobForge sync status. Filters by status, city, and date. Opening a lead shows the full submitted configuration and a "Create SOW from this lead" button.

**Documents** — list of SOWs, purchase agreements, and change orders with client, show, total, status (Draft, Sent, Viewed, Signed, Void), and expiry on time-limited offers.

**Document builder** — the core screen, a step-by-step editor:
1. Client and event — client, contact, show, venue, city, footprint, currency, tax region
2. Scope — pick included services and configuration items from a clickable library
3. Pricing — line-item table with standard and discounted columns, live subtotal, savings, tax and total
4. Terms — payment schedule (80/20, 50/50 or custom), deposit due date, offer conditions, assumptions, exclusions
5. Review — live preview of the finished document, then Send for signature

**Document preview** — the SOW rendered exactly like your STEP BuildEx example, including the deposit invoice page with payment methods, so you can judge the real output.

**Client signing page** — what your customer sees on the emailed link: the document, a signature panel, and a confirmation screen.

**Portable purchase agreement** — the same builder in purchase mode, with products, delivery window, artwork approval, warranty and returns.

**Settings** — company details, banking, tax registration, signatory, tax rates by province and state, and the snippet libraries for services, exclusions and assumptions.

## How the prototype behaves

- Sample data is preloaded: a few leads, one draft SOW, one signed document, one portable agreement.
- Edits persist in your browser while you click around, so it feels real, and reset on a hard refresh.
- The PDF preview uses the same generator this site already uses, so the document you see is the document your customers would get.
- No login yet — a placeholder sign-in screen shows the intended flow without blocking you from clicking through.

## What your developer receives

Once you're happy with the screens, the handoff package is:

- This prototype as the visual and interaction reference — every screen, state and field already decided
- The written backend spec (data model, API endpoints, auth, tax and pricing logic, e-signature, JobForge sync, security checklist), plus a Prisma schema, an OpenAPI file, and shared TypeScript types
- A short document mapping each screen to the endpoints that must power it

That removes almost all guesswork: they build to a design that already exists rather than inventing one.

## Technical notes

- Routes under `src/routes/admin/*` with a shared admin layout, marked `noindex` and excluded from the sitemap.
- Sample data in `src/data/admin-demo/*`, state via a React context with `localStorage` persistence — no Lovable Cloud, no server functions, nothing to migrate away from later.
- Document preview reuses `src/lib/pdf.ts`; pricing pulls from `src/lib/estimator.ts` and `src/data/pricing-tiers.ts` so the numbers match the live site.
- Shared types live in one file that doubles as the API contract handed to your developer.
- Zero impact on the public site — no existing page or component changes.
