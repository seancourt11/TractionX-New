import { useRef, useState } from "react";

import { useBuilder } from "@/lib/booth-builder/store";
import { WALL_THICKNESS_MM, isWall, snapWall, wallBounds, wallWidthMm } from "@/lib/booth-builder/project";
import { FINISH_HEX, FLOORING_SWATCHES } from "@/lib/booth-builder/presets";
import { mmToFt } from "@/lib/booth-builder/presets";

/**
 * 2D floor plan. Drag walls to place them; they snap to the booth edges, to
 * other walls and to the modular grid, with light guides while dragging.
 */
/** Short dimension label used on the plan, e.g. "9.8 ft". */
const ftLabel = (mm: number) => `${Math.round(mmToFt(mm) * 10) / 10} ft`;

export function Plan2D() {
  const { project, selectedId, select, live, commit } = useBuilder();
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: string; dx: number; dz: number } | null>(null);
  const [guides, setGuides] = useState<{ x?: number; z?: number }>({});

  const floorHex =
    FLOORING_SWATCHES.find((f) => f.id === project.design.flooring.swatchId)?.hex ?? null;
  const W = project.project.widthMm;
  const D = project.project.depthMm;
  const pad = Math.max(W, D) * 0.12;

  function toBooth(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, z: 0 };
    const rect = svg.getBoundingClientRect();
    const vbW = W + pad * 2;
    const vbH = D + pad * 2;
    const scale = Math.min(rect.width / vbW, rect.height / vbH);
    const offX = (rect.width - vbW * scale) / 2;
    const offY = (rect.height - vbH * scale) / 2;
    return {
      x: (e.clientX - rect.left - offX) / scale - pad,
      z: (e.clientY - rect.top - offY) / scale - pad,
    };
  }

  function onDown(e: React.PointerEvent, id: string) {
    e.stopPropagation();
    const obj = project.design.objects.find((o) => o.id === id);
    if (!obj) return;
    select(id);
    const p = toBooth(e);
    drag.current = { id, dx: obj.position.x - p.x, dz: obj.position.z - p.z };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const obj = project.design.objects.find((o) => o.id === d.id);
    if (!obj) return;
    const p = toBooth(e);
    const snapped = snapWall(
      obj,
      { x: p.x + d.dx, z: p.z + d.dz },
      project,
      project.design.objects.filter((o) => o.id !== d.id),
    );
    setGuides(snapped.guides);
    live((draft) => {
      const t = draft.design.objects.find((o) => o.id === d.id);
      if (t) t.position = { x: snapped.x, z: snapped.z };
    });
  }

  function onUp() {
    if (drag.current) commit("Moved wall", () => {});
    drag.current = null;
    setGuides({});
  }

  const aisleSides =
    project.project.boothType === "island"
      ? ["front", "back", "left", "right"]
      : project.project.boothType === "peninsula"
        ? ["front", "left", "right"]
        : project.project.boothType === "corner"
          ? ["front", "right"]
          : ["front"];

  return (
    <div className="relative h-full w-full">
      <svg
        ref={svgRef}
        viewBox={`${-pad} ${-pad} ${W + pad * 2} ${D + pad * 2}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full touch-none"
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerDown={() => select(null)}
      >
        <defs>
          <pattern id="bb-grid" width="992" height="992" patternUnits="userSpaceOnUse">
            <path d="M 992 0 L 0 0 0 992" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          </pattern>
        </defs>

        {floorHex && <rect x={0} y={0} width={W} height={D} fill={floorHex} opacity={0.85} />}
        <rect x={0} y={0} width={W} height={D} fill="url(#bb-grid)" />
        <rect
          x={0}
          y={0}
          width={W}
          height={D}
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={24}
        />

        {/* Aisle indicators */}
        {aisleSides.includes("front") && (
          <text x={W / 2} y={D + pad * 0.62} textAnchor="middle" className="fill-white/35" fontSize={pad * 0.34}>
            AISLE
          </text>
        )}
        {aisleSides.includes("back") && (
          <text x={W / 2} y={-pad * 0.3} textAnchor="middle" className="fill-white/35" fontSize={pad * 0.34}>
            AISLE
          </text>
        )}
        {aisleSides.includes("left") && (
          <text
            x={-pad * 0.45}
            y={D / 2}
            textAnchor="middle"
            className="fill-white/35"
            fontSize={pad * 0.34}
            transform={`rotate(-90 ${-pad * 0.45} ${D / 2})`}
          >
            AISLE
          </text>
        )}
        {aisleSides.includes("right") && (
          <text
            x={W + pad * 0.45}
            y={D / 2}
            textAnchor="middle"
            className="fill-white/35"
            fontSize={pad * 0.34}
            transform={`rotate(90 ${W + pad * 0.45} ${D / 2})`}
          >
            AISLE
          </text>
        )}

        {/* Dimensions */}
        <text x={W / 2} y={-pad * 0.62} textAnchor="middle" className="fill-white/50" fontSize={pad * 0.36}>
          {Math.round(mmToFt(W))} ft
        </text>
        <text
          x={-pad * 0.62}
          y={D / 2}
          textAnchor="middle"
          className="fill-white/50"
          fontSize={pad * 0.36}
          transform={`rotate(-90 ${-pad * 0.62} ${D / 2})`}
        >
          {Math.round(mmToFt(D))} ft
        </text>

        {guides.x !== undefined && (
          <line x1={guides.x} y1={-pad} x2={guides.x} y2={D + pad} stroke="oklch(0.78 0.13 300)" strokeWidth={10} strokeDasharray="60 40" />
        )}
        {guides.z !== undefined && (
          <line x1={-pad} y1={guides.z} x2={W + pad} y2={guides.z} stroke="oklch(0.78 0.13 300)" strokeWidth={10} strokeDasharray="60 40" />
        )}

        {project.design.objects.map((o) => {
          const b = wallBounds(o);
          const selected = o.id === selectedId;
          const overhead = !isWall(o) && o.kind === "hanging";

          if (overhead) {
            const cx = (b.minX + b.maxX) / 2;
            const cy = (b.minZ + b.maxZ) / 2;
            const stroke = selected ? "oklch(0.78 0.13 300)" : "rgba(255,255,255,0.55)";
            return (
              <g key={o.id} onPointerDown={(e) => onDown(e, o.id)} className="cursor-move">
                {o.shape === "halo" ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={(b.maxX - b.minX) / 2}
                    fill={o.lightbox ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)"}
                    stroke={stroke}
                    strokeWidth={selected ? 26 : 16}
                    strokeDasharray="90 60"
                  />
                ) : (
                  <rect
                    x={b.minX}
                    y={b.minZ}
                    width={b.maxX - b.minX}
                    height={b.maxZ - b.minZ}
                    fill={o.lightbox ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)"}
                    stroke={stroke}
                    strokeWidth={selected ? 26 : 16}
                    strokeDasharray="90 60"
                    rx={20}
                  />
                )}
                <text
                  x={cx}
                  y={cy + 55}
                  textAnchor="middle"
                  fontSize={150}
                  fill="rgba(255,255,255,0.7)"
                  className="pointer-events-none"
                >
                  {o.name}
                </text>
              </g>
            );
          }

          return (
            <g key={o.id} onPointerDown={(e) => onDown(e, o.id)} className="cursor-move">
              <rect
                x={b.minX}
                y={b.minZ}
                width={b.maxX - b.minX}
                height={b.maxZ - b.minZ}
                fill={
                  selected
                    ? "oklch(0.78 0.13 300)"
                    : isWall(o)
                      ? o.graphicType === "solid_color"
                        ? (o.graphicColor ?? "rgba(255,255,255,0.82)")
                        : "rgba(255,255,255,0.82)"
                      : FINISH_HEX[o.finish] ?? "rgba(255,255,255,0.6)"
                }
                stroke={
                  selected
                    ? "#fff"
                    : (isWall(o) ? o.lightbox : o.lightbox)
                      ? "oklch(0.9 0.09 90)"
                      : "rgba(255,255,255,0.5)"
                }
                strokeWidth={selected ? 22 : (o.lightbox ? 16 : 8)}
                rx={12}
              />
              {/* Module divisions */}
              {isWall(o) &&
                o.sections.length > 1 &&
                o.sections.slice(0, -1).map((s, i) => {
                  const offset = o.sections.slice(0, i + 1).reduce((sum, x) => sum + x.widthMm, 0);
                  return b.along ? (
                    <line
                      key={s.id}
                      x1={b.minX}
                      y1={b.minZ + offset}
                      x2={b.maxX}
                      y2={b.minZ + offset}
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth={8}
                    />
                  ) : (
                    <line
                      key={s.id}
                      x1={b.minX + offset}
                      y1={b.minZ}
                      x2={b.minX + offset}
                      y2={b.maxZ}
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth={8}
                    />
                  );
                })}
              {!isWall(o) && (
                <>
                  <text
                    x={(b.minX + b.maxX) / 2}
                    y={(b.minZ + b.maxZ) / 2 + 10}
                    textAnchor="middle"
                    fontSize={150}
                    fill={o.finish === "black" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)"}
                    className="pointer-events-none"
                  >
                    {o.name}
                  </text>
                  <text
                    x={(b.minX + b.maxX) / 2}
                    y={(b.minZ + b.maxZ) / 2 + 165}
                    textAnchor="middle"
                    fontSize={120}
                    fill={o.finish === "black" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"}
                    className="pointer-events-none"
                  >
                    {ftLabel(o.widthMm)} × {ftLabel(o.depthMm)}
                  </text>
                </>
              )}
              {/* Wall run length, drawn just outside the wall */}
              {isWall(o) && (
                <text
                  x={b.along ? b.maxX + 120 : (b.minX + b.maxX) / 2}
                  y={b.along ? (b.minZ + b.maxZ) / 2 : b.minZ - 90}
                  textAnchor={b.along ? "start" : "middle"}
                  fontSize={140}
                  fill="rgba(255,255,255,0.55)"
                  className="pointer-events-none"
                >
                  {ftLabel(wallWidthMm(o))}
                </text>
              )}
              {o.groupId && (
                <circle
                  cx={b.minX + WALL_THICKNESS_MM}
                  cy={b.minZ + WALL_THICKNESS_MM}
                  r={40}
                  fill="oklch(0.78 0.13 300)"
                />
              )}
              {/* Branded surface marker */}
              {(o.graphic?.imageUrl || (o.graphic?.logoPlacement ?? "none") !== "none") && (
                <text
                  x={b.maxX - 60}
                  y={b.minZ - 40}
                  textAnchor="end"
                  fontSize={130}
                  fill="oklch(0.78 0.13 300)"
                  className="pointer-events-none"
                >
                  {o.graphic?.imageUrl ? "photo + logo" : "logo"}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {project.design.objects.length === 0 && (
        <p className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs text-white/40">
          Add a wall from the library on the left, then drag it into place.
        </p>
      )}
    </div>
  );
}
