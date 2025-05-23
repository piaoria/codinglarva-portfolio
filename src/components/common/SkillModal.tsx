"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

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

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
}

const getTagColor = (tag: string) => {
  switch (tag) {
    case "고급":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "중급":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "초급":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function SkillModal({ skill, onClose }: SkillModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!skill) return;
    setIsClosing(false);
    setProgress(0);

    // Progress Circle 애니메이션
    const duration = 2000;
    const steps = 100;
    const increment = skill.proficiency / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= skill.proficiency) {
        setProgress(skill.proficiency);
        clearInterval(timer);
      } else {
        setProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [skill]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  };

  if (!skill && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100 animate-fadeIn"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[var(--modal-color)] p-5 rounded-lg max-w-lg w-full mx-4 transition-all duration-200 ${
          isClosing
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100 animate-scaleIn"
        }`}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* 상단 헤더 섹션 */}
        <div className="flex items-start gap-3 mb-5">
          <div className="relative w-10 h-10">
            <Image
              src={
                mounted && skill.name === "Notion" && theme === "dark"
                  ? skill.darkIcon || skill.icon
                  : skill.icon
              }
              alt={skill.name}
              fill
              sizes="width: 40px, height: 40px"
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{skill.name}</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${getTagColor(skill.tag)}`}
              >
                {skill.tag}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {skill.description}
            </p>
          </div>
          {/* Progress Circle */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* 배경 원 */}
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              {/* 진행 원 */}
              <circle
                className="text-[var(--progress-color)]"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${progress * 2.51} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
                style={{
                  transition: "stroke-dasharray 0.05s ease-in-out",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* 주요 기능 리스트 */}
        <div className="mb-6">
          <h4 className="text-base font-semibold mb-3">주요 기능</h4>
          <ul className="space-y-1.5">
            {skill.capabilities.map((capability, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[var(--primary-color)] mr-2">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {capability}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 닫기 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="px-5 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
            data-clickable="true"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
