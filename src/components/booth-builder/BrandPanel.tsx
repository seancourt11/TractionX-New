import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { FileAttach } from "@/components/FileAttach";
import { applyBrandKit, applyPulledBrand } from "@/lib/booth-builder/brandkit";
import { proxiedImage } from "@/lib/booth-builder/brand-image";
import { extractBranding } from "@/lib/booth-builder/branding.functions";
import { useBuilder } from "@/lib/booth-builder/store";
import type { BrandAssetKind, BrandImage, BrandMode } from "@/lib/booth-builder/types";

const MODES: { id: BrandMode; label: string; note: string }[] = [
  { id: "photo", label: "Photos + colour", note: "Your imagery on the big surfaces, logo placed over it." },
  { id: "color", label: "Colour only", note: "Brand colours and your logo — clean, no photography." },
];

/** Pull colours, logo and photography from the customer's website, then dress the booth. */
export function BrandPanel() {
  const { project, commit } = useBuilder();
  const pull = useServerFn(extractBranding);
  const [site, setSite] = useState(project.branding.website);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [headline, setHeadline] = useState("");

  const branding = project.branding;
  const mode: BrandMode = branding.mode ?? "color";
  const images = branding.images ?? [];
  const assets = branding.assets ?? [];
  const objectCount = project.design.objects.length;

  async function run() {
    if (!site.trim() || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const res = await pull({ data: { website: site } });
      setNote(res.message);
      setHeadline(res.ok ? res.headline : "");
      if (res.ok) {
        commit("Pulled your brand", (d) => {
          applyPulledBrand(d, res);
          // Dress the booth straight away so the artwork is visible.
          if (d.design.objects.length) applyBrandKit(d);
        });
      }
    } catch {
      setNote("That didn't go through — enter your colours below instead.");
    } finally {
      setBusy(false);
    }
  }


  function setMode(next: BrandMode) {
    commit(next === "photo" ? "Photo look" : "Colour look", (d) => {
      d.branding.mode = next;
    });
  }

  function setColor(key: "primaryColor" | "secondaryColor", value: string) {
    commit("Changed a brand colour", (d) => {
      d.branding[key] = value;
    });
  }

  function toggleImage(url: string) {
    commit("Changed which photos we use", (d) => {
      const img = (d.branding.images ?? []).find((i) => i.url === url);
      if (img) img.use = !img.use;
    });
  }

  /** Uploaded files live as object URLs for this session; names travel with the enquiry. */
  function addFiles(kind: BrandAssetKind, files: File[]) {
    if (!files.length) return;
    const made = files.map((f) => ({
      id: `${kind}_${f.name}_${f.size}`,
      kind,
      name: f.name,
      sizeBytes: f.size,
      url: kind === "guidelines" ? undefined : URL.createObjectURL(f),
    }));
    commit(`Added ${files.length} brand file${files.length === 1 ? "" : "s"}`, (d) => {
      const existing = (d.branding.assets ?? []).filter((a) => a.kind !== kind);
      d.branding.assets = [...existing, ...made];
      if (kind === "photo") {
        const others = (d.branding.images ?? []).filter((i) => i.source !== "upload");
        d.branding.images = [
          ...made.map<BrandImage>((m, i) => ({
            url: m.url ?? "",
            role: i === 0 ? "hero" : "secondary",
            source: "upload",
            use: true,
          })),
          ...others,
        ];
        d.branding.mode = "photo";
      }
      if (kind === "logo" && made[0]?.url) d.branding.logoUrl = made[0].url;
    });
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Your brand</p>
      <p className="mt-1 text-[11px] leading-relaxed text-white/40">
        Give us your website and we&apos;ll pick up your logo, colours and photography.
      </p>

      <div className="mt-4 flex gap-2">
        <input
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="yourcompany.com"
          className="min-w-0 flex-1 rounded-lg border border-white/12 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:border-[oklch(0.78_0.13_300)] focus:outline-none"
        />
        <button
          type="button"
          onClick={() => void run()}
          disabled={busy || !site.trim()}
          className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-white/85 disabled:opacity-30"
        >
          {busy ? "Looking…" : "Pull"}
        </button>
      </div>

      {note && <p className="mt-2 text-[11px] leading-relaxed text-white/55">{note}</p>}
      {headline && <p className="mt-1 text-[11px] text-white/35">Found: “{headline}”</p>}

      {/* Two looks */}
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Look</p>
        <div className="mt-2 grid gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-lg border px-3 py-2.5 text-left transition ${
                mode === m.id
                  ? "border-[oklch(0.78_0.13_300)] bg-[oklch(0.78_0.13_300)]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/30"
              }`}
            >
              <span className="block text-xs font-semibold text-white">{m.label}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-white/45">{m.note}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={objectCount === 0}
        onClick={() => commit("Branded the booth", (d) => applyBrandKit(d))}
        className="mt-4 w-full rounded-lg bg-[oklch(0.78_0.13_300)] px-3 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-30"
      >
        Brand my booth
      </button>
      <p className="mt-2 text-[11px] leading-relaxed text-white/35">
        {objectCount === 0
          ? "Add a wall or two first, then we'll dress the whole booth in one go."
          : "Dresses every wall, counter, tower and storage room, and places your logo the way a designer would. Undo takes it all back."}
      </p>

      {/* Logo */}
      {(branding.logoUrl || branding.logoDarkUrl) && (
        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/30">Logo</p>
          <div className="flex flex-wrap items-center gap-3">
            {[branding.logoUrl, branding.logoDarkUrl].filter(Boolean).map((url) => (
              <img
                key={url}
                src={proxiedImage(url)}
                alt="Your logo"
                className="max-h-12 w-auto max-w-[45%] object-contain"
              />
            ))}
          </div>
        </div>
      )}

      {/* Photography */}
      {images.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Photography</p>
          <p className="mt-1 text-[11px] text-white/40">Tap to include or leave out an image.</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {images.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => toggleImage(img.url)}
                className={`aspect-[4/3] overflow-hidden rounded-lg border transition ${
                  img.use ? "border-[oklch(0.78_0.13_300)]" : "border-white/10 opacity-35"
                }`}
              >
                <img src={proxiedImage(img.url)} alt="Brand photography" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colours */}
      {(branding.palette?.length ?? 0) > 0 && (
        <div className="mt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Colours we found</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {branding.palette!.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setColor("primaryColor", hex)}
                title={`Use ${hex} as the primary colour`}
                className="h-7 w-7 rounded-md border border-white/20"
                style={{ background: hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-3">
        {(
          [
            ["primaryColor", "Primary colour"],
            ["secondaryColor", "Secondary colour"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between gap-3 text-[12px] text-white/70">
            {label}
            <span className="flex items-center gap-2">
              <input
                type="color"
                value={project.branding[key]}
                onChange={(e) => setColor(key, e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-white/15 bg-transparent"
              />
              <span className="text-[11px] text-white/40">{project.branding[key]}</span>
            </span>
          </label>
        ))}
      </div>

      {/* Brand kit uploads */}
      <div className="mt-7 border-t border-white/10 pt-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Brand kit</p>
        <p className="mt-1 text-[11px] leading-relaxed text-white/40">
          Attach your own files if the website pull missed something.
        </p>

        <FileAttach
          className="mt-4"
          name="brand-photos"
          label="Photos"
          hint="JPG, PNG or WebP — used on the booth right away"
          accept=".jpg,.jpeg,.png,.webp"
          onFilesChange={(f) => addFiles("photo", f)}
        />
        <FileAttach
          className="mt-4"
          name="brand-logo"
          label="Logo"
          hint="PNG or SVG, transparent background preferred"
          accept=".png,.svg,.jpg,.jpeg"
          multiple={false}
          onFilesChange={(f) => addFiles("logo", f)}
        />
        <FileAttach
          className="mt-4"
          name="brand-guidelines"
          label="Brand guidelines"
          hint="PDF — goes straight to our design team with your enquiry"
          accept=".pdf"
          multiple={false}
          onFilesChange={(f) => addFiles("guidelines", f)}
        />

        {assets.length > 0 && (
          <p className="mt-3 text-[11px] text-white/40">
            {assets.length} file{assets.length === 1 ? "" : "s"} attached — they travel with your
            enquiry.
          </p>
        )}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-white/30">
        Anything we pull from your site is used for concept mockups only — final print artwork is
        always produced with your team.
      </p>
    </div>
  );
}
