import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHero, FAQBlock, CTABand } from "@/components/PageLayout";
import { DesignCtaBand } from "@/components/GlobalCta";
import { SITE } from "@/lib/site";

const TITLE = "Trade Show FAQs — Booth Rentals, Costs & Logistics | Traction X";
const DESC = "Answers to common trade show questions: booth costs, rental vs. custom, timelines, drayage, international freight, show-services and more.";

const FAQS = [
  { q: "How much does a trade show booth cost?", a: "Rental 10×10s start around $16,250, 10×20s around $22,750 and 20×20s around $39,000. Custom builds run 2–3× rental at the same footprint. Show services (drayage, electrical, rigging, cleaning, labor) typically add another 30–60% on top." },
  { q: "Do you rent booths or only build custom?", a: "Both. A modular rental program with premium finishes and a bespoke custom shop for one-of-a-kind builds, double-decks, hospitality lounges and sponsor takeovers." },
  { q: "Where can you deliver?", a: "Globally — six continents. Staff, facilities and partner shops across North America, Europe, Latin America, Asia and Oceania." },
  { q: "How fast can you turn a project around?", a: "Standard timeline is 6–10 weeks. Rush projects under 4 weeks are possible when inventory and fabrication slots allow — including rescue builds when a prior supplier has fallen through." },
  { q: "What's included in a rental?", a: "Structure, printed graphics, standard lighting, one counter or reception station, monitor mount, meeting stool and setup drawings. Freight, drayage and I&D are quoted separately." },
  { q: "What is drayage?", a: "The venue-charged handling fee for moving freight from the loading dock to your booth space and back. It's billed by hundredweight on actual weight — not a fixed fee. We coordinate it but it appears as a separate line on your show bill." },
  { q: "Do you handle union labor?", a: "Yes — full compliance in union jurisdictions (Chicago, NYC, San Francisco, Las Vegas union floors). Certified crews with venue badging arranged in advance." },
  { q: "Can you rescue a project another supplier has dropped?", a: "Yes. Rescue builds are a routine part of our schedule — including sub-4-week turnarounds when catalog inventory supports it." },
  { q: "What about international shipping and customs?", a: "Air and ocean freight to Europe, Latin America, Asia and Oceania. We handle customs paperwork, ATA carnets and harmonised codes, with in-country partners for last-mile drayage." },
  { q: "Do you handle audio-visual too?", a: "Yes — LED walls, 4K displays, PA, lighting, and interactive touchscreens. Rented, installed, tested and supported on-site." },
];

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/faqs` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/faqs` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="FAQs"
        title="Trade Show"
        accent="Questions Answered"
        intro="Straight answers on booth costs, rental vs. custom, timelines, drayage, union labor and international freight."
      />
      <FAQBlock items={FAQS} title="Common questions" />
      <DesignCtaBand source="page" />
      <CTABand />
    </PageLayout>
  );
}
