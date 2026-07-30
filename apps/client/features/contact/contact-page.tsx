import { Container } from "@repo/ui/container";
import { LandingFooter } from "../landing-page/components/landing-footer";
import { LandingHeader } from "../landing-page/components/landing-header";
import { ContactDetailsCard } from "./components/contact-details-card";
import { ContactFaqSection } from "./components/contact-faq-section";
import { ContactFormCard } from "./components/contact-form-card";

export function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <LandingHeader />
      <section className="border-t-4 border-slate-300 pb-20 pt-12">
        <Container size="xl" className="max-w-[1140px]">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950">
              Connect with WorkBridge
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-700">
              Have questions, need support, or looking to hire? Our team is here
              to help you connect, hire, and grow--faster and with confidence.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.72fr_1fr]">
            <ContactFormCard />
            <ContactDetailsCard />
          </div>

          <ContactFaqSection />
        </Container>
      </section>
      <LandingFooter />
    </main>
  );
}
