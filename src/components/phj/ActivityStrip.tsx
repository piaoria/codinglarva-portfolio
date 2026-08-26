import { useState } from "react";
import { ChevronUp } from "lucide-react";

interface Entry {
  time: string;
  source: string;
  message: string;
}

const ENTRIES: Entry[] = [
  { time: "09:20", source: "gpt", message: "아키텍처 초안 생성" },
  { time: "10:12", source: "cursor", message: "컴포넌트 구조 리팩터링" },
  { time: "11:30", source: "claude", message: "API 설계 검토" },
  { time: "13:40", source: "figma", message: "디자인 토큰 업데이트" },
  { time: "15:10", source: "portfolio", message: "새 케이스 스터디 게시" },
];

export function ActivityStrip() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Expanded vertical timeline — slides up from the footer. */}
      <div
        style={{
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--phj-motion-slow) var(--phj-ease-standard)",
          borderTop: open ? "1px solid var(--phj-border-default)" : "none",
          background: "var(--phj-bg-overlay)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ minHeight: 0 }}>
          <div
            style={{
              padding: "var(--phj-space-16) var(--phj-space-24)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--phj-space-12)",
            }}
          >
            {[...ENTRIES].reverse().map((e) => (
              <div
                key={e.time}
                className="flex items-center"
                style={{ gap: "var(--phj-space-16)" }}
              >
                <span
                  className="phj-mono"
                  style={{ fontSize: 11, color: "var(--phj-text-muted)", width: 40 }}
                >
                  {e.time}
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: "var(--phj-border-glow)",
                    boxShadow: "var(--phj-shadow-glow)",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="phj-mono"
                  style={{
                    fontSize: 10,
                    padding: "1px 6px",
                    borderRadius: "var(--phj-radius-xs)",
                    background: "var(--phj-bg-panel)",
                    color: "var(--phj-text-secondary)",
                  }}
                >
                  {e.source}
                </span>
                <span style={{ fontSize: 13, color: "var(--phj-text-primary)" }}>
                  {e.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer
        className="phj-mono flex items-center overflow-hidden"
        style={{
          height: 32,
          paddingInline: "var(--phj-space-24)",
          gap: "var(--phj-space-24)",
          borderTop: "1px solid var(--phj-border-default)",
          background: "var(--phj-bg-overlay)",
          backdropFilter: "blur(12px)",
          fontSize: 10,
          color: "var(--phj-text-muted)",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="phj-mono flex items-center"
          style={{
            gap: "var(--phj-space-8)",
            background: "transparent",
            border: "none",
            color: "var(--phj-text-secondary)",
            cursor: "pointer",
            fontSize: 10,
          }}
        >
          <ChevronUp
            size={12}
            strokeWidth={1.5}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform var(--phj-motion-normal) var(--phj-ease-standard)",
            }}
          />
          활동
        </button>
        {ENTRIES.map((e) => (
          <span
            key={e.time}
            className="flex items-center"
            style={{ gap: "var(--phj-space-8)", whiteSpace: "nowrap" }}
          >
            <span>{e.time}</span>
            <span
              style={{
                padding: "1px 6px",
                borderRadius: "var(--phj-radius-xs)",
                background: "var(--phj-bg-panel)",
                color: "var(--phj-text-secondary)",
              }}
            >
              {e.source}
            </span>
            <span style={{ color: "var(--phj-text-secondary)" }}>{e.message}</span>
          </span>
        ))}
      </footer>
    </>
  );
}
