"use client";

import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center">
        <span>CONTACT</span>
      </h2>

      {/* 연락처 정보 그리드 */}
      <div className="w-11/12 max-w-[1000px] mt-16 grid grid-cols-3 gap-8">
        {/* 이름 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/person-icon.svg"
            alt="Person Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              이름
            </span>
            <span className="text-xs md:text-lg font-bold">박효진</span>
          </div>
        </div>

        {/* 생일 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/birthday-icon.svg"
            alt="Birthday Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              생일
            </span>
            <span className="text-xs md:text-lg font-bold">1996.06.24</span>
          </div>
        </div>

        {/* 학교 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/university-icon.svg"
            alt="University Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              학교
            </span>
            <span className="text-xs md:text-lg font-bold">
              Chung-Ang Univ.
            </span>
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/home-icon.svg"
            alt="Home Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              집
            </span>
            <span className="text-xs md:text-lg font-bold">서울시 용산구</span>
          </div>
        </div>

        {/* 이메일 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/email-icon.svg"
            alt="Email Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              이메일
            </span>
            <span className="text-xs md:text-lg font-bold">
              cron.phj@gmail.com
            </span>
          </div>
        </div>

        {/* 전화번호 */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
          <Image
            src="/svgs/phone-icon.svg"
            alt="Phone Icon"
            width={48}
            height={48}
            className="w-12 h-12 md:w-14 md:h-14"
          />
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs xs:text-sm text-gray-400 font-light">
              전화번호
            </span>
            <span className="text-xs md:text-lg font-bold">0502-1925-9765</span>
          </div>
        </div>
      </div>
    </section>
  );
}
