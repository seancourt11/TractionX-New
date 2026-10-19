# Production Audit: Traction X Website

A full production-grade review of the site (91 routes, ~32K lines of data, 294 rental images), run in the two stages you specified: **audit first, implement only after you approve the findings.**

## Stage 1 — Audit only (no changes)

A read-only review across all 14 areas from your master prompt, delivered as a findings report in chat:

**A. Current Architecture** — how the site works today: TanStack Start SSR, file-based routing, static data files as the content source, localStorage-based lead store, GA4 event layer, admin workspace, quote/SOW/invoice generators.

**B. Critical Problems** — things that lose leads, break functionality, or create security/SEO exposure. Already-confirmed examples that will be verified and detailed:

1. **Leads go nowhere (critical).** `deliverLead()` in `src/lib/leads.ts` only writes to the visitor's own localStorage and logs to the console. Every quote form, 3D-design gate, pricing-guide download, and meeting request on the site is captured but never sent to you. On a live site, leads silently disappear.
2. **Analytics not connected.** The GA4 layer is built (8 event types: CTA opens, form steps, abandons, calls, SMS opt-ins) but no measurement ID is configured, so nothing reaches Google Analytics.
3. **Launch-blockers inventory.** Site-wide `noindex` + `robots.txt Disallow: /` (intentional pre-launch) and `BASE_URL = ""` placeholder in `sitemap.xml` — must be flipped in the correct order on launch day or the site stays invisible / canonicals break.

**C. High-Priority Improvements** — e.g. lead delivery via Lovable Cloud (database + email notification), image `h-screen` → `h-dvh` mobile fixes (19 occurrences), responsive-image/lazy-loading gaps.

**D. Medium-Priority** — performance (bundle size, font loading, third-party scripts), accessibility (focus states, form labels, contrast), internal-linking and schema coverage gaps across the 91 routes.

**E. Low-Priority / Optional** — code-quality refactors, dead-code removal, deduplication — only where it clearly helps maintainability.

The audit will also explicitly verify what's already good so nothing working gets touched: alt-text coverage (spot-checked: catalog, case-study, and planner images all have descriptive alt + lazy loading), image weight (9MB across 294 files, largest 110K — healthy), no console.log leftovers, per-route head metadata on all public routes, legacy redirect map, CTA/analytics instrumentation.

## Stage 2 — Implementation (only after you approve findings)

You pick which findings to fix from the report. Likely first batch, pending your approval:

1. **Lead delivery** — enable Lovable Cloud, store leads in a database table, and send you an email/notification per lead. Every existing form works unchanged (single integration point already designed for this).
2. **Analytics** — connect GA4 so the existing event layer starts reporting.
3. **Mobile fixes** — `h-screen` → `h-dvh`, tap-target and overflow checks on key templates.
4. **Performance quick wins** — whatever the audit confirms (font loading, lazy loading, bundle).
5. **Launch checklist** — documented, ordered steps for flip day (INDEXABLE flag, robots.txt, sitemap BASE_URL, Search Console verification).

## Guardrails (throughout)

- No redesign, no branding/font/color changes, no copy rewrites, no URL changes.
- No removed functionality, integrations, metadata, redirects, or tracking.
- Site stays noindex until you say launch.
- Every fix verified against the preview (desktop + mobile) before being called done.

## Technical details

- Lead storage would use Lovable Cloud (Supabase): a `leads` table with RLS, plus a server function replacing the `deliverLead()` stub — the only code change forms need, per the existing design.
- Audit methods: static code review of all route/component/data files, Playwright checks of key flows (quote form, 3D design gate, meeting booking, calculator, admin) at desktop and mobile widths, build output, console/network inspection.
- Nothing is marked "fixed" until verified in the running app.
