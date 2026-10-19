import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { FileAttach } from "@/components/FileAttach";
import heroBg from "@/assets/floorplan-hero.jpg";
import fp2 from "@/assets/floorplan-2.jpg";
import fp3 from "@/assets/floorplan-3.jpg";
import { DesignCtaBand } from "@/components/GlobalCta";
import { absUrl, robotsMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { VENUES, venueUrlSlug } from "@/data/venues";

const PAGE_TITLE =
  "Interactive Trade Show Floor Plan Software & Management | Traction X";
const PAGE_DESC =
  "Interactive trade show floor plan software plus a managed team: venue CAD converted to a live, sellable exhibitor map in 5–10 business days, with booth sales, sponsor fulfillment and show-day management.";
const PATH = "/custom-trade-show-floor-plans";
const CANONICAL = absUrl(PATH);

/** Short, quotable answer block for AI search engines and featured snippets. */
const ANSWER =
  "An interactive trade show floor plan is a live, web-based version of your event's exhibit hall map: every booth is clickable, inventory updates in real time, exhibitors and sponsors can reserve space directly, and attendees can search and navigate the hall on any device. Traction X converts your venue CAD or PDF into that plan in 5–10 business days, then runs it — inventory, sponsor fulfillment, exhibitor onboarding and show-day edits — as a managed service. Plan design typically starts around $4,950 per show; fully managed programs start around $14,500 per show.";

const FAQS = [
  {
    q: "Who are interactive event floor plans built for?",
    a: "Trade show organizers, conference producers, convention and association event teams, expo managers, venues, and general service contractors (GSCs). If you sell exhibit space, fulfill event sponsorships, or manage attendee wayfinding at a trade show, conference, or convention — this is built for you.",
  },
  {
    q: "What makes Traction X different from other floor plan providers?",
    a: "Most floor plan vendors hand you a login and disappear. Traction X combines interactive floor plan technology with a senior services team: AutoCAD-to-interactive conversion, booth and sponsorship inventory strategy, sponsor placement and tier pricing, exhibitor onboarding, payment integration, attendee wayfinding UX, live show-day updates, and integration with your registration and CRM stack. You get the technology AND the team.",
  },
  {
    q: "When in our event planning cycle should we engage?",
    a: "As early as possible — ideally 6–12 months before doors open, right when you finalize the venue contract and begin sponsor and exhibitor outreach. Early engagement lets us optimize aisle flow, sponsor real estate, sellable square footage, and tier pricing before you publish a single booth or sponsorship package for sale.",
  },
  {
    q: "Can exhibitors and sponsors buy directly off the floor plan?",
    a: "Yes. The interactive event floor plan is fully transactional — exhibitors and sponsors browse availability in real time, reserve or buy booths and sponsorship packages by credit card 24/7, and self-serve their company profile, logo, products, and lead-magnet materials. Your team stops fielding 'is booth 412 still open?' emails.",
  },
  {
    q: "Do you handle attendee wayfinding on show days?",
    a: "Yes. Attendees access the live event map at a custom URL under your own domain, search exhibitors, sponsors and sessions, get blue-dot directions inside the hall, and bookmark booths to visit — on any device, no app download required.",
  },
  {
    q: "Can the trade show floor plan update in real time during the event?",
    a: "Yes. Our team makes live updates during the show — last-minute exhibitor swaps, sponsor takeovers, room changes, session shifts, sold-out indicators, and emergency wayfinding. Changes publish to every attendee device instantly.",
  },
  {
    q: "Will it embed into our event website and registration platform?",
    a: "Yes — a single line of embed code drops the interactive floor plan onto your event site, plus native integrations with major event registration platforms (Cvent, Swoogo, RegFox, Bizzabo, Aventri / Stova) so exhibitor, sponsor, and attendee data stays in sync.",
  },
  {
    q: "How do you help with event sponsorship fulfillment?",
    a: "Sponsorship is often the largest revenue line at a trade show or conference — and the hardest to fulfill. We map every contracted sponsor benefit (logo placement, premium booth, branded lounges, wayfinding takeovers, push notifications, featured exhibitor cards) onto the interactive plan and produce a sponsor fulfillment report for renewals.",
  },
  {
    q: "How much does an interactive trade show floor plan cost?",
    a: "Most organizers land in one of two bands. A designed, branded interactive plan built from your venue CAD — with exhibitor self-onboarding, booth sales and an embed on your event site — typically starts around $4,950 per show. A fully managed program, where Traction X runs inventory strategy, sponsor fulfillment, exhibitor onboarding, live show-day edits and post-show reporting, typically starts around $14,500 per show. Multi-show portfolios are priced across the portfolio. Every quote is confirmed after we see your venue plan and booth count.",
  },
  {
    q: "Do we have to switch off ExpoFP, Map Your Show, EXPOCAD or Cvent to work with you?",
    a: "No. Plenty of organizers already own a floor plan platform and simply have nobody to run it. We work as the managed team on top of the platform you already licensed, or we deploy ours if you would rather not carry a licence. Our comparison guide walks through where each major platform fits and where a managed partner adds value.",
  },
  {
    q: "Do you know the rules of our venue?",
    a: "We publish a floor plan guide for every major North American venue we work in — hall dimensions and ceiling heights, booth numbering conventions, dock and freight access, rigging approval reality, and the aisle and fire-marshal rules that actually constrain a layout. Those constraints get baked into the plan before it goes to market, not discovered during move-in.",
  },
  {
    q: "How fast can our event floor plan go live?",
    a: "Most interactive event floor plans go live within 5–10 business days from receiving your venue CAD or PDF. Rush turnarounds (48–72 hours) are available for shows already in market.",
  },
];

export const Route = createFileRoute("/custom-trade-show-floor-plans")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "interactive event floor plans, trade show floor plan software, conference floor plan, convention floor plan design, expo floor plan, exhibitor booth sales software, event sponsorship fulfillment, sponsor inventory management, event floor plan management, attendee wayfinding, interactive event map, show organizer software, event planning software",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:card", content: "summary_large_image" },
      ...robotsMeta(),
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": CANONICAL + "#service",
              name: "Custom Trade Show & Convention Floor Plan Design & Management",
              serviceType: "Interactive event floor plan design, exhibitor sales & live management",
              provider: {
                "@type": "Organization",
                name: "Traction X",
                url: "https://tractionx.ca",
              },
              areaServed: "Worldwide",
              description: PAGE_DESC,
              offers: [
                {
                  "@type": "Offer",
                  name: "Professional — designed interactive floor plan",
                  price: "4950",
                  priceCurrency: "USD",
                  description: "Interactive plan designed from your venue CAD, branded, embedded and enabled for booth sales. Starting price per show.",
                },
                {
                  "@type": "Offer",
                  name: "Concierge — fully managed floor plan program",
                  price: "14500",
                  priceCurrency: "USD",
                  description: "Traction X runs inventory strategy, sponsor fulfillment, exhibitor onboarding, live show-day management and post-show reporting. Starting price per show.",
                },
              ],
            },
            {
              "@type": "HowTo",
              name: "How to launch an interactive trade show floor plan",
              description: ANSWER,
              totalTime: "P10D",
              step: PROCESS.map((p, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: p.title,
                text: p.body,
              })),
            },
            {
              "@type": "WebPage",
              "@id": CANONICAL + "#webpage",
              url: CANONICAL,
              name: PAGE_TITLE,
              description: PAGE_DESC,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["#tldr", "#faq"],
              },
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
                { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
                { "@type": "ListItem", position: 2, name: "Custom Trade Show Floor Plans", item: CANONICAL },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: FloorPlansPage,
});

const STATS = [
  { k: "5–10 days", v: "From venue CAD to a live, sellable plan" },
  { k: "48–72 hrs", v: "Rush build for shows already in market" },
  { k: "9 languages", v: "Published from one source plan" },
  { k: "24/7", v: "Exhibitor and sponsor self-serve booking" },
];

const CAPABILITIES = [
  {
    t: "Custom Event Floor Plan Design",
    b: "We turn your venue CAD, PDF, or napkin sketch into a beautiful, pixel-perfect interactive floor plan — booths, aisles, stages, sponsor lounges, food & beverage, registration, and landmarks for trade shows, conferences and conventions.",
  },
  {
    t: "Exhibitor Booth Sales",
    b: "Sell or reserve booths directly on the interactive map, 24/7, by credit card. Tiered pricing, premium placement, exhibitor waitlists — no back-and-forth emails.",
  },
  {
    t: "Sponsor Inventory & Fulfillment",
    b: "Model every sponsorship tier — title, presenting, platinum, gold — on the plan. Track logo placements, branded zones, wayfinding takeovers and push-notification slots so every contracted sponsor benefit is delivered and reported.",
  },
  {
    t: "Attendee Wayfinding",
    b: "Built-in search, filters, favorites and blue-dot directions on any device. Attendees find exhibitors, sponsors, sessions and amenities without an app download.",
  },
  {
    t: "Inventory & Revenue Strategy",
    b: "We model your floor as revenue. Optimize aisle flow, sponsor visibility, sellable sq ft and tier pricing before you go to market with your event prospectus.",
  },
  {
    t: "Live Show Management",
    b: "Dedicated PM on call during move-in and show days. Real-time updates for swaps, sold-outs, last-minute sponsor takeovers, room changes and emergency wayfinding.",
  },
  {
    t: "Multi-language & Accessibility",
    b: "Plans publish in English, Spanish, French, German, Portuguese, Chinese, Japanese, Korean and Italian — and meet WCAG accessibility standards for global audiences.",
  },
  {
    t: "Registration & CRM Integrations",
    b: "Native embed on your event site. Sync with Cvent, Swoogo, Bizzabo, RegFox, Stova, HubSpot, Salesforce and your payment processor.",
  },
  {
    t: "Sponsor & Exhibitor Analytics",
    b: "See which booths and sponsor placements get the most attention, what attendees search, peak traffic times, and conversion from view → favorite → meeting requested — the data you need to renew sponsors and grow exhibitor revenue.",
  },
];


const PROCESS = [
  {
    n: "01",
    title: "Discovery & venue intake",
    body: "30-minute working session. We collect your venue CAD/PDF, show brand, exhibitor tier structure, sponsor commitments, registration platform, and target launch date.",
  },
  {
    n: "02",
    title: "Floor plan design & optimization",
    body: "Our designers convert your raw venue plan into a fully interactive build — branded to your show, optimized for attendee flow and sellable sq ft.",
  },
  {
    n: "03",
    title: "Inventory, pricing & sponsor tiers",
    body: "We model booth inventory, premium placements, sponsor packages, and price tiers. You approve. Plan goes live for exhibitor sales.",
  },
  {
    n: "04",
    title: "Exhibitor onboarding & profiles",
    body: "Automated invites send exhibitors their auto-login link. They self-serve company profile, logo, products, lead magnets, and contact info.",
  },
  {
    n: "05",
    title: "Public launch & embed",
    body: "Plan publishes to a custom URL under your own domain and embeds on your event website. Attendees can browse and bookmark months before doors open.",
  },
  {
    n: "06",
    title: "Live show-day management",
    body: "A Traction X project manager runs your plan live — real-time edits, swaps, sold-out badges, wayfinding fixes, and analytics reporting through close-out.",
  },
  {
    n: "07",
    title: "Post-show analytics & rollover",
    body: "Full reporting on exhibitor performance, attendee search behavior, and booth-level engagement. Then we roll the plan forward to next year — no rebuild.",
  },
];

const TIERS = [
  {
    name: "Assist",
    sub: "You own the platform, we run it",
    price: "Scoped per show",
    description: "Already licensed ExpoFP, Map Your Show, EXPOCAD, A2Z or Cvent? We operate it for you.",
    features: [
      "Works on your existing platform",
      "Plan build and QA from your CAD",
      "Inventory and tier setup",
      "Exhibitor onboarding support",
      "Show-day edit coverage",
    ],
  },
  {
    name: "Professional",
    sub: "We design, you manage",
    price: "From $4,950 / show",
    featured: true,
    description: "We build the interactive plan from your venue CAD. You manage exhibitor sales and updates.",
    features: [
      "Custom plan design from CAD/PDF",
      "Full branding to your show",
      "Exhibitor self-onboarding",
      "Booth sales & payments enabled",
      "Embed on your event website",
      "Registration platform integration",
      "Priority support during show",
    ],
  },
  {
    name: "Concierge",
    sub: "Fully managed, end-to-end",
    price: "From $14,500 / show",
    description: "Traction X runs your floor plan operation from sketch to post-show report. White-glove.",
    features: [
      "Everything in Professional",
      "Sponsor & inventory strategy",
      "Exhibitor onboarding handled for you",
      "Live show-day management",
      "Real-time edits & wayfinding fixes",
      "Multi-language deployment",
      "Post-show analytics + next-year rollover",
      "Dedicated project manager",
    ],
  },
  {
    name: "Enterprise",
    sub: "Multi-show portfolios",
    price: "Custom",
    description: "For associations, media companies, and portfolios running 3+ shows annually.",
    features: [
      "Volume pricing across shows",
      "Shared exhibitor profiles across events",
      "Centralized analytics dashboard",
      "Custom CRM / DMP integration",
      "Dedicated account team",
      "Quarterly business reviews",
    ],
  },
];

const USE_CASES = [
  ["Trade shows & expos", "Multi-hall interactive floor plans, hundreds to thousands of booths, tiered exhibitor and sponsor packages."],
  ["Conferences & summits", "Conference floor plans with session rooms, sponsor lounges, breakout spaces and demo zones on one interactive map."],
  ["Conventions & association events", "Annual convention floor plans with year-over-year rollover, member directories, sponsor renewals and CE tracking integration."],
  ["Hybrid & festival events", "Outdoor + indoor event maps, stages, F&B zones, sponsor activations and multi-day schedules."],
  ["Venue & GSC partnerships", "White-labeled floor plan services for venues and general service contractors serving multiple shows."],
  ["Roadshows & multi-city activations", "One template, deployed across cities with localized exhibitor lists and local sponsor lineups."],
];

const VS_BUILD = [
  ["Static PDF event floor plan", "Out of date by week one. Exhibitors call you. Sponsors can't see their placement. Attendees print and lose it.", "An interactive event floor plan that updates in real time and lives on every device."],
  ["DIY CAD + intern", "Slow, breaks every time a booth moves, no booth-sales workflow, no sponsor fulfillment tracking, no analytics.", "Designed by event floor plan specialists. Booth sales, sponsor inventory, wayfinding and analytics built in."],
  ["A spreadsheet for booth & sponsor sales", "Double-bookings. Lost revenue. Missed sponsor commitments and renewals.", "Real-time inventory. 24/7 self-serve booth and sponsorship sales. Automated invoicing and fulfillment reporting."],
  ["Generic event app", "Floor plan is an afterthought, no booth-sales engine, no sponsor tracking, locked behind app downloads.", "The interactive event map IS the product. Web-first, embeddable, no app required."],
];

const WHY = [
  ["Exhibit-floor operators, not just software", "We build and install exhibits in these halls every week. The layout decisions we make are informed by dock schedules, rigging approvals and aisle rules we live with on site."],
  ["You get technology AND a team", "Other event floor plan vendors hand you a login and disappear. We design, launch and run your interactive plan with you."],
  ["Your floor plan is a revenue engine", "We treat booth and sponsor inventory the way airlines treat seats — tiered, dynamic and optimized for sell-through."],
  ["Built for the event planning cycle", "We engage 6–12 months out, when decisions about sponsor placement, exhibitor tiers and sellable sq ft are actually made."],
];

function CTAButton({
  children,
  variant = "primary",
  href = "#contact",
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

function FloorPlansPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Interactive trade show floor plan overhead view" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.78_0.13_300)] animate-pulse" />
              For Trade Show, Conference & Convention Organizers · Full-Service Floor Plan Design
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.02] mb-6">
              Interactive Trade Show
              <br />
              Floor Plan Software
              <br />
              <span className="text-[oklch(0.78_0.13_300)]">&amp; Full Floor Plan Management</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mb-8 leading-relaxed font-light">
              Custom <strong className="text-white">interactive floor plan software</strong> and managed services for
              event organizers. We design, deploy, and run the floor plan for your trade show, conference, expo,
              or convention — selling booths, fulfilling event sponsorships, and guiding attendees — from venue
              CAD to live show day, in any language, anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <CTAButton>Book a 20-Min Demo</CTAButton>
              <CTAButton variant="ghost" href="#pricing">See Pricing</CTAButton>
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
              <img src={fp3} alt="Attendee using interactive event map on tablet" className="w-full h-full object-cover" width={1600} height={1100} />
            </div>
          </div>
        </div>
      </section>

      {/* Answer block for AI search + snippets */}
      <section id="tldr" className="border-y border-white/10 bg-[oklch(0.05_0_0)] py-14 md:py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">
            Short answer
          </p>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight mb-5">
            What is an interactive trade show floor plan — and what does it cost?
          </h2>
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">{ANSWER}</p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3 text-sm text-white/70 font-light">
            {[
              "Works on your existing platform (ExpoFP, Map Your Show, EXPOCAD, A2Z, Cvent) or on ours.",
              "Venue CAD, PDF or a marked-up sketch is enough to start.",
              "Booth and sponsorship inventory sells 24/7 with real-time availability.",
              "A project manager makes live edits during move-in and show days.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(0.78_0.13_300)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="#pricing">See pricing bands</CTAButton>
            <CTAButton variant="ghost" href="/floor-plan-software-comparison">
              Compare floor plan platforms
            </CTAButton>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what">
      <Section eyebrow="What we do">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-6">
              Your event floor plan is the most valuable real estate at your show. Treat it that way.
            </h2>
            <div className="space-y-5 text-white/75 text-base md:text-lg leading-relaxed font-light">
              <p>
                Every trade show, conference, and convention runs on one thing: the <strong className="text-white">event floor plan</strong>.
                It's how exhibitors decide whether to write the cheque. It's how event sponsors evaluate placement and
                renew year over year. It's how attendees decide what to see — and what to skip. And on too many shows, it's
                still a static PDF emailed around like it's 2008.
              </p>
              <p>
                Traction X designs and manages <strong className="text-white">interactive event floor plans</strong> for
                trade show, conference and convention organizers who treat their event like a product. Our team has delivered
                interactive plans on top of whichever platform you already own — or on ours — and wrap it in a senior services
                team: floor plan designers, sponsor strategists, exhibitor onboarding specialists, and on-site project managers
                who are in these halls every week building exhibits.
              </p>
              <p>
                Engage us early in your event planning cycle and you'll get an interactive floor plan that <strong className="text-white">sells
                booths and sponsorships 24/7</strong>, eliminates "is this stand still open?" emails, fulfills every contracted
                sponsor benefit, optimizes event revenue, and gives attendees a wayfinding experience that translates to
                repeat attendance year over year.
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
      </section>

      {/* Image break */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img src={fp2} alt="3D rendering of optimized convention floor layout" className="w-full h-full object-cover" loading="lazy" width={1600} height={1000} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="absolute inset-0 flex items-end p-6 md:p-16">
          <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight max-w-3xl leading-tight">
            From venue CAD to a live, sellable interactive event floor plan
            <span className="text-[oklch(0.78_0.13_300)]"> in under 10 business days.</span>
          </p>
        </div>
      </div>

      {/* Capabilities */}
      <section id="capabilities">
      <Section eyebrow="Capabilities" title="Everything a trade show, conference or convention organizer needs from a modern event floor plan — in one place.">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[oklch(0.78_0.13_300)]/40 transition-colors">
              <div className="text-lg font-semibold mb-2">{c.t}</div>
              <p className="text-sm text-white/65 font-light leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>
      </section>

      {/* vs. status quo */}
      <Section eyebrow="Why now" title="What you're using today vs. what your show actually needs." className="bg-[oklch(0.04_0_0)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <th className="py-4 pr-4 font-medium">Today</th>
                <th className="py-4 pr-4 font-medium">The problem</th>
                <th className="py-4 font-medium text-[oklch(0.78_0.13_300)]">With Traction X</th>
              </tr>
            </thead>
            <tbody>
              {VS_BUILD.map(([a, b, c]) => (
                <tr key={a} className="border-b border-white/5 align-top">
                  <td className="py-5 pr-4 font-semibold text-white">{a}</td>
                  <td className="py-5 pr-4 text-white/65 font-light">{b}</td>
                  <td className="py-5 text-white/85 font-light">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Process */}
      <section id="process">
      <Section eyebrow="How we work" title="From your venue contract to your post-show report, in seven steps.">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img src={fp2} alt="Convention floor plan being optimized for sponsor placement" className="w-full aspect-[4/5] object-cover" loading="lazy" width={1600} height={1000} />
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
      </section>

      {/* Use cases */}
      <Section eyebrow="Built for" title="Every kind of show, every stage of growth." className="bg-[oklch(0.04_0_0)]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-semibold mb-2">{t}</div>
              <p className="text-sm text-white/65 font-light leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <section id="pricing">
      <Section
        eyebrow="Pricing"
        title="Four ways to engage — pick where you want to plug in."
        className="bg-gradient-to-b from-black to-[oklch(0.05_0_0)]"
      >
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-12 font-light leading-relaxed">
          Published starting bands so you can budget before you talk to anyone. Most organizers come to us for the
          Professional or Concierge tier — they want the design, the strategy, and the team behind it. Every tier
          includes unlimited exhibitors and unlimited plan views, and every quote is confirmed once we see your venue
          plan and booth count.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 md:p-7 flex flex-col ${p.featured ? "border-[oklch(0.78_0.13_300)] bg-gradient-to-b from-[oklch(0.78_0.13_300)]/10 to-transparent shadow-2xl" : "border-white/10 bg-white/[0.03]"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-6 bg-[oklch(0.78_0.13_300)] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">{p.sub}</div>
              <div className="text-2xl font-bold mb-1">{p.name}</div>
              <div className="text-lg text-[oklch(0.78_0.13_300)] font-semibold mb-3">{p.price}</div>
              <p className="text-sm text-white/65 font-light mb-5 leading-relaxed">{p.description}</p>
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
              <a href="#contact" className="w-full text-center bg-white text-black px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all">
                Talk to us
              </a>
            </div>
          ))}
        </div>
      </Section>
      </section>

      {/* Planning cycle CTA */}
      <Section eyebrow="Timing matters" title="The earlier in your planning cycle we engage, the more revenue your plan generates.">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["12+ months out", "Venue contract signed. We model sponsor placement, sellable sq ft, and tier pricing before exhibitor outreach begins. Maximum revenue lift."],
            ["6–9 months out", "Prospectus going out. We design the plan, launch booth sales, and onboard exhibitors as commitments come in."],
            ["< 90 days out", "Crunch time. We rush-build the interactive plan, migrate your spreadsheet inventory, and have you live in 5 business days."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-3">{t}</div>
              <p className="text-white/80 font-light leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <CTAButton>Book a Discovery Call</CTAButton>
          <CTAButton variant="ghost" href={`mailto:${SITE.email}`}>Email the team</CTAButton>
        </div>
      </Section>

      {/* Contact */}
      <section id="contact" className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-[oklch(0.05_0_0)] to-black">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 mb-4 text-center">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] mb-6 text-center">
            Let's build your <span className="text-[oklch(0.78_0.13_300)]">show's floor plan</span>.
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Tell us about your event. You'll get a working session booked within one business day —
            we'll come prepared with ideas for your inventory, sponsor placement, and launch timeline.
          </p>

          <div className="grid md:grid-cols-5 gap-8">
            <form className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Name</span>
                  <input type="text" required className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Organization</span>
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
                  <span className="text-xs uppercase tracking-widest text-white/60">Show name</span>
                  <input type="text" className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Show date / city</span>
                  <input type="text" className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" />
                </label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Approx. # of booths</span>
                  <select className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none">
                    <option>Under 50</option>
                    <option>50–150</option>
                    <option>150–500</option>
                    <option>500–1,500</option>
                    <option>1,500+</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-white/60">Which tier interests you?</span>
                  <select className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none">
                    <option>Professional — we design, you manage</option>
                    <option>Concierge — fully managed</option>
                    <option>Enterprise — multi-show</option>
                    <option>Starter — DIY with help</option>
                    <option>Not sure — let's talk</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/60">Tell us about your show</span>
                <textarea rows={4} className="mt-1.5 w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm focus:border-[oklch(0.78_0.13_300)] outline-none" placeholder="Venue, exhibitor tiers, sponsor commitments, current pain points..." />
              </label>
              <FileAttach hint="Venue CAD/PDF, exhibitor lists, sponsor decks, brand guidelines — PDF, DWG, DXF, PNG, ZIP (max 25MB each)" />
              <button type="submit" className="w-full bg-white text-black px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow-lg">
                Send brief → Book a working session
              </button>
              <p className="text-xs text-white/50 text-center">We reply within one business day. No spam, ever.</p>
            </form>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Email</div>
                <a href={`mailto:${SITE.email}`} className="text-lg text-white hover:text-[oklch(0.78_0.13_300)] font-medium block">{SITE.email}</a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Call</div>
                <a href={`tel:${SITE.phone}`} className="text-lg text-white hover:text-[oklch(0.78_0.13_300)] font-medium block">{SITE.phoneDisplay}</a>
              </div>
              <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/5 p-6">
                <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)] mb-2">Want to see it first?</div>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  Send us your venue CAD or last year's PDF and we'll walk you through a working
                  interactive plan of your own hall on a 20-minute call — before you commit to anything.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Headquartered</div>
                <div className="text-sm text-white/75 font-light leading-relaxed">
                  Traction X<br />
                  Vancouver, BC, Canada<br />
                  Serving show organizers worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue-level floor plan guides */}
      <Section
        eyebrow="Venue intelligence"
        title="Floor plan guides for the halls you're laying out."
        className="bg-[oklch(0.04_0_0)]"
      >
        <p className="text-white/70 text-base md:text-lg max-w-3xl mb-10 font-light leading-relaxed">
          Every building has its own booth numbering, dock access, ceiling heights, rigging approvals and aisle
          rules — and those constraints decide what your floor can actually sell. We publish what we know about each
          venue so your plan is built against reality, not a generic template.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VENUES.map((v) => (
            <Link
              key={v.slug}
              to="/venue-floor-plans/$slug"
              params={{ slug: v.slug }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm hover:border-[oklch(0.78_0.13_300)]/40 transition-colors"
            >
              <div className="font-semibold text-white">{v.shortName} floor plan guide</div>
              <div className="text-white/55 text-xs mt-1">
                {v.city}, {v.stateAbbr} · {v.size}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link to="/venues" className="text-[oklch(0.78_0.13_300)] hover:underline">
            All venue booth rental guides
          </Link>
          <Link to="/shows" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Show-by-show exhibitor guides
          </Link>
          <Link to="/floor-plan-software-comparison" className="text-[oklch(0.78_0.13_300)] hover:underline">
            Floor plan software comparison
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq">
      <Section eyebrow="FAQ" title="Floor plan questions show organizers actually ask." className="bg-[oklch(0.04_0_0)]">
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
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 px-4 text-center border-t border-white/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-6">
            Your next show deserves a better floor plan.
          </h2>
          <p className="text-white/70 mb-10 font-light text-base md:text-lg">
            Book a 20-minute demo and we'll walk you through a live interactive plan,
            show you the booth-sales workflow, and map a launch timeline for your event.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton>Book a Demo</CTAButton>
            <CTAButton variant="ghost" href={`mailto:${SITE.email}`}>Email the team</CTAButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <DesignCtaBand source="custom-trade-show-floor-plans" />
    </PageLayout>
  );
}
