export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* 제목 스켈레톤 */}
        <div className="h-12 w-1/3 bg-[var(--modal-color)] rounded-lg animate-pulse mb-8"></div>

        {/* 문서 카드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 bg-[var(--modal-color)] rounded-lg shadow-md"
            >
              <div className="h-6 w-3/4 bg-[var(--modal-color)] rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-1/4 bg-[var(--modal-color)] rounded animate-pulse"></div>
                <div className="h-4 w-1/3 bg-[var(--modal-color)] rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-[var(--modal-color)] rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
