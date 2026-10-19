import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageLayout, PageHero, Section, FAQBlock } from "@/components/PageLayout";
import { OrganizerCtaBand } from "@/components/OrganizerCtaBand";
import { BookMeetingButton } from "@/components/GlobalCta";
import { absUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";

export type ProgramPageData = {
  path: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  breadcrumb: string;
  tldrHeading: string;
  tldr: string;
  /** Main "what's included" cards. */
  includes: { title: string; body: string }[];
  /** Numbered operating sequence. */
  sequence: { title: string; body: string }[];
  /** Plain-prose deep section — the unique, page-specific detail. */
  detail: { eyebrow: string; title: string; body: ReactNode };
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaBlurb?: string;
  source: string;
};

/** JSON-LD graph shared by every /for-organizers/* program page. */
export function programSchema(d: ProgramPageData, title: string, desc: string) {
  const url = absUrl(d.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: title,
        serviceType: d.eyebrow,
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        areaServed: "North America",
        description: desc,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "For Organizers", item: absUrl("/for-organizers") },
          { "@type": "ListItem", position: 3, name: d.breadcrumb, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        "@id": url,
        name: title,
        description: desc,
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#tldr", "h1"] },
      },
    ],
  };
}

export function OrganizerProgramPage({ data: d, children }: { data: ProgramPageData; children?: ReactNode }) {
  return (
    <PageLayout>
      <PageHero eyebrow={d.eyebrow} title={d.title} accent={d.accent} intro={d.intro}>
        <nav aria-label="Breadcrumb" className="mt-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/for-organizers" className="hover:text-white">For Organizers</Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{d.breadcrumb}</span>
        </nav>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookMeetingButton source={`${d.source}-hero`} variant="primary" label="Book a 10-minute call" />
          <Link
            to="/preferred-vendor-program"
            className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
          >
            Apply to the vendor program
          </Link>
        </div>
      </PageHero>

      <Section id="tldr">
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <h2 className="font-display text-sm uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">
            {d.tldrHeading}
          </h2>
          <p className="mt-3 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl">{d.tldr}</p>
        </div>
      </Section>

      <Section eyebrow="What's included" title="What the program covers" bg="muted">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.includes.map((i) => (
            <div key={i.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-lg font-semibold">{i.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={d.detail.eyebrow} title={d.detail.title}>
        <div className="max-w-3xl space-y-5 text-white/75 leading-relaxed text-base md:text-lg">
          {d.detail.body}
        </div>
      </Section>

      <Section eyebrow="How it runs" title="The operating sequence" bg="muted">
        <ol className="max-w-3xl space-y-6">
          {d.sequence.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-display text-[oklch(0.78_0.13_300)] text-lg shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-semibold">{s.title}</div>
                <p className="mt-2 text-white/70 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {children}

      <FAQBlock items={d.faqs} title="Questions organizers ask" />

      <OrganizerCtaBand heading={d.ctaHeading} blurb={d.ctaBlurb} source={d.source} />
    </PageLayout>
  );
}
