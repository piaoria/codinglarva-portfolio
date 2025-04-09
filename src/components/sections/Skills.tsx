"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useModal } from "../../contexts/ModalContext";

interface Skill {
  name: string;
  icon: string;
  darkIcon?: string;
  description: string;
  level: number;
  capabilities: string[];
  proficiency: number;
  tag: string;
}

export default function Skills() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = {
    frontend: [
      {
        name: "HTML",
        icon: "/images/html-icon.png",
        description: "웹 페이지의 구조를 정의하는 마크업 언어",
        level: 5,
        capabilities: [
          "시맨틱 HTML5 마크업",
          "웹 접근성 표준 준수",
          "SEO 최적화 마크업",
          "반응형 웹 디자인 구현",
          "크로스 브라우저 호환성",
        ],
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "CSS",
        icon: "/images/css-icon.png",
        description: "웹 페이지의 스타일과 레이아웃을 정의하는 스타일시트 언어",
        level: 4,
        capabilities: [
          "Flexbox와 Grid를 활용한 레이아웃",
          "CSS 애니메이션 및 트랜지션",
          "반응형 디자인 구현",
          "CSS 모듈 및 BEM 방법론",
          "CSS 프레임워크 활용 (Tailwind, Bootstrap)",
        ],
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "JavaScript",
        icon: "/images/javascript-icon.png",
        description: "웹 페이지에 동적 기능을 추가하는 프로그래밍 언어",
        level: 5,
        capabilities: [
          "ES6+ 문법 활용",
          "비동기 프로그래밍 (Promise, async/await)",
          "DOM 조작 및 이벤트 처리",
          "클로저와 스코프 이해",
          "모듈 시스템 활용",
        ],
        proficiency: 90,
        tag: "주력",
      },
      {
        name: "TypeScript",
        icon: "/images/typescript-icon.png",
        description: "JavaScript의 타입 시스템을 추가한 프로그래밍 언어",
        level: 4,
        capabilities: [
          "인터페이스와 타입 정의",
          "제네릭 타입 활용",
          "유틸리티 타입 활용 (Partial, Pick, Omit 등)",
          "타입 가드 구현",
          "타입 추론 활용",
        ],
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "React",
        icon: "/images/react-icon.png",
        description: "사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리",
        level: 5,
        capabilities: [
          "함수형 컴포넌트와 Hooks를 활용한 개발",
          "Context API를 이용한 전역 상태 관리",
          "커스텀 훅 설계 및 구현",
          "성능 최적화 (useMemo, useCallback, React.memo)",
          "SSR/CSR 이해 및 구현",
        ],
        proficiency: 95,
        tag: "고급",
      },
      {
        name: "React Native",
        icon: "/images/reactnative-icon.png",
        description: "모바일 앱을 개발하기 위한 React 프레임워크",
        level: 4,
        capabilities: [
          "네이티브 컴포넌트 활용",
          "네비게이션 구현 (React Navigation)",
          "모바일 UI/UX 디자인",
          "디바이스 API 연동",
          "앱 배포 및 테스트",
        ],
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "Next.js",
        icon: "/images/nextjs-icon.png",
        description: "React 기반의 서버 사이드 렌더링 프레임워크",
        level: 5,
        capabilities: [
          "SSR/SSG 구현",
          "API Routes 활용",
          "이미지 최적화",
          "라우팅 시스템",
          "미들웨어 구현",
        ],
        proficiency: 90,
        tag: "주력",
      },
      {
        name: "Vue",
        icon: "/images/vue-icon.png",
        description: "진보적인 JavaScript 프레임워크",
        level: 4,
        capabilities: [
          "컴포넌트 기반 개발",
          "Vuex 상태 관리",
          "Vue Router 활용",
          "컴포지션 API 활용",
          "커스텀 디렉티브 구현",
        ],
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Redux",
        icon: "/images/redux-icon.png",
        description: "JavaScript 애플리케이션의 상태 관리 라이브러리",
        level: 4,
        capabilities: [
          "Redux Toolkit을 활용한 상태 관리",
          "createSlice를 통한 리듀서 생성",
          "비동기 작업 처리 (createAsyncThunk)",
          "미들웨어 구현 및 활용",
          "Redux DevTools를 활용한 디버깅",
        ],
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Recoil",
        icon: "/images/recoil-icon.png",
        description: "React 애플리케이션을 위한 상태 관리 라이브러리",
        level: 3,
        capabilities: [
          "Atom과 Selector 활용",
          "비동기 데이터 처리",
          "상태 파생 및 캐싱",
          "디버깅 도구 활용",
          "성능 최적화",
        ],
        proficiency: 70,
        tag: "보조",
      },
      {
        name: "Zustand",
        icon: "/images/zustand-icon.png",
        description: "간단하고 가벼운 상태 관리 라이브러리",
        level: 3,
        capabilities: [
          "상태 생성 및 관리",
          "미들웨어 활용",
          "비동기 액션 처리",
          "데브툴 연동",
          "타입스크립트 지원",
        ],
        proficiency: 70,
        tag: "보조",
      },
      {
        name: "React Query",
        icon: "/images/reactquery-icon.png",
        description: "서버 상태 관리를 위한 React 라이브러리",
        level: 4,
        capabilities: [
          "데이터 페칭 및 캐싱",
          "무한 스크롤 구현",
          "낙관적 업데이트",
          "에러 핸들링",
          "프리페칭 및 백그라운드 업데이트",
        ],
        proficiency: 80,
        tag: "중급",
      },
      {
        name: "Jest",
        icon: "/images/jest-icon.png",
        description: "JavaScript 테스팅 프레임워크",
        level: 4,
        capabilities: [
          "유닛 테스트 작성",
          "통합 테스트 구현",
          "모킹 및 스파이",
          "커버리지 분석",
          "비동기 테스트",
        ],
        proficiency: 80,
        tag: "중급",
      },
    ],
    programming: [
      {
        name: "Python",
        icon: "/images/python-icon.png",
        description: "다목적 프로그래밍 언어",
        level: 5,
        capabilities: [
          "객체지향 프로그래밍",
          "데이터 분석 및 처리",
          "웹 크롤링",
          "자동화 스크립트 작성",
          "알고리즘 구현",
        ],
        proficiency: 95,
        tag: "주력",
      },
    ],
    dev: [
      {
        name: "Docker",
        icon: "/images/docker-icon.png",
        description: "컨테이너 기반의 가상화 플랫폼",
        level: 5,
        capabilities: [
          "Dockerfile 작성",
          "컨테이너 관리",
          "이미지 빌드 및 배포",
          "Docker Compose 활용",
          "네트워크 및 볼륨 관리",
        ],
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "Jenkins",
        icon: "/images/jenkins-icon.png",
        description: "지속적 통합/지속적 배포 도구",
        level: 4,
        capabilities: [
          "파이프라인 구축",
          "자동화된 빌드 및 테스트",
          "배포 자동화",
          "플러그인 관리",
          "모니터링 및 알림 설정",
        ],
        proficiency: 85,
        tag: "중급",
      },
    ],
    design: [
      {
        name: "Figma",
        icon: "/images/figma-icon.png",
        description: "협업 디자인 도구",
        level: 5,
        capabilities: [
          "UI/UX 디자인",
          "프로토타이핑",
          "디자인 시스템 구축",
          "컴포넌트 제작",
          "협업 및 피드백",
        ],
        proficiency: 95,
        tag: "주력",
      },
      {
        name: "Notion",
        icon: "/images/notion-dark-icon.png",
        darkIcon: "/images/notion-icon.png",
        description: "협업 및 문서 관리 도구",
        level: 4,
        capabilities: [
          "문서 작성 및 관리",
          "프로젝트 일정 관리",
          "팀 협업 공간 구축",
          "데이터베이스 설계",
          "API 통합 및 자동화",
        ],
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "Jira",
        icon: "/images/jira-icon.png",
        description: "프로젝트 관리 도구",
        level: 4,
        capabilities: [
          "애자일/스크럼 프로세스 관리",
          "이슈 트래킹 및 관리",
          "스프린트 계획 및 실행",
          "워크플로우 커스터마이징",
          "성과 분석 및 리포팅",
        ],
        proficiency: 85,
        tag: "중급",
      },
      {
        name: "PowerPoint",
        icon: "/images/powerpoint-icon.png",
        description: "프레젠테이션 도구",
        level: 3,
        capabilities: [
          "프레젠테이션 디자인",
          "애니메이션 효과",
          "슬라이드 마스터 활용",
          "차트 및 그래프 작성",
          "템플릿 제작",
        ],
        proficiency: 70,
        tag: "보조",
      },
    ],
  };

  const handleSkillClick = (skill: Skill) => {
    openModal("skill", { skill });
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
                  onClick={() => handleSkillClick(skill)}
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
                  onClick={() => handleSkillClick(skill)}
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
                  onClick={() => handleSkillClick(skill)}
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
                  onClick={() => handleSkillClick(skill)}
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
    </section>
  );
}
