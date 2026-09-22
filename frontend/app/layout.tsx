import type { Metadata } from "next";
import { Inter, Playfair_Display, Sora } from "next/font/google";

import { AnnouncementBar } from "@/components/layouts/announcement-bar";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WhatsAppFloat } from "@/components/layouts/whatsapp-float";
import { LanguageProvider } from "@/lib/i18n";

import "../styles/global.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "BidTech | Business Innovative Digital Solutions",
  description:
    "BidTech is a software house focused on web, mobile, cloud, and scalable digital product delivery for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="bg-white font-[family-name:var(--font-inter)] text-white antialiased">
        <LanguageProvider>
          <div className="min-h-screen bg-white">
            <AnnouncementBar />
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
