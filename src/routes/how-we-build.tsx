import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section, CTABand, FAQBlock } from "@/components/PageLayout";
import { DesignCtaBand, QuoteButton, CtaNote } from "@/components/GlobalCta";
import { CaseProof } from "@/components/CaseProof";
import { SITE } from "@/lib/site";
import { robotsMeta } from "@/lib/seo";

const TITLE = "How We Build Trade Show Exhibits — Fabrication & QA | Traction X";
const DESC =
  "Inside a Traction X build: engineering drawings, CNC millwork, metal and structure, graphics, a full pre-ship set-up and QA sign-off before your exhibit ever reaches the show floor.";

const ANSWER =
  "Every Traction X exhibit is engineered from approved 3D design into production drawings, fabricated as millwork, metal structure and printed graphics, then fully assembled and inspected in-shop before it ships. Nothing leaves without a pre-ship set-up, a photographed QA record, labelled crates and a set-up manual for the install crew.";

const STAGES: { n: string; title: string; body: string; bullets: string[] }[] = [
  {
    n: "01",
    title: "Engineering the approved design",
    body: "Once you sign off on the 3D design, the concept becomes a buildable package. Every panel, connection, graphic and light is drawn, dimensioned and specified so the shop, the print room and the install crew all work from the same set of documents.",
    bullets: [
      "Production drawings and elevations for every element",
      "Rigging, power and data plots checked against the venue's rules",
      "Costed bill of materials — you see what each element contributes",
      "Weight and crate volume calculated early, because they drive drayage",
    ],
  },
  {
    n: "02",
    title: "Millwork and structure",
    body: "Counters, plinths, walls, reception desks and storage are CNC-cut and assembled as millwork. Larger structures, overhead identifiers and second-storey elements are engineered in metal so they survive repeat shows and repeat installs.",
    bullets: [
      "CNC millwork for counters, plinths, storage and reception",
      "Metal structure for spans, towers and overhead identifiers",
      "Reusable connection hardware so the booth reconfigures later",
      "Finishes selected for repeat handling, not just the first show",
    ],
  },
  {
    n: "03",
    title: "Graphics and finishes",
    body: "Graphics are produced against the substrate they'll live on — tension fabric, direct print, backlit or applied vinyl each behave differently under show lighting. Colour is matched across substrates so one brand blue doesn't become three.",
    bullets: [
      "Substrate chosen per element, not one material for the whole booth",
      "Colour matched across fabric, rigid print and backlit media",
      "Files checked for bleed, safe area and resolution at viewing distance",
      "Reprintable graphic kits so the same structure re-skins for the next show",
    ],
  },
  {
    n: "04",
    title: "Pre-ship set-up and QA",
    body: "This is the stage that separates a real builder from a broker. The exhibit is fully assembled in the shop exactly as it will stand on the floor. Fit, alignment, lighting, AV mounts and graphics are all checked, photographed and signed off before anything is crated.",
    bullets: [
      "Full assembly in-shop, not a parts check",
      "Lighting and AV powered up and aimed",
      "Photographed QA record shared with you before shipping",
      "Punch list closed out in-shop, where fixing it is cheap",
    ],
  },
  {
    n: "05",
    title: "Crating, labelling and the install manual",
    body: "Exhibits are crated for the way they actually travel and the way a crew actually unpacks them. Every crate is labelled and inventoried, and the install manual is written so a crew who has never seen your booth can stand it correctly.",
    bullets: [
      "Crates built and packed in install order",
      "Numbered inventory and condition record per crate",
      "Step-by-step set-up manual with photos from the pre-ship build",
      "Asset list carried forward for storage and the next show",
    ],
  },
  {
    n: "06",
    title: "Install, show days and dismantle",
    body: "Install and dismantle labour is included in our pricing. A Traction X project manager works the floor, coordinates with the general contractor on labour jurisdiction, electrical and rigging, and stays reachable through show days.",
    bullets: [
      "Install and dismantle labour included — always",
      "Union jurisdiction and general contractor coordination handled",
      "On-floor problem solving during show days",
      "Post-show condition report and return to storage",
    ],
  },
];

const FAQS = [
  {
    q: "Do you build in-house or subcontract the fabrication?",
    a: "Exhibits are built to our drawings and inspected under our QA process, with a full pre-ship set-up before anything crates. You get a photographed record of your booth standing before it ships, whichever fabrication resource the build runs through.",
  },
  {
    q: "How long does a custom exhibit take to build?",
    a: "Production typically runs six to ten weeks after design approval, on top of roughly one to two weeks of full design development. Rush and rescue builds compress this — we have delivered complete booths in under three weeks — but they carry a rush premium.",
  },
  {
    q: "Will I see the booth before it ships?",
    a: "Yes. Every exhibit is fully assembled in-shop and photographed at the pre-ship QA stage, and those photos come to you before crating. That is when changes are cheap; on the show floor they are not.",
  },
  {
    q: "Is install and dismantle included?",
    a: "Yes. Install and dismantle labour is included in Traction X pricing. Drayage, electrical, rigging and other show services are billed by the venue or general contractor — we coordinate them but they are not included in the booth price.",
  },
  {
    q: "Can the same structure be reused at the next show?",
    a: "That is how we engineer it. Connection hardware is reusable, graphics are a re-skinnable kit, and the asset inventory created at crating carries into storage so the booth can be reconfigured into a different footprint later.",
  },
];

export const Route = createFileRoute("/how-we-build")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...robotsMeta(),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE.url}/how-we-build` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/how-we-build` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Traction X builds a custom trade show exhibit",
            description: ANSWER,
            step: STAGES.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.body,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]),
      },
    ],
  }),
  component: HowWeBuild,
});

function HowWeBuild() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Fabrication & quality"
        title="How We Build"
        accent="Your Exhibit"
        intro="From approved design to a photographed pre-ship set-up — the six stages every Traction X exhibit goes through before it reaches a show floor."
      >
        <div className="mt-8 flex flex-col gap-2.5 max-w-md">
          <QuoteButton source="how-we-build-hero" />
          <CtaNote kind="quote" />
        </div>
      </PageHero>

      <Section>
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/30 bg-[oklch(0.78_0.13_300)]/[0.06] p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[oklch(0.85_0.13_300)] mb-3">
            Short answer
          </div>
          <p className="text-white/85 text-lg leading-relaxed max-w-4xl">{ANSWER}</p>
        </div>
      </Section>

      <Section eyebrow="The build" title="Six stages, every exhibit">
        <div className="space-y-6">
          {STAGES.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6"
            >
              <div className="font-display text-4xl font-bold text-[oklch(0.78_0.13_300)]/70 leading-none">
                {s.n}
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-white/75 leading-relaxed max-w-3xl">{s.body}</p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-sm text-white/65 flex gap-2">
                      <span className="text-[oklch(0.78_0.13_300)]">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="muted" eyebrow="What this changes for you" title="Why the pre-ship set-up matters">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Problems are found in the shop",
              b: "A panel that doesn't sit right costs an hour in the shop and a show-floor crisis in Las Vegas. Full assembly before crating is the cheapest insurance in this industry.",
            },
            {
              t: "Your install crew isn't guessing",
              b: "Numbered crates packed in install order plus a photo manual from the actual build means the crew stands your booth the way it was designed, not the way they interpret it.",
            },
            {
              t: "The booth survives show two",
              b: "Reusable hardware, a graphic kit that re-skins and a condition record at dismantle are what turn a one-show spend into a multi-year asset.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-black p-6">
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/60">
          Related:{" "}
          <Link to="/services/$slug" params={{ slug: "booth-construction" }} className="text-[oklch(0.85_0.13_300)] hover:underline">
            booth construction
          </Link>
          ,{" "}
          <Link to="/services/$slug" params={{ slug: "install-and-dismantle" }} className="text-[oklch(0.85_0.13_300)] hover:underline">
            install &amp; dismantle
          </Link>{" "}
          and{" "}
          <Link to="/rescue-booth-builds" className="text-[oklch(0.85_0.13_300)] hover:underline">
            rescue builds
          </Link>
          .
        </p>
      </Section>

      <CaseProof context={{}} seed="how-we-build" heading="Exhibits built this way" />

      <FAQBlock items={FAQS} title="Fabrication FAQs" />

      <DesignCtaBand source="how-we-build" />
      <CTABand />
    </PageLayout>
  );
}
