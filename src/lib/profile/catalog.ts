import { MODULES, type DocSection, type ModuleId } from "@/components/phj/types";

export const MODULE_IDS = [
  "gpt",
  "claude",
  "cursor",
  "gemini",
  "figma",
  "portfolio",
] as const satisfies readonly ModuleId[];

export type ProfilePrompt = {
  id: string;
  moduleId: ModuleId;
  title: string;
  body: string;
};

/** 모든 모듈에 공통으로 붙는 규칙. MCP get_rules의 기본 소스다. */
export const GLOBAL_RULES: DocSection[] = [
  {
    heading: "Communication",
    lines: [
      "항상 한국어로 답변한다.",
      "요구사항이 모호하면 먼저 질문한다.",
      "바로 구현하지 말고 구현 계획을 먼저 설명한다.",
      "승인 후 구현한다.",
    ],
  },
  {
    heading: "Coding",
    lines: [
      "코드는 최대한 짧고 간결하게 작성한다.",
      "기존 프로젝트 스타일을 유지한다.",
      "변경 범위를 최소화한다.",
      "관련 없는 코드 수정은 하지 않는다.",
      "불필요한 fallback을 만들지 않는다.",
      "불필요한 리팩토링을 하지 않는다.",
      "any 사용을 피한다.",
      "TODO/FIXME를 추가하지 않는다.",
      "console.log를 남기지 않는다.",
    ],
  },
  {
    heading: "Safety",
    lines: [
      "라이브러리 추가 전 반드시 확인받는다.",
      "DB 스키마 변경 전 반드시 확인받는다.",
      "API 변경 전 반드시 확인받는다.",
      "삭제 작업은 반드시 확인받는다.",
    ],
  },
];

export const PROMPTS: ProfilePrompt[] = [
  {
    id: "gpt.literature-review",
    moduleId: "gpt",
    title: "문헌 리뷰 요약",
    body: "주제에 대한 문헌을 요약한다. 출처 없는 주장은 하지 않고, 결론을 먼저 적은 뒤 근거를 붙인다. 요약은 3줄 이내다.",
  },
  {
    id: "gpt.counterargument",
    moduleId: "gpt",
    title: "반론 스트레스 테스트",
    body: "주장을 반론으로 밀어본다. 확인되지 않은 내용은 추정임을 명시하고, 약한 지점을 목록으로 정리한다.",
  },
  {
    id: "gpt.concept-map",
    moduleId: "gpt",
    title: "개념 지도 생성",
    body: "핵심 개념과 관계를 지도로 구조화한다. 비교는 목록으로 두고, 불확실하면 단정하지 않는다.",
  },
  {
    id: "claude.architecture-review",
    moduleId: "claude",
    title: "아키텍처 리뷰",
    body: "현재 구조의 경계와 트레이드오프를 리뷰한다. 변경 범위를 최소화하는 안을 우선하고, 삭제·API 변경은 확인이 필요하다고 표시한다.",
  },
  {
    id: "claude.refactor-plan",
    moduleId: "claude",
    title: "리팩터 계획 수립",
    body: "리팩터 계획을 구현 전에 설명한다. 주변 스타일을 유지하고, 관련 없는 정리 작업은 빼 둔다.",
  },
  {
    id: "claude.tradeoff",
    moduleId: "claude",
    title: "트레이드오프 분석",
    body: "선택지를 트레이드오프로 비교한다. 결론을 먼저 두고, 모듈 경계에 미치는 영향을 짧게 적는다.",
  },
  {
    id: "cursor.function-unit",
    moduleId: "cursor",
    title: "함수 단위 생성",
    body: "요청한 기능만 함수 단위로 작성한다. 코드는 최대한 짧고 간결하게 두고, 설명은 변경 이유만 적는다.",
  },
  {
    id: "cursor.bug-trace",
    moduleId: "cursor",
    title: "버그 원인 추적",
    body: "재현 경로와 원인을 추적한다. 관련 없는 리팩터는 하지 않고, 수정은 원인에 필요한 범위만 한다.",
  },
  {
    id: "cursor.auto-test",
    moduleId: "cursor",
    title: "테스트 자동 작성",
    body: "변경을 검증하는 테스트를 최소 케이스로 작성한다. 기존 테스트 스타일을 따르고, 불필요한 헬퍼는 만들지 않는다.",
  },
  {
    id: "gemini.trend-search",
    moduleId: "gemini",
    title: "실시간 트렌드 검색",
    body: "최신 정보를 우선해 검색한다. 신뢰 가능한 출처만 인용하고, 기준 날짜를 밝힌다.",
  },
  {
    id: "gemini.multimodal",
    moduleId: "gemini",
    title: "멀티모달 분석",
    body: "이미지와 텍스트를 함께 해석한다. 판단 근거가 된 이미지를 함께 표시한다.",
  },
  {
    id: "gemini.source-compare",
    moduleId: "gemini",
    title: "출처 비교 요약",
    body: "출처를 비교해 요약한다. 출처가 불명확하면 인용하지 않고, 핵심 사실은 교차 검증한다.",
  },
  {
    id: "figma.variants",
    moduleId: "figma",
    title: "컴포넌트 변형 생성",
    body: "기존 컴포넌트 규칙으로 변형을 만든다. 색·간격은 토큰만 쓰고, 8pt 그리드를 지킨다.",
  },
  {
    id: "figma.layout-audit",
    moduleId: "figma",
    title: "레이아웃 감사",
    body: "정렬·간격·대비를 감사한다. 본문 대비 4.5:1과 포커스 상태를 확인한다.",
  },
  {
    id: "figma.token-names",
    moduleId: "figma",
    title: "토큰 이름 정리",
    body: "토큰 이름을 역할 기반으로 정리한다. 하드코딩 색상 값을 쓰지 않는다.",
  },
  {
    id: "portfolio.case-study",
    moduleId: "portfolio",
    title: "케이스 스터디 초안",
    body: "한 문장 요약을 먼저 두고, 임팩트와 과정·결과를 분리해 쓴다. 내 역할을 밝히고 지표로 뒷받침한다.",
  },
  {
    id: "portfolio.hero-copy",
    moduleId: "portfolio",
    title: "히어로 카피 작성",
    body: "히어로 카피를 짧게 쓴다. 군더더기 형용사를 줄이고 임팩트를 앞에 둔다.",
  },
  {
    id: "portfolio.retro",
    moduleId: "portfolio",
    title: "회고 요약",
    body: "회고를 과정과 결과로 나눠 요약한다. 주장은 지표나 구체적 사례로 뒷받침한다.",
  },
];

export const MCP_PATH = "/api/mcp";
export const MCP_PUBLIC_URL = "https://codinglarva.site/api/mcp";

export const MCP_INSTRUCTIONS = [
  "박효진(codinglarva) 개발 프로필이다.",
  "코드를 작성하거나 수정하기 전에 get_rules를 호출한다.",
  "작업에 맞는 프롬프트가 있으면 list_prompts 후 get_prompt를 쓴다.",
  "module을 생략하면 전역 규칙과 Cursor 개발 모듈 규칙을 반환한다.",
].join(" ");

function isModuleId(value: string): value is ModuleId {
  return (MODULE_IDS as readonly string[]).includes(value);
}

function parseModuleId(value?: string): ModuleId | undefined {
  if (value === undefined || value === "") return undefined;
  if (!isModuleId(value)) {
    throw new Error(`unknown module: ${value}`);
  }
  return value;
}

function moduleRules(id: ModuleId): DocSection[] {
  const mod = MODULES.find((item) => item.id === id);
  return mod?.resources.find((resource) => resource.doc)?.doc ?? [];
}

function formatSections(title: string, sections: DocSection[]): string {
  const body = sections
    .map(
      (section) =>
        `## ${section.heading}\n${section.lines.map((line) => `- ${line}`).join("\n")}`,
    )
    .join("\n\n");
  return `# ${title}\n\n${body}`;
}

export function listModules(): {
  id: ModuleId;
  name: string;
  role: string;
  status: string;
  promptCount: number;
}[] {
  return MODULES.map((mod) => ({
    id: mod.id,
    name: mod.name,
    role: mod.role,
    status: mod.status,
    promptCount: PROMPTS.filter((prompt) => prompt.moduleId === mod.id).length,
  }));
}

export function getRules(moduleId?: string): string {
  const target: ModuleId = parseModuleId(moduleId) ?? "cursor";
  const mod = MODULES.find((item) => item.id === target);
  const moduleDoc = moduleRules(target);
  const extra =
    target === "cursor"
      ? moduleDoc.filter((section) => section.heading === "Explanation")
      : moduleDoc;
  const parts = [formatSections("전역 규칙", GLOBAL_RULES)];
  if (extra.length > 0) {
    parts.push(
      formatSections(`${mod?.name ?? target} 모듈 규칙`, extra),
    );
  }
  return parts.join("\n\n");
}

export function listPrompts(moduleId?: string): ProfilePrompt[] {
  const target = parseModuleId(moduleId);
  if (!target) return PROMPTS;
  return PROMPTS.filter((prompt) => prompt.moduleId === target);
}

export function getPrompt(id: string): ProfilePrompt {
  const prompt = PROMPTS.find((item) => item.id === id);
  if (!prompt) {
    throw new Error(`unknown prompt: ${id}`);
  }
  return prompt;
}

export function parseModuleArg(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error("module must be a string");
  }
  return value;
}
