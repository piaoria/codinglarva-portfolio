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
  title: "Coding Larva portfolio",
  description: "Coding Larva Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
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
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <SkillModal />
              </div>
            </ModalProvider>
          </HeaderColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
