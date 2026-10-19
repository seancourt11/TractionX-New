import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeading } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/routes/admin.index";
import { useAdmin } from "@/lib/admin/store";
import { blankDocument } from "@/lib/admin/from-lead";
import { computeTotals, formatDateTime, moneyShort } from "@/lib/admin/doc-math";
import { DOC_TYPE_LABEL, type DocStatus, type DocType } from "@/data/admin-demo/types";
import { isOverdue } from "@/lib/admin/invoice";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/documents/")({ component: DocumentsPage });

const STATUSES: DocStatus[] = ["draft", "sent", "viewed", "signed", "paid", "void"];

function DocumentsPage() {
  const { documents, taxRegions, snippets, createDocument } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | DocStatus>("all");
  const [type, setType] = useState<"all" | DocType>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return documents.filter((d) => {
      if (status !== "all" && d.status !== status) return false;
      if (type !== "all" && d.type !== type) return false;
      if (!needle) return true;
      return [d.title, d.clientName, d.showName, d.invoiceNumber].join(" ").toLowerCase().includes(needle);
    });
  }, [documents, q, status, type]);

  function create(type: "rental_sow" | "purchase_agreement") {
    const doc = blankDocument(snippets, documents.length + 1, type);
    createDocument(doc);
    navigate({ to: "/admin/documents/$id", params: { id: doc.id } });
  }

  return (
    <>
      <PageHeading
        title="Documents"
        subtitle="Statements of work, purchase agreements, change orders and the invoices raised against them."
        action={
          <div className="flex gap-2">
            <Button size="sm" onClick={() => create("rental_sow")} className="gap-1.5">
              <Plus className="h-4 w-4" /> New rental SOW
            </Button>
            <Button size="sm" variant="outline" onClick={() => create("purchase_agreement")}>
              New purchase agreement
            </Button>
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search client, show, invoice #…" className="pl-9" />
        </div>
        <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
          <SelectTrigger className="w-[190px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All document types</SelectItem>
            {(Object.keys(DOC_TYPE_LABEL) as DocType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {DOC_TYPE_LABEL[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <th className="px-4 py-3">Document</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Invoice #</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => {
              const t = computeTotals(doc, taxRegions);
              return (
                <tr key={doc.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link to="/admin/documents/$id" params={{ id: doc.id }} className="font-medium hover:text-primary">
                      {doc.title || "Untitled document"}
                    </Link>
                    <span className="block text-xs text-muted-foreground">
                      {doc.clientName || "No client"} · {doc.showName || doc.city || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{DOC_TYPE_LABEL[doc.type]}</td>
                  <td className="px-4 py-3 font-mono text-xs">{doc.invoiceNumber}</td>
                  <td className="px-4 py-3 text-right font-medium">{moneyShort(t.total, doc.currency)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={doc.status} />
                    {isOverdue(doc) ? (
                      <Badge
                        variant="outline"
                        className="ml-1.5 border-destructive/50 text-[10px] uppercase tracking-wider text-destructive"
                      >
                        Overdue
                      </Badge>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatDateTime(doc.updatedAt)}</td>
                </tr>
              );
            })}
            {!filtered.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No documents match that filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </Card>
    </>
  );
}
