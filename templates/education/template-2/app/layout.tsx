import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { RouteLine } from "@/components/layout/route-line";
import { site } from "@/lib/data/site";
import "@/styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${manrope.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <a href="#konten" className="skip-link">
          Lompat ke konten
        </a>
        <RouteLine />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}