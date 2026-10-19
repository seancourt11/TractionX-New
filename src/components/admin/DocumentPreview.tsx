import type { DocumentRecord, TaxRegion, CompanySettings } from "@/data/admin-demo/types";
import {
  computeStages,
  computeTotals,
  effectiveRate,
  formatDate,
  lineQty,
  lineStandardTotal,
  lineTotal,
  money,
} from "@/lib/admin/doc-math";


/**
 * Paper-accurate preview of the generated document.
 *
 * Mirrors the STEP BuildEx SOW layout section for section, including the
 * deposit invoice page, so the output can be judged before a backend exists.
 */

function Sheet({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-white text-[13px] leading-relaxed text-neutral-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        <span>Traction X</span>
        <span>{label}</span>
      </div>
      <div className="space-y-6 px-8 py-8">{children}</div>
    </div>
  );
}

function H({ n, children }: { n: number | string; children: React.ReactNode }) {
  return (
    <h2 className="border-b border-neutral-200 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">
      {n}. {children}
    </h2>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-400">{label}</p>
      <p className="mt-0.5 font-medium">{value || "—"}</p>
    </div>
  );
}

export function DocumentPreview({
  doc,
  taxRegions,
  settings,
}: {
  doc: DocumentRecord;
  taxRegions: TaxRegion[];
  settings: CompanySettings;
}) {
  const t = computeTotals(doc, taxRegions);
  const stages = computeStages(doc, t.total, t);
  const isPurchase = doc.type === "purchase_agreement";
  const isEstimate = doc.type === "estimate";
  const signerName = doc.signatoryName || settings.signatoryName;
  const signerTitle = doc.signatoryTitle || settings.signatoryTitle;
  const kind = isEstimate ? "Estimate" : isPurchase ? "Purchase Agreement" : "Statement of Work";
  const deposit = stages[0];
  const balance = stages[1];

  if (doc.type === "invoice") {
    return <InvoiceSheet doc={doc} taxRegions={taxRegions} settings={settings} />;
  }


  return (
    <div className="space-y-6">
      <Sheet label={kind}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">{kind}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">{doc.title}</h1>
          <p className="mt-1 text-neutral-600">
            {[doc.showName, doc.city].filter(Boolean).join(" · ")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-neutral-200 py-5 sm:grid-cols-3">
          <Meta label="Prepared for" value={doc.clientName} />
          <Meta label="Prepared by" value={`${settings.legalName.split(" — ")[0]} · ${signerName}`} />
          <Meta label="Event" value={doc.showName} />
          <Meta label="Venue" value={doc.venue} />
          <Meta label={isPurchase ? "Package" : "Booth footprint"} value={doc.footprint} />
          <Meta label="Currency & date" value={`${doc.currency} · ${formatDate(doc.invoiceDate)}`} />
          <Meta
            label="Document type"
            value={
              isEstimate
                ? "Budgetary estimate — not a contract"
                : isPurchase
                  ? "Purchase (client owns assets)"
                  : "Rental activation (Traction X-owned assets)"
            }
          />
          <Meta label={isEstimate ? "Estimate #" : "Invoice #"} value={doc.invoiceNumber} />
          <Meta label="Tax" value={t.taxLabel} />
        </div>

        <section className="space-y-2">
          <H n={1}>{isPurchase ? "Purchase Overview" : "Project Overview"}</H>
          <p>{doc.overview}</p>
        </section>

        <section className="space-y-2">
          <H n={2}>Included</H>
          <Bullets items={doc.includedServices} />
        </section>

        <section className="space-y-2">
          <H n={3}>{isPurchase ? "Products & Configuration" : "Scope & Configuration"}</H>
          <Bullets items={doc.configuration} />
        </section>

        <section className="space-y-3">
          <H n={4}>Pricing</H>

          {doc.offer.enabled ? (
            <div className="rounded border border-neutral-300 bg-neutral-50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em]">{doc.offer.headline}</p>
              <p className="mt-2 text-[12px] text-neutral-700">{doc.offer.conditions}</p>
            </div>
          ) : null}

          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                <th className="py-2">Item</th>
                <th className="py-2 text-center">Qty</th>
                {t.hasDiscount ? <th className="py-2 text-right">Standard</th> : null}
                <th className="py-2 text-right">{t.hasDiscount ? "Discounted" : "Amount"}</th>
              </tr>
            </thead>
            <tbody>
              {doc.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100 align-top">
                  <td className="py-2.5 pr-4">
                    <div className="flex gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="h-14 w-20 shrink-0 rounded border border-neutral-200 object-cover"
                        />
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-medium">{item.label}</p>
                        {item.description ? (
                          <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">{item.description}</p>
                        ) : null}
                        {item.sku ? (
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                            {item.sku}
                          </p>
                        ) : null}
                        {lineQty(item) > 1 ? (
                          <p className="mt-0.5 text-[11px] text-neutral-500">
                            {lineQty(item)} × {money(effectiveRate(item), doc.currency)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-center">{lineQty(item)}</td>
                  {t.hasDiscount ? (
                    <td className="py-2.5 text-right text-neutral-400 line-through">
                      {money(lineStandardTotal(item), doc.currency)}
                    </td>
                  ) : null}
                  <td className="py-2.5 text-right font-medium">{money(lineTotal(item), doc.currency)}</td>
                </tr>
              ))}
              {t.reducedBy > 0 ? (
                <>
                  <tr className="border-b border-neutral-100 font-medium">
                    <td className="py-2">Project cost</td>
                    <td className="py-2" />
                    {t.hasDiscount ? <td className="py-2" /> : null}
                    <td className="py-2 text-right">{money(t.lineSubtotal, doc.currency)}</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">
                      {doc.offer.headline}
                      {doc.offer.expiresOn ? ` — signature and deposit placed by ${formatDate(doc.offer.expiresOn)}` : ""}
                    </td>
                    <td className="py-2" />
                    {t.hasDiscount ? <td className="py-2" /> : null}
                    <td className="py-2 text-right">−{money(t.reducedBy, doc.currency)}</td>
                  </tr>
                </>
              ) : null}
              <tr className="border-b border-neutral-200 font-semibold">
                <td className="py-2">{t.reducedBy > 0 ? "Adjusted subtotal" : "Subtotal"}</td>
                <td className="py-2" />
                {t.hasDiscount ? (
                  <td className="py-2 text-right text-neutral-400 line-through">
                    {money(t.standardSubtotal, doc.currency)}
                  </td>
                ) : null}
                <td className="py-2 text-right">{money(t.subtotal, doc.currency)}</td>
              </tr>

              {t.hasDiscount ? (
                <tr className="border-b border-neutral-100">
                  <td className="py-2">You save</td>
                  <td className="py-2" />
                  <td className="py-2" />
                  <td className="py-2 text-right font-medium">−{money(t.savings, doc.currency)}</td>
                </tr>
              ) : null}
              <tr className="border-b border-neutral-100">
                <td className="py-2">{t.taxLabel}</td>
                <td className="py-2" />
                {t.hasDiscount ? (
                  <td className="py-2 text-right text-neutral-400 line-through">
                    {money(t.standardTax, doc.currency)}
                  </td>
                ) : null}
                <td className="py-2 text-right">{money(t.tax, doc.currency)}</td>
              </tr>
              <tr className="text-[13px] font-bold">
                <td className="py-2.5">Total (incl. tax) {doc.currency}</td>
                <td className="py-2.5" />
                {t.hasDiscount ? (
                  <td className="py-2.5 text-right text-neutral-400 line-through">
                    {money(t.standardTotal, doc.currency)}
                  </td>
                ) : null}
                <td className="py-2.5 text-right">{money(t.total, doc.currency)}</td>
              </tr>

            </tbody>
          </table>

          <div className="space-y-2 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">Payment schedule</p>
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  <th className="py-2">Milestone</th>
                  <th className="py-2">Due</th>
                  <th className="py-2 text-right">Tax</th>
                  <th className="py-2 text-right">Amount due ({doc.currency})</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((s) => (
                  <tr key={s.id} className="border-b border-neutral-100 align-top">
                    <td className="py-2 pr-4">
                      {s.percent}% {s.label.toLowerCase()}
                    </td>
                    <td className="py-2 pr-4 text-neutral-600">{s.dueLabel}</td>
                    <td className="py-2 text-right">{money(s.tax, doc.currency)}</td>
                    <td className="py-2 text-right font-medium">{money(s.amount, doc.currency)}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2">Total</td>
                  <td className="py-2" />
                  <td className="py-2 text-right">{money(t.tax, doc.currency)}</td>
                  <td className="py-2 text-right">{money(t.total, doc.currency)}</td>
                </tr>
              </tbody>
            </table>
            {t.hasDiscount ? (
              <p className="text-[11px] text-neutral-500">
                Savings vs. standard rate: {money(t.savings, doc.currency)} (≈{t.savingsPercent}% off).
              </p>
            ) : null}
          </div>
        </section>

        <section className="space-y-2">
          <H n={5}>{isPurchase ? "Production, Delivery & Title" : "Shipping & Logistics"}</H>
          <Bullets items={doc.shipping} />
        </section>

        <section className="space-y-2">
          <H n={6}>{isPurchase ? "Not Included" : "Show Services (Excluded)"}</H>
          <Bullets items={doc.exclusions} />
          {!isPurchase ? (
            <p className="pt-1 text-[12px] text-neutral-600">
              Traction X will supply weight-load, electrical spec and floor-plan documentation for submission to the
              official contractor.
            </p>
          ) : null}
        </section>

        <section className="space-y-2">
          <H n={7}>{isPurchase ? "Artwork & Proofing" : "Pre-Ship QC"}</H>
          <Bullets items={doc.qcSteps} />
        </section>

        <section className="space-y-2">
          <H n={8}>Payment Terms</H>
          <Bullets
            items={[
              ...stages.map(
                (s) => `${s.percent}% ${s.label.toLowerCase()} (${money(s.amount, doc.currency)} incl. tax) — ${s.dueLabel}`,
              ),
              t.taxLabel,
              `All figures in ${doc.currency}`,
              ...(doc.offer.enabled
                ? [`Discounted pricing lapses after ${formatDate(doc.offer.expiresOn)}; standard rates then apply.`]
                : []),
            ]}
          />
        </section>

        <section className="space-y-2">
          <H n={9}>Assumptions</H>
          <Bullets items={doc.assumptions} />
        </section>

        {isEstimate ? (
          <section className="space-y-2">
            <H n={10}>Validity</H>
            <p>
              This is a budgetary estimate, not a contract. Pricing is held for 30 days from{" "}
              {formatDate(doc.invoiceDate)} and is confirmed on a signed Statement of Work. Final numbers may move with
              scope, show dates and venue requirements.
            </p>
          </section>
        ) : (
        <section className="space-y-4">
          <H n={10}>Acknowledgement</H>
          <p>
            By signing below, {doc.clientName} authorizes Traction X to proceed with the scope, deliverables and pricing
            described in this document, subject to the payment terms above.
          </p>
          <div className="grid gap-8 pt-2 sm:grid-cols-2">
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                For {doc.clientName}
              </p>
              {doc.signature ? (
                <>
                  <SignedLine label="Name" value={doc.signature.signerName} />
                  <SignedLine label="Title" value={doc.signature.signerTitle} />
                  <SignedLine label="Signature" value={doc.signature.typed} script />
                  <SignedLine label="Date" value={formatDate(doc.signature.signedAt)} />
                </>
              ) : (
                <>
                  <BlankLine label="Name" />
                  <BlankLine label="Title" />
                  <BlankLine label="Signature" />
                  <BlankLine label="Date" />
                </>
              )}
            </div>
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">For Traction X</p>
              <SignedLine label="Name" value={signerName} />
              <SignedLine label="Title" value={signerTitle} />
              <SignedLine label="Signature" value={signerName} script />
              <SignedLine label="Date" value={formatDate(doc.invoiceDate)} />
            </div>
          </div>
          <p className="text-[11px] text-neutral-500">
            For questions on this document, contact {signerName} at {doc.signatoryEmail || settings.email} or{" "}
            {settings.phone}.
          </p>
        </section>
        )}
      </Sheet>

      {isEstimate ? null : (
      <Sheet label="Deposit Invoice">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">Deposit Invoice</p>
          <h1 className="mt-2 text-xl font-bold tracking-tight">
            {deposit ? `${deposit.percent}% deposit — ${doc.title}` : doc.title}
          </h1>
          <p className="mt-1 text-neutral-600">
            Payable to {settings.legalName}
            {deposit ? ` · Due ${deposit.dueLabel}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-neutral-200 py-5">
          <Meta label="Invoice #" value={doc.invoiceNumber} />
          <Meta label="Invoice date" value={formatDate(doc.invoiceDate)} />
          <Meta label="Due" value={deposit?.dueLabel ?? "On receipt"} />
          <Meta label="Currency" value={doc.currency} />
          <Meta label="Bill to" value={`${doc.clientName}\n${doc.billingAddress}`} />
          <Meta label="Remit from" value={`${settings.legalName}, ${settings.address}`} />
          <Meta
            label="Reference on payment"
            value={[doc.invoiceNumber, doc.clientName, doc.showName].filter(Boolean).join(" · ")}
          />
          <Meta label="Terms" value={stages.map((s) => `${s.percent}% ${s.label.toLowerCase()} — ${s.dueLabel}`).join(" · ")} />
          <Meta label="Tax" value={t.taxLabel} />
          <Meta label="Amount due on signature" value={money(deposit?.amount ?? t.total, doc.currency)} />
        </div>

        {doc.lineItems.length ? (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">Items covered</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {doc.lineItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded border border-neutral-200 p-2">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-12 w-16 shrink-0 rounded object-cover"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium">{item.label}</p>
                    <p className="text-[10px] text-neutral-500">
                      {lineQty(item)} × {money(effectiveRate(item), doc.currency)} ={" "}
                      {money(lineTotal(item), doc.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}


        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-[0.12em] text-neutral-500">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount ({doc.currency})</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="py-2 pr-6">
                {deposit ? `${deposit.percent}% deposit — ${doc.title}` : doc.title}
                <span className="mt-1 block text-neutral-500">
                  Per {isPurchase ? "purchase agreement" : "signed SOW"} dated {formatDate(doc.invoiceDate)}. Reference{" "}
                  {doc.invoiceNumber} on all payments.
                </span>
              </td>
              <td className="py-2 text-right font-medium">
                {money(deposit ? (t.subtotal * deposit.percent) / 100 : t.subtotal, doc.currency)}
              </td>
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="py-2">{t.taxLabel}</td>
              <td className="py-2 text-right">
                {money(deposit ? (t.tax * deposit.percent) / 100 : t.tax, doc.currency)}
              </td>
            </tr>
            <tr className="text-[13px] font-bold">
              <td className="py-2.5">Amount due</td>
              <td className="py-2.5 text-right">{money(deposit?.amount ?? t.total, doc.currency)}</td>
            </tr>
          </tbody>
        </table>

        {balance ? (
          <p className="text-[12px] text-neutral-600">
            Remaining {balance.percent}% balance of {money(balance.amount, doc.currency)} (incl. tax) is invoiced
            separately and is due {balance.dueLabel.toLowerCase()}.
          </p>
        ) : null}

        <section className="space-y-3">
          <H n="+">Payment Methods</H>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Wire / EFT</p>
              <p className="mt-1 whitespace-pre-line text-[11px] leading-5">
                {`Beneficiary: ${settings.bank.beneficiaryName || settings.legalName}\n${settings.bank.name}\n${settings.bank.address}\nInstitution #: ${settings.bank.institution}\nTransit #: ${settings.bank.transit}\nAccount #: ${settings.bank.account}\nSWIFT: ${settings.bank.swift}`}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Interac e-Transfer</p>
              <p className="mt-1 text-[11px] leading-5">
                {settings.etransferEmail}
                <br />
                Auto-deposit enabled — no security question.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Cheque</p>
              <p className="mt-1 text-[11px] leading-5">
                Payable to {settings.chequePayee}
                <br />
                {settings.address}
                <br />
                Memo: {doc.invoiceNumber}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500">
            {settings.taxRegistration}. Questions: {settings.email} or {settings.phone}.
          </p>
        </section>
      </Sheet>
      )}
    </div>
  );
}

function BlankLine({ label }: { label: string }) {
  return (
    <div>
      <div className="h-5 border-b border-neutral-400" />
      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-neutral-400">{label}</p>
    </div>
  );
}

function SignedLine({ label, value, script }: { label: string; value: string; script?: boolean }) {
  return (
    <div>
      <div className={`flex h-5 items-end border-b border-neutral-400 ${script ? "italic" : ""}`}>
        <span className={script ? "font-serif text-[15px]" : ""}>{value}</span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-neutral-400">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Invoice                                                                     */
/* -------------------------------------------------------------------------- */

function InvoiceSheet({
  doc,
  taxRegions,
  settings,
}: {
  doc: DocumentRecord;
  taxRegions: TaxRegion[];
  settings: CompanySettings;
}) {
  const t = computeTotals(doc, taxRegions);
  const paid = !!doc.paidAt;

  return (
    <div className="space-y-6">
      <Sheet label="Invoice">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400">Invoice</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">{doc.title}</h1>
            <p className="mt-1 text-neutral-600">
              {[doc.showName, doc.city].filter(Boolean).join(" · ") || settings.legalName}
            </p>
          </div>
          <div
            className={`shrink-0 rounded border px-3 py-2 text-right ${
              paid ? "border-emerald-600 text-emerald-700" : "border-neutral-300 text-neutral-700"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
              {paid ? "Paid in full" : "Amount due"}
            </p>
            <p className="mt-1 text-lg font-bold tracking-tight">{money(t.total, doc.currency)}</p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-neutral-200 py-5 sm:grid-cols-3">
          <Meta label="Invoice #" value={doc.invoiceNumber} />
          <Meta label="Invoice date" value={formatDate(doc.invoiceDate)} />
          <Meta label="Due date" value={doc.dueDate ? formatDate(doc.dueDate) : "On receipt"} />
          <Meta label="Bill to" value={`${doc.clientName}${doc.billingAddress ? ` · ${doc.billingAddress}` : ""}`} />
          <Meta label="Remit to" value={`${settings.legalName}, ${settings.address}`} />
          <Meta label="Currency & tax" value={`${doc.currency} · ${t.taxLabel}`} />
        </div>

        {doc.overview ? <p className="text-neutral-700">{doc.overview}</p> : null}

        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-neutral-300 text-left text-[10px] uppercase tracking-[0.12em] text-neutral-500">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount ({doc.currency})</th>
            </tr>
          </thead>
          <tbody>
            {doc.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-neutral-100 align-top">
                <td className="py-2.5 pr-6">
                  <p className="font-medium">{item.label}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">{item.description}</p>
                  ) : null}
                  {lineQty(item) > 1 ? (
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      {lineQty(item)} × {money(effectiveRate(item), doc.currency)}
                    </p>
                  ) : null}
                </td>
                <td className="py-2.5 text-right font-medium">{money(lineTotal(item), doc.currency)}</td>
              </tr>
            ))}
            <tr className="border-b border-neutral-100">
              <td className="py-2">Subtotal</td>
              <td className="py-2 text-right">{money(t.subtotal, doc.currency)}</td>
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="py-2">{t.taxLabel}</td>
              <td className="py-2 text-right">{money(t.tax, doc.currency)}</td>
            </tr>
            <tr className="text-[13px] font-bold">
              <td className="py-2.5">{paid ? "Paid in full" : "Amount due"} {doc.currency}</td>
              <td className="py-2.5 text-right">{money(t.total, doc.currency)}</td>
            </tr>
          </tbody>
        </table>

        {paid ? (
          <p className="text-[12px] text-emerald-700">
            Payment received {formatDate(doc.paidAt!)}
            {doc.paymentRef ? ` — reference ${doc.paymentRef}` : ""}. Thank you.
          </p>
        ) : null}

        {doc.configuration.length ? (
          <section className="space-y-2">
            <H n="+">What this covers</H>
            <Bullets items={doc.configuration} />
          </section>
        ) : null}

        <section className="space-y-3">
          <H n="+">Payment Methods</H>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Wire / EFT</p>
              <p className="mt-1 whitespace-pre-line text-[11px] leading-5">
                {`Beneficiary: ${settings.bank.beneficiaryName || settings.legalName}\n${settings.bank.name}\n${settings.bank.address}\nInstitution #: ${settings.bank.institution}\nTransit #: ${settings.bank.transit}\nAccount #: ${settings.bank.account}\nSWIFT: ${settings.bank.swift}`}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Interac e-Transfer</p>
              <p className="mt-1 text-[11px] leading-5">
                {settings.etransferEmail}
                <br />
                Auto-deposit enabled — no security question.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">Cheque</p>
              <p className="mt-1 text-[11px] leading-5">
                Payable to {settings.chequePayee}
                <br />
                {settings.address}
                <br />
                Memo: {doc.invoiceNumber}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500">
            {settings.taxRegistration}. Questions: {settings.email} or {settings.phone}.
          </p>
        </section>
      </Sheet>
    </div>
  );
}
