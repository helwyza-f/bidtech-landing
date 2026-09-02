import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yayasan Bhakti Nusantara - Merajut Kepedulian, Memberdayakan Masyarakat",
  description: "Yayasan Bhakti Nusantara adalah organisasi sosial kemasyarakatan nirlaba yang bergerak di bidang pemberdayaan ekonomi warga, beasiswa pendidikan, pos sehat gratis, dan kemanusiaan.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

import { LanguageProvider } from "@lib/LanguageContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
