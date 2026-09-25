import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { Inter, Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nadimstrans.com"),
  title: {
    default: "Nadim Trans RentCar - Rental Mobil Batam Terpercaya Lepas Kunci & Driver",
    template: "%s | Nadim Trans RentCar Batam",
  },
  description:
    "Jasa sewa dan rental mobil terbaik di Batam. Melayani sewa mobil lepas kunci 24 jam, mobil dengan supir berpengalaman, antar jemput Bandara Hang Nadim, armada Alphard VIP, Innova Zenix, Fortuner, Avanza, dan Hiace. Hubungi 0812-7660-3878.",
  keywords: [
    "rental mobil batam",
    "sewa mobil batam",
    "rental mobil batam lepas kunci",
    "sewa mobil batam lepas kunci",
    "rental mobil batam dengan supir",
    "sewa mobil batam dengan driver",
    "sewa alphard batam",
    "rental innova zenix batam",
    "rental hiace batam",
    "antar jemput bandara hang nadim",
    "rental mobil batam 24 jam",
    "rental mobil batam center",
    "sewa mobil nagoya batam",
    "pt nadim auto transindo",
    "nadim trans rentcar",
    "nadimstrans.com",
    "rental mobil murah batam",
  ],
  authors: [{ name: "PT. Nadim Auto Transindo", url: "https://nadimstrans.com" }],
  creator: "PT. Nadim Auto Transindo",
  publisher: "Nadim Trans RentCar Batam",
  applicationName: "Nadim Trans RentCar",
  generator: "Next.js",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://nadimstrans.com",
    siteName: "Nadim Trans RentCar Batam",
    title: "Nadim Trans RentCar - Rental Mobil Batam Terpercaya Lepas Kunci & Driver",
    description:
      "Layanan rental mobil terbaik di Kota Batam. Tersedia sewa lepas kunci & dengan supir, antar jemput Bandara Hang Nadim, unit baru, bersih, dan bergaransi.",
    images: [
      {
        url: "/images/Alphard.webp",
        width: 1661,
        height: 947,
        alt: "Nadim Trans RentCar Batam - Rental Mobil Terpercaya di Batam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadim Trans RentCar - Rental Mobil Batam Terpercaya",
    description:
      "Layanan rental mobil terlengkap di Batam: Lepas Kunci, Supir Profesional, Antar Jemput Bandara Hang Nadim 24 Jam.",
    images: ["/images/Alphard.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  other: {
    "geo.region": "ID-KR",
    "geo.placename": "Kota Batam, Kepulauan Riau, Indonesia",
    "geo.position": "1.1192;104.0535",
    "ICBM": "1.1192, 104.0535",
    "DC.title": "Nadim Trans RentCar Batam",
    "DC.creator": "PT. Nadim Auto Transindo",
    "DC.subject": "Rental Mobil Batam, Sewa Mobil Batam",
    "target-country": "id",
    "distribution": "global",
    "rating": "general",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable, bebasNeue.variable)}>
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-white text-gray-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
