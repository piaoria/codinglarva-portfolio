import {
  handleMcpPayload,
  isJsonRpcRequest,
  MCP_CORS_HEADERS,
} from "@/lib/mcp/protocol";

export const runtime = "nodejs";

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(MCP_CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    headers,
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: MCP_CORS_HEADERS });
}

export function GET() {
  return Response.json(
    {
      name: "codinglarva-profile",
      transport: "streamable-http",
      protocolVersion: "2025-03-26",
    },
    { headers: MCP_CORS_HEADERS },
  );
}

export function DELETE() {
  return new Response(null, {
    status: 405,
    headers: { ...MCP_CORS_HEADERS, Allow: "GET, POST, OPTIONS" },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return withCors(
      Response.json(
        {
          jsonrpc: "2.0",
          id: null,
          error: { code: -32700, message: "parse error" },
        },
        { status: 400 },
      ),
    );
  }

  if (isJsonRpcRequest(body) && body.id === undefined) {
    return new Response(null, { status: 202, headers: MCP_CORS_HEADERS });
  }

  const payload = handleMcpPayload(body);
  if (payload === null || (Array.isArray(payload) && payload.length === 0)) {
    return new Response(null, { status: 202, headers: MCP_CORS_HEADERS });
  }

  const accept = request.headers.get("accept") ?? "";
  if (
    accept.includes("text/event-stream") &&
    !accept.includes("application/json")
  ) {
    const items = Array.isArray(payload) ? payload : [payload];
    const stream = items
      .map((item) => `event: message\ndata: ${JSON.stringify(item)}\n\n`)
      .join("");
    return new Response(stream, {
      status: 200,
      headers: {
        ...MCP_CORS_HEADERS,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  }

  return Response.json(payload, { headers: MCP_CORS_HEADERS });
}
