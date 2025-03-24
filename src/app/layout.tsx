import type { Metadata } from "next";
import { Bungee_Hairline } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

export const bungeeHairline = Bungee_Hairline({
  variable: "--font-bungee-hairline",
  subsets: ["latin"],
  weight: ["400"],
});

const pretendardThin = localFont({
  src: "../../public/fonts/Pretendard-Thin.woff2",
  display: "swap",
  weight: "100",
  variable: "--font-pretendard-thin",
});

const pretendardExtraLight = localFont({
  src: "../../public/fonts/Pretendard-ExtraLight.woff2",
  display: "swap",
  weight: "200",
  variable: "--font-pretendard-extralight",
});

const pretendardLight = localFont({
  src: "../../public/fonts/Pretendard-Light.woff2",
  display: "swap",
  weight: "300",
  variable: "--font-pretendard-light",
});

const pretendardRegular = localFont({
  src: "../../public/fonts/Pretendard-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-pretendard-regular",
});

const pretendardMedium = localFont({
  src: "../../public/fonts/Pretendard-Medium.woff2",
  display: "swap",
  weight: "500",
  variable: "--font-pretendard-medium",
});

const pretendardSemiBold = localFont({
  src: "../../public/fonts/Pretendard-SemiBold.woff2",
  display: "swap",
  weight: "600",
  variable: "--font-pretendard-semibold",
});

const pretendardBold = localFont({
  src: "../../public/fonts/Pretendard-Bold.woff2",
  display: "swap",
  weight: "700",
  variable: "--font-pretendard-bold",
});

const pretendardExtraBold = localFont({
  src: "../../public/fonts/Pretendard-ExtraBold.woff2",
  display: "swap",
  weight: "800",
  variable: "--font-pretendard-extrabold",
});

const pretendardBlack = localFont({
  src: "../../public/fonts/Pretendard-Black.woff2",
  display: "swap",
  weight: "900",
  variable: "--font-pretendard-black",
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
    <html lang="kr" suppressHydrationWarning>
      <body
        className={`${bungeeHairline.variable} ${pretendardThin.variable} ${pretendardExtraLight.variable} ${pretendardLight.variable} ${pretendardRegular.variable} ${pretendardMedium.variable} ${pretendardSemiBold.variable} ${pretendardBold.variable} ${pretendardExtraBold.variable} ${pretendardBlack.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
