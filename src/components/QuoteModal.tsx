import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileAttach } from "@/components/FileAttach";
import { ChoiceChips } from "@/components/ChoiceChips";
import { Autocomplete } from "@/components/Autocomplete";
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from "@/data/lead-options";
import { RENTAL_SIZES } from "@/data/rental-booths";
import { submitLead } from "@/lib/leads";
import { SmsOptIn, SmsOptInConfirmation, smsLeadFields } from "@/components/SmsOptIn";
import { useLeadPrefill } from "@/lib/lead-prefill";
import { CITY_SUGGESTIONS, SHOW_SUGGESTIONS, matchExact } from "@/lib/place-suggest";
import { ResponsePromise, WhatHappensNext, CallCta } from "@/components/Conversion";



export type QuoteMode = "instant" | "email" | "customize";

export const ESTIMATE_DISCLAIMER =
  "Figures shown are starting-from ranges for budgeting only — not a quote. Send us your show, footprint and dates and a designer returns an accurate quote, usually within one business day.";



export const ESTIMATE: Record<string, string> = {
  "10x10": "$16,250 – $23,400",
  "10x20": "$22,750 – $35,100",
  "10x30": "$33,800 – $49,400",
  "10x40": "$44,200 – $62,400",
  "10x50": "$54,600 – $78,000",
  "20x20": "$39,000 – $59,800",
  "20x30": "$57,200 – $84,500",
  "20x40": "$75,400 – $110,500",
  "20x50": "$93,600 – $136,500",
  "40x40": "$143,000 – $208,000",
  "40x50": "$175,500 – $253,500",
  Larger: "$195,000+",
  Custom: "Scoped to your plan",
};

function sizeLabel(size: string) {
  return size === "Custom" || size === "Larger" ? size : `${size.replace("x", " × ")} ft`;
}

export const RUSH_MULTIPLIER = 1.3;

/** True when the show date is inside the 30-day rush window. */
export function isRushDate(value: string): boolean {
  if (!value) return false;
  const show = new Date(`${value}T00:00:00`);
  if (Number.isNaN(show.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = (show.getTime() - today.getTime()) / 86_400_000;
  return days >= 0 && days <= 30;
}

/** Re-price a "$16,250 – $23,400" style range by the rush multiplier. */
export function applyRush(range: string, mult = RUSH_MULTIPLIER): string {
  if (!/\d/.test(range)) return range;
  return range.replace(/\$[\d,]+/g, (m) => {
    const n = Number(m.replace(/[$,]/g, ""));
    if (!Number.isFinite(n)) return m;
    return `$${(Math.round((n * mult) / 50) * 50).toLocaleString("en-US")}`;
  });
}

export function QuoteModal({
  open,
  onOpenChange,
  mode,
  boothName,
  boothSize,
  city,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: QuoteMode;
  boothName?: string;
  boothSize?: string;
  city?: string;
}) {
  const pre = useLeadPrefill();
  const [size, setSize] = useState(boothSize ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [where, setWhere] = useState(city ?? pre.city);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [show, setShow] = useState(pre.show);
  const [showDate, setShowDate] = useState(pre.showDate);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState(pre.timeline);
  const [citySlug, setCitySlug] = useState(pre.citySlug);
  const [showSlug, setShowSlug] = useState(pre.showSlug);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSize(boothSize ?? "");
      setWhere(city ?? pre.city);
      setShow(pre.show);
      setShowDate(pre.showDate);
      setBudget("");
      setTimeline(pre.timeline);
      setCitySlug(pre.citySlug);
      setShowSlug(pre.showSlug);
      setSent(false);
      setError(null);
      setSending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, boothSize, city, pre.city, pre.show, pre.showDate, pre.timeline]);


  const instant = mode === "instant";
  const customize = mode === "customize";
  const rush = isRushDate(showDate);
  const baseEstimate = size ? ESTIMATE[size] : null;
  const estimate = baseEstimate ? (rush ? applyRush(baseEstimate) : baseEstimate) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-[#0b0b0d] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight">
            {instant ? "Instant quote" : customize ? "Customize this booth" : "Request a quote"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {boothName ? `${boothName} — ` : ""}
            {instant
              ? "Your range on screen in seconds, then a designer confirms the custom details by phone."
              : customize
                ? "Tell us what you'd change — layout, millwork, AV, storage, branding — and a designer will send a custom concept and pricing."
                : "Tell us the footprint and we'll email a tailored custom-rental quote within one business day."}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-6">
            {instant && estimate && (
              <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 p-5">
                <div className="text-[11px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">
                  Estimated investment · {sizeLabel(size)}
                </div>
                <div className="mt-2 font-display text-3xl font-bold">{estimate}</div>
                <p className="mt-2 text-xs text-white/55">
                  Approximate range only — not a final quote. Covers a fully custom rental including structure, custom
                  graphics, lighting and AV, plus install and dismantle. Freight and drayage (billed by the venue) are
                  quoted separately.
                </p>
                {rush && (
                  <div className="mt-3 rounded-lg border border-white/15 bg-black/40 p-3 text-xs text-white/70">
                    <span className="font-semibold text-white">Includes a 30% rush uplift.</span> Your show is inside 30
                    days, so this range reflects expedited fabrication, graphics and freight. The rush fee can be waived
                    by a project manager in certain cases — ask when we call.
                  </div>
                )}
              </div>
            )}
            <p className="mt-4 text-white/70 text-sm">
              Thanks — we&apos;ve got your details
              {instant
                ? " and will call to customize further"
                : customize
                  ? " and a designer will follow up with a custom concept"
                  : " and will email your quote shortly"}
              . Every booth we build is 100% custom, so we&apos;ll walk through finishes, layout and branding with you.
            </p>
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/50">What happens next</div>
              <WhatHappensNext className="mt-2.5" />
            </div>
            {smsOptIn && <SmsOptInConfirmation phone={phone} className="mt-4" />}
            <div className="mt-4 border-t border-white/10 pt-3">
              <CallCta source="quote-modal-success" note="Need it sooner? Call and we'll pick it up today." />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-white/45">{ESTIMATE_DISCLAIMER}</p>
          </div>
        ) : (
          <form
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSending(true);
              const result = await submitLead({
                source: instant ? "quote-modal-instant" : customize ? "quote-modal-customize" : "quote-modal-email",
                email,
                phone,
                ...smsLeadFields(smsOptIn),
                footprint: size,
                city: where,
                show: showDate ? `${show} (${showDate})`.trim() : show,
                message: notes,
                meta: {
                  ...(boothName ? { booth: boothName } : {}),
                  ...(showDate ? { showDate } : {}),
                  ...(budget ? { budget } : {}),
                  ...(timeline ? { timeline } : {}),
                  ...(citySlug ? { citySlug } : {}),
                  ...(showSlug ? { showSlug } : {}),
                  ...(rush ? { rushFee: "30% (within 30 days)" } : {}),

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
                setError(result.error);
                return;
              }
              setSent(true);
            }}
          >
            <ChoiceChips
              label="Booth size"
              options={RENTAL_SIZES.map((s) => ({ value: s, label: sizeLabel(s) }))}
              value={size}
              onChange={setSize}
              size="sm"
              hint={size ? undefined : "Tap the footprint closest to your space."}
            />

            <ChoiceChips
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



            <Field label="Work email">
              <input
                required
                type="email"
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
              />
            </Field>

            {(instant || smsOptIn) && (
              <Field label={instant ? "Phone" : "Mobile number"}>
                <input
                  required
                  type="tel"
                  maxLength={30}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                />
              </Field>
            )}

            <Field label={instant ? "Show city" : "Show city (optional)"}>
              <Autocomplete
                kind="city"
                required={instant}
                value={where}
                maxLength={100}
                onChange={(v) => {
                  setWhere(v);
                  setCitySlug(matchExact(CITY_SUGGESTIONS, v)?.slug ?? "");
                }}
                onSelectEntry={(entry) => setCitySlug(entry.slug)}
                placeholder="Start typing — e.g. Las"
              />
              {instant && (
                <span className="mt-1 block text-[11px] text-white/40">
                  City sets the labour and show-services tier we price against.
                </span>
              )}
            </Field>

            {instant && (
              <>
                <Field label="Show name">
                  <Autocomplete
                    kind="show"
                    required
                    value={show}
                    onChange={(v) => {
                      setShow(v);
                      setShowSlug(matchExact(SHOW_SUGGESTIONS, v)?.slug ?? "");
                    }}
                    onSelectEntry={(entry) => {
                      setShowSlug(entry.slug);
                      if (!where && entry.city) setWhere(entry.city);
                      if (!showDate && entry.startDate) setShowDate(entry.startDate);
                    }}
                    placeholder="Start typing — e.g. CES"
                  />
                </Field>


                <Field label="Show start date (optional)">
                  <input
                    type="date"
                    value={showDate}
                    onChange={(e) => setShowDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                  />
                </Field>

                {rush && (
                  <p className="rounded-lg border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-3 py-2.5 text-[11px] leading-relaxed text-white/75">
                    Your show is within 30 days, so your range includes a 30% rush uplift for expedited fabrication and
                    freight. A project manager can waive the rush fee in certain cases.
                  </p>
                )}
              </>
            )}

            {!instant && (
              <Field
                label={
                  customize
                    ? "What would you like customized?"
                    : "What do you want customized? (optional)"
                }
              >
                <textarea
                  rows={customize ? 4 : 3}
                  required={customize}
                  maxLength={1000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Millwork counters, hanging sign, demo stations, storage…"
                  className="w-full resize-none bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
                />
              </Field>
            )}

            <div>
              <FileAttach
                label="Attach a design, floor plan or RFP (optional)"
                hint="Booth drawings, floor plans, RFPs, brand guidelines — PDF, DOC, PPT, PNG, JPG, DWG, DXF, ZIP"
                onFilesChange={setAttachments}
              />
              <p className="mt-1.5 text-[10px] text-white/40">
                Sending a drawing or RFP lets us price the real thing — used only to prepare your quote.
              </p>
            </div>

            {error && (
              <p role="alert" className="text-[11px] text-red-300">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending || !size}
              className={
                instant
                  ? "w-full mt-1 bg-[oklch(0.78_0.13_300)] text-black font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60"
                  : "w-full mt-1 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-white/90 disabled:opacity-60"
              }
            >
              {sending
                ? "Sending…"
                : instant
                  ? "Show my instant quote →"
                  : customize
                    ? "Send my customization request →"
                    : "Email me a quote →"}
            </button>
            <ResponsePromise />
            <p className="text-[11px] text-white/45">
              Every design is rebranded and rebuilt to your spec — you can customize further at any point in the process.
            </p>
            <p className="text-[11px] leading-relaxed text-white/40">{ESTIMATE_DISCLAIMER}</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.24em] text-white/60 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
