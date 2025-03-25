"use client";

import Logo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-24 px-4 sm:px-8 flex items-center z-50 bg-[var(--dropdown-bg)]">
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
            <span className="font-light">{item.label.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* 모바일 메뉴 버튼 */}
      <button
        ref={buttonRef}
        className="md:hidden w-8 h-8 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="메뉴 열기"
      >
        <Image
          src="/svgs/horizontal-tap-icon.svg"
          alt="메뉴"
          width={32}
          height={32}
          style={{ width: 32, height: 32 }}
          className="object-contain"
          priority
        />
      </button>

      {/* 모바일 메뉴 */}
      <div
        ref={menuRef}
        className={`absolute top-16 sm:top-24 left-0 right-0 bg-[var(--dropdown-bg)] border-gray-200 dark:border-gray-800 md:hidden z-10 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              className="px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors opacity-0"
              onClick={() => scrollToSection(item.id)}
              style={{
                animation: isMenuOpen
                  ? `slideDown 0.3s ease forwards ${index * 0.1}s`
                  : "none",
              }}
            >
              <span className="text-[#F78535] font-black">{item.label[0]}</span>
              <span className="font-light">{item.label.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
