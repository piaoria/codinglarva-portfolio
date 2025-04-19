import { getWikiCategories } from '@/components/wiki/WikiData';
import { marked } from "marked";
import fs from "fs";
import path from "path";

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
      const headings = Array.from(source.matchAll(/^##\s+(.+)$/gm))
        .map(match => match[1]);
      
      // 제목을 제외한 내용만 HTML로 변환
      const contentWithoutTitle = source.replace(/^#\s+.+$/m, '');
      const contentHtml = marked(contentWithoutTitle);
      
      return {
        title,
        headings,
        contentHtml,
        slug
      };
    })
  );
  
  return content;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WikiCategoryPage({ params }: WikiCategoryPageProps) {
  const resolvedParams = await params;
  const { category } = resolvedParams;
  
  const wikiContent = await getWikiContent(category);
  const categories = await getWikiCategories();
  const currentCategory = categories.find(c => c.name === category);

  if (!currentCategory) {
    return (
      <div className="text-red-500">
        카테고리를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{currentCategory.name}</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {wikiContent.map((doc) => (
          <div key={doc.slug} id={doc.slug} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{doc.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
          </div>
        ))}
      </div>
    </>
  );
} 