import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  TitlePropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  CheckboxPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  PropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// 환경 변수 타입 정의
interface NotionConfig {
  apiKey: string;
  databaseId: string;
}

// 환경 변수 가져오기
const getNotionConfig = (): NotionConfig => {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DOCS_DATABASE_ID?.trim();

  if (!apiKey || !databaseId) {
    const missingVars = [];
    if (!apiKey) missingVars.push("NOTION_API_KEY");
    if (!databaseId) missingVars.push("NOTION_DOCS_DATABASE_ID");

    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missingVars.join(", ")}`
    );
  }

  return { apiKey, databaseId };
};

// Notion 클라이언트 초기화
let notionClient: Client | null = null;

const initializeNotionClient = () => {
  if (!notionClient) {
    try {
      const { apiKey } = getNotionConfig();
      notionClient = new Client({ auth: apiKey });
    } catch (error) {
      console.error("Notion 클라이언트 초기화 실패:", error);
      throw error;
    }
  }
  return notionClient;
};

export const notion = initializeNotionClient();

// 문서 조회 함수
export async function getDocs() {
  try {
    const { databaseId } = getNotionConfig();

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    return response.results;
  } catch (error) {
    console.error("=== getDocs 에러 ===");
    if (error instanceof Error) {
      console.error("에러 타입:", error.constructor.name);
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    } else {
      console.error("알 수 없는 에러:", error);
    }
    throw new Error(
      `문서 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 에러"}`
    );
  }
}

// 슬러그로 문서 조회
export async function getDocBySlug(slug: string) {
  try {
    const { databaseId } = getNotionConfig();

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (!response.results[0]) {
      return undefined;
    }

    return response.results[0] as PageObjectResponse;
  } catch (error) {
    console.error("=== getDocBySlug 에러 ===");
    if (error instanceof Error) {
      console.error("에러 타입:", error.constructor.name);
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    } else {
      console.error("알 수 없는 에러:", error);
    }
    throw new Error(
      `슬러그로 문서 조회 실패: ${error instanceof Error ? error.message : "알 수 없는 에러"}`
    );
  }
}

export function isTitleProperty(
  property: PropertyItemObjectResponse
): property is TitlePropertyItemObjectResponse {
  return (
    property.type === "title" &&
    "title" in property &&
    Array.isArray(property.title) &&
    property.title.length > 0 &&
    "plain_text" in property.title[0]
  );
}

export function isSelectProperty(
  property: PropertyItemObjectResponse
): property is SelectPropertyItemObjectResponse {
  return (
    property.type === "select" &&
    "select" in property &&
    property.select !== null
  );
}

export function isRichTextProperty(
  property: PropertyItemObjectResponse
): property is RichTextPropertyItemObjectResponse {
  return (
    property.type === "rich_text" &&
    "rich_text" in property &&
    Array.isArray(property.rich_text)
  );
}

export function isCheckboxProperty(
  property: PropertyItemObjectResponse
): property is CheckboxPropertyItemObjectResponse {
  return property.type === "checkbox" && "checkbox" in property;
}

export function isNumberProperty(
  property: PropertyItemObjectResponse
): property is NumberPropertyItemObjectResponse {
  return property.type === "number" && "number" in property;
}

export function isDateProperty(
  property: PropertyItemObjectResponse
): property is DatePropertyItemObjectResponse {
  return (
    property.type === "date" && "date" in property && property.date !== null
  );
}

export function isStatusProperty(
  property: PropertyItemObjectResponse
): property is StatusPropertyItemObjectResponse {
  return (
    property.type === "status" &&
    "status" in property &&
    property.status !== null
  );
}
