import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileAttach } from "@/components/FileAttach";
import { ChoiceChips } from "@/components/ChoiceChips";
import { BUDGET_OPTIONS, FOOTPRINT_OPTIONS, MEETING_BUDGET_OPTIONS, PROJECT_TYPE_OPTIONS, TIMELINE_OPTIONS } from "@/data/lead-options";

import { Autocomplete } from "@/components/Autocomplete";
import { useCityContext } from "@/lib/city-context";
import { useLeadPrefill } from "@/lib/lead-prefill";
import { CITY_SUGGESTIONS, SHOW_SUGGESTIONS, matchExact } from "@/lib/place-suggest";
import { submitLead } from "@/lib/leads";
import { SmsOptIn, smsLeadFields } from "@/components/SmsOptIn";
import { SITE } from "@/lib/site";
import { trackCtaOpen } from "@/lib/analytics";
import { ResponsePromise, SuccessPanel } from "@/components/Conversion";


const PURPLE = "oklch(0.78 0.13 300)";

type CtaKind = "design" | "meeting" | "quote" | null;

type CtaContextValue = {
  openDesign: (ctx?: { booth?: string; size?: string; source?: string }) => void;
  openMeeting: (ctx?: { source?: string }) => void;
  openQuote: (ctx?: { booth?: string; size?: string; source?: string }) => void;
  close: () => void;
};

const CtaCtx = createContext<CtaContextValue | null>(null);

export function useCta() {
  const ctx = useContext(CtaCtx);
  if (!ctx) {
    // Safe no-op fallback so buttons never crash outside the provider.
    return {
      openDesign: () => {},
      openMeeting: () => {},
      openQuote: () => {},
      close: () => {},
    } satisfies CtaContextValue;
  }
  return ctx;
}

const POPUP_KEY = "tx.designPopup.v1";

/**
 * Anyone who has already engaged — opened a form, saved a booth, used the booth
 * finder — has met the offer once. Suppress the soft nudge so the same ask never
 * arrives four ways in one session.
 */
export function suppressCtaNudge() {
  try {
    window.sessionStorage.setItem(POPUP_KEY, "1");
  } catch {
    /* ignore */
  }
}

function nudgeSuppressed() {
  try {
    return window.sessionStorage.getItem(POPUP_KEY) !== null;
  } catch {
    return true;
  }
}

export function CtaProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<CtaKind>(null);
  const [seed, setSeed] = useState<{ booth?: string; size?: string; source?: string }>({});
  const [nudge, setNudge] = useState(false);

  const openDesign = useCallback((ctx?: { booth?: string; size?: string; source?: string }) => {
    setSeed(ctx ?? {});
    setKind("design");
    setNudge(false);
    suppressCtaNudge();
    trackCtaOpen("design", ctx?.source);
  }, []);
  const openMeeting = useCallback((ctx?: { source?: string }) => {
    setSeed(ctx ?? {});
    setKind("meeting");
    setNudge(false);
    suppressCtaNudge();
    trackCtaOpen("meeting", ctx?.source);
  }, []);
  const openQuote = useCallback((ctx?: { booth?: string; size?: string; source?: string }) => {
    setSeed(ctx ?? {});
    setKind("quote");
    setNudge(false);
    suppressCtaNudge();
    trackCtaOpen("quote", ctx?.source);
  }, []);
  const close = useCallback(() => setKind(null), []);

  const value = useMemo(
    () => ({ openDesign, openMeeting, openQuote, close }),
    [openDesign, openMeeting, openQuote, close],
  );

  // Gentle first-visit nudge: one soft popup per browser session, fired once the
  // visitor has actually engaged (scrolled ~35% of the page) rather than on a
  // blind timer. Never blocks the page and never interrupts an open modal.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(POPUP_KEY)) return;
    } catch {
      return;
    }
    let done = false;
    // Re-checked at fire time, not just at mount: engaging with any form, the
    // shortlist or the booth finder mid-session cancels the pending nudge.
    const onScroll = () => {
      if (done) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.35) {
        done = true;
        if (!nudgeSuppressed()) setNudge(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Exit intent: pointer leaves through the top of the viewport (desktop
    // only — mobile has no equivalent signal and false-fires on scroll).
    const onExit = (e: MouseEvent) => {
      if (done) return;
      if (e.clientY > 0 || e.relatedTarget) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;
      done = true;
      if (!nudgeSuppressed()) setNudge(true);
    };
    document.addEventListener("mouseout", onExit);
    // Fallback for short pages with nothing to scroll.
    const t = window.setTimeout(() => {
      if (!done) {
        done = true;
        if (!nudgeSuppressed()) setNudge(true);
      }
    }, 45000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onExit);
      window.clearTimeout(t);
    };

  }, []);


  const dismissNudge = () => {
    setNudge(false);
    try {
      window.sessionStorage.setItem(POPUP_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <CtaCtx.Provider value={value}>
      {children}
      <Design3DModal open={kind === "design"} onOpenChange={(v) => !v && close()} seed={seed} />
      <MeetingModal open={kind === "meeting"} onOpenChange={(v) => !v && close()} />
      <QuickQuoteModal open={kind === "quote"} onOpenChange={(v) => !v && close()} seed={seed} />
      {nudge && kind === null && (
        <DesignNudge
          onDismiss={dismissNudge}
          onStart={() => {
            dismissNudge();
            openDesign({ source: "nudge" });
          }}
        />
      )}
    </CtaCtx.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * One verb set, used everywhere. Changing a CTA label site-wide means changing
 * it here — never inline, so the site never offers three names for one action.
 */
export const CTA_LABELS = {
  design: "Start my free 3D design",
  quote: "Get my exact quote",
  meeting: "Book a 10-min call",
} as const;

/**
 * Risk-reversal microcopy. Proximity beats page-level reassurance, so these sit
 * directly under the button they belong to.
 */
export const CTA_REASSURANCE = {
  design: "No cost, no obligation. Preliminary concept direction and investment within two business days.",
  quote: "Takes about 60 seconds. A designer reviews it before we send numbers.",
  meeting: "10 minutes. No deck, no pressure.",
} as const;

/** Small reassurance line — pair with the CTA it reassures. */
export function CtaNote({ kind, className = "" }: { kind: keyof typeof CTA_REASSURANCE; className?: string }) {
  return <p className={`text-[11px] leading-relaxed text-white/60 ${className}`}>{CTA_REASSURANCE[kind]}</p>;
}

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

type BtnProps = {
  className?: string;
  label?: string;
  booth?: string;
  size?: string;
  source?: string;
};

/** Primary site-wide CTA: complimentary 3D design. */
export function Design3DButton({
  className = "",
  label = CTA_LABELS.design,
  booth,
  size,
  source,
  variant = "primary",
}: BtnProps & { variant?: "primary" | "outline" | "ghost" }) {
  const { openDesign } = useCta();
  const base =
    variant === "primary"
      ? "bg-[oklch(0.78_0.13_300)] text-black hover:opacity-90"
      : variant === "outline"
        ? "border border-white/25 text-white hover:bg-white/10"
        : "text-[oklch(0.78_0.13_300)] hover:text-white underline underline-offset-4";
  const pad = variant === "ghost" ? "" : "px-6 py-3 rounded-xl";
  return (
    <button
      type="button"
      onClick={() => openDesign({ booth, size, source })}
      className={`inline-flex items-center gap-2 font-semibold ${pad} ${base} ${FOCUS} ${className}`}
    >
      {label} <span aria-hidden>→</span>
    </button>
  );
}

/** Secondary site-wide CTA: book a 10 or 30 minute virtual meeting. */
export function BookMeetingButton({
  className = "",
  label = CTA_LABELS.meeting,
  source,
  variant = "outline",
}: BtnProps & { variant?: "primary" | "outline" | "ghost" }) {
  const { openMeeting } = useCta();
  const base =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : variant === "outline"
        ? "border border-white/25 text-white hover:bg-white/10"
        : "text-white/80 hover:text-white underline underline-offset-4";
  const pad = variant === "ghost" ? "" : "px-6 py-3 rounded-xl";
  return (
    <button
      type="button"
      onClick={() => openMeeting({ source })}
      className={`inline-flex items-center gap-2 font-semibold ${pad} ${base} ${FOCUS} ${className}`}
    >
      {label}
    </button>
  );
}

/** Simple site-wide quote request — opens a short popup form. */
export function QuoteButton({
  className = "",
  label = CTA_LABELS.quote,
  booth,
  size,
  source,
  variant = "light",
}: BtnProps & { variant?: "light" | "outline" | "ghost" }) {
  const { openQuote } = useCta();
  const base =
    variant === "light"
      ? "bg-white text-black hover:bg-white/90"
      : variant === "outline"
        ? "border border-white/25 text-white hover:bg-white/10"
        : "text-white/70 hover:text-white";
  const pad = variant === "ghost" ? "" : "px-6 py-3 rounded-xl";
  return (
    <button
      type="button"
      onClick={() => openQuote({ booth, size, source })}
      className={`inline-flex items-center gap-2 font-semibold ${pad} ${base} ${FOCUS} ${className}`}
    >
      {label} <span aria-hidden>→</span>
    </button>
  );
}


/** Map an incoming size seed ("10×20", "10x20 ft") onto a footprint option value. */
function normalizeFootprint(seed?: string): string {
  if (!seed) return "";
  const key = seed.toLowerCase().replace(/×/g, "x").replace(/[^0-9a-z]/g, "");
  const hit = FOOTPRINT_OPTIONS.find(
    (o) => o.value.toLowerCase().replace(/[^0-9a-z]/g, "") === key,
  );
  return hit ? hit.value : "";
}

function QuickQuoteModal({
  open,
  onOpenChange,
  seed,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  seed: { booth?: string; size?: string; source?: string };
}) {
  const pre = useLeadPrefill();
  const { openDesign } = useCta();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(normalizeFootprint(seed.size));
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState(pre.timeline);
  const [where, setWhere] = useState(pre.city);
  const [citySlug, setCitySlug] = useState(pre.citySlug);
  const [show, setShow] = useState(pre.show);
  const [showSlug, setShowSlug] = useState(pre.showSlug);

  useEffect(() => {
    if (open) {
      setSent(false);
      setSending(false);
      setError(null);
      setSize(normalizeFootprint(seed.size));
      setBudget("");
      setTimeline(pre.timeline);
      setWhere(pre.city);
      setCitySlug(pre.citySlug);
      setShow(pre.show);
      setShowSlug(pre.showSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed.size, pre.city, pre.show, pre.timeline]);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const form = new FormData(e.currentTarget);
    const result = await submitLead({
      source: seed.source ? `quick-quote:${seed.source}` : "quick-quote",
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      footprint: size,
      city: where,
      show,
      message: String(form.get("message") ?? ""),
      meta: {
        ...(seed.booth ? { booth: seed.booth } : {}),
        ...(budget ? { budget } : {}),
        ...(timeline ? { timeline } : {}),
        ...(citySlug ? { citySlug } : {}),
        ...(showSlug ? { showSlug } : {}),
      },


    });
    setSending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0b0b0d] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight">Get your exact quote</DialogTitle>
          <DialogDescription className="text-white/70">
            {seed.booth ? `${seed.booth} — ` : ""}Online ranges are starting points only. Give us your show, footprint
            and dates and a Traction X designer replies within one business day with accurate pricing for your booth.
          </DialogDescription>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">
            About 60 seconds · 5 fields · no obligation
          </p>
        </DialogHeader>


        {sent ? (
          <SuccessPanel
            title="Request received"
            body="Thanks — we'll email your scoped estimate within one business day. Pricing we share is an approximate estimate for planning only and is confirmed in writing."
          >
            <button
              type="button"
              onClick={() => openDesign({ source: "quote-confirmation" })}
              className="w-full bg-[oklch(0.78_0.13_300)] text-black font-semibold py-3.5 rounded-xl hover:opacity-90"
            >
              Add a complimentary 3D design →
            </button>
          </SuccessPanel>

        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <figure className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <blockquote className="text-[12px] leading-relaxed text-white/75">
                “Turned around a last-minute booth in under three weeks, handled all logistics, and set us up in a
                professional-looking booth.”
              </blockquote>
              <figcaption className="mt-1.5 text-[11px] text-white/55">Marketing Lead, SaaS client</figcaption>
            </figure>
            <ChoiceChips
              label="Booth footprint"
              options={FOOTPRINT_OPTIONS}
              value={size}
              onChange={setSize}
              size="sm"
            />
            <ChoiceChips label="Budget band" options={BUDGET_OPTIONS} value={budget} onChange={setBudget} size="sm" />
            <ChoiceChips label="Timeline" options={TIMELINE_OPTIONS} value={timeline} onChange={setTimeline} size="sm" />
            <Field label="Show name (optional)">
              <Autocomplete
                kind="show"
                value={show}
                onChange={(v) => {
                  setShow(v);
                  setShowSlug(matchExact(SHOW_SUGGESTIONS, v)?.slug ?? "");
                }}
                onSelectEntry={(entry) => {
                  setShowSlug(entry.slug);
                  if (!where && entry.city) setWhere(entry.city);
                }}
                placeholder="Start typing — e.g. CES"
              />
            </Field>
            <Field label="Show city">
              <Autocomplete
                kind="city"
                value={where}
                maxLength={100}
                onChange={(v) => {
                  setWhere(v);
                  setCitySlug(matchExact(CITY_SUGGESTIONS, v)?.slug ?? "");
                }}
                onSelectEntry={(entry) => setCitySlug(entry.slug)}
                placeholder="Start typing — e.g. Las"
              />
            </Field>


            <Field label="What do you need? (optional)">
              <textarea
                rows={3}
                name="message"
                maxLength={1000}
                placeholder="Custom build or rental, show dates, must-haves…"
                className="w-full resize-none bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
              />
            </Field>
            <Field label="Name">
              <Input
                required
                name="name"
                maxLength={100}
                placeholder="Jane Doe"
                onInvalid={(e) => e.currentTarget.setCustomValidity("We just need a name to address the quote to.")}
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </Field>
            <Field label="Work email">
              <Input
                required
                name="email"
                type="email"
                maxLength={255}
                placeholder="you@company.com"
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity("Add a work email so we can send your pricing — nothing else.")
                }
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </Field>

            {error && (
              <p role="alert" className="text-[11px] text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className={`w-full mt-1 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-white/90 disabled:opacity-60 ${FOCUS}`}
            >
              {sending ? "Sending…" : `${CTA_LABELS.quote} →`}
            </button>
            <CtaNote kind="quote" />
            <ResponsePromise />

            <p className="text-[11px] leading-relaxed text-white/55">
              Any pricing shared is an approximate, non-binding estimate for budgeting only — final pricing is confirmed
              in writing by a Traction X designer.
            </p>

          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Reusable banner pairing both CTAs — drop into any page section. */
export function DesignCtaBand({
  heading = "Complimentary 3D design — see your booth before you spend a dollar",
  body = "Send us your footprint, brand and goals. A Traction X designer builds a photoreal 3D concept of your space at no cost and no obligation, then walks you through it live.",
  source,
}: {
  heading?: string;
  body?: string;
  source?: string;
}) {
  const city = useCityContext();
  return (
    <section className="border-b border-white/10 bg-gradient-to-r from-[oklch(0.78_0.13_300)]/[0.14] to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)] mb-4">
            Free · No obligation{city ? ` · ${city.label}` : ""}
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight max-w-2xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">{body}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <li>✓ Preliminary direction within two business days</li>
            <li>✓ Branded to your guidelines</li>
            <li>✓ Full design in roughly one to two weeks</li>
            <li>✓ Yours to keep</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <Design3DButton source={source} className="justify-center text-base py-4" />
          <CtaNote kind="design" className="text-center" />
          <BookMeetingButton source={source} variant="ghost" className="justify-center pt-1 text-sm" />
          <p className="text-[11px] text-white/55 text-center">
            10-minute touch base for anyone · 30-minute design strategy session for $10K+ projects
          </p>
        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 3D design modal                                                             */
/* -------------------------------------------------------------------------- */

function Design3DModal({
  open,
  onOpenChange,
  seed,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  seed: { booth?: string; size?: string; source?: string };
}) {
  const pre = useLeadPrefill();
  const { openMeeting } = useCta();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(normalizeFootprint(seed.size));
  const [budget, setBudget] = useState("");
  const [projectType, setProjectType] = useState("");
  const [where, setWhere] = useState(pre.city);
  const [citySlug, setCitySlug] = useState(pre.citySlug);
  const [show, setShow] = useState(pre.show);
  const [showSlug, setShowSlug] = useState(pre.showSlug);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const form = new FormData(e.currentTarget);
    const result = await submitLead({
      source: seed.source ? `3d-design:${seed.source}` : "3d-design",
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      ...smsLeadFields(smsOptIn),
      show,
      city: where,
      footprint: size,
      message: String(form.get("message") ?? ""),
      wants3D: true,
      meta: {
        ...(seed.booth ? { booth: seed.booth } : {}),
        ...(budget ? { budget } : {}),
        ...(projectType ? { projectType } : {}),
        ...(citySlug ? { citySlug } : {}),
        ...(showSlug ? { showSlug } : {}),
      },
    });

    setSending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  }

  useEffect(() => {
    if (open) {
      setSent(false);
      setSending(false);
      setError(null);
      setSize(normalizeFootprint(seed.size));
      setSmsOptIn(false);
      setPhone("");
      setBudget("");
      setProjectType("");
      setWhere(pre.city);
      setCitySlug(pre.citySlug);
      setShow(pre.show);
      setShowSlug(pre.showSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed.size, pre.city, pre.show]);



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[88vh] overflow-y-auto bg-[#0b0b0d] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight">
            Start your complimentary 3D design
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {seed.booth ? `${seed.booth} — ` : ""}Free, no obligation. A designer sends preliminary concept direction and
            investment within two business days, then develops the photoreal 3D concept, layout and costed scope over
            roughly one to two weeks as the project develops.
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <SuccessPanel
            title="Design brief received"
            body="A Traction X designer will reach out within one business day to confirm your goals, then send preliminary concept direction and investment within two business days. Full 3D design develops over roughly one to two weeks — no cost, no obligation, renders are yours to keep."
          >
            <button
              type="button"
              onClick={() => openMeeting({ source: "design-confirmation" })}
              className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-white/90"
            >
              Book a virtual meeting to review it →
            </button>
          </SuccessPanel>

        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name">
                <Input required name="name" maxLength={100} placeholder="Jane Doe" />
              </Field>
              <Field label="Company">
                <Input required name="company" maxLength={120} placeholder="Company Inc." />
              </Field>
              <Field label="Work email">
                <Input required name="email" type="email" maxLength={255} placeholder="you@company.com" />
              </Field>
              <Field label={smsOptIn ? "Mobile number" : "Phone (optional)"}>
                <Input
                  name="phone"
                  type="tel"
                  required={smsOptIn}
                  maxLength={30}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>

              <Field label="Show / event">
                <Autocomplete
                  kind="show"
                  value={show}
                  onChange={(v) => {
                    setShow(v);
                    setShowSlug(matchExact(SHOW_SUGGESTIONS, v)?.slug ?? "");
                  }}
                  onSelectEntry={(entry) => {
                    setShowSlug(entry.slug);
                    if (!where && entry.city) setWhere(entry.city);
                  }}
                  placeholder="Start typing — e.g. CES"
                />
              </Field>
              <Field label="Show city">
                <Autocomplete
                  kind="city"
                  value={where}
                  maxLength={100}
                  onChange={(v) => {
                    setWhere(v);
                    setCitySlug(matchExact(CITY_SUGGESTIONS, v)?.slug ?? "");
                  }}
                  onSelectEntry={(entry) => setCitySlug(entry.slug)}
                  placeholder="Start typing — e.g. Las"
                />
              </Field>

            </div>

            <ChoiceChips label="Booth footprint" options={FOOTPRINT_OPTIONS} value={size} onChange={setSize} size="sm" />

            <ChoiceChips
              label="Project type"
              options={PROJECT_TYPE_OPTIONS}
              value={projectType}
              onChange={setProjectType}
              size="sm"
            />

            <ChoiceChips label="Budget band" options={BUDGET_OPTIONS} value={budget} onChange={setBudget} size="sm" />


            <Field label="What should the booth do for you?">
              <textarea
                rows={3}
                name="message"
                maxLength={1000}
                placeholder="Demo stations, meeting room, product wall, hospitality, lead capture goals…"
                className="w-full resize-none bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
              />
            </Field>

            <FileAttach label="Brand guidelines, floor plan or references (optional)" />

            <SmsOptIn checked={smsOptIn} onChange={setSmsOptIn} needsPhone={!phone.trim()} />

            {error && (
              <p role="alert" className="text-[11px] text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending || !size}

              className="w-full mt-1 bg-[oklch(0.78_0.13_300)] text-black font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Start my free 3D design →"}
            </button>
            <ResponsePromise />

            <p className="text-[11px] leading-relaxed text-white/60">
              Complimentary and non-binding. Any budget figures we share alongside your concept are approximate
              estimates for planning only — final pricing is confirmed in writing.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Meeting modal                                                               */
/* -------------------------------------------------------------------------- */

function MeetingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [band, setBand] = useState("");
  const qualified = MEETING_BUDGET_OPTIONS.some((o) => o.value === band && o.qualified);

  useEffect(() => {
    if (open) setBand("");
  }, [open]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-[#0b0b0d] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight">Book a virtual meeting</DialogTitle>
          <DialogDescription className="text-white/60">
            Pick the slot that fits where you are in planning. Both are video calls with a Traction X designer — screen
            share, floor plans and 3D concepts welcome.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <a
            href={SITE.calendly10}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-white/15 p-5 hover:border-white/35 hover:bg-white/5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-lg font-bold uppercase tracking-tight">10-minute touch base</div>
                <p className="mt-1 text-sm text-white/60">
                  Open to anyone. Quick intro, ballpark budget ranges, timelines and whether a free 3D design makes
                  sense for your show.
                </p>
              </div>
              <span className="text-white/50 shrink-0">→</span>
            </div>
          </a>

          <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.08] p-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)] border border-[oklch(0.78_0.13_300)]/40 rounded-full px-2 py-0.5">
                Qualified projects
              </span>
            </div>
            <div className="mt-2 font-display text-lg font-bold uppercase tracking-tight">
              30-minute design strategy session
            </div>
            <p className="mt-1 text-sm text-white/65">
              A working session for projects with a budget over $10,000 — floor plan review, layout options, 3D design
              kickoff and a build schedule for your show.
            </p>
            <ChoiceChips
              className="mt-4"
              label="My project budget is"
              options={MEETING_BUDGET_OPTIONS}
              value={band}
              onChange={setBand}
              size="sm"
            />
            {qualified ? (
              <a
                href={SITE.calendly30}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-center bg-[oklch(0.78_0.13_300)] text-black font-semibold py-3.5 rounded-xl hover:opacity-90"
              >
                Book my 30-minute session →
              </a>
            ) : (
              <p className="mt-4 text-[11px] text-white/60">
                Pick a budget band over $10,000 to unlock 30-minute booking — or grab the 10-minute touch base,
                it&apos;s open to everyone.
              </p>
            )}

          </div>

          <p className="text-[11px] text-white/60">
            Prefer to talk now? Call{" "}
            <a href={`tel:${SITE.phone}`} className="text-white/70 hover:text-white underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${SITE.email}`} className="text-white/70 hover:text-white underline underline-offset-4">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Session nudge                                                               */
/* -------------------------------------------------------------------------- */

function DesignNudge({ onDismiss, onStart }: { onDismiss: () => void; onStart: () => void }) {
  return (
    <div className="fixed z-50 bottom-20 lg:bottom-6 right-4 left-4 sm:left-auto sm:w-[360px]">
      <div className="relative rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[#0b0b0d]/98 backdrop-blur shadow-2xl p-5">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full border border-white/20 bg-black text-white/70 hover:text-white text-sm"
        >
          ×
        </button>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">Complimentary</p>
        <div className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight text-white">
          See your booth in 3D — free
        </div>
        <p className="mt-1.5 text-sm text-white/65">
          Our designers build a photoreal 3D concept of your space at no cost, so you can see the vision before you
          commit.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onStart}
            className="flex-1 bg-[oklch(0.78_0.13_300)] text-black font-semibold py-2.5 rounded-xl text-sm hover:opacity-90"
          >
            Start my free 3D design →
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-3 text-sm text-white/50 hover:text-white"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-white/60 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
    />
  );
}

export { PURPLE };
