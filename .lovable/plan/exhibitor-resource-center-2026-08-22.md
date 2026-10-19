# Exhibitor Resource Center

Today the Resources menu points at pricing tools, a glossary, a benchmark report and three
guides. What's missing is the practical stuff an exhibitor actually needs in the 16 weeks before
a show — budgets, deadlines, artwork specs, staffing, shipping, ROI. These are also some of the
highest-intent, most-linked-to searches in our category, so each one doubles as an SEO asset and
a lead magnet.

New hub at `/exhibitor-resources`, with each tool on its own indexable URL.

## The resources

**1. Trade show budget worksheet (interactive + download)** — `/exhibitor-resources/trade-show-budget-template`
Every real line item: space, booth, graphics, drayage, electrical, rigging, internet, cleaning,
I&D, freight, travel, staff, giveaways, lead capture. Fill it in on the page, see the running
total and the percent-of-budget split, download a branded XLSX/PDF. Targets "trade show budget
template", a term people search and bookmark.

**2. Show services deadline tracker** — `/exhibitor-resources/show-services-deadline-tracker`
Enter your show date; get every order-by date that costs real money if missed (advance freight
warehouse, discount electrical deadline, rigging drawings, exhibitor manual, hotel block, lead
retrieval). Exports to calendar (.ics). Pre-filled automatically on every show page.

**3. Booth graphic file specs and templates** — `/exhibitor-resources/trade-show-booth-graphic-specs`
Bleed, safe area, DPI, colour profile and finished sizes for every footprint and panel type we
build, with downloadable artwork templates. Very high intent — designers search this and link
to it — and it removes the single biggest cause of production delays.

**4. Exhibitor ROI and cost-per-lead calculator** — `/exhibitor-resources/trade-show-roi-calculator`
Booth spend plus show services in, target leads and close rate out: cost per lead, break-even
deal count, projected pipeline. Uses our real city-index pricing so the inputs aren't guesses.
This is the page a marketing manager sends to their CFO to get the budget approved.

**5. Booth staffing and lead capture playbook** — `/exhibitor-resources/booth-staff-training-guide`
Staffing ratios per footprint, shift schedule template, opening questions, qualifying script,
lead-form fields, 48-hour follow-up email templates. Printable one-pager for the show floor.

**6. Shipping, drayage and crate checklist** — `/exhibitor-resources/trade-show-shipping-checklist`
Advance warehouse vs. direct-to-show decision tree, labelling, bill of lading, carnet basics for
cross-border, target move-in windows, outbound paperwork. Complements the existing drayage guide
with the do-this-now list.

**7. Show-day survival kit and booth setup checklist** — `/exhibitor-resources/booth-setup-checklist`
Pre-install walkthrough, tool and supply kit, what to check at show open, teardown and outbound.
Printable.

**8. Venue exhibitor rules cheat sheets** — one card per venue on the venue pages, hub at
`/exhibitor-resources/venue-rules`
Hanging sign height limits, rigging rules, union jurisdiction, fire and material rules, booth
height by footprint. This one only ships with real per-venue facts you supply or that come from
published exhibitor manuals — no invented dock counts.

## SEO structure

- Hub page links to all eight, each linking back to the hub, to relevant guides, and to the
  city/venue/show pages the resource applies to.
- HowTo or Dataset schema on the tools, FAQPage on each page, Speakable for AI search.
- Downloads are ungated for the checklists and specs (that's what earns links), and email-gated
  for the budget worksheet and ROI export (that's what earns leads).
- Deadline tracker and budget worksheet embed on show and city pages pre-filled with that
  show's date and that market's cost index, giving every location page unique utility.
- All eight added to the sitemap, the Resources menu, and the site map page.

## Technical notes

- Content lives in `src/data/resources.ts` alongside the existing `guides.ts` pattern; routes as
  `src/routes/exhibitor-resources.index.tsx` and `exhibitor-resources.$slug.tsx`, with the three
  interactive tools as their own components.
- Calculators reuse `src/lib/market-tier.ts` (city cost index) and `src/lib/estimator.ts` so
  numbers match the rest of the site.
- Downloads use the existing branded PDF generation path in `src/lib/leads.ts`; gated ones write
  through the same lead store and GA4 events as other forms.
- Deadline tracker reuses the milestone logic already in `src/components/ShowCountdown.tsx`.

## Suggested build order

Phase 1: hub + budget worksheet + deadline tracker + graphic specs.
Phase 2: ROI calculator + staffing playbook.
Phase 3: shipping checklist, setup checklist, venue rules cheat sheets.
