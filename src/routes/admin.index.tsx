import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeading } from "@/components/admin/AdminLayout";
import { useAdmin } from "@/lib/admin/store";
import { computeTotals, formatDateTime, moneyShort } from "@/lib/admin/doc-math";
import { DOC_STATUS_LABEL, LEAD_STATUS_LABEL, SYNC_STATUS_LABEL } from "@/data/admin-demo/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, FileText, Signature, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const { leads, documents, taxRegions } = useAdmin();

  const open = documents.filter((d) => d.status !== "void");
  const signed = open.filter((d) => d.status === "signed");
  const awaiting = open.filter((d) => d.status === "sent" || d.status === "viewed");
  const failedSync = leads.filter((l) => l.sync.status === "failed");
  const newLeads = leads.filter((l) => l.status === "new");

  const valueOf = (ids: typeof documents) =>
    ids.reduce((sum, d) => sum + computeTotals(d, taxRegions).total, 0);

  const feed = [
    ...documents.flatMap((d) => d.events.map((e) => ({ ...e, doc: d }))),
  ]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 8);

  return (
    <>
      <PageHeading
        title="Dashboard"
        subtitle="Quote requests coming off the website, and every document in flight."
        action={
          <Button asChild size="sm">
            <Link to="/admin/leads">
              Work the lead queue <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="New leads" value={String(newLeads.length)} note={`${leads.length} total in pipeline`} icon={Users} />
        <Stat
          label="Awaiting signature"
          value={String(awaiting.length)}
          note={`${moneyShort(valueOf(awaiting), "CAD")} out for review`}
          icon={Signature}
        />
        <Stat
          label="Signed this cycle"
          value={String(signed.length)}
          note={`${moneyShort(valueOf(signed), "CAD")} committed`}
          icon={FileText}
        />
        <Stat
          label="Sync failures"
          value={String(failedSync.length)}
          note={failedSync.length ? "Retry from the lead row" : "JobForge queue clear"}
          icon={AlertTriangle}
          alert={failedSync.length > 0}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.14em]">Documents in flight</h2>
            <Link to="/admin/documents" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {open.slice(0, 6).map((doc) => {
              const t = computeTotals(doc, taxRegions);
              return (
                <Link
                  key={doc.id}
                  to="/admin/documents/$id"
                  params={{ id: doc.id }}
                  className="flex items-center justify-between gap-4 rounded-md border border-border/60 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{doc.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {doc.invoiceNumber} · {doc.showName || doc.city || "No show set"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">{moneyShort(t.total, doc.currency)}</p>
                    <StatusBadge status={doc.status} />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.14em]">Newest quote requests</h2>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{lead.company || lead.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lead.footprint} · {lead.city} · {LEAD_STATUS_LABEL[lead.status]}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">{moneyShort(lead.estimate, lead.currency)}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {SYNC_STATUS_LABEL[lead.sync.status]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.14em]">Activity</h2>
            <ol className="space-y-3">
              {feed.map((e, i) => (
                <li key={`${e.at}-${i}`} className="border-l border-border/70 pl-3 text-xs">
                  <p className="text-foreground">{e.label}</p>
                  <p className="mt-0.5 text-muted-foreground">
                    {e.doc.invoiceNumber} · {formatDateTime(e.at)}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  note,
  icon: Icon,
  alert,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ComponentType<{ className?: string }>;
  alert?: boolean;
}) {
  return (
    <Card className={`p-5 ${alert ? "border-destructive/50" : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <Icon className={`h-4 w-4 ${alert ? "text-destructive" : "text-primary"}`} />
      </div>
      <p className="mt-3 font-heading text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </Card>
  );
}

export function StatusBadge({ status }: { status: keyof typeof DOC_STATUS_LABEL }) {
  const tone: Record<string, string> = {
    draft: "border-border text-muted-foreground",
    sent: "border-primary/50 text-primary",
    viewed: "border-primary/50 text-primary",
    signed: "border-emerald-500/50 text-emerald-400",
    paid: "border-emerald-500/50 text-emerald-400",
    void: "border-destructive/50 text-destructive",
  };
  return (
    <Badge variant="outline" className={`mt-1 text-[10px] uppercase tracking-wider ${tone[status]}`}>
      {DOC_STATUS_LABEL[status]}
    </Badge>
  );
}
