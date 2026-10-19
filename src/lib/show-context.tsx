import { useEffect, useState } from "react";
import { SHOWS } from "@/data/shows";

/**
 * Remembers the show a visitor arrived on, the same way city-context remembers
 * the city. Used to prefill the show + city fields on every lead form.
 *
 * Client-only and SSR-safe: null until hydration, so rendered HTML stays
 * canonical for crawlers.
 */

export interface ShowContext {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  startDate?: string;
}

const STORAGE_KEY = "tx.showContext.v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const EVENT = "tx:showContextChange";

function lookup(slug: string): ShowContext | null {
  const s = SHOWS.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    slug: s.slug,
    name: s.name,
    city: s.city,
    citySlug: s.citySlug,
    ...(s.startDate ? { startDate: s.startDate } : {}),
  };
}

function readStored(): ShowContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { slug: string; ts: number };
    if (!parsed?.slug) return null;
    if (Date.now() - (parsed.ts ?? 0) > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return lookup(parsed.slug);
  } catch {
    return null;
  }
}

function writeStored(slug: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ slug, ts: Date.now() }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore */
  }
}

/** Read the remembered show, or null before hydration / when unset. */
export function useShowContext(): ShowContext | null {
  const [show, setShow] = useState<ShowContext | null>(null);

  useEffect(() => {
    setShow(readStored());
    const onChange = () => setShow(readStored());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return show;
}

/** Call from a show page to remember the visitor's show. */
export function useMarkShowVisit(slug: string | undefined) {
  useEffect(() => {
    if (slug && lookup(slug)) writeStored(slug);
  }, [slug]);
}
