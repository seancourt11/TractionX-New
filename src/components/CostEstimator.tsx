import { useEffect, useMemo, useState } from "react";
import { FileAttach } from "@/components/FileAttach";
import { ChoiceChips } from "@/components/ChoiceChips";
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  POSITION_OPTIONS,
  CEILING_OPTIONS,
  GRAPHICS_OPTIONS,
  AV_OPTIONS,
  FURNITURE_OPTIONS,
  STORAGE_OPTIONS,
  FLOORING_OPTIONS,
} from "@/data/lead-options";

import { Design3DButton, BookMeetingButton, QuoteButton } from "@/components/GlobalCta";
import { ESTIMATE_DISCLAIMER } from "@/components/QuoteModal";
import { submitLead } from "@/lib/leads";
import { SmsOptIn, smsLeadFields } from "@/components/SmsOptIn";
import { useLeadPrefill, cityTierFor } from "@/lib/lead-prefill";
import {
  createDeal,
  saveDeal,
  rememberDeal,
  lastDealRef,
  loadDeal,
  quoteUrl,
  EMPTY_SCOPE,
  type DealScope,
} from "@/lib/deal";


import { generateEstimateBreakdown } from "@/lib/pdf-lazy";
import {
  FOOTPRINTS,
  BUILDS,
  FINISH,
  CITY_TIER,
  ADDONS,
  addonCost,
  isAddonAvailable,
  money,
  calculate,
  encodeConfig,
  decodeConfig,
  shareUrlFor,
  summaryText,
  SHARE_PARAM,
  type EstimatorConfig,
  type BuildId,
} from "@/lib/estimator";

export function CostEstimator({
  heading = "Estimate your booth cost",
  intro = "Move through the inputs and the range updates live. No email required — this is yours to use.",
}: {
  heading?: string;
  intro?: string;
}) {
  const pre = useLeadPrefill();
  const [sharedConfig, setSharedConfig] = useState(false);
  const [footprint, setFootprint] = useState(FOOTPRINTS[1].id);

  const [build, setBuild] = useState<BuildId>("rental");
  const [finish, setFinish] = useState(FINISH[0].id);
  const [city, setCity] = useState(CITY_TIER[0].id);
  const [addons, setAddons] = useState<string[]>([]);
  const [shows, setShows] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [want3D, setWant3D] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [scope, setScope] = useState<DealScope>({ ...EMPTY_SCOPE });
  const [dealRef, setDealRef] = useState<string | null>(null);
  const [dealLink, setDealLink] = useState<string>("");
  const [resume, setResume] = useState<{ ref: string; url: string } | null>(null);

  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "text" | "quote" | null>(null);

  const setScopeField = (field: keyof DealScope) => (value: string) =>
    setScope((s) => ({ ...s, [field]: value }));


  const config: EstimatorConfig = useMemo(
    () => ({ footprint, build, finish, city, addons, shows }),
    [footprint, build, finish, city, addons, shows],
  );

  /* Restore a shared configuration from ?e= on first client render. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restored = decodeConfig(params.get(SHARE_PARAM));
    if (!restored) {
      setSharedConfig(false);
      return;
    }
    setSharedConfig(true);
    setFootprint(restored.footprint);
    setBuild(restored.build);
    setFinish(restored.finish);
    setCity(restored.city);
    setAddons(restored.addons);
    setShows(restored.shows);
  }, []);

  /* Prefill the market tier and timeline from the city/show the visitor came from. */
  useEffect(() => {
    if (sharedConfig) return;
    if (pre.citySlug) setCity(cityTierFor(pre.citySlug));
    if (pre.timeline) setTimeline((t) => t || pre.timeline);
  }, [sharedConfig, pre.citySlug, pre.timeline]);

  /* Offer to resume the last saved deal from this browser. */
  useEffect(() => {
    const ref = lastDealRef();
    if (!ref) return;
    const existing = loadDeal(ref);
    if (!existing) return;
    setResume({ ref, url: quoteUrl(existing) });
  }, []);



  /* Keep the URL in sync so the current estimate is always copy-pasteable. */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(SHARE_PARAM, encodeConfig(config));
    window.history.replaceState(null, "", url.toString());
  }, [config]);

  const fp = FOOTPRINTS.find((f) => f.id === footprint) ?? FOOTPRINTS[1];
  const availableAddons = ADDONS.filter((a) => isAddonAvailable(a, footprint, finish));
  const selectedAddons = addons
    .map((id) => ADDONS.find((x) => x.id === id))
    .filter((a): a is (typeof ADDONS)[number] => {
      if (!a) return false;
      return isAddonAvailable(a, footprint, finish);
    });

  const calc = useMemo(() => calculate(config), [config]);

  const toggle = (id: string) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const copy = async (value: string, kind: "link" | "text" | "quote") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2200);
    } catch {
      setFormError("Couldn't copy automatically — please select and copy the link manually.");
    }
  };

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    setSending(true);

    // The visitor's own brief matters most, so it leads the message; the generated
    // estimate summary is appended and trimmed to fit the 2,000-character cap.
    const briefText = brief.trim();
    const summary = summaryText(config, shareUrlFor(config));
    const message = (
      briefText ? `PROJECT BRIEF\n${briefText}\n\n${summary}` : summary
    ).slice(0, 2000);

    // Everything captured becomes a saved deal with its own reference, so the
    // visitor can come back to a real quote instead of starting over.
    const deal = saveDeal(
      createDeal({
        stage: "quoted",
        contact: { name, email, phone, company: "" },
        city: pre.city,
        show: pre.show,
        showDate: pre.showDate,
        budget,
        timeline,
        brief: briefText,
        config,
        scope,
        wants3D: want3D,
        attachments: attachments.map((f) => ({ name: f.name, size: f.size, kind: f.type })),
      }),
    );
    rememberDeal(deal.ref);

    const result = await submitLead({
      source: "cost-estimator-breakdown",
      name,
      email,
      phone,
      ...smsLeadFields(smsOptIn),
      footprint: fp.label,
      city: pre.city,
      show: pre.show,
      wants3D: want3D,
      message,
      meta: {
        dealRef: deal.ref,
        config: encodeConfig(config),
        perShowLow: calc.perShowLow,
        perShowHigh: calc.perShowHigh,
        scope,
        ...(briefText ? { brief: briefText } : {}),
        ...(budget ? { budget } : {}),
        ...(timeline ? { timeline } : {}),

        ...(attachments.length
          ? {
              attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
              attachmentCount: attachments.length,
            }
          : {}),
      },
    });

    setSending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setLeadName(name);
    setDealRef(deal.ref);
    setDealLink(quoteUrl(deal));
    setResume(null);
    setRevealed(true);
  }


  const chip = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left text-sm transition ${
      active
        ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
        : "border-white/12 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white"
    }`;

  return (
    <div id="estimator" className="rounded-3xl border border-white/12 bg-white/[0.02] p-6 md:p-10">
      <h2 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight">{heading}</h2>
      <p className="mt-3 max-w-2xl text-white/65 text-sm md:text-base leading-relaxed">{intro}</p>

      {resume && !revealed && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-5 py-4">
          <p className="text-sm text-white/80">
            <span className="font-semibold text-white">Pick up where you left off.</span> We saved your last
            project as <span className="font-mono text-[oklch(0.85_0.13_300)]">{resume.ref}</span>.
          </p>
          <a
            href={resume.url}
            className="rounded-lg bg-[oklch(0.78_0.13_300)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Open my quote →
          </a>
        </div>
      )}


      <div className="mt-10 grid lg:grid-cols-[1.35fr_1fr] gap-10">
        {/* Inputs */}
        <div className="space-y-9">
          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              1 · Footprint
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {FOOTPRINTS.map((f) => (
                <button key={f.id} type="button" onClick={() => setFootprint(f.id)} className={chip(footprint === f.id)}>
                  <span className="block font-display text-lg font-bold">{f.label}</span>
                  <span className="block text-[11px] text-white/45">{f.sqft} sq ft</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              2 · Rental or owned
            </legend>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {BUILDS.map((b) => (
                <button key={b.id} type="button" onClick={() => setBuild(b.id)} className={chip(build === b.id)}>
                  <span className="block font-semibold">{b.label}</span>
                  <span className="block text-[11px] text-white/45 mt-0.5">{b.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              3 · Finish level
            </legend>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {FINISH.map((f) => (
                <button key={f.id} type="button" onClick={() => setFinish(f.id)} className={chip(finish === f.id)}>
                  <span className="block font-semibold">{f.label}</span>
                  <span className="block text-[11px] text-white/45 mt-0.5">{f.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              4 · Show city
            </legend>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {CITY_TIER.map((c) => (
                <button key={c.id} type="button" onClick={() => setCity(c.id)} className={chip(city === c.id)}>
                  <span className="block font-semibold">{c.label}</span>
                  <span className="block text-[11px] text-white/45 mt-0.5">{c.note}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              5 · Add-ons <span className="normal-case tracking-normal text-white/35">— priced for {fp.label}</span>
            </legend>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {availableAddons.map((a) => (
                <button key={a.id} type="button" onClick={() => toggle(a.id)} className={chip(addons.includes(a.id))}>
                  <span className="flex items-center justify-between gap-3">
                    <span>{a.label}</span>
                    <span className="text-[11px] text-white/45 whitespace-nowrap">
                      +{money(addonCost(a, fp.id))}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-white/40">
              Add-on pricing scales with footprint — change the size above and these re-price instantly.
              {fp.sqft < 200 && " Hanging signs aren't permitted on inline 10×10 booths."}
            </p>
          </fieldset>

          <fieldset>
            <legend className="text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">
              6 · Shows per year — {shows}
            </legend>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={shows}
              onChange={(e) => setShows(Number(e.target.value))}
              className="w-full accent-[oklch(0.78_0.13_300)]"
              aria-label="Shows per year"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>1 show</span>
              <span>8 shows</span>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/12 bg-black/30 p-5">
            <legend className="px-2 text-[11px] uppercase tracking-[0.28em] text-white/50">
              7 · Project details
            </legend>
            <p className="-mt-1 mb-4 text-[11px] leading-relaxed text-white/45">
              Optional, but these are the answers that turn a range into a real quote. Everything you tap
              here lands on your quote as its own priced line.
            </p>
            <div className="space-y-4">
              <ChoiceChips
                label="Floor position"
                options={POSITION_OPTIONS}
                value={scope.position}
                onChange={setScopeField("position")}
                size="sm"
              />
              <ChoiceChips
                label="Height / rigging"
                options={CEILING_OPTIONS}
                value={scope.ceiling}
                onChange={setScopeField("ceiling")}
                size="sm"
              />
              <ChoiceChips
                label="Graphics"
                options={GRAPHICS_OPTIONS}
                value={scope.graphics}
                onChange={setScopeField("graphics")}
                size="sm"
              />
              <ChoiceChips
                label="AV"
                options={AV_OPTIONS}
                value={scope.av}
                onChange={setScopeField("av")}
                size="sm"
              />
              <ChoiceChips
                label="Furniture"
                options={FURNITURE_OPTIONS}
                value={scope.furniture}
                onChange={setScopeField("furniture")}
                size="sm"
              />
              <ChoiceChips
                label="Storage / private space"
                options={STORAGE_OPTIONS}
                value={scope.storage}
                onChange={setScopeField("storage")}
                size="sm"
              />
              <ChoiceChips
                label="Flooring"
                options={FLOORING_OPTIONS}
                value={scope.flooring}
                onChange={setScopeField("flooring")}
                size="sm"
              />

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Venue
                  </span>
                  <input
                    type="text"
                    maxLength={120}
                    value={scope.venue}
                    onChange={(e) => setScopeField("venue")(e.target.value)}
                    placeholder="e.g. LVCC West Hall"
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Install date
                  </span>
                  <input
                    type="date"
                    value={scope.installDate}
                    onChange={(e) => setScopeField("installDate")(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Dismantle date
                  </span>
                  <input
                    type="date"
                    value={scope.dismantleDate}
                    onChange={(e) => setScopeField("dismantleDate")(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
                  />
                </label>
              </div>
            </div>
          </fieldset>
        </div>


        {/* Live result */}
        <div className="lg:sticky lg:top-24 h-fit rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.07] p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">Live estimate</p>

          {/* Always-visible headline range */}
          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">All-in, per show</p>
            <p className="font-display text-3xl md:text-4xl font-bold text-[oklch(0.85_0.13_300)]">
              {money(calc.perShowLow)}
            </p>
            <p className="font-display text-xl font-bold text-white/60">to {money(calc.perShowHigh)}</p>
            <p className="mt-1 text-[11px] text-white/45">
              Booth + show services, before any early-bird or multi-show discounts.
            </p>
          </div>

          {revealed ? (
            <>
              {/* Itemized breakdown */}
              <div className="mt-6 pt-5 border-t border-white/15 space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Booth, per show</p>
                  <p className="font-display text-2xl font-bold text-white">
                    {money(calc.boothLow)} – {money(calc.boothHigh)}
                  </p>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="space-y-1.5">
                    {selectedAddons.map((a) => (
                      <div key={a.id} className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{a.label}</span>
                        <span className="text-white/85 font-semibold">+{money(addonCost(a, fp.id))}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Show services (drayage, electrical, rigging)
                  </p>
                  <p className="font-display text-xl font-bold text-white/85">
                    {money(calc.servicesLow)} – {money(calc.servicesHigh)}
                  </p>
                  <p className="mt-1 text-[11px] text-white/45">
                    Billed by the venue's contractor, not by Traction X.
                  </p>
                </div>

                {shows > 1 && (
                  <div className="pt-5 border-t border-white/15">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Annual programme · {shows} shows
                    </p>
                    <p className="font-display text-2xl font-bold text-white">
                      {money(calc.annualLow)} – {money(calc.annualHigh)}
                    </p>
                    <p className="mt-1 text-[11px] text-white/45">
                      {build === "custom"
                        ? "Owned structure amortised across shows, plus refurbishment and round-trip freight."
                        : "Each show priced fresh — no storage, refurbishment or return freight."}
                    </p>
                  </div>
                )}
              </div>

              {/* The saved deal — this is what turns an estimate into a live quote */}
              {dealRef && (
                <div className="mt-6 rounded-xl border border-[oklch(0.78_0.13_300)]/45 bg-[oklch(0.78_0.13_300)]/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Your project</p>
                  <p className="mt-1 font-mono text-lg font-bold text-[oklch(0.85_0.13_300)]">{dealRef}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                    We've saved your configuration under this reference. Your quote page compares three
                    build levels side by side — accept one online, or ask for changes.
                  </p>
                  <a
                    href={dealLink}
                    className="mt-3 block w-full rounded-lg bg-[oklch(0.78_0.13_300)] px-4 py-2.5 text-center text-sm font-semibold text-black hover:opacity-90"
                  >
                    Open my quote →
                  </a>
                  <button
                    type="button"
                    onClick={() => copy(dealLink, "quote")}
                    className="mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                  >
                    {copied === "quote" ? "Quote link copied ✓" : "Copy quote link for my team"}
                  </button>
                </div>
              )}

              {/* Take it with you */}

              <div className="mt-6 pt-5 border-t border-white/15">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-2.5">
                  Take it with you
                </p>
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      generateEstimateBreakdown(config, {
                        name: leadName || undefined,
                        shareUrl: shareUrlFor(config),
                      })
                    }
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition"
                  >
                    Download PDF breakdown
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(shareUrlFor(config), "link")}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition"
                  >
                    {copied === "link" ? "Link copied ✓" : "Copy shareable link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(summaryText(config, shareUrlFor(config)), "text")}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition"
                  >
                    {copied === "text" ? "Summary copied ✓" : "Copy summary for email"}
                  </button>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                  The link reopens this page with your exact configuration — send it to whoever
                  signs off the budget.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2.5">
                <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 p-4">
                  <p className="text-sm text-white/80 leading-relaxed">
                    <span className="font-semibold text-white">This is an estimate, not your final price.</span> Send it
                    to us and a designer confirms your exact number — with your show, freight and labour rates factored
                    in — within one business day.
                  </p>
                  <QuoteButton
                    source="cost-estimator"
                    label="Get my exact quote"
                    className="mt-3 w-full justify-center"
                  />
                </div>
                <Design3DButton label="Start your free 3D design →" source="cost-estimator" />
                <BookMeetingButton label="Book a virtual meeting" source="cost-estimator" variant="outline" />
                <p className="text-[11px] text-white/45 text-center">
                  10-minute touch base for anyone · 30-minute strategy session for $10K+ projects
                </p>
              </div>

            </>
          ) : (
            <div className="mt-6 pt-5 border-t border-white/15">
              <div className="rounded-xl border border-white/15 bg-black/40 p-4">
                <p className="text-sm font-semibold text-white">
                  Get your accurate, itemized breakdown
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/55">
                  The headline range is instant — but a real estimate needs a real review. Share your
                  details and a senior project manager checks your show, city and add-ons by hand, then
                  sends back an accurate line-by-line breakdown (booth vs. services, per add-on, annual
                  programme) plus a complimentary 3D concept of your booth. You'll also unlock a
                  downloadable PDF and a shareable link to this estimate.
                </p>
                <form className="mt-3 space-y-2.5" onSubmit={handleUnlock}>
                  <input
                    required
                    name="name"
                    type="text"
                    maxLength={100}
                    placeholder="Name"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    maxLength={255}
                    placeholder="Work email"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    maxLength={30}
                    placeholder={smsOptIn ? "Mobile number" : "Phone"}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                  />
                  <ChoiceChips
                    className="pt-1"
                    label="Budget band"
                    options={BUDGET_OPTIONS}
                    value={budget}
                    onChange={setBudget}
                    size="sm"
                  />
                  <ChoiceChips
                    label="Timeline"
                    options={TIMELINE_OPTIONS}
                    value={timeline}
                    onChange={setTimeline}
                    size="sm"
                  />

                  <SmsOptIn checked={smsOptIn} onChange={setSmsOptIn} />

                  <div className="pt-1.5">
                    <p className="text-[11px] leading-relaxed text-white/55">
                      <span className="font-semibold text-white/80">Want the sharpest number?</span> Send us a
                      drawing, floor plan or RFP and we price the real thing instead of a generic footprint —
                      and your complimentary 3D concept comes back faster.
                    </p>
                    <FileAttach
                      className="mt-2.5"
                      label="Attach your design, floor plan or RFP (optional)"
                      hint="Booth drawings, floor plans, RFPs, brand guidelines — PDF, DOC, PPT, PNG, JPG, DWG, DXF, ZIP"
                      onFilesChange={setAttachments}
                    />
                    <p className="mt-1.5 text-[10px] text-white/40">
                      Used only to prepare your estimate — never shared.
                    </p>
                  </div>

                  <label className="block">
                    <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      Tell us about the project (optional)
                    </span>
                    <textarea
                      rows={4}
                      maxLength={1500}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Show and city, dates, booth goals, must-have elements (meeting room, demo stations, hanging sign), budget range, and anything already designed…"
                      className="w-full resize-none bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                    />
                  </label>

                  <label className="flex items-start gap-2.5 text-[11px] text-white/60 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={want3D}
                      onChange={(e) => setWant3D(e.target.checked)}
                      className="mt-0.5 accent-[oklch(0.78_0.13_300)]"
                    />
                    <span>Also build me a complimentary 3D concept of this booth</span>
                  </label>
                  {formError && (
                    <p role="alert" className="text-[11px] text-red-300">
                      {formError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[oklch(0.78_0.13_300)] text-black font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Get my reviewed breakdown →"}
                  </button>
                </form>
                <p className="mt-2 text-[10px] leading-relaxed text-white/40">
                  No spam. Reviewed by hand within one business day. Pricing is an approximate, non-binding estimate.
                </p>
              </div>
            </div>
          )}

          <p className="mt-4 text-[11px] leading-relaxed text-white/45">{ESTIMATE_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
}
