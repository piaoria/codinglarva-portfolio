"use client";

import Image from "next/image";

export default function Archive() {
  return (
    <section id="archive" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center">
        <span>ARCHIVE</span>
      </h2>

      {/* Cards 리스트 */}
      <div className="mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
          {/* Github */}
          <div className="w-[400px] h-[260px] lg:w-[320px] bg-[#38383F] rounded-[24px] p-6 relative">
            <Image
              src="/svgs/github-icon.svg"
              alt="Github Icon"
              width={48}
              height={48}
              className="absolute top-4 left-4"
            />
            <div className="mt-2">
              <h3 className="text-2xl font-medium font-pretendard text-center">
                Github
              </h3>
            </div>
          </div>

          {/* Tistory */}
          <div className="w-[400px] h-[260px] lg:w-[320px] bg-[#38383F] rounded-[24px] p-6 relative">
            <Image
              src="/svgs/tistory-icon.svg"
              alt="Tistory Icon"
              width={36}
              height={36}
              className="absolute top-6 left-6"
            />
            <h3 className="text-2xl font-medium font-pretendard text-center">
              Tistory
            </h3>
          </div>

          {/* Baekjoon */}
          <div className="w-[400px] h-[260px] lg:w-[320px] bg-[#38383F] rounded-[24px] p-6 relative">
            <Image
              src="/svgs/baekjoon-icon.svg"
              alt="Baekjoon Icon"
              width={40}
              height={40}
              className="absolute top-5 left-5"
            />
            <h3 className="text-2xl font-medium font-pretendard text-center">
              Baekjoon
            </h3>
            <div className="mt-6 flex justify-center">
              <a
                href="https://solved.ac/codinglarva"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="http://mazassumnida.wtf/api/v2/generate_badge?boj=codinglarva"
                  alt="Solved.ac 프로필"
                  width={300}
                  height={150}
                  style={{ width: 300, height: 150 }}
                  className="rounded-lg"
                  priority
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
