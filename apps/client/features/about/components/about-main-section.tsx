import Image from "next/image";
import { Button } from "@repo/ui/button";
import { Container } from "@repo/ui/container";

const tabs = ["Our Mission", "Our Vision", "Our Goal"];

export function AboutMainSection() {
  return (
    <section className="bg-white py-16">
      <Container size="xl" className="max-w-[1120px]">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1fr]">
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-6 py-2 text-sm font-bold text-emerald-700">
              About us
            </span>
            <h2 className="mt-5 max-w-xl text-[34px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-[38px]">
              Our Main Goal Bridging the Gap Between Job Seekers and Employers
            </h2>

            <div className="mt-10 flex flex-wrap gap-8">
              {tabs.map((tab, index) => (
                <Button
                  key={tab}
                  size="sm"
                  variant={index === 0 ? "primary" : "ghost"}
                  className={
                    index === 0
                      ? "rounded-full px-8"
                      : "rounded-full bg-emerald-50 px-8 text-emerald-700 hover:bg-emerald-100"
                  }
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="mt-9">
              <h3 className="text-[32px] font-black tracking-[-0.04em] text-slate-950">
                Our Mission
              </h3>
              <p className="mt-5 max-w-[520px] text-sm leading-7 text-slate-700">
                Our mission is to simplify the hiring process by making job
                discovery faster, more transparent, and accessible for everyone.
                We aim to connect local talent with meaningful opportunities,
                helping jobseekers find work they can trust while enabling
                employers to discover the right candidates efficiently. By
                building a reliable platform with verified listings, secure
                processes, and fair payment practices, WorkBridge creates a
                hiring experience that is not only fast, but also trustworthy
                and inclusive for communities everywhere.
              </p>
            </div>
          </div>

          <Image
            src="/imagesecondimage.png"
            alt="Employers discussing hiring plans"
            width={560}
            height={420}
            className="h-[410px] w-full rounded-[2rem] object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
