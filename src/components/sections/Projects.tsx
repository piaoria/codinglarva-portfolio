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
        <div className="w-full h-[420px] xxs:h-[380px] xs:h-[360px] sm:h-[340px] md:h-[320px] lg:h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
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
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  개인 PC 서버를 통해{" "}
                  <span className="font-semibold">Docker</span>와{" "}
                  <span className="font-semibold">Jenkins</span>를 이용한 자동화
                  배포
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Next.js</span>를 이용한 SSR,
                  CSR 페이지 별 적용
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Notion API</span> DB 연결하여
                  Study Docs 정리,{" "}
                  <span className="font-semibold">MarkDown</span>을 이용한 개인
                  Wiki 정리
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Animation</span>과{" "}
                  <span className="font-semibold">User Interaction</span>에
                  특화된 UI Design, 반응형, 다크모드 지원
                </p>
              </div>
            </div>
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
        <div className="w-full bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
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
                <p className="text-sm text-gray-500">
                  태블릿 기반 실시간 필기 공유
                </p>
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
              태블릿 기반 실시간 필기 공유 서비스
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
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  태블릿 환경과{" "}
                  <span className="font-semibold">React Native Skia</span>{" "}
                  라이브러리를 이용한 SVG 기반 실시간 필기 데이터 처리
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Stomp.js</span>와{" "}
                  <span className="font-semibold">Sock.js</span>를 활용한 Socket
                  통신 및 실시간 데이터 동기화
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  Undo/Redo, 지우개, 펜 굵기, 색상 변경 등 필기 도구(Drawing)
                  기능 구현
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>학생과 선생님을 위한 맞춤 대시보드 UI</p>
              </div>
            </div>
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
        <div className="w-full bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
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
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">
                    MS Azure Speech Service(AI SDK)
                  </span>
                  를 이용한 STT, TTS와 실시간 사용자 발음 테스트 구현
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">MediaQuery</span>를 이용한
                  반응형과 다크모드 지원, Mobile 사용자 서비스 환경을 고려하여{" "}
                  <span className="font-semibold">
                    PWA(Progressive Web Application)
                  </span>{" "}
                  구현
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  사용자 Interaction Event를 이용한 학습 기능 구현 (Drag&Drop
                  Event를 이용한 WordHunt, Collasible 기능이 추가된 영어 단어장)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Chart.js</span> 라이브러리를
                  이용한 학습 결과 대시보드 UI
                </p>
              </div>
            </div>
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
        <div className="w-full bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
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
                  onClick={() => handleSummaryClick("crewin")}
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
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  직접 경험하고 불편했던 점을 토대로 기획 및 개발 (Running Crew
                  5년차)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  UI/UX 설계, 기능 구체화, 사용자 설문조사 및{" "}
                  <span className="font-semibold">실사용 테스트</span> 피드백 QA
                  진행
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Atomic Design Pattern</span>{" "}
                  적용 및 공통 컴포넌트 구축 관리
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  생성한 세션에 대한 카카오톡 공유를 이용하여{" "}
                  <span className="font-semibold">Service Cold Start</span> 해결
                </p>
              </div>
            </div>
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
                onClick={() => handleSummaryClick("crewin")}
              >
                SUMMARY
              </button>
            </div>
          </div>
        </div>

        {/* Honeymoney */}
        <div className="w-full bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 relative">
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
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  돈 = 꿀, 저축하다 = 꿀통에 담는다, 꿀벌 = 일하다 등의 컨셉
                  아이디어 제안 및 적용
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>Json 형태의 Prompt Engineering을 적용한 AI ChatBot 구현</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>카카오 맵 API를 이용한 주변 은행 지도 및 상품 검색 구현</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold">•</span>
                <p>
                  <span className="font-semibold">Chart.js</span> 라이브러리를
                  이용한 기간 별 금리, 금융 상품 비교 등 수치 데이터 시각화
                </p>
              </div>
            </div>
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
