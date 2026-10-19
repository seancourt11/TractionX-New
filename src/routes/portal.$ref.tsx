import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FileAttach } from "@/components/FileAttach";
import { BookMeetingButton } from "@/components/GlobalCta";
import { noindexMeta } from "@/lib/seo";
import { submitLead } from "@/lib/leads";
import { SmsUpdatesCard } from "@/components/SmsOptIn";
import { money } from "@/lib/estimator";
import {
  resolveDeal,
  updateDeal,
  logDealEvent,
  rememberDeal,
  quoteUrl,
  STAGE_LABEL,
  PIPELINE,
  type Deal,
} from "@/lib/deal";
import { optionById, validUntil } from "@/lib/quote";
import { AdminProvider, useAdmin } from "@/lib/admin/store";
import { invoicesForDeal, isOverdue, summarise } from "@/lib/admin/invoice";
import { computeTotals, formatDate, money as docMoney } from "@/lib/admin/doc-math";

export const Route = createFileRoute("/portal/$ref")({
  head: () => ({
    meta: [
      { title: "Your Traction X project portal" },
      { name: "description", content: "Track your exhibit project: quote, contract, design approval, artwork and show timeline." },
      ...noindexMeta(),
    ],
  }),
  component: () => (
    <AdminProvider>
      <PortalPage />
    </AdminProvider>
  ),
});

const MILESTONES = [
  { stage: "quoted", title: "Quote issued", body: "Three build levels priced against your footprint and scope." },
  { stage: "accepted", title: "Option accepted", body: "You picked a build level; we prepare the statement of work." },
  { stage: "contract_sent", title: "Contract out for signature", body: "Statement of work signed online — no printing, no scanning." },
  { stage: "signed", title: "Signed — production opens", body: "Deposit invoice, 3D concept and the show work-back schedule start." },
  { stage: "in_production", title: "In production", body: "Fabrication, graphics print and pre-build QA photos." },
  { stage: "complete", title: "Installed and shown", body: "Freight, install and dismantle complete — storage and reconfiguration next." },
] as const;

function PortalPage() {
  const { ref } = Route.useParams();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [ready, setReady] = useState(false);
  const [artwork, setArtwork] = useState<File[]>([]);
  const [artworkSent, setArtworkSent] = useState(false);
  const [changeText, setChangeText] = useState("");
  const [changeSent, setChangeSent] = useState(false);
  const [approvedNote, setApprovedNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const found = resolveDeal(ref, window.location.search);
    if (found) {
      rememberDeal(found.ref);
      logDealEvent(found.ref, "Portal opened");
    }
    setDeal(found);
    setReady(true);
  }, [ref]);

  const option = useMemo(() => (deal ? optionById(deal, deal.selectedOption) : undefined), [deal]);
  const stageIndex = deal ? PIPELINE.indexOf(deal.stage) : -1;

  if (!ready) return null;

  if (!deal) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-2xl px-6 py-28 text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
            Project {ref} isn&apos;t on this device
          </h1>
          <p className="mt-4 text-white/65">
            Portal links are private and open from the exact link we emailed you. Ask your project manager
            to resend it.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-lg bg-[oklch(0.78_0.13_300)] px-5 py-3 text-sm font-semibold text-black"
          >
            Contact your project manager
          </Link>
        </div>
      </PageLayout>
    );
  }

  async function sendArtwork() {
    if (!deal || !artwork.length) return;
    setBusy(true);
    setError(null);
    const files = artwork.map((f) => ({ name: f.name, size: f.size }));
    const updated = updateDeal(
      deal.ref,
      { attachments: [...deal.attachments, ...files] },
      { at: new Date().toISOString(), label: `Uploaded ${files.length} artwork file(s)`, by: "client" },
    );
    const result = await submitLead({
      source: "portal-artwork",
      name: deal.contact.name || "Artwork upload",
      email: deal.contact.email || "production@tractionx.ca",
      city: deal.city,
      show: deal.show,
      message: `Artwork uploaded for ${deal.ref}: ${files.map((f) => f.name).join(", ")}`.slice(0, 2000),
      meta: { dealRef: deal.ref, attachments: files, attachmentCount: files.length },
    });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    if (updated) setDeal(updated);
    setArtworkSent(true);
  }

  async function approveDesign() {
    if (!deal) return;
    setBusy(true);
    setError(null);
    const updated = updateDeal(
      deal.ref,
      {
        designApproval: {
          status: "approved",
          note: approvedNote.trim(),
          at: new Date().toISOString(),
        },
      },
      { at: new Date().toISOString(), label: "Approved the 3D design concept", by: "client" },
    );
    const result = await submitLead({
      source: "portal-design-approval",
      name: deal.contact.name || "Design approval",
      email: deal.contact.email || "design@tractionx.ca",
      city: deal.city,
      show: deal.show,
      message: `Design approved on ${deal.ref}. ${approvedNote.trim()}`.slice(0, 2000),
      meta: { dealRef: deal.ref },
    });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    if (updated) setDeal(updated);
  }

  async function sendChangeOrder() {
    if (!deal || !changeText.trim()) return;
    setBusy(true);
    setError(null);
    const co = {
      id: `CO-${deal.changeOrders.length + 1}`,
      at: new Date().toISOString(),
      detail: changeText.trim(),
      status: "requested" as const,
    };
    const updated = updateDeal(
      deal.ref,
      { changeOrders: [...deal.changeOrders, co] },
      { at: co.at, label: `Change order requested: ${co.detail.slice(0, 120)}`, by: "client" },
    );
    const result = await submitLead({
      source: "portal-change-order",
      name: deal.contact.name || "Change order",
      email: deal.contact.email || "projects@tractionx.ca",
      city: deal.city,
      show: deal.show,
      message: `Change order on ${deal.ref}:\n${co.detail}`.slice(0, 2000),
      meta: { dealRef: deal.ref, changeOrder: co.id },
    });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    if (updated) setDeal(updated);
    setChangeText("");
    setChangeSent(true);
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)]">
          Project {deal.ref}
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
          {deal.contact.company || deal.contact.name || "Your exhibit"} project portal
        </h1>
        <p className="mt-3 max-w-2xl text-white/65">
          {deal.show || "Your show"}
          {deal.city ? ` · ${deal.city}` : ""}
          {deal.showDate ? ` · ${deal.showDate}` : ""} · Current status:{" "}
          <span className="font-semibold text-white">{STAGE_LABEL[deal.stage]}</span>
        </p>

        {/* Status rail */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MILESTONES.map((m) => {
            const idx = PIPELINE.indexOf(m.stage);
            const done = deal.stage === "complete" || (idx >= 0 && stageIndex >= idx);
            return (
              <div
                key={m.stage}
                className={`rounded-xl border p-4 ${
                  done
                    ? "border-[oklch(0.78_0.13_300)]/45 bg-[oklch(0.78_0.13_300)]/[0.08]"
                    : "border-white/12 bg-white/[0.02]"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {done ? "Complete" : "Upcoming"}
                </p>
                <p className="mt-1.5 font-semibold">{m.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/55">{m.body}</p>
              </div>
            );
          })}
        </div>

        {/* Commercials */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">Your quote</h2>
            {option ? (
              <>
                <p className="mt-3 font-display text-3xl font-bold text-[oklch(0.85_0.13_300)]">
                  {money(option.subtotal)}
                </p>
                <p className="text-[11px] text-white/45">
                  {option.label} build level · Traction X scope, before tax · valid until {validUntil(deal)}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-white/60">
                No option accepted yet — compare the three build levels on your quote page.
              </p>
            )}
            <a
              href={quoteUrl(deal)}
              className="mt-4 inline-block rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-white/40"
            >
              View full quote →
            </a>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight">3D design concept</h2>
            {deal.designApproval ? (
              <p className="mt-3 text-sm text-white/70">
                Approved on {new Date(deal.designApproval.at).toLocaleDateString()}
                {deal.designApproval.note ? ` — “${deal.designApproval.note}”` : ""}. Production is working from
                this concept — any further changes go through a change order below.
              </p>
            ) : (
              <>
                <p className="mt-3 text-sm text-white/60">
                  Your designer posts renders here. Approving locks the concept so fabrication and graphics
                  can start — you can note small tweaks alongside your approval.
                </p>
                <textarea
                  rows={2}
                  maxLength={600}
                  value={approvedNote}
                  onChange={(e) => setApprovedNote(e.target.value)}
                  placeholder="Optional note — e.g. approved with the darker counter finish"
                  className="mt-3 w-full resize-none rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
                />
                <button
                  type="button"
                  disabled={busy}
                  onClick={approveDesign}
                  className="mt-3 rounded-lg bg-[oklch(0.78_0.13_300)] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
                >
                  Approve the design
                </button>
              </>
            )}
          </div>
        </div>

        <SmsUpdatesCard
          className="mt-6"
          source="portal-sms-opt-in"
          name={deal.contact.name}
          email={deal.contact.email}
          phone={deal.contact.phone}
          company={deal.contact.company}
          city={deal.city}
          show={deal.show}
          dealRef={deal.ref}
        />

        {/* Artwork */}
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Artwork and brand files</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Send logos, brand guidelines and print-ready graphics. Vector (AI, EPS, PDF) or 150 dpi at final
            size is ideal — our production team confirms specs before anything goes to print.
          </p>
          {deal.attachments.length > 0 && (
            <ul className="mt-4 space-y-1 text-[12px] text-white/60">
              {deal.attachments.map((f, i) => (
                <li key={`${f.name}-${i}`}>▪ {f.name}</li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <FileAttach
              label="Upload artwork"
              hint="AI, EPS, PDF, PNG, JPG, ZIP — anything print-ready"
              onFilesChange={setArtwork}
            />
          </div>
          <button
            type="button"
            disabled={busy || !artwork.length}
            onClick={sendArtwork}
            className="mt-3 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold hover:border-white/40 disabled:opacity-50"
          >
            {artworkSent ? "Files logged ✓" : "Send to production"}
          </button>
        </div>

        {/* Billing */}
        <BillingSection dealRef={deal.ref} />

        {/* Change orders */}
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Change orders</h2>
          {deal.changeOrders.length > 0 && (
            <ul className="mt-4 space-y-2 text-[12px] text-white/65">
              {deal.changeOrders.map((co) => (
                <li key={co.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <span className="font-semibold text-white">{co.id}</span> · {co.status} ·{" "}
                  {new Date(co.at).toLocaleDateString()}
                  <p className="mt-1 text-white/60">{co.detail}</p>
                </li>
              ))}
            </ul>
          )}
          <textarea
            rows={3}
            maxLength={1200}
            value={changeText}
            onChange={(e) => setChangeText(e.target.value)}
            placeholder="Describe the change — added counter, revised graphics, new move-in date…"
            className="mt-4 w-full resize-none rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
          />
          <button
            type="button"
            disabled={busy || !changeText.trim()}
            onClick={sendChangeOrder}
            className="mt-3 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold hover:border-white/40 disabled:opacity-50"
          >
            Request this change
          </button>
          {changeSent && (
            <p className="mt-2 text-[12px] text-white/60">
              Logged — we&apos;ll price it and send a revised statement of work if it changes your total.
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-[12px] text-red-300">
            {error}
          </p>
        )}

        {/* Activity */}
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.02] p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Project activity</h2>
          <ul className="mt-4 space-y-2 text-[12px] text-white/60">
            {[...deal.events].reverse().map((e, i) => (
              <li key={i} className="flex gap-3">
                <span className="whitespace-nowrap text-white/35">
                  {new Date(e.at).toLocaleDateString()}
                </span>
                <span>{e.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <BookMeetingButton label="Book a call with your PM" source="portal" variant="primary" />
          <Link
            to="/contact"
            className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold hover:border-white/40"
          >
            Message the team
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Billing                                                                     */
/* -------------------------------------------------------------------------- */

function BillingSection({ dealRef }: { dealRef: string }) {
  const { documents, taxRegions, hydrated } = useAdmin();
  if (!hydrated) return null;

  const invoices = invoicesForDeal(documents, dealRef).filter((i) => i.status !== "draft" && i.status !== "void");
  if (!invoices.length) return null;

  const contract = documents.find((d) => d.type !== "invoice" && (d.dealRef === dealRef || d.leadId === dealRef));
  const s = summarise(contract, invoices, taxRegions);
  const currency = invoices[0].currency;

  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.02] p-6">
      <h2 className="font-display text-lg font-bold uppercase tracking-tight">Billing</h2>
      <p className="mt-2 text-[12px] text-white/55">
        {docMoney(s.billed, currency)} invoiced · {docMoney(s.collected, currency)} received ·{" "}
        <span className={s.outstanding > 0 ? "text-white" : ""}>
          {docMoney(s.outstanding, currency)} outstanding
        </span>
        {s.overdue > 0 ? <span className="text-red-300"> · {docMoney(s.overdue, currency)} overdue</span> : null}
      </p>

      <ul className="mt-4 space-y-2">
        {invoices.map((inv) => {
          const total = computeTotals(inv, taxRegions).total;
          const overdue = isOverdue(inv);
          return (
            <li
              key={inv.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{inv.title}</p>
                <p className="text-[11px] text-white/50">
                  {inv.invoiceNumber}
                  {inv.dueDate ? ` · due ${formatDate(inv.dueDate)}` : ""} ·{" "}
                  {inv.paidAt ? "Paid" : overdue ? "Overdue" : "Outstanding"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[oklch(0.85_0.13_300)]">{docMoney(total, inv.currency)}</span>
                <Link
                  to="/invoice/$token"
                  params={{ token: inv.token }}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-[12px] font-semibold hover:border-white/40"
                >
                  {inv.paidAt ? "View receipt" : "View & pay"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
