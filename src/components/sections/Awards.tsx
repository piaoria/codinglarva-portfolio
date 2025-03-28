"use client";

import { useEffect, useState } from "react";

interface Award {
  id: number;
  title: string;
  date: string;
  description: string;
  isLeft: boolean;
}

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [visibleAwards, setVisibleAwards] = useState<number[]>([]);
  const [readAwards, setReadAwards] = useState<number[]>([]);
  const [isAllRead, setIsAllRead] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    // 수상 내역 추가 영역
    const sampleAwards: Award[] = [
      {
        id: 5,
        title: "삼성전자 대표이사 최우수상",
        date: "2024.12.19",
        description: "삼성 청년SW아카데미 최우수 수료(1명)",
        isLeft: true,
      },
      {
        id: 4,
        title: "실시간 공유 필기 서비스(이음) 프로젝트 우수상",
        date: "2024.11.29",
        description: "실시간 공유 필기 서비스(이음) 프로젝트",
        isLeft: false,
      },
      {
        id: 3,
        title:
          "국내 뉴스 기반 영어 학습 플랫폼(NewLearn) 빅데이터 프로젝트 최우수상",
        date: "2024.10.11",
        description:
          "국내 뉴스 기반 영어 학습 플랫폼(NewLearn) 빅데이터 프로젝트",
        isLeft: true,
      },
      {
        id: 2,
        title: "러닝 크루 관리 플랫폼(Crew-In) 웹 디자인 프로젝트 우수상",
        date: "2024.08.16",
        description: "러닝 크루 관리 플랫폼(Crew-In) 웹 디자인 프로젝트",
        isLeft: false,
      },
      {
        id: 1,
        title: "금융 상품 추천 서비스(HoneyMoney) 프로젝트 최우수상",
        date: "2024.05.24",
        description: "금융 상품 추천 서비스(HoneyMoney) 프로젝트",
        isLeft: true,
      },
    ];

    setAwards(sampleAwards);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-award-id"));
            setVisibleAwards((prev) => [...prev, id]);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    awards.forEach((award) => {
      const element = document.querySelector(`[data-award-id="${award.id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [awards]);

  useEffect(() => {
    if (readAwards.length === awards.length && awards.length > 0) {
      setIsAllRead(true);
    }
  }, [readAwards, awards]);

  const handleCardHover = (id: number) => {
    if (!readAwards.includes(id)) {
      setReadAwards((prev) => [...prev, id]);
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % awards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section id="awards" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center mb-16">
        <span>AWARDS</span>
      </h2>

      {/* 데스크톱 버전 */}
      <div className="relative w-11/12 max-w-[1000px] mx-auto px-4 hidden sm:block">
        {/* 중앙 세로선 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--award-line-color)] transform -translate-x-1/2 overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full bg-[#F78535] transition-all duration-1000 ${
              isAllRead ? "h-full" : "h-0"
            }`}
          />
        </div>

        <div className="relative space-y-[-24px]">
          {awards.map((award) => (
            <div
              key={award.id}
              data-award-id={award.id}
              className={`relative flex items-center ${
                award.isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* 카드 */}
              <div
                className={`w-[calc(50%-2rem)] max-w-md transform transition-all duration-1000 ${
                  visibleAwards.includes(award.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className="bg-[var(--award-color)] rounded-lg shadow-lg p-6 relative"
                  onMouseEnter={() => handleCardHover(award.id)}
                  onTouchStart={() => handleCardHover(award.id)}
                >
                  {/* 연결선 */}
                  <div
                    className={`absolute top-1/2 w-8 h-0.5 bg-[var(--award-line-color)] transform -translate-y-1/2 overflow-hidden ${
                      award.isLeft ? "-right-8" : "-left-8"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full bg-[#F78535] transition-all duration-1000 ${
                        readAwards.includes(award.id) ? "h-full" : "h-0"
                      }`}
                    />
                  </div>

                  {/* 원 */}
                  <div
                    className={`absolute top-1/2 w-4 h-4 rounded-full transform -translate-y-1/2 transition-colors duration-300 ${
                      award.isLeft ? "-right-10" : "-left-10"
                    } ${
                      readAwards.includes(award.id)
                        ? "bg-[#F78535]"
                        : "bg-[var(--award-line-color)]"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        readAwards.includes(award.id)
                          ? "bg-[var(--background-color)]"
                          : "bg-[#F78535]"
                      }`}
                    />
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {award.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p>{award.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모바일 버전 */}
      <div className="relative w-11/12 max-w-[500px] mx-auto px-4 sm:hidden">
        <div className="relative h-[400px]">
          {awards.map((award, index) => (
            <div
              key={award.id}
              className={`absolute w-full transition-all duration-500 transform ${
                index === currentCardIndex
                  ? "opacity-100 translate-x-0 z-10"
                  : index < currentCardIndex
                    ? "opacity-0 -translate-x-full z-0"
                    : "opacity-0 translate-x-full z-0"
              }`}
            >
              <div className="bg-[var(--award-color)] rounded-lg shadow-lg p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {award.date}
                </div>
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p>{award.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevCard}
            className="p-2 rounded-full bg-[#F78535] text-white hover:bg-[#e67a2f] transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextCard}
            className="p-2 rounded-full bg-[#F78535] text-white hover:bg-[#e67a2f] transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
