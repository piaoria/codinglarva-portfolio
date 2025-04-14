import { getDocs } from "@/lib/notion";
import Link from "next/link";
import {
  TitlePropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  CheckboxPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  PropertyItemObjectResponse,
  RichTextItemResponse,
  StatusPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// 정적 생성 설정
export const dynamic = "force-static";
export const revalidate = 3600; // 1시간마다 재검증

const isTitleProperty = (
  property: PropertyItemObjectResponse
): property is TitlePropertyItemObjectResponse => {
  return (
    property.type === "title" &&
    "title" in property &&
    Array.isArray(property.title) &&
    property.title.length > 0
  );
};

const isSelectProperty = (
  property: PropertyItemObjectResponse
): property is SelectPropertyItemObjectResponse => {
  return (
    property.type === "select" &&
    "select" in property &&
    property.select !== null
  );
};

const isRichTextProperty = (
  property: PropertyItemObjectResponse
): property is RichTextPropertyItemObjectResponse => {
  return (
    property.type === "rich_text" &&
    "rich_text" in property &&
    Array.isArray(property.rich_text)
  );
};

const isRichTextArray = (
  text: RichTextItemResponse | RichTextItemResponse[]
): text is RichTextItemResponse[] => {
  return Array.isArray(text);
};

const isCheckboxProperty = (
  property: PropertyItemObjectResponse
): property is CheckboxPropertyItemObjectResponse => {
  return property.type === "checkbox" && "checkbox" in property;
};

const isNumberProperty = (
  property: PropertyItemObjectResponse
): property is NumberPropertyItemObjectResponse => {
  return property.type === "number" && "number" in property;
};

const isDateProperty = (
  property: PropertyItemObjectResponse
): property is DatePropertyItemObjectResponse => {
  return (
    property.type === "date" && "date" in property && property.date !== null
  );
};

const isStatusProperty = (
  property: PropertyItemObjectResponse
): property is StatusPropertyItemObjectResponse => {
  return (
    property.type === "status" &&
    "status" in property &&
    property.status !== null
  );
};

export default async function DocsPage() {
  try {
    console.log("=== Docs 페이지 렌더링 시작 ===");
    const docs = await getDocs();
    console.log("가져온 문서 수:", docs.length);

    return (
      <div className="min-h-screen pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-8">문서</h1>
          {docs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                아직 등록된 문서가 없습니다.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Notion 데이터베이스에 문서를 추가하고 Published 속성을 true로
                설정해주세요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => {
                if (!("properties" in doc)) return null;

                const title = doc.properties
                  .Title as PropertyItemObjectResponse;
                const category = doc.properties
                  .Category as PropertyItemObjectResponse;
                const slug = doc.properties.Slug as PropertyItemObjectResponse;
                const published = doc.properties
                  .Published as PropertyItemObjectResponse;
                const order = doc.properties
                  .Order as PropertyItemObjectResponse;
                const status = doc.properties
                  .Status as PropertyItemObjectResponse;
                const difficulty = doc.properties[
                  "Difficulty Level"
                ] as PropertyItemObjectResponse;
                const createdDate = doc.properties[
                  "Created Date"
                ] as PropertyItemObjectResponse;
                const lastModified = doc.properties[
                  "Last Modified"
                ] as PropertyItemObjectResponse;

                if (
                  !isTitleProperty(title) ||
                  !isSelectProperty(category) ||
                  !isRichTextProperty(slug) ||
                  !isCheckboxProperty(published) ||
                  !isNumberProperty(order) ||
                  !isStatusProperty(status) ||
                  !isSelectProperty(difficulty) ||
                  !isDateProperty(createdDate) ||
                  !isDateProperty(lastModified)
                ) {
                  return null;
                }

                const titleText = isRichTextArray(title.title)
                  ? title.title[0].plain_text
                  : "";
                const categoryName = category.select?.name;
                const slugText = isRichTextArray(slug.rich_text)
                  ? slug.rich_text[0].plain_text
                  : "";
                const isPublished = published.checkbox;
                const orderNumber = order.number;
                const statusName = status.status?.name;
                const difficultyLevel = difficulty.select?.name;
                const createdDateStr = createdDate.date?.start;
                const lastModifiedStr = lastModified.date?.start;

                if (!categoryName || !isPublished) return null;

                return (
                  <Link
                    key={doc.id}
                    href={`/docs/${categoryName}/${slugText}`}
                    prefetch={true}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold">{titleText}</h2>
                        <span className="text-sm text-gray-500">
                          #{orderNumber}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                          {categoryName}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                          {difficultyLevel}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                          {statusName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span>생성: {createdDateStr}</span>
                        <span className="mx-2">|</span>
                        <span>수정: {lastModifiedStr}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("문서 목록을 불러오는 중 오류가 발생했습니다:", error);
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-8">문서</h1>
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">
              문서를 불러오는 중 오류가 발생했습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
