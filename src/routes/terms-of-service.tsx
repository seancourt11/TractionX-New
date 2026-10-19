import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { SITE } from "@/lib/site";

const PATH = "/terms-of-service";
const TITLE = "Terms of Service | Traction X";
const DESC =
  "Terms governing use of the Traction X website, published pricing estimates, quote requests and complimentary 3D design concepts.";

const SECTIONS: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: "Acceptance",
    p: [
      `By using this website you agree to these terms. If you do not agree, please do not use the site. These terms cover the website only — exhibit projects are governed by the signed proposal, quotation and contract for that specific project, which take precedence over anything published here.`,
    ],
  },
  {
    h: "Pricing and estimates are not offers",
    p: [
      "All prices, ranges, calculator outputs and instant-quote figures on this site are non-binding estimates provided for planning purposes only. They are not offers capable of acceptance and do not form a contract.",
      "Final pricing depends on approved design, finish specification, materials, quantities, show city, venue and contractor rates, labour jurisdiction, freight lanes, timelines and show-services orders. A binding price exists only in a written quotation signed by both parties.",
    ],
    list: [
      "Show services — drayage, electrical, rigging, internet, cleaning and labour — are billed by the venue's contractor and are outside our pricing",
      "Third-party charges are passed through as invoiced and are subject to change by the provider",
      "Currency, taxes and duties are stated on the formal quotation, not on this website",
    ],
  },
  {
    h: "Complimentary 3D design",
    p: [
      "We offer complimentary concept design and 3D renders with no obligation to proceed. Concepts, renders, drawings and design files produced during that stage remain the intellectual property of Traction X until the project is contracted and paid in accordance with the signed agreement.",
      "Complimentary concepts are provided for your internal evaluation. They may not be issued to another fabricator for pricing or construction, published, or used in marketing without our written permission.",
    ],
  },
  {
    h: "Your content",
    p: [
      "You retain ownership of brand assets, logos, artwork, floor plans and files you provide. By submitting them you grant us the licence needed to design, fabricate, print and install your exhibit, and to coordinate with the vendors required to deliver it.",
      "You confirm you have the right to supply those materials and that their use in your exhibit does not infringe any third-party rights.",
    ],
  },
  {
    h: "Project photography",
    p: [
      "We may photograph completed installations for our portfolio. Where a project is confidential, embargoed, under NDA, or subject to export-control or classification restrictions, tell us before install and we will not photograph or publish it.",
    ],
  },
  {
    h: "Website content and intellectual property",
    p: [
      `All content on this site — text, photography, renders, layouts, guides and the ${SITE.name} name and marks — is owned by us or used with permission. You may quote or cite our published research and guides with a link back to the source page. You may not reproduce substantial portions of the site or use our imagery commercially without written permission.`,
    ],
  },
  {
    h: "Accuracy and availability",
    p: [
      "We work to keep information current, but venue rules, contractor rates, show dates and service kits change without notice. Verify time-sensitive show information with the organiser or venue before relying on it.",
      "We do not guarantee uninterrupted access to the site and may change or remove content at any time.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the extent permitted by law, this website is provided as is, and we are not liable for indirect, incidental or consequential loss arising from your use of it or from reliance on estimates published on it. Nothing in these terms limits liability that cannot be limited by law.",
      "Liability in respect of an exhibit project is governed by the contract for that project.",
    ],
  },
  {
    h: "Third-party links",
    p: [
      "Links to show organisers, venues, contractors and scheduling providers are offered for convenience. We do not control those sites and are not responsible for their content, terms or privacy practices.",
    ],
  },
  {
    h: "Governing law",
    p: [
      "These terms are governed by the laws of the Province of Nova Scotia and the federal laws of Canada applicable there, without regard to conflict-of-law rules.",
    ],
  },
  {
    h: "Contact",
    p: [
      `Questions about these terms: ${SITE.email} or ${SITE.phoneDisplay}.`,
    ],
  },
];

export const Route = createFileRoute("/terms-of-service")({
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
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        accent="Service"
        intro="The terms that govern this website, our published pricing estimates and complimentary 3D design concepts."
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
            </a>
          </p>
        </div>
      </Section>
    </PageLayout>
  );
}
