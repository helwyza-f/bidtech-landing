import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import TrustStats from '@/components/sections/TrustStats';
import Programs from '@/components/sections/Programs';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import RegisterModal from '@/components/modals/RegisterModal';
import BranchModal from '@/components/modals/BranchModal';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <TrustStats />
        <Programs />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      
      {/* Global Modals */}
      <RegisterModal />
      <BranchModal />
    </>
  );
}
