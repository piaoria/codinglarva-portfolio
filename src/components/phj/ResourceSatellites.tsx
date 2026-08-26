import { useEffect, useState, type CSSProperties } from "react";
import { X, Check, Copy } from "lucide-react";
import type { AIModule, ResourcePanel } from "./types";

interface Props {
  /** The docked module whose materials are shown. */
  module: AIModule | null;
  /** Fully seated — panels fade into the margins. */
  open: boolean;
  accent: string;
}

const PANEL_WIDTH = 236;
/** Horizontal distance from field center to a panel's center. */
const COLUMN_X = 428;
/** Vertical offset of the upper/lower slots from field center. */
const SLOT_Y = 96;
/** Length of the trace running from a panel's inner edge toward the core. */
const TRACE_LEN = 56;
/** Per-panel fade-in stagger. */
const STEP_MS = 90;

/**
 * Related materials that fade into the left/right margins once a module docks.
 * Each panel is dim by default; hovering it — and its trace into the core —
 * lights up in the module's accent, reading like a board component wiring in.
 *
 * Clicking a panel expands it *from its core-facing edge outward* into a clean
 * reader (option A): the panel appears to unfold from the trace that links it
 * to the core, so reading a resource feels continuous with the docking metaphor
 * rather than a boxy overlay popping in.
 */
export function ResourceSatellites({ module, open, accent }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<ResourcePanel | null>(null);
  // Staggered entrance runs only on the docking reveal — not when a reader
  // opens/closes — so returning from a reader restores all panels at once.
  const [entering, setEntering] = useState(false);
  const panels = module?.resources ?? [];

  // Reset any open reader when the module ejects.
  useEffect(() => {
    if (!open) setActive(null);
  }, [open]);

  // Arm the stagger briefly whenever the module docks.
  useEffect(() => {
    if (!open) {
      setEntering(false);
      return;
    }
    setEntering(true);
    const t = window.setTimeout(() => setEntering(false), 700);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        pointerEvents: open ? "auto" : "none",
        zIndex: 3,
      }}
    >
      {panels.map((panel, i) => (
        <SatellitePanel
          key={panel.id}
          panel={panel}
          index={i}
          open={open}
          // The clicked panel hides behind its reader; the rest dim (instantly).
          readerOpen={active != null}
          isActivePanel={active?.id === panel.id}
          entering={entering}
          accent={accent}
          hovered={hovered === panel.id}
          onHover={() => setHovered(panel.id)}
          onLeave={() => setHovered((h) => (h === panel.id ? null : h))}
          onOpen={() => setActive(panel)}
        />
      ))}

      <ResourceReader
        panel={active}
        module={module}
        accent={accent}
        onClose={() => setActive(null)}
      />

      <style>{`
        @keyframes phj-signal-l {
          from { left: 0; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          to   { left: 100%; opacity: 0; }
        }
        @keyframes phj-signal-r {
          from { right: 0; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          to   { right: 100%; opacity: 0; }
        }
        @keyframes phj-reader-row {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes phj-reader-unfold {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

interface PanelProps {
  panel: ResourcePanel;
  index: number;
  open: boolean;
  /** A reader is currently expanded. */
  readerOpen: boolean;
  /** This panel is the one whose reader is open (hide it behind the reader). */
  isActivePanel: boolean;
  /** Docking reveal is in progress — apply the staggered entrance. */
  entering: boolean;
  accent: string;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onOpen: () => void;
}

function SatellitePanel({
  panel,
  index,
  open,
  readerOpen,
  isActivePanel,
  entering,
  accent,
  hovered,
  onHover,
  onLeave,
  onOpen,
}: PanelProps) {
  const isLeft = panel.side === "left";
  const cx = isLeft ? -COLUMN_X : COLUMN_X;
  const cy = panel.slot === 0 ? -SLOT_Y : SLOT_Y;

  // Nudge toward the core on hover so it reads as "clicking into" the socket.
  const connectNudge = hovered ? (isLeft ? 4 : -4) : 0;

  // Featured panels (representative rules/prompts) rest bright so the key
  // "how I work" material reads without hovering; others rest dimmed.
  const restOpacity = panel.featured ? 0.94 : 0.62;
  const lit = hovered || panel.featured;

  // Visibility: hidden until docked; the active panel hides behind its reader,
  // the others dim while a reader is open. Only the docking reveal staggers.
  const opacity = !open
    ? 0
    : isActivePanel && readerOpen
      ? 0
      : readerOpen
        ? 0.16
        : hovered
          ? 1
          : restOpacity;
  const delay = entering && !readerOpen ? index * STEP_MS : 0;

  return (
    <div
      role="button"
      tabIndex={open ? 0 : -1}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: PANEL_WIDTH,
        cursor: "pointer",
        transform: `translate(calc(${cx + connectNudge}px - 50%), calc(${cy}px - 50%))`,
        opacity,
        pointerEvents: open && !isActivePanel ? "auto" : "none",
        transition: `opacity var(--phj-motion-normal) var(--phj-ease-standard) ${delay}ms, transform var(--phj-motion-normal) var(--phj-ease-standard)`,
      }}
    >
      {/* Trace running from the panel's inner edge toward the core. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: -TRACE_LEN,
          width: TRACE_LEN,
          height: 1,
          transform: "translateY(-50%)",
          overflow: "visible",
          background: lit
            ? `linear-gradient(${isLeft ? "90deg" : "270deg"}, transparent, ${accent})`
            : `linear-gradient(${isLeft ? "90deg" : "270deg"}, transparent, ${accent}55)`,
          boxShadow: hovered ? `0 0 8px ${accent}` : "none",
          transition: "background var(--phj-motion-normal), box-shadow var(--phj-motion-normal)",
        }}
      >
        {/* Signal particle flowing toward the core. */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            width: 4,
            height: 4,
            marginTop: -2,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 6px ${accent}`,
            animation: `${isLeft ? "phj-signal-l" : "phj-signal-r"} ${
              hovered ? 0.9 : 2.2
            }s linear infinite`,
          }}
        />
      </div>
      {/* Contact pad at the core end of the trace. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: -TRACE_LEN - 3,
          width: 6,
          height: 6,
          transform: "translateY(-50%)",
          borderRadius: 2,
          background: lit ? accent : `${accent}88`,
          boxShadow: hovered ? `0 0 10px ${accent}` : lit ? `0 0 6px ${accent}66` : `0 0 4px ${accent}44`,
          transition: "background var(--phj-motion-normal), box-shadow var(--phj-motion-normal)",
        }}
      />

      <div
        style={{
          padding: "var(--phj-space-12)",
          borderRadius: "var(--phj-radius-md)",
          background:
            "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
          border: `1px solid ${lit ? accent : "var(--phj-border-strong)"}`,
          boxShadow: hovered
            ? `var(--phj-shadow-3), 0 0 28px ${accent}44`
            : panel.featured
              ? `var(--phj-shadow-2), 0 0 18px ${accent}22`
              : "var(--phj-shadow-2)",
          transition:
            "border-color var(--phj-motion-normal), box-shadow var(--phj-motion-normal)",
        }}
      >
        <div
          className="phj-mono flex items-center justify-between"
          style={{
            gap: "var(--phj-space-8)",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: lit ? "var(--phj-text-primary)" : "var(--phj-text-secondary)",
            transition: "color var(--phj-motion-normal)",
          }}
        >
          <span className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 2,
                background: lit ? accent : `${accent}99`,
                boxShadow: hovered ? `0 0 6px ${accent}` : lit ? `0 0 4px ${accent}66` : `0 0 3px ${accent}33`,
              }}
            />
            {panel.title}
          </span>
          <span style={{ color: "var(--phj-text-muted)" }}>
            {hovered ? "펼치기" : panel.doc ? `${panel.doc.length} 섹션` : `${panel.items?.length ?? 0}`}
          </span>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "var(--phj-space-8) 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {panel.doc
            ? panel.doc.map((section) => (
                <li
                  key={section.heading}
                  className="flex items-center justify-between"
                  style={{
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: lit
                      ? "var(--phj-text-primary)"
                      : "var(--phj-text-secondary)",
                    transition: "color var(--phj-motion-normal)",
                  }}
                >
                  <span className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
                    <span
                      aria-hidden
                      className="phj-mono"
                      style={{ color: "var(--phj-text-muted)", flexShrink: 0 }}
                    >
                      #
                    </span>
                    {section.heading}
                  </span>
                  <span className="phj-mono" style={{ color: "var(--phj-text-muted)" }}>
                    ·{section.lines.length}
                  </span>
                </li>
              ))
            : (panel.items ?? []).map((item) => (
                <li
                  key={item}
                  className="flex items-start"
                  style={{
                    gap: "var(--phj-space-8)",
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: lit
                      ? "var(--phj-text-primary)"
                      : "var(--phj-text-secondary)",
                    transition: "color var(--phj-motion-normal)",
                  }}
                >
                  <span
                    aria-hidden
                    className="phj-mono"
                    style={{ color: "var(--phj-text-muted)", flexShrink: 0 }}
                  >
                    ›
                  </span>
                  {item}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

interface ReaderProps {
  panel: ResourcePanel | null;
  module: AIModule | null;
  accent: string;
  onClose: () => void;
}

/** Reader width — kept clear of the core so it never overlaps the card. */
const READER_WIDTH = 380;
/** Half-width of the core card when loaded — the reader parks clear of this. */
const CORE_HALF = 230;
/** Gap between the reader's inner edge and the core edge (the trace length). */
const READER_GAP = 56;

/**
 * The expanded reader. It occupies the clicked panel's own column, vertically
 * centered, and unfolds from its core-facing edge (transform-origin on that
 * side) so it reads as growing out of the trace that connects it to the core.
 * A bright animated trace + contact pin keep it visibly wired to the core.
 *
 * Content is deliberately chrome-light: sections as accent headings with a thin
 * rail, no line-number gutter or filename tab clutter.
 */
function ResourceReader({ panel, module, accent, onClose }: ReaderProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!panel) return;
    setCopied(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, onClose]);

  if (!panel) return null;
  const shown = panel;

  const isLeft = shown.side === "left";
  // Anchor by the core edge + gap so the reader always parks clear of the core
  // regardless of its width — its inner edge sits exactly READER_GAP away.
  const cx =
    (isLeft ? -1 : 1) * (CORE_HALF + READER_GAP + READER_WIDTH / 2);
  // Anchor the reader at the clicked slot's height so it unfolds from that
  // panel's own position, not from the midpoint between the two slots.
  const cy = shown.slot === 0 ? -SLOT_Y : SLOT_Y;

  const copyDoc = () => {
    if (!shown.doc) return;
    const text = shown.doc
      .map((s) => `# ${s.heading}\n\n${s.lines.map((l) => `- ${l}`).join("\n")}`)
      .join("\n\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  // Trace bridges the reader's inner edge to the core edge — exactly the gap.
  const innerTrace = READER_GAP;

  return (
    // Outer positions the reader on its column — repositioned instantly (no
    // transition) so switching sides never slides the card across the field.
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`,
        zIndex: 6,
      }}
    >
    {/* Inner re-mounts per panel (keyed) so the unfold replays every open,
        always from the correct core-facing edge. */}
    <div
      key={shown.id}
      className="flex flex-col"
      style={{
        position: "relative",
        width: READER_WIDTH,
        maxHeight: 560,
        transformOrigin: isLeft ? "right center" : "left center",
        animation: `phj-reader-unfold var(--phj-motion-normal) var(--phj-ease-standard)`,
        padding: "var(--phj-space-16)",
        borderRadius: "var(--phj-radius-lg)",
        background:
          "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
        border: `1px solid ${accent}`,
        boxShadow: `var(--phj-shadow-3), 0 0 48px ${accent}33`,
        gap: "var(--phj-space-12)",
      }}
    >
      {/* Bright trace + contact pin wiring the reader to the core. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: -innerTrace,
          width: innerTrace,
          height: 2,
          transform: "translateY(-50%)",
          background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, transparent, ${accent})`,
          boxShadow: `0 0 10px ${accent}`,
          overflow: "visible",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            width: 5,
            height: 5,
            marginTop: -2.5,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
            animation: `${isLeft ? "phj-signal-l" : "phj-signal-r"} 1.1s linear infinite`,
          }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: -innerTrace - 3,
          width: 7,
          height: 7,
          transform: "translateY(-50%)",
          borderRadius: 2,
          background: accent,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="phj-mono flex items-center"
          style={{ gap: "var(--phj-space-8)", fontSize: 10, color: "var(--phj-text-muted)", letterSpacing: "0.14em" }}
        >
          <span
            aria-hidden
            style={{ width: 8, height: 8, borderRadius: 3, background: accent, boxShadow: `0 0 10px ${accent}` }}
          />
          {module?.name.toUpperCase()} · {shown.side === "left" ? "L" : "R"}
          {shown.slot + 1}
        </span>
        <div className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
          {shown.doc && (
            <button
              type="button"
              onClick={copyDoc}
              aria-label="복사"
              className="flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                borderRadius: "var(--phj-radius-xs)",
                border: "1px solid var(--phj-border-strong)",
                background: "transparent",
                color: copied ? "var(--phj-status-online)" : "var(--phj-text-secondary)",
                cursor: "pointer",
              }}
            >
              {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex items-center justify-center"
            style={{
              width: 26,
              height: 26,
              borderRadius: "var(--phj-radius-xs)",
              border: "1px solid var(--phj-border-strong)",
              background: "transparent",
              color: "var(--phj-text-secondary)",
              cursor: "pointer",
            }}
          >
            <X size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--phj-text-primary)",
          }}
        >
          {shown.title}
        </h2>
        {shown.filename && (
          <span
            className="phj-mono"
            style={{ fontSize: 10, color: "var(--phj-text-muted)" }}
          >
            {shown.filename}
          </span>
        )}
      </div>

      {/* Body — scrolls independently. Rows fade+rise in a quick stagger. */}
      <div
        className={shown.doc ? "phj-scroll" : undefined}
        style={{
          // Only the long rules docs can scroll; short lists (prompts/projects)
          // stay overflow-visible so no scrollbar ever shows for them.
          maxHeight: shown.doc ? 460 : undefined,
          overflowY: shown.doc ? "auto" : "visible",
          display: "flex",
          flexDirection: "column",
          gap: "var(--phj-space-16)",
          paddingRight: shown.doc ? "var(--phj-space-4)" : undefined,
          ["--phj-scroll-accent" as string]: accent,
        } as CSSProperties}
      >
        {shown.detail && !shown.doc && (
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "var(--phj-text-secondary)" }}>
            {shown.detail}
          </p>
        )}

        {shown.doc
          ? shown.doc.map((section, si) => (
              <section
                key={section.heading}
                style={{
                  opacity: 0,
                  animation: `phj-reader-row var(--phj-motion-normal) var(--phj-ease-standard) ${120 + si * 70}ms forwards`,
                  paddingLeft: "var(--phj-space-12)",
                  borderLeft: `2px solid ${accent}`,
                }}
              >
                <div
                  className="phj-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: accent,
                    marginBottom: "var(--phj-space-8)",
                  }}
                >
                  {section.heading}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {section.lines.map((line) => (
                    <li
                      key={line}
                      className="flex items-start"
                      style={{ gap: "var(--phj-space-8)", fontSize: 13, lineHeight: 1.5, color: "var(--phj-text-primary)" }}
                    >
                      <span aria-hidden style={{ color: "var(--phj-text-muted)", flexShrink: 0 }}>–</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            ))
          : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--phj-space-8)" }}>
              {(shown.items ?? []).map((item, i) => (
                <li
                  key={item}
                  className="flex items-center"
                  style={{
                    gap: "var(--phj-space-12)",
                    padding: "var(--phj-space-12)",
                    borderRadius: "var(--phj-radius-md)",
                    background: "var(--phj-bg-default)",
                    border: "1px solid var(--phj-border-default)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "var(--phj-text-primary)",
                    opacity: 0,
                    animation: `phj-reader-row var(--phj-motion-normal) var(--phj-ease-standard) ${120 + i * 60}ms forwards`,
                  }}
                >
                  <span className="phj-mono" style={{ color: accent, flexShrink: 0, fontSize: 11 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
    </div>
  );
}
