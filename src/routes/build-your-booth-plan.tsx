import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BoothPlanner } from "@/components/BoothPlanner";
import { DesignCtaBand } from "@/components/GlobalCta";
import { absUrl, robotsMeta } from "@/lib/seo";

const TITLE = "Build Your Booth Plan — Trade Show Exhibit Planner | Traction X";
const DESC =
  "Answer a few questions about your event, booth size, goals and budget and get a recommended trade show exhibit plan in under three minutes — booth type, components, service level and investment range.";
const PATH = "/build-your-booth-plan";

const FAQ = [
  {
    q: "How do I know whether I need a portable, modular or custom trade show booth?",
    a: "It comes down to five things: your booth size, your budget, how much the booth has to do on the floor, how much visual impact you want, and how much of the event you want your exhibit partner to manage. A 10×10 that your own team ships and sets up is a portable kit. A 10×20 with a counter, screens and storage is modular. Anything 20×20 and larger, or anything with meeting rooms, LED, hospitality or double decks, is a custom or modular-plus-custom build with professional install.",
  },
  {
    q: "How long does the booth planner take?",
    a: "Two to three minutes. The planner only asks the questions that matter for the path you're on — portable exhibitors never see island-booth questions, and the component list arrives pre-selected based on your impact tier and show goals.",
  },
  {
    q: "Do I have to give my email to use it?",
    a: "No. You see your recommended solution, construction approach, booth profile scores and suggested elements without entering anything. Contact details only unlock the investment range and the downloadable plan PDF.",
  },
  {
    q: "How accurate is the estimated investment range?",
    a: "It runs on the same pricing model as our booth cost calculator — footprint, finish tier, scaled add-ons and city tier, with install and dismantle labour included. It's a budgeting range, not a quote. Final pricing is confirmed in writing by a designer once the show, venue and drawings are known.",
  },
  {
    q: "Can I plan a booth if I haven't booked my space yet?",
    a: "Yes. Choose \"Not sure yet\" for the space and we'll recommend a footprint based on what you told us the booth needs to do. Most exhibitors who plan before booking end up choosing a different size than they first had in mind.",
  },
];

export const Route = createFileRoute("/build-your-booth-plan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl(PATH) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "HowTo",
              name: "How to plan a trade show booth",
              description:
                "A five-step method for choosing the right trade show exhibit: size the space, set the priority, choose an impact level, list what the booth must do, then decide the service level and budget.",
              totalTime: "PT3M",
              step: [
                { "@type": "HowToStep", name: "Size the space", text: "Start from the booth space you've booked or expect to book — inline 10×10 through island and pavilion footprints." },
                { "@type": "HowToStep", name: "Set the single priority", text: "Decide whether the exhibit is optimising for visual impact, features per dollar, brand experience, reuse across shows, or simplicity of transport." },
                { "@type": "HowToStep", name: "Choose an impact level", text: "Clean and professional, elevated, high impact, or flagship fully custom — each maps to a different construction approach and budget band." },
                { "@type": "HowToStep", name: "List what has to happen in the booth", text: "Meetings, demos, product display, hospitality, presentations, private discussions and storage each change the layout before aesthetics do." },
                { "@type": "HowToStep", name: "Set the service level and budget", text: "Exhibit only, exhibit plus logistics, or full turnkey — then match the investment band to the recommended scope." },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Traction X Booth Plan Builder",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: absUrl(PATH),
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

const FACTORS = [
  {
    h: "Booth size",
    p: "A 10×10 and a 20×40 are different products, not the same product at different scale. Under 200 sq ft, portable and modular systems compete directly. Above it, structure, rigging and install labour dominate the budget.",
  },
  {
    h: "What the booth must do",
    p: "Meetings, demos, hospitality and product display each consume floor area before a single graphic is designed. Booths fail when the layout is drawn first and the activity is fitted in afterwards.",
  },
  {
    h: "Visual impact",
    p: "Height, backlighting and large-format graphics are what get you seen from three aisles away. They're also the cheapest way to buy presence compared with adding square footage.",
  },
  {
    h: "Reuse across shows",
    p: "One show a year favours renting. Five or more with a consistent footprint starts to favour owning. Between those, a reusable modular frame with custom features carries the brand without the storage bill.",
  },
  {
    h: "Service level",
    p: "Two exhibitors can want the identical physical booth and represent completely different projects — one wants a crate delivered, the other wants freight, I&D, AV, furniture and on-site project management handled.",
  },
];

function Page() {
  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-white/50">
            Exhibit needs analyzer
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
            Build your{" "}
            <span className="text-[oklch(0.78_0.13_300)]">booth plan</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Answer a few questions about your event, booth size, goals and budget, and we&apos;ll recommend the
            right exhibit approach — booth type, level of customization, the components that matter, service
            level and an investment range. Under three minutes, no email needed to see your recommendation.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.2em] text-white/45">
            <span>2–3 minutes</span>
            <span>No email to see the plan</span>
            <span>Downloadable PDF</span>
            <span>Free 3D concept</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <BoothPlanner source="booth-planner" />
        </div>
      </section>

      {/* Crawlable philosophy content */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="max-w-3xl font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
            There isn&apos;t one best type of trade show booth
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            The right exhibit depends on five variables, and every exhibit company that tells you otherwise is
            selling the one thing they build. Traction X builds portable kits, modular rentals, modular-plus-custom
            hybrids and fully custom architecture, so the planner is free to recommend the cheapest thing that
            works. Here is what actually moves the recommendation.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FACTORS.map((f) => (
              <div key={f.h} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">{f.h}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
            Booth planner questions
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-t border-white/10 pt-6">
                <h3 className="font-semibold text-white">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Keep planning</h2>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          {[
            ["Booth cost calculator", "/booth-cost-calculator"],
            ["Custom booth rental pricing", "/trade-show-booth-rental-pricing"],
            ["Rent a booth", "/rent-a-booth"],
            ["Portable displays", "/portable-booths"],
            ["Booth gallery", "/gallery"],
            ["Rent vs. buy", "/compare/rent-vs-buy-trade-show-booth"],
          ].map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className="rounded-lg border border-white/15 px-4 py-2.5 text-white/75 transition hover:border-white/35 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <DesignCtaBand source="booth-planner-page" />
      <SiteFooter />
    </div>
  );
}
