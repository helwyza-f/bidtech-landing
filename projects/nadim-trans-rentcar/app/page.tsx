import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowToBook from "@/components/sections/howtobook";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import Faq from "@/components/sections/Faq";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";

const HOME_FAQS = [
  {
    question: "Apakah melayani sewa dan rental mobil lepas kunci di Batam?",
    answer:
      "Ya, Nadim Trans RentCar melayani sewa mobil lepas kunci 24 jam di Kota Batam dengan syarat mudah seperti KTP asli, SIM A aktif, dan deposit jaminan yang refundable 100%.",
  },
  {
    question: "Bisakah mobil diantar langsung ke Bandara Hang Nadim atau Pelabuhan Batam?",
    answer:
      "Bisa. Kami menyediakan layanan antar-jemput gratis dan tepat waktu ke Bandara Internasional Hang Nadim (BTH), Pelabuhan Ferry Batam Centre, Harbour Bay, Sekupang, serta seluruh hotel di Batam.",
  },
  {
    question: "Cakupan asuransi apa yang termasuk dalam sewa mobil?",
    answer:
      "Setiap sewa kendaraan di Nadim Trans RentCar sudah mencakup asuransi komprehensif dasar termasuk Collision Damage Waiver (CDW), proteksi pencurian, dan tanggung jawab hukum pihak ketiga.",
  },
  {
    question: "Dokumen apa yang diperlukan untuk menyewa kendaraan?",
    answer:
      "Untuk WNI cukup menyiapkan KTP asli yang masih berlaku dan SIM A aktif. Untuk WNA memerlukan Paspor asli dan International Driving Permit (SIM Internasional).",
  },
  {
    question: "Apa saja pilihan armada yang tersedia di Nadim Trans RentCar Batam?",
    answer:
      "Armada kami sangat lengkap mulai dari Toyota Alphard VIP, Innova Zenix Hybrid, Innova Reborn, Fortuner GR Sport, Avanza, Xenia, Brio, Calya, hingga Toyota Hiace Premio & Commuter untuk rombongan.",
  },
];

export default function Home() {
  return (
    <>
      <FAQPageJsonLd faqs={HOME_FAQS} />
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyChooseUs />
        <HowToBook />
        <Testimonials />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
