import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center px-4 sm:px-8 pt-8"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-32">
        {/* 왼쪽 텍스트 */}
        <div className="flex-[1.5] min-w-0 flex justify-center md:justify-end">
          <div className="text-4xl sm:text-5xl md:text-6xl leading-tight font-thin space-y-4 md:space-y-6">
            <div>
              안녕하세요
              <span className="text-[#F78535] font-black">!</span>
            </div>
            <div>
              <span className="text-[#F78535] font-black">F</span>
              ront
              <span className="text-[#F78535] font-black">E</span>nd 개발자
            </div>
            <div>
              <span className="font-black">박효진</span> 입니다
              <span className="text-[#F78535] font-black">.</span>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex-[2] relative mt-6 md:mt-0">
          {/* 배경 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center mb-24 md:mb-48">
            <h2 className="text-[50px] sm:text-[75px] lg:text-[100px] z-10 font-bungee text-[#F78535] leading-none">
              FRONT
              <br />
              END
              <br />
              DEVELOPER
            </h2>
          </div>

          {/* 프로필 이미지 */}
          <div className="relative w-[150px] sm:w-[250px] lg:w-[300px] mx-auto">
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
