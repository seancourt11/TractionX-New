import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { QuoteForm } from "@/components/QuoteForm";
import { SITE } from "@/lib/site";

const TITLE = "Contact Traction X — Request a Trade Show Quote";
const DESC = "Request a quote, book a call or send a brief. We acknowledge complete briefs within one business day and send preliminary concept direction and investment within two business days.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/contact` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          email: SITE.email,
          telephone: SITE.phone,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: SITE.phone,
              contactType: "sales",
              areaServed: ["US", "CA", "EU", "LATAM", "APAC", "OCE"],
              email: SITE.email,
            },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's Plan"
        accent="Your Next Show"
        intro="Send a brief, book a call, or email us directly. We acknowledge complete briefs within one business day, then send preliminary concept direction and investment within two business days."
      />
      <Section>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/50 mb-2">Phone</div>
              <a href={`tel:${SITE.phone}`} className="font-display text-2xl md:text-3xl font-bold hover:text-[oklch(0.78_0.13_300)]">
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/50 mb-2">Email</div>
              <a href={`mailto:${SITE.email}`} className="font-display text-2xl font-bold hover:text-[oklch(0.78_0.13_300)]">
                {SITE.email}
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/50 mb-2">Book a call</div>
              <a href={SITE.calendly} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 rounded-xl font-semibold hover:bg-white/10">
                30-min virtual call →
              </a>
            </div>
            <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/35 bg-[oklch(0.78_0.13_300)]/[0.06] p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-[oklch(0.85_0.13_300)] mb-2">Prefer texting?</div>
              <p className="text-white/75 text-sm leading-relaxed">
                Text us at{" "}
                <a href={`sms:${SITE.phone}`} className="font-semibold text-white underline underline-offset-4">
                  {SITE.phoneDisplay}
                </a>
                . It&apos;s the fastest way to get a proof reviewed or a deadline answered — most exhibitors who
                switch to text never go back to email chains. Tick the text box on any form and we&apos;ll keep you
                posted on proofs, deadlines and shipping. Reply STOP any time.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/50 mb-2">Response time</div>
              <p className="text-white/75">Initial response within one business day. Preliminary concept direction and investment within two business days.</p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm />
          </div>
        </div>
      </Section>
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
