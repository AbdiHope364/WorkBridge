import Link from "next/link";
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
            Whether you&apos;re looking for a job or searching for talent, you can
            get started in just a few steps. Create your profile, explore
            opportunities, and connect with the right people faster.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-bold text-white transition hover:bg-emerald-700 shadow-md"
            >
              Find Jobs
            </Link>

            <Link
              href="/find-workers"
              className="inline-flex items-center justify-center rounded-xl bg-[#1b2855] px-8 py-3.5 text-base font-bold text-white transition hover:bg-[#141e40] shadow-md"
            >
              Hire Talent
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
