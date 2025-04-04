"use client";

import Image from "next/image";
import { useState } from "react";

export default function Detail() {
  const [activeCards, setActiveCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCardClick = (cardId: string) => {
    setActiveCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section id="detail" className="min-h-[500px] flex flex-col items-center">
      <h2 className="pt-8 text-3xl sm:text-4xl md:text-6xl font-regular text-center">
        <span>저는 이런 사람 입니다</span>
        <span className="text-[var(--primary-color)] font-black">.</span>
      </h2>

      {/* Cards 리스트 */}
      <div className="mx-auto px-4 mt-8 sm:mt-16 font-light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 justify-items-center">
          {/* Team */}
          <div
            className={`group w-11/12 max-w-[480px] h-[300px] sm:h-[280px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 relative transition-all duration-300 ${
              activeCards["team"] ? "ring-2 ring-[var(--primary-color)]" : ""
            }`}
            onClick={() => handleCardClick("team")}
            data-clickable="true"
          >
            <div
              className={`absolute top-4 xs:top-5 sm:top-6 left-4 xs:left-5 sm:left-6 w-8 xs:w-6 sm:w-8 h-8 xs:h-6 sm:h-8 rounded-full bg-[var(--primary-color)] transition-opacity duration-300 z-0 translate-x-2 translate-y-2 pointer-events-none ${
                activeCards["team"]
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />
            <Image
              src="/svgs/team-icon.svg"
              alt="Team Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 32px, 48px"
              className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 w-12 xs:w-8 sm:w-12 h-12 xs:h-8 sm:h-12 z-10 pointer-events-none dark:invert"
            />
            <div className="mt-2 sm:mt-0 pointer-events-none">
              <h3 className="text-3xl font-bold font-pretendard text-center">
                TEAM
                <div className="w-full h-[1px] bg-current opacity-50 mt-3"></div>
              </h3>
              <p className="text-[16px] mt-4 text-left leading-normal">
                팀을 정말 좋아해요. 팀장을 맡든, 팔로워로 있든 늘 팀의{" "}
                <span className="font-bold">분위기와 소통</span>을 가장 중요하게
                생각했어요.
                <br />
                <br />
                특히 서로 잘 몰랐던 팀원들과 빠르게 친해지고 각자의 장점을
                발견해서 팀의 성과를 끌어내는 게 즐거웠어요.
              </p>
            </div>
          </div>

          {/* Idea */}
          <div
            className={`group w-11/12 max-w-[480px] h-[300px] sm:h-[280px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 relative transition-all duration-300 ${
              activeCards["idea"] ? "ring-2 ring-[var(--primary-color)]" : ""
            }`}
            onClick={() => handleCardClick("idea")}
            data-clickable="true"
          >
            <div
              className={`absolute top-4 xs:top-5 sm:top-6 left-4 xs:left-5 sm:left-6 w-8 xs:w-6 sm:w-8 h-8 xs:h-6 sm:h-8 rounded-full bg-[var(--primary-color)] transition-opacity duration-300 z-0 translate-x-2 translate-y-2 ${
                activeCards["idea"]
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />
            <Image
              src="/svgs/idea-icon.svg"
              alt="Idea Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 32px, 48px"
              className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 w-12 xs:w-8 sm:w-12 h-12 xs:h-8 sm:h-12 z-10 pointer-events-none dark:invert"
            />
            <div className="mt-2 sm:mt-0 pointer-events-none">
              <h3 className="text-3xl font-bold font-pretendard text-center">
                IDEA
                <div className="w-full h-[1px] bg-current opacity-50 mt-3"></div>
              </h3>
              <p className="text-[16px] mt-4 text-left leading-normal">
                뻔한 아이디어보다는{" "}
                <span className="font-bold">`왜 이걸 만들지?`</span>라는
                질문으로 항상 시작해요. 고객에게 필요한 게 뭔지 직접 설문도 하고
                데이터를 찾아보면서 더 나은 아이디어를 찾으려고 노력했어요.
                <br />
                <br />
                그래서인지 만든 서비스들이 더 좋은 평가를 받았던 것 같아요.
              </p>
            </div>
          </div>

          {/* Positive */}
          <div
            className={`group w-11/12 max-w-[480px] h-[300px] sm:h-[280px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 relative transition-all duration-300 ${
              activeCards["positive"]
                ? "ring-2 ring-[var(--primary-color)]"
                : ""
            }`}
            onClick={() => handleCardClick("positive")}
            data-clickable="true"
          >
            <div
              className={`absolute top-4 xs:top-5 sm:top-6 left-4 xs:left-5 sm:left-6 w-8 xs:w-6 sm:w-8 h-8 xs:h-6 sm:h-8 rounded-full bg-[var(--primary-color)] transition-opacity duration-300 z-0 translate-x-2 translate-y-2 ${
                activeCards["positive"]
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />
            <Image
              src="/svgs/positive-icon.svg"
              alt="Positive Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 32px, 48px"
              className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 w-12 xs:w-8 sm:w-12 h-12 xs:h-8 sm:h-12 z-10 pointer-events-none dark:invert"
            />
            <div className="mt-1 sm:mt-0 pointer-events-none">
              <h3 className="text-3xl font-bold font-pretendard text-center">
                POSITIVE
                <div className="w-full h-[1px] bg-current opacity-50 mt-3"></div>
              </h3>
              <p className="text-[16px] mt-4 text-left leading-normal">
                <span className="font-bold">`긍정토템`</span>이라는 별명이 있을
                만큼 긍정적인 편이에요. 어려운 상황에서도 쉽게 지치지 않고
                긍정적으로 생각하려고 노력하고, 덕분에 주변 사람들이랑도 더 쉽게
                친해지고 문제도 잘 해결됐어요.
                <br />
                <br />
                <span className="font-bold">
                  제 옆에 계시고 싶지 않으신가요?
                </span>
              </p>
            </div>
          </div>

          {/* Goal */}
          <div
            className={`group w-11/12 max-w-[480px] h-[300px] sm:h-[280px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 relative transition-all duration-300 ${
              activeCards["goal"] ? "ring-2 ring-[var(--primary-color)]" : ""
            }`}
            onClick={() => handleCardClick("goal")}
            data-clickable="true"
          >
            <div
              className={`absolute top-4 xs:top-5 sm:top-6 left-4 xs:left-5 sm:left-6 w-8 xs:w-6 sm:w-8 h-8 xs:h-6 sm:h-8 rounded-full bg-[var(--primary-color)] transition-opacity duration-300 z-0 translate-x-2 translate-y-2 ${
                activeCards["goal"]
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            />
            <Image
              src="/svgs/goal-icon.svg"
              alt="Goal Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 32px, 48px"
              className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 w-12 xs:w-8 sm:w-12 h-12 xs:h-8 sm:h-12 z-10 pointer-events-none dark:invert"
            />
            <div className="mt-1 sm:mt-0 pointer-events-none">
              <h3 className="text-3xl font-bold font-pretendard text-center">
                GOAL
                <div className="w-full h-[1px] bg-current opacity-50 mt-3"></div>
              </h3>
              <p className="text-[16px] mt-4 text-left leading-normal">
                무엇을 하든 목표부터 명확하게 정하고 시작해요. 비전공자로 개발을
                시작했지만, 단계별 목표를 세우고 하나씩 성취하다 보니 최우수
                교육생이 되기도 했어요.
                <br />
                <br />
                <span className="font-bold">다른 사람에게 필요한 존재</span>가
                되는 것이 현재 목표입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
