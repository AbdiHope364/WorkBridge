"use client";

import Link from "next/link";
import { useMemo, useState, type SVGProps } from "react";
import { BellIcon } from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import { WorkBridgeLogo } from "@repo/ui";

const filterTabs = ["All Workers", "Nearby", "Top Rated", "Verified Only"];

const popularCategories = [
  "Electricians",
  "Plumbing",
  "Carpentry",
  "Painters",
  "Appliance Repair",
  "Cleaners",
];

const professionals = [
  {
    name: "Abebe Tadesse",
    role: "Certified Master Electrician & Solar PV Specialist",
    category: "Electricians",
    location: "Addis Ababa, Bole",
    rating: 5.0,
    reviews: 215,
    nearby: true,
    verified: true,
  },
  {
    name: "Kebede Kassaye",
    role: "Sanitary Plumber & Pipe Leak Specialist",
    category: "Plumbing",
    location: "Addis Ababa, CMC",
    rating: 4.8,
    reviews: 184,
    nearby: true,
    verified: true,
  },
  {
    name: "Alemu Tefera",
    role: "Master Painter & Interior Decorator",
    category: "Painters",
    location: "Addis Ababa, Sarbet",
    rating: 4.9,
    reviews: 207,
    nearby: false,
    verified: true,
  },
  {
    name: "Bonsa Daba",
    role: "Custom Woodworker & Kitchen Cabinet Specialist",
    category: "Carpentry",
    location: "Addis Ababa, Mexico",
    rating: 4.7,
    reviews: 163,
    nearby: true,
    verified: true,
  },
  {
    name: "Tolera Emiru",
    role: "Electrician",
    category: "Electricians",
    location: "Addis Ababa, Mexico",
    rating: 4.9,
    reviews: 207,
    nearby: false,
    verified: true,
  },
  {
    name: "Marta Kebede",
    role: "Cleaner",
    category: "Cleaners",
    location: "Addis Ababa, Mexico",
    rating: 4.6,
    reviews: 142,
    nearby: true,
    verified: false,
  },
];

type IconProps = SVGProps<SVGSVGElement>;

function SearchIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="m14.2 14.2 3.1 3.1M8.7 15.1a6.4 6.4 0 1 1 0-12.8 6.4 6.4 0 0 1 0 12.8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <circle cx="8" cy="8" r="6.1" stroke="currentColor" />
      <path
        d="m5.3 8.2 1.8 1.8 3.8-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d="m8 1.8 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.2l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.8Z" />
    </svg>
  );
}

function LocationIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-2.5 w-2.5"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M6 10.5S2.8 7.8 2.8 5.1A3.2 3.2 0 0 1 6 1.9a3.2 3.2 0 0 1 3.2 3.2c0 2.7-3.2 5.4-3.2 5.4Z"
        fill="currentColor"
      />
      <circle cx="6" cy="5.1" r="1.1" fill="white" />
    </svg>
  );
}

function VerifiedIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <circle cx="8" cy="8" r="6.5" fill="#00a99d" />
      <path
        d="m5.2 8.2 1.7 1.7 3.9-4"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bgStyles = [
    "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white",
    "bg-gradient-to-tr from-blue-600 to-cyan-500 text-white",
    "bg-gradient-to-tr from-amber-600 to-orange-500 text-white",
    "bg-gradient-to-tr from-violet-600 to-indigo-500 text-white",
  ];
  const bg = bgStyles[index % bgStyles.length];

  return (
    <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full font-black text-xs shadow-xs border border-white/20 ${bg}`}>
      <span>{initials}</span>
    </div>
  );
}

import { BookWorkerModal } from "../bookings/components/book-worker-modal";
import { WorkerProfileModal } from "../bookings/components/worker-profile-modal";

function ProfessionalCard({
  professional,
  index,
  onBook,
  onViewProfile,
}: {
  professional: (typeof professionals)[number];
  index: number;
  onBook: (p: (typeof professionals)[number]) => void;
  onViewProfile: (p: (typeof professionals)[number]) => void;
}) {
  return (
    <article className="flex min-h-[70px] items-center justify-between rounded-[3px] border border-[#dfe7ea] bg-white px-3.5 py-3 shadow-[0_1px_1px_rgba(15,23,42,0.03)]">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => onViewProfile(professional)}
          className="relative shrink-0 text-left cursor-pointer hover:opacity-80 transition"
          title="Click to view worker user profile"
        >
          <Avatar name={professional.name} index={index} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onViewProfile(professional)}
              className="truncate text-[12px] font-bold leading-none text-[#151827] hover:text-[#00a99d] transition cursor-pointer text-left"
            >
              {professional.name}
            </button>
            {professional.verified ? <VerifiedIcon /> : null}
          </div>
          <p className="mt-1 text-[10px] leading-none text-[#59606b]">
            {professional.role}
          </p>
          <p className="mt-2 flex items-center gap-1 text-[8.5px] leading-none text-[#00a99d]">
            <LocationIcon />
            {professional.location}
          </p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 flex-col items-end gap-2.5">
        <div className="flex items-center gap-1 text-[9px] font-medium text-[#59606b]">
          <span className="text-[#00a86b]">
            <StarIcon />
          </span>
          {professional.rating.toFixed(1)} ({professional.reviews})
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewProfile(professional)}
            className="inline-flex h-6 min-w-[70px] items-center justify-center rounded-[3px] border border-[#cbd5e1] bg-white px-2 text-[9px] font-bold text-[#334155] transition hover:bg-slate-100 active:scale-95 cursor-pointer shadow-xs"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => onBook(professional)}
            className="inline-flex h-6 min-w-[80px] items-center justify-center rounded-[3px] bg-[#00a99d] px-2.5 text-[9px] font-bold text-white transition hover:bg-[#008f85] active:scale-95 cursor-pointer shadow-xs"
          >
            Book Worker
          </button>
        </div>
      </div>
    </article>
  );
}

export function EmployerFindWorkersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(filterTabs[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<(typeof professionals)[number] | null>(null);
  const [selectedProfileWorker, setSelectedProfileWorker] = useState<(typeof professionals)[number] | null>(null);

  const filteredProfessionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return professionals.filter((professional) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        professional.name.toLowerCase().includes(normalizedQuery) ||
        professional.role.toLowerCase().includes(normalizedQuery) ||
        professional.category.toLowerCase().includes(normalizedQuery) ||
        professional.location.toLowerCase().includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "All Workers" ||
        (activeFilter === "Nearby" && professional.nearby) ||
        (activeFilter === "Top Rated" && professional.rating >= 4.8) ||
        (activeFilter === "Verified Only" && professional.verified);

      const matchesCategory =
        activeCategory === null || professional.category === activeCategory;

      return matchesQuery && matchesFilter && matchesCategory;
    });
  }, [activeCategory, activeFilter, query]);

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-[#111827]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col pt-16 pb-20 md:pt-0 md:pb-0 overflow-y-auto">
          <header className="hidden md:flex h-[69px] items-center justify-between border-b border-[#d9d9df] bg-white px-6 shadow-[0_2px_5px_rgba(15,23,42,0.18)] md:px-10">
            <Link
              href="/dashboard/employer"
              aria-label="WorkBridge home"
              className="hidden h-full items-center text-[#172653] md:flex"
            >
              <WorkBridgeLogo className="h-8 w-auto max-w-[170px]" />
            </Link>

            <div className="ml-auto flex items-center gap-8">
              <Link
                href="/dashboard/employer/notifications"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5 text-black" />
              </Link>
              <Link href="/dashboard/employer/profile" aria-label="Profile">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#273158] bg-[#111827] text-[10px] font-semibold text-[#f4b28a] shadow-inner">
                  EM
                </span>
              </Link>
            </div>
          </header>

          <div className="w-full max-w-[1110px] px-4 sm:px-6 pb-6 pt-6 sm:pt-9 md:px-11">
            <div>
              <h1 className="text-[28px] font-medium uppercase leading-none tracking-normal">
                Find Trusted Workers For Any Job
              </h1>
              <p className="mt-1 text-lg font-normal leading-tight text-[#4b5563]">
                Search the best matched workers for your business needs, compare
                profiles, and connect with skilled professionals fast.
              </p>
            </div>

            <div className="mt-6 rounded-[3px] border border-[#d9e3ec] bg-white px-5 py-5 shadow-[0_2px_5px_rgba(15,23,42,0.05)]">
              <p className="max-w-[860px] text-[12px] font-medium leading-[1.9] text-[#151827]">
                Our platform helps individuals, businesses, and organizations
                connect with skilled workers quickly and safely. Browse worker
                profiles, compare experience, check ratings and reviews, and
                hire professionals that match your needs. Whether you are
                looking for developers, electricians, designers, cleaners,
                drivers, or other skilled workers, we make the hiring process
                simple, transparent, and reliable.
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Local and remote workers are available",
                  "There is real reviews and ratings available",
                  "Fast and secure communication",
                  "You get verified workers",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] font-semibold text-[#151827]"
                  >
                    <span className="text-[#00a99d]">
                      <CheckIcon />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-[15px] font-bold text-[#050816]">
                Search For Top Talent
              </h2>

              <label className="mt-2 flex h-10 items-center gap-2 rounded-[3px] border border-[#b9d8df] bg-white px-4 text-[#98a0aa]">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for UI designer, frontend developer..."
                  className="h-full w-full bg-transparent text-[11px] font-medium text-[#151827] outline-none placeholder:text-[#98a0aa]"
                />
              </label>

              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`shrink-0 h-6.5 rounded-full px-3 sm:px-4 text-[9.5px] font-bold transition ${
                      activeFilter === tab
                        ? "bg-[#00a99d] text-white"
                        : "bg-[#e4e7e9] text-[#717882] hover:bg-[#d7dcdf]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-[#e1e7ea] pt-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span className="shrink-0 text-[11px] font-bold text-[#151827]">
                  Popular:
                </span>
                {popularCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory((currentCategory) =>
                        currentCategory === category ? null : category,
                      )
                    }
                    className={`shrink-0 h-6 rounded-[2px] px-3 text-[9.5px] font-bold transition ${
                      activeCategory === category
                        ? "bg-[#00a99d] text-white"
                        : "bg-[#dcfbff] text-[#008c9a] hover:bg-[#c7f6fb]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#050816]">
                Top Professionals
              </h2>
              <Link
                href="/dashboard/employer/find-workers"
                className="text-[9px] font-extrabold text-[#00a99d] hover:text-[#008f85]"
              >
                View All
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {filteredProfessionals.length > 0 ? (
                filteredProfessionals.map((professional, index) => (
                  <ProfessionalCard
                    key={professional.name}
                    professional={professional}
                    index={index}
                    onBook={(p) => setSelectedWorker(p)}
                    onViewProfile={(p) => setSelectedProfileWorker(p)}
                  />
                ))
              ) : (
                <div className="rounded-[3px] border border-dashed border-[#b9d8df] bg-white px-4 py-8 text-center">
                  <h3 className="text-[13px] font-bold text-[#050816]">
                    No professionals found
                  </h3>
                  <p className="mt-1 text-[10px] font-medium text-[#717882]">
                    Try another search term, worker type, or category.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-end border-t border-[#e1e7ea] pt-3">
              <Link
                href="/dashboard/employer/create"
                className="inline-flex h-7 items-center gap-1 rounded-full bg-[#00a65a] px-3.5 text-[10px] font-bold text-white shadow-sm transition hover:bg-[#008f4d]"
              >
                <span className="text-sm leading-none">+</span>
                Post a Job
              </Link>
            </div>
          </div>
        </section>
      </div>

      {selectedProfileWorker && (
        <WorkerProfileModal
          isOpen={!!selectedProfileWorker}
          onClose={() => setSelectedProfileWorker(null)}
          worker={{
            id: `w_${selectedProfileWorker.name.toLowerCase().replace(/\s+/g, "_")}`,
            name: selectedProfileWorker.name,
            trade: selectedProfileWorker.category,
            role: selectedProfileWorker.role,
            hourlyRate: 350,
            currency: "ETB",
            location: selectedProfileWorker.location,
            rating: selectedProfileWorker.rating,
            reviews: selectedProfileWorker.reviews,
            verified: selectedProfileWorker.verified,
            isEmergencyAvailable: selectedProfileWorker.verified,
          }}
          onBookNow={() => {
            const p = selectedProfileWorker;
            setSelectedProfileWorker(null);
            setSelectedWorker(p);
          }}
        />
      )}

      {selectedWorker && (
        <BookWorkerModal
          isOpen={!!selectedWorker}
          onClose={() => setSelectedWorker(null)}
          worker={{
            id: `w_${selectedWorker.name.toLowerCase().replace(/\s+/g, "_")}`,
            name: selectedWorker.name,
            trade: selectedWorker.category,
            hourlyRate: 350,
            currency: "ETB",
            location: selectedWorker.location,
            rating: selectedWorker.rating,
            reviews: selectedWorker.reviews,
            verified: selectedWorker.verified,
            isEmergencyAvailable: selectedWorker.verified,
          }}
          onBookingSuccess={() => {
            setSelectedWorker(null);
          }}
        />
      )}
    </main>
  );
}
