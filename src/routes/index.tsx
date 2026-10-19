import { SITE } from "../lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCityContext, CityFooterBlock } from "@/lib/city-context";
import { BoothFinder } from "@/components/BoothFinder";
import { EXHIBITOR_RESOURCES } from "@/data/exhibitor-resources";
import { SiteHeader } from "@/components/SiteHeader";
import {
  DesignCtaBand,
  Design3DButton,
  BookMeetingButton,
  CtaNote,
  CTA_LABELS,
  useCta,
} from "@/components/GlobalCta";

import { PromiseBar } from "@/components/Promises";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import foundationBooth from "@/assets/foundation-booth.png.asset.json";
import huaweiBooth from "@/assets/huawei-booth.png.asset.json";

import visaBooth from "@/assets/visa-booth.png.asset.json";
import lvHall from "@/assets/lv-hall.jpg";
import proj1 from "@/assets/portfolio/canada-defence-booth-01.jpg.asset.json";
import proj2 from "@/assets/portfolio/air-canada-cargo-booth.jpg.asset.json";
import proj3 from "@/assets/portfolio/telus-game-changers-room.jpg.asset.json";
import proj4 from "@/assets/portfolio/accenture-mission-ready.jpg.asset.json";
import proj5 from "@/assets/portfolio/sma-energy-booth.jpg.asset.json";
import proj6 from "@/assets/portfolio/air-canada-lounge.jpg.asset.json";
import proj7 from "@/assets/portfolio/canada-export-booth.jpg.asset.json";
import proj8 from "@/assets/portfolio/telus-locker-detail.jpg.asset.json";
import proj9 from "@/assets/portfolio/team-canada-fanfest.jpg.asset.json";

const PAGE_TITLE =
  "Trade Show Exhibits & Booth Rentals in Canada & the U.S. | Traction X";
const PAGE_DESC =
  "Traction X designs, builds and installs custom trade show exhibits and booth rentals across Canada and the United States — Las Vegas, Toronto, Chicago, Vancouver, Orlando and beyond. Complimentary 3D design, install and dismantle included.";
// Single source of truth for the public domain — update SITE.url in src/lib/site.ts
// when the site moves to tractionx.ca and every canonical/OG tag follows.
const SITE_URL = SITE.url;


const CLIENTS = [
  "L3 Communications",
  "Tim Hortons",
  "Disney",
  "Meta",
  "Rolls-Royce",
  "Air Canada",
  "Business Wire",
  "Thales",
  "Dexcom",
  "Lucasfilm",
  "QinetiQ",
  "Samdesk",
];

type Offering = {
  n: string;
  title: string;
  body: string;
  cta: string;
  to: string;
  params?: Record<string, string>;
  img: string;
};

const OFFERINGS: Offering[] = [
  {
    n: "01.",
    title: "Custom Trade Show Exhibits",
    body: "We design, fabricate and manage bespoke exhibits globally. Book a call with a Senior Account Executive to scope your next island, double-deck or hospitality build.",
    cta: "Explore custom builds",
    to: "/products/$slug",
    params: { slug: "custom-trade-show-exhibits" },
    img: foundationBooth.url,
  },
  {
    n: "02.",
    title: "Trade Show Exhibit Rentals",
    body: "Turnkey modular rentals in every configuration — 10×10 through 30×40 islands. Premium finishes, real fabrication, rental economics.",
    cta: "Browse rental options",
    to: "/las-vegas-modular-trade-show-booth-rentals",
    img: huaweiBooth.url,
  },
  {
    n: "03.",
    title: "Sponsor & Event Activations",
    body: "Preferred vendor programs for conferences, sponsor takeovers, and experiential brand environments — from Web Summit to Dreamforce.",
    cta: "See a preferred vendor page",
    to: "/web-summit-vancouver-booth-rentals",
    img: visaBooth.url,
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Engage",
    body: "Discovery call with a Sr. Account Executive. We map your show calendar, objectives, sponsor obligations, and budget bands.",
  },
  {
    n: "02",
    title: "Discover & Design",
    body: "Within two business days, you receive preliminary concept direction and investment. Full photoreal 3D concepts, structural engineering and a costed BOM follow in roughly one to two weeks as the scope develops.",
  },
  {
    n: "03",
    title: "Fabrication",
    body: "Our shop runs CNC, metalwork, paint, carpentry, large-format print and AV integration under one roof — no offshore surprises.",
  },
  {
    n: "04",
    title: "Manage",
    body: "Freight, union labour, install, dismantle and on-site project management — one point of contact, every show day. Drayage is billed by the venue/GSC and shown separately.",
  },
];

/** Rounded-down count of the Canadian and U.S. city pages on the site. */
const NA_CITY_COUNT = 75;

/** Core North American markets, each linking to its own city page. */
const MARKETS: { name: string; slug: string; note: string }[] = [
  { name: "Las Vegas", slug: "las-vegas", note: "LVCC · Venetian Expo · Mandalay Bay" },
  { name: "Toronto", slug: "toronto", note: "Metro Toronto Convention Centre · Enercare" },
  { name: "Chicago", slug: "chicago", note: "McCormick Place · Donald E. Stephens" },
  { name: "Vancouver", slug: "vancouver", note: "Vancouver Convention Centre East & West" },
  { name: "Orlando", slug: "orlando", note: "Orange County Convention Centre" },
  { name: "Montreal", slug: "montreal", note: "Palais des congrès · Place Bonaventure" },
  { name: "Atlanta", slug: "atlanta", note: "Georgia World Congress Center" },
  { name: "San Diego", slug: "san-diego", note: "San Diego Convention Center" },
];

const RESOURCE_PICKS = [
  "trade-show-budget-template",
  "show-services-deadline-tracker",
  "trade-show-roi-calculator",
  "trade-show-booth-graphic-specs",
];

const PROJECTS = [
  { label: "Canada Defence Double-Deck", alt: "Custom double-deck trade show exhibit built for a defence industry client", img: proj1.url },
  { label: "Air Canada Cargo Island", alt: "20x20 island trade show booth with custom hanging sign for Air Canada Cargo", img: proj2.url },
  { label: "TELUS Game Changers Activation", alt: "Experiential brand activation booth designed and fabricated for TELUS", img: proj3.url },
  { label: "Accenture Mission Ready", alt: "Custom trade show exhibit with meeting space built for Accenture", img: proj4.url },
  { label: "SMA Energy Exhibit", alt: "Modular trade show exhibit with custom graphics for SMA Energy", img: proj5.url },
  { label: "Air Canada Lounge", alt: "Custom hospitality lounge environment fabricated for Air Canada", img: proj6.url },
  { label: "Sell to Canada Pavilion", alt: "Multi-exhibitor trade show pavilion designed and managed by Traction X", img: proj7.url },
  { label: "TELUS x Team Canada Locker", alt: "Custom-fabricated locker room brand activation for TELUS and Team Canada", img: proj8.url },
  { label: "Team Canada Fan Fest", alt: "Portable fan fest event display built for Team Canada", img: proj9.url },
];

const TESTIMONIALS = [
  {
    quote:
      "I love working with the Traction X team; I know any project we run with them is in good hands. Professional, knowledgeable, great communicators — and their flexibility to work within our budget is always appreciated.",
    name: "Marketing Director",
    role: "Aerospace & Defense Client",
  },
  {
    quote:
      "They came through on a last-minute booth rental for a show in Atlanta — turned it around in less than three weeks, handled all logistics, and set us up in a professional-looking booth. Looking forward to more projects.",
    name: "Marketing Lead",
    role: "SaaS Client",
  },
  {
    quote:
      "We worked with them for months on an extensive booth program in multiple locations. Always accommodating, always easy to reach. There truly wasn't anything they couldn't do.",
    name: "Producer",
    role: "Event Production Agency",
  },
  {
    quote:
      "Third time using Traction X at our flagship event in San Diego, and it was outstanding start to finish. Their dedication to top-notch service made a real impact on our booth rental experience.",
    name: "Operations Coordinator",
    role: "Geospatial Software Client",
  },
  {
    quote:
      "From concept to follow-through, they got it right. Excellent collaboration and support — the team kept the ball moving and got us across the finish line on time.",
    name: "Manager, Digital Media",
    role: "Public Sector Client",
  },
  {
    quote:
      "Very positive experience at the Vancouver Convention Centre. The booth was designed and installed on time and to the highest quality standard.",
    name: "Marketing",
    role: "International Development Bank",
  },
];

const FAQS = [
  {
    q: "What does Traction X actually do?",
    a: "Full-service trade show exhibits and brand activations — design, custom fabrication, event tech, freight, install and dismantle. We handle everything under one contract so exhibitors deal with a single vendor.",
  },
  {
    q: "Do you rent booths or only build custom?",
    a: "Both. We run a modular rental program (10×10 through 30×40+) with premium finishes, and a bespoke custom shop for one-of-a-kind builds, double-decks, hospitality lounges and sponsor takeovers.",
  },
  {
    q: "How much does a trade show booth cost?",
    a: "Custom booth rentals start around $16,250 for a 10×10 and scale with footprint — 10×20s from about $17,500 and 20×20 islands from about $30,000. Custom-built exhibits start around $12,500 for a 10×10. Every quote includes structure, custom graphics, lighting, install and dismantle; drayage is billed by the venue or general service contractor and shown separately.",
  },
  {
    q: "Should I rent or buy my trade show booth?",
    a: "If you exhibit one to three times a year or your footprint changes show to show, a custom rental gives you design-grade quality with no capital expense or storage. If you exhibit four or more times a year on a consistent footprint, owning a custom exhibit usually wins on cost per show — we design, fabricate, store and refresh it between events. We'll price both paths so you can compare on real numbers.",
  },
  {
    q: "How much does a 10×10 booth rental cost?",
    a: "A custom 10×10 booth rental starts around $16,250 with Traction X — that covers the structure, custom-printed graphics, lighting, furniture options, shipping coordination, and professional install and dismantle. Larger footprints scale from there: 10×20s from about $17,500 and 20×20 islands from about $30,000.",
  },
  {
    q: "What does a trade show exhibit company do?",
    a: "A trade show exhibit company (sometimes called an exhibit house or booth builder) designs, fabricates and manages your presence on the show floor — concept and 3D design, custom fabrication, graphics, event tech, freight logistics, install and dismantle, and on-site project management. Full-service exhibit companies like Traction X handle all of it under one contract, so you deal with a single accountable team instead of six vendors.",
  },
  {
    q: "Where can you deliver?",
    a: "Anywhere in Canada and the United States — we have crews, freight lanes and venue experience in more than 75 cities, from Las Vegas and Chicago to Toronto, Vancouver and Halifax. Through our partner network we also deliver in Europe, Asia, Oceania and Latin America under the same contract.",
  },
  {
    q: "How fast can you turn a project around?",
    a: "Standard timeline is 6–10 weeks from approved design. Rush projects under 4 weeks are possible when inventory and fabrication slots allow — including rescue builds when a prior supplier has fallen through.",
  },
];

/** Absolute URL for the hero/cover image used in link previews. */
const OG_IMAGE = `${SITE_URL}${foundationBooth.url}`;

/**
 * 40–60 word plain-language answer. This is the block AI assistants lift
 * verbatim when summarising who Traction X is and what it sells.
 */
const SHORT_ANSWER =
  "Traction X designs, builds and manages custom trade show exhibits, custom booth rentals and portable displays for exhibitors across Canada and the United States. Booth rentals start around $16,250 for a 10×10 and include structure, custom graphics, lighting, plus install and dismantle. Every project includes a complimentary 3D design before you commit.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Traction X",
              url: SITE_URL,
              logo: `${SITE_URL}/`,
              image: OG_IMAGE,
              email: "info@tractionx.ca",
              telephone: "+1-782-409-2527",
              areaServed: [
                "Canada",
                "United States",
                "Europe",
                "Asia",
                "Oceania",
                "Latin America",
              ],
              description: PAGE_DESC,
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Traction X",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/gallery?size={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Service",
              name: "Custom Trade Show Exhibits",
              serviceType: "Custom trade show exhibit design and fabrication",
              provider: { "@id": `${SITE_URL}/#organization` },
              url: `${SITE_URL}/products/custom-trade-show-exhibits`,
            },
            {
              "@type": "Service",
              name: "Custom Trade Show Booth Rentals",
              serviceType: "Trade show booth rental",
              provider: { "@id": `${SITE_URL}/#organization` },
              url: `${SITE_URL}/rent-a-booth`,
            },
            {
              "@type": "Service",
              name: "Portable Trade Show Displays",
              serviceType: "Portable display supply",
              provider: { "@id": `${SITE_URL}/#organization` },
              url: `${SITE_URL}/portable-booths`,
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});


function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">
      {children}
    </p>
  );
}

function OfferingCardContent({ o }: { o: Offering }) {
  return (
    <>
      <div className="aspect-[4/3] overflow-hidden bg-white/5">
        <img
          src={o.img}
          alt={o.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
      </div>
      <div className="p-6">
        <div className="text-xs text-white/40 mb-2">{o.n}</div>
        <h3 className="font-display text-xl font-semibold mb-3 leading-snug">
          {o.title}
        </h3>
        <p className="text-sm text-white/65 leading-relaxed mb-5">
          {o.body}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.78_0.13_300)]">
          {o.cta} <span>→</span>
        </span>
      </div>
    </>
  );
}

function Home() {
  const city = useCityContext();
  const { openQuote } = useCta();
  const ctaLabel = city ? city.ctaText : CTA_LABELS.quote;
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased pb-16 lg:pb-0">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Custom trade show exhibit designed and fabricated by Traction X on a North American show floor"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/70 mb-6">
            Trade show booth design, rentals &amp; custom exhibits
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.02] max-w-4xl">
            Trade Show Exhibits
            <br />
            <span className="text-[oklch(0.78_0.13_300)]">& Brand Activations</span>
            <br />
            Across Canada & the U.S.
          </h1>
          <p className="mt-8 max-w-2xl text-white/80 text-base md:text-lg leading-relaxed">
            Design, custom fabrication, event tech, freight and installation — one team,
            one contract, on show floors from Las Vegas and Chicago to Toronto, Vancouver,
            Orlando and Halifax. We ship internationally when your calendar calls for it.
          </p>
          {city ? (
            <p className="mt-4 inline-block rounded-full border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 px-4 py-1.5 text-sm text-white/90">
              Trusted by exhibitors at {city.venues.slice(0, 3).join(", ")}
              {city.venues.length > 3 ? " & more" : ""}.
            </p>
          ) : null}
          {/* One primary action. Secondary paths stay available but visually quieter —
              three equal-weight buttons split attention and depress click-through. */}
          <div className="mt-10 flex flex-col items-start gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Design3DButton source="home-hero" className="!px-7 !py-4 text-base" />
              <button
                type="button"
                onClick={() => openQuote({ source: "home-hero" })}
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 rounded-xl font-semibold hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {ctaLabel} <span aria-hidden>→</span>
              </button>
            </div>
            <CtaNote kind="design" />
            <BookMeetingButton
              source="home-hero"
              variant="ghost"
              className="!px-0 !py-0 text-sm text-white/60 underline underline-offset-4 hover:text-white"
            />
          </div>

          <div className="mt-14 flex flex-wrap gap-8 text-sm text-white/60">
            <div>
              <div className="text-2xl font-display font-bold text-white">700+</div>
              designs in the catalog
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">{NA_CITY_COUNT}+</div>
              Canadian &amp; U.S. cities served
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">15+</div>
              years on the floor
            </div>
          </div>
        </div>
      </section>

      {/* Booth finder — its own band directly under the hero, so it's the first
          thing after the headline instead of the fifth thing inside it. */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Find your trade show booth rental: city, size, budget.
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/60 max-w-2xl">
            Search 299 rental designs with live pricing for your show city.
          </p>
          <div className="mt-6">
            <BoothFinder />
          </div>
        </div>
      </section>

      <PromiseBar />

      {/* Intro */}
      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <Eyebrow>Full service trade show solutions</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            One team on every North American show floor you exhibit on.
          </h2>
          <div className="mt-8 space-y-5 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              Specializing in trade show exhibits, displays and experiential
              environments &amp; events — we're known for a turnkey, full-service
              approach that uncovers opportunities and streamlines the entire
              event marketing process.
            </p>
            <p>
              Our team of designers, architects, fabricators and project managers
              produce world-class trade show exhibits, the eye-catching displays
              you see in national in-store and event marketing campaigns, and
              just about any custom display project imaginable.
            </p>
          </div>
        </div>
      </section>

      {/* Short answer — the block AI assistants and featured snippets lift verbatim. */}
      <section id="short-answer" className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Eyebrow>The short answer</Eyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            What does Traction X do?
          </h2>
          <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed">{SHORT_ANSWER}</p>
        </div>
      </section>

      {/* Exhibit sizes & services — indexable prose carrying the industry's
          core product/size terms, with internal links into each cluster. */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <Eyebrow>Exhibit sizes &amp; services</Eyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Every booth size, every level of build.
          </h2>
          <div className="mt-6 space-y-5 text-white/70 text-base md:text-lg leading-relaxed">
            <p>
              As a full-service trade show exhibit company, we design, build, rent and
              manage exhibits in every standard footprint — from{" "}
              <Link to="/booth-size/$slug" params={{ slug: "10x10-booths" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                10×10 inline booths
              </Link>{" "}
              and{" "}
              <Link to="/booth-size/$slug" params={{ slug: "10x20-booths" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                10×20 displays
              </Link>{" "}
              up to{" "}
              <Link to="/booth-size/$slug" params={{ slug: "20x20-booths" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                20×20 island exhibits
              </Link>{" "}
              and{" "}
              <Link to="/double-deck-trade-show-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
                double-deck trade show booths
              </Link>{" "}
              with meeting rooms and hospitality space upstairs.
            </p>
            <p>
              Choose{" "}
              <Link to="/products/$slug" params={{ slug: "custom-trade-show-exhibits" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                custom trade show exhibits
              </Link>{" "}
              fabricated in our own shop,{" "}
              <Link to="/rent-a-booth" className="text-[oklch(0.78_0.13_300)] hover:underline">
                custom booth rentals
              </Link>{" "}
              with premium finishes and no capital expense,{" "}
              <Link to="/products/$slug" params={{ slug: "modular-catalog" }} className="text-[oklch(0.78_0.13_300)] hover:underline">
                modular exhibits
              </Link>{" "}
              that reconfigure between shows, or{" "}
              <Link to="/portable-booths" className="text-[oklch(0.78_0.13_300)] hover:underline">
                portable displays
              </Link>{" "}
              for tabletops, roadshows and small budgets. Every path starts with a
              complimentary 3D design — you see your exact booth before you spend a dollar.
            </p>
          </div>
        </div>
      </section>

      {/* Self-triage — cuts choice overload by routing on intent, not product name. */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Eyebrow>Which is right for me?</Eyebrow>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Pick the path that matches your next show.
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Exhibiting 4+ times a year",
                b: "Own a custom exhibit. Designed and fabricated for your brand, stored and refreshed between shows.",
                href: "/products/$slug" as const,
                slug: "custom-trade-show-exhibits",
                cta: "Custom exhibits",
              },
              {
                t: "1–3 shows a year, or a changing footprint",
                b: "Custom booth rentals from $16,250 for a 10×10 — same design quality, no capex line.",
                href: "/rent-a-booth" as const,
                cta: "Booth rentals",
              },
              {
                t: "Tabletops, roadshows and small budgets",
                b: "Portable displays you buy outright. Ships in 7–12 business days, reprint graphics for years.",
                href: "/portable-booths" as const,
                cta: "Portable displays",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
                <h3 className="font-display text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed flex-1">{x.b}</p>
                {x.slug ? (
                  <Link
                    to="/products/$slug"
                    params={{ slug: x.slug }}
                    className="mt-4 text-sm font-semibold text-[oklch(0.78_0.13_300)] hover:underline"
                  >
                    {x.cta} →
                  </Link>
                ) : (
                  <Link
                    to={x.href}
                    className="mt-4 text-sm font-semibold text-[oklch(0.78_0.13_300)] hover:underline"
                  >
                    {x.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources — somewhere to go for visitors who aren't ready for a form,
          and the homepage's internal link path into the resource cluster. */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Free exhibitor resources</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Planning tools you can use before you talk to anyone.
              </h2>
            </div>
            <Link
              to="/exhibitor-resources"
              className="text-sm font-semibold text-[oklch(0.78_0.13_300)] hover:underline"
            >
              All resources →
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESOURCE_PICKS.map((slug) => {
              const r = EXHIBITOR_RESOURCES.find((x) => x.slug === slug);
              if (!r) return null;
              return (
                <Link
                  key={r.slug}
                  to="/exhibitor-resources/$slug"
                  params={{ slug: r.slug }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col hover:border-[oklch(0.78_0.13_300)]/60 transition"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {r.kind} · {r.readMinutes} min
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{r.label}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{r.summary}</p>
                  <span className="mt-4 text-sm font-semibold text-[oklch(0.78_0.13_300)]">
                    Open →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
            <div>
              <Eyebrow>Among our clients</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Trusted by brands you know.
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              Browse from over 700 designs — from startup pods to double-deck
              islands and sponsor takeovers.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="bg-black h-24 flex items-center justify-center px-4 text-center"
              >
                <span className="text-white/70 text-xs md:text-sm font-medium tracking-wide uppercase">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="services" className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <Eyebrow>Among our projects</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Custom-grade booths. Rental economics.
              <span className="text-white/50"> Sponsor-scale activations.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {OFFERINGS.map((o) =>
              o.params ? (
                <Link
                  key={o.title}
                  to={o.to}
                  params={o.params}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition"
                >
                  <OfferingCardContent o={o} />
                </Link>
              ) : (
                <Link
                  key={o.title}
                  to={o.to}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition"
                >
                  <OfferingCardContent o={o} />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              From booth design to install and dismantle.
            </h2>
            <p className="mt-5 text-white/65 max-w-2xl">
              One vendor, one project manager, one accountable timeline — from
              first sketch to dismantle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {PROCESS.map((p) => (
              <div key={p.title} className="bg-black p-8">
                <div className="text-[oklch(0.78_0.13_300)] text-sm font-bold tracking-widest mb-4">
                  {p.n}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage — Canada & U.S. first, international as a closing note */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <Eyebrow>Where we work</Eyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Show floors across Canada and the United States.
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm md:text-base">
              Crews, freight lanes and venue know-how in {NA_CITY_COUNT}+ Canadian and U.S.
              cities — with a dedicated page for each one covering venue rules, labour and
              drayage.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MARKETS.map((r) => (
              <Link
                key={r.slug}
                to="/city/$slug"
                params={{ slug: r.slug }}
                className="block border border-white/10 rounded-2xl p-6 hover:border-[oklch(0.78_0.13_300)]/60 transition bg-white/[0.02]"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">
                  Booth rentals
                </div>
                <div className="font-display text-2xl font-bold">{r.name}</div>
                <div className="text-sm text-white/55 mt-2">{r.note}</div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/55 max-w-3xl">
            Outside North America, our partner network delivers in Europe, Asia, Oceania and
            Latin America under the same single contract.{" "}
            <Link to="/global" className="text-[oklch(0.78_0.13_300)] hover:underline">
              See international coverage →
            </Link>
          </p>
        </div>
      </section>

      {/* Why choose */}
      <section
        id="why"
        className="border-t border-white/10 bg-white/[0.02] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <Eyebrow>Why choose Traction X</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
            A trade show exhibit company that handles everything.
          </h2>
          <div className="mt-14 grid lg:grid-cols-2 gap-10">
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                Our install teams work the major Canadian and U.S. halls week in and
                week out, so they already know the labour rules, dock schedules and
                rigging requirements at the venue you're heading to. Your exhibit is set
                up, inspected and show-ready before you walk the floor — and we handle
                international shows through the same team when your calendar goes abroad.
              </p>
              <p>
                At the core of our philosophy is a commitment to understanding
                each client's unique needs. We prioritize clear communication,
                collaboration and a personalized approach so the final result
                aligns with your brand identity and marketing objectives — from
                first concept through post-event.
              </p>
              <p>
                Fabrication is where ideas turn tangible. Our skilled team uses
                cutting-edge equipment and premium materials to bring designs to
                life — visually striking exhibits engineered to survive freight,
                install, and repeat runs at your next show.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={lvHall}
                  alt="Traction X exhibit floor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl border border-white/10 p-6 bg-black">
                <div className="text-[oklch(0.78_0.13_300)] text-sm font-bold mb-2">
                  01
                </div>
                <div className="font-display font-bold text-lg leading-tight">
                  Full-Service Solution Provider
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Design, fabrication, freight, install & dismantle — one
                  vendor, one invoice.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-6 bg-black">
                <div className="text-[oklch(0.78_0.13_300)] text-sm font-bold mb-2">
                  02
                </div>
                <div className="font-display font-bold text-lg leading-tight">
                  Award-Winning Design Team
                </div>
                <p className="text-sm text-white/60 mt-2">
                  In-house designers, architects and fabricators producing
                  world-class booths every year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow>Our work</Eyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                Recent custom exhibits &amp; booth rentals.
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm md:text-base">
              A snapshot from recent exhibits — from custom islands to modular
              rentals and sponsor activations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p) => (
              <div
                key={p.label}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
              >
                <img
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-display text-lg font-semibold">
                    {p.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <Eyebrow>What our clients say</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
            Trusted by marketing teams, agencies and event producers.
          </h2>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-white/10 p-6 bg-black flex flex-col"
              >
                <div className="text-[oklch(0.78_0.13_300)] text-3xl font-display leading-none mb-3">
                  “
                </div>
                <blockquote className="text-sm text-white/75 leading-relaxed flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-white/50 mt-0.5">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-12">
            Common questions.
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="font-display font-semibold text-base md:text-lg">
                    {f.q}
                  </span>
                  <span className="text-[oklch(0.78_0.13_300)] text-xl leading-none group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-white/65 text-sm md:text-base leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section
        id="contact"
        className="border-t border-white/10 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, oklch(0.78 0.13 300 / 0.35), transparent 55%), radial-gradient(ellipse at 80% 70%, oklch(0.78 0.13 300 / 0.15), transparent 55%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                {city ? `Ready to plan your next ${city.label} show?` : "Ready to plan your next show?"}
              </h2>
              <p className="mt-5 text-white/70 max-w-xl text-base md:text-lg leading-relaxed">
                Send your show list, stand size and target dates. Within two business
                days you'll receive preliminary concept direction and investment — no
                sales call required to see pricing. Full photoreal design and a costed
                BOM follow in roughly one to two weeks as the scope develops.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:info@tractionx.ca"
                  className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-xl font-semibold hover:bg-white/90"
                >
                  {ctaLabel} →
                </a>
                <a
                  href="https://calendly.com/seancourt/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10"
                >
                  Book a virtual call
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-8 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-1">
                  Phone
                </div>
                <a
                  href="tel:+17824092527"
                  className="font-display text-2xl font-bold hover:text-[oklch(0.78_0.13_300)]"
                >
                  +1-782-409-2527
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-1">
                  Email
                </div>
                <a
                  href="mailto:info@tractionx.ca"
                  className="font-display text-xl font-bold hover:text-[oklch(0.78_0.13_300)] break-all"
                >
                  info@tractionx.ca
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-1">
                  Hours
                </div>
                <div className="text-white/75">Mon–Fri · 9am–6pm PT</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-1">
                  Coverage
                </div>
                <div className="text-white/75">
                  Canada &amp; the U.S. · turnkey install included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <DesignCtaBand source="home" />
      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="Traction X" className="h-9 w-auto mb-4" />
            <p className="text-sm text-white/55 max-w-sm leading-relaxed">
              Trade show exhibits, custom fabrication and global brand
              activations. One team, one contract, every show floor.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
              Explore
            </div>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link
                  to="/custom-trade-show-floor-plans"
                  className="hover:text-white"
                >
                  Custom Floor Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/las-vegas-modular-trade-show-booth-rentals"
                  className="hover:text-white"
                >
                  Las Vegas Rentals
                </Link>
              </li>
              <li>
                <Link
                  to="/web-summit-vancouver-booth-rentals"
                  className="hover:text-white"
                >
                  Web Summit Vancouver
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
              Contact
            </div>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <a href="tel:+17824092527" className="hover:text-white">
                  +1-782-409-2527
                </a>
              </li>
              <li>
                <a href="mailto:info@tractionx.ca" className="hover:text-white">
                  info@tractionx.ca
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
            <div>© {new Date().getFullYear()} Traction X. All rights reserved.</div>
            <div>Trade show exhibits & brand activations globally.</div>
          </div>
        </div>
        <CityFooterBlock />
      </footer>
    </div>
  );
}
