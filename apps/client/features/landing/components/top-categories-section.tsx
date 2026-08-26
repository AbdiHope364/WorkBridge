import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";
import Link from "next/link";

const categories = [
  { name: "Technology", badge: "Trending" },
  { name: "Marketing & Sales", badge: "High Demand" },
  { name: "Healthcare", badge: "320 open roles" },
  { name: "Creative & Design", badge: "Trending" },
  { name: "Cleaning Services", badge: "320 open roles" },
  { name: "Delivery & Logistics", badge: "320 open roles" },
];

function CategoryIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-emerald-600 text-emerald-600">
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
        <path
          d="M3 12V5h10v7H3Zm2-7V3h6v2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    </span>
  );
}

export function TopCategoriesSection() {
  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Explore Categories
              </p>
              <h2 className="mt-1.5 text-[28px] font-black tracking-tight text-slate-950 sm:text-[34px]">
                Top Categories
              </h2>
              <p className="mt-1.5 text-[14px] text-slate-500">
                Discover the most popular job categories and find what fits you
                best.
              </p>
            </div>
          </div>
          <Link
            href="/jobs"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            View all jobs
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="mt-9 grid gap-x-28 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-950">
                  <CategoryIcon />
                  {category.name}
                </h3>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                  {category.badge}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Homes, offices, and daily cleaning jobs
              </p>

              <div className="mt-4 flex items-center justify-between">
                <Badge className="text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200">
                  320 open roles
                </Badge>

                <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  View jobs →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
