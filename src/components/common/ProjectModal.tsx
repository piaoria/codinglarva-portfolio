"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

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
    description: "이음 프로젝트는... 내용이 채워질 영역입니다.",
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
    description: "newlaern 프로젝트는... 내용이 채워질 영역입니다.",
  },
  honeymoney: {
    mp4s: ["/projects/honeymoney/1.mp4"],
    gifs: [
      // ... honeymoney gif
    ],
    color: "#FFCC5C",
    description: "honeymoney 프로젝트는... 내용이 채워질 영역입니다.",
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
            <h3
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ color: projectData.color }}
            >
              프로젝트 소개
            </h3>
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
