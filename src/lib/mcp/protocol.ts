import {
  getPrompt,
  getRules,
  listModules,
  listPrompts,
  MCP_INSTRUCTIONS,
  MODULE_IDS,
  parseModuleArg,
} from "@/lib/profile/catalog";

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: JsonRpcId;
  method: string;
  params?: unknown;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: JsonRpcId;
  result?: unknown;
  error?: { code: number; message: string };
};

const PROTOCOL_VERSION = "2025-03-26";
const SERVER_INFO = { name: "codinglarva-profile", version: "1.0.0" };

const MODULE_SCHEMA = {
  type: "string",
  enum: [...MODULE_IDS],
  description: "AI 프로필 모듈 id. 생략하면 Cursor 개발 모듈을 쓴다.",
} as const;

export const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Max-Age": "86400",
};

function textResult(text: string) {
  return { content: [{ type: "text", text }] };
}

function readArgs(params: unknown): Record<string, unknown> {
  if (params === undefined || params === null) return {};
  if (typeof params !== "object" || Array.isArray(params)) {
    throw new Error("params must be an object");
  }
  const record = params as Record<string, unknown>;
  const args = record.arguments;
  if (args === undefined) return record;
  if (typeof args !== "object" || args === null || Array.isArray(args)) {
    throw new Error("arguments must be an object");
  }
  return args as Record<string, unknown>;
}

function toolName(params: unknown): string {
  if (typeof params !== "object" || params === null || Array.isArray(params)) {
    throw new Error("params must be an object");
  }
  const name = (params as Record<string, unknown>).name;
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("name is required");
  }
  return name;
}

function promptName(params: unknown): string {
  if (typeof params !== "object" || params === null || Array.isArray(params)) {
    throw new Error("params must be an object");
  }
  const name = (params as Record<string, unknown>).name;
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("name is required");
  }
  return name;
}

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_modules":
      return textResult(JSON.stringify(listModules(), null, 2));
    case "get_rules":
      return textResult(getRules(parseModuleArg(args.module)));
    case "list_prompts": {
      const prompts = listPrompts(parseModuleArg(args.module)).map((prompt) => ({
        id: prompt.id,
        moduleId: prompt.moduleId,
        title: prompt.title,
      }));
      return textResult(JSON.stringify(prompts, null, 2));
    }
    case "get_prompt": {
      const id = args.id;
      if (typeof id !== "string" || id.length === 0) {
        throw new Error("id is required");
      }
      const prompt = getPrompt(id);
      return textResult(
        `# ${prompt.title}\nmodule: ${prompt.moduleId}\n\n${prompt.body}`,
      );
    }
    default:
      throw new Error(`unknown tool: ${name}`);
  }
}

function handleMethod(method: string, params: unknown): unknown {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {
          tools: { listChanged: false },
          prompts: { listChanged: false },
        },
        serverInfo: SERVER_INFO,
        instructions: MCP_INSTRUCTIONS,
      };
    case "ping":
      return {};
    case "tools/list":
      return {
        tools: [
          {
            name: "list_modules",
            description: "codinglarva AI 프로필의 모듈 목록을 반환한다.",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "get_rules",
            description:
              "코딩/작업 규칙을 반환한다. module을 생략하면 전역 규칙과 Cursor 모듈 규칙을 준다.",
            inputSchema: {
              type: "object",
              properties: { module: MODULE_SCHEMA },
            },
          },
          {
            name: "list_prompts",
            description: "프로필에 등록된 프롬프트 목록을 반환한다.",
            inputSchema: {
              type: "object",
              properties: { module: MODULE_SCHEMA },
            },
          },
          {
            name: "get_prompt",
            description: "프롬프트 id로 본문을 가져온다. id는 list_prompts에서 확인한다.",
            inputSchema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "예: cursor.function-unit",
                },
              },
              required: ["id"],
            },
          },
        ],
      };
    case "tools/call":
      return callTool(toolName(params), readArgs(params));
    case "prompts/list":
      return {
        prompts: listPrompts().map((prompt) => ({
          name: prompt.id,
          title: prompt.title,
          description: `${prompt.moduleId} / ${prompt.title}`,
        })),
      };
    case "prompts/get": {
      const prompt = getPrompt(promptName(params));
      return {
        description: prompt.title,
        messages: [
          {
            role: "user",
            content: { type: "text", text: prompt.body },
          },
        ],
      };
    }
    case "resources/list":
      return { resources: [] };
    default:
      throw Object.assign(new Error(`method not found: ${method}`), {
        code: -32601,
      });
  }
}

function respond(id: JsonRpcId, result: unknown): JsonRpcResponse {
  return { jsonrpc: "2.0", id, result };
}

function respondError(
  id: JsonRpcId,
  error: unknown,
): JsonRpcResponse {
  const err = error as { code?: number; message?: string };
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code: err.code ?? -32603,
      message: err.message ?? "internal error",
    },
  };
}

export function isJsonRpcRequest(value: unknown): value is JsonRpcRequest {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return record.jsonrpc === "2.0" && typeof record.method === "string";
}

/** 알림(id 없음)이면 null. */
export function handleMcpMessage(message: JsonRpcRequest): JsonRpcResponse | null {
  if (message.id === undefined) return null;
  try {
    return respond(message.id, handleMethod(message.method, message.params));
  } catch (error) {
    return respondError(message.id, error);
  }
}

export function handleMcpPayload(body: unknown): JsonRpcResponse | JsonRpcResponse[] | null {
  if (Array.isArray(body)) {
    const replies = body
      .filter(isJsonRpcRequest)
      .map(handleMcpMessage)
      .filter((item): item is JsonRpcResponse => item !== null);
    return replies;
  }
  if (!isJsonRpcRequest(body)) {
    return {
      jsonrpc: "2.0",
      id: null,
      error: { code: -32600, message: "invalid request" },
    };
  }
  return handleMcpMessage(body);
}
