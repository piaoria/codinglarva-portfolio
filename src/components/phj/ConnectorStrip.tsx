interface Props {
  /** Pins light up in the accent color — "contact ready" state. */
  illuminated?: boolean;
  /** One-shot flash: pins briefly brighten + scale, played the moment chip docks. */
  contact?: boolean;
  /** CSS color used when illuminated (e.g. "var(--phj-accent-cursor)"). */
  accent?: string;
  /** Number of pins in the strip. Kept low on purpose — reads as premium hardware. */
  count?: number;
  /** `down` = pins hang below (chip). `up` = pins rise above (core). */
  direction?: "up" | "down";
}

/**
 * Physical edge-connector strip shared by chip and core. When a chip aligns at
 * 12 o'clock and descends, the two strips face off and light up in the same
 * accent — a single continuous lit line, like a PCIe socket completing.
 */
export function ConnectorStrip({
  illuminated = false,
  contact = false,
  accent = "var(--phj-border-glow)",
  count = 8,
  direction = "down",
}: Props) {
  const color = illuminated ? accent : "var(--phj-border-strong)";
  const glow = illuminated
    ? `0 0 10px ${accent}, 0 0 24px ${accent}55`
    : "none";
  const radius = direction === "down" ? "0 0 2px 2px" : "2px 2px 0 0";

  return (
    <div
      aria-hidden
      className="flex justify-center"
      style={{
        gap: 5,
        transformOrigin: direction === "down" ? "top center" : "bottom center",
        animation: contact
          ? "phj-connector-flash 520ms var(--phj-ease-standard) both"
          : undefined,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: 6,
            borderRadius: radius,
            background: color,
            boxShadow: glow,
            transition:
              "background var(--phj-motion-normal) var(--phj-ease-standard), box-shadow var(--phj-motion-normal) var(--phj-ease-standard)",
          }}
        />
      ))}
    </div>
  );
}
