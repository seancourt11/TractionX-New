import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { useLeadPrefill } from "@/lib/lead-prefill";
import { SmsOptIn, smsLeadFields } from "@/components/SmsOptIn";

/**
 * Small inline email gate used by the resource tools. First click captures the
 * lead; after that the download runs immediately for the rest of the session.
 */
export function ResourceLeadGate({
  source,
  ctaLabel,
  unlockedLabel,
  blurb,
  meta,
  onUnlocked,
}: {
  source: string;
  ctaLabel: string;
  unlockedLabel?: string;
  blurb?: string;
  meta?: Record<string, unknown>;
  onUnlocked: () => void;
}) {
  const pre = useLeadPrefill();
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sms, setSms] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (unlocked) {
    return (
      <button
        type="button"
        onClick={onUnlocked}
        className="w-full rounded-xl bg-[oklch(0.78_0.13_300)] px-5 py-3 font-semibold text-black hover:opacity-90"
      >
        {unlockedLabel ?? ctaLabel}
      </button>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-[oklch(0.78_0.13_300)] px-5 py-3 font-semibold text-black hover:opacity-90"
      >
        {ctaLabel}
      </button>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const res = await submitLead({
      source,
      email,
      name: name || undefined,
      city: pre.city || undefined,
      show: pre.show || undefined,
      ...smsLeadFields(sms),
      meta,
    });
    setSending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setUnlocked(true);
    onUnlocked();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/15 bg-black/50 p-4 space-y-3">
      {blurb && <p className="text-xs text-white/60 leading-relaxed">{blurb}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoComplete="name"
        className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        autoComplete="email"
        className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
      />
      <SmsOptIn checked={sms} onChange={setSms} />
      {error && <p className="text-xs text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-[oklch(0.78_0.13_300)] px-5 py-3 font-semibold text-black hover:opacity-90 disabled:opacity-60"
      >
        {sending ? "Sending…" : ctaLabel}
      </button>
      <p className="text-[11px] text-white/40">No spam. We reply to real project questions within one business day.</p>
    </form>
  );
}
