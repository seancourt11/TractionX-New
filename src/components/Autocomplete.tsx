import { useId, useMemo, useRef, useState } from "react";
import { suggestCities, suggestShows, type Suggestion } from "@/lib/place-suggest";

/**
 * Free-text input with a typeahead dropdown over the bundled city / show data.
 * Typing is never constrained — suggestions only help people find the exact
 * name we already have a page and pricing tier for.
 */
export function Autocomplete({
  kind,
  value,
  onChange,
  onSelectEntry,
  placeholder,
  required,
  name,
  maxLength = 120,
  className,
}: {
  kind: "city" | "show";
  value: string;
  onChange: (v: string) => void;
  onSelectEntry?: (entry: Suggestion) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  maxLength?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const listId = useId();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useMemo(
    () => (touched ? (kind === "city" ? suggestCities(value) : suggestShows(value)) : []),
    [kind, value, touched]
  );
  const visible = open && items.length > 0;

  function pick(entry: Suggestion) {
    onChange(entry.value);
    onSelectEntry?.(entry);
    setOpen(false);
    setActive(0);
  }

  return (
    <div className="relative">
      <input
        name={name}
        required={required}
        value={value}
        maxLength={maxLength}
        autoComplete="off"
        role="combobox"
        aria-expanded={visible}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={visible ? `${listId}-${active}` : undefined}
        onChange={(e) => {
          setTouched(true);
          onChange(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          blurTimer.current = setTimeout(() => setOpen(false), 120);
        }}
        onKeyDown={(e) => {
          if (!visible) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % items.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + items.length) % items.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            const entry = items[active];
            if (entry) pick(entry);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder={placeholder}
        className={
          className ??
          "w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-[oklch(0.78_0.13_300)]"
        }
      />

      {visible && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-white/15 bg-[#0b0b0d] py-1 shadow-2xl"
        >
          {items.map((entry, i) => (
            <li
              key={`${entry.kind}-${entry.slug}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
            >
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  pick(entry);
                }}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  i === active ? "bg-[oklch(0.78_0.13_300)]/20 text-white" : "text-white/80"
                }`}
              >
                <span className="block font-medium">{entry.value}</span>
                {entry.hint && <span className="block text-[11px] text-white/45">{entry.hint}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
