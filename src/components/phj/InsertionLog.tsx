import type { AIModule } from "./types";

interface Props {
  module: AIModule;
  onEject: () => void;
}

/**
 * Streams the module's bootLog line-by-line via staggered CSS animation-delay.
 * Sits centered under the core once the module has "arrived".
 */
export function InsertionLog({ module, onEject }: Props) {
  const accent = `var(${module.accentVar})`;
  const LINE_MS = 220;

  return (
    <div
      className="phj-mono"
      style={{
        position: "absolute",
        top: "calc(50% + 200px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 380,
        padding: "var(--phj-space-12) var(--phj-space-16)",
        borderRadius: "var(--phj-radius-md)",
        background: "var(--phj-bg-panel)",
        border: "1px solid var(--phj-border-strong)",
        boxShadow: "var(--phj-shadow-3)",
        fontSize: 11,
        color: "var(--phj-text-secondary)",
        animation: "phj-fade-in var(--phj-motion-normal) var(--phj-ease-standard) both",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "var(--phj-space-8)" }}
      >
        <span
          className="flex items-center"
          style={{ gap: "var(--phj-space-8)", color: "var(--phj-text-primary)" }}
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
          {module.name.toLowerCase()}.module · 부팅
        </span>
        <button
          type="button"
          onClick={onEject}
          className="phj-mono"
          style={{
            fontSize: 10,
            padding: "2px 8px",
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

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {module.bootLog.map((line, i) => {
          const isLast = i === module.bootLog.length - 1;
          return (
            <li
              key={line}
              style={{
                opacity: 0,
                animation: `phj-fade-in var(--phj-motion-normal) var(--phj-ease-standard) forwards`,
                animationDelay: `${i * LINE_MS}ms`,
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

      <style>{`
        @keyframes phj-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
