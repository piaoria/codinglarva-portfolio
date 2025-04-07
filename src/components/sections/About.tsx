"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function About() {
  const [showTexts, setShowTexts] = useState([
    false, // 안녕하세요
    false, // !
    false, // F
    false, // ront
    false, // E
    false, // nd
    false, // 개발자
    false, // 박효진
    false, // 입니다
    false, // .
  ]);

  const [typingText, setTypingText] = useState("");
  const fullText = "FRONT\nEND\nDEVELOPER";
  const [isTyping, setIsTyping] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timers = showTexts.map((_, index) =>
      setTimeout(
        () => {
          setShowTexts((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        },
        250 * (index + 1)
      )
    );

    // 왼쪽 텍스트가 모두 나타난 후 오른쪽 타이핑 시작
    const typingTimer = setTimeout(
      () => setIsTyping(true),
      250 * (showTexts.length + 1)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    let typingTimeout: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypingText((prev) => fullText.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeout = setTimeout(typeText, Math.random() * 50 + 50);
      } else {
        setIsTyping(false);
        // 타이핑이 끝난 후 프로필 이미지
        setTimeout(() => setShowImage(true), 500);
      }
    };

    typingTimeout = setTimeout(typeText, 500);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [isTyping]);

  return (
    <section
      id="about"
      className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center px-4 sm:px-8 pt-8"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-32">
        {/* 왼쪽 텍스트 */}
        <div className="flex-[1.5] min-w-0 flex justify-center md:justify-end">
          <div className="text-4xl sm:text-5xl md:text-6xl leading-tight font-thin space-y-4 md:space-y-6">
            <div className="flex flex-wrap gap-2">
              <span
                className={`${showTexts[0] ? "animate-fadeIn" : "opacity-0"}`}
              >
                안녕하세요
              </span>
              <span
                className={`text-[var(--primary-color)] font-black ${showTexts[1] ? "animate-fadeIn" : "opacity-0"}`}
              >
                !
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              <span
                className={`text-[var(--primary-color)] font-black ${showTexts[2] ? "animate-fadeIn" : "opacity-0"}`}
              >
                F
              </span>
              <span
                className={`${showTexts[3] ? "animate-fadeIn" : "opacity-0"}`}
              >
                ront
              </span>
              <span
                className={`text-[var(--primary-color)] font-black ${showTexts[4] ? "animate-fadeIn" : "opacity-0"}`}
              >
                E
              </span>
              <span
                className={`${showTexts[5] ? "animate-fadeIn" : "opacity-0"}`}
              >
                nd
              </span>
              <span
                className={`${showTexts[6] ? "animate-fadeIn" : "opacity-0"}`}
              >
                개발자
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`font-black ${showTexts[7] ? "animate-fadeIn" : "opacity-0"}`}
              >
                박효진
              </span>
              <span
                className={`${showTexts[8] ? "animate-fadeIn" : "opacity-0"}`}
              >
                입니다
              </span>
              <span
                className={`text-[var(--primary-color)] font-black ${showTexts[9] ? "animate-fadeIn" : "opacity-0"}`}
              >
                .
              </span>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex-[2] relative mt-6 md:mt-0">
          {/* 배경 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center mb-24 md:mb-48">
            <h2 className="text-[50px] sm:text-[75px] lg:text-[100px] z-10 font-bungee text-[var(--primary-color)] leading-none whitespace-pre">
              {typingText}
              {isTyping && <span className="animate-blink">|</span>}
            </h2>
          </div>

          {/* 프로필 이미지 */}
          <div
            className={`relative w-[150px] sm:w-[250px] lg:w-[300px] mx-auto ${showImage ? "animate-fadeIn" : "opacity-0"}`}
          >
            <Image
              src="/images/profile-image.png"
              alt="프로필 이미지"
              width={300}
              height={300}
              style={{ width: "100%", height: "auto" }}
              className="object-contain"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
