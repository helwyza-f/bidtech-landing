import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Manrope,
} from "next/font/google";

import { SmoothScroll } from "@/components/providers/smooth-scroll";

import "@/styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Nivora Academy",
    template: "%s | Nivora Academy",
  },

  description:
    "Belajar skill digital yang relevan melalui kelas praktis, mentor berpengalaman, dan pembelajaran yang dirancang untuk kebutuhan industri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${manrope.variable} ${dmSerif.variable}`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}