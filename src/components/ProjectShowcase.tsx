import { Link } from "@tanstack/react-router";

import proj1 from "@/assets/portfolio/canada-defence-booth-01.jpg.asset.json";
import proj2 from "@/assets/portfolio/air-canada-cargo-booth.jpg.asset.json";
import proj3 from "@/assets/portfolio/telus-game-changers-room.jpg.asset.json";
import proj4 from "@/assets/portfolio/accenture-mission-ready.jpg.asset.json";
import proj5 from "@/assets/portfolio/sma-energy-booth.jpg.asset.json";
import proj6 from "@/assets/portfolio/air-canada-lounge.jpg.asset.json";
import proj7 from "@/assets/portfolio/canada-export-booth.jpg.asset.json";
import proj8 from "@/assets/portfolio/telus-locker-detail.jpg.asset.json";
import proj9 from "@/assets/portfolio/team-canada-fanfest.jpg.asset.json";
import proj10 from "@/assets/portfolio/netflix-booth-full.jpg.asset.json";
import proj11 from "@/assets/portfolio/nvidia-dgx-spark-booth.jpg.asset.json";
import proj12 from "@/assets/portfolio/thales-booth.jpg.asset.json";
import proj13 from "@/assets/portfolio/optibus-ai-preference-designer.jpg.asset.json";
import proj14 from "@/assets/portfolio/sma-ul3741-booth.jpg.asset.json";
import proj15 from "@/assets/portfolio/netflix-booth-lounge.jpg.asset.json";
import proj16 from "@/assets/portfolio/canada-defence-booth-02.jpg.asset.json";

type Project = { src: string; title: string; caption: string };

export const PROJECTS: Project[] = [
  { src: proj1.url, title: "Canada Defence pavilion", caption: "Custom rental pavilion with backlit fabric masthead and meeting pods" },
  { src: proj2.url, title: "Air Canada Cargo", caption: "20x20 island build with double-deck sightlines and product plinths" },
  { src: proj3.url, title: "TELUS Game Changers", caption: "Brand activation lounge with millwork bar and integrated AV" },
  { src: proj4.url, title: "Accenture Mission Ready", caption: "Modular rental system dressed in custom graphics and lighting" },
  { src: proj5.url, title: "SMA Energy", caption: "Product-forward exhibit with hanging sign and demo stations" },
  { src: proj6.url, title: "Air Canada Lounge", caption: "Hospitality-grade lounge environment built for repeat tour use" },
  { src: proj7.url, title: "Canada Export pavilion", caption: "Multi-tenant pavilion with shared reception and co-exhibitor bays" },
  { src: proj8.url, title: "TELUS locker detail", caption: "Precision millwork detail from our in-house fabrication shop" },
  { src: proj9.url, title: "Team Canada FanFest", caption: "Large-format public activation with rigged structure and signage" },
  { src: proj10.url, title: "Netflix activation", caption: "Immersive set-build environment with themed scenic and lighting" },
  { src: proj11.url, title: "NVIDIA DGX Spark", caption: "Tech demo exhibit with secure display cases and LED wall" },
  { src: proj12.url, title: "Thales custom exhibit", caption: "Defence exhibit with hardware display and private briefing room" },
  { src: proj13.url, title: "Optibus Preference Designer", caption: "Software demo booth with interactive kiosks and seated demos" },
  { src: proj14.url, title: "SMA UL3741", caption: "Compact inline booth engineered for fast install and teardown" },
  { src: proj15.url, title: "Netflix lounge", caption: "Soft-seating hospitality zone with custom scenic walls" },
  { src: proj16.url, title: "Canada Defence island", caption: "Island exhibit with tower branding and open-plan traffic flow" },
];

function pick(seed: string, count: number): Project[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const start = h % PROJECTS.length;
  return Array.from({ length: count }, (_, i) => PROJECTS[(start + i * 3) % PROJECTS.length]);
}

type Props = {
  seed: string;
  locationLabel: string;
  heading?: string;
  intro?: string;
  count?: number;
  className?: string;
};

export function ProjectShowcase({ seed, locationLabel, heading, intro, count = 6, className = "" }: Props) {
  const items = pick(seed, count);
  return (
    <section className={`max-w-7xl mx-auto px-6 pb-16 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
        {heading ?? `Recent Traction X booths built for ${locationLabel} exhibitors`}
      </h2>
      <p className="text-white/70 max-w-3xl mb-8">
        {intro ??
          `Every exhibit below was designed, fabricated and installed by our own team. The same custom build and custom rental programs are available for your ${locationLabel} program.`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p, i) => (
          <figure
            key={`${p.title}-${i}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.src}
                alt={`${p.title} — custom trade show exhibit built by Traction X for ${locationLabel}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <div className="text-sm font-semibold">{p.title}</div>
              <div className="text-sm text-white/60 mt-1">{p.caption}</div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/gallery" search={{ size: undefined }}
          className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/10"
        >
          View the full gallery
        </Link>
        <a
          href="#quote"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Get a {locationLabel} booth quote
        </a>
      </div>
    </section>
  );
}
