"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Skill {
  name: string;
  icon: string;
  darkIcon?: string;
  description: string;
  level: number;
  experience: string;
  projects: number;
  proficiency: number;
  tag: string;
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSkill(null);
      setIsClosing(false);
    }, 200); // 애니메이션 시간과 동일하게 설정
  };

  const skills = {
    frontend: [
      {
        name: "HTML",
        icon: "/images/html-icon.png",
        description: "웹 페이지의 구조를 정의하는 마크업 언어입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "CSS",
        icon: "/images/css-icon.png",
        description:
          "웹 페이지의 스타일과 레이아웃을 정의하는 스타일시트 언어입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "JavaScript",
        icon: "/images/javascript-icon.png",
        description: "웹 페이지에 동적 기능을 추가하는 프로그래밍 언어입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 90,
        tag: "주력",
      },
      {
        name: "TypeScript",
        icon: "/images/typescript-icon.png",
        description: "JavaScript의 타입 시스템을 추가한 프로그래밍 언어입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "React",
        icon: "/images/react-icon.png",
        description:
          "사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "React Native",
        icon: "/images/reactnative-icon.png",
        description: "모바일 앱을 개발하기 위한 React 프레임워크입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "Next.js",
        icon: "/images/nextjs-icon.png",
        description: "React 기반의 서버 사이드 렌더링 프레임워크입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 90,
        tag: "주력",
      },
      {
        name: "Vue",
        icon: "/images/vue-icon.png",
        description: "진보적인 JavaScript 프레임워크입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Redux",
        icon: "/images/redux-icon.png",
        description: "JavaScript 애플리케이션의 상태 관리 라이브러리입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Recoil",
        icon: "/images/recoil-icon.png",
        description: "React 애플리케이션을 위한 상태 관리 라이브러리입니다.",
        level: 3,
        experience: "1년",
        projects: 10,
        proficiency: 70,
        tag: "보조",
      },
      {
        name: "Zustand",
        icon: "/images/zustand-icon.png",
        description: "간단하고 가벼운 상태 관리 라이브러리입니다.",
        level: 3,
        experience: "1년",
        projects: 10,
        proficiency: 70,
        tag: "보조",
      },
      {
        name: "React Query",
        icon: "/images/reactquery-icon.png",
        description: "서버 상태 관리를 위한 React 라이브러리입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Jest",
        icon: "/images/jest-icon.png",
        description: "JavaScript 테스팅 프레임워크입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 80,
        tag: "중급",
      },
    ],
    programming: [
      {
        name: "Python",
        icon: "/images/python-icon.png",
        description: "다목적 프로그래밍 언어입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 95,
        tag: "주력",
      },
    ],
    dev: [
      {
        name: "Docker",
        icon: "/images/docker-icon.png",
        description: "컨테이너 기반의 가상화 플랫폼입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "Jenkins",
        icon: "/images/jenkins-icon.png",
        description: "지속적 통합/지속적 배포 도구입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 85,
        tag: "중급",
      },
    ],
    design: [
      {
        name: "Figma",
        icon: "/images/figma-icon.png",
        description: "협업 디자인 도구입니다.",
        level: 5,
        experience: "1년",
        projects: 20,
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "Notion",
        icon: "/images/notion-dark-icon.png",
        darkIcon: "/images/notion-icon.png",
        description: "협업 및 문서 관리 도구입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "Jira",
        icon: "/images/jira-icon.png",
        description: "프로젝트 관리 도구입니다.",
        level: 4,
        experience: "1년",
        projects: 15,
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "PowerPoint",
        icon: "/images/powerpoint-icon.png",
        description: "프레젠테이션 도구입니다.",
        level: 3,
        experience: "1년",
        projects: 10,
        proficiency: 70,
        tag: "보조",
      },
    ],
  };

  const getLevelColor = (level: number) => {
    if (level >= 4) return "text-red-500";
    if (level >= 3) return "text-green-500";
    return "text-blue-500";
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "주력":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "중급":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "보조":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section
      id="skills"
      className="min-h-[300px] flex flex-col items-center pb-16 sm:pb-24"
    >
      <h2 className="text-6xl font-bungee text-[var(--primary-color)] mt-6 sm:mt-10 text-center">
        <span>SKILLS</span>
      </h2>

      <div className="w-11/12 max-w-[1000px] mx-auto px-4 sm:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Frontend */}
          <div className="flex flex-col w-11/12">
            <h3 className="text-2xl font-bold mb-4">Frontend</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-8">
              {skills.frontend.map((skill, index) => (
                <div
                  key={skill.name}
                  className="w-12 h-12 relative flex items-center justify-center cursor-pointer group mx-auto transform transition-all duration-500 ease-in-out hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    data-clickable="true"
                  />
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap"
                    data-clickable="true"
                  >
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programming */}
          <div className="flex flex-col w-11/12">
            <h3 className="text-2xl font-bold mb-4">Programming</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-8">
              {skills.programming.map((skill, index) => (
                <div
                  key={skill.name}
                  className="w-12 h-12 relative flex items-center justify-center cursor-pointer group mx-auto transform transition-all duration-500 ease-in-out hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    data-clickable="true"
                  />
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap"
                    data-clickable="true"
                  >
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dev */}
          <div className="flex flex-col w-11/12">
            <h3 className="text-2xl font-bold mb-4">Dev</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-8">
              {skills.dev.map((skill, index) => (
                <div
                  key={skill.name}
                  className="w-12 h-12 relative flex items-center justify-center cursor-pointer group mx-auto transform transition-all duration-500 ease-in-out hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    data-clickable="true"
                  />
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap"
                    data-clickable="true"
                  >
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design & Communication */}
          <div className="flex flex-col w-11/12">
            <h3 className="text-2xl font-bold mb-4">Design & Communication</h3>
            <div className="border-b border-gray-300 dark:border-gray-700 mb-6" />
            <div className="grid grid-cols-4 gap-8">
              {skills.design.map((skill, index) => (
                <div
                  key={skill.name}
                  className="w-12 h-12 relative flex items-center justify-center cursor-pointer group mx-auto transform transition-all duration-500 ease-in-out hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.5s ease-in-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <Image
                    src={
                      mounted && skill.name === "Notion" && theme === "dark"
                        ? skill.darkIcon || skill.icon
                        : skill.icon
                    }
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    data-clickable="true"
                  />
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out whitespace-nowrap"
                    data-clickable="true"
                  >
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {(selectedSkill || isClosing) && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 transition-all duration-200 ${
              isClosing
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100 animate-scaleIn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{selectedSkill?.name}</h3>
              {selectedSkill?.tag && (
                <span
                  className={`px-2 py-1 rounded-full text-sm ${getTagColor(selectedSkill.tag)}`}
                >
                  {selectedSkill.tag}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedSkill?.description}
            </p>

            {/* 숙련도 정보 표시 */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">숙련도 레벨</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${star <= (selectedSkill?.level ?? 0) ? getLevelColor(selectedSkill?.level ?? 0) : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">프로젝트 경험</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedSkill?.projects}개 프로젝트 완료
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">숙련도</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${selectedSkill?.proficiency}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {selectedSkill?.proficiency}%
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                onClick={handleCloseModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
