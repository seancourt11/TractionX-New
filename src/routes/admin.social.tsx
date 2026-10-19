import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { noindexMeta } from "@/lib/seo";
import { toast } from "sonner";
import { Check, Copy, Download, ExternalLink, Images } from "lucide-react";
import {
  THEME_LABEL,
  CTA_LABEL,
  FORMAT_LABEL,
  SOCIAL_THEMES,
  type SocialTheme,
  type SocialFormat,
} from "@/data/social-posts";
import {
  RESOLVED_POSTS,
  fullCaption,
  downloadCsv,
  readPosted,
  writePosted,
  visualSpec,
  type ResolvedPost,
} from "@/lib/social";
import {
  SOCIAL_SIZES,
  SOCIAL_SIZE_ORDER,
  renderDataUrl,
  renderVisual,
  downloadVisual,
  type SocialSize,
} from "@/lib/social-visual";

export const Route = createFileRoute("/admin/social")({
  head: () => ({
    meta: [
      { title: "Social library — Traction X workspace" },
      {
        name: "description",
        content:
          "Sixty LinkedIn and Instagram posts with platform-sized visuals built from real catalogue booths, products and venue photography.",
      },
      ...noindexMeta(),
    ],
  }),
  component: SocialPage,
});

type ThemeFilter = SocialTheme | "all";
type FormatFilter = SocialFormat | "all";

const FORMATS: SocialFormat[] = ["photo", "promise", "overlay", "split", "carousel"];

function SocialPage() {
  const [theme, setTheme] = useState<ThemeFilter>("all");
  const [format, setFormat] = useState<FormatFilter>("all");
  const [query, setQuery] = useState("");
  const [hidePosted, setHidePosted] = useState(false);
  const [withPromises, setWithPromises] = useState(true);
  const [posted, setPosted] = useState<string[]>([]);

  useEffect(() => setPosted(readPosted()), []);

  const togglePosted = (id: string) => {
    setPosted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writePosted(next);
      return next;
    });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOLVED_POSTS.filter((p) => {
      if (theme !== "all" && p.theme !== theme) return false;
      if (format !== "all" && p.visualFormat !== format) return false;
      if (hidePosted && posted.includes(p.id)) return false;
      if (!q) return true;
      return [p.title, p.linkedin, p.instagram, p.city, p.venue, p.href, p.hashtags.join(" ")]
        .filter(Boolean)
        .some((s) => (s as string).toLowerCase().includes(q));
    }).sort((a, b) => a.week - b.week || a.theme.localeCompare(b.theme));
  }, [theme, format, query, hidePosted, posted]);

  const weeks = useMemo(() => {
    const map = new Map<number, ResolvedPost[]>();
    for (const p of visible) map.set(p.week, [...(map.get(p.week) ?? []), p]);
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [visible]);

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Social library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {RESOLVED_POSTS.length} posts across 12 weeks — captions plus LinkedIn and Instagram
            sized visuals rendered from real catalogue, venue and portfolio photography.{" "}
            {posted.length} marked posted.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadCsv(visible)}>
            <Download className="h-4 w-4" /> Export {visible.length} posts to CSV
          </Button>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={theme === "all" ? "default" : "outline"} onClick={() => setTheme("all")}>
          All themes ({RESOLVED_POSTS.length})
        </Button>
        {SOCIAL_THEMES.map((t) => {
          const count = RESOLVED_POSTS.filter((p) => p.theme === t).length;
          return (
            <Button key={t} size="sm" variant={theme === t ? "default" : "outline"} onClick={() => setTheme(t)}>
              {THEME_LABEL[t]} ({count})
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Visual
        </span>
        <Button size="sm" variant={format === "all" ? "default" : "outline"} onClick={() => setFormat("all")}>
          All
        </Button>
        {FORMATS.map((f) => {
          const count = RESOLVED_POSTS.filter((p) => p.visualFormat === f).length;
          if (!count) return null;
          return (
            <Button key={f} size="sm" variant={format === f ? "default" : "outline"} onClick={() => setFormat(f)}>
              {FORMAT_LABEL[f]} ({count})
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search captions, cities, venues, links…"
          className="max-w-sm"
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={hidePosted}
            onChange={(e) => setHidePosted(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Hide posted
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={withPromises}
            onChange={(e) => setWithPromises(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Bake promise badges into visuals
        </label>
      </div>

      {weeks.length === 0 && (
        <p className="rounded-lg border border-border/60 p-8 text-center text-sm text-muted-foreground">
          Nothing matches that filter.
        </p>
      )}

      {weeks.map(([week, items]) => (
        <section key={week} className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Week {week} · {items.length} post{items.length === 1 ? "" : "s"}
          </h2>
          <div className="grid gap-4 xl:grid-cols-2">
            {items.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                withPromises={withPromises}
                posted={posted.includes(post.id)}
                onToggle={() => togglePosted(post.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function PostCard({
  post,
  withPromises,
  posted,
  onToggle,
}: {
  post: ResolvedPost;
  withPromises: boolean;
  posted: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`rounded-xl border p-4 transition-colors ${
        posted ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card/40"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {THEME_LABEL[post.theme]}
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              {CTA_LABEL[post.cta]}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {FORMAT_LABEL[post.visualFormat]}
            </Badge>
            {post.city && (
              <Badge variant="outline" className="text-[10px]">
                {post.venue ?? post.city}
              </Badge>
            )}
          </div>
          <h3 className="mt-2 font-heading text-base font-semibold">{post.title}</h3>
        </div>
        <Button size="sm" variant={posted ? "default" : "outline"} className="gap-2" onClick={onToggle}>
          <Check className="h-3.5 w-3.5" /> {posted ? "Posted" : "Mark posted"}
        </Button>
      </div>

      <VisualStudio post={post} withPromises={withPromises} />

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Caption post={post} platform="linkedin" label="LinkedIn" />
        <Caption post={post} platform="instagram" label="Instagram" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <a
          href={post.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" /> {post.href}
        </a>
        <span className="truncate">{post.hashtags.join(" ")}</span>
      </div>
    </article>
  );
}

const FILE_SUFFIX: Record<SocialSize, string> = {
  linkedin: "linkedin",
  ig_square: "instagram-square",
  ig_vertical: "instagram-vertical",
};

function VisualStudio({ post, withPromises }: { post: ResolvedPost; withPromises: boolean }) {
  const [previews, setPreviews] = useState<Partial<Record<SocialSize, string>>>({});
  const [busy, setBusy] = useState(false);

  const isCarousel = post.visualFormat === "carousel";
  const frameCount = isCarousel ? post.carouselFrames.length : 1;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const out: Partial<Record<SocialSize, string>> = {};
      for (const size of SOCIAL_SIZE_ORDER) {
        out[size] = await renderDataUrl(visualSpec(post, { withPromises, frame: 0 }), size);
      }
      if (!cancelled) setPreviews(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [post, withPromises]);

  const download = useCallback(
    async (size: SocialSize) => {
      setBusy(true);
      try {
        if (isCarousel && frameCount > 1) {
          const JSZip = (await import("jszip")).default;
          const zip = new JSZip();
          for (let i = 0; i < frameCount; i++) {
            const canvas = await renderVisual(visualSpec(post, { withPromises, frame: i }), size);
            const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
            if (blob) zip.file(`${post.id}-${FILE_SUFFIX[size]}-${i + 1}.png`, blob);
          }
          const out = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(out);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${post.id}-${FILE_SUFFIX[size]}-carousel.zip`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success(`${frameCount} carousel frames downloaded`);
          return;
        }
        await downloadVisual(
          visualSpec(post, { withPromises, frame: 0 }),
          size,
          `${post.id}-${FILE_SUFFIX[size]}.png`,
        );
        toast.success(`${SOCIAL_SIZES[size].label} downloaded`);
      } finally {
        setBusy(false);
      }
    },
    [post, withPromises, isCarousel, frameCount],
  );

  const downloadAll = useCallback(async () => {
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const size of SOCIAL_SIZE_ORDER) {
        for (let i = 0; i < frameCount; i++) {
          const canvas = await renderVisual(visualSpec(post, { withPromises, frame: i }), size);
          const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
          if (!blob) continue;
          const name =
            frameCount > 1
              ? `${post.id}-${FILE_SUFFIX[size]}-${i + 1}.png`
              : `${post.id}-${FILE_SUFFIX[size]}.png`;
          zip.file(name, blob);
        }
      }
      const out = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(out);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${post.id}-visuals.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("All sizes downloaded");
    } finally {
      setBusy(false);
    }
  }, [post, withPromises, frameCount]);

  return (
    <div className="mt-3 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {SOCIAL_SIZE_ORDER.map((size) => (
          <figure key={size} className="space-y-1">
            {previews[size] ? (
              <img
                src={previews[size]}
                alt={`${post.title} — ${SOCIAL_SIZES[size].label}`}
                className="w-full rounded-lg border border-border/50 object-contain"
              />
            ) : (
              <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
            )}
            <figcaption className="text-[10px] text-muted-foreground">
              {SOCIAL_SIZES[size].label}
            </figcaption>
          </figure>
        ))}
      </div>

      {post.assetLabel && <p className="text-xs text-muted-foreground">{post.assetLabel}</p>}

      {withPromises && post.promiseBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.promiseBadges.map((b) => (
            <Badge key={b} variant="secondary" className="text-[10px]">
              {b}
            </Badge>
          ))}
        </div>
      )}

      {isCarousel && frameCount > 1 && (
        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Images className="h-3 w-3" /> {frameCount}-frame carousel — downloads as a numbered ZIP
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {SOCIAL_SIZE_ORDER.map((size) => (
          <Button
            key={size}
            size="sm"
            variant="outline"
            disabled={busy}
            className="h-7 gap-1 px-2 text-xs"
            onClick={() => download(size)}
          >
            <Download className="h-3 w-3" /> {SOCIAL_SIZES[size].label}
          </Button>
        ))}
        <Button size="sm" disabled={busy} className="h-7 gap-1 px-2 text-xs" onClick={downloadAll}>
          <Download className="h-3 w-3" /> All sizes
        </Button>
      </div>
    </div>
  );
}

function Caption({
  post,
  platform,
  label,
}: {
  post: ResolvedPost;
  platform: "linkedin" | "instagram";
  label: string;
}) {
  const text = fullCaption(post, platform);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} caption copied`);
    } catch {
      toast.error("Clipboard blocked — select the text and copy manually");
    }
  };
  return (
    <div className="rounded-lg border border-border/50 bg-background/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label} · {text.length} chars
        </span>
        <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" onClick={copy}>
          <Copy className="h-3 w-3" /> Copy
        </Button>
      </div>
      <p className="mt-2 whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground/90">{text}</p>
    </div>
  );
}
