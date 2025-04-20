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

interface WikiDocPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getWikiDoc(category: string, slug: string) {
  try {
    const cleanSlug = slug.replace(/\.md$/, "");
    const filePath = path.join(
      process.cwd(),
      "src/content/wiki",
      category,
      `${cleanSlug}.md`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const source = fs.readFileSync(filePath, "utf8");
    const title = source.match(/^#\s+(.+)$/m)?.[1] || cleanSlug;
    const contentHtml = marked(source);

    return {
      title,
      contentHtml,
    };
  } catch (error) {
    console.error("Error reading wiki document:", error);
    throw error;
  }
}

export default async function WikiDocPage(props: WikiDocPageProps) {
  try {
    const resolvedParams = await props.params;
    const { category, slug } = resolvedParams;
    const doc = await getWikiDoc(category, slug);

    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {doc.title}
            </h1>
          </div>
          <div className="prose prose-lg max-w-none pb-8 pt-8 dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering wiki document:", error);
    return (
      <div className="text-red-500">
        문서를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }
}
