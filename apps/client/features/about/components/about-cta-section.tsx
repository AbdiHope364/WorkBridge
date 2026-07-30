import { Button } from "@repo/ui/button";
import { Container } from "@repo/ui/container";

export function AboutCtaSection() {
  return (
    <section className="border-1 border-violet-200 bg-white py-8">
      <Container size="md" className="text-center">
        <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-950 underline decoration-emerald-500 decoration-2 underline-offset-4">
          Ready to work or hire?
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-sm leading-5 text-slate-500">
          Whether you&apos;re looking for a job or searching for talent, you can
          get started in just a few steps.
          <br className="hidden sm:block" />
          Create your profile, explore opportunities, and connect with the right
          people faster.
        </p>
        <Button
          size="sm"
          variant="secondary"
          className="mx-auto mt-5 min-w-32 bg-gradient-to-r from-[#02081d] to-emerald-600 hover:from-slate-900 hover:to-emerald-700"
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
}
