# Gap Review: What's Missing to Be the Best Exhibit Site in the World

The content depth is already unusual for this industry: 79 city pages, 59 shows, 35 venues, 24 industries, 299 rental booths, 256 portables, a costed calculator, gated pricing guides and an internal document/signing workspace. What's missing is mostly in three buckets: **proof**, **capture paths**, and **post-sale/repeat-client content**.

## 1. Proof is the biggest hole

- **No review or rating schema anywhere.** Testimonials exist as a page but carry no `Review`/`AggregateRating` markup, and no named-client attribution near CTAs. Real, attributed reviews (name, title, company, show) with schema are the single strongest trust and AI-search asset. Requires real quotes — nothing invented.
- **No case study → industry → show link web.** Case studies exist (188 lines of data) but the industry, show and venue pages don't surface "we built for this industry / at this show" proof beside their CTAs.
- **No "the build" content.** A shop/fabrication page with real photos of the facility, machinery, crew and QA process is what separates a real builder from a broker site. Buyers actively look for this.
- **No before/after or rescue-build proof.** "Rescue builds (45 days)" is a promise with no evidence page behind it.

## 2. Missing pages buyers expect

- **Sitewide search.** Header and footer have none. With 500+ pages this is now a real navigation failure. Client-side index over routes + data files.
- **Storage, asset management and reconfiguration.** Services cover design, build, PM, I&D, logistics and AV — but not owning a booth after the first show, which is the main objection to buying vs renting.
- **Graphics and print specs page.** File setup, bleeds, material options, deadlines. High-intent, highly linkable, and reduces production friction.
- **Show services / exhibitor kit help.** Drayage, electrical, rigging, union rules explained per venue — you already hold this data in `page-proof.ts`, it isn't packaged as a resource.
- **Careers page.** Signals a real company; also a link magnet.
- **HTML sitemap page.** Crawl and human wayfinding for 500+ URLs.

Not doing: a physical shop/location page.

## 3. Lead gen and CTA gaps

- **Show-deadline reminder opt-in.** Tied to `events.ts` booking windows — the highest-intent list you could build. Captured through the existing `submitLead` seam, not a hosted backend.
- **Exit-intent "save my quote".** The quote modal is multi-step; partial completions are currently lost. Save state to a shareable link + local persistence, capture the email at the save point.
- **Gallery lead capture.** Highest-engagement page and currently a dead end — "get this booth priced" per image, prefilled into the quote modal.
- **Click-to-call CTA with a stated answer time** for urgent/rescue traffic, beyond the mobile bar.
- **One-question budget band in the quote modal** so leads self-route and the 30-min meeting rule applies automatically.
- **Stated response promise** near every form instead of a live chat widget.

## 4. SEO / AI-search layer

- **Review and Organization trust signals** — see section 1.
- **Comparison content against named competitors** ("Traction X vs ...") — `compare.$slug.tsx` infrastructure exists but is used for concept comparisons only.
- **Per-page short-answer blocks** on show/venue/industry pages, the format assistants extract verbatim.
- **Cost data pages by show and by city** ("what a 10×20 costs at CES") — the estimator math and show data already support these truthfully.

## Build order

1. Proof layer: review schema on real testimonials, case-study cross-links on industry/show/venue pages, fabrication/build-process page, rescue-build proof.
2. Capture: sitewide search, gallery lead capture, exit-intent save-my-quote, show-deadline opt-in, budget band, response promise, click-to-call.
3. New service/resource pages: storage & asset management, graphics specs, show-services explainer, careers, HTML sitemap.
4. AI-search layer: short-answer blocks, cost-by-show pages, competitor comparisons.

## Technical notes

- **No Lovable Cloud, no database, no server email.** Every new capture point routes through the existing `src/lib/leads.ts` `submitLead()` seam, which validates, persists locally and logs — so your custom backend stays a single-file swap.
- Review schema goes in `head()` of `testimonials.tsx` plus inline `Review` on case studies. I'll mark up the existing testimonials as-is; if you can supply real names/companies, they get stronger. Nothing invented, and no `AggregateRating` without real ratings.
- Search is a build-time generated index over routes and data files, filtered in the browser — no backend.
- Exit-intent save uses URL-encoded state + `localStorage`, same approach as the existing estimator share link.
- New service pages slot into the existing `src/data/services.ts` shape and inherit the current SEO template; every new route gets added to `sitemap.xml` and the nav.
- Cost-by-show pages generate from `src/lib/estimator.ts` + `src/data/shows.ts` — no new pricing logic.

This is a large pass. I'll work through it in the four stages above so you can review each before the next.

