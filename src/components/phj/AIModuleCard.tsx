import { StatusDot } from "./StatusDot";
import { ConnectorStrip } from "./ConnectorStrip";
import { monthsSince, type AIModule } from "./types";

interface Props {
  module: AIModule;
  onSelect?: (id: AIModule["id"]) => void;
  disabled?: boolean;
  /** Chip is chosen — bottom pins glow in the accent color. */
  illuminated?: boolean;
  /** One-shot flash when this chip finishes docking to the core. */
  contact?: boolean;
}

export function AIModuleCard({
  module,
  onSelect,
  disabled = false,
  illuminated = false,
  contact = false,
}: Props) {
  const accent = `var(${module.accentVar})`;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(module.id)}
      disabled={disabled}
      className="group relative flex flex-col text-left transition-transform"
      style={{
        width: 208,
        padding: "var(--phj-space-12) var(--phj-space-16)",
        gap: "var(--phj-space-8)",
        borderRadius: "var(--phj-radius-md)",
        background:
          "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
        border: illuminated
          ? `1px solid ${accent}`
          : "1px solid var(--phj-border-default)",
        boxShadow: illuminated
          ? `var(--phj-shadow-3), 0 0 32px ${accent}55`
          : "var(--phj-shadow-2)",
        color: "var(--phj-text-primary)",
        cursor: "pointer",
        transitionDuration: "var(--phj-motion-normal)",
        transitionTimingFunction: "var(--phj-ease-standard)",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `var(--phj-shadow-3), 0 0 24px ${accent}33`;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = illuminated
          ? accent
          : "var(--phj-border-default)";
        e.currentTarget.style.boxShadow = illuminated
          ? `var(--phj-shadow-3), 0 0 32px ${accent}55`
          : "var(--phj-shadow-2)";
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
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
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {module.name}
          </span>
        </div>
        <StatusDot status={module.status} />
      </div>

      <div style={{ fontSize: 11, color: "var(--phj-text-secondary)" }}>
        {module.role}
      </div>

      <div
        className="phj-mono grid"
        style={{
          gridTemplateColumns: "auto 1fr",
          rowGap: 2,
          columnGap: "var(--phj-space-8)",
          fontSize: 10,
          color: "var(--phj-text-muted)",
          paddingTop: "var(--phj-space-8)",
          borderTop: "1px solid var(--phj-border-default)",
        }}
      >
        <span>규칙</span>
        <span style={{ color: "var(--phj-text-secondary)" }}>{module.rules}</span>
        <span>프롬프트</span>
        <span style={{ color: "var(--phj-text-secondary)" }}>{module.prompts}</span>
        <span>버전</span>
        <span style={{ color: "var(--phj-text-secondary)" }}>{module.version}</span>
        <span>구독</span>
        <span style={{ color: "var(--phj-text-secondary)" }}>
          {monthsSince(module.subscribedSince)}개월째
        </span>
      </div>

      {/* Bottom edge connector — meets the core's top strip when docked */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ConnectorStrip
          direction="down"
          illuminated={illuminated}
          contact={contact}
          accent={accent}
          count={8}
        />
      </div>
    </button>
  );
}
