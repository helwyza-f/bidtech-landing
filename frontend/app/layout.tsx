import type { Metadata } from "next";

import { WhatsAppFloatWrapper } from "@/components/whatsapp-float-wrapper";
import { LanguageProvider } from "@/lib/i18n";

import "./globals.css";

export const metadata: Metadata = {
  title: "BidTech | Business Innovative Digital Solutions",
  description:
    "BidTech is a software house focused on web, mobile, cloud, and scalable digital product delivery for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] font-[Tahoma,Arial,sans-serif] text-white antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <WhatsAppFloatWrapper />
      </body>
    </html>
  );
}
