"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    console.error("문서 페이지 에러:", error);
  }, [error]);

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          문서를 불러오는 중 오류가 발생했습니다
        </h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
