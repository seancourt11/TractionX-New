import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminProvider, useAdmin } from "@/lib/admin/store";
import { DocumentPreview } from "@/components/admin/DocumentPreview";
import { computeTotals, formatDate, money } from "@/lib/admin/doc-math";
import { isOverdue } from "@/lib/admin/invoice";
import { noindexMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Printer, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/invoice/$token")({
  head: () => ({ meta: [{ title: "Your invoice — Traction X" }, ...noindexMeta()] }),
  component: () => (
    <AdminProvider>
      <InvoicePage />
    </AdminProvider>
  ),
});

function InvoicePage() {
  const { token } = Route.useParams();
  const { documents, taxRegions, settings, hydrated, updateDocument, logEvent } = useAdmin();
  const doc = documents.find((d) => d.token === token && d.type === "invoice");

  const [reference, setReference] = useState("");
  const [sent, setSent] = useState(false);

  if (!hydrated) return null;

  if (!doc) {
    return (
      <div className="mx-auto max-w-lg px-6 py-28 text-center">
        <h1 className="font-heading text-2xl font-bold">This invoice link is no longer active</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It may have been replaced or already settled. Contact your project manager at {settings.email}.
        </p>
        <Button asChild className="mt-6" size="sm">
          <Link to="/">Back to tractionx.ca</Link>
        </Button>
      </div>
    );
  }

  const totals = computeTotals(doc, taxRegions);
  const paid = !!doc.paidAt;

  function notifyPayment() {
    updateDocument(doc!.id, { paymentRef: reference.trim() });
    logEvent(
      doc!.id,
      `Client reported payment sent${reference.trim() ? ` — reference ${reference.trim()}` : ""}`,
    );
    setSent(true);
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border/60 px-4 py-4 lg:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link to="/" className="font-heading text-sm font-bold uppercase tracking-[0.2em]">
            Traction X
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure invoice link
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {paid ? "Paid invoice" : isOverdue(doc) ? "Overdue invoice" : "Invoice"}
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight">{doc.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {money(totals.total, doc.currency)} {doc.currency} incl. tax · Invoice {doc.invoiceNumber}
              {doc.dueDate ? ` · Due ${formatDate(doc.dueDate)}` : ""}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        <DocumentPreview doc={doc} taxRegions={taxRegions} settings={settings} />

        <div className="mt-8 rounded-lg border border-border/60 bg-card/50 p-6">
          {paid ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-medium">Payment received — thank you.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Settled {formatDate(doc.paidAt!)}
                  {doc.paymentRef ? ` · reference ${doc.paymentRef}` : ""}. A receipt is on file with this invoice.
                </p>
              </div>
            </div>
          ) : sent ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-medium">Thanks — we&apos;ll confirm once it lands.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your project manager will mark this invoice paid as soon as the funds clear, usually one to
                  two business days for EFT.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.14em]">Paid it already?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Send the payment by EFT, e-transfer or cheque using the details on the invoice, then tell us the
                reference so we can match it quickly.
              </p>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <div className="min-w-[240px] flex-1">
                  <Label className="text-xs">Payment reference (optional)</Label>
                  <Input
                    className="mt-1.5"
                    placeholder="Cheque #, EFT trace or confirmation code"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
                <Button onClick={notifyPayment}>I&apos;ve sent payment</Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Questions about this invoice? Email {settings.email} or call {settings.phone}.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
