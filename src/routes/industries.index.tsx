import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { QuoteButton, BookMeetingButton, DesignCtaBand } from "@/components/GlobalCta";
import { INDUSTRIES } from "@/data/industry-pages";
import { SITE } from "@/lib/site";

const TITLE = "Industries We Build For — Trade Show Booth Rentals | Traction X";
const DESC =
  "Custom trade show booth rentals engineered by industry — defence, aerospace, medical device, AI, cybersecurity, manufacturing, energy, food & beverage, cannabis, fintech and more.";

export const Route = createFileRoute("/industries/")({
  head: () => {
    const url = `${SITE.url}/industries`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: TITLE,
            description: DESC,
            url,
            hasPart: INDUSTRIES.map((i) => ({
              "@type": "WebPage",
              name: `${i.label} Trade Show Booth Rentals`,
              url: `${SITE.url}/industries/${i.slug}`,
            })),
          }),
        },
      ],
    };
  },
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Industries"
        title="Booths engineered around"
        accent="how your industry sells"
        intro="A medical device booth and a defence booth are not the same object with different graphics. Floor loading, meeting privacy, compliance review, sampling rules and demo throughput all change the build. Here's how we design for each sector — and the shows and venues we do it in."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <QuoteButton source="industries-hub" label="Request a quote" />
          <BookMeetingButton variant="outline" source="industries-hub" />
        </div>
      </PageHero>

      <Section eyebrow={`${INDUSTRIES.length} sectors`} title="Choose your industry">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[oklch(0.78_0.13_300)]/60 hover:bg-white/[0.04]"
            >
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">{i.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65 line-clamp-4">{i.intro}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40">
                From {i.budget.split(";")[0]?.replace(/^From /, "")}
              </p>
              <span className="mt-4 inline-block text-sm text-[oklch(0.85_0.13_300)]">
                View {i.label.toLowerCase()} builds →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        bg="muted"
        eyebrow="Why it matters"
        title="Sector knowledge is scheduling knowledge"
        intro="Most booth failures are not design failures. They are missed approvals — a health-department sampling permit, an engineered load calculation, a regulatory copy review, a rigging submission. We know which gate applies to your sector and when it closes."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Compliance gates", "Regulatory, export-control, health and fire approvals scheduled backwards from the show date."],
            ["Build engineering", "Load calculations, rated flooring, guarding and rigging certification where your product needs it."],
            ["Meeting math", "Demo stations, seated consults and private rooms sized to how your buyers actually decide."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{k}</p>
              <p className="mt-2 leading-relaxed text-white/80">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <DesignCtaBand source="industries-hub" />
      <CTABand heading="Tell us your industry and your show — we'll bring the build." />
    </PageLayout>
  );
}
