import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { LandingCtaSection } from "./components/landing-cta-section";
import { LandingFooter } from "./components/landing-footer";
import { LandingHeader } from "./components/landing-header";
import { RecentJobsSection } from "./components/recent-jobs-section";
import { StartJourneySection } from "./components/start-journey-section";
import { TopCategoriesSection } from "./components/top-categories-section";

export function LandingPage() {
  return (
    <main id="home" className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <StartJourneySection />
      <RecentJobsSection />
      <TopCategoriesSection />
      <HowItWorksSection />
      <LandingCtaSection />
      <LandingFooter />
    </main>
  );
}
