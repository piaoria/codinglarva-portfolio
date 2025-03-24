import type { Metadata } from "next";
import { Bungee_Hairline } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";

const bungeeHairline = Bungee_Hairline({
  variable: "--font-bungee-hairline",
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
});

const pretendardThin = localFont({
  src: "./fonts/Pretendard-Thin.woff2",
  display: "block",
  weight: "100",
  variable: "--font-pretendard-thin",
  preload: true,
});

const pretendardExtraLight = localFont({
  src: "./fonts/Pretendard-ExtraLight.woff2",
  display: "block",
  weight: "200",
  variable: "--font-pretendard-extralight",
  preload: true,
});

const pretendardLight = localFont({
  src: "./fonts/Pretendard-Light.woff2",
  display: "block",
  weight: "300",
  variable: "--font-pretendard-light",
  preload: true,
});

const pretendardRegular = localFont({
  src: "./fonts/Pretendard-Regular.woff2",
  display: "block",
  weight: "400",
  variable: "--font-pretendard-regular",
  preload: true,
});

const pretendardMedium = localFont({
  src: "./fonts/Pretendard-Medium.woff2",
  display: "block",
  weight: "500",
  variable: "--font-pretendard-medium",
  preload: true,
});

const pretendardSemiBold = localFont({
  src: "./fonts/Pretendard-SemiBold.woff2",
  display: "block",
  weight: "600",
  variable: "--font-pretendard-semibold",
  preload: true,
});

const pretendardBold = localFont({
  src: "./fonts/Pretendard-Bold.woff2",
  display: "block",
  weight: "700",
  variable: "--font-pretendard-bold",
  preload: true,
});

const pretendardExtraBold = localFont({
  src: "./fonts/Pretendard-ExtraBold.woff2",
  display: "block",
  weight: "800",
  variable: "--font-pretendard-extrabold",
  preload: true,
});

const pretendardBlack = localFont({
  src: "./fonts/Pretendard-Black.woff2",
  display: "block",
  weight: "900",
  variable: "--font-pretendard-black",
  preload: true,
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
        className={`${bungeeHairline.variable} ${pretendardThin.variable} ${pretendardExtraLight.variable} ${pretendardLight.variable} ${pretendardRegular.variable} ${pretendardMedium.variable} ${pretendardSemiBold.variable} ${pretendardBold.variable} ${pretendardExtraBold.variable} ${pretendardBlack.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
