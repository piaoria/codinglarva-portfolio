import type { ModuleStatus } from "./types";

const STATUS_VAR: Record<ModuleStatus, string> = {
  connected: "--phj-status-online",
  active: "--phj-status-online",
  pending: "--phj-status-pending",
  offline: "--phj-status-offline",
};

interface Props {
  status: ModuleStatus;
  pulse?: boolean;
}

export function StatusDot({ status, pulse = false }: Props) {
  const color = `var(${STATUS_VAR[status]})`;
  return (
    <span
      className="relative inline-flex"
      style={{ width: 8, height: 8 }}
      aria-label={`status: ${status}`}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {pulse && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: color, opacity: 0.6 }}
        />
      )}
    </span>
  );
}
