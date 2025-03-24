"use client";

import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 96 : 64; // 브레이크포인트 기준
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "awards", label: "Awards" },
    { id: "archive", label: "Archive" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-24 px-4 sm:px-8 flex items-center">
      <Logo />
      <ThemeSwitch />
      <div className="flex-1" />

      {/* 데스크톱 */}
      <div className="hidden md:flex items-center gap-4 sm:gap-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="text-base sm:text-xl"
            onClick={() => scrollToSection(item.id)}
          >
            <span className="text-[#F78535] font-black">{item.label[0]}</span>
            <span className="font-thin">{item.label.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* 모바일 메뉴 */}
      <button
        className="md:hidden w-8 h-8 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="메뉴 열기"
      >
        <Image
          src="/svgs/horizontal-tap-icon.svg"
          alt="메뉴"
          fill
          className="object-contain dark:invert"
        />
      </button>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 md:hidden">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="text-[#F78535] font-black">
                  {item.label[0]}
                </span>
                <span className="font-thin">{item.label.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
