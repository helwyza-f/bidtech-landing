import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";

import '../styles/globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CHULLA — Thoughtful Skincare", template: "%s — CHULLA" },
  description: "A premium frontend-only skincare showcase built around product discovery, calm routines, and editorial storytelling.",
  keywords: ['Beauty', 'Skincare'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}