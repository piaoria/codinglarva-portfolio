import { useEffect, useMemo, useRef, useState } from "react";
import { Search, CornerDownLeft, Cpu, LogOut, CircleHelp } from "lucide-react";
import { MODULES, type ModuleId } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectModule: (id: ModuleId) => void;
  onEject: () => void;
  onOpenManual: () => void;
  loaded: boolean;
}

interface Command {
  id: string;
  label: string;
  hint: string;
  run: () => void;
  accentVar?: string;
}

/**
 * ⌘K command palette — search and jump straight to a module (docking it)
 * or eject the current workspace. Fully keyboard driven.
 */
export function CommandPalette({
  open,
  onClose,
  onSelectModule,
  onEject,
  onOpenManual,
  loaded,
}: Props) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = MODULES.map((m) => ({
      id: `dock-${m.id}`,
      label: `${m.name} 장착`,
      hint: m.role,
      accentVar: m.accentVar,
      run: () => onSelectModule(m.id),
    }));
    list.push({
      id: "manual",
      label: "사용 설명서",
      hint: "화면 조작 · MCP 연결",
      run: onOpenManual,
    });
    if (loaded) {
      list.push({
        id: "eject",
        label: "모듈 추출",
        hint: "워크스페이스 닫기",
        run: onEject,
      });
    }
    return list;
  }, [onSelectModule, onEject, onOpenManual, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Reset + focus each time it opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  if (!open) return null;

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "14vh",
        background: "var(--phj-bg-overlay)",
        backdropFilter: "blur(4px)",
        animation: "phj-cmd-fade var(--phj-motion-normal) var(--phj-ease-standard)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setCursor((c) => (c + 1) % Math.max(1, filtered.length));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setCursor((c) => (c - 1 + filtered.length) % Math.max(1, filtered.length));
          } else if (e.key === "Enter") {
            e.preventDefault();
            runAt(cursor);
          } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
          }
        }}
        style={{
          width: 520,
          maxWidth: "92vw",
          borderRadius: "var(--phj-radius-lg)",
          background:
            "linear-gradient(180deg, var(--phj-bg-panel) 0%, var(--phj-bg-elevated) 100%)",
          border: "1px solid var(--phj-border-strong)",
          boxShadow: "var(--phj-shadow-3)",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: "var(--phj-space-12)",
            padding: "var(--phj-space-16)",
            borderBottom: "1px solid var(--phj-border-default)",
          }}
        >
          <Search size={16} strokeWidth={1.5} color="var(--phj-text-muted)" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="모듈 검색 · 명령 실행…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--phj-text-primary)",
              fontSize: 14,
            }}
          />
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

        <ul
          className="phj-scroll"
          style={{
            listStyle: "none",
            margin: 0,
            padding: "var(--phj-space-8)",
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {filtered.length === 0 && (
            <li
              className="phj-mono"
              style={{
                padding: "var(--phj-space-16)",
                textAlign: "center",
                color: "var(--phj-text-muted)",
                fontSize: 12,
              }}
            >
              결과 없음
            </li>
          )}
          {filtered.map((cmd, i) => {
            const active = i === cursor;
            const accent = cmd.accentVar
              ? `var(${cmd.accentVar})`
              : "var(--phj-border-glow)";
            const Icon =
              cmd.id === "eject"
                ? LogOut
                : cmd.id === "manual"
                  ? CircleHelp
                  : Cpu;
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => runAt(i)}
                  className="flex items-center w-full text-left"
                  style={{
                    gap: "var(--phj-space-12)",
                    padding: "var(--phj-space-12)",
                    borderRadius: "var(--phj-radius-md)",
                    border: "1px solid transparent",
                    background: active ? "var(--phj-bg-default)" : "transparent",
                    borderColor: active ? accent : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span
                    aria-hidden
                    className="flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: "var(--phj-radius-xs)",
                      background: "var(--phj-bg-panel)",
                      border: `1px solid ${active ? accent : "var(--phj-border-default)"}`,
                      color: active ? accent : "var(--phj-text-muted)",
                    }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "var(--phj-text-primary)",
                      }}
                    >
                      {cmd.label}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 11,
                        color: "var(--phj-text-muted)",
                      }}
                    >
                      {cmd.hint}
                    </span>
                  </span>
                  {active && (
                    <CornerDownLeft
                      size={14}
                      strokeWidth={1.5}
                      color="var(--phj-text-muted)"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`
        @keyframes phj-cmd-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
