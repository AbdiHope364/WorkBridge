import { Button } from "@repo/ui/button";
import { Container } from "@repo/ui/container";

export function LandingCtaSection() {
  return (
    <section className="bg-white pb-16 pt-8 ">
      <Container size="sm">
        <div className="mt-16 rounded-3xl px-8 py-10 text-center">
          <h3 className="text-3xl font-black text-black">
            Ready to take the next step?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500">
            Whether you're looking for a job or searching for talent, you can
            get started in just a few steps. Create your profile, explore
            opportunities, and connect with the right people faster.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">Find Jobs</Button>

            <Button
              size="lg"
              variant="outline"
              className="text-white bg-[#1b2855]"
              style={{ background: "#1b2855" }}
            >
              Hire Talent
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
