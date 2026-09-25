import type { Metadata } from "next";
import FaqClient from "./FaqClient";
import { ALL_FAQS } from "@/lib/faqData";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pusat Bantuan & FAQ Rental Mobil Batam - Syarat & Ketentuan",
  description:
    "Jawaban lengkap pertanyaan seputar rental mobil Batam: Syarat sewa lepas kunci, rental mobil dengan supir, metode pembayaran (Transfer, Kartu Kredit, QRIS), asuransi CDW, dan antar-jemput Bandara Hang Nadim Batam.",
  keywords: [
    "faq rental mobil batam",
    "syarat sewa mobil batam",
    "syarat rental mobil lepas kunci batam",
    "biaya sewa mobil batam",
    "asuransi rental mobil batam",
    "cara pesan rental mobil batam",
    "nadim trans batam bantuan",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ & Pusat Bantuan Rental Mobil Batam - Nadim Trans RentCar",
    description:
      "Temukan jawaban seputar syarat sewa lepas kunci, supir, deposit jaminan, dan layanan antar jemput Bandara Hang Nadim.",
    url: "https://nadimstrans.com/faq",
    images: [
      {
        url: "/images/Alphard.webp",
        width: 1661,
        height: 947,
        alt: "Pusat Bantuan dan FAQ Nadim Trans RentCar Batam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ Rental Mobil Batam - Nadim Trans RentCar",
    description:
      "Pelajari persyaratan sewa lepas kunci, asuransi, dan prosedur pemesanan rental mobil di Batam.",
    images: ["/images/Alphard.webp"],
  },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "/" },
          { name: "Pusat Bantuan & FAQ", url: "/faq" },
        ]}
      />
      <FAQPageJsonLd faqs={ALL_FAQS} />
      <FaqClient />
    </>
  );
}
