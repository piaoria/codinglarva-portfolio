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

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DOCS_DATABASE_ID;

// 환경 변수 확인 로그 추가
console.log("=== Notion API 초기화 ===");
console.log("NOTION_API_KEY 존재 여부:", !!NOTION_API_KEY);
console.log("NOTION_DOCS_DATABASE_ID 존재 여부:", !!NOTION_DATABASE_ID);
console.log("NOTION_DOCS_DATABASE_ID 값:", NOTION_DATABASE_ID);
console.log("환경:", process.env.NODE_ENV);

export const notion = new Client({
  auth: NOTION_API_KEY,
});

export async function getDocs() {
  try {
    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
      console.error("필수 환경 변수가 설정되지 않았습니다.");
      throw new Error("필수 환경 변수가 설정되지 않았습니다.");
    }

    console.log("=== getDocs 시작 ===");
    console.log("데이터베이스 ID:", NOTION_DATABASE_ID);

    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    console.log("문서 개수:", response.results.length);
    console.log(
      "첫 번째 문서:",
      response.results[0]
        ? {
            id: (response.results[0] as PageObjectResponse).id,
            properties: Object.keys(
              (response.results[0] as PageObjectResponse).properties
            ),
          }
        : "없음"
    );

    return response.results;
  } catch (error) {
    console.error("=== getDocs 에러 ===");
    console.error(
      "에러 타입:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error(
      "에러 메시지:",
      error instanceof Error ? error.message : "알 수 없는 에러"
    );
    console.error(
      "에러 스택:",
      error instanceof Error ? error.stack : "스택 없음"
    );
    throw error;
  }
}

export async function getDocBySlug(slug: string) {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("=== getDocBySlug 에러 ===");
    console.error("필수 환경 변수가 설정되지 않았습니다.");
    throw new Error("필수 환경 변수가 설정되지 않았습니다.");
  }

  console.log("=== getDocBySlug 시작 ===");
  console.log("slug:", slug);
  console.log("Database ID:", NOTION_DATABASE_ID);
  console.log("API Key 존재 여부:", !!NOTION_API_KEY);

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID as string,
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

    console.log("쿼리 결과:", {
      결과_개수: response.results.length,
      첫번째_문서: response.results[0]
        ? {
            id: (response.results[0] as PageObjectResponse).id,
            properties: Object.keys(
              (response.results[0] as PageObjectResponse).properties
            ),
          }
        : null,
    });

    if (!response.results[0]) {
      console.log("문서를 찾을 수 없습니다.");
      return undefined;
    }

    return response.results[0] as PageObjectResponse;
  } catch (error) {
    console.error("=== getDocBySlug 에러 ===");
    console.error(
      "에러 타입:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error(
      "에러 메시지:",
      error instanceof Error ? error.message : "알 수 없는 에러"
    );
    console.error(
      "에러 스택:",
      error instanceof Error ? error.stack : "스택 없음"
    );
    throw error;
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
