import { LandingFooter } from "../landing/components/landing-footer";
import { LandingHeader } from "../landing/components/landing-header";
import { AboutCtaSection } from "./components/about-cta-section";
import { AboutHeroSection } from "./components/about-hero-section";
import { AboutMainSection } from "./components/about-main-section";
import { PlatformImpactSection } from "./components/platform-impact-section";

export function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />
      <AboutHeroSection />
      <AboutMainSection />
      <PlatformImpactSection />
      <AboutCtaSection />
      <LandingFooter />
    </main>
  );
}
