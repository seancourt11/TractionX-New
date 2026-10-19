# Close the loop: estimate → quote → SOW → invoice

Right now the chain is connected up to signature, but it stops there.

**What already links together (verified):**
- Estimator captures the deep scope and creates a Deal (`src/lib/deal.ts`).
- `/quote/$ref` shows tiered options; accepting sets the stage and value.
- `/admin/pipeline` turns an accepted deal into a draft agreement.
- Documents support three types only: Rental SOW, Purchase Agreement, Change Order (`DocType` in `src/data/admin-demo/types.ts`). Each carries payment stages, a deposit percent and an invoice *number* — but no invoice document exists.
- `/sign/$token` handles client review and e-signature.

**The missing link:** there is no invoice. Payment stages are described inside the SOW, but nothing generates a deposit invoice, tracks what's been billed or paid, or gives the client a page to view and pay it.

## What to build

### 1. Invoice as a real document type
- Add `invoice` to `DocType` with its own preview layout: bill-to, invoice + PO number, issue/due date, line items pulled from the signed SOW, tax by region, deposit vs balance, payment instructions (EFT/cheque), notes.
- Numbering continues the existing `nextInvoiceNumber` scheme with an `IN` prefix.

### 2. Auto-generate from the signed contract
- When a document is signed, the payment schedule becomes a set of scheduled invoices (e.g. 50% deposit on signing, 40% pre-ship, 10% post-show).
- One click per stage: "Issue invoice" creates the invoice document pre-filled from the SOW's line items and that stage's amount — no re-keying.
- Each invoice tracks status: draft → sent → viewed → paid (paid marked manually for now), with the same event log the SOW uses.

### 3. Client side
- `/invoice/$token` — same branded, link-accessible experience as the signing page: view, download PDF, mark "payment sent" with a reference, ask a question.
- The project portal (`/portal/$ref`) gains a **Billing** section listing every invoice with status, amount and due date, plus what's still outstanding.

### 4. Admin visibility
- Pipeline cards show billed vs collected against the deal value.
- Documents list gains an Invoices filter and an "overdue" flag.

### 5. One continuous flow
The stage rail shown to both sides becomes:

```text
Estimate → Quote → Accepted → Contract signed → Deposit invoiced → In production → Final invoice → Complete
```

Each step advances the same Deal record, so the client always sees one thread and you see one pipeline.

## Technical notes

- Extend `DocType`, `DocumentRecord` (add `paidAt`, `dueDate`, `stageRef`, `amountDue`) and the doc labels map in `src/data/admin-demo/types.ts`.
- New `src/lib/admin/invoice.ts`: derive invoices from a signed document's `paymentStages`, reusing `doc-math.ts` for totals and tax.
- `DocumentPreview.tsx` gets an invoice branch; PDF output reuses `src/lib/pdf.ts`.
- New routes `invoice.$token.tsx` and a Billing panel in `portal.$ref.tsx`; both `noindex`.
- Still frontend-only (localStorage + link-encoded deal), same seams as the rest of the pipeline. No card payments yet — instructions plus manual "paid" marking; a payment provider can slot in later without changing the UI.

## Note on payments

If you want clients to actually pay online (card/ACH) rather than by EFT, that needs a backend. Say the word and I'll plan that on top of this instead of the manual step.
