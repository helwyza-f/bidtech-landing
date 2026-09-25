import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import HowToBook from '@/components/sections/howtobook';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import Faq from '@/components/sections/Faq';

export default function Home() {
  return (
    <>
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
