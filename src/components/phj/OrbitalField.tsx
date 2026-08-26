import { useEffect, useState } from "react";
import { DeveloperCore } from "./DeveloperCore";
import { AIModuleCard } from "./AIModuleCard";
import { ResourceSatellites } from "./ResourceSatellites";
import {
  MODULES,
  BASE_ANGLES,
  type ModuleId,
  type InsertionPhase,
  type AIModule,
} from "./types";

const ORBIT_RADIUS = 340;
/**
 * Radial distance where the picked chip parks so its bottom edge lines up
 * with the core card's top edge — the two 8-pin strips then overlap by a
 * few pixels and read as a single continuous lit socket.
 *
 * Depends on DeveloperCore's `cardTopOffset` (90) + wrapper half (240) +
 * approx chip half-height (~70). Adjust here (not in DeveloperCore) if the
 * chip's content changes and its height shifts.
 */
const DOCK_RADIUS = 220;

interface Props {
  onSelectModule: (id: ModuleId) => void;
  onEject: () => void;
  activeId: ModuleId | null;
  phase: InsertionPhase;
  rotation: number;
}

/** Shrink the whole field on narrow viewports so nothing clips off-screen. */
function useFieldScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      // Full composition (orbit + margin satellites) wants ~1180px.
      setScale(Math.max(0.6, Math.min(1, w / 1180)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return scale;
}

/** Idle needs a fast/linear transform to chase the wheel without lag. */
function transformTransition(phase: InsertionPhase): string {
  if (phase === "idle") return "transform 80ms linear";
  if (phase === "inserting") {
    // Gentle overshoot so the chip settles into the socket instead of gliding.
    return "transform 520ms cubic-bezier(0.34, 1.35, 0.5, 1)";
  }
  return "transform var(--phj-motion-slow) var(--phj-ease-standard)";
}

function chipTransition(phase: InsertionPhase): string {
  return (
    `${transformTransition(phase)}, ` +
    "opacity var(--phj-motion-slow) var(--phj-ease-standard), " +
    "filter var(--phj-motion-normal) var(--phj-ease-standard)"
  );
}

export function OrbitalField({
  onSelectModule,
  onEject,
  activeId,
  phase,
  rotation,
}: Props) {
  const activeModule: AIModule | null =
    activeId != null ? MODULES.find((m) => m.id === activeId) ?? null : null;

  const chipsDisabled = phase !== "idle";
  const dockScale = DOCK_RADIUS / ORBIT_RADIUS;
  const scale = useFieldScale();

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${scale})`,
        transition: "transform var(--phj-motion-normal) var(--phj-ease-standard)",
      }}
    >
      {/* Orbit guides — dim while the core is engaged */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: ORBIT_RADIUS * 2,
          height: ORBIT_RADIUS * 2,
          border: "1px solid var(--phj-border-default)",
          opacity: activeId ? 0.2 : 1,
          transition: "opacity var(--phj-motion-normal) var(--phj-ease-standard)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: ORBIT_RADIUS * 2 + 120,
          height: ORBIT_RADIUS * 2 + 120,
          border: "1px dashed var(--phj-border-default)",
          opacity: activeId ? 0.1 : 0.6,
          transition: "opacity var(--phj-motion-normal) var(--phj-ease-standard)",
        }}
      />

      <ResourceSatellites
        module={activeModule}
        open={phase === "loaded"}
        accent={
          activeModule
            ? `var(${activeModule.accentVar})`
            : "var(--phj-border-glow)"
        }
      />

      <DeveloperCore
        phase={phase}
        activeModule={activeModule}
        onEject={onEject}
      />

      {/* Rotator — one element rotates; each chip counter-rotates by -rotation
          to stay upright. Because chips travel along a rigid ring, their
          screen-space path is a smooth arc during the align spin. */}
      <div
        aria-hidden
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transform: `rotate(${rotation}deg)`,
          transition: transformTransition(phase),
          transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        {MODULES.map((mod) => {
          const baseAngle = BASE_ANGLES[mod.id];
          const rad = (baseAngle * Math.PI) / 180;
          const baseX = Math.cos(rad) * ORBIT_RADIUS;
          const baseY = Math.sin(rad) * ORBIT_RADIUS;

          const isActive = activeId === mod.id;
          const isOther = activeId != null && !isActive;
          const docked = isActive && (phase === "inserting" || phase === "loaded");

          // Dock target lives on the same radial line as the base slot but
          // pulled inward — align guarantees this maps to (0, -DOCK_RADIUS)
          // on screen so the chip's bottom pins meet the core's top pins.
          const targetX = docked ? baseX * dockScale : baseX;
          const targetY = docked ? baseY * dockScale : baseY;

          const transform =
            `translate(calc(${targetX}px - 50%), calc(${targetY}px - 50%)) ` +
            `rotate(${-rotation}deg)`;

          // Chip fades slightly once seated so the workspace panel can breathe;
          // stays fully opaque through the descent so the docking reads clearly.
          const chipOpacity = isOther ? 0.14 : phase === "loaded" && isActive ? 0.9 : 1;

          return (
            <div
              key={mod.id}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform,
                opacity: chipOpacity,
                filter: isOther ? "blur(1px)" : "none",
                transition: chipTransition(phase),
                pointerEvents: chipsDisabled ? "none" : "auto",
                zIndex: isActive ? 5 : 1,
              }}
            >
              <AIModuleCard
                module={mod}
                onSelect={onSelectModule}
                disabled={chipsDisabled}
                illuminated={isActive}
                contact={isActive && phase === "loaded"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
