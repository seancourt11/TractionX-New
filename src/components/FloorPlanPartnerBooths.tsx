import { Link } from "@tanstack/react-router";
import { Section } from "@/components/PageLayout";
import { QuoteButton } from "@/components/GlobalCta";
import { BOOTH_SIZES } from "@/data/booth-sizes";

/**
 * "Managed partner — and the booths" band for the floor plan software
 * comparison hub and platform pages. Serves both audiences on one page:
 * organizers who need the plan run, and exhibitors who need an actual booth.
 */
export function FloorPlanPartnerBooths({
  platformName,
  source,
  bg,
}: {
  /** Named platform on detail pages; omitted on the hub. */
  platformName?: string;
  source: string;
  bg?: "muted";
}) {
  const sizes = BOOTH_SIZES.filter((b) => b.category === "size");
  const on = platformName ? `on ${platformName}` : "on whichever platform you choose";

  return (
    <Section
      eyebrow="Two audiences, one partner"
      title="We're the managed partner — and we build the booths on the plan"
      bg={bg}
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="text-xs uppercase tracking-widest text-white/50">If you're the organizer</div>
          <p className="mt-3 text-white/75 leading-relaxed">
            We run the floor plan {on}: venue CAD conversion, booth and sponsorship inventory, exhibitor
            onboarding, and keeping the plan accurate from first sale through move-in. We don't sell competing
            software, so the recommendation stays about what's right for your show.
          </p>
        </div>
        <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-[oklch(0.78_0.13_300)]/[0.05] p-6">
          <div className="text-xs uppercase tracking-widest text-[oklch(0.78_0.13_300)]">
            If you're exhibiting or sponsoring
          </div>
          <p className="mt-3 text-white/75 leading-relaxed">
            The same team supplies the actual booths that sit on that plan — 100% custom rentals and purchases
            built to your assigned footprint, with install and dismantle included and a project manager on site.
            One partner for the map and the build.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <Link
            key={s.slug}
            to="/booth-size/$slug"
            params={{ slug: s.slug }}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-[oklch(0.78_0.13_300)]/60 hover:text-white transition"
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/rent-a-booth"
          className="bg-[oklch(0.78_0.13_300)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Browse custom booth rentals
        </Link>
        <QuoteButton source={source} />
        <Link
          to="/custom-trade-show-floor-plans"
          className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
        >
          See our managed floor plan service
        </Link>
      </div>
    </Section>
  );
}
