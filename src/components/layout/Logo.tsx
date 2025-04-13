"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const [visitCount, setVisitCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintPosition, setHintPosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHintPosition({
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top + 20,
    });
  };

  return (
    <div
      className="relative w-[80px] h-[64px]"
      onClick={() => router.push("/")}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      onMouseMove={handleMouseMove}
    >
      {/* 첫 번째 원 */}
      <div
        className={`absolute left-0 top-4 xs:top-3 w-8 h-8 xs:w-10 xs:h-10 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 1 ? "bg-[var(--primary-color)]" : "bg-[#333333]"
        }`}
      />
      {/* 두 번째 원 */}
      <div
        className={`absolute left-5 top-4 xs:top-3 w-8 h-8 xs:w-10 xs:h-10 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 2 ? "bg-[var(--primary-color)]" : "bg-[#333333]"
        }`}
      />
      {/* 세 번째 원 */}
      <div
        className={`absolute left-10 top-4 xs:top-3 w-8 h-8 xs:w-10 xs:h-10 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors duration-300 ${
          visitCount >= 3 ? "bg-[var(--primary-color)]" : "bg-[#333333]"
        }`}
      />

      {/* 힌트 카드 */}
      {showHint && (
        <div
          className="absolute w-[260px] bg-[var(--dropdown-bg)] border border-[var(--box-color)] rounded-lg p-4 shadow-lg z-50"
          style={{
            left: `${hintPosition.x}px`,
            top: `${hintPosition.y}px`,
            transform: "translate(0, 0)",
          }}
        >
          <p className="text-sm text-[var(--font-color)]">
            애벌레 로고는 포트폴리오 관심도 입니다.
            <br />
            방문할 때마다 한 개씩 채워지게 됩니다.
            <br />
            <span className="text-xs text-[var(--hint-color)]">
              Shift + R을 누르면 초기화됩니다.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
