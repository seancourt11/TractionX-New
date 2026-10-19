import { SITE } from "@/lib/site";
import { useCta } from "@/components/GlobalCta";
import { trackCall } from "@/lib/analytics";

/**
 * Three actions, not four. A fourth choice measurably flattens tap-through on
 * a bar this narrow — booking a meeting lives inside the quote and design
 * modals as a secondary path instead.
 */
export function MobileCtaBar() {
  const { openDesign, openQuote } = useCta();
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur">
      <div className="grid grid-cols-3 text-xs">
        <a
          href={`tel:${SITE.phone}`}
          onClick={() => trackCall("mobile-bar")}
          className="flex min-h-12 items-center justify-center gap-1.5 py-3 text-white/85 hover:text-white border-r border-white/10"
        >
          <span aria-hidden>📞</span> Call
        </a>

        <button
          type="button"
          onClick={() => openDesign({ source: "mobile-bar" })}
          className="flex min-h-12 items-center justify-center gap-1.5 py-3 text-white/85 hover:text-white border-r border-white/10"
        >
          Free 3D design
        </button>
        <button
          type="button"
          onClick={() => openQuote({ source: "mobile-bar" })}
          className="flex min-h-12 items-center justify-center gap-1.5 py-3 bg-[oklch(0.78_0.13_300)] text-black font-semibold"
        >
          Get quote →
        </button>
      </div>
    </div>
  );
}
