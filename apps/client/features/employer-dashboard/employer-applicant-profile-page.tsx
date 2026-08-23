"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { EmployerSidebar } from "./components/employer-sidebar";

/** --- Icons --- */
const Icons = {
  Back: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  Mail: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Pin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3.5 h-3.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3.5 h-3.5"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Link: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3.5 h-3.5"
    >
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      className="w-4 h-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

/** --- Helper Components --- */
function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export function EmployerApplicantProfilePage() {
  const { applicantId } = useParams();
  const { user: _, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isAuthLoading || !applicantId || applicantId === "undefined") return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await api.applications.getApplication(
          applicantId as string,
        );
        setApplication(res?.data?.application || res?.data || res);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchDetails();
  }, [applicantId, isAuthenticated, isAuthLoading]);

  const handleStatusUpdate = async (status: string) => {
    try {
      setIsUpdating(true);
      await api.applications.updateStatus(applicantId as string, status);
      setApplication((prev: any) => ({ ...prev, status }));
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-500 border-t-transparent" />
      </div>
    );

  const snapshot = application?.applicantSnapshot;
  const resume = application?.attachments?.find(
    (a: any) => a.type === "RESUME",
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900">
      <EmployerSidebar />

      <section className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header breadcrumb */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">
                Job Applications
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Summary of hiring activities for this candidate.
              </p>
            </div>
            <Link
              href="/dashboard/employer/applications"
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors"
            >
              <Icons.Back /> Back to List
            </Link>
          </div>

          {/* MAIN PROFILE CARD */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-24 h-24 rounded-2xl border-4 border-teal-500 overflow-hidden shadow-lg shrink-0">
                  {snapshot?.avatar?.url ? (
                    <Image
                      src={snapshot.avatar.url}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
                      {snapshot?.firstName?.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {snapshot?.firstName} {snapshot?.lastName}
                  </h2>
                  <p className="text-lg font-semibold text-slate-600 mt-1">
                    {snapshot?.currentPosition}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {snapshot?.skills?.slice(0, 3).map((s: any) => (
                      <span
                        key={s.name}
                        className="px-3 py-1 rounded-lg bg-teal-50 text-teal-600 text-[11px] font-bold border border-teal-100 uppercase"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-3 italic">
                    Applied on{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS & STATUS */}
              <div className="flex flex-col gap-3 min-w-[160px]">
                <button
                  onClick={() => handleStatusUpdate("ACCEPTED")}
                  disabled={isUpdating || application.status === "ACCEPTED"}
                  className="h-11 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all disabled:opacity-50 shadow-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate("REJECTED")}
                  disabled={isUpdating || application.status === "REJECTED"}
                  className="h-11 rounded-xl border-2 border-slate-900 bg-white text-slate-900 font-bold hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* QUICK CONTACT METRICS */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                <div className="text-slate-300">
                  <Icons.Pin />
                </div>
                {snapshot?.location?.city || "City N/A"},{" "}
                {snapshot?.location?.country || "Ethiopia"}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                <div className="text-slate-300">
                  <Icons.Phone />
                </div>
                {snapshot?.phone || "No phone provided"}
              </div>
            </div>

            {/* BOTTOM BAR ACTION */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href={resume?.url || "#"}
                target="_blank"
                className="flex-1 h-12 rounded-xl bg-[#172653] text-white flex items-center justify-center font-bold text-sm hover:bg-[#1c2e63] transition-all"
              >
                View Resume (PDF)
              </Link>
              <div className="flex gap-4 shrink-0">
                <Link
                  href="/dashboard/messages"
                  className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-all"
                >
                  <Icons.Mail />
                </Link>
                <div className="relative group">
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusUpdate(e.target.value)}
                    className="h-12 px-6 pr-10 rounded-xl bg-slate-100 text-slate-900 font-bold text-sm appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="APPLIED">Applied</option>
                    <option value="REVIEWING">Reviewing</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="INTERVIEWED">Interviewed</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT DETAILS */}
          <div className="space-y-6">
            <ContentSection title="About">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {snapshot?.bio || "No biography provided."}
              </p>
            </ContentSection>

            <ContentSection title="Skills">
              <div className="flex flex-wrap gap-3">
                {snapshot?.skills?.map((s: any) => (
                  <span
                    key={s.name}
                    className="px-5 py-2 rounded-xl bg-teal-50/50 text-teal-700 text-sm font-bold border border-teal-100"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </ContentSection>

            <ContentSection title="Experiences">
              <div className="space-y-8">
                {snapshot?.experiences?.length > 0 ? (
                  snapshot.experiences.map((exp: any, i: number) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-slate-100 pb-2"
                    >
                      <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7.5px] top-1.5" />
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div>
                          <h4 className="text-lg font-bold text-teal-600">
                            {exp.position}
                          </h4>
                          <p className="font-bold text-slate-800 text-sm mt-1">
                            {exp.companyName}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {new Date(exp.startDate).toLocaleDateString()} —{" "}
                          {exp.isCurrent
                            ? "Present"
                            : new Date(exp.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">No experience added.</p>
                )}
              </div>
            </ContentSection>

            <ContentSection title="Social Links">
              <div className="grid gap-4 md:grid-cols-2">
                {snapshot?.socialLinks?.map((link: any) => (
                  <div key={link.platform} className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                      {link.platform}
                    </p>
                    <div className="flex items-center gap-3 h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs shadow-inner">
                      <Icons.Link />
                      <span className="truncate">{link.url}</span>
                    </div>
                  </div>
                ))}
                {/* Fallback phone display matching the link style */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Phone
                  </p>
                  <div className="flex items-center gap-3 h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs">
                    <Icons.Phone />
                    <span>{snapshot?.phone || "N/A"}</span>
                  </div>
                </div>
              </div>
            </ContentSection>
          </div>

          <div className="pt-8">
            <Link
              href="/dashboard/employer/applications"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
            >
              <Icons.Back /> Back to applications
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
