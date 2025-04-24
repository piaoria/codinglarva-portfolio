import { getWikiCategories } from "@/components/wiki/WikiData";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import TableOfContents from "@/components/wiki/TableOfContents";

// marked 타입 확장
declare module "marked" {
  interface MarkedOptions {
    highlight?: (code: string, lang: string) => string;
  }
  interface Code {
    text: string;
    lang?: string;
    escaped: boolean;
  }
}

// 지원할 언어 목록
const supportedLanguages = [
  "javascript",
  "typescript",
  "java",
  "html",
  "css",
  "json",
  "scss",
  "sass",
  "sql",
  "batch",
  "bash",
];

// 커스텀 렌더러 생성
const renderer = new marked.Renderer();

// 제목 렌더링
renderer.heading = function ({
  tokens,
  depth,
}: {
  tokens: { text: string }[];
  depth: number;
}): string {
  const text = tokens[0].text;
  const id = text.toLowerCase().replace(/\s+/g, "-");
  return `<h${depth} id="${id}">${text}</h${depth}>`;
} as unknown as typeof marked.Renderer.prototype.heading;

// 코드블럭 렌더링
renderer.code = ({ text, lang }: { text: string; lang?: string }): string => {
  const language =
    lang && supportedLanguages.includes(lang.toLowerCase()) ? lang : "text";
  const langClass = "language-" + language;
  const highlightedCode =
    lang && renderer?.options?.highlight
      ? (renderer.options.highlight(text, lang) as string)
      : text;

  const lines = highlightedCode.split("\n");
  if (lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const line = lines
    .map(
      (item: string, index: number) =>
        `<tr data-line=${index + 1}><td class="line-number" data-number="${index + 1}">${index + 1}</td><td class="line-code" data-number=${index + 1}>${item}</td></tr>`
    )
    .join("");

  return `<div class="codeblock"><div class="top"><p>${language.toUpperCase()}</p><div class="controls"><div></div><div></div><div></div></div></div><pre class="${langClass}"><table><tbody>${line}</tbody></table></pre></div>`;
};

// marked 옵션 설정
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
  highlight: function (code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value.trimEnd();
      } catch (e) {
        console.error(e);
      }
    }
    return hljs.highlightAuto(code).value.trimEnd();
  },
});

interface WikiDocPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getWikiDoc(category: string, slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/wiki",
    category,
    `${slug}.md`
  );
  const source = await fs.readFile(filePath, "utf8");
  const title = source.match(/^#\s+(.+)$/m)?.[1] || slug;
  const headings = Array.from(source.matchAll(/^##\s+(.+)$/gm)).map(
    (match) => match[1]
  );

  // 마크다운을 HTML로 변환
  const contentHtml = await marked(source);

  // HTML에 ID 추가
  const contentWithIds = contentHtml.replace(
    /<h([1-6])>(.+?)<\/h\1>/g,
    (match, level, text) => {
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return {
    title,
    headings,
    contentHtml: contentWithIds,
  };
}

export default async function WikiDocPage({ params }: WikiDocPageProps) {
  const { category, slug } = await params;
  const categories = await getWikiCategories();
  const currentCategory = categories.find((c) => c.name === category);

  if (!currentCategory) {
    return <div className="text-red-500">카테고리를 찾을 수 없습니다.</div>;
  }

  const doc = await getWikiDoc(category, slug);

  // 현재 문서의 인덱스 찾기
  const currentIndex = currentCategory.files.findIndex(
    (file) => file.slug === slug
  );
  const prevDoc =
    currentIndex > 0 ? currentCategory.files[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < currentCategory.files.length - 1
      ? currentCategory.files[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {doc.title}
            </h1>
            <Link
              href={`/wiki/${category}`}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← {category} 카테고리로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* 목차 네비게이션 */}
        <TableOfContents headings={doc.headings} />

        {/* 문서 내용 */}
        <div className="flex-1">
          <div className="prose prose-lg max-w-none pb-8 pt-8 dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
          </div>

          <div className="mt-8 flex justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
            {prevDoc ? (
              <Link
                href={`/wiki/${category}/${prevDoc.slug}`}
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="mr-2">←</span>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    이전 문서
                  </span>
                  <p className="font-medium">{prevDoc.title}</p>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            {nextDoc ? (
              <Link
                href={`/wiki/${category}/${nextDoc.slug}`}
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    다음 문서
                  </span>
                  <p className="font-medium">{nextDoc.title}</p>
                </div>
                <span className="ml-2">→</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
