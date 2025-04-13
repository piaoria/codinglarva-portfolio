"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectModalProps {
  projectId: string;
  onClose: () => void;
}

interface ProjectGifData {
  gifs: string[];
  mp4s?: string[];
  color: string;
  description?: string; // 첫 페이지 텍스트 설명
}

const PROJECT_DATA: Record<string, ProjectGifData> = {
  eum: {
    gifs: ["/projects/eum/1.gif", "/projects/eum/2.gif", "/projects/eum/3.gif"],
    color: "#A59CCF",
    description:
      "교육 현장에서 발생하는 다양한 문제점들을 해결하기 위해 개발된 교육 지원 서비스입니다.\n\n1. PDF 문제 등록 및 자동 분할\n- 선생님이 PDF 문제를 업로드하면 자동으로 문제별로 분할\n- 학생들이 문제를 쉽게 찾고 풀 수 있도록 지원\n\n2. 실시간 화면 공유\n- 선생님과 학생이 실시간으로 화면을 공유하며 소통\n- 수업 중 즉각적인 피드백과 이해도 확인 가능\n\n3. 맞춤형 대시보드\n- 학생별 학습 진도와 성취도를 한눈에 파악\n- 데이터 기반의 개인화된 학습 관리 제공\n\n4. 숙제 관리 및 문제 보관함\n- 체계적인 숙제 관리 시스템\n- 풀었던 문제들을 보관하고 복습할 수 있는 기능\n\n5. Canvas 기반 Drawing 필기 기능\n- 자유로운 필기와 메모 작성\n- 선생님과 학생 간의 실시간 필기 공유",
  },
  newlearn: {
    gifs: [
      "/projects/newlearn/1.gif",
      "/projects/newlearn/2.gif",
      "/projects/newlearn/3.gif",
      "/projects/newlearn/4.gif",
      "/projects/newlearn/5.gif",
      "/projects/newlearn/6.gif",
      "/projects/newlearn/7.gif",
      "/projects/newlearn/8.gif",
      "/projects/newlearn/9.gif",
    ],
    color: "#9CAEEB",
    description:
      "영어로 뉴스를 읽으며 즐겁게 학습하는 영어 학습 플랫폼입니다.\n\n1. 개인화된 학습 경험\n- 아바타 생성 및 영단어 레벨 테스트\n- 관심 분야 기반 뉴스 추천\n- 라이트/다크 모드 지원\n\n2. 뉴스 기반 학습\n- 한/영 토글로 번역본 제공\n- 레벨별 맞춤 번역 제공\n- 단어 하이라이팅 및 의미 확인\n- Word Hunt 게임으로 단어 학습\n\n3. 스마트 단어장\n- 망각 곡선 기반 복습 시스템\n- Drag & Drop으로 단어 외움 처리\n- 단어 빈칸 테스트\n\n4. AI 발음 평가\n- Azure Speech Service 기반 발음 평가\n- 정확도, 능숙도, 운율 등 상세 분석\n- 녹음 및 피드백 제공\n\n5. 학습 관리\n- 맞춤형 학습 목표 설정\n- 학습 현황 대시보드\n- 실시간 랭킹 시스템\n\n6. 기술적 특징\n- 하이브리드 추천 시스템\n- Elasticsearch 기반 검색 최적화\n- Blue/Green 무중단 배포\n- PWA 지원",
  },
  crewin: {
    gifs: [
      // "/projects/crewin/1.gif",
      // "/projects/crewin/2.gif",
      // "/projects/crewin/3.gif",
    ],
    color: "#B6B9C5",
    description:
      "러닝 크루를 위한 통합 관리 플랫폼입니다.\n\n1. 크루 운영 관리\n- 크루 생성 및 권한 관리 (캡틴/페이서/멤버)\n- 크루원 활동 이력 자동 기록\n- 효율적인 크루 검색 및 가입\n\n2. 러닝방 운영\n- 정규런/오픈런/번개런 구분\n- 위치 기반 인원 관리\n- 실시간 참여 현황 확인\n\n3. 러닝 코스 관리\n- 맞춤형 러닝 코스 설계\n- 코스 공유 및 저장\n- 난이도별 코스 추천\n\n4. SNS 커뮤니티\n- 크루별 전용 사진 프레임\n- 러닝 기록 공유\n- 게시글 태그 및 공개 범위 설정\n- 크루 로고로 유대감 형성\n\n5. 활동 기록 관리\n- 자동화된 참여 기록\n- 크루별 활동 통계\n- 개인 러닝 히스토리",
  },
  honeymoney: {
    mp4s: ["/projects/honeymoney/1.mp4"],
    gifs: [
      // ... honeymoney gif
    ],
    color: "#FFCC5C",
    description:
      "개인 맞춤형 금융 상품 추천 서비스입니다.\n\n1. 맞춤형 금융 상품 추천\n- 유사 금융 정보 기반 상품 추천\n- 연령대별 인기 상품 추천\n- 금융 챗봇을 통한 실시간 상담\n\n2. 금융 상품 비교 분석\n- 예금/적금 상품 모아보기\n- 기간별 금리 차트 비교\n- 은행별 상품 검색\n\n3. 위치 기반 서비스\n- 카카오맵 API 활용\n- 주변 은행 검색\n- 지역별 은행 찾기\n\n4. 환율 계산 기능\n- 실시간 환율 정보\n- 송금/매매 기준율 계산\n- 외화-원화 환산\n\n5. 커뮤니티 기능\n- 게시글 및 댓글 작성\n- 금융 상품 찜하기\n- 상품별 인기도 확인\n\n6. 개인화 기능\n- 맞춤 프로필 관리\n- 금융 정보 설정\n- 관심 상품 관리",
  },
};

export default function ProjectModal({
  projectId,
  onClose,
}: ProjectModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const projectData = useMemo(() => PROJECT_DATA[projectId], [projectId]);
  const totalPages = useMemo(() => {
    if (!projectData) return 0;
    // description이 있으면 +1 페이지
    const mediaCount =
      (projectData.gifs?.length || 0) + (projectData.mp4s?.length || 0);
    return projectData.description ? mediaCount + 1 : mediaCount;
  }, [projectData]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-200 p-4 ${
        isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[var(--modal-color)] p-4 sm:p-6 rounded-lg w-full max-w-[1000px] max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          isClosing
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100 animate-scaleIn"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end mb-2 sticky top-0 bg-[var(--modal-color)] z-10">
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 설명 페이지 */}
        {currentPage === 0 && projectData.description && (
          <div className="px-2 sm:px-4 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3
                className="text-xl sm:text-2xl font-bold"
                style={{ color: projectData.color }}
              >
                프로젝트 소개
              </h3>
              {projectId === "crewin" && (
                <Link
                  href="https://crew-in.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded text-sm bg-[#4CAF50] text-white hover:opacity-80 transition-opacity"
                >
                  서비스 바로가기
                </Link>
              )}
            </div>
            <p className="whitespace-pre-line text-base sm:text-lg">
              {projectData.description}
            </p>
          </div>
        )}

        {/* 미디어 표시 */}
        {((projectData.description && currentPage > 0) ||
          !projectData.description) && (
          <div className="relative w-full max-w-[1000px] mx-auto aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden my-2 sm:my-4">
            <div className="absolute inset-0 flex items-center justify-center">
              {projectData.gifs &&
                currentPage - (projectData.description ? 1 : 0) <
                  (projectData.gifs?.length || 0) && (
                  <Image
                    src={
                      projectData.gifs[
                        currentPage - (projectData.description ? 1 : 0)
                      ]
                    }
                    alt={`Project preview ${currentPage + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1000px) 1000px"
                    priority
                    unoptimized
                    className="object-contain w-full h-full"
                  />
                )}
              {projectData.mp4s &&
                currentPage - (projectData.description ? 1 : 0) >=
                  (projectData.gifs?.length || 0) && (
                  <video
                    src={
                      projectData.mp4s[
                        currentPage -
                          (projectData.description ? 1 : 0) -
                          (projectData.gifs?.length || 0)
                      ]
                    }
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain max-w-[1000px]"
                  />
                )}
            </div>
          </div>
        )}

        {/* 페이지네이션 컨트롤 */}
        <div className="mt-2 sm:mt-4 flex justify-between items-center px-2 sm:px-0">
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition-colors"
            style={{
              backgroundColor: currentPage === 0 ? "#ccc" : projectData.color,
              opacity: currentPage === 0 ? 0.5 : 1,
            }}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            이전
          </button>
          <span className="text-sm sm:text-base ">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition-colors"
            style={{
              backgroundColor:
                currentPage === totalPages - 1 ? "#ccc" : projectData.color,
              opacity: currentPage === totalPages - 1 ? 0.5 : 1,
            }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
