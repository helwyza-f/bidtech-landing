import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Hero } from "@/components/sections/Hero";
import { Facilities } from "@/components/sections/Facilities";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Locations } from "@/components/sections/Locations";
import { Trainers } from "@/components/sections/Trainers";
import { Membership } from "@/components/sections/Membership";
import { Testimonials } from "@/components/sections/Testimonials";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Facilities />

        <WhyChooseUs />

        <Locations />

        <Trainers />

        <Membership />

        <Testimonials />

        <ConversionCTA />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}
