/**
 * Booth shortlist — "save designs while you browse, send them as one quote".
 *
 * Stored in the browser only (no account). Mirrors the localStorage pattern in
 * city-context.tsx: nothing is read during render on the server, so the markup
 * a crawler sees stays canonical.
 */

import { useCallback, useEffect, useState } from "react";

const KEY = "tx_shortlist_v1";
const EVENT = "tx-shortlist-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* private mode / quota — the shortlist just won't persist */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Saved booth slugs, kept in sync across every component on the page. */
export function useShortlist() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, count: slugs.length, toggle, remove, clear, has };
}
