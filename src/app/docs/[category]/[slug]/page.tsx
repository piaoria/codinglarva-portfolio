import { getDocBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/notion/NotionRenderer";
import { notFound } from "next/navigation";
import { notion } from "@/lib/notion";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

// 동적 라우팅 설정
export const dynamic = "force-dynamic";
export const revalidate = 0;

type DocPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DocPage({ params }: DocPageProps) {
  try {
    const resolvedParams = await params;

    const { slug } = resolvedParams;
    const doc = await getDocBySlug(slug);

    if (!doc) {
      notFound();
    }

    if (!("properties" in doc)) {
      throw new Error("문서 속성을 찾을 수 없습니다.");
    }

    const title = doc.properties.Title;
    const category = doc.properties.Category;
    const published = doc.properties.Published;

    if (
      !title ||
      !category ||
      !published ||
      title.type !== "title" ||
      category.type !== "select" ||
      published.type !== "checkbox" ||
      !published.checkbox
    ) {
      throw new Error("필수 문서 속성이 없거나 잘못되었습니다.");
    }

    const titleText = title.title[0].plain_text;
    const categoryName = category.select?.name;

    if (!categoryName) {
      throw new Error("카테고리 이름을 찾을 수 없습니다.");
    }

    const blocks = await notion.blocks.children.list({
      block_id: doc.id,
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-24">
        <Link
          href="/docs"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4 inline-block"
        >
          ← 문서 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mb-8">{titleText}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <NotionRenderer
            initialBlocks={blocks.results as BlockObjectResponse[]}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("문서를 불러오는 중 오류가 발생했습니다:", error);
    notFound();
  }
}
