import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageLayout, PageHero, Section } from "@/components/PageLayout";
import { searchIndex, POPULAR_SEARCHES } from "@/lib/search-index";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search | Traction X" },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Search | Traction X" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/search` }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [value, setValue] = useState(q);

  const results = searchIndex(q, 20, 200);
  const showingPopular = q.trim().length === 0;
  const list = showingPopular ? POPULAR_SEARCHES : results;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/search", search: { q: value.trim() } });
  }

  return (
    <PageLayout>
      <PageHero eyebrow="Search" title="Search" accent="Traction X">
        <form onSubmit={onSubmit} className="mt-8 max-w-xl">
          <label htmlFor="search-page-input" className="sr-only">
            Search Traction X
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3">
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
              id="search-page-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search booths, cities, shows, guides…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              className="text-sm font-semibold text-black bg-[oklch(0.78_0.13_300)] px-3 py-1.5 rounded-md"
            >
              Search
            </button>
          </div>
        </form>
      </PageHero>
      <Section>
        {showingPopular && (
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Popular pages</p>
        )}
        {!showingPopular && (
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            {list.length} result{list.length === 1 ? "" : "s"} for “{q}”
          </p>
        )}
        {list.length === 0 ? (
          <p className="text-white/60 text-sm">
            No results found. Try a different search term, or{" "}
            <a href="/contact" className="text-[oklch(0.78_0.13_300)] underline">
              contact us
            </a>{" "}
            directly.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => (
              <li key={`${item.group}-${item.href}`}>
                <Link
                  to={item.href}
                  className="block h-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.06] transition-colors"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                    {item.group}
                  </p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-white/50 mt-1 line-clamp-2">{item.subtitle}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </PageLayout>
  );
}
