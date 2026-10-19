import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdmin } from "@/lib/admin/store";
import { DocumentPreview } from "@/components/admin/DocumentPreview";
import { CatalogPicker } from "@/components/admin/CatalogPicker";
import { computeStages, computeTotals, effectiveRate, formatDateTime, lineTotal, money } from "@/lib/admin/doc-math";

import { StatusBadge } from "@/routes/admin.index";
import { invoiceForStage, invoicesFor, isOverdue, summarise } from "@/lib/admin/invoice";
import {
  DOC_TYPE_LABEL,
  type DocumentRecord,
  type LineItem,
  type PaymentStage,
} from "@/data/admin-demo/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookmarkPlus, Copy, Image as ImageIcon, Plus, Printer, Send, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/documents/$id")({ component: DocumentBuilder });

function DocumentBuilder() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { documents, taxRegions, settings, snippets, updateDocument, deleteDocument, logEvent, saveTemplate } = useAdmin();
  const doc = documents.find((d) => d.id === id);
  const [tab, setTab] = useState("details");

  const totals = useMemo(() => (doc ? computeTotals(doc, taxRegions) : null), [doc, taxRegions]);

  if (!doc || !totals) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-muted-foreground">This document no longer exists.</p>
        <Button asChild className="mt-4" size="sm">
          <Link to="/admin/documents">Back to documents</Link>
        </Button>
      </Card>
    );
  }

  const set = (patch: Partial<DocumentRecord>) => updateDocument(doc.id, patch);
  const stages = computeStages(doc, totals.total, totals);
  const signUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/sign/${doc.token}`;

  function send() {
    set({ status: "sent" });
    logEvent(doc!.id, `Sent for signature to ${doc!.clientEmail || "client"}`);
    toast.success("Marked as sent", { description: "Signing link is live on the Share tab." });
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            to="/admin/documents"
            className="mb-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Documents
          </Link>
          <h1 className="truncate font-heading text-2xl font-bold tracking-tight">{doc.title || "Untitled document"}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {DOC_TYPE_LABEL[doc.type]}
            </Badge>
            <StatusBadge status={doc.status} />
            <span className="font-mono">{doc.invoiceNumber}</span>
            <span>Updated {formatDateTime(doc.updatedAt)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => {
              const name = window.prompt("Template name", doc.title || "Untitled template");
              if (!name) return;
              saveTemplate(name, doc);
              toast.success("Saved as template", { description: "Start your next document from it on New document." });
            }}
          >
            <BookmarkPlus className="h-4 w-4" /> Save as template
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print / PDF
          </Button>
          <Button size="sm" className="gap-1.5" onClick={send} disabled={doc.status === "signed"}>
            <Send className="h-4 w-4" /> Send for signature
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4 flex w-full flex-wrap justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="scope">Scope</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>

            </TabsList>

            <TabsContent value="details">
              <Card className="space-y-4 p-5">
                <Row>
                  <FieldText label="Document title" value={doc.title} onChange={(v) => set({ title: v })} />
                  <div>
                    <Label className="text-xs">Document type</Label>
                    <Select value={doc.type} onValueChange={(v) => set({ type: v as DocumentRecord["type"] })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(DOC_TYPE_LABEL).map(([k, v]) => (
                          <SelectItem key={k} value={k}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Row>
                <Row>
                  <FieldText label="Client / legal name" value={doc.clientName} onChange={(v) => set({ clientName: v })} />
                  <FieldText label="Contact name" value={doc.clientContact} onChange={(v) => set({ clientContact: v })} />
                </Row>
                <Row>
                  <FieldText label="Contact email" value={doc.clientEmail} onChange={(v) => set({ clientEmail: v })} />
                  <FieldText label="Billing address" value={doc.billingAddress} onChange={(v) => set({ billingAddress: v })} />
                </Row>
                <Row>
                  <FieldText label="Show / event" value={doc.showName} onChange={(v) => set({ showName: v })} />
                  <FieldText label="Venue" value={doc.venue} onChange={(v) => set({ venue: v })} />
                </Row>
                <Row>
                  <FieldText label="City" value={doc.city} onChange={(v) => set({ city: v })} />
                  <FieldText label="Footprint / package" value={doc.footprint} onChange={(v) => set({ footprint: v })} />
                </Row>
                <Row>
                  <div>
                    <Label className="text-xs">Account manager (countersigns)</Label>
                    <Select
                      value={doc.signatoryName || settings.signatoryName}
                      onValueChange={(v) => {
                        const s = (settings.signatories ?? []).find((x) => x.name === v);
                        set({ signatoryName: v, signatoryTitle: s?.title ?? "", signatoryEmail: s?.email ?? "" });
                      }}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(settings.signatories ?? [{ name: settings.signatoryName, title: settings.signatoryTitle, email: settings.email }]).map((sig) => (
                          <SelectItem key={sig.name} value={sig.name}>
                            {sig.name} — {sig.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FieldText
                    label="Footprint note (printed)"
                    value={doc.footprint}
                    onChange={(v) => set({ footprint: v })}
                  />
                </Row>
                <Row>
                  <FieldText label="Invoice number" value={doc.invoiceNumber} onChange={(v) => set({ invoiceNumber: v })} />
                  <FieldText
                    label="Invoice date"
                    type="date"
                    value={doc.invoiceDate}
                    onChange={(v) => set({ invoiceDate: v })}
                  />
                </Row>
                <div>
                  <Label className="text-xs">Overview</Label>
                  <Textarea
                    className="mt-1.5"
                    rows={4}
                    value={doc.overview}
                    onChange={(e) => set({ overview: e.target.value })}
                  />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="scope" className="space-y-4">
              <ListEditor
                title="Included"
                items={doc.includedServices}
                library={snippets.includedServices}
                onChange={(v) => set({ includedServices: v })}
              />
              <ListEditor
                title="Scope & configuration"
                items={doc.configuration}
                library={snippets.configuration}
                onChange={(v) => set({ configuration: v })}
              />
              <ListEditor
                title="Shipping & logistics"
                items={doc.shipping}
                library={snippets.shipping}
                onChange={(v) => set({ shipping: v })}
              />
              <ListEditor
                title="Exclusions"
                items={doc.exclusions}
                library={snippets.exclusions}
                onChange={(v) => set({ exclusions: v })}
              />
              <ListEditor
                title="Pre-ship QC / proofing"
                items={doc.qcSteps}
                library={snippets.qcSteps}
                onChange={(v) => set({ qcSteps: v })}
              />
              <ListEditor
                title="Assumptions"
                items={doc.assumptions}
                library={snippets.assumptions}
                onChange={(v) => set({ assumptions: v })}
              />
            </TabsContent>

            <TabsContent value="pricing">
              <Card className="space-y-5 p-5">
                <Row>
                  <div>
                    <Label className="text-xs">Currency</Label>
                    <Select value={doc.currency} onValueChange={(v) => set({ currency: v as "CAD" | "USD" })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Tax region (place of supply)</Label>
                    <Select value={doc.taxRegionId} onValueChange={(v) => set({ taxRegionId: v })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {taxRegions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Row>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Quote rows</p>
                    <CatalogPicker
                      onAdd={(c) =>
                        set({
                          lineItems: [
                            ...doc.lineItems,
                            {
                              id: `li-${Date.now()}`,
                              label: c.name,
                              description: c.description,
                              sku: c.sku,
                              image: c.image,
                              qty: 1,
                              standard: c.price,
                              discounted: null,
                            } as LineItem,
                          ],
                        })
                      }
                    />
                  </div>

                  {doc.lineItems.map((item) => {
                    const patch = (p: Partial<LineItem>) =>
                      set({ lineItems: doc.lineItems.map((i) => (i.id === item.id ? { ...i, ...p } : i)) });
                    return (
                      <div key={item.id} className="rounded-lg border border-border/60 p-3">
                        <div className="flex gap-3">
                          <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted">
                            {item.image ? (
                              <img src={item.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex gap-2">
                              <Input
                                value={item.label}
                                placeholder="Description"
                                onChange={(e) => patch({ label: e.target.value })}
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                aria-label="Remove line"
                                onClick={() => set({ lineItems: doc.lineItems.filter((i) => i.id !== item.id) })}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                            <Textarea
                              rows={2}
                              placeholder="Detail line printed under the item (optional)"
                              value={item.description ?? ""}
                              onChange={(e) => patch({ description: e.target.value })}
                            />
                            <div className="grid gap-2 sm:grid-cols-[1fr_70px_110px_110px]">
                              <Input
                                value={item.sku ?? ""}
                                placeholder="SKU / design code"
                                onChange={(e) => patch({ sku: e.target.value })}
                              />
                              <Input
                                type="number"
                                min={1}
                                value={item.qty ?? 1}
                                aria-label="Quantity"
                                onChange={(e) => patch({ qty: Math.max(1, Number(e.target.value) || 1) })}
                              />
                              <Input
                                type="number"
                                value={item.standard}
                                aria-label="Standard unit rate"
                                onChange={(e) => patch({ standard: Number(e.target.value) || 0 })}
                              />
                              <Input
                                type="number"
                                placeholder="Discounted"
                                aria-label="Discounted unit rate"
                                value={item.discounted ?? ""}
                                onChange={(e) =>
                                  patch({ discounted: e.target.value === "" ? null : Number(e.target.value) })
                                }
                              />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Input
                                value={item.image ?? ""}
                                placeholder="Thumbnail image URL"
                                onChange={(e) => patch({ image: e.target.value })}
                              />
                              <span className="whitespace-nowrap text-xs text-muted-foreground">
                                Row total {money(lineTotal(item), doc.currency)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() =>
                        set({
                          lineItems: [
                            ...doc.lineItems,
                            { id: `li-${Date.now()}`, label: "", qty: 1, standard: 0, discounted: null } as LineItem,
                          ],
                        })
                      }
                    >
                      <Plus className="h-4 w-4" /> Add blank line
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        set({
                          lineItems: doc.lineItems.map((i) => ({
                            ...i,
                            discounted: Math.round(i.standard * 0.925),
                          })),
                        })
                      }
                    >
                      Apply 7.5% early-bird
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => set({ lineItems: doc.lineItems.map((i) => ({ ...i, discounted: null })) })}
                    >
                      Clear discounts
                    </Button>
                  </div>
                </div>


                <div className="space-y-1 rounded-lg border border-border/60 p-4 text-sm">
                  <SumRow label="Subtotal" value={money(totals.subtotal, doc.currency)} />
                  {totals.hasDiscount ? (
                    <SumRow
                      label={`Savings (≈${totals.savingsPercent}%)`}
                      value={`−${money(totals.savings, doc.currency)}`}
                    />
                  ) : null}
                  <SumRow label={totals.taxLabel} value={money(totals.tax, doc.currency)} />
                  <SumRow label={`Total ${doc.currency}`} value={money(totals.total, doc.currency)} strong />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <Card className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Time-limited offer block</p>
                    <p className="text-xs text-muted-foreground">Prints above the pricing table.</p>
                  </div>
                  <Switch
                    checked={doc.offer.enabled}
                    onCheckedChange={(v) => set({ offer: { ...doc.offer, enabled: v } })}
                  />
                </div>
                {doc.offer.enabled ? (
                  <>
                    <Row>
                      <FieldText
                        label="Headline"
                        value={doc.offer.headline}
                        onChange={(v) => set({ offer: { ...doc.offer, headline: v } })}
                      />
                      <FieldText
                        label="Expires on"
                        type="date"
                        value={doc.offer.expiresOn}
                        onChange={(v) => set({ offer: { ...doc.offer, expiresOn: v } })}
                      />
                    </Row>
                    <Row>
                      <FieldText
                        label="Reduced rate — amount off subtotal"
                        type="number"
                        value={String(doc.offer.reducedBy ?? 0)}
                        onChange={(v) => set({ offer: { ...doc.offer, reducedBy: Number(v) || 0 } })}
                      />
                      <FieldText
                        label="Required deposit %"
                        type="number"
                        value={String(doc.offer.requiredDepositPercent)}
                        onChange={(v) => set({ offer: { ...doc.offer, requiredDepositPercent: Number(v) || 0 } })}
                      />
                    </Row>
                    <div>
                      <Label className="text-xs">Conditions</Label>
                      <Textarea
                        className="mt-1.5"
                        rows={3}
                        value={doc.offer.conditions}
                        onChange={(e) => set({ offer: { ...doc.offer, conditions: e.target.value } })}
                      />
                    </div>
                  </>
                ) : null}
              </Card>

              <Card className="space-y-3 p-5">
                <p className="text-sm font-medium">Payment schedule</p>
                {doc.paymentStages.map((stage, idx) => (
                  <div key={stage.id} className="grid grid-cols-[1fr_80px_1.4fr_32px] items-center gap-2">
                    <Input
                      value={stage.label}
                      onChange={(e) => patchStage(doc, set, stage.id, { label: e.target.value })}
                    />
                    <Input
                      type="number"
                      value={stage.percent}
                      onChange={(e) => patchStage(doc, set, stage.id, { percent: Number(e.target.value) || 0 })}
                    />
                    <Input
                      value={stage.dueLabel}
                      onChange={(e) => patchStage(doc, set, stage.id, { dueLabel: e.target.value })}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Remove stage"
                      onClick={() => set({ paymentStages: doc.paymentStages.filter((s) => s.id !== stage.id) })}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <p className="col-span-4 -mt-1 text-xs text-muted-foreground">
                      Stage {idx + 1}: {money(stages[idx]?.amount ?? 0, doc.currency)} incl. tax
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() =>
                      set({
                        paymentStages: [
                          ...doc.paymentStages,
                          { id: `s-${Date.now()}`, label: "Stage", percent: 0, dueLabel: "" } as PaymentStage,
                        ],
                      })
                    }
                  >
                    <Plus className="h-4 w-4" /> Add stage
                  </Button>
                  <p
                    className={`text-xs ${
                      doc.paymentStages.reduce((s, x) => s + x.percent, 0) === 100
                        ? "text-muted-foreground"
                        : "text-destructive"
                    }`}
                  >
                    Allocated: {doc.paymentStages.reduce((s, x) => s + x.percent, 0)}%
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="share" className="space-y-4">
              <Card className="space-y-4 p-5">
                <div>
                  <p className="text-sm font-medium">Client signing link</p>
                  <p className="text-xs text-muted-foreground">
                    Unguessable token. The client sees the document and signs without an account.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input readOnly value={signUrl} className="font-mono text-xs" />
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label="Copy link"
                    onClick={() => {
                      navigator.clipboard?.writeText(signUrl);
                      toast.success("Link copied");
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/sign/$token" params={{ token: doc.token }}>
                      Open client view
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => set({ status: "draft" })}>
                    Reset to draft
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => {
                      deleteDocument(doc.id);
                      navigate({ to: "/admin/documents" });
                    }}
                  >
                    Delete document
                  </Button>
                </div>

                {doc.signature ? (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 text-xs">
                    <p className="font-medium text-emerald-400">Signed</p>
                    <p className="mt-1 text-muted-foreground">
                      {doc.signature.signerName}, {doc.signature.signerTitle} · {formatDateTime(doc.signature.signedAt)}
                      <br />
                      IP {doc.signature.ipAddress} · {doc.signature.userAgent}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Audit trail
                  </p>
                  <ol className="space-y-2">
                    {[...doc.events].reverse().map((e, i) => (
                      <li key={`${e.at}-${i}`} className="border-l border-border/70 pl-3 text-xs">
                        <p>{e.label}</p>
                        <p className="text-muted-foreground">{formatDateTime(e.at)}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <BillingPanel doc={doc} />
            </TabsContent>
          </Tabs>

        </div>

        <div className="xl:sticky xl:top-20 xl:self-start">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Live document preview
          </p>
          <div className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
            <DocumentPreview doc={doc} taxRegions={taxRegions} settings={settings} />
          </div>
        </div>
      </div>
    </>
  );
}

function patchStage(
  doc: DocumentRecord,
  set: (patch: Partial<DocumentRecord>) => void,
  id: string,
  patch: Partial<PaymentStage>,
) {
  set({ paymentStages: doc.paymentStages.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function FieldText({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Input className="mt-1.5" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SumRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "border-t border-border/60 pt-2 font-semibold" : ""}`}>
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ListEditor({
  title,
  items,
  library,
  onChange,
}: {
  title: string;
  items: string[];
  library: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const unused = library.filter((l) => !items.includes(l));

  return (
    <Card className="space-y-3 p-5">
      <p className="text-sm font-medium">{title}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={`${item}-${idx}`} className="flex items-center gap-2">
            <Input
              value={item}
              onChange={(e) => onChange(items.map((v, i) => (i === idx ? e.target.value : v)))}
            />
            <Button
              size="icon"
              variant="ghost"
              aria-label="Remove"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder="Add a line…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            if (!draft.trim()) return;
            onChange([...items, draft.trim()]);
            setDraft("");
          }}
        >
          Add
        </Button>
      </div>
      {unused.length ? (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {unused.slice(0, 8).map((clause) => (
            <button
              key={clause}
              onClick={() => onChange([...items, clause])}
              className="rounded-full border border-border/70 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              + {clause}
            </button>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Billing                                                                     */
/* -------------------------------------------------------------------------- */

function BillingPanel({ doc }: { doc: DocumentRecord }) {
  const navigate = useNavigate();
  const { documents, taxRegions, settings, createDocument, updateDocument, logEvent } = useAdmin();
  const [paymentRef, setPaymentRef] = useState("");

  if (doc.type === "invoice") {
    const t = computeTotals(doc, taxRegions);
    const parent = documents.find((d) => d.id === doc.parentId);
    return (
      <Card className="space-y-5 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium">
              {doc.paidAt ? "Paid" : isOverdue(doc) ? "Overdue" : "Outstanding"} — {money(t.total, doc.currency)}
            </p>
            <p className="text-xs text-muted-foreground">
              Invoice {doc.invoiceNumber}
              {doc.stagePercent ? ` · ${doc.stagePercent}% stage` : ""}
              {parent ? ` · against ${parent.invoiceNumber}` : ""}
            </p>
          </div>
          {parent ? (
            <Button asChild size="sm" variant="outline">
              <Link to="/admin/documents/$id" params={{ id: parent.id }}>
                Open contract
              </Link>
            </Button>
          ) : null}
        </div>

        <Row>
          <FieldText
            label="Due date"
            type="date"
            value={doc.dueDate ?? ""}
            onChange={(v) => updateDocument(doc.id, { dueDate: v })}
          />
          <div>
            <Label className="text-xs">Payment reference</Label>
            <Input
              className="mt-1.5"
              placeholder="Cheque #, EFT trace, e-transfer confirmation"
              value={doc.paymentRef ?? paymentRef}
              onChange={(e) => {
                setPaymentRef(e.target.value);
                updateDocument(doc.id, { paymentRef: e.target.value });
              }}
            />
          </div>
        </Row>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={doc.status !== "draft"}
            onClick={() => {
              updateDocument(doc.id, { status: "sent" });
              logEvent(doc.id, `Invoice sent to ${doc.clientEmail || "client"}`);
              toast.success("Invoice marked as sent");
            }}
          >
            Mark as sent
          </Button>
          {doc.paidAt ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                updateDocument(doc.id, { paidAt: undefined, status: "sent" });
                logEvent(doc.id, "Payment record reversed");
              }}
            >
              Undo payment
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                const at = new Date().toISOString();
                updateDocument(doc.id, { paidAt: at, status: "paid" });
                logEvent(doc.id, `Payment received${doc.paymentRef ? ` — ref ${doc.paymentRef}` : ""}`);
                toast.success("Marked as paid");
              }}
            >
              Mark as paid
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Client link: <span className="font-mono">/invoice/{doc.token}</span>
        </p>
      </Card>
    );
  }

  const totals = computeTotals(doc, taxRegions);
  const stages = computeStages(doc, totals.total, totals);
  const raised = invoicesFor(documents, doc.id);
  const summary = summarise(doc, raised, taxRegions);

  function issue(stageId: string) {
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return;
    const inv = {
      ...invoiceForStage(doc, stage, taxRegions, documents.length + 1, settings),
      dealRef: doc.dealRef ?? doc.leadId,
    };
    createDocument(inv);
    logEvent(doc.id, `Issued ${stage.label.toLowerCase()} invoice ${inv.invoiceNumber} (${stage.percent}%)`);
    toast.success("Invoice created", { description: `${inv.invoiceNumber} — ${money(stage.amount, doc.currency)}` });
    void navigate({ to: "/admin/documents/$id", params: { id: inv.id } });
  }

  return (
    <Card className="space-y-5 p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Contract" value={money(summary.contractTotal, doc.currency)} />
        <Stat label="Invoiced" value={money(summary.billed, doc.currency)} />
        <Stat label="Collected" value={money(summary.collected, doc.currency)} />
        <Stat label="Outstanding" value={money(summary.outstanding, doc.currency)} />
      </div>

      {doc.status !== "signed" ? (
        <p className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          This document isn&apos;t signed yet. You can still raise an invoice, but the usual flow is
          sign → deposit invoice → production.
        </p>
      ) : null}

      <div className="space-y-2">
        <p className="text-sm font-medium">Payment schedule</p>
        {stages.map((s) => {
          const inv = raised.find((i) => i.stageId === s.id);
          return (
            <div
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {s.label} · {s.percent}% · {money(s.amount, doc.currency)}
                </p>
                <p className="text-xs text-muted-foreground">{s.dueLabel}</p>
              </div>
              {inv ? (
                <div className="flex items-center gap-2">
                  <StatusBadge status={inv.status} />
                  {isOverdue(inv) ? (
                    <Badge variant="outline" className="border-destructive/50 text-[10px] uppercase text-destructive">
                      Overdue
                    </Badge>
                  ) : null}
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin/documents/$id" params={{ id: inv.id }}>
                      {inv.invoiceNumber}
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => issue(s.id)}>
                  Issue invoice
                </Button>
              )}
            </div>
          );
        })}
        {!stages.length ? (
          <p className="text-xs text-muted-foreground">Add payment stages on the Terms tab first.</p>
        ) : null}
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-heading text-sm font-bold">{value}</p>
    </div>
  );
}
