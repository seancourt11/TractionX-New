import { useRef } from "react";

export type Chip = { value: string; label: string };

/**
 * Tap-to-select option buttons used across every lead form (booth size,
 * budget band, timeline, project type). Faster than a dropdown on mobile and
 * it keeps the answers to a fixed, reportable set.
 */
export function ChoiceChips({
  label,
  hint,
  options,
  value,
  onChange,
  columns = "auto",
  size = "md",
  className = "",
}: {
  label?: string;
  hint?: string;
  options: Chip[];
  value: string;
  onChange: (value: string) => void;
  /** "auto" wraps chips inline; "grid" lays them out in even columns. */
  columns?: "auto" | "grid";
  size?: "sm" | "md";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const idx = options.findIndex((o) => o.value === value);
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = options[(idx + dir + options.length) % options.length] ?? options[0];
    if (!next) return;
    onChange(next.value);
    const btns = ref.current?.querySelectorAll<HTMLButtonElement>("button[data-chip]");
    btns?.[options.indexOf(next)]?.focus();
  }

  const pad = size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-3.5 py-2.5 text-sm";

  return (
    <div className={className}>
      {label && (
        <span className="block text-[11px] uppercase tracking-[0.24em] text-white/60 mb-1.5">{label}</span>
      )}
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={
          columns === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 gap-2"
            : "flex flex-wrap gap-2"
        }
      >
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              data-chip
              type="button"
              role="radio"
              aria-checked={on}
              tabIndex={on || (!value && o === options[0]) ? 0 : -1}
              onClick={() => onChange(on ? "" : o.value)}
              className={`rounded-lg border font-medium transition ${pad} ${
                on
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
                  : "border-white/15 bg-black/50 text-white/70 hover:border-white/35 hover:text-white"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.78_0.13_300)]`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {hint && <span className="mt-1.5 block text-[11px] text-white/40">{hint}</span>}
    </div>
  );
}
