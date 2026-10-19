import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Lightformer, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import { WALL_THICKNESS_MM, isWall, wallWidthMm } from "@/lib/booth-builder/project";
import { FINISH_HEX, FLOORING_SWATCHES } from "@/lib/booth-builder/presets";
import { logoForBackground, shade, surfaceColor } from "@/lib/booth-builder/brandkit";
import {
  COUNTER_TOP_HEX,
  brushedTexture,
  flooringLook,
  panelLook,
} from "@/lib/booth-builder/materials";
import { proxiedImage } from "@/lib/booth-builder/brand-image";
import { composePanel } from "@/lib/booth-builder/graphic-panel";
import { cameraView, type CameraViewId } from "@/lib/booth-builder/cameras";
import { useBuilder } from "@/lib/booth-builder/store";
import type {
  BoothObject,
  BoothProject,
  ItemObject,
  LogoPlacement,
  SurfaceGraphic,
  WallObject,
} from "@/lib/booth-builder/types";


import { FurniturePiece, ScreenAssembly } from "./furnishings";

/**
 * 3D view. Metres are the scene unit; the project stores millimetres, so
 * everything divides by 1000 on the way in. The scene is dressed like a real
 * exhibit hall — dark walls, a ceiling light grid and a polished floor — so
 * concepts read close to our finished renderings.
 */

const EDGE_HEX: Record<string, string> = {
  white: "#f2f2f2",
  black: "#141414",
  brand: "#b48ae8",
};

/** Load a remote image as a texture; falls back to nothing if it blocks us. */
function useImageTexture(url?: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }
    let alive = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      proxiedImage(url) ?? url,

      (t) => {
        if (!alive) {
          t.dispose();
          return;
        }
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 16;
        setTexture(t);
      },
      undefined,
      () => {
        if (alive) setTexture(null);
      },
    );
    return () => {
      alive = false;
    };
  }, [url]);

  return texture;
}

/**
 * The artwork for one surface: a composed booth graphic when we have hero
 * messaging, otherwise the photograph itself, always served through our own
 * origin so the browser lets us draw it.
 */
function useSurfaceArtwork(
  graphic: SurfaceGraphic | undefined,
  background: string,
  accent: string,
  aspect: number,
): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const imageUrl = graphic?.imageUrl;
  const headline = graphic?.headline;
  const cta = graphic?.cta;
  const align = graphic?.logoPlacement === "top_left" ? "left" : "center";

  useEffect(() => {
    let alive = true;
    const hasCopy = Boolean(headline?.trim() || cta?.trim());
    if (!imageUrl && !hasCopy) {
      setUrl(undefined);
      return;
    }
    if (!hasCopy) {
      setUrl(proxiedImage(imageUrl));
      return;
    }
    void composePanel({ imageUrl, headline, cta, background, accent, aspect, align }).then((made) => {
      if (alive) setUrl(made ?? proxiedImage(imageUrl));
    });
    return () => {
      alive = false;
    };
  }, [imageUrl, headline, cta, background, accent, aspect, align]);

  return url;
}

/** Artwork plane sitting a few millimetres proud of a surface. */

function GraphicPlane({
  url,
  width,
  height,
  z,
  rotationY = 0,
}: {
  url?: string;
  width: number;
  height: number;
  z: number;
  rotationY?: number;
}) {
  const map = useImageTexture(url);
  if (!map) return null;
  return (
    <mesh position={[Math.sin(rotationY) * z, 0, Math.cos(rotationY) * z]} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={map} roughness={0.65} toneMapped={false} />
    </mesh>
  );
}

/** The mark, positioned the way a designer would place it on that surface. */
function LogoPlane({
  url,
  placement,
  surfaceWidth,
  surfaceHeight,
  scale,
  z,
  rotationY = 0,
}: {
  url: string;
  placement: LogoPlacement;
  surfaceWidth: number;
  surfaceHeight: number;
  scale: number;
  z: number;
  rotationY?: number;
}) {
  const map = useImageTexture(url);
  if (!map || !placement || placement === "none") return null;

  const w = surfaceWidth * scale;
  const source = map.image as { width?: number; height?: number } | undefined;
  const ratio = source?.width && source.height ? source.height / source.width : 0.32;
  const h = Math.min(w * ratio, surfaceHeight * 0.35);
  const margin = surfaceWidth * 0.05;

  let x = 0;
  let y = 0;
  if (placement === "top_center") y = surfaceHeight / 2 - h / 2 - surfaceHeight * 0.12;
  if (placement === "top_left") {
    y = surfaceHeight / 2 - h / 2 - surfaceHeight * 0.12;
    x = -surfaceWidth / 2 + w / 2 + margin;
  }

  return (
    <group rotation={[0, rotationY, 0]}>
      <mesh position={[x, y, z]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/**
 * The visible aluminium profile around a wall run. Real modular walls show a
 * slim frame at the edges, and it is what stops a booth reading as flat boxes.
 */
function EdgeFrame({
  width,
  height,
  depth,
  color,
}: {
  width: number;
  height: number;
  depth: number;
  color: string;
}) {
  const map = useMemo(() => brushedTexture(color), [color]);
  const bar = 0.03;
  const props = { color, map, roughness: 0.34, metalness: 0.72 };
  return (
    <group>
      <mesh position={[0, height / 2 - bar / 2, 0]} castShadow>
        <boxGeometry args={[width, bar, depth + 0.004]} />
        <meshStandardMaterial {...props} />
      </mesh>
      <mesh position={[0, -height / 2 + bar / 2, 0]}>
        <boxGeometry args={[width, bar, depth + 0.004]} />
        <meshStandardMaterial {...props} />
      </mesh>
      <mesh position={[-width / 2 + bar / 2, 0, 0]}>
        <boxGeometry args={[bar, height, depth + 0.004]} />
        <meshStandardMaterial {...props} />
      </mesh>
      <mesh position={[width / 2 - bar / 2, 0, 0]}>
        <boxGeometry args={[bar, height, depth + 0.004]} />
        <meshStandardMaterial {...props} />
      </mesh>
    </group>
  );
}


function WallMesh({
  o,
  project,
  selected,
  presentation,
}: {
  o: WallObject;
  project: BoothProject;
  selected: boolean;
  presentation: boolean;
}) {
  const along = Math.abs(Math.sin((o.rotationDeg * Math.PI) / 180)) > 0.5;
  const width = wallWidthMm(o) / 1000;
  const h = o.heightMm / 1000;
  const t = WALL_THICKNESS_MM / 1000;
  const face = o.graphicType === "solid_color" ? (o.graphicColor ?? "#b48ae8") : "#ededed";
  const logoUrl = logoForBackground(project, surfaceColor(o, project));
  const placement = o.graphic?.logoPlacement ?? "none";
  const artwork = useSurfaceArtwork(
    o.graphic,
    surfaceColor(o, project),
    project.branding.primaryColor,
    width / Math.max(h, 0.1),
  );
  const highlight = selected && !presentation;
  let run = -width / 2;

  return (
    <group
      position={[o.position.x / 1000, h / 2, o.position.z / 1000]}
      rotation={[0, along ? Math.PI / 2 : 0, 0]}
    >
      {o.sections.map((s) => {
        const sw = s.widthMm / 1000;
        const cx = run + sw / 2;
        run += sw;
        const lit = s.lightbox || o.lightbox;
        const look = panelLook(highlight ? "#d9c2f5" : face, Boolean(lit));
        return (
          <group key={s.id} position={[cx, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[sw, h, t]} />
              <meshStandardMaterial
                color={highlight ? "#d9c2f5" : face}
                map={look.map}
                roughness={look.roughness}
                metalness={look.metalness}
                emissive={lit ? face : "#000000"}
                emissiveIntensity={lit ? 0.75 : 0}
              />
            </mesh>
            {lit && <pointLight position={[0, 0, 0.6]} intensity={0.5} distance={3.5} color={face} />}
          </group>
        );
      })}

      <GraphicPlane url={artwork} width={width * 0.98} height={h * 0.97} z={t / 2 + 0.006} />
      {logoUrl && placement !== "none" && (
        <LogoPlane
          url={logoUrl}
          placement={placement}
          surfaceWidth={width}
          surfaceHeight={h}
          scale={o.graphic?.logoScale ?? 0.32}
          z={t / 2 + 0.012}
        />
      )}

      {/* Visible extrusion profile around the wall run */}
      <EdgeFrame width={width} height={h} depth={t} color={EDGE_HEX[o.edgeColor] ?? "#f2f2f2"} />


      {/* Accent light washing the graphic wall, as in a finished render */}
      <spotLight
        position={[0, h * 0.75, 1.2]}
        angle={0.8}
        penumbra={0.9}
        intensity={4}
        distance={6}
        color="#fff4e2"
        target-position={[0, -h / 2, 0]}
      />
    </group>
  );
}

/** Storage rooms, towers and counters: branded on the faces people actually see. */
function StructureMesh({
  o,
  project,
  selected,
  presentation,
}: {
  o: ItemObject;
  project: BoothProject;
  selected: boolean;
  presentation: boolean;
}) {
  const along = Math.abs(Math.sin((o.rotationDeg * Math.PI) / 180)) > 0.5;
  const w = o.widthMm / 1000;
  const d = o.depthMm / 1000;
  const h = o.heightMm / 1000;
  const sx = along ? d : w;
  const sz = along ? w : d;
  const base = (o.elevationMm ?? 0) / 1000;
  const flat = surfaceColor(o, project);
  const body = selected && !presentation ? "#d9c2f5" : (o.finish === "brand" ? flat : FINISH_HEX[o.finish] ?? "#ededed");
  const logoUrl = logoForBackground(project, flat);
  const placement = o.graphic?.logoPlacement ?? "none";
  const scale = o.graphic?.logoScale ?? 0.5;
  const artwork = useSurfaceArtwork(o.graphic, flat, project.branding.primaryColor, sx / Math.max(h, 0.1));

  // Counter tops are always white laminate, whatever the brand colour is.
  const faces: number[] = o.kind === "tower" ? [0, Math.PI / 2, Math.PI, -Math.PI / 2] : [0];
  const look = panelLook(body, Boolean(o.lightbox));

  return (
    <group position={[o.position.x / 1000, base + h / 2, o.position.z / 1000]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[sx, h, sz]} />
        <meshStandardMaterial
          color={body}
          map={look.map}
          roughness={look.roughness}
          metalness={look.metalness}
          emissive={o.lightbox ? body : "#000000"}
          emissiveIntensity={o.lightbox ? 0.6 : 0}
        />
      </mesh>

      {o.kind === "counter" && (
        <group>
          <mesh castShadow position={[0, h / 2 + 0.014, 0]}>
            <boxGeometry args={[sx + 0.035, 0.035, sz + 0.035]} />
            <meshStandardMaterial color={COUNTER_TOP_HEX} roughness={0.22} metalness={0.04} />
          </mesh>
          {/* Slim brushed reveal under the top, as on our built counters. */}
          <mesh position={[0, h / 2 - 0.012, 0]}>
            <boxGeometry args={[sx + 0.02, 0.012, sz + 0.02]} />
            <meshStandardMaterial color="#c9ccd0" roughness={0.35} metalness={0.75} />
          </mesh>
        </group>
      )}


      {faces.map((angle, i) => {
        const half = angle === 0 || Math.abs(angle) === Math.PI ? sz / 2 : sx / 2;
        const faceWidth = angle === 0 || Math.abs(angle) === Math.PI ? sx : sz;
        // Towers only carry the mark on their two main faces.
        const showLogo = placement !== "none" && logoUrl && (o.kind !== "tower" || i % 2 === 0);
        return (
          <group key={i}>
            <GraphicPlane
              url={artwork}
              width={faceWidth * 0.96}
              height={h * 0.94}
              z={half + 0.006}
              rotationY={angle}
            />
            {showLogo && (
              <LogoPlane
                url={logoUrl}
                placement={placement}
                surfaceWidth={faceWidth}
                surfaceHeight={h}
                scale={scale}
                z={half + 0.012}
                rotationY={angle}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

function ScreenMesh({ o, selected, presentation }: { o: ItemObject; selected: boolean; presentation: boolean }) {
  const along = Math.abs(Math.sin((o.rotationDeg * Math.PI) / 180)) > 0.5;
  const w = o.widthMm / 1000;
  const d = o.depthMm / 1000;
  const h = o.heightMm / 1000;
  const kiosk = (o.visualKey ?? o.presetId) === "touchscreen_43";
  const base = (o.elevationMm ?? 0) / 1000;

  return (
    <group
      position={[o.position.x / 1000, base + h / 2, o.position.z / 1000]}
      rotation={[0, along ? Math.PI / 2 : 0, 0]}
    >
      <ScreenAssembly width={w} height={h} depth={d} kiosk={kiosk} />
      {selected && !presentation && (
        <mesh>
          <boxGeometry args={[w + 0.05, h + 0.05, Math.max(d, 0.1) + 0.05]} />
          <meshBasicMaterial color="#d9c2f5" wireframe transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

function FurnitureMesh({ o, selected, presentation }: { o: ItemObject; selected: boolean; presentation: boolean }) {
  const along = Math.abs(Math.sin((o.rotationDeg * Math.PI) / 180)) > 0.5;
  const w = o.widthMm / 1000;
  const d = o.depthMm / 1000;
  const h = o.heightMm / 1000;
  const color = selected && !presentation ? "#d9c2f5" : (FINISH_HEX[o.finish] ?? "#ededed");

  return (
    <group
      position={[o.position.x / 1000, h / 2, o.position.z / 1000]}
      rotation={[0, along ? Math.PI / 2 : 0, 0]}
    >
      <FurniturePiece
        visualKey={o.visualKey ?? o.presetId ?? ""}
        w={w}
        d={d}
        h={h}
        color={color}
        accent={shade(color, -0.25)}
      />
    </group>
  );
}

function HangingMesh({
  o,
  project,
  selected,
  presentation,
}: {
  o: ItemObject;
  project: BoothProject;
  selected: boolean;
  presentation: boolean;
}) {
  const w = o.widthMm / 1000;
  const d = o.depthMm / 1000;
  const h = o.heightMm / 1000;
  const base = (o.hangHeightMm ?? o.elevationMm ?? 3660) / 1000;
  const flat = surfaceColor(o, project);
  const color = selected && !presentation ? "#d9c2f5" : (o.finish === "brand" ? flat : FINISH_HEX[o.finish] ?? "#ededed");
  const logoUrl = logoForBackground(project, flat);
  const placement = o.graphic?.logoPlacement ?? "none";
  const artwork = useSurfaceArtwork(o.graphic, flat, project.branding.primaryColor, w / Math.max(h, 0.1));
  const faceDepth = o.shape === "rectangle" ? d : w;
  const sides = o.doubleSided === false ? [1] : [1, -1];

  return (
    <group position={[o.position.x / 1000, base + h / 2, o.position.z / 1000]}>
      {o.shape === "halo" ? (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[w / 2, w / 2, h, 64, 1, true]} />
            <meshStandardMaterial
              color={color}
              side={THREE.DoubleSide}
              roughness={0.5}
              emissive={o.lightbox ? color : "#000000"}
              emissiveIntensity={o.lightbox ? 0.7 : 0}
            />
          </mesh>
          {logoUrl &&
            placement !== "none" &&
            [0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a) => (
              <LogoPlane
                key={a}
                url={logoUrl}
                placement="center"
                surfaceWidth={w * 0.5}
                surfaceHeight={h}
                scale={o.graphic?.logoScale ?? 0.72}
                z={w / 2 + 0.012}
                rotationY={a}
              />
            ))}
        </group>
      ) : (
        <group rotation={[0, (o.rotationDeg * Math.PI) / 180, 0]}>
          <mesh castShadow>
            <boxGeometry args={[w, h, faceDepth]} />
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              emissive={o.lightbox ? color : "#000000"}
              emissiveIntensity={o.lightbox ? 0.7 : 0}
            />
          </mesh>
          {sides.map((s) => (
            <group key={s} rotation={[0, s === 1 ? 0 : Math.PI, 0]}>
              <GraphicPlane url={artwork} width={w * 0.97} height={h * 0.94} z={faceDepth / 2 + 0.006} />
              {logoUrl && placement !== "none" && (
                <LogoPlane
                  url={logoUrl}
                  placement="center"
                  surfaceWidth={w}
                  surfaceHeight={h}
                  scale={o.graphic?.logoScale ?? 0.72}
                  z={faceDepth / 2 + 0.012}
                />
              )}
            </group>
          ))}
        </group>
      )}
      {o.lightbox && <pointLight intensity={1.2} distance={7} color="#ffffff" />}
    </group>
  );
}

/** Ceiling light grid and dark hall shell behind the booth. */
function Hall({ span }: { span: number }) {
  const size = Math.max(span * 4, 44);
  const ceiling = Math.max(span * 0.9, 9);

  const lights = useMemo(() => {
    const pts: [number, number][] = [];
    const step = 2.4;
    const half = size / 2;
    for (let x = -half; x <= half; x += step) {
      for (let z = -half; z <= half; z += step) pts.push([x, z]);
    }
    return pts;
  }, [size]);

  return (
    <group>
      {/* Hall shell */}
      <mesh position={[0, ceiling / 2, 0]}>
        <boxGeometry args={[size, ceiling, size]} />
        <meshStandardMaterial color="#191919" side={THREE.BackSide} roughness={0.95} />
      </mesh>

      {/* Ceiling light grid */}
      <group position={[0, ceiling - 0.15, 0]}>
        {lights.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.11, 10]} />
            <meshBasicMaterial color="#ffe9c4" toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* Polished hall floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.004, 0]}>
        <planeGeometry args={[size, size]} />
        <MeshReflectorMaterial
          resolution={512}
          mixBlur={1.2}
          mixStrength={12}
          blur={[300, 80]}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          roughness={0.85}
          color="#232323"
          metalness={0.35}
        />
      </mesh>
    </group>
  );
}

function Booth({
  project,
  selectedId,
  presentation,
}: {
  project: BoothProject;
  selectedId: string | null;
  presentation: boolean;
}) {
  const W = project.project.widthMm / 1000;
  const D = project.project.depthMm / 1000;

  const render = (o: BoothObject) => {
    const selected = o.id === selectedId;
    if (isWall(o)) return <WallMesh key={o.id} o={o} project={project} selected={selected} presentation={presentation} />;
    if (o.kind === "hanging")
      return <HangingMesh key={o.id} o={o} project={project} selected={selected} presentation={presentation} />;
    if (o.kind === "tv") return <ScreenMesh key={o.id} o={o} selected={selected} presentation={presentation} />;
    if (o.kind === "furniture")
      return <FurnitureMesh key={o.id} o={o} selected={selected} presentation={presentation} />;
    return <StructureMesh key={o.id} o={o} project={project} selected={selected} presentation={presentation} />;
  };

  const swatchId = project.design.flooring.swatchId;
  const floorHex = FLOORING_SWATCHES.find((f) => f.id === swatchId)?.hex ?? "#1a1a1a";
  const floor = flooringLook(swatchId, floorHex, Math.max(W, D));

  return (
    <group position={[-W / 2, 0, -D / 2]}>
      {/* Booth flooring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[W / 2, 0.004, D / 2]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial
          color={floorHex}
          map={floor.map}
          roughness={floor.roughness}
          metalness={floor.metalness}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* Trim edge where the booth floor meets the show floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[W / 2, 0.002, D / 2]}>
        <planeGeometry args={[W + 0.05, D + 0.05]} />
        <meshStandardMaterial color="#0f0f10" roughness={0.8} />
      </mesh>

      {project.design.objects.map(render)}
    </group>
  );
}


/** Moves the camera smoothly onto a preset angle, and spins it on request. */
function CameraRig({
  viewId,
  viewNonce,
  turntable,
  widthM,
  depthM,
}: {
  viewId: CameraViewId;
  viewNonce: number;
  turntable: boolean;
  widthM: number;
  depthM: number;
}) {
  const { camera, controls } = useThree() as unknown as {
    camera: THREE.PerspectiveCamera;
    controls: { target: THREE.Vector3; update: () => void } | null;
  };
  const goal = useRef<{ pos: THREE.Vector3; target: THREE.Vector3; fov: number } | null>(null);

  useEffect(() => {
    const v = cameraView(viewId, widthM, depthM);
    goal.current = {
      pos: new THREE.Vector3(...v.position),
      target: new THREE.Vector3(...v.target),
      fov: v.fov,
    };
  }, [viewId, viewNonce, widthM, depthM]);

  useFrame((_, delta) => {
    const g = goal.current;
    const dt = Math.min(delta, 0.05);

    if (g) {
      const k = 1 - Math.exp(-6 * dt);
      camera.position.lerp(g.pos, k);
      if (controls) {
        controls.target.lerp(g.target, k);
        controls.update();
      }
      if (Math.abs(camera.fov - g.fov) > 0.05) {
        camera.fov += (g.fov - camera.fov) * k;
        camera.updateProjectionMatrix();
      }
      if (camera.position.distanceTo(g.pos) < 0.02) goal.current = null;
    }

    if (turntable && !g && controls) {
      const t = controls.target;
      const offset = camera.position.clone().sub(t);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.18 * dt);
      camera.position.copy(t.clone().add(offset));
      controls.update();
    }
  });

  return null;
}

export type CaptureShot = { id: CameraViewId; label: string; caption: string; dataUrl: string };

export type CaptureRequest = {
  nonce: number;
  /** Angles to shoot. A single-entry list is used for "download image". */
  views: CameraViewId[];
  /** Pixel-ratio multiplier — 2 or 3 for print-quality stills. */
  scale: number;
  format: "png" | "jpeg";
  onDone: (shots: CaptureShot[]) => void;
};

/** Renders sharper stills on demand, one per requested angle. */
function CaptureRig({
  request,
  widthM,
  depthM,
}: {
  request: CaptureRequest | null;
  widthM: number;
  depthM: number;
}) {
  const { gl, scene, camera, controls } = useThree() as unknown as {
    gl: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: { target: THREE.Vector3; update: () => void } | null;
  };

  useEffect(() => {
    if (!request || !request.nonce) return;

    const prevPos = camera.position.clone();
    const prevQuat = camera.quaternion.clone();
    const prevFov = camera.fov;
    const prevRatio = gl.getPixelRatio();

    gl.setPixelRatio(Math.min(3, Math.max(1, request.scale)));

    const shots: CaptureShot[] = [];
    for (const id of request.views) {
      const v = cameraView(id, widthM, depthM);
      camera.position.set(...v.position);
      camera.fov = v.fov;
      camera.updateProjectionMatrix();
      camera.lookAt(new THREE.Vector3(...v.target));
      gl.render(scene, camera);
      shots.push({
        id,
        label: v.label,
        caption: v.caption,
        dataUrl:
          request.format === "jpeg"
            ? gl.domElement.toDataURL("image/jpeg", 0.92)
            : gl.domElement.toDataURL("image/png"),
      });
    }

    camera.position.copy(prevPos);
    camera.quaternion.copy(prevQuat);
    camera.fov = prevFov;
    camera.updateProjectionMatrix();
    gl.setPixelRatio(prevRatio);
    controls?.update();
    gl.render(scene, camera);

    request.onDone(shots);
  }, [request, gl, scene, camera, controls, widthM, depthM]);

  return null;
}

export type RenderQuality = "fast" | "high" | "presentation";

export default function View3D({
  presentation = false,
  viewId = "hero",
  viewNonce = 0,
  turntable = false,
  capture = null,
  quality = "high",
}: {
  presentation?: boolean;
  viewId?: CameraViewId;
  viewNonce?: number;
  turntable?: boolean;
  capture?: CaptureRequest | null;
  quality?: RenderQuality;
}) {
  const { project, selectedId } = useBuilder();
  const widthM = project.project.widthMm / 1000;
  const depthM = project.project.depthMm / 1000;
  const span = Math.max(widthM, depthM);
  const start = cameraView("hero", widthM, depthM);

  const tier = presentation && quality === "high" ? "presentation" : quality;
  const dprMax = tier === "fast" ? 1.25 : tier === "high" ? 1.75 : 2.25;
  const shadowMap = tier === "fast" ? 1024 : tier === "high" ? 2048 : 4096;
  const envRes = tier === "fast" ? 128 : 256;

  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={[1, dprMax]}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
      camera={{ position: start.position, fov: start.fov }}
    >
      <color attach="background" args={["#0b0b0c"]} />
      <fog attach="fog" args={["#0b0b0c", span * 3, span * 8]} />

      <ambientLight intensity={0.24} />
      <hemisphereLight intensity={0.38} color="#ffeed6" groundColor="#0d0d0d" />
      <directionalLight
        position={[span * 0.8, span * 1.6, span]}
        intensity={1.5}
        color="#fff3e0"
        castShadow
        shadow-mapSize-width={shadowMap}
        shadow-mapSize-height={shadowMap}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-span, span * 0.9, -span]} intensity={0.42} color="#cfe0ff" />
      {/* Soft key from the aisle so faces nearest the camera are never muddy */}
      <spotLight
        position={[0, span * 1.2, span * 1.6]}
        angle={0.7}
        penumbra={1}
        intensity={span * 1.6}
        distance={span * 6}
        color="#fff6ea"
        castShadow={tier !== "fast"}
      />

      <Environment resolution={envRes}>
        <Lightformer intensity={1.9} position={[0, 8, 0]} scale={[16, 16, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={0.75} color="#9fb6d8" position={[-8, 3, 0]} rotation-y={Math.PI / 2} scale={[18, 3, 1]} />
        <Lightformer intensity={0.75} color="#ffd9a8" position={[8, 3, 0]} rotation-y={-Math.PI / 2} scale={[18, 3, 1]} />
        <Lightformer intensity={0.5} color="#ffffff" position={[0, 2, 10]} scale={[14, 5, 1]} />
      </Environment>



      <Hall span={span} />

      <ContactShadows position={[0, 0.008, 0]} opacity={0.55} scale={span * 3} blur={2.4} far={6} resolution={1024} />

      {!presentation && (
        <Grid
          args={[60, 60]}
          cellSize={1}
          sectionSize={5}
          cellColor="#232323"
          sectionColor="#2f2f2f"
          fadeDistance={45}
          infiniteGrid
          position={[0, 0.006, 0]}
        />
      )}

      <Booth project={project} selectedId={selectedId} presentation={presentation} />

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.75} luminanceSmoothing={0.25} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.6} />
      </EffectComposer>

      <OrbitControls makeDefault enablePan maxPolarAngle={Math.PI / 2.05} target={start.target} />

      <CameraRig
        viewId={viewId}
        viewNonce={viewNonce}
        turntable={turntable}
        widthM={widthM}
        depthM={depthM}
      />
      <CaptureRig request={capture} widthM={widthM} depthM={depthM} />
    </Canvas>
  );
}
