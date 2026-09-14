import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agak Rapi — Precision Hair Architecture",
  description:
    "Editorial brutalist grooming studio design system merging dark/light studio aesthetics with high-precision architectural drafting elements.",
  keywords: [
    "Barbershop Jakarta",
    "Precision Haircut",
    "Agak Rapi",
    "Grooming Studio",
    "Cranial Bone Mapping",
    "Senopati Barbershop",
    "Fade Cut",
    "Two-Block Haircut",
  ],
  authors: [{ name: "Agak Rapi Studio" }],
  openGraph: {
    title: "Agak Rapi — Precision Hair Architecture",
    description:
      "Bukan sekadar potong rambut. Konstruksi geometris presisi dengan kalkulasi kranium kepala dan alat medis di Senopati, Jakarta Selatan.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`dark ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="selection:bg-brand-lime selection:text-brand-black bg-[#F6F6F2] dark:bg-[#0B0B0C] text-[#0E0E10] dark:text-zinc-100 transition-colors duration-250">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
