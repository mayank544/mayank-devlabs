import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import IntroAnimationWrapper from "@/components/IntroAnimationWrapper";
import StructuredData from "@/components/StructuredData";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://mayank-devlabs.netlify.app";

const siteTitle = "Mayank Kumar | Full-Stack Developer";

const siteDescription =
  "Explore Mayank Kumar's developer portfolio featuring modern MERN applications, AI-powered tools, secure platforms, and creative web experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Mayank DevLabs",
  },

  description: siteDescription,

  applicationName: "Mayank DevLabs",

  authors: [
    {
      name: "Mayank Kumar",
      url: siteUrl,
    },
  ],

  creator: "Mayank Kumar",
  publisher: "Mayank Kumar",
  category: "technology",

  keywords: [
    "Mayank Kumar",
    "Mayank DevLabs",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer Portfolio",
    "AI Web Applications",
    "Cybersecurity Projects",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Mayank DevLabs",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/avatar.png",
        alt: "Mayank Kumar - Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/avatar.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceMono.variable} ${inter.variable}`}
    >
     <body className="bg-[#050505] text-[#888888] overflow-x-hidden cursor-none antialiased">
  <StructuredData />

  <CustomCursor />
  <IntroAnimationWrapper />

  <SmoothScroll>
    <div className="noise-overlay pointer-events-none fixed inset-0 z-[99] opacity-[0.025]" />
    {children}
  </SmoothScroll>
</body>
    </html>
  );
}