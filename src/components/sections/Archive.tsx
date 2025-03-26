import Image from "next/image";

export default function Archive() {
  return (
    <section id="archive" className="min-h-[500px] flex flex-col items-center">
      <h2 className="text-4xl sm:text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center">
        <span>ARCHIVE</span>
      </h2>

      {/* Cards 리스트 */}
      <div className="mx-auto px-4 mt-8 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 justify-items-center">
          {/* Github */}
          <div className="w-[300px] sm:w-[400px] h-[200px] sm:h-[260px] lg:w-[320px] bg-[#38383F] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-3 xs:p-4 sm:p-6 relative">
            <Image
              src="/svgs/github-icon.svg"
              alt="Github Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 32px, 48px"
              className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 w-12 xs:w-8 sm:w-12 h-12 xs:h-8 sm:h-12"
            />
            <div className="mt-2 sm:mt-0">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-medium font-pretendard text-center">
                Github
              </h3>
            </div>
          </div>

          {/* Tistory */}
          <div className="w-[300px] sm:w-[400px] h-[200px] sm:h-[260px] lg:w-[320px] bg-[#38383F] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-3 xs:p-4 sm:p-6 relative">
            <Image
              src="/svgs/tistory-icon.svg"
              alt="Tistory Icon"
              width={0}
              height={0}
              sizes="(max-width: 475px) 28px, 36px"
              className="absolute top-3 xs:top-4 sm:top-6 left-3 xs:left-4 sm:left-6 w-9 xs:w-7 sm:w-9 h-9 xs:h-7 sm:h-9"
            />
            <div className="mt-2 sm:mt-0">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-medium font-pretendard text-center">
                Tistory
              </h3>
            </div>
          </div>

          {/* Baekjoon */}
          <div className="w-[300px] sm:w-[400px] h-[200px] sm:h-[260px] lg:w-[320px] bg-[#38383F] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-3 xs:p-4 sm:p-6 relative">
            <Image
              src="/svgs/baekjoon-icon.svg"
              alt="Baekjoon Icon"
              width={0}
              height={0}
              className="absolute top-3 xs:top-4 sm:top-5 left-3 xs:left-4 sm:left-5 w-10 xs:w-7.5 sm:w-10 h-10 xs:h-7.5 sm:h-10"
            />
            <div className="mt-1 sm:mt-0">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-medium font-pretendard text-center">
                Baekjoon
              </h3>
            </div>
            <div className="mt-3 xs:mt-4 sm:mt-6 flex justify-center">
              <a
                href="https://solved.ac/codinglarva"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="http://mazassumnida.wtf/api/v2/generate_badge?boj=codinglarva"
                  alt="Solved.ac 프로필"
                  width={0}
                  height={0}
                  style={{ width: "100%", maxWidth: 300, height: "auto" }}
                  className="rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
