import { getWikiCategories } from "@/components/wiki/WikiData";
import WikiNavigation from "@/components/wiki/WikiNavigation";

export default async function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getWikiCategories();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <WikiNavigation categories={categories} />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
