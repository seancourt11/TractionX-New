import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeading } from "@/components/admin/AdminLayout";
import { useAdmin } from "@/lib/admin/store";
import { documentFromLead } from "@/lib/admin/from-lead";
import { formatDateTime, moneyShort } from "@/lib/admin/doc-math";
import { LEAD_STATUS_LABEL, SYNC_STATUS_LABEL, type Lead, type LeadStatus } from "@/data/admin-demo/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search, Zap } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/leads")({ component: LeadsPage });

const STATUSES: LeadStatus[] = ["new", "working", "quoted", "won", "lost"];

function LeadsPage() {
  const { leads, documents, snippets, updateLead, retrySync, createDocument } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (!needle) return true;
      return [l.name, l.company, l.email, l.city, l.showName, l.footprint]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [leads, q, status]);

  const active = leads.find((l) => l.id === openId) ?? null;

  function convert(lead: Lead, type: "rental_sow" | "purchase_agreement") {
    const doc = documentFromLead(lead, snippets, documents.length + 1, type);
    createDocument(doc);
    updateLead(lead.id, { status: "quoted" });
    toast.success("Draft created from lead", { description: doc.invoiceNumber });
    navigate({ to: "/admin/documents/$id", params: { id: doc.id } });
  }

  return (
    <>
      <PageHeading
        title="Leads"
        subtitle="Every quote-modal, calculator and pricing-guide submission, with its JobForge delivery state."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company, show, city…"
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
          <SelectTrigger className="w-[170px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {LEAD_STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Show / city</th>
              <th className="px-4 py-3">Configuration</th>
              <th className="px-4 py-3 text-right">Estimate</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">JobForge</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <button className="text-left" onClick={() => setOpenId(lead.id)}>
                    <span className="font-medium hover:text-primary">{lead.company || lead.name}</span>
                    <span className="block text-xs text-muted-foreground">{lead.name} · {lead.email}</span>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className="block">{lead.showName || "—"}</span>
                  <span className="block text-xs text-muted-foreground">
                    {lead.city}
                    {lead.rushApplied ? " · rush" : ""}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {lead.footprint} · {lead.tier}
                  {lead.addons.length ? ` · ${lead.addons.length} add-ons` : ""}
                </td>
                <td className="px-4 py-3 text-right font-medium">{moneyShort(lead.estimate, lead.currency)}</td>
                <td className="px-4 py-3">
                  {typeof lead.planScore === "number" ? (
                    <Badge variant={lead.planScore >= 70 ? "default" : "secondary"}>
                      {lead.planScore} · {lead.planBand ?? ""}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Select value={lead.status} onValueChange={(v) => updateLead(lead.id, { status: v as LeadStatus })}>
                    <SelectTrigger className="h-8 w-[118px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {LEAD_STATUS_LABEL[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <SyncCell lead={lead} onRetry={() => retrySync(lead.id)} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setOpenId(lead.id)}>
                    <Zap className="h-3.5 w-3.5" /> Convert
                  </Button>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No leads match that filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </Card>

      <Sheet open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active ? (
            <>
              <SheetHeader>
                <SheetTitle className="font-heading">{active.company || active.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6 text-sm">
                <dl className="grid grid-cols-2 gap-4">
                  <Field
                    label="Contact"
                    value={`${active.name}\n${active.email}\n${active.phone}${active.smsOptIn ? "\nTexting OK — opted in" : "\nNo SMS consent — call or email"}`}
                  />
                  <Field label="Received" value={formatDateTime(active.createdAt)} />
                  <Field label="City" value={active.city} />
                  <Field label="Show" value={`${active.showName || "—"}\n${active.showDate || ""}`} />
                  <Field label="Footprint" value={`${active.footprint} · ${active.build}`} />
                  <Field label="Finish" value={active.tier} />
                  <Field label="Add-ons" value={active.addons.join("\n") || "None"} />
                  <Field
                    label="Estimate"
                    value={`${moneyShort(active.estimate, active.currency)} ${active.currency}${active.rushApplied ? "\nIncludes 30% rush" : ""}`}
                  />
                  <Field label="Source" value={`${active.sourcePage}\n${active.utmSource}`} />
                  {typeof active.planScore === "number" ? (
                    <Field
                      label="Booth plan"
                      value={`${active.planScore}/100 · ${active.planBand ?? ""}${active.planRecommendation ? `\n${active.planRecommendation}` : ""}`}
                    />
                  ) : null}
                  <Field
                    label="JobForge"
                    value={`${SYNC_STATUS_LABEL[active.sync.status]}${active.sync.jobforgeId ? `\n${active.sync.jobforgeId}` : ""}${active.sync.error ? `\n${active.sync.error}` : ""}`}
                  />
                </dl>

                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Internal notes
                  </p>
                  <Textarea
                    rows={4}
                    value={active.notes}
                    onChange={(e) => updateLead(active.id, { notes: e.target.value })}
                  />
                </div>

                <div className="space-y-2 rounded-lg border border-border/60 p-4">
                  <p className="text-sm font-medium">Generate a document</p>
                  <p className="text-xs text-muted-foreground">
                    Pre-fills client, show, footprint, finish, add-ons, tax region and pricing. You only edit what's
                    wrong.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button size="sm" onClick={() => convert(active, "rental_sow")}>
                      Rental SOW
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => convert(active, "purchase_agreement")}>
                      Purchase agreement
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 whitespace-pre-line text-sm">{value || "—"}</dd>
    </div>
  );
}

function SyncCell({ lead, onRetry }: { lead: Lead; onRetry: () => void }) {
  const tone: Record<string, string> = {
    synced: "border-emerald-500/50 text-emerald-400",
    pending: "border-amber-500/50 text-amber-400",
    failed: "border-destructive/60 text-destructive",
    not_configured: "border-border text-muted-foreground",
  };
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${tone[lead.sync.status]}`}>
        {SYNC_STATUS_LABEL[lead.sync.status]}
      </Badge>
      {lead.sync.status === "failed" || lead.sync.status === "pending" ? (
        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={onRetry} aria-label="Retry sync">
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
