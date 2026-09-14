import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Hero } from "@/components/sections/Hero";
import { KineticMarquee } from "@/components/sections/KineticMarquee";
import { ServicesCatalogue } from "@/components/sections/ServicesCatalogue";
import { Philosophy } from "@/components/sections/Philosophy";
import { Reservation } from "@/components/sections/Reservation";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 pb-12 sm:pb-0 bg-[#F6F6F2] dark:bg-[#0B0B0C] transition-colors duration-250">
        <Hero />
        <KineticMarquee />
        <ServicesCatalogue />
        <Philosophy />
        <Reservation />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
