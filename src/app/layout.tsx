import type { Metadata } from "next";
import { Bungee_Hairline } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";
import { HeaderColorProvider } from "@/contexts/HeaderColorContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
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
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://codinglarva.site"
  ),
  title: "박효진 | Frontend Developer Portfolio",
  description:
    "안녕하세요! 프론트엔드 개발자 박효진입니다. 사용자 경험을 중요시하며, 새로운 기술에 대한 열정을 가지고 있습니다.",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: {
      url: "/apple-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  openGraph: {
    title: "박효진 | Frontend Developer Portfolio",
    description:
      "안녕하세요! 프론트엔드 개발자 박효진입니다. 사용자 경험을 중요시하며, 새로운 기술에 대한 열정을 가지고 있습니다.",
    url: "https://codinglarva.site",
    siteName: "박효진 포트폴리오",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "박효진 포트폴리오",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "박효진 | Frontend Developer Portfolio",
    description:
      "안녕하세요! 프론트엔드 개발자 박효진입니다. 사용자 경험을 중요시하며, 새로운 기술에 대한 열정을 가지고 있습니다.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        className={`${bungeeHairline.variable} ${pretendard.variable} antialiased overflow-y-scroll`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
                </div>
              </ToastProvider>
            </ModalProvider>
          </HeaderColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
