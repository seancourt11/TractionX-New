# Add design / RFP upload + project brief to the booth calculator

You're right: the calculator's unlock form only asks for name, email and phone today. There's no way to send us a floor plan, RFP or a description of the project — which is exactly what makes the hand-reviewed estimate accurate.

## What changes

In the estimator's "Get your accurate, itemized breakdown" panel (used on the cost calculator page and anywhere else the estimator appears), add below the contact fields:

1. **Attach your design, floor plan or RFP** — the same drag-and-drop uploader used on the quote forms. Accepts PDF, DOC/DOCX, PPT, PNG/JPG, AI/SVG, DWG/DXF, ZIP. Optional, but framed as the accuracy lever.
2. **Tell us about the project** — a short free-text box (approx. 4 rows, 1,500 char limit) with a placeholder prompting the useful details: show and city, dates, booth goals, must-have elements, budget range, anything already designed.
3. **Accuracy framing microcopy** above the two fields: sending a drawing, RFP or brief lets a project manager price the real thing rather than a generic footprint — and it lets us return the complimentary 3D concept faster. Plus a reassurance line: files are used only to prepare your estimate.

Nothing is gated behind the upload — it stays optional so the existing conversion rate isn't hurt.

## Same treatment for the instant quote pop-up

The quote modal currently has no attachment field at all, even though the page forms do. Add the same uploader + brief box there so both entry points can carry a design or RFP.

## Technical notes

- `src/components/FileAttach.tsx`: add an optional `onFilesChange(files: File[])` callback so the parent can record what was attached. No visual change.
- `src/components/CostEstimator.tsx`: hold attached files and brief text in state; append the brief to the `message` sent through `submitLead`, and record attachment file names/sizes/count in `lead.meta.attachments`. Keeps the single `submitLead()` funnel intact.
- `src/lib/leads.ts`: no schema change needed — `meta` already carries structured extras; `message` is capped at 2000 chars, so the estimate summary plus the brief will be trimmed to fit (brief kept first, summary appended).
- `src/components/QuoteModal.tsx`: add `FileAttach` + brief textarea to the customize path and thread the same metadata through.
- File bytes are not uploaded anywhere yet (there is no lead backend wired — leads are stored locally until `deliverLead()` is pointed at your endpoint). Filenames and sizes are captured now so that when the backend goes live the uploads can be posted with the lead. I'll flag this in the form copy only if you want ("we'll confirm by email where to send large files"), otherwise the UI behaves like the existing site forms.
