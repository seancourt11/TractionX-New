/* ==========================================================================
 *  SMS OPT-IN — one shared consent control
 * ==========================================================================
 *
 *  Express consent, never pre-checked, unbundled from the submit action. The
 *  exact wording shown to the visitor is stamped onto the lead via
 *  `smsLeadFields()` so we keep a compliance record (CASL / TCPA).
 * ========================================================================== */

import { useState } from "react";
import { submitLead } from "@/lib/leads";

export const SMS_OPT_IN_LABEL = "Text me updates about this project";

export const SMS_CONSENT_TEXT =
  "Fastest way to get design proofs, deadline reminders and shipping updates. Message frequency varies, standard rates apply. Reply STOP to opt out.";

/** Lead payload fields for the SMS consent state. */
export function smsLeadFields(optIn: boolean) {
  return optIn
    ? { smsOptIn: true, smsConsentText: `${SMS_OPT_IN_LABEL} — ${SMS_CONSENT_TEXT}` }
    : { smsOptIn: false };
}

export function SmsOptIn({
  checked,
  onChange,
  className = "",
  needsPhone = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  /** True when the box is ticked but no phone number has been entered yet. */
  needsPhone?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${
        checked
          ? "border-[oklch(0.78_0.13_300)]/60 bg-[oklch(0.78_0.13_300)]/[0.08]"
          : "border-white/12 bg-white/[0.02] hover:border-white/25"
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.78_0.13_300)]"
      />
      <span className="text-sm leading-snug text-white/85">
        {SMS_OPT_IN_LABEL}
        <span className="mt-1 block text-[11px] leading-relaxed text-white/45">{SMS_CONSENT_TEXT}</span>
        {checked && needsPhone && (
          <span className="mt-1 block text-[11px] font-medium text-[oklch(0.85_0.13_300)]">
            Add a mobile number above so we know where to text you.
          </span>
        )}
      </span>
    </label>
  );
}

/** Short confirmation line for success screens. */
export function SmsOptInConfirmation({ phone, className = "" }: { phone?: string; className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed text-[oklch(0.85_0.13_300)] ${className}`}>
      Text updates are on — we&apos;ll message you{phone ? ` at ${phone}` : ""} with proofs and deadline reminders.
      Reply STOP any time.
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Standalone card — active projects (quote page, client portal)               */
/* -------------------------------------------------------------------------- */


export function SmsUpdatesCard({
  source,
  name,
  email,
  phone = "",
  company,
  city,
  show,
  dealRef,
  className = "",
}: {
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  show?: string;
  dealRef?: string;
  className?: string;
}) {
  const [number, setNumber] = useState(phone);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div className={`rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.08] p-5 ${className}`}>
        <SmsOptInConfirmation phone={number} />
      </div>
    );
  }

  return (
    <form
      className={`rounded-2xl border border-white/12 bg-white/[0.02] p-5 ${className}`}
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setBusy(true);
        const result = await submitLead({
          source,
          name: name || "Text updates opt-in",
          email: email || "projects@tractionx.ca",
          phone: number,
          company,
          city,
          show,
          message: `Opted into project text updates${dealRef ? ` for ${dealRef}` : ""} at ${number}.`,
          ...smsLeadFields(true),
          meta: { ...(dealRef ? { dealRef } : {}) },
        });
        setBusy(false);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        setDone(true);
      }}
    >
      <div className="font-display text-lg font-bold uppercase tracking-tight">Get text updates on this project</div>
      <p className="mt-1.5 text-sm text-white/60">
        Design proofs, approval deadlines and shipping confirmations sent straight to your phone — the fastest way to
        keep a show build on schedule.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          required
          type="tel"
          maxLength={30}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Mobile number"
          className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2.5 text-sm placeholder:text-white/30 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 rounded-lg bg-[oklch(0.78_0.13_300)] px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Turn on texts"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-[11px] text-red-300">
          {error}
        </p>
      )}
      <p className="mt-2 text-[11px] leading-relaxed text-white/45">{SMS_CONSENT_TEXT}</p>
    </form>
  );
}
