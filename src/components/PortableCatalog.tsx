import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PORTABLE_CATEGORIES, PORTABLE_PRODUCTS, productsInCategory, type PortableProduct } from "@/data/portable-products";
import { portableImage } from "@/data/portable-images";
import { PORTABLE_FOOTPRINTS, footprintsFor } from "@/lib/portable-size";
import { useCta } from "@/components/GlobalCta";

const PAGE = 30;

const chip = (active: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition ${
    active
      ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/15 text-white"
      : "border-white/15 text-white/70 hover:border-white/40"
  }`;

export function ProductCard({ p, priority = false }: { p: PortableProduct; priority?: boolean }) {
  const img = portableImage(p.slug, p.category);
  const { openQuote } = useCta();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[oklch(0.78_0.13_300)]">
      <Link
        to="/portable-displays/$category/$slug"
        params={{ category: p.category, slug: p.slug }}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
          {img && (
            <img
              src={img}
              alt={`${p.name} portable trade show display`}
              loading={priority ? "eager" : "lazy"}
              width={900}
              height={675}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Quote on request
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
            {p.setup}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="font-display text-base font-semibold leading-snug">{p.name}</div>
          <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3">{p.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] text-white/45">
            {footprintsFor(p).map((f) => (
              <span key={f} className="rounded-full border border-white/10 px-2 py-0.5">
                {PORTABLE_FOOTPRINTS.find((x) => x.slug === f)?.short}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => openQuote({ source: `portable-card-${p.slug}` })}
        className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
      >
        Request a quote
      </button>
    </div>
  );
}

export function CategoryTiles({ categories = PORTABLE_CATEGORIES }: { categories?: typeof PORTABLE_CATEGORIES }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((c) => {
        const items = productsInCategory(c.slug);
        const hero = items.map((p) => portableImage(p.slug, p.category)).find(Boolean);
        return (
          <Link
            key={c.slug}
            to="/portable-displays/$category"
            params={{ category: c.slug }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[oklch(0.78_0.13_300)]"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-white">
              {hero && (
                <img
                  src={hero}
                  alt={`${c.label} — portable trade show displays`}
                  loading="lazy"
                  width={900}
                  height={563}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold leading-snug">{c.label}</h3>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-white/50">{items.length} products</span>
                <span className="text-[oklch(0.78_0.13_300)]">Request a quote</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function FootprintChips({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PORTABLE_FOOTPRINTS.map((f) => (
        <Link
          key={f.slug}
          to="/portable-displays/size/$size"
          params={{ size: f.slug }}
          className={chip(active === f.slug)}
        >
          {f.short}
        </Link>
      ))}
    </div>
  );
}

export function PortableCatalog({
  initialCategory = "",
  heading = "Browse the portable display catalog",
  intro = "Every portable trade show display, booth package and accessory we print, pack and support. Filter by size or category, or search by name.",
}: {
  initialCategory?: string;
  heading?: string;
  intro?: string;
}) {
  const [cat, setCat] = useState(initialCategory);
  const [fp, setFp] = useState("");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PORTABLE_PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!fp || footprintsFor(p).includes(fp as never)) &&
        (!needle ||
          p.name.toLowerCase().includes(needle) ||
          p.blurb.toLowerCase().includes(needle) ||
          p.bestFor.toLowerCase().includes(needle)),
    );
  }, [cat, fp, q]);

  const reset = () => setLimit(PAGE);

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{heading}</h2>
      <p className="mt-3 max-w-3xl text-white/70 leading-relaxed">{intro}</p>

      <div className="sticky top-16 z-30 -mx-4 mt-8 border-y border-white/10 bg-black/85 px-4 py-4 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          <span className="self-center text-xs uppercase tracking-widest text-white/40">Size</span>
          <button onClick={() => { setFp(""); reset(); }} className={chip(fp === "")}>
            Any size
          </button>
          {PORTABLE_FOOTPRINTS.map((f) => (
            <button key={f.slug} onClick={() => { setFp(f.slug); reset(); }} className={chip(fp === f.slug)}>
              {f.short}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="self-center text-xs uppercase tracking-widest text-white/40">Type</span>
          <button onClick={() => { setCat(""); reset(); }} className={chip(cat === "")}>
            All ({PORTABLE_PRODUCTS.length})
          </button>
          {PORTABLE_CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => { setCat(c.slug); reset(); }} className={chip(cat === c.slug)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); reset(); }}
            placeholder="Search displays, tents, counters, flags…"
            className="w-full sm:w-80 rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm outline-none focus:border-[oklch(0.78_0.13_300)]"
          />
          <span className="text-sm text-white/50">{results.length} products</span>
          {fp && (
            <Link
              to="/portable-displays/size/$size"
              params={{ size: fp }}
              className="text-sm text-[oklch(0.78_0.13_300)] hover:underline"
            >
              Open the full {PORTABLE_FOOTPRINTS.find((f) => f.slug === fp)?.short} page →
            </Link>
          )}
          {cat && (
            <Link
              to="/portable-displays/$category"
              params={{ category: cat }}
              className="text-sm text-[oklch(0.78_0.13_300)] hover:underline"
            >
              Open the full {PORTABLE_CATEGORIES.find((c) => c.slug === cat)?.label} page →
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.slice(0, limit).map((p, i) => (
          <ProductCard key={p.slug} p={p} priority={i < 3} />
        ))}
      </div>

      {results.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setLimit((l) => l + PAGE)}
            className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/10"
          >
            Load more ({results.length - limit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
