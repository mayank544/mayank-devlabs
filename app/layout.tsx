import type { Metadata } from "next";
import { Archivo_Black, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import IntroAnimationWrapper from "@/components/IntroAnimationWrapper";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mayank Kumar | Full Stack Developer",
  description: "Portfolio of Mayank Kumar — Full Stack Developer building MERN apps, AI tools, and secure web experiences.",
  keywords: ["Full Stack Developer", "MERN", "React", "Node.js", "AI", "Cybersecurity"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="bg-[#050505] text-[#888888] overflow-x-hidden cursor-none">
        <CustomCursor />
        <IntroAnimationWrapper />
        <SmoothScroll>
          <div className="noise-overlay pointer-events-none fixed inset-0 z-[99] opacity-[0.025]"></div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}