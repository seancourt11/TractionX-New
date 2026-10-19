import { usableImages } from "@/lib/booth-builder/brandkit";
import { useBuilder } from "@/lib/booth-builder/store";
import type { BoothObject, LogoPlacement } from "@/lib/booth-builder/types";

const PLACEMENTS: { id: LogoPlacement; label: string }[] = [
  { id: "top_center", label: "Top centre" },
  { id: "top_left", label: "Top left" },
  { id: "center", label: "Centred" },
  { id: "none", label: "No logo" },
];

/** Per-surface brand override: which photo sits on it, and where the logo goes. */
export function SurfaceBrandControls({ object }: { object: BoothObject }) {
  const { project, commit } = useBuilder();
  const images = usableImages(project);
  const graphic = object.graphic ?? {};

  const patch = (label: string, next: Partial<typeof graphic>) =>
    commit(label, (d) => {
      const t = d.design.objects.find((o) => o.id === object.id);
      if (t) t.graphic = { ...(t.graphic ?? {}), ...next };
    });

  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40">Brand on this surface</p>

      {images.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => patch("Photo removed", { imageUrl: undefined })}
              className={`aspect-[4/3] rounded-lg border text-[10px] text-white/60 transition ${
                graphic.imageUrl ? "border-white/10 hover:border-white/30" : "border-[oklch(0.78_0.13_300)] text-white"
              }`}
            >
              No photo
            </button>
            {images.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => patch("Photo applied", { imageUrl: img.url })}
                className={`aspect-[4/3] overflow-hidden rounded-lg border transition ${
                  graphic.imageUrl === img.url
                    ? "border-[oklch(0.78_0.13_300)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img src={img.url} alt="Brand photography" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-white/35">
            Photos come from your website or the files you attached, in the Branding tab.
          </p>
        </>
      )}

      <p className="mb-2 mt-4 text-[10px] uppercase tracking-[0.18em] text-white/30">Logo position</p>
      <div className="grid grid-cols-2 gap-2">
        {PLACEMENTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => patch(`Logo ${p.label.toLowerCase()}`, { logoPlacement: p.id })}
            className={`rounded-lg border px-3 py-2 text-xs transition ${
              (graphic.logoPlacement ?? "none") === p.id
                ? "border-[oklch(0.78_0.13_300)] text-white"
                : "border-white/10 text-white/60 hover:border-white/30"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {!project.branding.logoUrl && (
        <p className="mt-2 text-[11px] text-white/35">
          Add your logo in the Branding tab and it will appear here.
        </p>
      )}
    </div>
  );
}
