import { getDocBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/notion/NotionRenderer";
import { notFound } from "next/navigation";
import { notion } from "@/lib/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { Metadata } from "next";
import { getDocs } from "@/lib/notion";

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const doc = await getDocBySlug(params.slug);

  if (!doc || !("properties" in doc)) {
    return {
      title: "문서를 찾을 수 없음",
      description: "요청하신 문서를 찾을 수 없습니다.",
    };
  }

  const title = doc.properties.Title;
  const description = doc.properties.Description;

  if (title?.type === "title" && title.title[0]?.plain_text) {
    return {
      title: title.title[0].plain_text,
      description:
        description?.type === "rich_text" &&
        description.rich_text[0]?.plain_text
          ? description.rich_text[0].plain_text
          : "문서 상세 페이지",
    };
  }

  return {
    title: "문서",
    description: "문서 상세 페이지",
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    const docs = await getDocs();

    return docs
      .map((doc) => {
        if (!("properties" in doc)) return null;

        const category = doc.properties.Category;
        const slug = doc.properties.Slug;

        if (
          category?.type !== "select" ||
          !category.select ||
          !("name" in category.select) ||
          slug?.type !== "rich_text" ||
          !slug.rich_text ||
          !Array.isArray(slug.rich_text) ||
          !slug.rich_text[0]?.plain_text
        ) {
          return null;
        }

        return {
          category: category.select.name,
          slug: slug.rich_text[0].plain_text,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("generateStaticParams 에러:", error);
    return [];
  }
}

export default async function DocPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  try {
    const { slug, category } = params;

    console.log("=== 문서 페이지 로드 ===");
    console.log("slug:", slug);
    console.log("category:", category);

    const doc = await getDocBySlug(slug);
    if (!doc) {
      console.error("문서를 찾을 수 없음:", slug);
      notFound();
    }

    if (!("properties" in doc)) {
      console.error("문서 속성이 없음:", doc);
      throw new Error("문서 속성을 찾을 수 없습니다.");
    }

    const title = doc.properties.Title;
    const docCategory = doc.properties.Category;
    const published = doc.properties.Published;

    if (
      !title ||
      !docCategory ||
      !published ||
      title.type !== "title" ||
      docCategory.type !== "select" ||
      published.type !== "checkbox" ||
      !published.checkbox
    ) {
      console.error("필수 문서 속성이 없거나 잘못됨:", {
        title: !!title,
        category: !!docCategory,
        published: !!published,
      });
      throw new Error("필수 문서 속성이 없거나 잘못되었습니다.");
    }

    const categoryName = docCategory.select?.name;
    if (categoryName !== category) {
      console.error("카테고리 불일치:", {
        expected: category,
        actual: categoryName,
      });
      notFound();
    }

    console.log("문서 블록 로드 시작:", doc.id);
    const blocks = await notion.blocks.children.list({
      block_id: doc.id,
    });
    console.log("블록 로드 완료:", blocks.results.length);

    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <Link
          href="/docs"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4 inline-block"
        >
          ← 문서 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mb-8">
          {title.title[0]?.plain_text || "제목 없음"}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <NotionRenderer
            initialBlocks={blocks.results as BlockObjectResponse[]}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("문서를 불러오는 중 오류가 발생했습니다:", error);
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    }
    notFound();
  }
}
