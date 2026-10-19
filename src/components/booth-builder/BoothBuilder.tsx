import { Suspense, lazy, useEffect, useState } from "react";

import { BuilderProvider, useBuilder } from "@/lib/booth-builder/store";
import { mmToFt } from "@/lib/booth-builder/presets";
import { isWall, mmLabel, wallWidthMm } from "@/lib/booth-builder/project";
import { saveDesign } from "@/lib/booth-builder/storage";
import { CAMERA_VIEW_IDS, PACK_VIEW_IDS, cameraView, type CameraViewId } from "@/lib/booth-builder/cameras";
import { generateConceptPack } from "@/lib/booth-builder/concept-pack";
import type { BoothProject } from "@/lib/booth-builder/types";

import { HandoffDialog } from "./HandoffDialog";
import { LibraryPanel } from "./LibraryPanel";
import { Plan2D } from "./Plan2D";
import { PropertiesPanel } from "./PropertiesPanel";
import { RulesBar } from "./RulesBar";
import { StartScreen } from "./StartScreen";
import type { CaptureRequest, CaptureShot } from "./View3D";

// Three.js only runs in the browser, so the 3D view is loaded after hydration.
const View3D = lazy(() => import("./View3D"));

export type RenderQuality = "fast" | "high" | "presentation";

const QUALITY_LABEL: Record<RenderQuality, string> = {
  fast: "Fast",
  high: "High",
  presentation: "Best",
};

function Toolbar({
  view,
  setView,
  onFinish,
  saveId,
  onSaved,
  presentation,
  setPresentation,
  turntable,
  setTurntable,
  quality,
  setQuality,
  onExport,
  onPack,
  busy,
}: {
  view: "2d" | "3d";
  setView: (v: "2d" | "3d") => void;
  onFinish: () => void;
  saveId: string | null;
  onSaved: (id: string) => void;
  presentation: boolean;
  setPresentation: (v: boolean) => void;
  turntable: boolean;
  setTurntable: (v: boolean) => void;
  quality: RenderQuality;
  setQuality: (v: RenderQuality) => void;
  onExport: (scale: number) => void;
  onPack: () => void;
  busy: string | null;
}) {
  const { project, undo, canUndo, lastAction, reset } = useBuilder();
  const runMm = project.design.objects.filter(isWall).reduce((s, o) => s + wallWidthMm(o), 0);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3">
      <div className="mr-auto">
        <p className="text-sm font-semibold text-white">{project.project.projectName}</p>
        <p className="text-[11px] capitalize text-white/45">
          {Math.round(mmToFt(project.project.widthMm))} × {Math.round(mmToFt(project.project.depthMm))} ft{" "}
          {project.project.boothType} · {project.design.objects.length} object
          {project.design.objects.length === 1 ? "" : "s"}
          {runMm > 0 && ` · ${mmLabel(runMm)} of wall`}
        </p>
      </div>

      {busy ? (
        <span className="text-[11px] text-[oklch(0.78_0.13_300)]">{busy}</span>
      ) : (
        lastAction && <span className="hidden text-[11px] text-white/40 md:inline">{lastAction}</span>
      )}

      <button
        type="button"
        onClick={undo}
        disabled={!canUndo}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition hover:border-white/40 disabled:opacity-30"
      >
        Undo
      </button>

      <div className="flex overflow-hidden rounded-lg border border-white/15">
        {(["2d", "3d"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-3.5 py-1.5 text-xs font-semibold uppercase transition ${
              view === v ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "3d" && (
        <>
          <button
            type="button"
            onClick={() => setPresentation(!presentation)}
            className={`rounded-lg border px-3 py-1.5 text-xs transition ${
              presentation
                ? "border-[oklch(0.78_0.13_300)] text-white"
                : "border-white/15 text-white/80 hover:border-white/40"
            }`}
          >
            Presentation view
          </button>
          <button
            type="button"
            onClick={() => setTurntable(!turntable)}
            className={`rounded-lg border px-3 py-1.5 text-xs transition ${
              turntable
                ? "border-[oklch(0.78_0.13_300)] text-white"
                : "border-white/15 text-white/80 hover:border-white/40"
            }`}
          >
            {turntable ? "Stop spin" : "Slow spin"}
          </button>
          <div
            className="flex overflow-hidden rounded-lg border border-white/15"
            title="Render quality — use Fast on an older laptop"
          >
            {(["fast", "high", "presentation"] as const).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                className={`px-2.5 py-1.5 text-xs transition ${
                  quality === q ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {QUALITY_LABEL[q]}
              </button>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-lg border border-white/15">
            <button
              type="button"
              onClick={() => onExport(2)}
              className="px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
            >
              Download image
            </button>
            <button
              type="button"
              onClick={() => onExport(3)}
              title="Larger file, best for print"
              className="border-l border-white/15 px-2 py-1.5 text-[11px] text-white/55 transition hover:bg-white/10"
            >
              3×
            </button>
          </div>
          <button
            type="button"
            onClick={onPack}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition hover:border-white/40"
          >
            Concept pack (PDF)
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => {
          const entry = saveDesign(project, saveId ?? undefined);
          onSaved(entry.id);
          setSavedAt("Saved to this browser");
          window.setTimeout(() => setSavedAt(null), 2500);
        }}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/80 transition hover:border-white/40"
      >
        {savedAt ?? "Save"}
      </button>

      <button
        type="button"
        onClick={onFinish}
        className="rounded-lg bg-[oklch(0.78_0.13_300)] px-3.5 py-1.5 text-xs font-semibold text-black transition hover:opacity-90"
      >
        Turn this into a real booth
      </button>

      <button
        type="button"
        onClick={reset}
        className="rounded-lg px-2 py-1.5 text-xs text-white/40 transition hover:text-white/80"
      >
        Start over
      </button>
    </div>
  );
}

/** Camera angle chips shown over the 3D view. */
function ViewChips({
  viewId,
  onPick,
}: {
  viewId: CameraViewId;
  onPick: (id: CameraViewId) => void;
}) {
  const { project } = useBuilder();
  const widthM = project.project.widthMm / 1000;
  const depthM = project.project.depthMm / 1000;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex flex-wrap justify-center gap-1.5 px-3">
      {CAMERA_VIEW_IDS.map((id) => {
        const v = cameraView(id, widthM, depthM);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onPick(id)}
            className={`pointer-events-auto rounded-full border px-3 py-1 text-[11px] backdrop-blur transition ${
              viewId === id
                ? "border-[oklch(0.78_0.13_300)] bg-black/70 text-white"
                : "border-white/15 bg-black/50 text-white/65 hover:text-white"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

function Editor({ saveId, onSaved }: { saveId: string | null; onSaved: (id: string) => void }) {
  const { project } = useBuilder();
  const [view, setView] = useState<"2d" | "3d">("2d");
  const [mounted, setMounted] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const [turntable, setTurntable] = useState(false);
  const [quality, setQuality] = useState<RenderQuality>("high");
  const [viewId, setViewId] = useState<CameraViewId>("hero");
  const [viewNonce, setViewNonce] = useState(0);
  const [capture, setCapture] = useState<CaptureRequest | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const nextNonce = () => Date.now();

  function downloadImage(scale: number) {
    setBusy("Rendering image…");
    setCapture({
      nonce: nextNonce(),
      views: [viewId],
      scale,
      format: "png",
      onDone: (shots: CaptureShot[]) => {
        const shot = shots[0];
        if (shot) {
          const a = document.createElement("a");
          a.href = shot.dataUrl;
          a.download = `${
            project.project.projectName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "booth"
          }-${shot.id}.png`;
          a.click();
        }
        setCapture(null);
        setBusy(null);
      },
    });
  }

  function buildPack() {
    setBusy("Building your concept pack…");
    setCapture({
      nonce: nextNonce(),
      views: PACK_VIEW_IDS,
      scale: 2,
      format: "jpeg",
      onDone: (shots: CaptureShot[]) => {
        generateConceptPack(project, shots);
        setCapture(null);
        setBusy(null);
      },
    });
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.015]">
        <Toolbar
          view={view}
          setView={setView}
          onFinish={() => setHandoff(true)}
          saveId={saveId}
          onSaved={onSaved}
          presentation={presentation}
          setPresentation={setPresentation}
          turntable={turntable}
          setTurntable={setTurntable}
          quality={quality}
          setQuality={setQuality}
          onExport={downloadImage}
          onPack={buildPack}
          busy={busy}
        />
        <RulesBar />
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)_300px]">
          <aside className="max-h-[70vh] overflow-y-auto border-b border-white/10 lg:max-h-[calc(100vh-13rem)] lg:border-b-0 lg:border-r">
            <LibraryPanel />
          </aside>

          <div className="relative min-h-[420px] bg-black/40 lg:min-h-[calc(100vh-13rem)]">
            {view === "2d" ? (
              <Plan2D />
            ) : mounted ? (
              <Suspense
                fallback={<div className="grid h-full place-items-center text-xs text-white/40">Loading 3D…</div>}
              >
                <View3D
                  presentation={presentation}
                  viewId={viewId}
                  viewNonce={viewNonce}
                  turntable={turntable}
                  capture={capture}
                  quality={quality}
                />
                <ViewChips
                  viewId={viewId}
                  onPick={(id) => {
                    setViewId(id);
                    setViewNonce((n) => n + 1);
                  }}
                />
              </Suspense>
            ) : null}
          </div>

          <aside className="max-h-[70vh] overflow-y-auto border-t border-white/10 lg:max-h-[calc(100vh-13rem)] lg:border-l lg:border-t-0">
            <PropertiesPanel />
          </aside>
        </div>
      </div>

      {handoff && <HandoffDialog onClose={() => setHandoff(false)} />}
    </div>
  );
}

export function BoothBuilder() {
  const [project, setProject] = useState<BoothProject | null>(null);
  const [saveId, setSaveId] = useState<string | null>(null);

  if (!project)
    return (
      <StartScreen
        onStart={(p, id) => {
          setProject(p);
          setSaveId(id ?? null);
        }}
      />
    );

  return (
    <BuilderProvider
      initial={project}
      onExit={() => {
        setProject(null);
        setSaveId(null);
      }}
    >
      <Editor saveId={saveId} onSaved={setSaveId} />
    </BuilderProvider>
  );
}
