"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { MCP_PATH, MCP_PUBLIC_URL } from "@/lib/profile/catalog";

type Tab = "screen" | "mcp";

interface Props {
  open: boolean;
  onClose: () => void;
  initialTab?: Tab;
}

function cursorConfig(url: string) {
  return `{
  "mcpServers": {
    "codinglarva": {
      "type": "http",
      "url": "${url}"
    }
  }
}`;
}

function CopyBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      style={{
        border: "1px solid var(--phj-border-default)",
        borderRadius: "var(--phj-radius-sm)",
        background: "var(--phj-bg-default)",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: "6px 10px",
          borderBottom: "1px solid var(--phj-border-default)",
        }}
      >
        <span
          className="phj-mono"
          style={{ fontSize: 10, color: "var(--phj-text-muted)" }}
        >
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center"
          style={{
            gap: 4,
            color: "var(--phj-text-secondary)",
            fontSize: 11,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre
        className="phj-mono phj-scroll"
        style={{
          margin: 0,
          padding: "var(--phj-space-12)",
          fontSize: 11,
          color: "var(--phj-text-primary)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          maxHeight: 160,
          overflow: "auto",
        }}
      >
        {value}
      </pre>
    </div>
  );
}

export function UsageManual({ open, onClose, initialTab = "screen" }: Props) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [localUrl, setLocalUrl] = useState(MCP_PATH);

  useEffect(() => {
    if (!open) return;
    setTab(initialTab);
    setLocalUrl(`${window.location.origin}${MCP_PATH}`);
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "10vh",
        background: "var(--phj-bg-overlay)",
        backdropFilter: "blur(4px)",
        animation: "phj-cmd-fade var(--phj-motion-normal) var(--phj-ease-standard)",
      }}
    >
      <div
        role="dialog"
        aria-labelledby="phj-manual-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 560,
          maxWidth: "92vw",
          maxHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--phj-radius-lg)",
          background:
            "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
          border: "1px solid var(--phj-border-strong)",
          boxShadow: "var(--phj-shadow-3)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            padding: "var(--phj-space-16)",
            borderBottom: "1px solid var(--phj-border-default)",
          }}
        >
          <div>
            <div
              id="phj-manual-title"
              style={{ fontSize: 15, color: "var(--phj-text-primary)" }}
            >
              사용 설명서
            </div>
            <div
              className="phj-mono"
              style={{
                marginTop: 4,
                fontSize: 11,
                color: "var(--phj-text-muted)",
              }}
            >
              이 화면 · MCP 연결
            </div>
          </div>
          <kbd
            className="phj-mono"
            style={{
              padding: "2px 6px",
              border: "1px solid var(--phj-border-strong)",
              borderRadius: "var(--phj-radius-xs)",
              color: "var(--phj-text-muted)",
              fontSize: 10,
            }}
          >
            ESC
          </kbd>
        </div>

        <div
          className="flex"
          style={{
            padding: "0 var(--phj-space-16)",
            gap: "var(--phj-space-8)",
            borderBottom: "1px solid var(--phj-border-default)",
          }}
        >
          {(
            [
              ["screen", "이 화면"],
              ["mcp", "MCP 연결"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className="phj-mono"
              style={{
                padding: "10px 4px",
                fontSize: 11,
                color:
                  tab === id
                    ? "var(--phj-text-primary)"
                    : "var(--phj-text-muted)",
                borderBottom:
                  tab === id
                    ? "1px solid var(--phj-text-primary)"
                    : "1px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="phj-scroll"
          style={{
            padding: "var(--phj-space-16)",
            overflowY: "auto",
            fontSize: 13,
            color: "var(--phj-text-secondary)",
            lineHeight: 1.55,
          }}
        >
          {tab === "screen" ? (
            <div style={{ display: "grid", gap: "var(--phj-space-16)" }}>
              <p style={{ margin: 0, color: "var(--phj-text-primary)" }}>
                박효진의 AI 프로필입니다. 모듈을 코어에 장착하면 그 도구의
                규칙과 프롬프트를 볼 수 있습니다.
              </p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>스크롤 또는 ← → : 궤도 회전</li>
                <li>모듈 클릭 또는 Enter : 코어에 장착</li>
                <li>좌·우 패널 : 규칙 · 프롬프트 · 작업</li>
                <li>
                  ⌘K : 명령 팔레트 (모듈 검색, 추출)
                </li>
                <li>? : 이 설명서</li>
              </ul>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "var(--phj-space-16)" }}>
              <p style={{ margin: 0, color: "var(--phj-text-primary)" }}>
                Cursor에 이 URL을 MCP로 연결하면, 에이전트가 내 코딩 규칙과
                프롬프트를 조회합니다. 다른 PC에서도 같은 주소면 됩니다.
              </p>
              <p style={{ margin: 0, fontSize: 12 }}>
                Cursor는 <code>npx</code>가 필요 없습니다. Customize → MCP에
                URL만 넣습니다.
              </p>
              <CopyBlock label="운영 URL" value={MCP_PUBLIC_URL} />
              <CopyBlock label="지금 보고 있는 주소" value={localUrl} />
              <CopyBlock
                label=".cursor/mcp.json"
                value={cursorConfig(MCP_PUBLIC_URL)}
              />
              <div>
                <div
                  style={{
                    marginBottom: 8,
                    color: "var(--phj-text-primary)",
                    fontSize: 13,
                  }}
                >
                  도구
                </div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>
                    <code>get_rules</code> — 코딩 전 규칙. module 생략 시
                    Cursor
                  </li>
                  <li>
                    <code>list_prompts</code> / <code>get_prompt</code> —
                    작업용 프롬프트
                  </li>
                  <li>
                    <code>list_modules</code> — GPT, Claude, Cursor 등
                  </li>
                </ul>
              </div>
              <p style={{ margin: 0, fontSize: 12 }}>
                HTTP를 못 붙이는 클라이언트만{" "}
                <code>npx -y mcp-remote {MCP_PUBLIC_URL}</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
