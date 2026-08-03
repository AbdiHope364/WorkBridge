import Link from "next/link";

const categories = [
  {
    name: "Technology",
    description: "Software, data, IT support, and engineering roles",
    badge: "Trending",
    badgeStyle: "bg-violet-100 text-violet-700",
    openRoles: 480,
    iconBg: "bg-violet-50 text-violet-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <rect
          x="2"
          y="4"
          width="16"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 18h6M10 15v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 9l2 2-2 2M10 13h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Marketing & Sales",
    description: "Digital marketing, brand strategy, and growth roles",
    badge: "High Demand",
    badgeStyle: "bg-sky-100 text-sky-700",
    openRoles: 310,
    iconBg: "bg-sky-50 text-sky-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <path
          d="M3 14l4-4 3 3 4-5 3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="17"
          cy="10"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    name: "Healthcare",
    description: "Nursing, clinical support, and wellness positions",
    badge: "320 open roles",
    badgeStyle: "bg-rose-100 text-rose-700",
    openRoles: 320,
    iconBg: "bg-rose-50 text-rose-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <path
          d="M10 4v12M4 10h12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="3"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Creative & Design",
    description: "Graphic design, UX, video, and content creation",
    badge: "Trending",
    badgeStyle: "bg-amber-100 text-amber-700",
    openRoles: 195,
    iconBg: "bg-amber-50 text-amber-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="10"
          cy="10"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 3v2M10 15v2M3 10h2M15 10h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Cleaning Services",
    description: "Homes, offices, and commercial cleaning jobs",
    badge: "Entry Friendly",
    badgeStyle: "bg-teal-100 text-teal-700",
    openRoles: 260,
    iconBg: "bg-teal-50 text-teal-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <path
          d="M5 16c2-4 4-7 8-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M13 7c0 2-1.5 3.5-3 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Delivery & Logistics",
    description: "Last-mile delivery, courier, and supply chain roles",
    badge: "High Demand",
    badgeStyle: "bg-orange-100 text-orange-700",
    openRoles: 410,
    iconBg: "bg-orange-50 text-orange-600",
    icon: (
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
      >
        <rect
          x="1"
          y="6"
          width="12"
          height="8"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M13 9h3l2 3v2h-5V9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="5"
          cy="16"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <circle
          cx="15"
          cy="16"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    ),
  },
];

export function TopCategoriesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1300px] px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Explore by Category
            </p>
            <h2 className="mt-1.5 text-[28px] font-black tracking-tight text-slate-950 sm:text-[34px]">
              Top Categories
            </h2>
            <p className="mt-1.5 text-[14px] text-slate-500">
              Browse the most active job categories in Ethiopia right now.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            All categories
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
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

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              {/* Icon + badge row */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${cat.iconBg} transition group-hover:scale-105`}
                >
                  {cat.icon}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cat.badgeStyle}`}
                >
                  {cat.badge}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[15px] font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-slate-500">
                  {cat.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[12px] font-semibold text-slate-400">
                  {cat.openRoles} open roles
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                  Browse
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
