import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FileAttach } from "@/components/FileAttach";
import { useMarkCityVisit } from "@/lib/city-context";
import heroBgAsset from "@/assets/booth-hero-blur.png.asset.json";
const heroBg = heroBgAsset.url;

import lvHall from "@/assets/lv-hall.jpg";
import foundationBooth from "@/assets/foundation-booth.png.asset.json";
import huaweiBooth from "@/assets/huawei-booth.png.asset.json";
import nvidiaBooth from "@/assets/nvidia-booth.png.asset.json";
import visaBooth from "@/assets/visa-booth.png.asset.json";
import { DesignCtaBand } from "@/components/GlobalCta";
const booth2 = huaweiBooth.url;

const PAGE_TITLE =
  "Web Summit Vancouver Booth Rentals & Custom Activations | Traction X";
const PAGE_DESC =
  "Preferred booth builder for Web Summit Vancouver exhibitors. Custom rental program, premium fabrication, and turnkey brand activations at the Vancouver Convention Centre. Get preliminary concept direction and investment within two business days.";
const CANONICAL = "/web-summit-vancouver-booth-rentals";

const FAQS = [
  {
    q: "Is Traction X a preferred vendor for Web Summit Vancouver?",
    a: "Yes. Traction X is a preferred booth and activation partner for Web Summit Vancouver exhibitors. We hold a dedicated rental program tailored to the event's footprint at the Vancouver Convention Centre, pre-approved layouts that satisfy Web Summit's rigging and graphics guidelines, and a fulfilment workflow built around the show's move-in windows.",
  },
  {
    q: "What sizes of booths can you build for Web Summit Vancouver?",
    a: "We supply the full range of Web Summit booth packages — Alpha, Beta, Growth, Scale, and the larger Partner / Sponsor activations. That spans 10x10ft and 10x20ft startup pods up to 40x40ft+ partner islands, double-deck builds, hospitality lounges, and full demo theatres.",
  },
  {
    q: "What's included in your Web Summit rental program?",
    a: "Every Traction X turnkey rental includes concept design, photoreal 3D renderings, structural engineering, SEG fabric graphics, AV (monitors, soundbars, mounts), branded furniture and counters, programmable LED, lead-capture hardware, freight to Vancouver, install & dismantle, and an on-site project manager for all show days.",
  },
  {
    q: "Can you handle custom fabrication, not just modular rentals?",
    a: "Yes. We run a full in-house fabrication shop — CNC milling, metalwork, paint booth, carpentry, large-format print, and LED/AV integration. For Web Summit Vancouver we routinely mix custom-fabricated hero elements (sculptural lockups, interactive walls, branded bars, demo plinths) with our modular rental system so brands get a one-of-a-kind activation without paying full custom build cost.",
  },
  {
    q: "How quickly can you turn around a booth for Web Summit?",
    a: "A complete brief receives preliminary concept direction and investment within two business days. Full photoreal concepts, floor plans and a costed BOM typically develop over one to two weeks, followed by a standard 6–10 week production timeline from approved design. Rush projects under 4 weeks are possible when inventory and fabrication slots allow, including rescue builds when an original supplier has fallen through.",
  },
  {
    q: "Do you handle shipping, install, and on-site support in Vancouver?",
    a: "Yes — fully turnkey. We coordinate freight into the Vancouver Convention Centre (East or West), file the Material Handling forms with the official show contractor, manage union labour where applicable, run install and dismantle, and keep a dedicated project manager on the floor every show day.",
  },
  {
    q: "Can the same booth be reused at other events after Web Summit?",
    a: "That's the point of the program. Your Web Summit Vancouver build is engineered as a reusable modular kit — reconfigurable for Collision, Web Summit Lisbon, SaaStr, Money 20/20, Dreamforce, or any future show. We refresh graphics, restock consumables, and ship between events.",
  },
  {
    q: "How do exhibitors get started?",
    a: "Email info@tractionx.ca or use the quote form on this page with your stand number, size, and date of brief. We acknowledge a complete brief within one business day and send preliminary concept direction and investment within two business days — no sales call required to see pricing. Full photoreal design and a costed BOM follow in roughly one to two weeks as the scope develops. Early bird: book before September 1 and we'll apply a 7.5% discount on the project before peak season hits.",
  },

];

export const Route = createFileRoute("/web-summit-vancouver-booth-rentals")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "Web Summit Vancouver booth rental, Web Summit Vancouver exhibitor, Vancouver Convention Centre booth builder, custom trade show booth Vancouver, brand activation Vancouver, Web Summit booth design, preferred vendor Web Summit",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            // Service-area business: the Vancouver Convention Centre address
            // belongs to the venue Event node below, never to Traction X.
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
              name: "Web Summit Vancouver Booth Rentals & Custom Activations",
              serviceType: "Trade show booth rental, custom fabrication, brand activation",
              areaServed: [
                { "@type": "City", name: "Vancouver" },
                { "@type": "City", name: "Burnaby" },
                { "@type": "City", name: "Richmond" },
                { "@type": "City", name: "Surrey" },
              ],
              provider: { "@id": "https://tractionxtemp.lovable.app/#organization" },
              description: PAGE_DESC,
            },
            {
              "@type": "Event",
              name: "Web Summit Vancouver",
              location: {
                "@type": "Place",
                name: "Vancouver Convention Centre",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "1055 Canada Place",
                  addressLocality: "Vancouver",
                  addressRegion: "BC",
                  postalCode: "V6C 0C3",
                  addressCountry: "CA",
                },
              },
              url: "https://vancouver.websummit.com/",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Web Summit Vancouver Booth Rentals",
                  item: CANONICAL,
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: WebSummitVancouverPage,
});

const PACKAGES = [
  {
    size: "Starter Pod Example",
    sqft: "3m × 3m — 9m²",
    price: "from CA$20,500",
    image: nvidiaBooth.url,
    features: [
      "Branded back wall (SEG fabric or print)",
      "Counter with lockable storage",
      "Monitor + mount for demos",
      "Lead capture tablet & charging",
      "Accent lighting + seating",
      "Turnkey install / dismantle",
    ],
  },
  {
    size: "Mid-Size Example",
    sqft: "3m × 6m — 18m²",
    price: "from CA$33,150",
    featured: true,
    image: huaweiBooth.url,
    features: [
      "Hero header / lightbox graphics",
      "Demo plinth and/or counter",
      "Large monitor + soundbar",
      "Soft seating or meeting vignette",
      "Branded flooring + programmable lighting",
      "Full turnkey, including AV",
    ],
  },
  {
    size: "Island Example",
    sqft: "6m × 6m — 36m²",
    price: "from CA$71,500",
    image: visaBooth.url,
    features: [
      "Hanging sign or overhead light element",
      "Multiple demo pods + meeting nook",
      "Backlit hero wall (SEG + LED)",
      "Premium counters & optional bar",
      "Custom fabricated brand moments",
      "Dedicated on-site project manager",
    ],
  },
  {
    size: "Partner Activation Example",
    sqft: "9m × 9m+ — 80m²+",
    price: "from CA$130,000",
    image: foundationBooth.url,
    features: [
      "Double-deck or lounge options",
      "Custom fabricated hero structure",
      "VR / AR or demo theatre",
      "Hospitality bar / espresso program",
      "Interactive LED or touch walls",
      "White-glove production leadership",
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Book a Call",
    body: "A short discovery call to map your Web Summit goals, stand number, audience, sponsorship deliverables, and demo flow. Quick, no sales pitch — we'll capture everything we need to start designing.",
  },
  {
    n: "02",
    title: "3D Concept Design",
    body: "Within two business days of a complete brief, you receive preliminary concept direction and investment. Full photoreal 3D renderings, a floor plan and a styling direction typically follow in roughly one to two weeks — engineered to Web Summit and Vancouver Convention Centre rules from the start.",
  },
  {
    n: "03",
    title: "Approve + Place Order",
    body: "We review revisions as needed, confirm final scope, lock production timelines, and place your build into our fabrication queue.",
  },
  {
    n: "04",
    title: "Upload Graphics",
    body: "Send us your artwork — we handle print-ready file checks, dieline templates, and bleed/colour management. Final proofs sent for approval before anything goes to print.",
  },
  {
    n: "05",
    title: "Build, Ship & Show",
    body: "We fabricate in-house, ship into the Vancouver Convention Centre, file material handling paperwork, install during the official move-in window, and keep a dedicated PM on the floor every show day. After close, we dismantle and store your kit for the next activation.",
  },
];




const CAPABILITIES = [
  {
    t: "Modular Rental Program",
    b: "Reconfigurable aluminum extrusion systems with SEG tension-fabric graphics — 40–60% the cost of full custom, with the look of a fabricated build.",
  },
  {
    t: "Custom Fabrication",
    b: "In-house CNC, metal shop, paint booth, and carpentry for sculptural hero elements, branded bars, interactive walls, and one-of-one moments.",
  },
  {
    t: "Brand Activations",
    b: "Hospitality lounges, espresso bars, photo moments, AR/VR demo theatres, gamified lead capture, and content sets that translate to social.",
  },
  {
    t: "AV & Interactive",
    b: "Touchscreens, programmable LED, video walls, surround audio, lighting design, and CMS-driven content for live demos and product launches.",
  },
  {
    t: "Logistics & I&D",
    b: "Freight into the Vancouver Convention Centre, show-floor logistics, union-savvy install/dismantle crews, and on-site supervision through show close. Drayage is billed by the venue/GSC and shown separately.",
  },
  {
    t: "Reusable Kits",
    b: "Your Web Summit Vancouver booth ships next to Collision, Web Summit Lisbon, SaaStr, or wherever your team needs to show up next.",
  },
];

const STATS = [
  { k: "Preferred", v: "Web Summit Vancouver vendor" },
  { k: "24 hr", v: "Quote turnaround, itemized" },
  { k: "10+ yrs", v: "Building for tech & SaaS brands" },
  { k: "98%", v: "On-time install rate" },
];

const WHY = [
  ["Preferred-vendor pricing", "Pre-negotiated rates and pre-approved layouts that satisfy Web Summit's exhibitor guidelines from day one."],
  ["One team, end-to-end", "Design, fabrication, freight, install, on-site, and dismantle under one PM and one invoice."],
  ["Built in-house in Canada", "Our shop is a short drive from the Vancouver Convention Centre — fast iteration, fast fixes, no border surprises."],
  ["Custom-grade, rental-priced", "Mix fabricated hero moments with the modular kit and pay rental economics for a custom-feel activation."],
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
      <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

function WebSummitVancouverPage() {
  useMarkCityVisit("vancouver");
  return (
    <PageLayout>

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Custom brand activation booth at the Vancouver Convention Centre" className="w-full h-full object-cover blur-[3px]" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.78_0.13_300)] animate-pulse" />
              Preferred Vendor · Web Summit Vancouver
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.02] mb-6">
              Web Summit
              <br />
              Vancouver Booth
              <br />
              <span className="text-[oklch(0.78_0.13_300)]">Rentals & Activations</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed font-light">
              Traction X is a preferred booth and activation partner for Web
              Summit Vancouver exhibitors. Custom rental program, in-house
              fabrication, turnkey delivery to the Vancouver Convention Centre.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <CTAButton>Get My Two-Day Estimate</CTAButton>
              <CTAButton variant="ghost" href="#packages">See Packages & Pricing</CTAButton>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {STATS.map((s) => (
                <div key={s.k}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{s.k}</div>
                  <div className="text-xs text-white/60 mt-1 leading-snug">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 hidden md:block">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={nvidiaBooth.url} alt="Starter pod booth example — 10x10ft modular rental with branded back wall and demo counter" className="w-full h-full object-cover" width={1600} height={1000} />
            </div>
          </div>
        </div>
      </section>

      {/* Preferred Vendor Intro */}
      <Section eyebrow="Preferred Vendor · Web Summit Vancouver">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-6">
              The exhibitor partner Web Summit Vancouver brands trust to show up right.
            </h2>
            <div className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed font-light">
              <p>
                Web Summit Vancouver brings together <strong className="text-white">15,000+ founders, investors, and operators</strong> at the
                Vancouver Convention Centre — the largest tech gathering in North
                America. Exhibitor floors at this scale don't reward "good
                enough." They reward stands that stop the scroll on the show
                floor and translate to demos, meetings, and pipeline.
              </p>
              <p>
                Traction X is a <strong className="text-white">preferred booth and activation
                vendor</strong> for Web Summit Vancouver exhibitors. We operate a
                dedicated rental program tailored to the event — pre-approved
                layouts that satisfy Web Summit's exhibitor guidelines, kit
                pre-staged for the Vancouver Convention Centre's move-in
                windows, and a fulfilment workflow built around the show's
                tight production calendar.
              </p>
              <p>
                Beyond rentals, our in-house fabrication shop builds the
                <strong className="text-white"> custom hero moments</strong> that turn a
                booth into an activation — sculptural lockups, interactive
                walls, branded espresso bars, demo theatres, and content sets.
                Mix and match: pay rental economics, get a custom-feel
                activation.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 space-y-4">
            {WHY.map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="font-semibold text-white mb-1.5">{t}</div>
                <div className="text-sm text-white/65 font-light leading-relaxed">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Image break */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img src={lvHall} alt="Web Summit Vancouver exhibitor floor at the Vancouver Convention Centre" className="w-full h-full object-cover" loading="lazy" width={1600} height={900} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-0 flex items-end p-6 md:p-16">
          <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight max-w-3xl leading-tight">
            15,000+ founders, investors and operators walk the floor.
            <span className="text-[oklch(0.78_0.13_300)]"> Be the booth they remember.</span>
          </p>
        </div>
      </div>

      {/* Custom Rental Program */}
      <Section
        eyebrow="Our Web Summit Vancouver program"
        title="A rental program tailored to the event — plus the custom shop behind it."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[oklch(0.78_0.13_300)]/40 transition-colors">
              <div className="text-lg font-semibold mb-2">{c.t}</div>
              <p className="text-sm text-white/65 font-light leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Packages */}
      <Section
        eyebrow="Example package ranges"
        title="Sample Web Summit Vancouver booth builds — fully à la carte."
        className="bg-gradient-to-b from-black to-[oklch(0.05_0_0)]"
      >
        <div id="packages" />
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-6 font-light leading-relaxed">
          The builds below are <strong className="text-white">illustrative examples</strong> to help
          visualize scope and investment at common booth sizes — not fixed SKUs.
          Everything is à la carte: pull elements in or out, mix custom and
          modular, scale up or down. Final packages are tailored to your brief
          and typically include design, 3D renderings, engineering, graphics,
          AV, freight, install & dismantle, and on-site PM.
        </p>
        <div className="mb-12 rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/10 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="inline-flex items-center self-start md:self-auto bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Early Bird
          </span>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
            <strong className="text-white">7.5% off</strong> when your project
            is booked before <strong className="text-white">September 1</strong> — beat peak
            season and lock in fabrication slots early.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PACKAGES.map((p) => (
            <div key={p.size} className={`relative rounded-2xl border overflow-hidden flex flex-col ${p.featured ? "border-[oklch(0.78_0.13_300)] bg-gradient-to-b from-[oklch(0.78_0.13_300)]/10 to-transparent shadow-2xl" : "border-white/10 bg-white/[0.03]"}`}>
              {p.featured && (
                <span className="absolute top-3 right-3 z-10 bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Popular Size
                </span>
              )}
              {p.image && (
                <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                  <img src={p.image} alt={`${p.size} — example Traction X booth build`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 md:p-7 flex flex-col flex-1">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">{p.sqft}</div>
              <div className="text-2xl font-bold mb-1">{p.size}</div>
              <div className="text-lg text-[oklch(0.78_0.13_300)] font-semibold mb-1">{p.price}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-5">Could include:</div>
              <ul className="space-y-2.5 text-sm text-white/75 font-light mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[oklch(0.78_0.13_300)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#quote" className="w-full text-center bg-white text-black px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all">
                Quote This Size
              </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/50 mt-6 italic">
          Pricing shown is illustrative starting investment for the example size — final quote depends on your custom scope.
        </p>
      </Section>


      {/* Process */}
      <Section eyebrow="How we work" title="Five simple steps from concept to show floor.">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img src={booth2} alt="Custom fabrication of a modular booth with SEG graphics" className="w-full aspect-[4/5] object-cover" loading="lazy" width={1400} height={1000} />
            </div>
          </div>
          <div className="md:col-span-7 space-y-5">
            {PROCESS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 flex gap-5">
                <div className="text-3xl md:text-4xl font-bold text-[oklch(0.78_0.13_300)] leading-none">{p.n}</div>
                <div>
                  <div className="text-lg md:text-xl font-semibold mb-2">{p.title}</div>
                  <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Venue + Logistics */}
      <Section eyebrow="Vancouver Convention Centre" title="On the ground at the host venue." className="bg-[oklch(0.04_0_0)]">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-3">Vancouver Convention Centre — East & West</h3>
            <p className="text-white/70 font-light leading-relaxed text-sm md:text-base mb-4">
              The Vancouver Convention Centre is the host venue for Web Summit
              Vancouver. We deliver into both the East and West buildings,
              coordinate freight through the loading docks, file material
              handling forms with the official show contractor, and manage
              install / dismantle inside the published move-in and move-out
              windows.
            </p>
            <ul className="text-sm text-white/65 space-y-2 font-light">
              <li>· 1055 Canada Place, Vancouver, BC</li>
              <li>· 466,500 sq ft combined exhibit space</li>
              <li>· LEED Platinum certified — sustainable build practices supported</li>
              <li>· 12 min from YVR via SkyTrain Canada Line</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-3">What we handle for you</h3>
            <ul className="text-sm text-white/75 space-y-2.5 font-light">
              <li>✓ Freight in/out of Vancouver Convention Centre</li>
              <li>✓ Material handling paperwork with official contractor</li>
              <li>✓ Rigging, electrical, and AV orders</li>
              <li>✓ Union-savvy install & dismantle crews</li>
              <li>✓ On-site project manager every show day</li>
              <li>✓ Storage between events at our BC facility</li>
              <li>✓ Graphics refresh & kit refurbishment for re-use</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Reach Out / Quote */}
      <section id="quote" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-[oklch(0.05_0_0)] to-black">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-4 text-center">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] mb-6 text-center">
            Let's build your <span className="text-[oklch(0.78_0.13_300)]">Web Summit Vancouver</span> activation.
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Drop your stand details below. We acknowledge a complete brief within
            one business day, then send preliminary concept direction and
            investment within two business days. Full photoreal design follows as
            the scope develops — no sales call required.
          </p>

          <div className="grid md:grid-cols-5 gap-8">
            <form className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Name</span>
                  <input type="text" required className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Company</span>
                  <input type="text" required className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Work Email</span>
                  <input type="email" required className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Phone</span>
                  <input type="tel" className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Booth Size</span>
                  <select className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none">
                    <option>Starter (3×3m)</option>
                    <option>Mid-size (3×6m)</option>
                    <option>Island (6×6m)</option>
                    <option>Partner activation (9×9m+)</option>
                    <option>Not sure yet</option>

                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Stand Number (if known)</span>
                  <input type="text" className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/60">Tell us about your activation</span>
                <textarea rows={4} className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" placeholder="Goals, must-haves, demo flow, sponsorship deliverables..." />
              </label>
              <FileAttach hint="Brand guidelines, stand drawings, references, RFP — PDF, DOC, PNG, JPG, ZIP (max 25MB each)" />
              <button type="submit" className="w-full bg-white text-black px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow-lg">
                Send my brief → two-day estimate
              </button>
              <p className="text-xs text-white/50 text-center">We acknowledge complete briefs within one business day. No spam, ever.</p>
            </form>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Email</div>
                <a href="mailto:info@tractionx.ca" className="text-lg text-white hover:text-[oklch(0.78_0.13_300)] font-medium block">info@tractionx.ca</a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Call</div>
                <a href="tel:+16042600420" className="text-lg text-white hover:text-[oklch(0.78_0.13_300)] font-medium block">+1 (782) 409-2527</a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Visit</div>
                <div className="text-sm text-white/75 font-light leading-relaxed">
                  Traction X<br />
                  Vancouver, BC, Canada<br />
                  Shop & studio · minutes from VCC
                </div>
              </div>
              <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/5 p-6">
                <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-2">Early Bird · 7.5% Off</div>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  Book your Web Summit Vancouver project before <strong className="text-white">September 1</strong> and we'll apply a 7.5% discount — beat peak season and lock in fabrication slots early.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Web Summit Vancouver exhibitor questions, answered." className="bg-[oklch(0.04_0_0)]">
        <div className="space-y-3 max-w-4xl">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:border-[oklch(0.78_0.13_300)]/40">
              <summary className="cursor-pointer list-none flex justify-between items-start gap-4">
                <span className="font-semibold text-base md:text-lg">{f.q}</span>
                <span className="text-[oklch(0.78_0.13_300)] text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-white/70 font-light leading-relaxed text-sm md:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 px-4 text-center border-t border-white/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-6">
            Ready for Web Summit Vancouver?
          </h2>
          <p className="text-white/70 mb-10 font-light text-base md:text-lg">
            Get preliminary concept direction and investment within two business
            days, tailored to your stand. Full photoreal design follows as the
            scope develops. No sales call required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton>Start My Brief</CTAButton>
            <CTAButton variant="ghost" href="mailto:info@tractionx.ca">Email the team</CTAButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <DesignCtaBand source="web-summit-vancouver-booth-rentals" />
    </PageLayout>
  );
}
