"use client";

import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";
import { TopSystemBar } from "./TopSystemBar";
import { OrbitalField } from "./OrbitalField";
import { ActivityStrip } from "./ActivityStrip";
import { CommandPalette } from "./CommandPalette";
import { UsageManual } from "./UsageManual";
import {
  BASE_ANGLES,
  MODULES,
  type InsertionPhase,
  type ModuleId,
} from "./types";

const ALIGN_MS = 520;
const INSERT_MS = 560;
const EJECT_MS = 380;
const WHEEL_GAIN = 0.35;
const ORBIT_STEP = 360 / 6;

function alignRotation(current: number, baseAngle: number): number {
  const raw = -90 - baseAngle;
  const diff = ((((raw - current) % 360) + 540) % 360) - 180;
  return current + diff;
}

function topModuleId(rotation: number): ModuleId {
  let best: ModuleId = MODULES[0].id;
  let bestDiff = Infinity;
  for (const m of MODULES) {
    const screen = BASE_ANGLES[m.id] + rotation;
    const diff = Math.abs(((((screen + 90) % 360) + 540) % 360) - 180);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = m.id;
    }
  }
  return best;
}

export default function AiProfileApp() {
  const [activeId, setActiveId] = useState<ModuleId | null>(null);
  const [phase, setPhase] = useState<InsertionPhase>("idle");
  const [rotation, setRotation] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualTab, setManualTab] = useState<"screen" | "mcp">("screen");
  const [showHint, setShowHint] = useState(true);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLElement>) => {
      if (phase !== "idle") return;
      setShowHint(false);
      setRotation((r) => r + e.deltaY * WHEEL_GAIN);
    },
    [phase]
  );

  const handleSelectModule = useCallback(
    (id: ModuleId) => {
      if (phase !== "idle") return;
      clearTimer();
      setShowHint(false);

      setActiveId(id);
      setPhase("aligning");
      setRotation((r) => alignRotation(r, BASE_ANGLES[id]));

      timerRef.current = window.setTimeout(() => {
        setPhase("inserting");
        timerRef.current = window.setTimeout(() => {
          setPhase("loaded");
        }, INSERT_MS);
      }, ALIGN_MS);
    },
    [phase]
  );

  const handleEject = useCallback(() => {
    clearTimer();
    setPhase("aligning");
    timerRef.current = window.setTimeout(() => {
      setActiveId(null);
      setPhase("idle");
    }, EJECT_MS);
  }, []);

  const openManual = useCallback((tab: "screen" | "mcp" = "screen") => {
    setManualTab(tab);
    setManualOpen(true);
    setPaletteOpen(false);
  }, []);

  useEffect(() => clearTimer, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (manualOpen) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
        ) {
          return;
        }
        e.preventDefault();
        openManual("screen");
        return;
      }
      if (paletteOpen) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return;
      }
      if (phase !== "idle") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setShowHint(false);
        setRotation((r) => r - ORBIT_STEP);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setShowHint(false);
        setRotation((r) => r + ORBIT_STEP);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSelectModule(topModuleId(rotation));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, manualOpen, phase, rotation, handleSelectModule, openManual]);

  const sectionLabel =
    phase === "idle"
      ? "CORE_LANDING"
      : phase === "aligning"
        ? `${activeId?.toUpperCase()}_ALIGN`
        : phase === "inserting"
          ? `${activeId?.toUpperCase()}_INSERT`
          : `${activeId?.toUpperCase()}_WORKSPACE`;

  return (
    <div
      className="phj-root flex flex-col"
      style={{ width: "100%", height: "100dvh", overflow: "hidden" }}
    >
      <TopSystemBar
        onOpenManual={openManual}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <div className="flex flex-1 min-h-0">
        <main
          className="relative flex-1 min-w-0"
          onWheel={handleWheel}
          style={{ touchAction: "none" }}
        >
          <div aria-hidden className="absolute inset-0 phj-grid-bg" />
          <div aria-hidden className="absolute inset-0 phj-radial-glow" />

          <div
            className="phj-mono absolute"
            style={{
              top: "var(--phj-space-24)",
              left: "var(--phj-space-32)",
              fontSize: 10,
              color: "var(--phj-text-muted)",
              letterSpacing: "0.16em",
            }}
          >
            SECTION · {sectionLabel}
          </div>

          <div
            className="phj-mono absolute flex items-center"
            style={{
              top: "var(--phj-space-24)",
              right: "var(--phj-space-32)",
              gap: "var(--phj-space-8)",
              fontSize: 10,
              color: "var(--phj-text-muted)",
            }}
          >
            <span>궤도</span>
            <span style={{ color: "var(--phj-text-secondary)" }}>
              {Math.round(((rotation % 360) + 360) % 360)}°
            </span>
            <span>·</span>
            <span>스크롤로 회전</span>
          </div>

          <div className="relative w-full h-full">
            <OrbitalField
              onSelectModule={handleSelectModule}
              onEject={handleEject}
              activeId={activeId}
              phase={phase}
              rotation={rotation}
            />

            {showHint && phase === "idle" && (
              <div
                className="phj-mono absolute"
                aria-hidden
                style={{
                  left: "50%",
                  top: "calc(50% - 250px)",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--phj-space-4)",
                  fontSize: 10,
                  color: "var(--phj-text-muted)",
                  pointerEvents: "none",
                  animation:
                    "phj-hint-float 2.4s var(--phj-ease-standard) infinite",
                }}
              >
                <span style={{ fontSize: 16 }}>↕</span>
                <span>스크롤 · ← → · Enter</span>
              </div>
            )}
          </div>

          <div
            className="absolute"
            style={{
              left: "var(--phj-space-32)",
              bottom: "var(--phj-space-24)",
              maxWidth: 320,
              opacity: activeId ? 0.3 : 1,
              transition:
                "opacity var(--phj-motion-normal) var(--phj-ease-standard)",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--phj-text-primary)",
                lineHeight: 1.25,
              }}
            >
              AI 기반 개발을 위한
              <br />
              나만의 운영체제.
            </div>
            <div
              className="phj-mono"
              style={{
                marginTop: "var(--phj-space-8)",
                fontSize: 11,
                color: "var(--phj-text-muted)",
              }}
            >
              스크롤로 궤도 회전 · 모듈 클릭 시 코어에 장착
            </div>
          </div>
        </main>
      </div>

      <ActivityStrip />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelectModule={handleSelectModule}
        onEject={handleEject}
        onOpenManual={() => openManual("screen")}
        loaded={phase === "loaded"}
      />
      <UsageManual
        open={manualOpen}
        initialTab={manualTab}
        onClose={() => setManualOpen(false)}
      />

      <style>{`
        @keyframes phj-hint-float {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%      { transform: translateX(-50%) translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
