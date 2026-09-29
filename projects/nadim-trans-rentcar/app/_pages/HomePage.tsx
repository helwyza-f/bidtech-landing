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
import { getFaqs } from "@/lib/localizedData";
import type { Locale } from "@/lib/i18n";

export default function HomePage({ locale }: { locale: Locale }) {
  const homeFaqs = getFaqs(locale).filter((faq) => [5, 10, 15, 16].includes(faq.id));

  return (
    <>
      <FAQPageJsonLd faqs={homeFaqs} locale={locale} />
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
