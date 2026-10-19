import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminProvider, useAdmin } from "@/lib/admin/store";
import { DocumentPreview } from "@/components/admin/DocumentPreview";
import { computeStages, computeTotals, money } from "@/lib/admin/doc-math";
import { noindexMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Printer, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/sign/$token")({
  head: () => ({ meta: [{ title: "Review & sign — Traction X" }, ...noindexMeta()] }),
  component: () => (
    <AdminProvider>
      <SignPage />
    </AdminProvider>
  ),
});

function SignPage() {
  const { token } = Route.useParams();
  const { documents, taxRegions, settings, hydrated, updateDocument, logEvent } = useAdmin();
  const doc = documents.find((d) => d.token === token);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [agreed, setAgreed] = useState(false);

  if (!hydrated) return null;

  if (!doc) {
    return (
      <Centered>
        <h1 className="font-heading text-2xl font-bold">This link is no longer active</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The document may have been withdrawn or replaced. Contact your project manager at {settings.email}.
        </p>
        <Button asChild className="mt-6" size="sm">
          <Link to="/">Back to tractionx.ca</Link>
        </Button>
      </Centered>
    );
  }

  const totals = computeTotals(doc, taxRegions);
  const deposit = computeStages(doc, totals.total)[0];
  const signed = !!doc.signature;

  function sign() {
    updateDocument(doc!.id, {
      status: "signed",
      signature: {
        signerName: name.trim(),
        signerTitle: title.trim(),
        signedAt: new Date().toISOString(),
        ipAddress: "203.0.113.44",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 60) : "unknown",
        typed: name.trim(),
      },
    });
    logEvent(doc!.id, `Signed by ${name.trim()}${title.trim() ? `, ${title.trim()}` : ""}`);
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
            Secure document link
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {signed ? "Signed copy" : "Review & sign"}
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight">{doc.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Total {money(totals.total, doc.currency)} {doc.currency} incl. tax
              {deposit ? ` · ${deposit.percent}% deposit ${money(deposit.amount, doc.currency)} due ${deposit.dueLabel.toLowerCase()}` : ""}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        <DocumentPreview doc={doc} taxRegions={taxRegions} settings={settings} />

        <div className="mt-8 rounded-lg border border-border/60 bg-card/50 p-6">
          {signed ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-medium">Signed — thank you.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A countersigned copy and the deposit invoice ({doc.invoiceNumber}) have been emailed to{" "}
                  {doc.clientEmail || "your contact address"}. Your project manager will confirm the production
                  schedule within one business day.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.14em]">Sign this document</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Typing your name below constitutes a legally binding electronic signature and authorizes Traction X to
                begin work under the terms above.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs">Full name</Label>
                  <Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
                <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-0.5" />
                <span className="text-muted-foreground">
                  I have authority to bind {doc.clientName || "my organization"} and accept the scope, pricing and
                  payment terms in this document.
                </span>
              </label>
              <Button className="mt-5" disabled={!name.trim() || !agreed} onClick={sign}>
                Sign and return
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Signature, timestamp and IP address are recorded on the audit trail.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6 text-center">
      <div className="max-w-md">{children}</div>
    </div>
  );
}
