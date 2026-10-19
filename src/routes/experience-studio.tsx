import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, useCta } from "@/components/GlobalCta";
import { BoothFinder } from "@/components/BoothFinder";
import { SITE } from "@/lib/site";

const TITLE = "Experience Studio — Trade Shows, Retail, Events & Museums | Traction X";
const DESC = "One studio for brand-built environments: custom trade show exhibits, modular rental systems, retail & pop-ups, events and museum installs — designed, fabricated and installed in-house.";

export const Route = createFileRoute("/experience-studio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/experience-studio` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/experience-studio` }],
  }),
  component: ExperienceStudio,
});

const BRANDS = [
  {
    tag: "Custom",
    title: "Signature Exhibits",
    desc: "Ground-up custom booths engineered for hero brand moments — from 20×20 islands to 100×100 double-decks.",
    href: "/products/custom-trade-show-exhibits",
  },
  {
    tag: "Rental",
    title: "Modular Rental System",
    desc: "A proprietary rental kit that looks fully custom — reconfigured, rebranded and redeployed show after show.",
    href: "/products/trade-show-exhibit-rentals",
  },
  {
    tag: "Indoor / Outdoor",
    title: "Live Events & Activations",
    desc: "Festival footprints, conference stages, sponsor lounges and pop-up structures — permitted, powered, staffed.",
    href: "/services/booth-construction",
  },
  {
    tag: "Retail",
    title: "Retail & Pop-Ups",
    desc: "Store-in-store fixtures, flagship rollouts and short-run pop-ups engineered for repeat installation.",
    href: "/commercial-millwork-cabinetry",
  },
] as const;

const OFFERS = [
  { title: "Design", body: "Concept, industrial design, 3D visualization and CD drawings that hold up on the floor.", href: "/services/trade-show-display-design" },
  { title: "Fabrication & Production", body: "In-house millwork, metal, print, paint and integrated AV under one roof — one accountable team.", href: "/services/booth-construction" },
  { title: "Trade Show Exhibits", body: "Tailored exhibits that engage audiences and pay back — from strategy through post-show teardown.", href: "/trade-show-displays" },
  { title: "Retail & Pop-Ups", body: "Environments that translate brand into physical retail — durable, on-brand, budget-honest.", href: "/commercial-millwork-cabinetry" },
  { title: "Events", body: "Turnkey event environments: mainstage, breakouts, hospitality, sponsor activations.", href: "/services/project-management" },
  { title: "Museums", body: "Immersive institutional installs — interpretive fabrication, casework, AV and interactives.", href: "/services/booth-construction" },
] as const;

const PILLARS = [
  { k: "Custom", v: "Booth Design" },
  { k: "Expert", v: "Consultation" },
  { k: "Seamless", v: "Production" },
  { k: "Innovative", v: "Solutions" },
] as const;

const FAQS = [
  { q: "Do you handle everything in-house?", a: "Yes — design, engineering, fabrication, print, AV integration, logistics and on-site I&D are managed by one Traction X team, with union labour coordinated at every major North American venue." },
  { q: "Can one program cover trade shows, retail and events?", a: "That's the point of the studio model. A single account team plans your annual calendar across categories so assets, graphics and budgets are reused wherever possible." },
  { q: "How fast can you turn a program around?", a: "Rental refreshes ship in 4–6 weeks. Custom builds run 10–14 weeks from approved design. Rescue projects are quoted same-day." },
  { q: "Where do you deliver?", a: "Every major show floor in the US and Canada, plus in-region fabrication partners across Europe, Latin America, Asia and Oceania." },
];

function ExperienceStudio() {
  const { openQuote } = useCta();
  return (
    <PageLayout>
      <section className="relative border-b border-white/10 bg-gradient-to-b from-[oklch(0.78_0.13_300)]/[0.18] via-black to-black">
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-20 md:pb-16">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.78_0.13_300)] mb-5">
            Experience Studio · Booth Finder
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.04] max-w-4xl">
            Find your booth.
            <br />
            <span className="text-[oklch(0.78_0.13_300)]">Any show. Any city.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/75 text-base md:text-lg leading-relaxed">
            One partner across trade shows, retail, live events and museums. Filter our rental catalogue by country, city and dimension — every design ships pre-built, rebrands to your graphics and installs by our local crews.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => openQuote({ source: "experience-studio" })} className="inline-flex items-center gap-2 bg-[oklch(0.78_0.13_300)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90">
              Get a custom quote →
            </button>
            <Link to="/rent-a-booth" className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 rounded-xl font-semibold hover:bg-white/10">
              Browse all rentals
            </Link>
            <Link to="/gallery" search={{ size: undefined }} className="inline-flex items-center gap-2 text-white/80 px-4 py-3 rounded-xl font-semibold hover:text-white">
              See the work →
            </Link>
          </div>
          <div className="mt-10">
            <BoothFinder />
          </div>
        </div>
      </section>

      <Section eyebrow="Our Brands" title="Four programs, one studio" intro="Every engagement plugs into the right delivery model — custom, rental, event or retail — with the same team behind it.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDS.map((b) => (
            <Link key={b.title} to={b.href as string} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[oklch(0.78_0.13_300)] transition">
              <div className="text-[11px] uppercase tracking-[0.28em] text-[oklch(0.78_0.13_300)]">{b.tag}</div>
              <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">{b.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">{b.desc}</p>
              <span className="mt-5 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>


      <Section bg="muted" eyebrow="About the studio" title="A trade show company built for enduring partnerships">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5 text-white/75 leading-relaxed">
            <p>Traction X consults, designs and produces booths for trade shows, retail environments, live events and museum installations. Two decades of floor experience taught us the same thing every time: the strongest programs are built with a personal touch.</p>
            <p>We study your brand, values and goals, then design and build custom exhibits that strengthen your business partnerships at shows across North America and globally. Everything — design, production, install — runs in-house, and our mission doesn't end when the crate ships.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8">
            <div className="grid grid-cols-2 gap-6">
              {PILLARS.map((p) => (
                <div key={p.k}>
                  <div className="font-display text-3xl font-bold text-[oklch(0.78_0.13_300)]">{p.k}</div>
                  <div className="mt-1 text-white/80 uppercase tracking-widest text-xs">{p.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/60">
              Members of EDPA · IFES · in-region partners on six continents.
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="What we offer" title="Six capabilities, one accountable team">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((o) => (
            <Link key={o.title} to={o.href as string} className="group rounded-2xl border border-white/10 p-6 hover:bg-white/[0.03] hover:border-[oklch(0.78_0.13_300)] transition">
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">{o.title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{o.body}</p>
              <span className="mt-5 inline-block text-sm text-[oklch(0.78_0.13_300)] group-hover:underline">Read more →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section bg="muted" eyebrow="Bringing your vision to life" title="From first sketch to post-show debrief">
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 counter-reset">
          {[
            { t: "Engage", d: "Discovery call, brand deep-dive, KPIs, budget bands and show calendar." },
            { t: "Design", d: "Concept, 3D visualization, technical drawings and materials selection." },
            { t: "Fabricate", d: "In-house build, print, AV integration, mock-assembly and QC sign-off." },
            { t: "Manage", d: "Freight, drayage coordination, I&D, on-site supervision and post-show storage." },
          ].map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-white/10 p-6 bg-black/30">
              <div className="text-[oklch(0.78_0.13_300)] font-display text-4xl font-bold">0{i + 1}</div>
              <div className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{s.t}</div>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <DesignCtaBand source="page" />
      <CTABand heading="Need a partner to design and plan your next show?" />

      <FAQBlock items={FAQS} />
    </PageLayout>
  );
}
