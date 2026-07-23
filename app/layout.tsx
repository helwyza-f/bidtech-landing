import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";

import { LanguageProvider } from "@/lib/i18n";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BidTech | Business Innovative Digital Solutions",
  description:
    "BidTech is a software house focused on web, mobile, cloud, and scalable digital product delivery for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${sora.variable} bg-[#050505] font-[family-name:var(--font-space-grotesk)] text-white antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
