"use client";

import { useEffect, useState } from "react";

export function McpEndpoint() {
  const [href, setHref] = useState("/api/mcp");

  useEffect(() => {
    setHref(`${window.location.origin}/api/mcp`);
  }, []);

  return (
    <span title={href}>mcp: /api/mcp</span>
  );
}
