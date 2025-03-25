"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);

      // 1초 후에 파동 효과 제거
      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 클릭 가능한 요소 정의
      const clickableElement = target.closest("button, a, [role='button']");

      // 이벤트 발생 가능한 요소 정의
      const isClickable =
        clickableElement !== null ||
        target.getAttribute("onClick") !== null ||
        target.getAttribute("data-clickable") === "true";

      setIsHovering(isClickable);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updatePosition);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </>
  );
}
