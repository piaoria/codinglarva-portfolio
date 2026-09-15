import Link from "next/link";
import { McpEndpoint } from "./McpEndpoint";
import { StatusDot } from "./StatusDot";

interface Props {
  onOpenManual?: (tab?: "screen" | "mcp") => void;
  onOpenPalette?: () => void;
}

export function TopSystemBar({ onOpenManual, onOpenPalette }: Props) {
  return (
    <header
      className="phj-mono flex items-center justify-between border-b"
      style={{
        height: 40,
        paddingInline: "var(--phj-space-24)",
        borderColor: "var(--phj-border-default)",
        background: "var(--phj-bg-overlay)",
        backdropFilter: "blur(12px)",
        fontSize: 11,
        color: "var(--phj-text-secondary)",
      }}
    >
      <div className="flex items-center" style={{ gap: "var(--phj-space-16)" }}>
        <Link
          href="/"
          style={{ color: "var(--phj-text-primary)", letterSpacing: "0.08em" }}
        >
          CODINGLARVA.AI
        </Link>
        <span style={{ color: "var(--phj-text-muted)" }}>/</span>
        <span>코어</span>
        <span style={{ color: "var(--phj-text-muted)" }}>/</span>
        <span>랜딩</span>
      </div>

      <div className="flex items-center" style={{ gap: "var(--phj-space-16)" }}>
        <span className="flex items-center" style={{ gap: "var(--phj-space-8)" }}>
          <StatusDot status="connected" pulse />
          <span>시스템 온라인</span>
        </span>
        <button type="button" onClick={() => onOpenManual?.("mcp")}>
          <McpEndpoint />
        </button>
        <button type="button" onClick={() => onOpenManual?.("screen")}>
          <kbd
            className="phj-mono"
            style={{
              padding: "2px 6px",
              border: "1px solid var(--phj-border-strong)",
              borderRadius: "var(--phj-radius-xs)",
              color: "var(--phj-text-primary)",
              fontSize: 10,
            }}
          >
            ?
          </kbd>{" "}
          사용법
        </button>
        <button type="button" onClick={onOpenPalette}>
          <kbd
            className="phj-mono"
            style={{
              padding: "2px 6px",
              border: "1px solid var(--phj-border-strong)",
              borderRadius: "var(--phj-radius-xs)",
              color: "var(--phj-text-primary)",
              fontSize: 10,
            }}
          >
            ⌘K
          </kbd>{" "}
          명령
        </button>
      </div>
    </header>
  );
}
