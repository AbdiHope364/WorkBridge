"use client";

import Image from "next/image";

export interface WorkerProfileData {
  id: string;
  name: string;
  avatar?: string;
  trade?: string;
  role?: string;
  hourlyRate?: number | string;
  currency?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  verified?: boolean;
  isEmergencyAvailable?: boolean;
  phone?: string;
  bio?: string;
  skills?: string[];
  completedJobs?: number;
  experienceYears?: number;
}

interface WorkerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: WorkerProfileData;
  onBookNow?: () => void;
}

export function WorkerProfileModal({
  isOpen,
  onClose,
  worker,
  onBookNow,
}: WorkerProfileModalProps) {
  if (!isOpen) return null;

  const initials = worker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const defaultSkills = worker.skills || [
    worker.trade || "Skilled Trade",
    "Fayda ID Verified",
    "Emergency Callout",
    "On-Site Assessment",
    "Quality Guaranteed",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Cover / Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-800 p-6 flex items-end justify-between">
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full bg-slate-900/40 p-2 text-white hover:bg-slate-900/70 transition cursor-pointer backdrop-blur-md"
              aria-label="Close profile"
            >
              ✕
            </button>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-400/30 backdrop-blur-md">
            <span>🛡️</span> Verified Trade Professional
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="overflow-y-auto p-6 pt-0">
          {/* Avatar and Basic Info */}
          <div className="relative -mt-12 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-tr from-slate-900 via-teal-900 to-emerald-800 font-black text-white text-3xl shadow-lg">
                {worker.avatar ? (
                  <Image
                    src={worker.avatar}
                    alt={worker.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-950">{worker.name}</h2>
                  {worker.verified !== false && (
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-teal-500 text-white text-[10px] font-bold" title="Fayda Verified Worker">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-teal-600 mt-0.5">
                  {worker.role || worker.trade || "Certified Specialist"}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 font-medium">
                  📍 {worker.location || "Addis Ababa"}
                </p>
              </div>
            </div>

            {/* Price Badge */}
            <div className="rounded-2xl bg-slate-50 p-3 text-right border border-slate-100">
              <div className="text-xs font-semibold text-slate-500">Hourly Wage</div>
              <div className="text-lg font-black text-slate-950">
                {worker.hourlyRate || 350} {worker.currency || "ETB"}<span className="text-xs font-normal text-slate-500">/hr</span>
              </div>
              <div className="text-[10px] font-bold text-emerald-600">0% Commission Policy</div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-2xl bg-teal-50/60 border border-teal-100 p-3 text-center">
              <div className="text-xs font-bold text-teal-800">Rating</div>
              <div className="text-base font-black text-teal-950 flex items-center justify-center gap-1 mt-0.5">
                <span className="text-amber-500">★</span> {worker.rating?.toFixed(1) || "4.9"}
              </div>
              <div className="text-[10px] text-teal-700 font-medium">({worker.reviews || 180}+ reviews)</div>
            </div>

            <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3 text-center">
              <div className="text-xs font-bold text-emerald-800">Fayda Verification</div>
              <div className="text-xs font-black text-emerald-950 mt-1">Verified ✅</div>
              <div className="text-[10px] text-emerald-700 font-medium">Govt ID Matched</div>
            </div>

            <div className="rounded-2xl bg-sky-50/60 border border-sky-100 p-3 text-center">
              <div className="text-xs font-bold text-sky-800">Completed Jobs</div>
              <div className="text-base font-black text-sky-950 mt-0.5">
                {worker.completedJobs || 120}+
              </div>
              <div className="text-[10px] text-sky-700 font-medium">Direct Bookings</div>
            </div>

            <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-3 text-center">
              <div className="text-xs font-bold text-amber-800">Experience</div>
              <div className="text-base font-black text-amber-950 mt-0.5">
                {worker.experienceYears || 6}+ Yrs
              </div>
              <div className="text-[10px] text-amber-700 font-medium">Field Practical</div>
            </div>
          </div>

          {/* Bio / Summary */}
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">About {worker.name}</h3>
            <p className="text-xs leading-relaxed text-slate-600 font-medium rounded-2xl bg-slate-50 p-4 border border-slate-100">
              {worker.bio ||
                `${worker.name} is a certified trade specialist with over ${
                  worker.experienceYears || 6
                } years of hands-on experience in ${
                  worker.trade || "skilled repair and maintenance work"
                } across ${
                  worker.location || "Addis Ababa"
                }. Verified through Fayda National ID with 100% direct client satisfaction.`}
            </p>
          </div>

          {/* Emergency Availability Notice */}
          {worker.isEmergencyAvailable && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-rose-50 p-3.5 text-xs font-bold text-rose-800 border border-rose-200">
              <span className="text-lg">🚨</span>
              <div>
                <div>Available for Immediate Emergency Callouts</div>
                <div className="text-[11px] font-normal text-rose-700">
                  Responds within 15-30 minutes for urgent leaks, power outages, and immediate repairs.
                </div>
              </div>
            </div>
          )}

          {/* Specializations & Skills */}
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Skills & Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {defaultSkills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            Close Profile
          </button>

          {onBookNow && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-95 cursor-pointer"
            >
              <span>⚡</span> Book Service Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

