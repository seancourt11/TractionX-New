import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import heroBg from "@/assets/hero-bg.jpg";
import canadaDefence01 from "@/assets/portfolio/canada-defence-booth-01.jpg.asset.json";
import canadaDefence02 from "@/assets/portfolio/canada-defence-booth-02.jpg.asset.json";
import accentureMissionReady from "@/assets/portfolio/accenture-mission-ready.jpg.asset.json";
import canadaExport from "@/assets/portfolio/canada-export-booth.jpg.asset.json";
import teamCanadaFanfest from "@/assets/portfolio/team-canada-fanfest.jpg.asset.json";
import thalesBooth from "@/assets/portfolio/thales-booth.jpg.asset.json";

const GALLERY = [
  { src: canadaDefence01, alt: "Government of Canada defence booth at a trade show" },
  { src: accentureMissionReady, alt: "Accenture mission-ready command booth" },
  { src: canadaDefence02, alt: "Canadian defence and security exhibit rental" },
  { src: canadaExport, alt: "Canada export and defence pavilion" },
  { src: teamCanadaFanfest, alt: "Team Canada public engagement pavilion" },
  { src: thalesBooth, alt: "Thales custom defence exhibit booth" },
];

const PAGE_TITLE =
  "DEFSEC Atlantic Booth Rentals — Official Custom Exhibit Supplier | Traction X";
const PAGE_DESC =
  "Traction X is the official supplier of custom exhibit rentals for DEFSEC Atlantic 2026 (October 6–8, Halifax). Turnkey defence booths on a compressed 10-week critical path.";
const CANONICAL = "/defsec-atlantic-booth-rentals";

const SHOW_START = "2026-10-06";
const SHOW_END = "2026-10-08";

const IMPORTANT_DATES = [
  { date: "First week of August 2026", label: "Book your booth rental", desc: "Secure your fabrication slot and lock the compressed 10-week critical path for the October 6–8 show." },
  { date: "Early August 2026", label: "Design lock", desc: "Final 3D booth concept, secure-zone layout, and AV plan approved so fabrication starts on time." },
  { date: "Late August 2026", label: "Fabrication begins", desc: "In-house CNC, metalwork, and graphic production for custom rental builds and branded activations." },
  { date: "Early September 2026", label: "Graphics & AV ready", desc: "All content, demo hardware, screens, and lighting confirmed and tested before shipping." },
  { date: "Mid-September 2026", label: "Ship to Halifax Convention Centre", desc: "Freight to the Halifax Convention Centre with buffer time for customs, freight, and any last-minute changes." },
  { date: "October 5, 2026", label: "Install & rehearsal", desc: "On-site build, AV checkout, and final walkthrough the day before DEFSEC Atlantic opens." },
  { date: "October 6–8, 2026", label: "Show days", desc: "DEFSEC Atlantic 2026 at the Halifax Convention Centre." },
];

const OFFERINGS = [
  {
    title: "Custom exhibit rentals",
    body: "Turnkey rentals from 10×10 to large island builds — design, fabrication, AV, install, and strike included.",
  },
  {
    title: "Portable display sales",
    body: "Buy a modular system you can rebrand and reuse across CANSEC, AUSA, and other defence shows.",
  },
  {
    title: "Multi-show programs",
    body: "One build, multiple events. Refresh graphics, restock, and redeploy to stretch your budget across the season.",
  },
];

export const Route = createFileRoute("/defsec-atlantic-booth-rentals")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "DEFSEC Atlantic booth rental, DEFSEC 2026, Halifax Convention Centre booth builder, defence trade show booth Canada, ITAR compliant booth, Traction X DEFSEC",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: canadaDefence01.url },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: canadaDefence01.url },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": CANONICAL + "#business",
              name: "Traction X — DEFSEC Atlantic Official Custom Exhibit Supplier",
              url: CANONICAL,
              telephone: "+1-782-409-2527",
              email: "sean@tractionx.ca",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Halifax",
                addressRegion: "NS",
                addressCountry: "CA",
              },
              sameAs: ["https://tractionx.ca"],
            },
            {
              "@type": "Event",
              name: "DEFSEC Atlantic 2026",
              startDate: SHOW_START,
              endDate: SHOW_END,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Halifax Convention Centre",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "1650 Argyle Street",
                  addressLocality: "Halifax",
                  addressRegion: "NS",
                  postalCode: "B3J 0E6",
                  addressCountry: "CA",
                },
              },
              url: "https://defsecatlantic.ca/",
            },
            {
              "@type": "WebPage",
              name: "DEFSEC Atlantic Important Info",
              description:
                "Important timelines and offerings for DEFSEC Atlantic 2026 exhibitors: custom exhibit rentals, portable display sales, multi-show programs, and a compressed 10-week delivery schedule.",
            },
          ],
        }),
      },
    ],
  }),
  component: DefsecAtlanticPage,
});

const MILESTONES = [
  { when: "Step 1", date: "Reach out", title: "Book a meeting", body: "Email or call us to book a quick intro meeting — we scope your booth, secure-zone needs, and timeline." },
  { when: "Step 2", date: "We design", title: "3D design + estimate", body: "You get a tailored 3D concept and a clear estimate — no guesswork, no back-and-forth." },
  { when: "Step 3", date: "We deliver", title: "We handle the rest", body: "Fabrication, AV, freight, install, on-site PM, and strike — one team from concept to show floor." },
];

const CAPABILITIES = [
  "Booth design",
  "Fabrication",
  "AV integration",
  "Install",
  "On site project management",
];

function CTAButton({
  children,
  href = "#quote",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold tracking-wide bg-white text-black hover:bg-white/90 transition-all shadow-lg"
    >
      {children}
      <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function DefsecAtlanticPage() {
  return (
    <PageLayout>

      <section className="relative pt-20 pb-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Custom defence exhibit booth"
            className="w-full h-full object-cover blur-[3px]"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/80 mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.78_0.13_300)] animate-pulse" />
              Official Custom Exhibit Supplier · DEFSEC Atlantic
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-3">
              DEFSEC Atlantic Booth Rentals
              <span className="block text-[oklch(0.78_0.13_300)] mt-1">Halifax · Oct 6–8, 2026</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl mb-4 leading-relaxed font-light">
              Turnkey booths, secure demo builds, and a compressed 10-week critical path to land your team on the Halifax floor ready to sell.
            </p>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={canadaDefence01.url}
                alt="Government of Canada defence booth at a trade show"
                className="w-full h-full object-cover"
                width={1600}
                height={1200}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 px-4 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-3">
            {CAPABILITIES.map((c) => (
              <span key={c} className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] text-white/80">
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/60 max-w-4xl">
            Traction X is the official supplier of custom exhibit rentals for DEFSEC Atlantic. From 10×10 rentals to large island builds, we design, fabricate, ship, install, and strike — one team start to finish.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mt-3">
            {GALLERY.map((g) => (
              <div key={g.src.url} className="aspect-[4/3] overflow-hidden rounded-md border border-white/10">
                <img src={g.src.url} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-5 px-4 border-t border-white/10 bg-gradient-to-b from-black to-[oklch(0.05_0_0)]">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Our process</p>
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight leading-tight mb-3">
            Three steps from first call to show floor.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {MILESTONES.map((m) => (
              <div
                key={m.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[oklch(0.78_0.13_300)] text-black">
                    {m.when}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-white/50">{m.date}</span>
                </div>
                <div className="text-sm font-semibold mb-1">{m.title}</div>
                <p className="text-xs text-white/60 font-light leading-snug">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-5 px-4 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Contact</p>
          <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight leading-tight mb-3">
            Reach Sean directly for DEFSEC Atlantic.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Name</div>
              <div className="text-sm text-white font-medium">Sean Court</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Email</div>
              <a href="mailto:sean@tractionx.ca" className="text-sm text-white hover:text-[oklch(0.78_0.13_300)] font-medium">sean@tractionx.ca</a>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Phone</div>
              <a href="tel:+17824092527" className="text-sm text-white hover:text-[oklch(0.78_0.13_300)] font-medium">+1 (782) 409-2527</a>
            </div>
            <div className="rounded-lg border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/5 p-3">
              <div className="text-[10px] uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-1">Official Supplier</div>
              <p className="text-xs text-white/80 font-light leading-snug">Traction X — official supplier of custom exhibit rentals for DEFSEC Atlantic.</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Important timelines</div>
            <div className="space-y-2" id="important-info">
              {IMPORTANT_DATES.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="min-w-[7.5rem] text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.78_0.13_300)] pt-0.5">
                    {item.date}
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{item.label}</div>
                    <p className="text-[11px] text-white/65 font-light leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Offerings</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {OFFERINGS.map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                    <div className="text-xs font-semibold mb-1">{item.title}</div>
                    <p className="text-[11px] text-white/65 font-light leading-snug">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
