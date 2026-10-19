import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { searchIndex, POPULAR_SEARCHES, type SearchEntry } from "@/lib/search-index";

let openSetter: ((v: boolean) => void) | null = null;

/** Imperatively open the sitewide search modal from anywhere (e.g. header buttons). */
export function openSiteSearch() {
  openSetter?.(true);
}

function groupResults(results: SearchEntry[]) {
  const groups: { group: string; items: SearchEntry[] }[] = [];
  for (const r of results) {
    let g = groups.find((x) => x.group === r.group);
    if (!g) {
      g = { group: r.group, items: [] };
      groups.push(g);
    }
    g.items.push(r);
  }
  return groups;
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    openSetter = setOpen;
    return () => {
      openSetter = null;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => searchIndex(query), [query]);
  const empty = query.trim().length === 0;
  const flat = empty ? POPULAR_SEARCHES : results;
  const grouped = useMemo(() => groupResults(flat), [flat]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function go(entry: SearchEntry) {
    setOpen(false);
    navigate({ to: entry.href });
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = flat[activeIndex];
      if (entry) go(entry);
      else if (query.trim()) {
        setOpen(false);
        navigate({ to: "/search", search: { q: query.trim() } });
      }
    } else if (e.key === "Tab") {
      // simple focus trap: keep focus in the input since it's the only focusable field
      e.preventDefault();
    }
  }

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-heading"
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-black shadow-2xl overflow-hidden"
      >
        <h2 id="site-search-heading" className="sr-only">
          Search Traction X
        </h2>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <svg
            className="h-4 w-4 shrink-0 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search booths, cities, shows, guides…"
            aria-label="Search Traction X"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="text-xs text-white/50 border border-white/15 rounded px-1.5 py-0.5 hover:text-white"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {empty && (
            <p className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40">
              Popular
            </p>
          )}
          {grouped.length === 0 && !empty && (
            <p className="px-4 py-8 text-center text-sm text-white/50">
              No results for “{query}”.
            </p>
          )}
          {grouped.map((g) => (
            <div key={g.group} className="mb-2">
              {!empty && (
                <p className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {g.group}
                </p>
              )}
              <ul>
                {g.items.map((item) => {
                  runningIndex += 1;
                  const idx = runningIndex;
                  const active = idx === activeIndex;
                  return (
                    <li key={`${item.group}-${item.href}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => go(item)}
                        className={`w-full text-left px-4 py-2 flex flex-col ${
                          active ? "bg-white/10" : ""
                        }`}
                      >
                        <span className="text-sm text-white">{item.title}</span>
                        {item.subtitle && (
                          <span className="text-xs text-white/50 truncate">{item.subtitle}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-4 py-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate({ to: "/search", search: { q: query.trim() } });
            }}
            className="text-xs font-semibold text-[oklch(0.78_0.13_300)] hover:underline"
          >
            See all results
          </button>
          <span className="text-[11px] text-white/40 hidden sm:inline">
            ↑↓ to navigate · Enter to select
          </span>
        </div>
      </div>
    </div>
  );
}
