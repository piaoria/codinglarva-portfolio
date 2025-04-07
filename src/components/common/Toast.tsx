"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  duration = 2000,
  onClose,
}: ToastProps) {
  const [isSliding, setIsSliding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSliding(false);
      setTimeout(() => {
        setTimeout(onClose, 300);
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-[var(--primary-color)] text-xs sm:text-sm md:text-md lg:text-lg text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isSliding ? "translate-y-[100px]" : "translate-y-[-20px]"
      }`}
    >
      {message}
    </div>
  );
}
