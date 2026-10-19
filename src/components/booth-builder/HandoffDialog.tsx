import { useMemo, useState } from "react";

import { submitLead } from "@/lib/leads";
import { buildSummary, summaryHeadline } from "@/lib/booth-builder/summary";
import { validateBoothDesign } from "@/lib/booth-builder/rules";
import { useBuilder } from "@/lib/booth-builder/store";

/**
 * "Turn this into a real booth" — the concept summary plus a three-field
 * hand-off. The full design travels with the lead so we can reopen it.
 */
export function HandoffDialog({ onClose }: { onClose: () => void }) {
  const { project, commit } = useBuilder();
  const sections = useMemo(() => buildSummary(project), [project]);
  const warnings = useMemo(() => validateBoothDesign(project), [project]);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(project.project.showName);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    if (show.trim() && show.trim() !== project.project.showName) {
      commit("Set the show name", (d) => {
        d.project.showName = show.trim();
      });
    }

    const res = await submitLead({
      source: "Booth Builder — concept hand-off",
      email,
      phone,
      show: show.trim(),
      footprint: project.project.boothSize,
      wants3D: true,
      message: sections.flatMap((s) => [`${s.title}:`, ...s.lines]).join("\n"),
      meta: {
        boothType: project.project.boothType,
        headline: summaryHeadline(project),
        warnings: warnings.map((w) => `${w.title} — ${w.detail}`),
        brandMode: project.branding.mode ?? "color",
        brandAssets: (project.branding.assets ?? []).map(
          (a) => `${a.kind}: ${a.name} (${Math.round(a.sizeBytes / 1024)} KB)`,
        ),
        project: project as unknown as Record<string, unknown>,
      },
    });

    setBusy(false);
    if (res.ok) setSent(true);
    else setError(res.error);
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Turn this into a real booth"
    >
      <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/12 bg-[#0b0b0b] p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Your concept</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Turn this into a real booth
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:text-white"
          >
            Close
          </button>
        </div>

        {sent ? (
          <div className="mt-8">
            <p className="text-lg font-semibold text-white">Got it — your design is with us.</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
              A designer will come back to you with a proper 3D concept and pricing. Everything you
              built here came with it, so nothing needs re-explaining.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-[oklch(0.78_0.13_300)] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Back to my booth
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="grid gap-4">
                {sections.map((s) => (
                  <div key={s.title}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{s.title}</p>
                    <ul className="mt-1.5 grid gap-1">
                      {s.lines.map((l) => (
                        <li key={l} className="text-[13px] leading-relaxed text-white/75">
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {warnings.length > 0 && (
                <div className="mt-5 rounded-lg border border-amber-300/20 bg-amber-300/[0.05] p-3">
                  <p className="text-[11px] font-semibold text-amber-200/90">
                    {warnings.length} thing{warnings.length === 1 ? "" : "s"} we&apos;ll review with your show
                  </p>
                  <ul className="mt-1.5 grid gap-1">
                    {warnings.map((w) => (
                      <li key={w.id} className="text-[11px] text-white/50">
                        · {w.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 grid gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-[12px] leading-relaxed text-white/55">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">What happens next</p>
                <p>1. A designer reads your concept and checks it against your show&apos;s rules.</p>
                <p>2. You get a photoreal 3D design and a fixed price — no change orders.</p>
                <p>3. We pre-build and photograph the booth before it ships, install included.</p>
              </div>
            </div>

            <form onSubmit={(e) => void send(e)} className="grid content-start gap-3">
              <label className="text-[11px] text-white/55">
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/25"
                  placeholder="you@company.com"
                />
              </label>
              <label className="text-[11px] text-white/55">
                Phone
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/25"
                  placeholder="(555) 555-5555"
                />
              </label>
              <label className="text-[11px] text-white/55">
                Show name
                <input
                  value={show}
                  onChange={(e) => setShow(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/25"
                  placeholder="e.g. DEFSEC Atlantic 2027"
                />
              </label>

              {error && <p className="text-[11px] text-red-300">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="mt-1 rounded-xl bg-[oklch(0.78_0.13_300)] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-40"
              >
                {busy ? "Sending…" : "Send my design"}
              </button>
              <p className="text-[11px] leading-relaxed text-white/35">
                Your full design travels with this — every size, finish and setting. Concept graphics
                only; final artwork is produced with your team.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
