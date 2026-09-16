import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WhatsAppFloat } from "@/components/layouts/whatsapp-float";
import { LanguageProvider } from "@/lib/i18n";

import "../styles/global.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "BidTech | Business Innovative Digital Solutions",
  description:
    "BidTech is a software house focused on web, mobile, cloud, and scalable digital product delivery for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-white font-[family-name:var(--font-inter)] text-white antialiased">
        <LanguageProvider>
          <div className="min-h-screen bg-white">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </LanguageProvider>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
