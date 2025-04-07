"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";

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

export default function SkillModal() {
  const { selectedSkill, setSelectedSkill } = useModal();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!selectedSkill) return;
    setIsClosing(false);
  }, [selectedSkill]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSkill(null);
      setIsClosing(false);
    }, 200);
  };

  if (!selectedSkill && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
      }`}
      onClick={handleClose}
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
                  className={`text-xl ${
                    star <= (selectedSkill?.level ?? 0)
                      ? getLevelColor(selectedSkill?.level ?? 0)
                      : "text-gray-300"
                  }`}
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
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
