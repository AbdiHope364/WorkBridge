"use client";

import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";
import Link from "next/link";
import {
  Code,
  TrendingUp,
  HeartPulse,
  Palette,
  Sparkles,
  Truck,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Technology & Software",
    badge: "Trending",
    icon: Code,
    description: "Developers, DevOps, UI/UX, and IT specialists",
    count: "450+ roles",
  },
  {
    name: "Marketing & Sales",
    badge: "High Demand",
    icon: TrendingUp,
    description: "Digital marketing, brand strategists, and sales reps",
    count: "280+ roles",
  },
  {
    name: "Healthcare & Nursing",
    badge: "Essential",
    icon: HeartPulse,
    description: "Clinical officers, nurses, and lab technicians",
    count: "190+ roles",
  },
  {
    name: "Creative & Design",
    badge: "Popular",
    icon: Palette,
    description: "Graphic design, video production, and 3D modeling",
    count: "210+ roles",
  },
  {
    name: "Cleaning & Maintenance",
    badge: "Active",
    icon: Sparkles,
    description: "Residential, commercial, and technical facility care",
    count: "340+ roles",
  },
  {
    name: "Delivery & Logistics",
    badge: "Fast Hiring",
    icon: Truck,
    description: "Drivers, warehouse coordinators, and supply chain",
    count: "310+ roles",
  },
];

export function TopCategoriesSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <Container size="xl" className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Explore Categories
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
              Top Categories
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-lg">
              Discover the most popular job categories across Ethiopia and find what fits your expertise.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex h-10 w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-emerald-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                        {category.name}
                      </h3>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 shrink-0">
                      {category.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
                  <Badge className="text-[11px] font-semibold bg-slate-100 text-slate-700 border-none">
                    {category.count}
                  </Badge>

                  <Link
                    href={`/jobs?search=${encodeURIComponent(category.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform"
                  >
                    View jobs <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
