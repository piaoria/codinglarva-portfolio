import type { Metadata } from "next";
import { Bungee_Hairline } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";
import { HeaderColorProvider } from "@/contexts/HeaderColorContext";
import { ModalProvider } from "@/context/ModalContext";
import SkillModal from "@/components/common/SkillModal";
import { ToastProvider } from "@/context/ToastContext";
import Script from "next/script";

const bungeeHairline = Bungee_Hairline({
  variable: "--font-bungee-hairline",
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
});

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "박효진 | Frontend Developer Portfolio",
  description:
    "프론트엔드 개발자 박효진의 포트폴리오 웹사이트입니다. React, TypeScript, Next.js 등의 기술 스택을 사용한 프로젝트들을 확인해보세요.",
  keywords:
    "프론트엔드, 개발자, 포트폴리오, React, TypeScript, Next.js, 웹 개발",
  openGraph: {
    title: "박효진 | Frontend Developer Portfolio",
    description: "프론트엔드 개발자 박효진의 포트폴리오 웹사이트입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "박효진 포트폴리오",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CF7G6PZQMC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CF7G6PZQMC');
          `}
        </Script>
      </head>
      <body
        className={`${bungeeHairline.variable} ${pretendard.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <HeaderColorProvider>
            <CustomCursor />
            <ModalProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <SkillModal />
                </div>
              </ToastProvider>
            </ModalProvider>
          </HeaderColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
