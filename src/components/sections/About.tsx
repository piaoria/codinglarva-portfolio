export default function About() {
  return (
    <section
      id="about"
      className="min-h-[600px] flex flex-col items-center justify-center px-8"
    >
      <div className="w-full max-w-7xl flex items-center justify-between gap-16 sm:gap-32 mt-10">
        {/* 왼쪽 텍스트 */}
        <div className="flex-1 min-w-0 flex justify-end">
          <div className="text-6xl leading-tight font-thin">
            안녕하세요
            <span className="text-[#F78535] font-black">!</span>
            <br />
            <span className="text-[#F78535] font-black">F</span>
            <span className="font-light">ront</span>
            <span className="text-[#F78535] font-black">E</span>nd 개발자
            <br />
            <span className="font-black">박효진</span> 입니다
            <span className="text-[#F78535] font-black">.</span>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 relative">
          {/* 배경 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center mb-48">
            <h2 className="text-[100px] z-10 font-bungee text-[#F78535] leading-none">
              FRONT
              <br />
              END
              <br />
              DEVELOPER
            </h2>
          </div>

          {/* 프로필 이미지 */}
          <div className="relative w-[300px] mx-auto">
            <img
              src="/images/profile-image.png"
              alt="프로필 이미지"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
