export type ModuleId =
  | "gpt"
  | "claude"
  | "cursor"
  | "gemini"
  | "figma"
  | "portfolio";

export type ModuleStatus = "connected" | "active" | "pending" | "offline";

export type InsertionPhase = "idle" | "aligning" | "inserting" | "loaded";

/** A section of a config-style document (e.g. a rules file). */
export interface DocSection {
  heading: string;
  lines: string[];
}

/**
 * A satellite info panel that fades into the left/right margin once the module
 * has docked. Dim by default; illuminates + its trace lights up on hover,
 * reading like a board component wiring into the core.
 */
export interface ResourcePanel {
  id: string;
  side: "left" | "right";
  /** Vertical slot within its side: 0 = upper, 1 = lower. */
  slot: 0 | 1;
  title: string;
  /** Short summary bullets. Omitted when the panel carries a full `doc`. */
  items?: string[];
  /** Longer copy shown when the panel is opened into its detail drawer. */
  detail?: string;
  /**
   * A full config/rules document. When present, the satellite panel summarizes
   * it by section + line count, and the drawer renders it as a file view.
   */
  doc?: DocSection[];
  /** Filename shown in the drawer's file tab when `doc` is present. */
  filename?: string;
  /**
   * Representative rule/prompt panels rest brighter (not dimmed) so the key
   * "how I work" info reads at a glance — the left column's headline material.
   */
  featured?: boolean;
}

export interface AIModule {
  id: ModuleId;
  name: string;
  role: string;
  status: ModuleStatus;
  version: string;
  rules: number;
  prompts: number;
  /** ISO date the subscription started. Months elapsed are computed live. */
  subscribedSince: string;
  /** CSS custom property name that carries this module's accent color. */
  accentVar: string;
  /** Lines streamed during the module's loading sequence. */
  bootLog: string[];
  /** Related materials shown in the margins after docking. */
  resources: ResourcePanel[];
}

/**
 * Whole months elapsed since an ISO date. Updates on its own over time, so
 * "N개월째" always reflects the real subscription age.
 */
export function monthsSince(iso: string): number {
  const start = new Date(iso);
  const now = new Date();
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

/**
 * Human-friendly subscription age: months roll up into years so long-running
 * subscriptions read as "1년 2개월째" instead of a bare "14개월째".
 */
export function formatSubscription(iso: string): string {
  const total = monthsSince(iso);
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (years === 0) return `${months}개월째`;
  if (months === 0) return `${years}년째`;
  return `${years}년 ${months}개월째`;
}

/** Clockwise order of the module seats around the ring, starting at 12 o'clock. */
export const ORBIT_ORDER: ModuleId[] = [
  "gpt",
  "gemini",
  "figma",
  "portfolio",
  "cursor",
  "claude",
];

/**
 * Base orbit angle in degrees, expressed in an un-rotated frame.
 * -90 = 12 o'clock. Seats are spread evenly; the rotator applies a live
 * offset on top of this. alignRotation() is angle-agnostic so any spacing works.
 */
export const BASE_ANGLES: Record<ModuleId, number> = ORBIT_ORDER.reduce(
  (acc, id, i) => {
    acc[id] = -90 + (i * 360) / ORBIT_ORDER.length;
    return acc;
  },
  {} as Record<ModuleId, number>,
);

export const MODULES: AIModule[] = [
  {
    id: "gpt",
    name: "GPT",
    role: "리서치 모듈",
    status: "connected",
    version: "v2.1",
    rules: 12,
    prompts: 31,
    subscribedSince: "2026-02-10",
    accentVar: "--phj-accent-gpt",
    bootLog: [
      "GPT 리서치 모듈 로딩 중...",
      "전역 프로필 적용 중...",
      "프롬프트 라이브러리 로딩 중...",
      "MCP 연결 중...",
      "리서치 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "gpt-rules",
        side: "left",
        slot: 0,
        title: "Rules (User)",
        filename: "~/.codex/AGENTS.md",
        featured: true,
        doc: [
          {
            heading: "Research",
            lines: [
              "출처 없는 주장은 하지 않는다.",
              "확인되지 않은 내용은 추정임을 명시한다.",
              "최신성이 중요한 주제는 기준 날짜를 밝힌다.",
            ],
          },
          {
            heading: "Output",
            lines: [
              "결론을 먼저, 근거는 뒤에 둔다.",
              "요약은 3줄 이내로 압축한다.",
              "비교는 표나 목록으로 구조화한다.",
            ],
          },
          {
            heading: "Safety",
            lines: [
              "민감한 개인정보는 요청하지 않는다.",
              "불확실할 때는 단정하지 않는다.",
            ],
          },
        ],
      },
      {
        id: "gpt-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["문헌 리뷰 요약", "반론 스트레스 테스트", "개념 지도 생성"],
      },
      {
        id: "gpt-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "GPT 리서치 모듈을 중심으로 진행한 대표 작업들입니다.",
        items: ["리서치 코파일럿", "논문 요약 봇", "트렌드 리포트 자동화"],
      },
      {
        id: "gpt-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "가장 최근에 다듬은 실험과 사이드 프로젝트입니다.",
        items: ["프롬프트 라이브러리 v2", "인용 검증기"],
      },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    role: "아키텍처 모듈",
    status: "connected",
    version: "v1.8",
    rules: 18,
    prompts: 22,
    subscribedSince: "2026-04-10",
    accentVar: "--phj-accent-claude",
    bootLog: [
      "Claude 아키텍처 모듈 로딩 중...",
      "CLAUDE.md 프로필 적용 중...",
      "리팩터 규칙 로딩 중...",
      "롱컨텍스트 버퍼 준비 중...",
      "아키텍처 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "claude-rules",
        side: "left",
        slot: 0,
        title: "CLAUDE.md",
        filename: "./CLAUDE.md",
        featured: true,
        doc: [
          {
            heading: "Communication",
            lines: [
              "항상 한국어로 답변한다.",
              "구현 전에 계획을 먼저 설명한다.",
              "승인 후 구현한다.",
            ],
          },
          {
            heading: "Coding",
            lines: [
              "작은 단위로 커밋한다.",
              "먼저 테스트를 확인한다.",
              "주변 코드 스타일을 준수한다.",
              "변경 범위를 최소화한다.",
            ],
          },
          {
            heading: "Architecture",
            lines: [
              "트레이드오프를 명시한다.",
              "모듈 경계를 문서화한다.",
              "결정은 ADR로 남긴다.",
            ],
          },
          {
            heading: "Safety",
            lines: [
              "삭제·마이그레이션 전 확인받는다.",
              "API 변경 전 영향 범위를 검토한다.",
            ],
          },
        ],
      },
      {
        id: "claude-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["아키텍처 리뷰", "리팩터 계획 수립", "트레이드오프 분석"],
      },
      {
        id: "claude-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "Claude 아키텍처 모듈로 설계·리팩터한 대표 작업들입니다.",
        items: ["PHJ.AI 코어", "디자인 시스템 리팩터", "롱컨텍스트 문서 QA"],
      },
      {
        id: "claude-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "최근에 다듬은 실험과 사이드 프로젝트입니다.",
        items: ["ADR 자동 초안", "코드리뷰 어시스턴트"],
      },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    role: "개발 모듈",
    status: "active",
    version: "v3.0",
    rules: 24,
    prompts: 18,
    subscribedSince: "2025-01-10",
    accentVar: "--phj-accent-cursor",
    bootLog: [
      "Cursor 개발 모듈 로딩 중...",
      "전역 코딩 규칙 적용 중...",
      "Cursor 규칙 로딩 중...",
      "프로젝트 컨텍스트 확인 중...",
      "MCP 연결 중...",
      "개발 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "cursor-rules",
        side: "left",
        slot: 0,
        title: "Rules (User)",
        filename: "~/.cursor/rules/user.md",
        featured: true,
        doc: [
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
            heading: "Explanation",
            lines: [
              "신입 개발자가 이해할 수 있게 설명한다.",
              "변경 이유를 설명한다.",
              "변경되는 코드만 보여준다.",
              "코드 인용 시 시작줄:끝줄:경로 펜스로, 함수명과 할 일을 붙인다.",
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
        ],
      },
      {
        id: "cursor-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["함수 단위 생성", "버그 원인 추적", "테스트 자동 작성"],
      },
      {
        id: "cursor-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "Cursor 개발 모듈로 만든 대표 작업들입니다.",
        items: ["PHJ.AI 프론트엔드", "실시간 협업 에디터", "CLI 도구 모음"],
      },
      {
        id: "cursor-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "최근에 다듬은 실험과 사이드 프로젝트입니다.",
        items: ["테스트 커버리지 봇", "리팩터 스크립트"],
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    role: "검색 모듈",
    status: "pending",
    version: "v1.2",
    rules: 6,
    prompts: 9,
    subscribedSince: "2026-06-10",
    accentVar: "--phj-accent-gemini",
    bootLog: [
      "Gemini 검색 모듈 로딩 중...",
      "소스 정책 검증 중...",
      "멀티모달 파이프라인 준비 중...",
      "검색 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "gemini-rules",
        side: "left",
        slot: 0,
        title: "Rules (User)",
        filename: "~/.gemini/rules.md",
        featured: true,
        doc: [
          {
            heading: "Search",
            lines: [
              "신뢰 가능한 출처만 인용한다.",
              "최신 정보를 우선한다.",
              "핵심 사실은 교차 검증한다.",
            ],
          },
          {
            heading: "Multimodal",
            lines: [
              "이미지와 텍스트를 함께 해석한다.",
              "판단 근거가 된 이미지를 함께 표시한다.",
            ],
          },
          {
            heading: "Safety",
            lines: [
              "출처가 불명확하면 인용하지 않는다.",
              "차단 도메인 규칙을 지킨다.",
            ],
          },
        ],
      },
      {
        id: "gemini-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["실시간 트렌드 검색", "멀티모달 분석", "출처 비교 요약"],
      },
      {
        id: "gemini-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "Gemini 검색 모듈을 활용한 대표 작업들입니다.",
        items: ["멀티모달 검색 UI", "이미지 캡션 파이프라인"],
      },
      {
        id: "gemini-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "검토 중인 실험입니다.",
        items: ["실시간 트렌드 위젯"],
      },
    ],
  },
  {
    id: "figma",
    name: "Figma",
    role: "디자인 모듈",
    status: "connected",
    version: "v2.4",
    rules: 10,
    prompts: 14,
    subscribedSince: "2025-07-10",
    accentVar: "--phj-accent-figma",
    bootLog: [
      "Figma 디자인 모듈 로딩 중...",
      "디자인 토큰 동기화 중...",
      "컴포넌트 라이브러리 로딩 중...",
      "UI 원칙 적용 중...",
      "디자인 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "figma-rules",
        side: "left",
        slot: 0,
        title: "Design Rules",
        filename: "design-rules.md",
        featured: true,
        doc: [
          {
            heading: "Tokens",
            lines: [
              "색상·간격은 토큰으로만 지정한다.",
              "하드코딩 색상 값을 쓰지 않는다.",
              "토큰 이름은 역할 기반으로 짓는다.",
            ],
          },
          {
            heading: "Layout",
            lines: [
              "8pt 그리드를 준수한다.",
              "정렬과 간격 규칙을 일관되게 유지한다.",
            ],
          },
          {
            heading: "Accessibility",
            lines: [
              "본문 대비는 4.5:1 이상 확보한다.",
              "포커스 상태를 반드시 제공한다.",
            ],
          },
        ],
      },
      {
        id: "figma-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["컴포넌트 변형 생성", "레이아웃 감사", "토큰 이름 정리"],
      },
      {
        id: "figma-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "Figma 디자인 모듈로 구축한 대표 작업들입니다.",
        items: ["PHJ.AI 디자인 시스템", "토큰 관리 플러그인", "컴포넌트 감사 도구"],
      },
      {
        id: "figma-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "최근에 다듬은 에셋 작업입니다.",
        items: ["아이콘 세트 v3"],
      },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    role: "쇼케이스 모듈",
    status: "connected",
    version: "v1.0",
    rules: 8,
    prompts: 6,
    subscribedSince: "2026-01-10",
    accentVar: "--phj-accent-portfolio",
    bootLog: [
      "Portfolio 쇼케이스 모듈 로딩 중...",
      "케이스 스터디 인덱싱 중...",
      "미디어 에셋 로딩 중...",
      "쇼케이스 워크스페이스 준비 완료.",
    ],
    resources: [
      {
        id: "portfolio-rules",
        side: "left",
        slot: 0,
        title: "Writing Rules",
        filename: "writing-rules.md",
        featured: true,
        doc: [
          {
            heading: "Story",
            lines: [
              "임팩트를 먼저 서술한다.",
              "과정과 결과를 분리해 쓴다.",
            ],
          },
          {
            heading: "Evidence",
            lines: [
              "주장은 지표로 뒷받침한다.",
              "내 역할을 명확히 밝힌다.",
            ],
          },
          {
            heading: "Format",
            lines: [
              "한 프로젝트당 한 문장 요약을 먼저 둔다.",
              "군더더기 형용사를 줄인다.",
            ],
          },
        ],
      },
      {
        id: "portfolio-prompts",
        side: "left",
        slot: 1,
        title: "대표 프롬프트",
        featured: true,
        items: ["케이스 스터디 초안", "히어로 카피 작성", "회고 요약"],
      },
      {
        id: "portfolio-projects",
        side: "right",
        slot: 0,
        title: "대표 프로젝트",
        detail: "포트폴리오의 대표 케이스 스터디입니다.",
        items: ["PHJ.AI 프로필", "AI 워크플로우 OS", "디자인 시스템 구축"],
      },
      {
        id: "portfolio-recent",
        side: "right",
        slot: 1,
        title: "최근 작업",
        detail: "최근에 정리한 작업입니다.",
        items: ["회고 아카이브"],
      },
    ],
  },
];
