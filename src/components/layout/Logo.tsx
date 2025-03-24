"use client";

import { useEffect, useState } from "react";

export default function Logo() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // 로컬 스토리지에서 방문 횟수 가져오기
    const storedCount = localStorage.getItem("visitCount");
    const count = storedCount ? parseInt(storedCount) : 0;

    // 방문 횟수 증가
    const newCount = count + 1;
    localStorage.setItem("visitCount", newCount.toString());
    setVisitCount(newCount);

    // 키보드 이벤트 리스너 추가 (Shift + R 시 방문 횟수 초기화)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "r") {
        localStorage.removeItem("visitCount");
        setVisitCount(0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="relative w-[160px] h-[64px]">
      {/* 첫 번째 원 */}
      <div
        className={`absolute left-0 top-2 w-12 h-12 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 1 ? "bg-[#F78535]" : "bg-[#333333]"
        }`}
      />
      {/* 두 번째 원 */}
      <div
        className={`absolute left-8 top-2 w-12 h-12 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 2 ? "bg-[#F78535]" : "bg-[#333333]"
        }`}
      />
      {/* 세 번째 원 */}
      <div
        className={`absolute left-16 top-2 w-12 h-12 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 3 ? "bg-[#F78535]" : "bg-[#333333]"
        }`}
      />
    </div>
  );
}
