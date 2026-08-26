import { CalendarClock } from "lucide-react";
import { StatusDot } from "./StatusDot";
import { ConnectorStrip } from "./ConnectorStrip";
import { formatSubscription, type AIModule, type InsertionPhase } from "./types";

interface Props {
  phase: InsertionPhase;
  activeModule: AIModule | null;
  onEject: () => void;
}

const IDENTITY_TAGS = ["React", "TypeScript", "Tailwind", "AI 도구", "MCP"];
const BOOT_LINE_MS = 220;

/** Work-style "fingerprint" — rendered as mini bars in the core. */
const AI_DNA: { label: string; value: number }[] = [
  { label: "구조 설계", value: 0.9 },
  { label: "디테일", value: 0.82 },
  { label: "속도", value: 0.66 },
  { label: "실험성", value: 0.74 },
];

export function DeveloperCore({ phase, activeModule, onEject }: Props) {
  const engaged = phase !== "idle"; // pins/border/glow start reacting on click
  const receiving = phase === "aligning";
  const docking = phase === "inserting";
  const loaded = phase === "loaded"; // width/workspace growth waits for full dock
  const accent = activeModule
    ? `var(${activeModule.accentVar})`
    : "var(--phj-border-glow)";

  // Reserve visual space so the outer rings don't jump when the workspace opens.
  const wrapperSize = 480;
  const cardWidth = loaded ? 460 : 372;
  // Card is anchored to a fixed top offset (NOT flex-centered) so the workspace
  // panel can only grow downward. This keeps the top pin strip at a constant
  // screen position — required so the chip's dock target stays valid whether
  // the core is compact or expanded.
  const cardTopOffset = 90;

  return (
    <div
      className="relative"
      style={{
        width: wrapperSize,
        height: wrapperSize,
      }}
    >
      {/* Rotating outer ring */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px dashed var(--phj-border-strong)",
          animation: "phj-rotate 32s linear infinite",
          opacity: engaged ? 1 : 0.7,
          transition: "opacity var(--phj-motion-normal) var(--phj-ease-standard)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: 28,
          border: "1px solid var(--phj-border-default)",
        }}
      />

      {/* Power-on pulse — one expanding ring the moment the module seats. */}
      {loaded && (
        <div
          key="power-pulse"
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${accent}`,
            animation: "phj-power-pulse 900ms var(--phj-ease-standard) forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Core card — anchored to top of wrapper so it grows downward only. */}
      <div
        className="relative flex flex-col"
        style={{
          position: "absolute",
          top: cardTopOffset,
          left: "50%",
          transform: "translateX(-50%)",
          width: cardWidth,
          padding: "var(--phj-space-16) var(--phj-space-16) var(--phj-space-16)",
          borderRadius: "var(--phj-radius-lg)",
          background:
            "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
          border: `1px solid ${engaged ? accent : "var(--phj-border-strong)"}`,
          boxShadow: loaded
            ? `var(--phj-shadow-core), var(--phj-shadow-3), 0 0 120px ${accent}66`
            : engaged
              ? `var(--phj-shadow-core), var(--phj-shadow-3), 0 0 72px ${accent}44`
              : "var(--phj-shadow-core), var(--phj-shadow-3)",
          gap: "var(--phj-space-12)",
          transition:
            "width var(--phj-motion-slow) var(--phj-ease-standard), border-color var(--phj-motion-normal), box-shadow var(--phj-motion-normal)",
        }}
      >
        {/* Idle scanline — subtle "powered device" life sign. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--phj-radius-lg)",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.5,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 40,
              background: `linear-gradient(180deg, transparent, ${accent}14, transparent)`,
              animation: "phj-scan 5.5s linear infinite",
            }}
          />
        </div>

        {/* Top edge connector — receives the chip landing from 12 o'clock */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ConnectorStrip
            direction="up"
            illuminated={engaged}
            contact={loaded}
            accent={accent}
            count={8}
          />
        </div>

        {/* Header line */}
        <div className="flex items-center justify-between">
          <span
            className="phj-mono"
            style={{
              fontSize: 10,
              color: "var(--phj-text-muted)",
              letterSpacing: "0.14em",
            }}
          >
            @CODINGLARVA · CORE
          </span>
          <span
            className="phj-mono flex items-center"
            style={{
              fontSize: 10,
              color: "var(--phj-text-secondary)",
              gap: "var(--phj-space-4)",
            }}
          >
            <StatusDot status="connected" pulse />
            {loaded ? "워크스페이스" : docking ? "도킹 중" : receiving ? "수신 중" : "온라인"}
          </span>
        </div>

        {/* Identity block */}
        <div className="flex items-center" style={{ gap: "var(--phj-space-12)" }}>
          <div
            aria-hidden
            style={{
              width: 56,
              height: 56,
              flexShrink: 0,
              borderRadius: "var(--phj-radius-md)",
              background:
                "linear-gradient(135deg, var(--phj-border-glow) 0%, var(--phj-bg-panel) 100%)",
              border: "1px solid var(--phj-border-strong)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--phj-text-primary)",
              boxShadow: "var(--phj-shadow-glow)",
            }}
          >
            CL
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "var(--phj-text-primary)",
              }}
            >
              CodingLarva
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--phj-text-secondary)",
                marginTop: 2,
              }}
            >
              개발자 · AI 워크플로우 디자이너
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            lineHeight: 1.55,
            color: "var(--phj-text-secondary)",
            margin: 0,
          }}
        >
          AI 도구가 제 개발 과정의 연장선이 되는 워크플로우를
          만듭니다.
        </p>

        <div className="flex flex-wrap" style={{ gap: "var(--phj-space-4)" }}>
          {IDENTITY_TAGS.map((tag) => (
            <span
              key={tag}
              className="phj-mono"
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: "var(--phj-radius-full)",
                border: "1px solid var(--phj-border-default)",
                background: "var(--phj-bg-default)",
                color: "var(--phj-text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="phj-mono grid"
          style={{
            gridTemplateColumns: "auto 1fr",
            rowGap: 4,
            columnGap: "var(--phj-space-12)",
            fontSize: 10,
            color: "var(--phj-text-muted)",
            paddingTop: "var(--phj-space-8)",
            borderTop: "1px solid var(--phj-border-default)",
          }}
        >
          <span>모드</span>
          <span style={{ color: "var(--phj-text-secondary)" }}>개인용 AI OS</span>
          <span>포커스</span>
          <span style={{ color: "var(--phj-text-secondary)" }}>Portfolio v0.1</span>
          <span>ai dna</span>
          <span style={{ color: "var(--phj-text-secondary)" }}>ko · ts · detailed</span>
        </div>

        <DnaBars accent={engaged ? accent : "var(--phj-border-glow)"} />

        {/* Workspace section — grows into existence once the module has docked. */}
        <WorkspacePanel
          open={loaded}
          module={activeModule}
          accent={accent}
          onEject={onEject}
        />
      </div>

      <style>{`
        @keyframes phj-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes phj-line-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes phj-power-pulse {
          from { transform: scale(1); opacity: 0.9; }
          to   { transform: scale(1.35); opacity: 0; }
        }
        @keyframes phj-scan {
          from { top: -40px; }
          to   { top: 100%; }
        }
        @keyframes phj-dna-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

function DnaBars({ accent }: { accent: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        columnGap: "var(--phj-space-8)",
        rowGap: 6,
      }}
    >
      {AI_DNA.map((d, i) => (
        <div key={d.label} style={{ display: "contents" }}>
          <span
            className="phj-mono"
            style={{ fontSize: 10, color: "var(--phj-text-muted)", whiteSpace: "nowrap" }}
          >
            {d.label}
          </span>
          <span
            aria-hidden
            style={{
              height: 4,
              borderRadius: 2,
              background: "var(--phj-bg-default)",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "block",
                height: "100%",
                width: `${Math.round(d.value * 100)}%`,
                borderRadius: 2,
                background: accent,
                boxShadow: `0 0 8px ${accent}66`,
                transformOrigin: "left",
                animation: `phj-dna-grow var(--phj-motion-slow) var(--phj-ease-standard) ${
                  i * 80
                }ms both`,
              }}
            />
          </span>
          <span
            className="phj-mono"
            style={{ fontSize: 9, color: "var(--phj-text-muted)", width: 26, textAlign: "right" }}
          >
            {Math.round(d.value * 100)}
          </span>
        </div>
      ))}
    </div>
  );
}

interface WorkspacePanelProps {
  open: boolean;
  module: AIModule | null;
  accent: string;
  onEject: () => void;
}

function WorkspacePanel({ open, module, accent, onEject }: WorkspacePanelProps) {
  const lines = module?.bootLog ?? [];

  return (
    <div
      style={{
        // grid-rows trick lets us animate max-height without knowing content size
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition:
          "grid-template-rows var(--phj-motion-slow) var(--phj-ease-standard), opacity var(--phj-motion-normal) var(--phj-ease-standard)",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div
          className="phj-mono"
          style={{
            marginTop: "var(--phj-space-12)",
            padding: "var(--phj-space-12)",
            borderRadius: "var(--phj-radius-md)",
            background: "var(--phj-bg-default)",
            border: "1px solid var(--phj-border-default)",
            fontSize: 11,
            color: "var(--phj-text-secondary)",
          }}
        >
          {/* Prominent subscription chip — the module's real usage age reads at
              a glance in an accent-filled pill instead of a muted line. */}
          {module && (
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "var(--phj-space-12)" }}
            >
              <span
                className="phj-mono flex items-center"
                style={{
                  gap: "var(--phj-space-8)",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: "var(--phj-radius-full)",
                  border: `1px solid ${accent}`,
                  background: `${accent}1f`,
                  color: "var(--phj-text-primary)",
                  boxShadow: `0 0 16px ${accent}33`,
                }}
              >
                <CalendarClock size={13} strokeWidth={1.75} style={{ color: accent }} />
                {module.name} 구독 {formatSubscription(module.subscribedSince)}
              </span>
              <button
                type="button"
                onClick={onEject}
                className="phj-mono"
                style={{
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: "var(--phj-radius-xs)",
                  background: "transparent",
                  border: "1px solid var(--phj-border-strong)",
                  color: "var(--phj-text-secondary)",
                  cursor: "pointer",
                }}
              >
                추출 ⏏
              </button>
            </div>
          )}

          <div
            className="flex items-center"
            style={{
              gap: "var(--phj-space-8)",
              marginBottom: "var(--phj-space-8)",
              color: "var(--phj-text-primary)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            {module?.name.toLowerCase()}.workspace · 부팅
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1;
              return (
                <li
                  key={line}
                  style={{
                    // Re-run the stagger every time the workspace opens.
                    opacity: open ? undefined : 0,
                    animation: open
                      ? `phj-line-in var(--phj-motion-normal) var(--phj-ease-standard) ${i * BOOT_LINE_MS}ms forwards`
                      : undefined,
                    color: isLast ? "var(--phj-status-online)" : "var(--phj-text-muted)",
                    paddingBlock: 2,
                  }}
                >
                  <span style={{ color: "var(--phj-text-muted)", marginRight: 8 }}>›</span>
                  {line}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
