/* ==========================================================================
 *  ANALYTICS — GA4 event layer
 * ==========================================================================
 *
 *  One `track()` call site per conversion moment. If no GA4 measurement ID is
 *  configured the helper is a silent no-op, so nothing here can break a form.
 *
 *  The measurement ID comes from the Google Analytics connector as
 *  VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY. Until it's connected the
 *  events still fire into `window.dataLayer`, so a GTM container (or a later
 *  GA connection) picks up the full history of the session.
 * ========================================================================== */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID: string =
  (import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as string | undefined) ?? "";

let loaded = false;

/** Loads gtag.js once, after hydration. Safe to call repeatedly. */
export function initAnalytics(): void {
  if (typeof window === "undefined" || loaded) return;
  loaded = true;

  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }

  if (!GA_MEASUREMENT_ID) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Fire a GA4 event. Never throws. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    if (window.gtag) {
      window.gtag("event", event, params);
    } else {
      window.dataLayer.push(["event", event, params]);
    }
  } catch {
    /* analytics must never break a form */
  }
}

/** SPA page view — gtag only auto-tracks the first load. */
export function trackPageView(path: string, title?: string): void {
  track("page_view", {
    page_path: path,
    page_location: typeof window === "undefined" ? undefined : window.location.href,
    page_title: title ?? (typeof document === "undefined" ? undefined : document.title),
  });
}

/* -------------------------------------------------------------------------- */
/* Named conversion moments — keep every call site using these                 */
/* -------------------------------------------------------------------------- */

/** A CTA modal opened: quote / design / meeting. */
export function trackCtaOpen(kind: "quote" | "design" | "meeting", source?: string): void {
  track("cta_open", { cta_kind: kind, cta_source: source ?? "unknown" });
}

/** A step inside a multi-step form was completed. */
export function trackFormStep(form: string, step: number, total: number, source?: string): void {
  track("form_step", { form_name: form, step, step_total: total, cta_source: source ?? "unknown" });
}

/** A form was abandoned mid-way (modal closed before submit). */
export function trackFormAbandon(form: string, step: number, source?: string): void {
  track("form_abandon", { form_name: form, step, cta_source: source ?? "unknown" });
}

/** Visitor opted into project text messages. */
export function trackSmsOptIn(source: string): void {
  track("sms_opt_in", { cta_source: source });
}

/** Phone number tapped or clicked. */
export function trackCall(source: string): void {
  track("phone_click", { cta_source: source });
}
