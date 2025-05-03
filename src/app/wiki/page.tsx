import { getWikiCategories } from "@/components/wiki/WikiData";
import Link from "next/link";

export default async function WikiPage() {
  const categories = await getWikiCategories();

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">위키</h1>
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 mb-4">
        개발 관련 지식과 정보를 모아놓은 위키입니다.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/wiki/${category.name}`}
            className="block rounded-lg border border-gray-200 p-6 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          >
            <h2 className="mb-2 text-xl font-bold">{category.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {category.files.length}개의 문서
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
