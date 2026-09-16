"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LandingHeader } from "../landing/components/landing-header";
import { LandingFooter } from "../landing/components/landing-footer";
import { BookWorkerModal } from "../bookings/components/book-worker-modal";

const filterTabs = ["All Workers", "Nearby", "Top Rated", "Verified Only", "Emergency Callout"];

const popularCategories = [
  "Electricians",
  "Plumbing",
  "Carpentry",
  "HVAC & Cooling",
  "Construction",
  "Painting",
  "Welding",
  "Developers",
  "Designing",
];

interface Professional {
  id: string;
  name: string;
  role: string;
  trade: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  currency: string;
  nearby: boolean;
  verified: boolean;
  isEmergencyAvailable?: boolean;
  avatar?: string;
}

const professionals: Professional[] = [
  {
    id: "u_trade_electrician",
    name: "Abebe Tadesse",
    role: "Certified Master Electrician & Solar PV Specialist",
    trade: "Electrician",
    category: "Electricians",
    location: "Addis Ababa, Bole",
    rating: 4.9,
    reviews: 218,
    hourlyRate: 350,
    currency: "ETB",
    nearby: true,
    verified: true,
    isEmergencyAvailable: true,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
  },
  {
    id: "u_trade_plumber",
    name: "Kebede Kassaye",
    role: "Master Sanitary Plumber & Pipe Leak Specialist",
    trade: "Plumber",
    category: "Plumbing",
    location: "Addis Ababa, CMC",
    rating: 5.0,
    reviews: 194,
    hourlyRate: 300,
    currency: "ETB",
    nearby: true,
    verified: true,
    isEmergencyAvailable: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "u_trade_carpenter",
    name: "Bonsa Daba",
    role: "Custom Woodworker & Kitchen Cabinet Maker",
    trade: "Carpenter",
    category: "Carpentry",
    location: "Addis Ababa, Mexico",
    rating: 4.8,
    reviews: 163,
    hourlyRate: 400,
    currency: "ETB",
    nearby: true,
    verified: true,
    isEmergencyAvailable: false,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150",
  },
  {
    id: "u_trade_hvac",
    name: "Dawit Haile",
    role: "HVAC, AC & Cold Storage Technician",
    trade: "HVAC & Cooling",
    category: "HVAC & Cooling",
    location: "Addis Ababa, Sarbet",
    rating: 4.9,
    reviews: 142,
    hourlyRate: 450,
    currency: "ETB",
    nearby: false,
    verified: true,
    isEmergencyAvailable: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
  },
  {
    id: "u_trade_painter",
    name: "Marta Kebede",
    role: "Wall Plastering & Finishing Painter",
    trade: "Painting & Finishing",
    category: "Painting",
    location: "Addis Ababa, Megenagna",
    rating: 4.7,
    reviews: 128,
    hourlyRate: 250,
    currency: "ETB",
    nearby: true,
    verified: true,
    isEmergencyAvailable: false,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "u_trade_welder",
    name: "Tolera Emiru",
    role: "Structural Welder & Metal Fabricator",
    trade: "Welder & Metalwork",
    category: "Welding",
    location: "Addis Ababa, Kality",
    rating: 4.9,
    reviews: 207,
    nearby: false,
    verified: true,
    hourlyRate: 350,
    currency: "ETB",
    isEmergencyAvailable: false,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
  },
  {
    id: "u1",
    name: "Alex Johnson",
    role: "Senior Full-Stack Developer",
    trade: "Software Engineer",
    category: "Developers",
    location: "Addis Ababa / Remote",
    rating: 4.9,
    reviews: 184,
    hourlyRate: 45,
    currency: "USD",
    nearby: true,
    verified: true,
  },
  {
    id: "u_seeker_2",
    name: "Bethany Clark",
    role: "Lead Product & UX/UI Designer",
    trade: "Product Designer",
    category: "Designing",
    location: "Addis Ababa / Remote",
    rating: 5.0,
    reviews: 156,
    hourlyRate: 55,
    currency: "USD",
    nearby: true,
    verified: true,
  },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
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

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.1" fill="none" stroke="currentColor" />
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

function StarIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16">
      <path
        d="m8 1.8 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.2l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 12 12">
      <path
        d="M6 10.5S2.8 7.8 2.8 5.1A3.2 3.2 0 0 1 6 1.9a3.2 3.2 0 0 1 3.2 3.2c0 2.7-3.2 5.4-3.2 5.4Z"
        fill="currentColor"
      />
      <circle cx="6" cy="5.1" r="1.1" fill="white" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 16 16">
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

export function FindWorkersPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Workers");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<Professional | null>(null);

  const filteredProfessionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return professionals.filter((professional) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        professional.name.toLowerCase().includes(normalizedQuery) ||
        professional.role.toLowerCase().includes(normalizedQuery) ||
        professional.trade.toLowerCase().includes(normalizedQuery) ||
        professional.category.toLowerCase().includes(normalizedQuery) ||
        professional.location.toLowerCase().includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "All Workers" ||
        (activeFilter === "Nearby" && professional.nearby) ||
        (activeFilter === "Top Rated" && professional.rating >= 4.8) ||
        (activeFilter === "Verified Only" && professional.verified) ||
        (activeFilter === "Emergency Callout" && professional.isEmergencyAvailable);

      const matchesCategory =
        activeCategory === null || professional.category === activeCategory;

      return matchesQuery && matchesFilter && matchesCategory;
    });
  }, [activeCategory, activeFilter, query]);

  return (
    <main className="min-h-screen bg-[#f7f8fd] text-[#111827]">
      <LandingHeader />

      <section className="min-h-190 w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#050816]">
                Find Trusted Electricians, Plumbers & Skilled Trade Workers
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Book verified trade professionals directly for on-site repair, installation, and construction jobs.
              </p>
            </div>
            <Link
              href="/register/client"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#00a65a] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#008f4d]"
            >
              + Post a Job
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-[#9fc7d3] bg-white p-6 shadow-sm">
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#151827]">
              Our platform connects homeowners, property managers, and businesses with skilled trade workers quickly and safely. Compare licenses, check customer ratings and reviews, and directly book electricians, plumbers, carpenters, HVAC technicians, and general labor with escrow payment protection.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 pt-4 border-t border-slate-100">
              {[
                "Direct Instant Booking",
                "Verified Trade Licenses",
                "Fast Emergency Callouts",
                "Escrow Protected Payments",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="text-[#00a99d]">
                    <CheckIcon />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8">
            <h2 className="text-base font-bold text-[#050816]">
              Search For Physical & Technical Specialists
            </h2>

            <label className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-[#b9d8df] bg-white px-4 text-[#98a0aa] shadow-sm">
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search electrician, plumber, carpenter, HVAC, wiring leak repair..."
                className="h-full w-full bg-transparent text-sm font-medium text-[#151827] outline-none placeholder:text-[#98a0aa]"
              />
            </label>

            <div className="mt-3 flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`h-8 rounded-full px-4 text-xs font-bold transition ${
                    activeFilter === tab
                      ? "bg-[#00a99d] text-white shadow-sm"
                      : "bg-white text-[#717882] border border-slate-200 hover:bg-[#d7dcdf]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Popular trade tags */}
          <div className="mt-4 border-t border-[#e1e7ea] pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#151827] mr-1">
                Popular Trades:
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
                  className={`h-7 rounded-xl px-3.5 text-xs font-bold transition ${
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

          {/* Worker Cards Grid */}
          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-lg font-black text-[#050816]">
              Available Trade Professionals ({filteredProfessionals.length})
            </h2>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filteredProfessionals.length > 0 ? (
              filteredProfessionals.map((worker) => (
                <article
                  key={worker.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#dfe7ea] bg-white p-5 shadow-sm hover:border-[#00a99d] hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          {worker.avatar ? (
                            <img src={worker.avatar} alt={worker.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-bold text-slate-700 text-lg">
                              {worker.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-black text-[#151827]">
                              {worker.name}
                            </h3>
                            {worker.verified && <VerifiedIcon />}
                          </div>
                          <p className="text-xs font-bold text-[#00a99d]">{worker.role}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 font-medium">
                            <LocationIcon />
                            {worker.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-slate-900">
                          {worker.hourlyRate} {worker.currency}/hr
                        </span>
                        <div className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-700">
                          <span className="text-amber-500">
                            <StarIcon />
                          </span>
                          {worker.rating.toFixed(1)} ({worker.reviews})
                        </div>
                      </div>
                    </div>

                    {worker.isEmergencyAvailable && (
                      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 border border-rose-100">
                        🚨 Emergency Callouts Available
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedWorkerForBooking(worker)}
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      Book Service
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-[#b9d8df] bg-white p-12 text-center">
                <h3 className="text-base font-bold text-[#050816]">
                  No trade professionals found
                </h3>
                <p className="mt-1 text-xs font-medium text-[#717882]">
                  Try another trade keyword, location, or reset category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedWorkerForBooking && (
        <BookWorkerModal
          isOpen={true}
          onClose={() => setSelectedWorkerForBooking(null)}
          worker={{
            id: selectedWorkerForBooking.id,
            name: selectedWorkerForBooking.name,
            avatar: selectedWorkerForBooking.avatar,
            trade: selectedWorkerForBooking.trade,
            hourlyRate: selectedWorkerForBooking.hourlyRate,
            currency: selectedWorkerForBooking.currency,
            location: selectedWorkerForBooking.location,
            isEmergencyAvailable: selectedWorkerForBooking.isEmergencyAvailable,
          }}
          onBookingSuccess={() => {
            alert(`Booking request successfully sent to ${selectedWorkerForBooking.name}! Check your dashboard notifications for updates.`);
          }}
        />
      )}
      <LandingFooter />
    </main>
  );
}
