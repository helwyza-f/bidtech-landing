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
  title: "Nama Organisasi - Slogan Singkat Organisasi Anda",
  description: "Nama Organisasi: deskripsi singkat mengenai organisasi Anda, siapa yang Anda layani, dan wilayah operasional Anda.",
  icons: {
    icon: "/icon.png",
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
