import { useShortlist } from "@/lib/shortlist";
import { suppressCtaNudge } from "@/components/GlobalCta";

/**
 * "Save" control shown on every booth card and booth detail page.
 * Client-only state, so it renders the neutral (unsaved) label on the server.
 */
export function ShortlistButton({
  slug,
  className = "",
  size = "sm",
}: {
  slug: string;
  className?: string;
  size?: "sm" | "lg";
}) {
  const { has, toggle } = useShortlist();
  const saved = has(slug);
  const pad = size === "lg" ? "px-5 py-3 text-sm" : "px-3 py-1.5 text-sm";
  return (
    <button
      type="button"
      onClick={() => {
        suppressCtaNudge();
        toggle(slug);
      }}
      aria-pressed={saved}
      className={`${pad} rounded-lg font-semibold border transition ${
        saved
          ? "border-[oklch(0.78_0.13_300)] text-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
          : "border-white/20 text-white/80 hover:bg-white/5"
      } ${className}`}
    >
      {saved ? "★ Saved" : "☆ Save"}
    </button>
  );
}
