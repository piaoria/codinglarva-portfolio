"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="w-12 h-12 relative rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
        aria-label="테마 변경"
      >
        <div className="w-8 h-8 relative" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-12 h-12 relative rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
      aria-label="테마 변경"
    >
      <div className="w-8 h-8 relative">
        {theme === "dark" ? (
          <Image
            src="/svgs/lightmode-icon.svg"
            alt="라이트 모드"
            fill
            className="object-contain dark:invert"
          />
        ) : (
          <Image
            src="/svgs/darkmode-icon.svg"
            alt="다크 모드"
            fill
            className="object-contain"
          />
        )}
      </div>
    </button>
  );
}
