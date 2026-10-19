import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { BookMeetingButton } from "@/components/GlobalCta";
import { noindexMeta } from "@/lib/seo";
import { submitLead } from "@/lib/leads";
import { SmsUpdatesCard } from "@/components/SmsOptIn";
import { money } from "@/lib/estimator";
import {
  resolveDeal,
  logDealEvent,
  updateDeal,
  rememberDeal,
  portalUrl,
  quoteUrl,
  type Deal,
} from "@/lib/deal";
import {
  buildOptions,
  QUOTE_EXCLUSIONS,
  QUOTE_INCLUSIONS,
  cityTierLabel,
  validUntil,
  type QuoteOption,
} from "@/lib/quote";

export const Route = createFileRoute("/quote/$ref")({
  head: () => ({
    meta: [
      { title: "Your Traction X quote" },
      { name: "description", content: "Review, compare and accept your Traction X exhibit quote online." },
      ...noindexMeta(),
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const { ref } = Route.useParams();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [accepted, setAccepted] = useState(false);
  const [changeText, setChangeText] = useState("");
  const [changeSent, setChangeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = resolveDeal(ref, window.location.search);
    if (found) {
      rememberDeal(found.ref);
      logDealEvent(found.ref, "Quote viewed");
      setSelected(found.selectedOption ?? found.config.finish);
      setAccepted(found.stage === "accepted" || found.stage === "contract_sent" || found.stage === "signed");
    }
    setDeal(found);
    setReady(true);
  }, [ref]);

  const options = useMemo(() => (deal ? buildOptions(deal) : []), [deal]);
  const chosen = options.find((o) => o.id === selected) ?? options[0];

  if (!ready) return null;

  if (!deal) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-2xl px-6 py-28 text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
            We couldn&apos;t find quote {ref}
          </h1>
          <p className="mt-4 text-white/65">
            Quote links are private and open from the exact link we sent. Ask your project manager to
            resend it, or build a fresh estimate in under a minute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/booth-cost-calculator"
              className="rounded-lg bg-[oklch(0.78_0.13_300)] px-5 py-3 text-sm font-semibold text-black"
            >
              Build a new estimate →
            </Link>
            <Link to="/contact" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold">
              Contact us
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  async function accept(option: QuoteOption) {
    if (!deal) return;
    setBusy(true);
    setError(null);
    const updated = updateDeal(
      deal.ref,
      { stage: "accepted", selectedOption: option.id, acceptedValue: option.subtotal },
      { at: new Date().toISOString(), label: `Accepted the ${option.label} option — ${money(option.subtotal)}`, by: "client" },
    );
    const result = await submitLead({
      source: "quote-accept",
      name: deal.contact.name || "Quote acceptance",
      email: deal.contact.email || "quotes@tractionx.ca",
      phone: deal.contact.phone,
      company: deal.contact.company,
      city: deal.city,
      show: deal.show,
      message: `Accepted quote ${deal.ref} — ${option.label} option at ${money(option.subtotal)}.`,
      meta: { dealRef: deal.ref, option: option.id, value: option.subtotal, scope: deal.scope },
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    if (updated) setDeal(updated);
    setAccepted(true);
  }

  async function requestChanges() {
    if (!deal || !changeText.trim()) return;
    setBusy(true);
    setError(null);
    const updated = updateDeal(
      deal.ref,
      { stage: "changes_requested" },
      { at: new Date().toISOString(), label: `Requested changes: ${changeText.trim().slice(0, 140)}`, by: "client" },
    );
    const result = await submitLead({
      source: "quote-change-request",
      name: deal.contact.name || "Change request",
      email: deal.contact.email || "quotes@tractionx.ca",
      phone: deal.contact.phone,
      city: deal.city,
      show: deal.show,
      message: `Change request on quote ${deal.ref}:\n${changeText.trim()}`.slice(0, 2000),
      meta: { dealRef: deal.ref, option: selected },
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    if (updated) setDeal(updated);
    setChangeSent(true);
  }

  const mailto = `mailto:${deal.contact.email || ""}?subject=${encodeURIComponent(
    `Traction X quote ${deal.ref}`,
  )}&body=${encodeURIComponent(`Here is our Traction X quote:\n\n${quoteUrl(deal)}\n`)}`;

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-6 py-14 print:py-4">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/12 pb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)]">
              Quote {deal.ref}
            </p>
            <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
              {deal.contact.company || deal.contact.name || "Your exhibit"} —{" "}
              {deal.show || "trade show programme"}
            </h1>
            <p className="mt-3 max-w-2xl text-white/65">
              Prepared for {deal.contact.name || "your team"}
              {deal.city ? ` · ${deal.city}` : ""} · Valid until {validUntil(deal)} · Install and dismantle
              labour included in every option below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-white/40"
            >
              Download PDF
            </button>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(quoteUrl(deal));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-white/40"
            >
              {copied ? "Link copied ✓" : "Copy link"}
            </button>
            <a
              href={mailto}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-white/40"
            >
              Email me this quote
            </a>
          </div>
        </div>

        <SmsUpdatesCard
          className="mt-8 print:hidden"
          source="quote-sms-opt-in"
          name={deal.contact.name}
          email={deal.contact.email}
          phone={deal.contact.phone}
          company={deal.contact.company}
          city={deal.city}
          show={deal.show}
          dealRef={deal.ref}
        />

        {accepted && (
          <div className="mt-8 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-6">
            <p className="font-display text-xl font-bold uppercase tracking-tight text-emerald-300">
              Accepted — thank you
            </p>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Your project manager is preparing the statement of work for signature. Everything from here —
              the contract, your 3D concept approval, artwork uploads and the show timeline — lives in your
              project portal.
            </p>
            <a
              href={portalUrl(deal)}
              className="mt-4 inline-block rounded-lg bg-[oklch(0.78_0.13_300)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Open my project portal →
            </a>
          </div>
        )}

        {/* Configuration summary */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Footprint", v: chosen ? `${deal.config.footprint.replace("x", " × ")} ft` : "—" },
            { k: "Programme", v: deal.config.build === "rental" ? "Custom rental" : "Custom owned build" },
            { k: "Market", v: cityTierLabel(deal.config.city) },
            { k: "Show date", v: deal.showDate || deal.scope.installDate || "To confirm" },
          ].map((item) => (
            <div key={item.k} className="rounded-xl border border-white/12 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{item.k}</p>
              <p className="mt-1.5 font-semibold">{item.v}</p>
            </div>
          ))}
        </div>

        {/* Options */}
        <h2 className="mt-14 font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
          Choose your build level
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Same footprint and scope, three levels of finish. Every option is fully custom to your brand and
          includes install and dismantle.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {options.map((option) => {
            const active = option.id === selected;
            return (
              <div
                key={option.id}
                className={`flex flex-col rounded-2xl border p-6 transition ${
                  active
                    ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/[0.08]"
                    : "border-white/12 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">{option.label}</h3>
                  {option.recommended && (
                    <span className="rounded-full border border-[oklch(0.78_0.13_300)]/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[oklch(0.85_0.13_300)]">
                      Your spec
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-white/55">{option.note}</p>

                <p className="mt-5 font-display text-3xl font-bold text-[oklch(0.85_0.13_300)]">
                  {money(option.subtotal)}
                </p>
                <p className="text-[11px] text-white/45">Traction X scope, before tax</p>

                <ul className="mt-5 space-y-2 border-t border-white/12 pt-4 text-[12px]">
                  {option.lines.map((line) => (
                    <li key={line.id} className="flex items-start justify-between gap-3">
                      <span className="text-white/70">
                        {line.label}
                        {line.note && <span className="block text-[10px] text-white/35">{line.note}</span>}
                      </span>
                      <span className="whitespace-nowrap font-semibold text-white/90">
                        {money(line.amount)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-white/12 pt-3 text-[11px] text-white/45">
                  Venue-billed show services (drayage, electrical, rigging) estimated at{" "}
                  {money(option.servicesLow)} – {money(option.servicesHigh)}. Paid to the venue, not to us.
                </div>

                <div className="mt-5 flex-1" />
                <button
                  type="button"
                  onClick={() => {
                    setSelected(option.id);
                    logDealEvent(deal.ref, `Compared the ${option.label} option`);
                  }}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm font-semibold transition print:hidden ${
                    active
                      ? "border-[oklch(0.78_0.13_300)]/60 bg-[oklch(0.78_0.13_300)]/15"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  {active ? "Selected" : "Select this option"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Decision bar */}
        {!accepted && chosen && (
          <div className="mt-10 rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.08] p-6 print:hidden">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Your selection</p>
                <p className="mt-1 font-display text-2xl font-bold">
                  {chosen.label} — {money(chosen.subtotal)}
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Accepting moves this to contract. Nothing is charged online — a 50% deposit invoice
                  follows signature.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => accept(chosen)}
                  className="rounded-lg bg-[oklch(0.78_0.13_300)] px-6 py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
                >
                  {busy ? "Sending…" : "Accept this option →"}
                </button>
                <BookMeetingButton label="Book a call" source="quote-page" variant="outline" />
              </div>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-[12px] text-red-300">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Request changes */}
        <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.02] p-6 print:hidden">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
            Want something changed?
          </h3>
          {changeSent ? (
            <p className="mt-2 text-sm text-white/70">
              Sent — your project manager will re-issue this quote, usually within one business day.
            </p>
          ) : (
            <>
              <p className="mt-2 max-w-2xl text-sm text-white/60">
                Tell us what to adjust — layout, a swapped add-on, a different footprint, budget target —
                and we&apos;ll re-price and reissue this same link.
              </p>
              <textarea
                rows={3}
                maxLength={1200}
                value={changeText}
                onChange={(e) => setChangeText(e.target.value)}
                placeholder="e.g. drop the LED wall, add a second meeting room, target $45K all-in…"
                className="mt-3 w-full resize-none rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
              />
              <button
                type="button"
                disabled={busy || !changeText.trim()}
                onClick={requestChanges}
                className="mt-3 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold hover:border-white/40 disabled:opacity-50"
              >
                Send my changes
              </button>
            </>
          )}
        </div>

        {/* Inclusions / exclusions */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">Included in every option</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {QUOTE_INCLUSIONS.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="text-[oklch(0.78_0.13_300)]">▪</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">Not included</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {QUOTE_EXCLUSIONS.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="text-white/30">▪</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {deal.brief && (
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.02] p-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">Your brief</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{deal.brief}</p>
          </div>
        )}

        <p className="mt-10 text-[11px] leading-relaxed text-white/40">
          Pricing is quoted in USD and excludes applicable taxes, which are shown on the statement of work
          for your place of supply. Figures hold until {validUntil(deal)}. Final pricing is confirmed on the
          signed statement of work.
        </p>
      </div>
    </PageLayout>
  );
}
