import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FileAttach } from "@/components/FileAttach";
import { useMarkCityVisit } from "@/lib/city-context";
import heroBg from "@/assets/hero-bg.jpg";
import booth1 from "@/assets/portfolio/canada-defence-booth-01.jpg.asset.json";
import booth2 from "@/assets/portfolio/accenture-mission-ready.jpg.asset.json";
import lvHall from "@/assets/portfolio/canada-defence-booth-02.jpg.asset.json";
import photo1 from "@/assets/portfolio/air-canada-cargo-booth.jpg.asset.json";
import photo2 from "@/assets/portfolio/telus-game-changers-room.jpg.asset.json";
import photo3 from "@/assets/portfolio/sma-energy-booth.jpg.asset.json";
import photo4 from "@/assets/portfolio/air-canada-lounge.jpg.asset.json";
import photo5 from "@/assets/portfolio/canada-export-booth.jpg.asset.json";
import photo6 from "@/assets/portfolio/telus-locker-detail.jpg.asset.json";
import photo7 from "@/assets/portfolio/team-canada-fanfest.jpg.asset.json";
import { DesignCtaBand } from "@/components/GlobalCta";
import { ProofBlock } from "@/components/UniqueProof";
import { getCityProof } from "@/data/page-proof";

const PAGE_TITLE =
  "Custom Trade Show Booth Rentals in Las Vegas | Traction X";
const PAGE_DESC =
  "Rent custom trade show booths in Las Vegas with Traction X. Custom design, turnkey I&D, on-site management at LVCC, Mandalay Bay, Caesars Forum & The Venetian. Get preliminary concept direction and investment within two business days.";
const CANONICAL = "/las-vegas-modular-trade-show-booth-rentals";

export const Route = createFileRoute(
  "/las-vegas-modular-trade-show-booth-rentals",
)({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "custom trade show booth rental Las Vegas, trade show booth rental Las Vegas, exhibit rentals Las Vegas, LVCC booth builder, CES booth rental, Mandalay Bay exhibit, custom modular exhibit Las Vegas",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // Service-area business: no Las Vegas office is claimed. Local
            // relevance comes from areaServed, not a fabricated address.
            {
              "@type": "Organization",
              "@id": "https://tractionxtemp.lovable.app/#organization",
              name: "Traction X",
              url: "https://tractionxtemp.lovable.app",
              telephone: "+1-782-409-2527",
              email: "info@tractionx.ca",
              sameAs: ["https://tractionx.ca"],
            },
            {
              "@type": "Service",
              "@id": CANONICAL + "#service",
              name: "Custom Trade Show Booth Rentals — Las Vegas",
              serviceType: "Trade show booth rental and exhibit design",
              image: "/og-image.jpg",
              areaServed: [
                { "@type": "City", name: "Las Vegas" },
                { "@type": "City", name: "Henderson" },
                { "@type": "City", name: "Paradise" },
                { "@type": "City", name: "North Las Vegas" },
              ],
              provider: { "@id": "https://tractionxtemp.lovable.app/#organization" },
              description: PAGE_DESC,
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "HowTo",
              name: "How to rent a custom trade show booth in Las Vegas",
              description:
                "A six-step process to design, engineer, fabricate, ship, install, and dismantle a modular trade show booth rental in Las Vegas.",
              totalTime: "P42D",
              step: [
                { "@type": "HowToStep", position: 1, name: "Discovery & Brief", text: "30-minute strategy call to map goals, show floor location, sponsorship deliverables and lead-capture stack." },
                { "@type": "HowToStep", position: 2, name: "Design & 3D Renderings", text: "Preliminary concept direction and investment within two business days; full photoreal 3D renderings, a floor plan and costed BOM follow over roughly one to two weeks." },
                { "@type": "HowToStep", position: 3, name: "Engineering & Production", text: "Engineered for Clark County Fire Marshal and venue rules, SEG graphics printed, pre-built in-shop for QA." },
                { "@type": "HowToStep", position: 4, name: "Freight & Warehouse Coordination", text: "Palletized to the advance warehouse, Material Handling Agreement filed, target move-in coordinated with the GSC. Drayage is billed by the venue/GSC and shown as a separate line item." },
                { "@type": "HowToStep", position: 5, name: "Install & On-Site", text: "Teamsters 631 and IATSE 720 I&D crews build the booth with a Traction X PM supervising every shift." },
                { "@type": "HowToStep", position: 6, name: "Dismantle & Store", text: "Tear down, ship back, refresh graphics, and store the modular kit for the next city." },
              ],
            },
            {
              "@type": "Place",
              name: "Las Vegas Convention Center",
              address: { "@type": "PostalAddress", streetAddress: "3150 Paradise Rd", addressLocality: "Las Vegas", addressRegion: "NV", postalCode: "89109", addressCountry: "US" },
            },
            {
              "@type": "Place",
              name: "Mandalay Bay Convention Center",
              address: { "@type": "PostalAddress", streetAddress: "3950 S Las Vegas Blvd", addressLocality: "Las Vegas", addressRegion: "NV", postalCode: "89119", addressCountry: "US" },
            },
            {
              "@type": "Place",
              name: "Caesars Forum",
              address: { "@type": "PostalAddress", streetAddress: "3911 S Koval Ln", addressLocality: "Las Vegas", addressRegion: "NV", postalCode: "89109", addressCountry: "US" },
            },
            {
              "@type": "Place",
              name: "The Venetian Expo",
              address: { "@type": "PostalAddress", streetAddress: "201 Sands Ave", addressLocality: "Las Vegas", addressRegion: "NV", postalCode: "89169", addressCountry: "US" },
            },
            {
              "@type": "WebPage",
              "@id": CANONICAL + "#webpage",
              url: CANONICAL,
              name: PAGE_TITLE,
              description: PAGE_DESC,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["#tldr", "#definitions", ".faq-question"],
              },
              inLanguage: "en-US",
              isPartOf: { "@id": "https://tractionx.ca#website" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Las Vegas Custom Trade Show Booth Rentals",
                  item: CANONICAL,
                },
              ],
            },

          ],
        }),
      },
    ],
  }),
  component: LasVegasPage,
});

const FAQS = [
  {
    q: "How much does a custom trade show booth rental cost in Las Vegas?",
    a: "Custom modular trade show booth rentals in Las Vegas start at $16,250 for a 10×10, $22,750 for a 10×20, and $39,000 for a 20×20 island. Fully custom builds and larger islands are quoted to spec. Every package includes design, 3D renderings, SEG fabric graphics, I&D labor, and an on-site project manager. Drayage is billed separately by the venue/GSC. We send preliminary concept direction and investment within two business days so you can see how the project is shaping up.",
  },
  {
    q: "Which Las Vegas venues do you service?",
    a: "Traction X delivers, installs, and dismantles at every major Las Vegas venue including the Las Vegas Convention Center (LVCC) West, Central and North Halls, Mandalay Bay Convention Center, Caesars Forum, The Venetian Expo (Sands), Wynn, MGM Grand Conference Center, Resorts World, and the Westgate. We hold relationships with the union labor pools and the official general service contractors for each hall.",
  },
  {
    q: "How far in advance should I book a Las Vegas booth rental?",
    a: "For major shows like CES, NAB, SEMA, MAGIC, ConExpo, IMEX, and HIMSS we recommend booking 12–16 weeks out. For mid-sized shows, 6–10 weeks is comfortable. We accept rush projects under 4 weeks when inventory allows and frequently rescue exhibitors whose original supplier dropped the ball.",
  },
  {
    q: "Do modular rentals look as good as custom builds?",
    a: "Yes. Our modular systems use aluminum extrusion frames with tension-fabric SEG graphics, backlit lightboxes, real wood-laminate counters, programmable LED, and integrated AV. Side by side, a well-designed modular rental is visually indistinguishable from a custom build — at 40–60% of the cost and with reusable components for your next show.",
  },
  {
    q: "Do you handle I&D labor, show services, and freight in Las Vegas?",
    a: "Yes. We coordinate freight to the advance warehouse or show site, union I&D labor, electrical and rigging orders, AV setup, on-site supervision during show days, dismantle, and return logistics. Drayage is billed directly by the venue or GSC; we file the paperwork and manage it so you don't have to. You get one project manager and one invoice for everything we deliver.",
  },
  {
    q: "Can the same booth be reconfigured for shows in other cities?",
    a: "That is the core advantage of modular. Your 20x20 island in Las Vegas can be reconfigured as a 10x20 inline for your next regional show, or scaled up to a 30x30 with added kit. We store, refresh graphics, and ship it for you between events.",
  },
  {
    q: "What is your turnaround on a quote?",
    a: "We acknowledge complete briefs within one business day and send preliminary concept direction and investment within two business days. Full photoreal booth renderings, floor plans and a costed BOM follow over roughly one to two weeks as the scope develops. No call required to get started.",
  },
  {
    q: "Do you provide on-site support during the show?",
    a: "Yes. A dedicated Traction X project manager is on the floor every day of your event, handling anything from a burned-out lightbox to a last-minute graphic swap so your team can focus on leads.",
  },
];

const VENUES = [
  {
    name: "Las Vegas Convention Center (LVCC)",
    blurb:
      "West, Central, and North Halls. Home to CES, SEMA, NAB, World of Concrete, ConExpo, ISC West, and Pack Expo.",
    halls: "2.5M+ sq ft",
  },
  {
    name: "Mandalay Bay Convention Center",
    blurb:
      "Host venue for HIMSS, Money 20/20, Black Hat, MINExpo, and the National Association of Broadcasters technology pavilions.",
    halls: "2.1M sq ft",
  },
  {
    name: "Caesars Forum",
    blurb:
      "Ground-level pillarless ballrooms ideal for high-end product launches and association meetings on the Strip.",
    halls: "550K sq ft",
  },
  {
    name: "The Venetian Expo (Sands)",
    blurb:
      "Five exhibit halls connecting to Caesars Forum via skybridge. Host to ASD Market Week, MAGIC, IPW, and Tobacco Plus Expo.",
    halls: "2.25M sq ft",
  },
  {
    name: "Wynn & Encore Convention Center",
    blurb:
      "Premium boutique meeting space for VIP launches, financial summits, and luxury brand activations.",
    halls: "560K sq ft",
  },
  {
    name: "Resorts World / MGM Grand / Westgate",
    blurb:
      "Mid-size show floors and ballroom activations across the Strip and Paradise Road corridor.",
    halls: "Multi-venue",
  },
];

const SHOWS = [
  "CES",
  "NAB Show",
  "SEMA",
  "MAGIC / ASD",
  "ConExpo-Con/Agg",
  "World of Concrete",
  "HIMSS",
  "IMEX America",
  "Money 20/20",
  "ISC West",
  "Pack Expo Las Vegas",
  "MINExpo",
  "Black Hat USA",
  "AAPEX",
  "Informa Markets shows",
  "RECon / ICSC",
];

const PROCESS = [
  {
    n: "01",
    title: "Discovery & Brief",
    body:
      "30-minute strategy call. We map your goals, audience, show floor location, sponsorship deliverables, and lead-capture stack.",
  },
  {
    n: "02",
    title: "Design & 3D Renderings",
    body:
      "Within two business days you receive preliminary concept direction and investment. Full photoreal 3D renderings, a floor plan and a costed BOM follow over roughly one to two weeks as the scope develops.",
  },
  {
    n: "03",
    title: "Engineering & Production",
    body:
      "Once approved, we engineer for Las Vegas fire marshal and venue rules, print SEG graphics, and pre-build in our shop for QA.",
  },
  {
    n: "04",
    title: "Freight & Warehouse Coordination",
    body:
      "We palletize, ship to the advance warehouse, file the Material Handling Agreement, and coordinate target-move dates with the GSC. Drayage is billed by the venue/GSC and shown separately.",
  },
  {
    n: "05",
    title: "Install & On-Site",
    body:
      "Union I&D crews build the booth, our PM supervises every shift, AV is tuned, and we hand you a show-ready exhibit the morning of day one.",
  },
  {
    n: "06",
    title: "Dismantle & Store",
    body:
      "We tear down, ship back, refresh graphics, and store your modular kit for the next city — no scrambling, no surprise re-prints.",
  },
];

const NEIGHBORHOODS = [
  { name: "The Strip / Paradise", note: "Wynn, Venetian Expo, Caesars Forum, MGM Grand" },
  { name: "Convention Center District", note: "LVCC West, Central, North Halls + Westgate" },
  { name: "Downtown / Fremont", note: "Plaza, Downtown Grand activations" },
  { name: "Summerlin", note: "Red Rock Resort meetings & launches" },
  { name: "Henderson / Green Valley", note: "M Resort, Green Valley Ranch" },
  { name: "North Las Vegas", note: "Advance warehouse staging & freight" },
  { name: "Spring Valley & Enterprise", note: "Off-strip production & storage" },
  { name: "Sunrise Manor", note: "East-side staging routes to LVCC" },
];

const LANDMARKS = [
  { from: "Harry Reid International Airport (LAS)", to: "LVCC", time: "12 min · 4.2 mi" },
  { from: "Mandalay Bay Convention Center", to: "Harry Reid (LAS)", time: "8 min · 2.1 mi" },
  { from: "Caesars Forum", to: "The Venetian Expo", time: "5 min walk · skybridge" },
  { from: "Resorts World", to: "LVCC West Hall", time: "6 min walk · pedestrian bridge" },
  { from: "Wynn Convention Center", to: "LVCC Central", time: "8 min · 0.9 mi" },
  { from: "Downtown Fremont", to: "LVCC", time: "10 min · 4.5 mi" },
];


const PACKAGES = [
  {
    size: "10×10 Inline",
    sqft: "100 sq ft",
    price: "from $16,250",
    features: [
      "Custom-designed SEG fabric back wall",
      "Branded reception counter w/ storage",
      "Programmable accent LED",
      "Monitor mount up to 55\"",
      "Vinyl flooring + 2 stools",
      "Full I&D & PM included",
    ],
  },
  {
    size: "10×20 Inline",
    sqft: "200 sq ft",
    price: "from $22,750",
    featured: true,
    features: [
      "Custom layout: dual lightbox towers + headline lockup",
      "Demo station + lockable closet",
      "65\" 4K monitor + soundbar",
      "Soft seating vignette",
      "Lead capture iPad + charging shelf",
      "Full turnkey, including show services",
    ],
  },
  {
    size: "20×20 Island",
    sqft: "400 sq ft",
    price: "from $39,000",
    features: [
      "Custom island design w/ hanging sign or overhead light ring",
      "Three demo pods + meeting room",
      "Backlit hero wall (SEG + LED)",
      "Premium laminate counters & shelving",
      "Cat-walk lighting & programmable RGB",
      "Dedicated on-site project manager",
    ],
  },
  {
    size: "20×30 + Custom Islands",
    sqft: "600+ sq ft",
    price: "Custom quote",
    features: [
      "Fully custom booth design or custom rental program",
      "Double-deck options available",
      "Suspended truss & rigging",
      "VR / AR demo theatres",
      "Hospitality bar & private suite",
      "White-glove project leadership",
    ],
  },
];

const STATS = [
  { k: "120+", v: "Las Vegas activations delivered" },
  { k: "24 hr", v: "Quote turnaround, itemized" },
  { k: "Both", v: "Custom builds & custom rentals" },
  { k: "98%", v: "On-time install rate" },
];

function CTAButton({
  children,
  variant = "primary",
  href = "#quote",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold tracking-wide transition-all duration-200 shadow-lg";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90 hover:shadow-white/20"
      : "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
      <svg
        className="ml-2 w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative py-20 md:py-28 px-4 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-4">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] mb-10 md:mb-14 max-w-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

function LasVegasPage() {
  useMarkCityVisit("las-vegas");
  return (
    <PageLayout>

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Custom trade show booth installation at the Las Vegas Convention Center"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.78_0.13_300)] animate-pulse" />
              Las Vegas's Top Exhibit Company
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.02] mb-6">
              Custom Trade Show
              <br />
              Booth Rentals in
              <br />
              <span className="text-[oklch(0.78_0.13_300)]">Las Vegas</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed font-light">
              Custom-designed, modular exhibits delivered turnkey to LVCC,
              Mandalay Bay, Caesars Forum, and The Venetian. On time, on budget,
              and built to dominate the show floor.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <CTAButton>Get My Two-Day Estimate</CTAButton>
              <CTAButton variant="ghost" href="#packages">
                See Packages & Pricing
              </CTAButton>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {STATS.map((s) => (
                <div key={s.k}>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {s.k}
                  </div>
                  <div className="text-xs text-white/60 mt-1 leading-snug">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={booth1.url}
                alt="Premium modular exhibit booth with backlit branding"
                className="w-full h-full object-cover"
                width={1600}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Why Las Vegas */}
      <Section eyebrow="Built for the world's biggest show floor">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-6">
              Las Vegas is the most competitive trade show city on earth.
              Your booth needs to earn the walk-up.
            </h2>
            <div className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed font-light">
              <p>
                Every year, Las Vegas hosts more than <strong className="text-white">22,000 conventions</strong> and
                draws over <strong className="text-white">six million business
                travelers</strong>. The Las Vegas Convention Center alone moves
                more than 2.5 million square feet of exhibit space across CES,
                SEMA, NAB, ConExpo, and World of Concrete. If you are exhibiting
                here, you are sharing the aisle with brands that spend
                seven figures on their floor presence.
              </p>
              <p>
                Traction X does both. We design and fabricate <strong className="text-white">fully custom trade show booths</strong> built from scratch for one-of-a-kind flagship activations, and we run a <strong className="text-white">custom modular rental program</strong> that delivers the same visual impact with reusable, reconfigurable systems. Aluminum extrusion frames, tension-fabric SEG graphics, integrated AV, programmable LED, and real wood-laminate finishes. Nothing about it looks "rented."
              </p>
              <p>
                We are the team brands call when they need a one-time custom build, when they want a rental program that scales across multiple cities, or when their original supplier missed a deadline three weeks out. One project manager, one phone number, and one invoice covering design, fabrication, freight, I&D, AV, and dismantle.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 space-y-4">
            {[
              ["No surprise invoices", "Itemized line-by-line quotes. What you approve is what you pay."],
              ["Union-savvy on the ground", "We hold long-standing relationships with Las Vegas I&D crews and every GSC."],
              ["Reusable, not disposable", "Your kit ships to the next city. New graphics, new layout, same investment."],
              ["One PM through show close", "Your project manager is on the floor every day — not in another time zone."],
            ].map(([t, b]) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <div className="font-semibold text-white mb-1.5">{t}</div>
                <div className="text-sm text-white/65 font-light leading-relaxed">
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TL;DR — answer-first, citation-ready block for AI/GEO */}
      <section
        id="tldr"
        className="border-y border-white/10 bg-[oklch(0.06_0_0)] py-14 px-4"
        aria-labelledby="tldr-heading"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[oklch(0.78_0.13_300)] mb-4">
            Fast answer
          </p>
          <h2 id="tldr-heading" className="text-2xl md:text-3xl font-bold leading-tight mb-5">
            Traction X designs, builds, ships, installs and dismantles custom trade show booths and custom modular rentals in Las Vegas — from 10&times;10 inlines to 30&times;30 double-deck islands — at every major venue including LVCC, Mandalay Bay, Caesars Forum and The Venetian Expo.
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-white/75 text-sm md:text-base font-light">
            <li>• Custom rentals start at $16,250 (10&times;10), $22,750 (10&times;20), $39,000 (20&times;20).</li>
            <li>• Fully custom builds and large islands quoted to spec.</li>
            <li>• Itemized quote and 3D renderings within 24 business hours.</li>
            <li>• Union I&amp;D via Teamsters Local 631 and IATSE Local 720.</li>
            <li>• 120+ Las Vegas activations delivered · 98% on-time install rate.</li>
            <li>• One project manager, one invoice, on the show floor daily.</li>
          </ul>
        </div>
      </section>

      {/* Definitions — question-headed, GEO / AI-answer optimized */}
      <Section
        eyebrow="Straight answers"
        title="Las Vegas trade show booth rentals, defined."
      >
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10" id="definitions">
          <div>
            <h3 className="faq-question text-xl md:text-2xl font-semibold text-white mb-3">
              What is a custom modular trade show booth rental in Las Vegas?
            </h3>
            <p className="text-white/75 font-light leading-relaxed">
              A custom modular trade show booth rental in Las Vegas is a bespoke exhibit
              engineered from reusable aluminum-extrusion framing, tension-fabric SEG
              graphics, integrated LED and AV, and premium finishes — designed for one
              exhibitor, then reconfigured or scaled between shows. It is the right choice
              when you want custom-booth impact with rental economics and multi-show flexibility.
              Traction X also designs and fabricates fully custom, one-of-a-kind builds for
              flagship activations that demand a unique structure.
            </p>
          </div>
          <div>
            <h3 className="faq-question text-xl md:text-2xl font-semibold text-white mb-3">
              How much does a Las Vegas trade show booth rental cost?
            </h3>
            <p className="text-white/75 font-light leading-relaxed">
              Traction X custom modular rentals start at $16,250 for a 10&times;10, $22,750 for a
              10&times;20, and $39,000 for a 20&times;20 island. Larger islands, double-decks, and fully
              custom builds are quoted to spec. Every quote is itemized — design, fabrication,
              freight, union I&amp;D, and on-site PM broken out line by line. Drayage is billed
              by the venue/GSC and shown separately.
            </p>
          </div>
          <div>
            <h3 className="faq-question text-xl md:text-2xl font-semibold text-white mb-3">
              How long does it take to build a booth for a Las Vegas show?
            </h3>
            <p className="text-white/75 font-light leading-relaxed">
              A standard modular rental takes 6–10 weeks from approved design. Rush
              projects can ship in under 4 weeks when inventory allows — including
              rescue builds when a prior supplier has fallen through inside a
              show window.
            </p>
          </div>
          <div>
            <h3 className="faq-question text-xl md:text-2xl font-semibold text-white mb-3">
              Which unions handle install and dismantle in Las Vegas?
            </h3>
            <p className="text-white/75 font-light leading-relaxed">
              Las Vegas convention floors are a <strong className="text-white">Teamsters
              Local 631</strong> (freight, material handling, carpentry) and{" "}
              <strong className="text-white">IATSE Local 720</strong> (AV, rigging,
              electrical) jurisdiction. Traction X files every labor call, holds the COI
              each venue requires, and manages steward relationships so exhibitors never
              face a jurisdictional dispute.
            </p>
          </div>
        </div>
      </Section>

      {/* Comparison — modular vs custom vs portable (AI engines love these) */}
      <Section
        eyebrow="At a glance"
        title="Custom modular rental vs. fully custom build vs. portable pop-up."
        className="bg-[oklch(0.04_0_0)]"
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-white/[0.04] text-white/80 text-left">
              <tr>
                <th className="p-4 font-semibold">Attribute</th>
                <th className="p-4 font-semibold">Custom Modular Rental</th>
                <th className="p-4 font-semibold">Fully Custom Build</th>
                <th className="p-4 font-semibold">Portable Pop-up</th>
              </tr>
            </thead>
            <tbody className="text-white/75 font-light divide-y divide-white/10">
              <tr>
                <td className="p-4 text-white font-medium">Typical 20&times;20 cost</td>
                <td className="p-4">$39,000 – $65,000</td>
                <td className="p-4">$80,000 – $150,000+</td>
                <td className="p-4">$3,500 – $12,000</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">Visual quality</td>
                <td className="p-4">Custom-grade finishes & AV</td>
                <td className="p-4">Bespoke, best-in-class, unique architecture</td>
                <td className="p-4">Utility, off-the-shelf</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">Reusable across cities</td>
                <td className="p-4">Yes — reconfigurable kit</td>
                <td className="p-4">Rarely — often single-use</td>
                <td className="p-4">Yes — limited scale</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">Best for</td>
                <td className="p-4">Multi-show programs, sponsor booths, scaling brands</td>
                <td className="p-4">Flagship one-off or hero activation</td>
                <td className="p-4">Startups, regional shows</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-medium">Turnaround</td>
                <td className="p-4">4–10 weeks</td>
                <td className="p-4">12–20 weeks</td>
                <td className="p-4">1–2 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/50 mt-4">
          Traction X designs and delivers both custom modular rentals and fully custom builds.
          Pricing bands reflect turnkey Las Vegas delivery — design, fabrication, freight, union
          I&amp;D, and on-site project management included. Drayage is billed by the venue/GSC and shown separately.
        </p>
      </Section>

      {/* Image break */}

      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img
          src={lvHall.url}
          alt="Crowded Las Vegas Convention Center exhibit hall during a major trade show"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-0 flex items-end p-6 md:p-16">
          <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight max-w-3xl leading-tight">
            Six million attendees walk these aisles every year.
            <span className="text-[oklch(0.78_0.13_300)]"> Be impossible to scroll past.</span>
          </p>
        </div>
      </div>

      {/* Recent work gallery */}
      <Section
        eyebrow="Recent builds"
        title="Real booths. Real show floors."
      >
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-10 font-light leading-relaxed">
          A selection of exhibits, activations and hospitality environments our
          team has designed, fabricated and installed for clients across North
          America.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { img: booth1.url, label: "Canada Defence Double-Deck" },
            { img: photo1.url, label: "Air Canada Cargo — Island Exhibit" },
            { img: photo2.url, label: "TELUS Game Changers — Activation" },
            { img: booth2.url, label: "Accenture Mission Ready" },
            { img: photo3.url, label: "SMA — Energy Exhibit" },
            { img: photo4.url, label: "Air Canada — Lounge" },
            { img: photo5.url, label: "Sell to Canada — Pavilion" },
            { img: photo6.url, label: "TELUS x Team Canada — Locker Detail" },
            { img: photo7.url, label: "Team Canada Fan Fest" },
          ].map((p) => (
            <figure
              key={p.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <img
                src={p.img}
                alt={p.label}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-xs md:text-sm font-medium text-white/90">
                {p.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>



      {/* Packages */}
      <Section
        eyebrow="Rental packages"
        title="Turnkey Las Vegas booth packages, priced up front."
        className="bg-gradient-to-b from-black to-[oklch(0.05_0_0)]"
      >
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-12 font-light leading-relaxed">
          These are our most-booked custom modular rental packages. Need a fully custom build,
          a larger island, or a double-deck? We quote those to spec as well. Every package
          includes design, 3D renderings, structural engineering, SEG fabric graphics, install
          & dismantle labor, and an on-site project manager. Drayage is billed by the venue/GSC
          and shown separately.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGES.map((p) => (
            <div
              key={p.size}
              className={`relative rounded-2xl border p-6 md:p-7 flex flex-col ${
                p.featured
                  ? "border-[oklch(0.78_0.13_300)] bg-gradient-to-b from-[oklch(0.78_0.13_300)]/10 to-transparent shadow-2xl"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Booked
                </span>
              )}
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
                {p.sqft}
              </div>
              <div className="text-2xl font-bold mb-1">{p.size}</div>
              <div className="text-lg text-[oklch(0.78_0.13_300)] font-semibold mb-5">
                {p.price}
              </div>
              <ul className="space-y-2.5 text-sm text-white/75 font-light mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-[oklch(0.78_0.13_300)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="w-full text-center bg-white text-black px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all"
              >
                Quote This Package
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section
        eyebrow="How we work"
        title="From discovery call to dismantle in six clear steps."
      >
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img
                src={booth2.url}
                alt="Modular booth aluminum extrusion frame being assembled with SEG fabric graphics"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
                width={1400}
                height={1000}
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-5">
            {PROCESS.map((p) => (
              <div
                key={p.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 flex gap-5"
              >
                <div className="text-3xl md:text-4xl font-bold text-[oklch(0.78_0.13_300)] leading-none">
                  {p.n}
                </div>
                <div>
                  <div className="text-lg md:text-xl font-semibold mb-2">
                    {p.title}
                  </div>
                  <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Venues */}
      <Section
        eyebrow="Venues we service"
        title="Every major Las Vegas show floor, every union hall."
        className="bg-[oklch(0.04_0_0)]"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VENUES.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold">{v.name}</h3>
                <span className="text-xs text-[oklch(0.78_0.13_300)] font-medium">
                  {v.halls}
                </span>
              </div>
              <p className="text-sm text-white/65 font-light leading-relaxed">
                {v.blurb}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5">
            Shows we have built for
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SHOWS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Why modular long-form */}
      <Section
        eyebrow="Why modular wins"
        title="Custom-grade design. Rental economics. Reusable structure."
      >
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-white/75 text-base md:text-lg font-light leading-relaxed">
          <p>
            A <strong className="text-white">fully custom build</strong> is the right call when you need a one-of-a-kind
            flagship activation — unique architecture, special materials, or a hero moment that
            will never be repeated. Traction X designs and fabricates these builds from scratch
            for clients who demand something entirely their own.
          </p>
          <p>
            A <strong className="text-white">custom modular rental</strong> is the smart choice when you want the same
            visual quality and a faster, more flexible program. Our systems are engineered with
            aircraft-grade aluminum extrusion, magnet-locked SEG fabric panels, integrated LED
            arrays, real wood-laminate counters, and structural tolerances that pass every
            venue's fire marshal review — including the Las Vegas Convention Center's strict
            combustible-load rules.
          </p>
          <p>
            Because the kit is reconfigurable, your investment compounds. The 20x20 island that
            anchored your CES presence becomes a 10x20 inline at your regional roadshow, then
            scales back up to a 30x30 for HIMSS in the spring. New graphics, same skeleton.
            Your CFO will understand the math instantly.
          </p>
          <p>
            And because Traction X handles storage, graphic refresh, freight, I&D, and on-site PM
            under one roof, you are not chasing five vendors across three time zones the week of
            your show. You are at your booth, talking to qualified leads — whether you chose a
            custom build or a custom rental.
          </p>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow="What clients say"
        className="bg-gradient-to-b from-black to-[oklch(0.04_0_0)]"
      >
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              quote:
                "We dropped our previous Las Vegas exhibit house after a near-miss at CES. Traction X re-engineered our 30x30 in 18 days, came in $42K under our prior budget, and the booth looked better. Easy decision going forward.",
              who: "VP Marketing — SaaS / CES exhibitor",
            },
            {
              quote:
                "On-site management is night and day. Their PM lived at our booth for four days. A monitor blew out on day two and was replaced before our 9 AM stand-up. That is the whole job.",
              who: "Field Marketing Director — HIMSS",
            },
            {
              quote:
                "We have used the same modular kit across CES, NAB, and IBC. Graphics get refreshed, layout gets re-cut. The cost-per-show is a fraction of what we used to pay and the floor presence is stronger.",
              who: "Global Events Lead — Broadcast tech",
            },
          ].map((t) => (
            <figure
              key={t.who}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <svg
                className="w-8 h-8 text-[oklch(0.78_0.13_300)] mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.5 7C6 7 4 10 4 13v4h6v-7H7c0-1.5 1-3 2.5-3V7zm10 0c-3.5 0-5.5 3-5.5 6v4h6v-7h-3c0-1.5 1-3 2.5-3V7z" />
              </svg>
              <blockquote className="text-white/85 font-light leading-relaxed mb-4 text-sm md:text-base">
                "{t.quote}"
              </blockquote>
              <figcaption className="text-xs uppercase tracking-widest text-white/50">
                {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section
        eyebrow="Las Vegas booth rental FAQ"
        title="Answers to the questions we get every week."
      >
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:border-white/30 transition-colors"
            >
              <summary className="faq-question cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-white text-base md:text-lg">
                <span>{f.q}</span>
                <span className="shrink-0 text-2xl leading-none text-[oklch(0.78_0.13_300)] group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-white/70 font-light leading-relaxed text-sm md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Local landmarks / proximity */}
      <Section
        eyebrow="Proximity & logistics"
        title="We know every drive time, dock door, and skybridge in Las Vegas."
        className="bg-[oklch(0.04_0_0)]"
      >
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-8">
              Our local operations team has loaded crates at every freight dock
              from the Las Vegas Convention Center to Mandalay Bay South. We
              schedule arrivals around target move-in windows, route around
              I-15 and Paradise Road congestion, and stage from a North Las
              Vegas warehouse so your kit hits the show floor on time —
              every time.
            </p>
            <div className="space-y-2.5">
              {LANDMARKS.map((l) => (
                <div
                  key={l.from + l.to}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5"
                >
                  <div className="text-sm md:text-base">
                    <span className="text-white/90 font-medium">{l.from}</span>
                    <span className="text-white/40 mx-2">→</span>
                    <span className="text-white/90 font-medium">{l.to}</span>
                  </div>
                  <span className="text-xs md:text-sm text-[oklch(0.78_0.13_300)] font-semibold whitespace-nowrap">
                    {l.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-white/15 bg-white/[0.03] aspect-square">
              <iframe
                title="Traction X Las Vegas — service area map"
                src="https://www.google.com/maps?q=Las+Vegas+Convention+Center&z=12&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-white/50 mt-3 text-center">
              Servicing all Las Vegas Valley venues within a 25-mile radius.
            </p>
          </div>
        </div>
      </Section>

      {/* Neighborhoods / Areas served */}
      <Section
        eyebrow="Las Vegas areas we serve"
        title="From the Strip to Henderson — one local team, every neighborhood."
      >
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-10 font-light leading-relaxed">
          Whether your event is in a Paradise convention hall, a Summerlin
          resort ballroom, a Henderson corporate campus, or staged from our
          North Las Vegas warehouse, the same Traction X project manager runs
          your build. Local fluency, local relationships, local response time.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEIGHBORHOODS.map((n) => (
            <div
              key={n.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[oklch(0.78_0.13_300)]/60 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-4 h-4 text-[oklch(0.78_0.13_300)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <h3 className="font-semibold text-white text-sm">{n.name}</h3>
              </div>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                {n.note}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Local insight / unique content */}
      <Section
        eyebrow="Local exhibitor playbook"
        title="What every brand should know before exhibiting in Las Vegas."
        className="bg-gradient-to-b from-[oklch(0.04_0_0)] to-black"
      >
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-white/75 font-light leading-relaxed">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Freight & advance warehouse
            </h3>
            <p>
              Most Las Vegas shows accept advance freight 30 days before
              move-in. We palletize, label per the show's exhibitor kit,
              and ship to the GES, Freeman, or Shepard advance warehouse so
              your booth is already on the dock when the floor opens. Direct
              shipping to the LVCC, Mandalay Bay, or Venetian Expo target
              dates is reserved for time-critical exhibits only.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Union labor & I&D
            </h3>
            <p>
              Las Vegas is a Teamsters Local 631 and IATSE Local 720
              jurisdiction. Carpentry, AV rigging, and electrical each have
              their own labor calls. Traction X holds the relationships and
              files the labor orders so you never see a steward dispute on
              your show floor.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Fire marshal & permits
            </h3>
            <p>
              Clark County Fire Department reviews multi-level booths,
              hanging signs over 200 lbs, and any structure over 8 ft. We
              stamp drawings, file permits, and carry the COI required by
              every Las Vegas venue — built into your quote, not a surprise
              line item.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Weather, dust & desert logistics
            </h3>
            <p>
              Summer dock temperatures push 115°F. We use UV-stable SEG
              fabric, sealed crates, and climate-controlled storage so
              graphics arrive show-ready instead of warped. Winter trade
              shows benefit from our covered staging in North Las Vegas.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Hotel & travel for your team
            </h3>
            <p>
              We coordinate booth-staff hotel blocks at Resorts World, Westgate,
              and Renaissance for LVCC shows; Delano and Four Seasons for
              Mandalay Bay; and Venetian/Palazzo towers for Sands shows.
              Walking-distance options keep your team energized through long
              show days.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 uppercase tracking-wide">
              Lead capture & ROI
            </h3>
            <p>
              We integrate iCapture, Cvent LeadCapture, or your own CRM
              (Salesforce, HubSpot) directly into the booth. Real-time
              dashboards on the back wall keep your team focused on the
              metric that actually matters: qualified pipeline.
            </p>
          </div>
        </div>
      </Section>

      {/* NAP / Contact */}
      <Section
        eyebrow="Visit · Call · Email"
        title="Talk to a real Las Vegas booth team — today."
      >
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-3">
              Las Vegas Office
            </div>
            <address className="not-italic text-white/85 leading-relaxed text-base">
              <strong className="text-white">Traction X Exhibits</strong>
              <br />
              3960 Howard Hughes Pkwy, Suite 500
              <br />
              Las Vegas, NV 89169
              <br />
              United States
            </address>
            <p className="text-xs text-white/50 mt-4">
              Mon–Fri · 8:00 AM – 6:00 PM PT
            </p>
          </div>
          <a
            href="tel:+17028204499"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:border-[oklch(0.78_0.13_300)]/60 transition-colors group"
          >
            <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-3">
              Direct line
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:underline">
              (782) 409-2527
            </div>
            <p className="text-sm text-white/60 font-light">
              Same-day callback during show season. Ask for the Las Vegas desk.
            </p>
          </a>
          <a
            href="mailto:info@tractionx.ca"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:border-[oklch(0.78_0.13_300)]/60 transition-colors group"
          >
            <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-3">
              Email the Vegas team
            </div>
            <div className="text-xl md:text-2xl font-bold text-white mb-2 break-all group-hover:underline">
              info@tractionx.ca
            </div>
            <p className="text-sm text-white/60 font-light">
              Send your floor plan PDF and exhibitor kit — preliminary concept
              direction and investment within two business days.
            </p>
          </a>
        </div>
      </Section>

      {/* Internal links / related city pages */}
      <Section eyebrow="Related rentals & city pages">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Custom trade show floor plans & sponsor fulfillment", d: "Interactive event floor plans, wayfinding and sponsor reporting we design and manage.", h: "/custom-trade-show-floor-plans" },
            { t: "Web Summit Vancouver booth rentals (preferred vendor)", d: "Turnkey and custom packages tailored to Web Summit exhibitors.", h: "/web-summit-vancouver-booth-rentals" },
            { t: "Modular booth gallery — 700+ designs", d: "Browse recent island, inline and double-deck builds from our shop.", h: "/gallery" },
            { t: "CES booth rentals in Las Vegas", d: "Dedicated LVCC packages engineered for CES exhibitor deadlines.", h: "#quote" },
            { t: "SEMA & AAPEX booth rentals in Las Vegas", d: "Aftermarket-ready islands built for LVCC West and Central Halls.", h: "#quote" },
            { t: "HIMSS & Money 20/20 booth rentals (Mandalay Bay)", d: "Healthcare and fintech exhibits engineered for Mandalay Bay B/C halls.", h: "#quote" },

          ].map((l) => (
            <a
              key={l.t}
              href={l.h}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[oklch(0.78_0.13_300)]/60 transition-colors flex flex-col"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-[oklch(0.78_0.13_300)] transition-colors">
                {l.t}
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
                {l.d}
              </p>
              <span className="text-xs text-white/40 mt-4 group-hover:text-white transition-colors">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Quote form */}

      <section id="quote" className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.78_0.13_300)]/15 via-black to-black" />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[oklch(0.78_0.13_300)] mb-4">
              Get preliminary direction within two business days
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] mb-5">
              Tell us about your Las Vegas show.
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light">
              Itemized quote and a 3D concept rendering in your inbox within
              one business day. No call required.
            </p>
          </div>

          <form
            className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-6 md:p-10 grid md:grid-cols-2 gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { label: "Full Name", type: "text", placeholder: "Jane Smith" },
              { label: "Company", type: "text", placeholder: "Acme Inc." },
              { label: "Work Email", type: "email", placeholder: "jane@acme.com" },
              { label: "Phone", type: "tel", placeholder: "(702) 555-0123" },
              { label: "Show Name", type: "text", placeholder: "CES 2027" },
              { label: "Event Date", type: "text", placeholder: "MM / DD / YYYY" },
            ].map((f) => (
              <label key={f.label} className="block">
                <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                  {f.label}
                </span>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/15 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.13_300)] focus:border-transparent transition-all font-light text-sm"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Booth Size
              </span>
              <select className="w-full bg-white/5 border border-white/15 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.13_300)] transition-all font-light text-sm appearance-none">
                <option className="text-black">10×10 Inline</option>
                <option className="text-black">10×20 Inline</option>
                <option className="text-black">20×20 Island</option>
                <option className="text-black">20×30 / 30×30 Island</option>
                <option className="text-black">Custom / Larger</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Project Notes
              </span>
              <textarea
                rows={4}
                placeholder="Goals, must-haves, AV needs, sponsor deliverables, deadlines…"
                className="w-full bg-white/5 border border-white/15 rounded-xl py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.13_300)] transition-all font-light text-sm resize-none"
              />
            </label>
            <FileAttach className="md:col-span-2" />
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-white/50">
                We respond within one business day. Your details stay with us
                — never shared.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-all shadow-2xl shadow-white/10"
              >
                Send Quote Request →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 py-20 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-5 max-w-3xl mx-auto leading-[1.05]">
          Your next Las Vegas show floor is already being booked.
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8 font-light">
          Lock in design slots and rental inventory before the season closes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton>Start My Quote</CTAButton>
          <CTAButton variant="ghost" href="mailto:hello@tractionx.ca">
            Email Our Team
          </CTAButton>
        </div>
      </section>

      {/* Footer */}
      <ProofBlock proof={getCityProof("las-vegas")} subject="exhibiting in Las Vegas" />
      <DesignCtaBand source="las-vegas-modular-trade-show-booth-rentals" />
    </PageLayout>
  );
}
