import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { noindexMeta } from "@/lib/seo";
import { money } from "@/lib/estimator";
import {
  listDeals,
  updateDeal,
  deleteDeal,
  quoteUrl,
  portalUrl,
  PIPELINE,
  STAGE_LABEL,
  type Deal,
  type DealStage,
} from "@/lib/deal";
import { optionById } from "@/lib/quote";
import { useAdmin } from "@/lib/admin/store";
import { documentFromLead } from "@/lib/admin/from-lead";
import { invoicesForDeal, summarise } from "@/lib/admin/invoice";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Lead } from "@/data/admin-demo/types";

export const Route = createFileRoute("/admin/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline — Traction X workspace" },
      { name: "description", content: "Every live deal by stage, with quote value and client links." },
      ...noindexMeta(),
    ],
  }),
  component: PipelinePage,
});

function value(deal: Deal): number {
  if (deal.acceptedValue) return deal.acceptedValue;
  const opt = optionById(deal, deal.selectedOption ?? deal.config.finish);
  return opt?.subtotal ?? 0;
}

function dealToLead(deal: Deal): Lead {
  return {
    id: deal.ref,
    createdAt: deal.createdAt,
    name: deal.contact.name,
    email: deal.contact.email,
    phone: deal.contact.phone,
    company: deal.contact.company,
    city: deal.city,
    showName: deal.show,
    showDate: deal.showDate,
    footprint: deal.config.footprint,
    build: deal.config.build,
    tier: deal.selectedOption ?? deal.config.finish,
    addons: deal.config.addons,
    estimate: value(deal),
    currency: "USD",
    rushApplied: false,
    sourcePage: "/booth-cost-calculator",
    utmSource: "",
    status: "quoted",
    notes: deal.brief,
    sync: { status: "synced" },
  };
}

function PipelinePage() {
  const { snippets, documents, createDocument } = useAdmin();
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDeals(listDeals());
    setReady(true);
  }, []);

  const columns = useMemo(
    () =>
      PIPELINE.map((stage) => ({
        stage,
        items: deals.filter((d) => d.stage === stage),
      })),
    [deals],
  );

  const total = deals.reduce((sum, d) => sum + value(d), 0);
  const won = deals.filter((d) => ["accepted", "contract_sent", "signed", "in_production", "complete"].includes(d.stage));

  function move(deal: Deal, stage: DealStage) {
    updateDeal(deal.ref, { stage }, { at: new Date().toISOString(), label: `Moved to ${STAGE_LABEL[stage]}`, by: "tractionx" });
    setDeals(listDeals());
  }

  function createSow(deal: Deal) {
    const doc = {
      ...documentFromLead(
        dealToLead(deal),
        snippets,
        documents.length + 1,
        deal.config.build === "rental" ? "rental_sow" : "purchase_agreement",
      ),
      dealRef: deal.ref,
    };
    createDocument(doc);
    move(deal, "contract_sent");
    toast.success("Draft contract created", { description: `${deal.ref} → ${doc.invoiceNumber}` });
    void navigate({ to: "/admin/documents/$id", params: { id: doc.id } });
  }

  if (!ready) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Pipeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every deal created from the site estimator, live on this device. Move a card as the deal
            progresses; the client&apos;s quote and portal links stay the same throughout.
          </p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Open value</p>
            <p className="font-heading text-xl font-bold">{money(total)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Accepted</p>
            <p className="font-heading text-xl font-bold">{won.length}</p>
          </div>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/70 p-10 text-center">
          <p className="font-heading text-lg font-semibold">No deals yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Deals appear here as soon as a visitor unlocks an itemized breakdown in the booth cost
            calculator. Try it yourself to see the full flow.
          </p>
          <Button asChild className="mt-5">
            <a href="/booth-cost-calculator">Open the calculator</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 overflow-x-auto lg:grid-cols-3 xl:grid-cols-4">
          {columns.map((col) => (
            <div key={col.stage} className="rounded-xl border border-border/60 bg-card/40 p-3">
              <div className="flex items-center justify-between px-1 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {STAGE_LABEL[col.stage]}
                </p>
                <Badge variant="outline" className="text-[10px]">
                  {col.items.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {col.items.map((deal) => (
                  <div key={deal.ref} className="rounded-lg border border-border/60 bg-background p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {deal.contact.company || deal.contact.name || "Unnamed"}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">{deal.ref}</p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-bold text-primary">{money(value(deal))}</p>
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      {deal.config.footprint.replace("x", " × ")} ft ·{" "}
                      {deal.config.build === "rental" ? "Rental" : "Owned"}
                      {deal.show ? ` · ${deal.show}` : ""}
                      {deal.city ? ` · ${deal.city}` : ""}
                    </p>
                    {deal.contact.email && (
                      <p className="mt-1 truncate text-[11px] text-muted-foreground">{deal.contact.email}</p>
                    )}
                    <Billing dealRef={deal.ref} />
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <a
                        href={quoteUrl(deal)}
                        className="rounded border border-border/70 px-2 py-1 text-[10px] hover:border-primary/60"
                      >
                        Quote
                      </a>
                      <a
                        href={portalUrl(deal)}
                        className="rounded border border-border/70 px-2 py-1 text-[10px] hover:border-primary/60"
                      >
                        Portal
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard.writeText(quoteUrl(deal));
                        }}
                        className="rounded border border-border/70 px-2 py-1 text-[10px] hover:border-primary/60"
                      >
                        Copy link
                      </button>
                      {["accepted", "changes_requested"].includes(deal.stage) && (
                        <button
                          type="button"
                          onClick={() => createSow(deal)}
                          className="rounded border border-primary/50 bg-primary/10 px-2 py-1 text-[10px] text-primary hover:bg-primary/20"
                        >
                          Create SOW
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          deleteDeal(deal.ref);
                          setDeals(listDeals());
                        }}
                        className="rounded border border-border/70 px-2 py-1 text-[10px] text-muted-foreground hover:border-destructive/60"
                      >
                        Delete
                      </button>
                    </div>
                    <select
                      value={deal.stage}
                      onChange={(e) => move(deal, e.target.value as DealStage)}
                      className="mt-2 w-full rounded border border-border/70 bg-background px-2 py-1 text-[11px]"
                      aria-label={`Stage for ${deal.ref}`}
                    >
                      {(Object.keys(STAGE_LABEL) as DealStage[]).map((s) => (
                        <option key={s} value={s}>
                          {STAGE_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {col.items.length === 0 && (
                  <p className="px-1 py-3 text-[11px] text-muted-foreground">Nothing here yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Billing({ dealRef }: { dealRef: string }) {
  const { documents, taxRegions } = useAdmin();
  const invoices = invoicesForDeal(documents, dealRef);
  if (!invoices.length) return null;
  const contract = documents.find((d) => d.type !== "invoice" && (d.dealRef === dealRef || d.leadId === dealRef));
  const s = summarise(contract, invoices, taxRegions);
  return (
    <p className="mt-1.5 text-[11px] text-muted-foreground">
      Invoiced {money(s.billed)} · collected {money(s.collected)}
      {s.overdue > 0 ? <span className="text-destructive"> · {money(s.overdue)} overdue</span> : null}
    </p>
  );
}
