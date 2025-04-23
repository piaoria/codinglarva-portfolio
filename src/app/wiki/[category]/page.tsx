import { getWikiCategories } from "@/components/wiki/WikiData";
import Link from "next/link";

interface WikiCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function WikiCategoryPage({
  params,
}: WikiCategoryPageProps) {
  const { category } = await params;
  const categories = await getWikiCategories();
  const currentCategory = categories.find((c) => c.name === category);

  if (!currentCategory) {
    return <div className="text-red-500">카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {currentCategory.name}
            </h1>
            <Link
              href="/wiki"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ← 위키 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {currentCategory.files.map((file) => (
          <Link
            key={file.slug}
            href={`/wiki/${category}/${file.slug}`}
            className="block rounded-lg border border-gray-200 p-6 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          >
            <h2 className="mb-2 text-xl font-bold">{file.title}</h2>
            {file.headings.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {file.headings.map((heading) => (
                  <span
                    key={heading}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {heading}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
