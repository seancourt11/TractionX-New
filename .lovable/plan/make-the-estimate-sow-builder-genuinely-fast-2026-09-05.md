# Make the estimate / SOW builder genuinely fast

Yes — a builder already exists in the internal workspace at `/admin/documents`. It creates Rental SOWs, Purchase Agreements, Change Orders and Invoices, pulls booth designs, portable products and services straight from the site catalogue ("Add from catalogue" with thumbnails), calculates tax by province, handles a discounted offer rate, payment stages, e-signature at `/sign/{token}`, and PDF download.

What it does not yet do is get you from "new client" to a document like the attached Kraken SOW in a couple of minutes. Today you start from a blank document (or from a lead) and assemble every section by hand.

## What to build

### 1. A short new-document wizard
"New SOW" opens four quick steps instead of an empty form:

1. **Client & show** — client name, contact, billing address, show, venue, city (city sets the tax region automatically).
2. **What are we building** — booth size (10×10 → 40×40 or custom), rental vs. build, and finish tier. This pre-fills the base line item at the site's own tier pricing.
3. **Add the pieces** — the existing catalogue picker, plus a checklist of the things that show up on nearly every job: counters, stools, lounge setting, wall-mounted displays, storage closet, platform/pedestal, flooring, soffit/lighting, hanging sign. Tick, set a quantity, done.
4. **Money & dates** — total or discounted rate, deposit split (80/20, 50/40/10, custom), offer expiry, invoice number, target dates.

Finish and you get a complete draft with overview, included services, configuration bullets, exclusions, assumptions, QC steps and payment schedule already written from the choices above — then you edit wording rather than write it.

### 2. Templates you can reuse
Save any finished document as a template ("10×20 custom rental — two-bay") and start the next one from it. Ships with a few starters built from the attached Kraken SOW and the existing snippet library.

### 3. Match the attached SOW exactly
Bring the printed document in line with the Kraken example:
- Reduced-rate row shown as a negative line against the project cost, with the "signed and deposit placed by [date]" condition.
- Payment schedule table with tax shown per milestone and a totals row.
- Invoice details block (bill-to, remit-from, reference-on-payment, amount due on signature).
- Payment methods block with wire/EFT, Interac e-Transfer and cheque side by side.
- Acknowledgement block with both signature areas and a named account manager.

### 4. Estimate mode
A lighter "Estimate" document type: same scope and pricing, no signature block, marked as budgetary with a validity date — for the early conversation before a real SOW.

### 5. Small fixes noticed while reviewing
- Company banking details in the workspace show account 1988943; the attached SOW shows 8934083 with beneficiary "4603181 Nova Scotia Limited". Needs confirming — I'll use the SOW's values unless you say otherwise.
- Add account managers (e.g. Irina) as selectable signatories rather than only the one default.

## Technical notes

- Extend `DocType` with `estimate`; add `beneficiaryName` to `CompanySettings` and a `signatories` list.
- New `src/lib/admin/blueprint.ts`: size/tier/component → line items + configuration/inclusion/exclusion/assumption text, reusing `src/lib/estimator.ts` and `market-tier.ts` so document pricing equals site pricing.
- New wizard route `admin.documents.new.tsx` writing through the existing store; the `$id` builder stays the edit surface.
- Templates stored alongside documents in the same localStorage store (`src/lib/admin/store.tsx`), so a future backend swaps at the same seam.
- `DocumentPreview.tsx` gains the discount row, per-stage tax column, invoice-details and payment-methods blocks; `doc-math.ts` gains per-stage tax; PDF output follows automatically.

Still frontend-only, same as the rest of the workspace.
