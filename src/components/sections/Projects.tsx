"use client";

import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
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
  return (
    <section id="projects" className="min-h-[300px] flex flex-col items-center">
      <h2 className="text-4xl sm:text-6xl font-bungee text-[#F78535] mt-6 sm:mt-10 text-center">
        <span>PROJECTS</span>
      </h2>

      {/* 프로젝트 리스트 */}
      <div className="w-full max-w-[1200px] px-4 mt-8 sm:mt-16 space-y-6">
        {/* CodingLarva */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/codinglarva-icon.png"
                alt="CodingLarva Icon"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-md text-gray-500">
                  디자인부터 배포까지 Self 포트폴리오
                </p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[32px] font-bold text-[#F78535]">
                      CodingLarva
                    </h3>
                    <div className="flex gap-2">
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
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#F78535] transition-colors">
                README
              </button>
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#F78535] transition-colors">
                FIGMA
              </button>
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">
              디자인부터 배포까지 Self 포트폴리오
            </h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/svgs/clock-icon.svg"
                  alt="Clock Icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-500">~Ing</span>
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
        </div>

        {/* EUM */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/eum-icon.png"
                alt="EUM Icon"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">실시간 필기 공유 서비스</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[32px] font-bold text-[#A59CCF]">
                      EUM
                    </h3>
                    <div className="flex gap-2">
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
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors">
                README
              </button>
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#A59CCF] transition-colors">
                SUMMARY
              </button>
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">실시간 필기 공유 서비스</h4>
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
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>
        </div>

        {/* NewLearn */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/newlearn-icon.png"
                alt="NewLearn Icon"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">
                  국내 뉴스 기반 영어 학습 플랫폼
                </p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[32px] font-bold text-[#9CAEEB]">
                      NewLearn
                    </h3>
                    <div className="flex gap-2">
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
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors">
                README
              </button>
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#9CAEEB] transition-colors">
                SUMMARY
              </button>
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">
              국내 뉴스 기반 영어 학습 플랫폼
            </h4>
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
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>
        </div>

        {/* Crewin */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/crewin-icon.png"
                alt="Crewin Icon"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">러닝 크루 관리 플랫폼</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[32px] font-bold text-[#B6B9C5]">
                      Crew-In
                    </h3>
                    <div className="flex gap-2">
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
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors">
                README
              </button>
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#B6B9C5] transition-colors">
                SUMMARY
              </button>
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">러닝 크루 관리 플랫폼</h4>
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
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>
        </div>

        {/* Honeymoney */}
        <div className="w-full h-[300px] bg-[var(--box-color)] rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] p-6 relative">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            {/* 왼쪽: 아이콘과 설명 */}
            <div className="flex items-start gap-4">
              <Image
                src="/images/honeymoney-icon.png"
                alt="Honeymoney Icon"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">금융 상품 추천 서비스</p>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[32px] font-bold text-[#FFCC5C]">
                      HoneyMoney
                    </h3>
                    <div className="flex gap-2">
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
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors">
                README
              </button>
              <button className="px-4 py-2 bg-[#5E5E5E] text-white rounded-lg text-xs hover:bg-[#FFCC5C] transition-colors">
                SUMMARY
              </button>
            </div>
          </div>

          {/* 서브타이틀 */}
          <div className="flex items-center justify-between mt-6">
            <h4 className="text-lg font-semibold">금융 상품 추천 서비스</h4>
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
          </div>

          {/* 본문 */}
          <div className="mt-4">
            <p className="text-gray-600">내용이 채워질 영역입니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
