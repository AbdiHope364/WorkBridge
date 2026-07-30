import Link from 'next/link';
import { Button } from '@repo/ui/button';
import { Container } from '@repo/ui/container';
import { SectionHeader } from '@repo/ui/section-header';

export function LandingCtaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* subtle brand glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <Container size="xl" className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            title="Start your journey today"
            description="Create your profile, explore opportunities, and connect with the right people in minutes."
          />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8">
              <Link href="/register">Get Started</Link>
            </Button>

            <Button size="lg" variant="secondary">
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            No complicated setup. Just create an account and start immediately.
          </p>
        </div>
      </Container>
    </section>
  );
}
