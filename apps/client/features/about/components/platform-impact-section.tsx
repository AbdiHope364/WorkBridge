import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";
import { SectionHeader } from "@repo/ui/section-header";

const testimonials = [
  "WorkBridge made my job search simple and fast. I found a great opportunity within days and could track all my applications in one place",
  "WorkBridge made my job search simple and fast. I found a great opportunity within days and could track all my applications in one place",
  "WorkBridge made my job search simple and fast. I found a great opportunity within days and could track all my applications in one place",
];

function Stars() {
  return (
    <span className="text-sm tracking-wide text-amber-400">*****</span>
  );
}

export function PlatformImpactSection() {
  return (
    <section className="bg-emerald-50 py-16">
      <Container size="xl" className="max-w-[1120px]">
        <SectionHeader
          eyebrow="Platform Impact"
          title="Trusted by Job Seekers and Employers"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {testimonials.map((quote, index) => (
            <Card key={index} className="rounded-xl p-5 shadow-sm">
              <p className="text-xs leading-5 text-slate-700">{quote}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-full bg-slate-200" />
                  <div>
                    <p className="text-xs font-black text-slate-950">
                      Daniel Tesfaye
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Frontend Developer
                    </p>
                  </div>
                </div>
                <Stars />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
