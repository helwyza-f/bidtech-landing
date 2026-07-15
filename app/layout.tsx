import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

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
        <div className="min-h-screen bg-[linear-gradient(180deg,#020303_0%,#080b0c_55%,#050505_100%)]">
          <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.8),transparent)]" />
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
