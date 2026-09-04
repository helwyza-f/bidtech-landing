import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { PartnersSection } from "@/components/home/partners-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <PartnersSection />
        <ProgramsSection />
      </main>
    </>
  );
}