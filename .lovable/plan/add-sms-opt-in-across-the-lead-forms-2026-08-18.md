# Add SMS opt-in across the lead forms

Short answer: yes, worth doing — texting is the fastest channel for booth deadlines, and exhibitors respond to it. But it only works if it's (a) opt-in, never pre-checked, (b) framed as a benefit rather than a marketing subscription, and (c) compliant with Canadian CASL and US TCPA consent wording.

## What visitors will see

A single opt-in line under the phone field on every form that collects a phone number:

- Unchecked checkbox: "Text me updates about this project"
- Helper line underneath: "Fastest way to get design proofs, deadline reminders and shipping updates. Message frequency varies, standard rates apply. Reply STOP to opt out."
- The phone field stays optional. If the box is ticked and no phone is entered, the field becomes required with an inline prompt.

Where the benefit gets highlighted (not just a legal footnote):

- Success screens ("What happens next"): if they opted in, confirm "We'll text you at ...". If they didn't, one soft nudge line with a tick box to add it.
- Quote page and client portal: a small "Get text updates on this project" toggle, since these are active jobs where deadline texts matter most.
- Contact page: a short "Prefer texting?" block with the number, framed as a real channel.

We will not add SMS opt-in to the pricing guide download (email-only lead magnet, adding a phone ask there hurts conversion).

## Forms in scope

QuoteModal, GlobalCta (3D design + meeting booking), CostEstimator, contact form, quote page, portal page.

## Technical notes

- Extend `leadSchema` in `src/lib/leads.ts` with `smsOptIn: boolean` and `smsConsentText: string` (the exact wording shown at submit time, stamped for compliance records), plus the existing timestamp/page fields already captured.
- Add a shared `SmsOptIn` component (checkbox + consent copy) so the wording is identical everywhere and only needs changing in one place.
- Add a `sms_opt_in` GA4 event via `src/lib/analytics.ts` so we can see the take rate per form.
- Show the opted-in flag on the admin leads table so whoever follows up knows texting is allowed.
- No backend change needed; consent rides along in the same lead payload.

## Compliance

Consent is express, unbundled from the submit action, never pre-checked, and the exact consent text is stored with each lead. Privacy policy gets a short SMS paragraph (what we send, how to stop, that carrier rates apply).
