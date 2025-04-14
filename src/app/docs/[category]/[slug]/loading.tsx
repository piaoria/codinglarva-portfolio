export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
