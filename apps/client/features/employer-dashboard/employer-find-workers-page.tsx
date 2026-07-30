"use client";

import Link from "next/link";
import { useMemo, useState, type SVGProps } from "react";
import { BellIcon } from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";

const filterTabs = ["All Workers", "Nearby", "Top Rated", "Verified Only"];

const popularCategories = [
  "Developers",
  "Designing",
  "Marketing",
  "Construction",
  "Cleaners",
  "Electricians",
];

const professionals = [
  {
    name: "Robera Wakjira",
    role: "Graphics Designer",
    category: "Designing",
    location: "Addis Ababa, Mexico",
    rating: 4.9,
    reviews: 207,
    nearby: true,
    verified: true,
  },
  {
    name: "Usmael Taju",
    role: "Frontend Developer",
    category: "Developers",
    location: "Addis Ababa, Mexico",
    rating: 4.8,
    reviews: 184,
    nearby: true,
    verified: true,
  },
  {
    name: "Naol Meseret",
    role: "Marketing Specialist",
    category: "Marketing",
    location: "Addis Ababa, Mexico",
    rating: 4.9,
    reviews: 207,
    nearby: false,
    verified: true,
  },
  {
    name: "Bonsa Daba",
    role: "Construction Worker",
    category: "Construction",
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
    .slice(0, 2);

  return (
    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#15151d] text-white shadow-sm">
      <div
        className={`absolute inset-x-1 top-1 h-4 rounded-full ${
          index % 2 === 0 ? "bg-[#f0c89a]" : "bg-[#b7835e]"
        }`}
      />
      <div className="absolute inset-x-2 top-2 h-3 rounded-t-full bg-[#05050a]" />
      <div
        className={`absolute bottom-0 left-1/2 h-4 w-5 -translate-x-1/2 rounded-t-full ${
          index % 2 === 0 ? "bg-[#24384f]" : "bg-[#3a2f4e]"
        }`}
      />
      <span className="absolute inset-0 flex items-center justify-center pt-3 text-[8px] font-bold">
        {initials}
      </span>
    </div>
  );
}

function ProfessionalCard({
  professional,
  index,
}: {
  professional: (typeof professionals)[number];
  index: number;
}) {
  return (
    <article className="flex min-h-[70px] items-center justify-between rounded-[3px] border border-[#dfe7ea] bg-white px-3.5 py-3 shadow-[0_1px_1px_rgba(15,23,42,0.03)]">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={professional.name} index={index} />
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-[12px] font-bold leading-none text-[#151827]">
              {professional.name}
            </h3>
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

      <div className="ml-3 flex shrink-0 flex-col items-end gap-3">
        <div className="flex items-center gap-1 text-[9px] font-medium text-[#59606b]">
          <span className="text-[#00a86b]">
            <StarIcon />
          </span>
          {professional.rating.toFixed(1)} ({professional.reviews})
        </div>
        <Link
          href="/register/client"
          className="inline-flex h-5 min-w-[72px] items-center justify-center rounded-[2px] bg-[#00a99d] px-2 text-[8.5px] font-bold text-white transition hover:bg-[#008f85]"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}

export function EmployerFindWorkersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(filterTabs[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[69px] items-center justify-between border-b border-[#d9d9df] bg-white px-6 shadow-[0_2px_5px_rgba(15,23,42,0.18)] md:px-10">
            <Link
              href="/"
              aria-label="WorkBridge home"
              className="hidden h-full w-[82px] items-center justify-center text-[#172653] md:flex"
            >
              <span className="relative h-12 w-8">
                <span className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-current" />
                <span className="absolute bottom-2 left-1 h-1 w-7 rotate-[60deg] rounded-full bg-current" />
                <span className="absolute bottom-2 right-1 h-1 w-7 -rotate-[60deg] rounded-full bg-current" />
              </span>
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

          <div className="w-full max-w-[1110px] px-6 pb-6 pt-9 md:px-11">
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

              <div className="mt-3 flex flex-wrap gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`h-6 rounded-full px-4 text-[9px] font-bold transition ${
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

            <div className="mt-4 border-t border-[#e1e7ea] pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-[11px] font-bold text-[#151827]">
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
                    className={`h-5 min-w-[92px] rounded-[2px] px-3 text-[9px] font-bold transition ${
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
                href="/register/client"
                className="inline-flex h-7 items-center gap-1 rounded-full bg-[#00a65a] px-3.5 text-[10px] font-bold text-white shadow-sm transition hover:bg-[#008f4d]"
              >
                <span className="text-sm leading-none">+</span>
                Post a job
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
