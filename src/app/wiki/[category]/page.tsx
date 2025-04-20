import { getWikiCategories } from "@/components/wiki/WikiData";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import fs from "fs";
import path from "path";

// marked 타입 확장
declare module "marked" {
  interface MarkedOptions {
    highlight?: (code: string, lang: string) => string;
  }
}

// marked 옵션 설정
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (e) {
        console.error(e);
      }
    }
    return hljs.highlightAuto(code).value;
  },
});

interface WikiCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getWikiContent(category: string) {
  const wikiDir = path.join(process.cwd(), "src/content/wiki", category);
  const files = fs.readdirSync(wikiDir);

  const content = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(wikiDir, file);
      const source = fs.readFileSync(filePath, "utf8");
      const slug = file.replace(/\.md$/, "");

      // 마크다운 파일에서 제목과 헤딩 추출
      const title = source.match(/^#\s+(.+)$/m)?.[1] || slug;
      const headings = Array.from(source.matchAll(/^##\s+(.+)$/gm)).map(
        (match) => match[1]
      );

      // 마크다운을 HTML로 변환
      const contentHtml = marked(source);

      return {
        title,
        headings,
        contentHtml,
        slug,
      };
    })
  );

  return content;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WikiCategoryPage({
  params,
}: WikiCategoryPageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const wikiContent = await getWikiContent(category);
  const categories = await getWikiCategories();
  const currentCategory = categories.find((c) => c.name === category);

  if (!currentCategory) {
    return <div className="text-red-500">카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {currentCategory.name}
          </h1>
        </div>
        <div className="prose prose-lg max-w-none pb-8 pt-8 dark:prose-invert">
          {wikiContent.map((doc) => (
            <div key={doc.slug} id={doc.slug} className="mb-12">
              <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
