import Link from "next/link";

const categories = [
  {
    name: "Electricians & Power",
    description: "Residential rewiring, 3-phase panels, solar inverters & emergency repair",
    badge: "High Demand",
    badgeStyle: "bg-amber-100 text-amber-800",
    openRoles: 540,
    iconBg: "bg-amber-50 text-amber-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Plumbing & Sanitary",
    description: "High-pressure leak repairs, PPR welding, drainage, water tanks & pumps",
    badge: "Emergency Callouts",
    badgeStyle: "bg-cyan-100 text-cyan-800",
    openRoles: 420,
    iconBg: "bg-cyan-50 text-cyan-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 4H9L8 4z" />
      </svg>
    ),
  },
  {
    name: "Carpentry & Woodwork",
    description: "Custom kitchen cabinets, doors, partitions, roof trusses & hardwood furniture",
    badge: "Popular",
    badgeStyle: "bg-orange-100 text-orange-800",
    openRoles: 380,
    iconBg: "bg-orange-50 text-orange-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    name: "HVAC & AC Systems",
    description: "Air conditioning, central chillers, cold storage & compressor maintenance",
    badge: "Trending",
    badgeStyle: "bg-blue-100 text-blue-800",
    openRoles: 290,
    iconBg: "bg-blue-50 text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.364 6.364l-12.728-12.728m12.728 0L6.364 18.364" />
      </svg>
    ),
  },
  {
    name: "Masonry & Construction",
    description: "Structural concrete, bricklaying, foundation work & site labor",
    badge: "Top Rated",
    badgeStyle: "bg-stone-100 text-stone-800",
    openRoles: 610,
    iconBg: "bg-stone-50 text-stone-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M3 15h18M9 3v6M15 3v6M6 9v6M12 9v6M18 9v6M9 15v6M15 15v6" />
      </svg>
    ),
  },
  {
    name: "Painting & Finishing",
    description: "Interior/exterior painting, waterproofing, plastering & textured stucco",
    badge: "Entry Friendly",
    badgeStyle: "bg-emerald-100 text-emerald-800",
    openRoles: 315,
    iconBg: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: "Technology & Software",
    description: "Software engineering, cloud infrastructure, web apps & IT support",
    badge: "Trending",
    badgeStyle: "bg-violet-100 text-violet-700",
    openRoles: 480,
    iconBg: "bg-violet-50 text-violet-600",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none">
        <rect x="2" y="4" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 18h6M10 15v3M6 9l2 2-2 2M10 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Cleaning & Maintenance",
    description: "Residential deep cleaning, office sanitization, post-construction cleanup",
    badge: "Entry Friendly",
    badgeStyle: "bg-teal-100 text-teal-700",
    openRoles: 260,
    iconBg: "bg-teal-50 text-teal-600",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none">
        <path d="M5 16c2-4 4-7 8-9M13 7c0 2-1.5 3.5-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Delivery & Logistics",
    description: "Last-mile transport, material haulage, courier and cargo distribution",
    badge: "High Demand",
    badgeStyle: "bg-orange-100 text-orange-700",
    openRoles: 410,
    iconBg: "bg-orange-50 text-orange-600",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none">
        <rect x="1" y="6" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 9h3l2 3v2h-5V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="5" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
];

export function TopCategoriesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-325 px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Explore by Physical & Technical Trades
            </p>
            <h2 className="mt-1.5 text-[28px] font-black tracking-tight text-slate-950 sm:text-[34px]">
              Top Skilled Trade & Technical Categories
            </h2>
            <p className="mt-1.5 text-[14px] text-slate-500">
              Hire verified electricians, plumbers, carpenters, HVAC technicians and skilled labor across Ethiopia.
            </p>
          </div>
          <Link
            href="/find-workers"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Find all trade workers
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
              href={`/find-workers?category=${encodeURIComponent(cat.name)}`}
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
                  {cat.openRoles} available specialists
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                  Book Service
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
