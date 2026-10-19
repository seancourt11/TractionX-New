import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { SITE } from "@/lib/site";

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy | Traction X";
const DESC =
  "How Traction X collects, uses, stores and protects personal information submitted through quote requests, 3D design requests and meeting bookings.";

const SECTIONS: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `${SITE.name} designs, fabricates and manages custom trade show exhibits, rentals and brand activations for clients across Canada and the United States. This policy explains what personal information we collect through this website and how we handle it.`,
      `Questions about this policy or about information we hold on you can be sent to ${SITE.email} or ${SITE.phoneDisplay}.`,
    ],
  },
  {
    h: "Information we collect",
    p: ["We collect only what we need to respond to you and deliver a project."],
    list: [
      "Contact details you submit — name, company, work email, phone number and show city",
      "Project details you provide — booth footprint, show, timeline, budget range and brief notes",
      "Files you attach to a quote or design request, such as floor plans, brand guidelines or reference images",
      "Meeting bookings made through our scheduling provider, including the time you select and any notes you add",
      "Standard technical data your browser sends, such as IP address, device type and referring page",
    ],
  },
  {
    h: "How we use it",
    p: ["Personal information submitted through this site is used to:"],
    list: [
      "Prepare and send quotes, estimates and complimentary 3D design concepts",
      "Contact you about a project you asked us about",
      "Coordinate fabrication, freight, show services and installation on your behalf",
      "Improve the website and understand which pages help visitors",
    ],
  },
  {
    h: "Text message updates",
    p: [
      "Text messaging is optional and opt-in only. We never tick the box for you, and we never text a number that was given to us for a phone call alone. When you opt in, we record the exact consent wording shown to you, along with the date and the page you opted in from.",
      "Texts are project messages, not marketing blasts: design proofs ready to review, approval and advance-order deadlines, freight and install confirmations, and answers from your project manager. Message frequency varies with the stage of your build. Standard message and data rates from your carrier may apply.",
      "Reply STOP to any message to opt out immediately, or HELP for assistance. You can also email us and we will remove the consent from your record. Opting out of texts never affects your quote, your project, or the support you receive.",
    ],
  },
  {
    h: "What we don't do",
    p: [
      "We do not sell personal information. We do not rent or trade contact lists. We do not add you to a marketing list simply because you requested a quote — marketing email is sent only where you have asked for it or where there is an existing business relationship, and every message includes an unsubscribe link.",
    ],
  },
  {
    h: "Sharing with service providers",
    p: [
      "We share information only where it is necessary to deliver the work you have asked for, and only to the extent required. That can include freight forwarders, customs brokers, general show contractors, installation partners and venue service providers — for example, sharing a shipping contact and booth number so your crates reach the right space.",
      "We also use third-party providers for website hosting, form handling, email and meeting scheduling. These providers process data on our behalf under their own privacy terms.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "This site uses cookies and similar local storage for essential functionality — remembering, for example, which city page you arrived from so the site can show relevant regional information — and for aggregate analytics about page usage.",
      "You can block or delete cookies in your browser settings. Essential functionality may behave differently if you do.",
    ],
  },
  {
    h: "Retention",
    p: [
      "Quote and project information is retained for as long as needed to service the enquiry and to meet business, accounting and legal record-keeping requirements. Files you attach are retained for the life of the project and archived afterwards unless you ask us to delete them.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You may request access to the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to retain it. Canadian visitors have these rights under PIPEDA and applicable provincial legislation; visitors in other jurisdictions may have equivalent rights under local law.",
      `Send any request to ${SITE.email}. We will respond within 30 days.`,
    ],
  },
  {
    h: "Security",
    p: [
      "Information is transmitted over encrypted connections and stored with reputable providers. No system is perfectly secure, but access to project and contact data is limited to the people who need it to do the work.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "We update this policy when our practices change. The revision date below reflects the most recent update; material changes will be noted on this page.",
    ],
  },
];

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}${PATH}` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}${PATH}` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        intro="What we collect when you request a quote, a 3D design or a meeting — and exactly what we do with it."
      />
      <Section>
        <div className="max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[oklch(0.85_0.13_300)]">
                {s.h}
              </h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-4 text-white/72 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((l) => (
                    <li key={l} className="flex gap-3 text-white/72">
                      <span className="text-[oklch(0.78_0.13_300)]">▸</span>
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="text-sm text-white/45 border-t border-white/10 pt-8">
            Last updated: January 2026 · {SITE.name} ·{" "}
            <a href={`mailto:${SITE.email}`} className="text-[oklch(0.78_0.13_300)] hover:underline">
              {SITE.email}
            </a>{" "}
            ·{" "}
            <a href={`tel:${SITE.phone}`} className="text-[oklch(0.78_0.13_300)] hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
