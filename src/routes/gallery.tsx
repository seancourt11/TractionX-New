import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { DesignCtaBand, QuoteButton, useCta } from "@/components/GlobalCta";
import { RENTAL_BOOTHS, RENTAL_SIZES } from "@/data/rental-booths";
import { SITE } from "@/lib/site";

const galleryModules = import.meta.glob<{ default: { url: string } }>(
  "@/assets/gallery/*.asset.json",
  { eager: true }
);

type GalleryImage = { url: string; name: string; size: string; alt: string };

const FEATURED: GalleryImage[] = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod], i) => ({
    url: mod.default.url,
    name: path.split("/").pop()?.replace(".asset.json", "") ?? "booth",
    size: "featured",
    alt: `Custom trade show booth exhibit built by Traction X — project ${i + 1}`,
  }));

function sizeLabel(size: string) {
  if (size === "featured") return "Featured builds";
  if (size === "Custom" || size === "Larger") return size;
  return `${size.replace("x", " × ")} ft`;
}

const PROJECTS: GalleryImage[] = RENTAL_BOOTHS.map((b) => ({
  url: b.image,
  name: b.name,
  size: b.size,
  alt: `${sizeLabel(b.size)} custom trade show booth — ${b.name} project by Traction X`,
}));

const IMAGES: GalleryImage[] = [...FEATURED, ...PROJECTS];

const SIZE_FILTERS = [
  "featured",
  ...RENTAL_SIZES.filter((s) => PROJECTS.some((p) => p.size === s)),
];

const PAGE = 48;

const PAGE_TITLE =
  "Trade Show Booth Gallery — Custom Exhibits by Size | Traction X";
const PAGE_DESC =
  "Browse hundreds of custom trade show booths built by Traction X — 10×10 in-lines, 10×20 endcaps, 20×20 islands and large-format activations. Filter the gallery by booth size.";

export const Route = createFileRoute("/gallery")({
  validateSearch: (search: Record<string, unknown>) => ({
    size: typeof search.size === "string" && search.size ? search.size : undefined,
  }),

  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: `${SITE.url}/gallery` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/gallery` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Traction X trade show booth gallery",
          description: PAGE_DESC,
          url: `${SITE.url}/gallery`,
numberOfItems: IMAGES.length,
        }),
      },
    ],
  }),
  component: GalleryPage,
});

const SHORTLIST_KEY = "tx-gallery-shortlist";

function GalleryPage() {
  const { size: rawSize } = Route.useSearch();
  const size = rawSize ?? "";
  const navigate = useNavigate({ from: "/gallery" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const { openDesign } = useCta();
  const [saved, setSaved] = useState<string[]>([]);

  // Shortlist survives a refresh so a visitor can come back and finish.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SHORTLIST_KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSave = (url: string) => {
    setSaved((prev) => {
      const next = prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url];
      try {
        window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const results = useMemo(
    () => (size ? IMAGES.filter((i) => i.size === size) : IMAGES),
    [size]
  );
  const shown = results.slice(0, limit);

  const chooseSize = (value: string) => {
    setLimit(PAGE);
    setLightbox(null);
    navigate({ search: { size: value || undefined }, resetScroll: false });
  };


  return (
    <div className="min-h-dvh bg-black text-white font-sans antialiased">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/50 mb-5">
            Project gallery
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.02] max-w-4xl">
            Custom{" "}
            <span className="text-[oklch(0.78_0.13_300)]">Trade Show Booths</span>{" "}
            We've Built
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            {IMAGES.length} booths from our project archive — 10×10 in-lines to
            large-format island activations. Every one of these designs can be
            rented or purchased; the build is the same either way. Filter by
            footprint, then click any image to view it full-size.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/60">
            <span className="border border-white/15 rounded-full px-3 py-1.5">
              {IMAGES.length} projects
            </span>
            <span className="border border-white/15 rounded-full px-3 py-1.5">
              Rent or buy the same design
            </span>
            <span className="border border-white/15 rounded-full px-3 py-1.5">
              Custom fabrication
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton source="gallery-hero" />
            <Link
              to="/trade-show-booth-rental-pricing"
              className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              See starting prices
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <span className="block text-xs uppercase tracking-[0.24em] text-white/60 mb-3 font-semibold">
          Filter by booth size
        </span>
        <div className="flex flex-wrap gap-2.5">
          <Chip active={size === ""} onClick={() => chooseSize("")}>
            All ({IMAGES.length})
          </Chip>
          {SIZE_FILTERS.map((s) => (
            <Chip key={s} active={size === s} onClick={() => chooseSize(s)}>
              {sizeLabel(s)}
            </Chip>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/50">
          Showing {shown.length} of {results.length}
          {size ? ` ${sizeLabel(size).toLowerCase()} booths` : " booths"}.
        </p>
      </section>

      {/* Gallery grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {shown.map((img, i) => (
            <div key={`${img.url}-${i}`} className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(img.url);
              }}
              aria-pressed={saved.includes(img.url)}
              aria-label={saved.includes(img.url) ? "Remove from shortlist" : "Save to shortlist"}
              className={`absolute top-2 right-2 z-10 h-8 w-8 rounded-full border text-sm leading-none transition ${
                saved.includes(img.url)
                  ? "bg-[oklch(0.78_0.13_300)] border-transparent text-black"
                  : "bg-black/60 border-white/25 text-white/80 hover:bg-black/80"
              }`}
            >
              ♥
            </button>
            <button
              onClick={() => setLightbox(i)}
              className="group relative block w-full aspect-square overflow-hidden rounded-lg bg-white/[0.03] border border-white/10 hover:border-[oklch(0.78_0.13_300)]/60 transition"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              <span className="absolute bottom-2 left-2 right-2 text-left text-[11px] uppercase tracking-widest text-white/85 opacity-0 group-hover:opacity-100 transition">
                {sizeLabel(img.size)}
              </span>
            </button>
            </div>
          ))}
        </div>

        {results.length > limit && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className="px-8 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
            >
              Load more booths ({results.length - limit} remaining)
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            See something you like?
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Send us the show, dates and booth footprint. We send preliminary
            concept direction and investment within two business days; full
            design and a costed BOM typically develop over one to two weeks.
            Rent it or buy it; the design and fabrication quality are identical.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <QuoteButton source="gallery" />
            <a
              href="tel:+17824092527"
              className="border border-white/25 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10"
            >
              +1-782-409-2527
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <DesignCtaBand source="gallery" />
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-white/50 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Traction X</span>
          <div className="flex items-center gap-6">
            <a href="tel:+17824092527" className="hover:text-white">
              +1-782-409-2527
            </a>
            <a href="mailto:info@tractionx.ca" className="hover:text-white">
              info@tractionx.ca
            </a>
          </div>
        </div>
      </footer>

      {/* Shortlist bar */}
      {saved.length > 0 && lightbox === null && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,44rem)]">
          <div className="rounded-2xl border border-[oklch(0.78_0.13_300)]/40 bg-black/95 backdrop-blur px-5 py-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
            <div className="text-sm text-white/80">
              <span className="font-semibold text-white">{saved.length}</span> booth
              {saved.length === 1 ? "" : "s"} shortlisted — send them to a designer and get a
              concept plus starting investment back.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  openDesign({ source: `gallery-shortlist-${saved.length}` })
                }
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90"
              >
                Send my shortlist
              </button>
              <button
                type="button"
                onClick={() => {
                  setSaved([]);
                  try {
                    window.localStorage.removeItem(SHORTLIST_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
                className="text-xs text-white/50 hover:text-white px-2"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && shown[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) =>
                v === null ? null : (v - 1 + shown.length) % shown.length
              );
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl"
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={shown[lightbox].url}
            alt={shown[lightbox].alt}
            className="max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? null : (v + 1) % shown.length));
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl"
            aria-label="Next"
          >
            ›
          </button>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-white/60">
              {lightbox + 1} / {shown.length}
            </span>
            <button
              type="button"
              onClick={() => toggleSave(shown[lightbox]!.url)}
              className="text-xs px-3 py-2 rounded-lg border border-white/25 text-white hover:bg-white/10"
            >
              {saved.includes(shown[lightbox]!.url) ? "♥ Saved" : "♥ Save to shortlist"}
            </button>
            <button
              type="button"
              onClick={() =>
                openDesign({
                  size: shown[lightbox]!.size,
                  source: "gallery-lightbox",
                })
              }
              className="text-xs px-3 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90"
            >
              Price a booth like this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
          : "border-white/15 text-white/70 hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}
