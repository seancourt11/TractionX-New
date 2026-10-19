/**
 * Realistic screens and furniture for the 3D view.
 *
 * These are built from optimised geometry rather than downloaded models so the
 * scene stays light and every piece matches the exact dimensions shown in the
 * library. Each preset carries a stable `visualKey`, so an exact Traction X
 * rental model can replace one of these later without touching saved layouts.
 */

import * as THREE from "three";

const MATTE = { roughness: 0.6, metalness: 0.05 } as const;

/* ------------------------------------------------------------- screens -- */

/**
 * Flat panel screen: rear casing, slim bezel and a dark glass display that
 * catches a little light so it reads as a working screen.
 */
export function ScreenAssembly({
  width,
  height,
  depth,
  kiosk,
}: {
  width: number;
  height: number;
  depth: number;
  kiosk: boolean;
}) {
  const panelH = kiosk ? Math.min(height * 0.55, 0.95) : height;
  const panelW = kiosk ? Math.min(width * 0.92, panelH * 0.62) : width;
  const bezel = 0.018;
  const caseD = Math.min(depth, 0.07);
  const panelY = kiosk ? height / 2 - panelH / 2 - height * 0.06 : 0;

  return (
    <group>
      <group position={[0, panelY, 0]}>
        {/* Rear casing */}
        <mesh castShadow position={[0, 0, -caseD / 2]}>
          <boxGeometry args={[panelW * 0.94, panelH * 0.94, caseD]} />
          <meshStandardMaterial color="#1a1a1c" roughness={0.55} metalness={0.35} />
        </mesh>
        {/* Bezel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[panelW, panelH, 0.014]} />
          <meshStandardMaterial color="#0c0c0e" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Glass */}
        <mesh position={[0, 0, 0.009]}>
          <planeGeometry args={[panelW - bezel * 2, panelH - bezel * 2]} />
          <meshStandardMaterial
            color="#0f1418"
            roughness={0.12}
            metalness={0.15}
            emissive="#16323f"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {kiosk ? (
        <>
          {/* Kiosk column */}
          <mesh castShadow position={[0, -height * 0.14, 0]}>
            <boxGeometry args={[panelW * 0.55, height * 0.62, Math.max(depth * 0.35, 0.1)]} />
            <meshStandardMaterial color="#141416" {...MATTE} />
          </mesh>
          {/* Base plate */}
          <mesh castShadow receiveShadow position={[0, -height / 2 + 0.02, 0]}>
            <boxGeometry args={[Math.max(width, 0.5), 0.04, Math.max(depth, 0.45)]} />
            <meshStandardMaterial color="#0e0e10" roughness={0.5} metalness={0.3} />
          </mesh>
        </>
      ) : (
        /* Wall bracket */
        <mesh position={[0, 0, -caseD - 0.02]}>
          <boxGeometry args={[panelW * 0.3, panelH * 0.3, 0.04]} />
          <meshStandardMaterial color="#101012" roughness={0.6} metalness={0.4} />
        </mesh>
      )}
    </group>
  );
}

/* ----------------------------------------------------------- furniture -- */

type FurnitureProps = {
  visualKey: string;
  /** Footprint and height in metres, already rotated to scene axes. */
  w: number;
  d: number;
  h: number;
  color: string;
  accent: string;
};

function Leg({ x, z, h, r = 0.018, color }: { x: number; z: number; h: number; r?: number; color: string }) {
  return (
    <mesh castShadow position={[x, -0 + 0, z]}>
      <cylinderGeometry args={[r, r, h, 12]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.6} />
    </mesh>
  );
}

/**
 * A recognisable piece of booth furniture. Anything unknown falls back to a
 * simple soft block so the scene never breaks.
 */
export function FurniturePiece({ visualKey, w, d, h, color, accent }: FurnitureProps) {
  const metal = "#3a3a3e";
  const soft = { roughness: 0.75, metalness: 0.02 } as const;

  switch (visualKey) {
    case "stool": {
      const seatH = 0.05;
      return (
        <group>
          <mesh castShadow position={[0, h / 2 - seatH / 2, 0]}>
            <cylinderGeometry args={[w / 2, w / 2 * 0.94, seatH, 28]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          <mesh castShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.035, h - seatH, 16]} />
            <meshStandardMaterial color={metal} roughness={0.3} metalness={0.75} />
          </mesh>
          <mesh position={[0, -h / 2 + 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[w / 2 * 0.7, 0.011, 8, 28]} />
            <meshStandardMaterial color={metal} roughness={0.3} metalness={0.75} />
          </mesh>
          <mesh receiveShadow position={[0, -h / 2 + 0.012, 0]}>
            <cylinderGeometry args={[w / 2 * 0.85, w / 2 * 0.85, 0.024, 28]} />
            <meshStandardMaterial color={metal} roughness={0.3} metalness={0.75} />
          </mesh>
        </group>
      );
    }

    case "chair": {
      const seatY = -h / 2 + 0.45;
      return (
        <group>
          <mesh castShadow position={[0, seatY, 0]}>
            <boxGeometry args={[w * 0.92, 0.06, d * 0.9]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          <mesh castShadow position={[0, seatY + 0.24, -d * 0.4]} rotation={[-0.12, 0, 0]}>
            <boxGeometry args={[w * 0.9, 0.44, 0.05]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          {[
            [-w * 0.38, -d * 0.36],
            [w * 0.38, -d * 0.36],
            [-w * 0.38, d * 0.36],
            [w * 0.38, d * 0.36],
          ].map(([x, z], i) => (
            <group key={i} position={[x, (-h / 2 + 0.45) / 2 - 0.225 + 0.225, 0]}>
              <mesh castShadow position={[0, (seatY - h / 2) / 2 + 0.0, z]}>
                <cylinderGeometry args={[0.016, 0.016, 0.45, 10]} />
                <meshStandardMaterial color={metal} roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      );
    }

    case "cafe_table": {
      return (
        <group>
          <mesh castShadow position={[0, h / 2 - 0.02, 0]}>
            <cylinderGeometry args={[w / 2, w / 2, 0.04, 36]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
          </mesh>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.045, h - 0.06, 18]} />
            <meshStandardMaterial color={metal} roughness={0.3} metalness={0.75} />
          </mesh>
          <mesh receiveShadow position={[0, -h / 2 + 0.015, 0]}>
            <cylinderGeometry args={[w / 2 * 0.62, w / 2 * 0.62, 0.03, 30]} />
            <meshStandardMaterial color={metal} roughness={0.35} metalness={0.7} />
          </mesh>
        </group>
      );
    }

    case "coffee_table":
    case "meeting_table": {
      const topT = 0.045;
      const panelLegs = visualKey === "meeting_table";
      return (
        <group>
          <mesh castShadow position={[0, h / 2 - topT / 2, 0]}>
            <boxGeometry args={[w, topT, d]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
          </mesh>
          {panelLegs ? (
            [-1, 1].map((s) => (
              <mesh key={s} castShadow receiveShadow position={[(w / 2 - 0.12) * s, -topT / 2, 0]}>
                <boxGeometry args={[0.05, h - topT, d * 0.8]} />
                <meshStandardMaterial color={accent} {...MATTE} />
              </mesh>
            ))
          ) : (
            [
              [-w / 2 + 0.06, -d / 2 + 0.06],
              [w / 2 - 0.06, -d / 2 + 0.06],
              [-w / 2 + 0.06, d / 2 - 0.06],
              [w / 2 - 0.06, d / 2 - 0.06],
            ].map(([x, z], i) => (
              <mesh key={i} castShadow position={[x, -topT / 2, z]}>
                <cylinderGeometry args={[0.018, 0.018, h - topT, 10]} />
                <meshStandardMaterial color={metal} roughness={0.3} metalness={0.7} />
              </mesh>
            ))
          )}
        </group>
      );
    }

    case "lounge_chair": {
      const seatH = 0.42;
      return (
        <group>
          <mesh castShadow receiveShadow position={[0, -h / 2 + seatH * 0.55, 0]}>
            <boxGeometry args={[w * 0.96, seatH * 0.55, d * 0.96]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          <mesh castShadow position={[0, -h / 2 + seatH + 0.02, 0]}>
            <boxGeometry args={[w * 0.82, 0.1, d * 0.8]} />
            <meshStandardMaterial color={accent} {...soft} />
          </mesh>
          <mesh castShadow position={[0, -h / 2 + seatH + 0.2, -d * 0.4]} rotation={[-0.16, 0, 0]}>
            <boxGeometry args={[w * 0.94, 0.42, 0.12]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} castShadow position={[(w / 2 - 0.06) * s, -h / 2 + seatH + 0.06, 0]}>
              <boxGeometry args={[0.12, 0.2, d * 0.9]} />
              <meshStandardMaterial color={color} {...soft} />
            </mesh>
          ))}
        </group>
      );
    }

    case "sofa": {
      const seatH = 0.4;
      return (
        <group>
          <mesh castShadow receiveShadow position={[0, -h / 2 + seatH * 0.5, 0]}>
            <boxGeometry args={[w, seatH, d * 0.96]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={`c${s}`} castShadow position={[(w * 0.24) * s, -h / 2 + seatH + 0.05, 0.04]}>
              <boxGeometry args={[w * 0.44, 0.1, d * 0.72]} />
              <meshStandardMaterial color={accent} {...soft} />
            </mesh>
          ))}
          <mesh castShadow position={[0, -h / 2 + seatH + 0.24, -d * 0.4]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[w, 0.46, 0.14]} />
            <meshStandardMaterial color={color} {...soft} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={`a${s}`} castShadow position={[(w / 2 - 0.07) * s, -h / 2 + seatH * 0.5 + 0.14, 0]}>
              <boxGeometry args={[0.14, seatH + 0.28, d * 0.94]} />
              <meshStandardMaterial color={color} {...soft} />
            </mesh>
          ))}
        </group>
      );
    }

    case "literature_rack": {
      const shelves = 4;
      return (
        <group>
          <mesh castShadow position={[0, 0, -d / 2 + 0.02]}>
            <boxGeometry args={[w, h, 0.03]} />
            <meshStandardMaterial color={color} {...MATTE} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} castShadow position={[(w / 2 - 0.015) * s, 0, 0]}>
              <boxGeometry args={[0.03, h, d]} />
              <meshStandardMaterial color={color} {...MATTE} />
            </mesh>
          ))}
          {Array.from({ length: shelves }).map((_, i) => (
            <mesh
              key={i}
              castShadow
              position={[0, h / 2 - 0.2 - i * (h * 0.9) / shelves, 0.02]}
              rotation={[-0.22, 0, 0]}
            >
              <boxGeometry args={[w * 0.92, 0.02, d * 0.8]} />
              <meshStandardMaterial color={accent} {...MATTE} />
            </mesh>
          ))}
        </group>
      );
    }

    default:
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={color} {...soft} />
        </mesh>
      );
  }
}

/** Shared geometry disposal helper kept for future model swaps. */
export const FURNITURE_DEFAULT_COLOR = new THREE.Color("#ededed").getHexString();
