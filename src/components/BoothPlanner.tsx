import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { ChoiceChips } from "@/components/ChoiceChips";
import { Autocomplete } from "@/components/Autocomplete";
import { FileAttach } from "@/components/FileAttach";
import { ResponsePromise, StepProgress, SuccessPanel } from "@/components/Conversion";
import { SmsOptIn, SmsOptInConfirmation, smsLeadFields } from "@/components/SmsOptIn";
import { useCta } from "@/components/GlobalCta";
import { useLeadPrefill } from "@/lib/lead-prefill";
import { submitLead } from "@/lib/leads";
import { track, trackFormStep } from "@/lib/analytics";
import { generateBoothPlan } from "@/lib/pdf-lazy";
import { RENTAL_BOOTHS } from "@/data/rental-booths";
import {
  EMPTY_ANSWERS,
  PLAN_BUDGET,
  PLAN_COMPONENTS,
  PLAN_EXISTING,
  PLAN_FREQUENCY,
  PLAN_GOALS,
  PLAN_OWNERSHIP,
  PLAN_PATHS,
  PLAN_PORTABLE_NEEDS,
  PLAN_PORTABLE_SIZE,
  PLAN_PRIORITIES,
  PLAN_SERVICE,
  PLAN_SLIDERS,
  PLAN_SPACES,
  PLAN_STAGE,
  PLAN_STORAGE_KEY,
  PLAN_TIERS,
  PLAN_TIMELINE,
  PLAN_TRAVEL,
  PROFILE_LABEL,
  boothProfile,
  investmentRange,
  isStepComplete,
  pathOf,
  planSummaryText,
  recommend,
  scorePlan,
  servicesRange,
  slugify,
  stepTitle,
  stepsFor,
  suggestedComponents,
  type PlanAnswers,
  type ProfileKey,
  type SliderId,
  type StepId,
} from "@/lib/booth-plan";

const PURPLE = "oklch(0.78_0.13_300)";
const CARD = "rounded-xl border border-white/12 bg-white/[0.02] p-5";
const FOCUS = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)]";

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

function OptionCard({
  label,
  note,
  selected,
  onClick,
  children,
}: {
  label: string;
  note?: string;
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition ${FOCUS} ${
        selected
          ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/12"
          : "border-white/12 bg-black/40 hover:border-white/30"
      }`}
    >
      <span className="block font-semibold text-white">{label}</span>
      {note ? <span className="mt-1 block text-[12px] leading-relaxed text-white/60">{note}</span> : null}
      {children}
    </button>
  );
}

function MultiChips({
  options,
  value,
  onToggle,
}: {
  options: { value: string; label: string }[];
  value: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o.value)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${FOCUS} ${
              on
                ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
                : "border-white/15 bg-black/50 text-white/70 hover:border-white/35 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-[11px] text-white/40">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[oklch(0.78_0.13_300)] focus:outline-none";

function ProfileBars({ profile }: { profile: Record<ProfileKey, number> }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {(Object.keys(profile) as ProfileKey[]).map((k) => (
        <div key={k}>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-white/70">{PROFILE_LABEL[k]}</span>
            <span className="font-semibold text-[oklch(0.78_0.13_300)]">{profile[k]}/10</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[oklch(0.78_0.13_300)]"
              style={{ width: `${profile[k] * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Planner                                                                     */
/* -------------------------------------------------------------------------- */

export function BoothPlanner({ source = "booth-planner" }: { source?: string }) {
  const prefill = useLeadPrefill();
  const { openMeeting } = useCta();

  const [answers, setAnswers] = useState<PlanAnswers>(EMPTY_ANSWERS);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"questions" | "result">("questions");
  const [unlocked, setUnlocked] = useState(false);
  const [restored, setRestored] = useState(false);

  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "" });
  const [sms, setSms] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [detailSent, setDetailSent] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof PlanAnswers>(key: K, value: PlanAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const toggle = (key: "goals" | "components" | "portableNeeds", v: string) =>
    setAnswers((a) => {
      const list = a[key];
      return { ...a, [key]: list.includes(v) ? list.filter((x) => x !== v) : [...list, v] };
    });

  /* Restore a saved session and pre-fill event context from where they've been */
  useEffect(() => {
    if (restored) return;
    setRestored(true);
    let next: PlanAnswers | null = null;
    try {
      const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PlanAnswers>;
        next = { ...EMPTY_ANSWERS, ...parsed, sliders: { ...EMPTY_ANSWERS.sliders, ...(parsed.sliders ?? {}) } };
      }
    } catch {
      /* ignore */
    }
    const base = next ?? EMPTY_ANSWERS;
    setAnswers({
      ...base,
      city: base.city || prefill.city,
      citySlug: base.citySlug || prefill.citySlug,
      show: base.show || prefill.show,
      showDate: base.showDate || prefill.showDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restored]);

  /* Persist every answer change */
  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* quota */
    }
  }, [answers, restored]);

  const steps = useMemo(() => stepsFor(answers), [answers]);
  const step = steps[Math.min(idx, steps.length - 1)] ?? "space";
  const canAdvance = isStepComplete(step, answers);

  /* Pre-tick components once the tier and goals are known */
  useEffect(() => {
    if (step !== "components" || answers.components.length) return;
    setAnswers((a) => ({ ...a, components: suggestedComponents(a) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function next() {
    if (!canAdvance) return;
    trackFormStep("booth-planner", idx + 1, steps.length, source);
    if (idx + 1 >= steps.length) {
      setPhase("result");
      track("booth_plan_complete", {
        cta_source: source,
        booth_space: answers.space,
        plan_score: scorePlan(answers).score,
      });
    } else {
      setIdx(idx + 1);
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function back() {
    if (phase === "result") {
      setPhase("questions");
      setIdx(steps.length - 1);
    } else if (idx > 0) {
      setIdx(idx - 1);
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restart() {
    setAnswers({ ...EMPTY_ANSWERS });
    setIdx(0);
    setPhase("questions");
    setUnlocked(false);
    setDetailSent(false);
  }

  /* ---------------------------------------------------------------------- */
  /* Derived plan                                                            */
  /* ---------------------------------------------------------------------- */

  const rec = useMemo(() => recommend(answers), [answers]);
  const profile = useMemo(() => boothProfile(answers), [answers]);
  const range = useMemo(() => investmentRange(answers), [answers]);
  const services = useMemo(() => servicesRange(answers), [answers]);
  const score = useMemo(() => scorePlan(answers), [answers]);

  const matches = useMemo(() => {
    const space = PLAN_SPACES.find((s) => s.value === answers.space);
    if (!space) return [];
    const wanted = space.value.includes("x") ? space.value : "20x20";
    const pool = RENTAL_BOOTHS.filter((b) => b.size === wanted);
    const list = pool.length ? pool : RENTAL_BOOTHS.filter((b) => b.size === "20x20");
    return list.slice(0, 3);
  }, [answers.space]);

  const leadMeta = () => ({
    plan: answers,
    recommendation: rec.headline,
    construction: rec.construction,
    profile,
    estimateLow: range.low,
    estimateHigh: range.high,
    servicesLow: services.low,
    servicesHigh: services.high,
    leadScore: score.score,
    leadBand: score.bandLabel,
    signals: score.signals,
    summary: planSummaryText(answers, contact),
  });

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await submitLead({
      source,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      footprint: PLAN_SPACES.find((s) => s.value === answers.space)?.label ?? "",
      city: answers.city,
      show: answers.show,
      message: answers.notes,
      wants3D: true,
      ...smsLeadFields(sms),
      meta: leadMeta(),
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setUnlocked(true);
    track("booth_plan_unlocked", { cta_source: source, plan_score: score.score, lead_band: score.band });
  }

  async function sendDetail() {
    setBusy(true);
    await submitLead({
      source: `${source}-detail`,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      footprint: PLAN_SPACES.find((s) => s.value === answers.space)?.label ?? "",
      city: answers.city,
      show: answers.show,
      message: answers.notes,
      meta: leadMeta(),
    });
    setBusy(false);
    setDetailSent(true);
    track("booth_plan_detail_added", { cta_source: source });
  }

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <div ref={topRef} id="planner" className="scroll-mt-24">
      {phase === "questions" ? (
        <div className="rounded-2xl border border-white/12 bg-white/[0.02] p-6 md:p-8">
          <StepProgress step={idx + 1} total={steps.length} estimate="about 2 minutes" className="mb-6" />

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {stepTitle(step)}
          </h2>

          <div className="mt-6">{renderStep(step)}</div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            {idx > 0 ? (
              <button
                type="button"
                onClick={back}
                className={`rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 ${FOCUS}`}
              >
                Back
              </button>
            ) : null}
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              className={`rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-2.5 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS}`}
            >
              {idx + 1 >= steps.length ? "See my booth plan" : "Continue"} <span aria-hidden>→</span>
            </button>
            <span className="text-[11px] text-white/45">No email needed to see your plan.</span>
          </div>
        </div>
      ) : (
        renderResult()
      )}
    </div>
  );

  /* ---------------------------------------------------------------------- */

  function renderStep(id: StepId) {
    switch (id) {
      case "space":
        return (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLAN_SPACES.map((s) => (
              <OptionCard
                key={s.value}
                label={s.label}
                note={s.note}
                selected={answers.space === s.value}
                onClick={() => set("space", s.value)}
              />
            ))}
          </div>
        );

      case "priority":
        return (
          <>
            <p className="-mt-3 mb-5 max-w-2xl text-sm text-white/60">
              This is the single most useful answer you can give us — it tells us where your money should go.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLAN_PRIORITIES.map((p) => (
                <OptionCard
                  key={p.value}
                  label={p.label}
                  note={p.note}
                  selected={answers.priority === p.value}
                  onClick={() => set("priority", p.value)}
                />
              ))}
            </div>
          </>
        );

      case "path":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {PLAN_PATHS.map((p) => (
              <OptionCard
                key={p.value}
                label={p.label}
                note={p.note}
                selected={answers.path === p.value}
                onClick={() => set("path", p.value)}
              >
                <ul className="mt-3 space-y-1.5 text-[12px] text-white/55">
                  {p.blurb.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </OptionCard>
            ))}
          </div>
        );

      case "portable":
        return (
          <div className="space-y-7">
            <ChoiceChips
              label="How will you normally travel with it?"
              options={PLAN_TRAVEL}
              value={answers.travel}
              onChange={(v) => set("travel", v)}
            />
            <ChoiceChips
              label="What booth size will it be used in?"
              options={PLAN_PORTABLE_SIZE}
              value={answers.portableSize}
              onChange={(v) => set("portableSize", v)}
            />
            <div>
              <span className="mb-1.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                What do you need included?
              </span>
              <MultiChips
                options={PLAN_PORTABLE_NEEDS}
                value={answers.portableNeeds}
                onToggle={(v) => toggle("portableNeeds", v)}
              />
            </div>
          </div>
        );

      case "tier":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {PLAN_TIERS.map((t) => (
              <OptionCard
                key={t.value}
                label={t.label}
                note={t.note}
                selected={answers.tier === t.value}
                onClick={() => set("tier", t.value)}
              >
                <ul className="mt-3 space-y-1 text-[12px] text-white/55">
                  {t.includes.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
                <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.22em] text-[oklch(0.78_0.13_300)]">
                  {t.headline} tier
                </span>
              </OptionCard>
            ))}
          </div>
        );

      case "goals":
        return (
          <>
            <p className="-mt-3 mb-5 max-w-2xl text-sm text-white/60">
              A booth should be designed around what people need to do in it, not just how it looks. Pick
              everything that applies.
            </p>
            <MultiChips options={PLAN_GOALS} value={answers.goals} onToggle={(v) => toggle("goals", v)} />
          </>
        );

      case "sliders":
        return (
          <>
            <p className="-mt-3 mb-6 max-w-2xl text-sm text-white/60">
              Every booth has a finite amount of space and budget. Tell us where the investment should land and
              we&apos;ll protect those elements first when the numbers get tight.
            </p>
            <div className="space-y-5">
              {PLAN_SLIDERS.map((s) => (
                <div key={s.id} className={CARD}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{s.label}</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.78_0.13_300)]">
                      {["None", "Low", "Balanced", "High", "Priority"][answers.sliders[s.id]]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={1}
                    aria-label={s.label}
                    value={answers.sliders[s.id]}
                    onChange={(e) =>
                      setAnswers((a) => ({
                        ...a,
                        sliders: { ...a.sliders, [s.id as SliderId]: Number(e.target.value) },
                      }))
                    }
                    className="mt-3 w-full accent-[oklch(0.78_0.13_300)]"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-white/40">
                    <span>{s.low}</span>
                    <span>{s.high}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "components":
        return (
          <>
            <p className="-mt-3 mb-5 max-w-2xl text-sm text-white/60">
              We&apos;ve pre-selected what your tier and goals usually call for. Add or remove anything — this
              becomes the bill of materials our designers work from.
            </p>
            <div className="space-y-5">
              {PLAN_COMPONENTS.map((g) => (
                <div key={g.group} className={CARD}>
                  <span className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {g.group}
                  </span>
                  <MultiChips
                    options={g.items}
                    value={answers.components}
                    onToggle={(v) => toggle("components", v)}
                  />
                </div>
              ))}
            </div>
          </>
        );

      case "program":
        return (
          <div className="space-y-7">
            <ChoiceChips
              label="How often will you use it?"
              options={PLAN_FREQUENCY}
              value={answers.frequency}
              onChange={(v) => set("frequency", v)}
            />
            <ChoiceChips
              label="Rent or purchase?"
              options={PLAN_OWNERSHIP}
              value={answers.ownership}
              onChange={(v) => set("ownership", v)}
            />
            <div>
              <span className="mb-2.5 block text-[11px] uppercase tracking-[0.24em] text-white/60">
                How much should we handle?
              </span>
              <div className="grid gap-3 md:grid-cols-3">
                {PLAN_SERVICE.map((s) => (
                  <OptionCard
                    key={s.value}
                    label={s.label}
                    note={s.note}
                    selected={answers.service === s.value}
                    onClick={() => set("service", s.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case "event":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Event name">
                <Autocomplete
                  kind="show"
                  value={answers.show}
                  onChange={(v) => set("show", v)}
                  onSelectEntry={(entry) => {
                    setAnswers((a) => ({
                      ...a,
                      show: entry.value,
                      city: entry.city ?? a.city,
                      citySlug: entry.citySlug ?? (entry.city ? slugify(entry.city) : a.citySlug),
                      showDate: entry.startDate ?? a.showDate,
                    }));
                  }}
                  placeholder="Start typing your show…"
                  className={inputCls}
                />
              </Field>
              <Field label="City">
                <Autocomplete
                  kind="city"
                  value={answers.city}
                  onChange={(v) => setAnswers((a) => ({ ...a, city: v, citySlug: slugify(v) }))}
                  placeholder="Las Vegas, Toronto, Orlando…"
                  className={inputCls}
                />
              </Field>
              <Field label="Event dates" hint="Approximate is fine.">
                <input
                  type="text"
                  value={answers.showDate}
                  onChange={(e) => set("showDate", e.target.value)}
                  placeholder="e.g. March 12–15, 2027"
                  maxLength={80}
                  className={inputCls}
                />
              </Field>
              <Field label="Booth number (optional)">
                <input
                  type="text"
                  value={answers.boothNumber}
                  onChange={(e) => set("boothNumber", e.target.value)}
                  maxLength={30}
                  className={inputCls}
                />
              </Field>
            </div>
            <ChoiceChips
              label="When do you need the exhibit?"
              options={PLAN_TIMELINE}
              value={answers.timeline}
              onChange={(v) => set("timeline", v)}
            />
            <ChoiceChips
              label="Where are you in the process?"
              options={PLAN_STAGE}
              value={answers.stage}
              onChange={(v) => set("stage", v)}
            />
          </div>
        );

      case "budget":
        return (
          <div className="space-y-6">
            <div className={`${CARD} border-[oklch(0.78_0.13_300)]/30`}>
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                Your plan is already modelling
              </span>
              <div className="mt-1 font-display text-2xl font-bold text-[oklch(0.78_0.13_300)]">
                {range.label}
              </div>
              <p className="mt-1.5 text-[12px] text-white/55">
                Exhibit only, install and dismantle included. Show services quoted separately.
              </p>
            </div>
            <ChoiceChips
              label="What investment range are you considering?"
              options={PLAN_BUDGET}
              value={answers.budget}
              onChange={(v) => set("budget", v)}
              columns="grid"
            />
            <p className="max-w-2xl text-sm text-white/60">
              We design to your precise budget and needs with a tiered and à la carte menu — so the
              investment lands exactly where it has the greatest impact.
            </p>
          </div>
        );
    }
  }

  /* ---------------------------------------------------------------------- */

  function renderResult() {
    return (
      <div className="space-y-6">
        {/* Headline */}
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.07] p-6 md:p-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            Your recommended exhibit plan
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase leading-[1.05] tracking-tight">
            {rec.headline}
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Construction approach: <strong className="text-white">{rec.construction}</strong> ·{" "}
            {rec.serviceLine}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">{rec.why}</p>
        </div>

        {rec.rush ? (
          <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 text-sm text-amber-100">
            <strong className="font-semibold">Your show is inside four weeks.</strong> We can still build it —
            expedited fabrication, graphics and freight carry a rush premium of up to 30%, and venue drayage
            deadlines are already close. Call{" "}
            <a href="tel:+17824092527" className="underline underline-offset-2">
              1-782-409-2527
            </a>{" "}
            today rather than emailing.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD}>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">Suggested booth elements</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {rec.elements.map((e) => (
                <li key={e} className="flex gap-2.5">
                  <span className="text-[oklch(0.78_0.13_300)]">▪</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={CARD}>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">Your booth profile</h3>
            <div className="mt-4">
              <ProfileBars profile={profile} />
            </div>
          </div>
        </div>

        {/* Investment — gated */}
        <div className={`${CARD} relative overflow-hidden`}>
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">Estimated investment</h3>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Based on projects we quote with this combination of size, features and service level. Design,
            fabrication, graphics, lighting, project management and install/dismantle labour included.
          </p>

          <div className={`mt-5 grid gap-4 sm:grid-cols-2 ${unlocked ? "" : "select-none blur-[7px]"}`}>
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">Exhibit</span>
              <div className="mt-1 font-display text-2xl font-bold text-[oklch(0.78_0.13_300)]">
                {range.label}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                Show services (venue contractor)
              </span>
              <div className="mt-1 font-display text-2xl font-bold text-white/85">{services.label}</div>
            </div>
          </div>

          {!unlocked ? (
            <form onSubmit={unlock} className="mt-6 rounded-xl border border-white/12 bg-black/50 p-5">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[oklch(0.78_0.13_300)]">
                Your booth recommendation is ready
              </span>
              <p className="mt-2 text-sm text-white/70">
                Tell us where to send it and we&apos;ll unlock the investment range and your downloadable plan.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  className={inputCls}
                  placeholder="Full name"
                  value={contact.name}
                  maxLength={100}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  required
                />
                <input
                  className={inputCls}
                  placeholder="Company"
                  value={contact.company}
                  maxLength={120}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                />
                <input
                  className={inputCls}
                  type="email"
                  placeholder="Work email"
                  value={contact.email}
                  maxLength={255}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  required
                />
                <input
                  className={inputCls}
                  placeholder="Phone (optional)"
                  value={contact.phone}
                  maxLength={30}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                />
              </div>
              <SmsOptIn
                className="mt-3"
                checked={sms}
                onChange={setSms}
                needsPhone={sms && !contact.phone.trim()}
              />
              {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className={`mt-4 w-full rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-3 font-semibold text-black disabled:opacity-60 ${FOCUS}`}
              >
                {busy ? "Building your plan…" : "View my recommendation"}
              </button>
              <ResponsePromise className="mt-3" />
            </form>
          ) : null}
        </div>

        {/* Unlocked actions */}
        {unlocked ? (
          <div className={CARD}>
            <SuccessPanel
              title="Your plan is unlocked"
              body={`Saved for ${contact.company || contact.name}. A senior project manager reviews it against ${
                answers.show || "your show"
              } and comes back within one business day with concept direction — plus a complimentary photoreal 3D concept as the scope develops.`}
            >
              <button
                type="button"
                onClick={() => {
                  generateBoothPlan(answers, contact);
                  track("booth_plan_pdf", { cta_source: source });
                }}
                className={`w-full rounded-xl bg-[oklch(0.78_0.13_300)] px-5 py-3 font-semibold text-black ${FOCUS}`}
              >
                Download my booth plan (PDF)
              </button>
              <button
                type="button"
                onClick={() => openMeeting({ source: `${source}-result` })}
                className={`w-full rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10 ${FOCUS}`}
              >
                See available times — 20-minute exhibit strategy call
              </button>
            </SuccessPanel>
            {sms && contact.phone ? <SmsOptInConfirmation className="mt-3" phone={contact.phone} /> : null}
          </div>
        ) : null}

        {/* Matching booths */}
        {matches.length ? (
          <div className={CARD}>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              Builds we&apos;ve already delivered at this footprint
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Every one is a 100% custom rental — we rebrand and reconfigure it around the plan above.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {matches.map((b) => (
                <Link
                  key={b.slug}
                  to="/rent-booth/$slug"
                  params={{ slug: b.slug }}
                  className="group block overflow-hidden rounded-xl border border-white/12 bg-black/40"
                >
                  <img
                    src={b.image}
                    alt={`${b.size} custom trade show booth rental — ${b.name}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition group-hover:opacity-90"
                  />
                  <div className="px-4 py-3">
                    <span className="block text-sm font-semibold">{b.name}</span>
                    <span className="text-[12px] text-white/50">
                      {b.size} · {b.code}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* Phase 3 — optional deepening */}
        {unlocked && !detailSent ? (
          <div className={CARD}>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              Want concept sketches on the call?
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Optional — but the more we have, the more specific the first concept is.
            </p>
            <div className="mt-5 space-y-5">
              <ChoiceChips
                label="Do you already have an exhibit?"
                options={PLAN_EXISTING}
                value={answers.existing}
                onChange={(v) => set("existing", v)}
              />
              <Field label="Anything else we should know?">
                <textarea
                  rows={3}
                  value={answers.notes}
                  maxLength={2000}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Brand guidelines, must-keep elements, competitors' booths you like…"
                  className={inputCls}
                />
              </Field>
              <FileAttach
                label="Exhibitor manual, floor plan or photos of your existing booth"
                hint="PDF, DOC, PNG, JPG, ZIP, DWG — max 25MB each"
              />
              <button
                type="button"
                onClick={sendDetail}
                disabled={busy}
                className={`rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60 ${FOCUS}`}
              >
                {busy ? "Sending…" : "Add this to my plan"}
              </button>
            </div>
          </div>
        ) : null}

        {detailSent ? (
          <div className="rounded-xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/10 p-5 text-sm text-white/75">
            Added — your project manager will have all of it before the call.
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={back}
            className={`rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 ${FOCUS}`}
          >
            Change my answers
          </button>
          <button
            type="button"
            onClick={restart}
            className={`rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/50 hover:text-white ${FOCUS}`}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }
}

export { PURPLE as PLANNER_ACCENT };
