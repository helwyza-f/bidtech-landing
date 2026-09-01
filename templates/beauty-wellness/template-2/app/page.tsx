import { HeroProductSculpture } from "../components/home/hero-product-sculpture";
import { HomeMotionController } from "../components/home/home-motion-controller";
import {
  CampaignBreakSection,
  CommunitySection,
  ConcernSection,
  FeaturedProductsSection,
  IngredientStorySection,
  JournalSection,
  ManifestoSection,
  NewsletterSection,
  OfficialStoresSection,
  PrinciplesSection,
  ReviewsSection,
  RoutineSection,
  SignatureStorySection,
} from "../components/home/home-sections";
import { SiteShell } from "../components/layout/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <HomeMotionController />
      <HeroProductSculpture />
      <ManifestoSection />
      <FeaturedProductsSection />
      <ConcernSection />
      <SignatureStorySection />
      <PrinciplesSection />
      <div id="routine"><RoutineSection /></div>
      <IngredientStorySection />
      <CampaignBreakSection />
      <ReviewsSection />
      <JournalSection />
      <CommunitySection />
      <OfficialStoresSection />
      <NewsletterSection />
    </SiteShell>
  );
}
