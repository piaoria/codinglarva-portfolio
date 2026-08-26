import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./phj-tokens.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Profile | 박효진",
  description: "AI 기반 개발을 위한 운영체제 프로필",
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${jetbrainsMono.variable} ai-route`}
    >
      {children}
    </div>
  );
}
