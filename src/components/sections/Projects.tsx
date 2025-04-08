"use client";

import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { useModal } from "@/contexts/ModalContext";
import Link from "next/link";
import {
  NextChip,
  TypescriptChip,
  DockerChip,
  JenkinsChip,
  JestChip,
  TailwindChip,
  ReactNativeChip,
  ReactQueryChip,
  ZustandChip,
  ReactChip,
  RecoilChip,
  StyledComponentChip,
  ReduxChip,
  VueChip,
  PiniaChip,
  PythonChip,
  JavascriptChip,
} from "@/components/chips";

export default function Projects() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { showToast } = useToast();
  const { openModal } = useModal();

  const toggleDropdown = (projectId: string) => {
    setOpenDropdown(openDropdown === projectId ? null : projectId);
  };

  const handleComingSoonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("작업 중 입니다. 기대해주세요!");
  };

  const handleSummaryClick = (projectId: string) => {
    openModal("project", { projectId });
  };

  return (
    <section id="projects" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-6xl font-bungee text-[var(--primary-color)] mt-6 sm:mt-10 text-center pb-16">
        <span>PROJECTS</span>
      </h2>

      {/* 프로젝트 리스트 */}
      <div className="w-11/12 max-w-[1000px] px-2 space-y-6">
        {/* CodingLarva */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between items-center">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-2 items-center">
              <Image
                src="/images/codinglarva-icon.png"
                alt="CodingLarva Icon"
                width={48}
                height={48}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">포트폴리오</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--primary-color)]">
                      CodingLarva
                    </h3>
                    <div className="hidden lg:flex gap-2">
                      <NextChip />
                      <TypescriptChip />
                      <DockerChip />
                      <JenkinsChip />
                      <JestChip />
                      <TailwindChip />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 오른쪽: 버튼들 */}
            <div className="flex items-center gap-2 relative">
              <button
                className="lg:hidden px-2 py-1.5 rounded-lg text-xs hover:bg-[var(--primary-color)] transition-colors flex items-center sm:gap-1"
                onClick={() => toggleDropdown("codinglarva")}
              >
                기술 스택
                <Image
                  src="/svgs/dropdown-icon.svg"
                  alt="Dropdown Icon"
                  width={16}
                  height={16}
                  className={`dark:invert transition-transform ${openDropdown === "codinglarva" ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="https://github.com/piaoria/codinglarva-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[var(--primary-color)] transition-colors"
                >
                  README
                </Link>
                <button
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[var(--primary-color)] transition-colors"
                  onClick={handleComingSoonClick}
                >
                  FIGMA
                </button>
              </div>

              {/* 기술 스택 드롭다운 */}
              {openDropdown === "codinglarva" && (
                <div className="lg:hidden absolute top-full left-[-90px] -translate-x-16 mt-2 bg-[var(--box-color)] rounded-lg shadow-lg p-4 z-10 animate-slideDown">
                  <div className="flex flex-col gap-2">
                    <NextChip />
                    <TypescriptChip />
                    <DockerChip />
                    <JenkinsChip />
                    <JestChip />
                    <TailwindChip />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-md md:text-lg font-semibold">
              디자인부터 배포까지 Self 포트폴리오
            </h4>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">~ing</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">1명</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>

          {/* sm 레이아웃에서 하단에 표시되는 요소들 */}
          <div className="sm:hidden flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">~ing</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">1명</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/piaoria/codinglarva-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[var(--primary-color)] transition-colors"
              >
                README
              </Link>
              <button
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[var(--primary-color)] transition-colors"
                onClick={handleComingSoonClick}
              >
                FIGMA
              </button>
            </div>
          </div>
        </div>

        {/* EUM */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between items-center">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-2 items-center">
              <Image
                src="/images/eum-icon.png"
                alt="EUM Icon"
                width={48}
                height={48}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">실시간 필기 공유</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#A59CCF]">
                      이음
                    </h3>
                    <div className="hidden lg:flex gap-2">
                      <ReactNativeChip />
                      <TypescriptChip />
                      <ReactQueryChip />
                      <ZustandChip />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 오른쪽: 버튼들 */}
            <div className="flex items-center gap-2 relative">
              <button
                className="lg:hidden px-2 py-1.5 rounded-lg text-xs hover:bg-[#A59CCF] transition-colors flex items-center sm:gap-1"
                onClick={() => toggleDropdown("eum")}
              >
                기술 스택
                <Image
                  src="/svgs/dropdown-icon.svg"
                  alt="Dropdown Icon"
                  width={16}
                  height={16}
                  className={`dark:invert transition-transform ${openDropdown === "eum" ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="https://github.com/eum-silvertown/eum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors"
                >
                  README
                </Link>
                <button
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors"
                  onClick={() => handleSummaryClick("eum")}
                >
                  SUMMARY
                </button>
              </div>

              {/* 기술 스택 드롭다운 */}
              {openDropdown === "eum" && (
                <div className="lg:hidden absolute top-full left-[-90px] -translate-x-16 mt-2 bg-[var(--box-color)] rounded-lg shadow-lg p-4 z-10 animate-slideDown">
                  <div className="flex flex-col gap-2">
                    <ReactNativeChip />
                    <TypescriptChip />
                    <ReactQueryChip />
                    <ZustandChip />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-md md:text-lg font-semibold">
              실시간 필기 공유 서비스
            </h4>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>

          {/* sm 레이아웃에서 하단에 표시되는 요소들 */}
          <div className="sm:hidden flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/eum-silvertown/eum"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors"
              >
                README
              </Link>
              <button
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors"
                onClick={() => handleSummaryClick("eum")}
              >
                SUMMARY
              </button>
            </div>
          </div>
        </div>

        {/* NewLearn */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between items-center">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-2 items-center">
              <Image
                src="/images/newlearn-icon.png"
                alt="NewLearn Icon"
                width={48}
                height={48}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">빅데이터 추천</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#9CAEEB]">
                      NewLearn
                    </h3>
                    <div className="hidden lg:flex gap-2">
                      <ReactChip />
                      <TypescriptChip />
                      <ReactQueryChip />
                      <RecoilChip />
                      <StyledComponentChip />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 오른쪽: 버튼들 */}
            <div className="flex items-center gap-2 relative">
              <button
                className="lg:hidden px-2 py-1.5 rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors flex items-center sm:gap-1"
                onClick={() => toggleDropdown("newlearn")}
              >
                기술 스택
                <Image
                  src="/svgs/dropdown-icon.svg"
                  alt="Dropdown Icon"
                  width={16}
                  height={16}
                  className={`dark:invert transition-transform ${openDropdown === "newlearn" ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="https://github.com/zozoclub/newlearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors"
                >
                  README
                </Link>
                <button
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors"
                  onClick={() => handleSummaryClick("newlearn")}
                >
                  SUMMARY
                </button>
              </div>

              {/* 기술 스택 드롭다운 */}
              {openDropdown === "newlearn" && (
                <div className="lg:hidden absolute top-full left-[-90px] -translate-x-16 mt-2 bg-[var(--box-color)] rounded-lg shadow-lg p-4 z-10 animate-slideDown">
                  <div className="flex flex-col gap-2">
                    <ReactChip />
                    <TypescriptChip />
                    <ReactQueryChip />
                    <RecoilChip />
                    <StyledComponentChip />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-md md:text-lg font-semibold">
              국내 뉴스 기반 영어 학습 플랫폼
            </h4>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>

          {/* sm 레이아웃에서 하단에 표시되는 요소들 */}
          <div className="sm:hidden flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/zozoclub/newlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors"
              >
                README
              </Link>
              <button
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors"
                onClick={() => handleSummaryClick("newlearn")}
              >
                SUMMARY
              </button>
            </div>
          </div>
        </div>

        {/* Crewin */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between items-center">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-2 items-center">
              <Image
                src="/images/crewin-icon.png"
                alt="Crewin Icon"
                width={48}
                height={48}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">러닝 크루 관리</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#B6B9C5]">
                      Crew-In
                    </h3>
                    <div className="hidden lg:flex gap-2">
                      <ReactChip />
                      <TypescriptChip />
                      <ReactQueryChip />
                      <ReduxChip />
                      <TailwindChip />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 오른쪽: 버튼들 */}
            <div className="flex items-center gap-2 relative">
              <button
                className="lg:hidden px-2 py-1.5 rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors flex items-center sm:gap-1"
                onClick={() => toggleDropdown("crewin")}
              >
                기술 스택
                <Image
                  src="/svgs/dropdown-icon.svg"
                  alt="Dropdown Icon"
                  width={16}
                  height={16}
                  className={`dark:invert transition-transform ${openDropdown === "crewin" ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="https://github.com/LuckyCoockie/CrewIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors"
                >
                  README
                </Link>
                <button
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors"
                  onClick={handleComingSoonClick}
                >
                  SUMMARY
                </button>
              </div>

              {/* 기술 스택 드롭다운 */}
              {openDropdown === "crewin" && (
                <div className="lg:hidden absolute top-full left-[-90px] -translate-x-16 mt-2 bg-[var(--box-color)] rounded-lg shadow-lg p-4 z-10 animate-slideDown">
                  <div className="flex flex-col gap-2">
                    <ReactChip />
                    <TypescriptChip />
                    <ReactQueryChip />
                    <ReduxChip />
                    <TailwindChip />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-md md:text-lg font-semibold">
              러닝 크루 관리 플랫폼
            </h4>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>

          {/* sm 레이아웃에서 하단에 표시되는 요소들 */}
          <div className="sm:hidden flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">6명</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/LuckyCoockie/CrewIn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors"
              >
                README
              </Link>
              <button
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors"
                onClick={handleComingSoonClick}
              >
                SUMMARY
              </button>
            </div>
          </div>
        </div>

        {/* Honeymoney */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between items-center">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-2 items-center">
              <Image
                src="/images/honeymoney-icon.png"
                alt="Honeymoney Icon"
                width={48}
                height={48}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">금융 상품 추천</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[#FFCC5C]">
                      HoneyMoney
                    </h3>
                    <div className="hidden lg:flex gap-2">
                      <VueChip />
                      <JavascriptChip />
                      <PiniaChip />
                      <PythonChip />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 오른쪽: 버튼들 */}
            <div className="flex items-center gap-2 relative">
              <button
                className="lg:hidden px-2 py-1.5 rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors flex items-center sm:gap-1"
                onClick={() => toggleDropdown("honeymoney")}
              >
                기술 스택
                <Image
                  src="/svgs/dropdown-icon.svg"
                  alt="Dropdown Icon"
                  width={16}
                  height={16}
                  className={`dark:invert transition-transform ${openDropdown === "honeymoney" ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="https://github.com/piaoria/HoneyMoney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors"
                >
                  README
                </Link>
                <button
                  className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors"
                  onClick={() => handleSummaryClick("honeymoney")}
                >
                  SUMMARY
                </button>
              </div>

              {/* 기술 스택 드롭다운 */}
              {openDropdown === "honeymoney" && (
                <div className="lg:hidden absolute top-full left-[-90px] -translate-x-16 mt-2 bg-[var(--box-color)] rounded-lg shadow-lg p-4 z-10 animate-slideDown">
                  <div className="flex flex-col gap-2">
                    <VueChip />
                    <JavascriptChip />
                    <PiniaChip />
                    <PythonChip />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-md md:text-lg font-semibold">
              금융 상품 추천 서비스
            </h4>
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">2주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">2명</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>

          {/* sm 레이아웃에서 하단에 표시되는 요소들 */}
          <div className="sm:hidden flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">2주</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/profile-icon.svg"
                  alt="Profile Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">2명</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/piaoria/HoneyMoney"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors"
              >
                README
              </Link>
              <button
                className="px-2 py-1.5 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors"
                onClick={() => handleSummaryClick("honeymoney")}
              >
                SUMMARY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
