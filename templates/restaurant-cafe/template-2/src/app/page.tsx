import {
  Navbar,
  Hero,
  BrandMarquee,
  CategoryParallax,
  SignatureDishes,
  MenuShowcase,
  Features,
  Footer,
} from "@/components/sections";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Navbar />
      <SmoothScrollProvider>
        <Hero />
        <CategoryParallax />
        <SignatureDishes />
        <MenuShowcase />
        <BrandMarquee />
        <Features />
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}

