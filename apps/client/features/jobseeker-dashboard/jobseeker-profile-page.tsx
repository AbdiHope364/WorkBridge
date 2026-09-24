"use client";

import {
  getProfileInitials,
  ProfileTopHeader,
} from "./components/profile-settings-layout";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import {
  EditBasicProfileModal,
  EditProfileImageModal,
  EditEducationModal,
  EditExperienceModal,
  EditResumesAndSocialsModal,
  EditFaydaKycModal,
  ChangeEmailModal,
  ChangePasswordModal,
} from "./modals";
import { api } from "../../lib/api";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useProfile } from "@/contexts/profile-context";
import { env } from "../../lib/env";
import { Spinner } from "@repo/ui";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

function EditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V5h6v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="m7 12 3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyCircleIcon() {
  return (
    <span
      className="h-4 w-4 rounded-full border-2 border-slate-900"
      aria-hidden="true"
    />
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 4h3l1.5 4-2 1.2A12 12 0 0 0 15 14.7l1.2-2.1 3.8 1.7V17a3 3 0 0 1-3.5 3A15 15 0 0 1 4 7.5 3 3 0 0 1 7 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 4v3M17 4v3M5 9h14M6.5 6h11A1.5 1.5 0 0 1 19 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5v-11A1.5 1.5 0 0 1 6.5 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileShellCard({
  title,
  action,
  onAction,
  children,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        {action ? (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            + {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function IconButton({
  label,
  tone = "edit",
  onClick,
}: {
  label: string;
  tone?: "edit" | "delete";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={
        `grid h-6 w-6 place-items-center rounded text-xs transition ` +
        (tone === "delete"
          ? "text-rose-500 hover:bg-rose-50"
          : "text-emerald-600 hover:bg-emerald-50")
      }
    >
      {tone === "delete" ? <TrashIcon /> : <EditIcon />}
    </button>
  );
}

export function JobseekerProfilePage() {
  const { isLoading, isAuthenticated, user, refreshUser } = useAuth();
  const {
    jobseekerProfile,
    refreshProfile,
  } = useProfile();

  const [modals, setModals] = useState({
    basicProfile: false,
    profileImage: false,
    education: false,
    experience: false,
    resumesSocials: false,
    faydaKyc: false,
    changeEmail: false,
    changePassword: false,
  });

  const [editingEdu, setEditingEdu] = useState<{ index?: number; data?: any }>({});
  const [editingExp, setEditingExp] = useState<{ index?: number; data?: any }>({});

  const fullName =
    `${jobseekerProfile?.firstName || ""} ${jobseekerProfile?.lastName || ""}`.trim() ||
    user?.fullName ||
    "Worker";

  const checklistItems = useMemo(() => {
    const hasBasic = Boolean(fullName && fullName !== "Worker");
    const hasKyc = Boolean(user?.faydaFin || jobseekerProfile?.faydaFin);
    const hasSkills = Boolean(jobseekerProfile?.skills && jobseekerProfile.skills.length > 0);
    const hasExp = Boolean(jobseekerProfile?.experiences && jobseekerProfile.experiences.length > 0);
    const hasEdu = Boolean(jobseekerProfile?.educations && jobseekerProfile.educations.length > 0);
    const hasResume = Boolean(
      jobseekerProfile?.socialLinks &&
        jobseekerProfile.socialLinks.some((l: { platform: string; url: string }) => l.platform === "resume" && l.url)
    );

    return [
      { id: "basic-info", label: "Basic Info", isComplete: hasBasic },
      { id: "fayda-kyc", label: "Fayda National ID (KYC)", isComplete: hasKyc },
      { id: "skills", label: "Skills", isComplete: hasSkills },
      { id: "experience", label: "Experience", isComplete: hasExp },
      { id: "education", label: "Education", isComplete: hasEdu },
      { id: "resume", label: "Resumes", isComplete: hasResume },
    ];
  }, [fullName, user, jobseekerProfile]);

  const completionPercent = useMemo(() => {
    const completedCount = checklistItems.filter((i) => i.isComplete).length;
    return Math.round((completedCount / checklistItems.length) * 100);
  }, [checklistItems]);

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleSave = async (
    modalName: keyof typeof modals,
    data: any,
  ) => {
    try {
      if (modalName === "basicProfile") {
        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName || ""} ${data.lastName || ""}`.trim() || undefined,
          phone: data.phone || data.phoneNumber,
          bio: data.bio,
          currentPosition: data.currentPosition,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          location: {
            city: data.cityLocation || data.location || (typeof jobseekerProfile?.location === "object" ? jobseekerProfile?.location?.city : jobseekerProfile?.location) || "",
            addressLine1: data.addressLine1 || "",
            addressLine2: data.addressLine2 || "",
          },
          skills: data.skills,
        };
        await api.profiles.jobseeker.updateMyProfile(payload);
      } else if (modalName === "faydaKyc") {
        const payload = {
          faydaFin: data.faydaFin,
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          frontDocName: data.frontDocName,
          backDocName: data.backDocName,
          faydaStatus: "PENDING" as const,
        };
        await api.profiles.jobseeker.updateMyProfile(payload);
      } else if (modalName === "education") {
        const currentEdus = Array.isArray(jobseekerProfile?.educations)
          ? [...jobseekerProfile.educations]
          : [];
        if (typeof editingEdu.index === "number" && editingEdu.index >= 0) {
          currentEdus[editingEdu.index] = {
            ...currentEdus[editingEdu.index],
            ...data,
          };
        } else {
          currentEdus.push({
            _id: `edu_${Date.now()}`,
            schoolName: data.schoolName || "",
            degree: data.degree || "",
            fieldOfStudy: data.fieldOfStudy || "",
            startDate: data.startDate || "",
            endDate: data.endDate || null,
            description: data.description || "",
          });
        }
        await api.profiles.jobseeker.updateMyProfile({ educations: currentEdus });
      } else if (modalName === "experience") {
        const currentExps = Array.isArray(jobseekerProfile?.experiences)
          ? [...jobseekerProfile.experiences]
          : [];
        if (typeof editingExp.index === "number" && editingExp.index >= 0) {
          currentExps[editingExp.index] = {
            ...currentExps[editingExp.index],
            ...data,
            description: data.jobDescription || data.description || "",
          };
        } else {
          currentExps.push({
            _id: `exp_${Date.now()}`,
            companyName: data.companyName || "",
            position: data.position || "",
            startDate: data.startDate || "",
            endDate: data.endDate || null,
            isCurrent: Boolean(data.isCurrent),
            description: data.jobDescription || data.description || "",
          });
        }
        await api.profiles.jobseeker.updateMyProfile({ experiences: currentExps });
      } else if (modalName === "resumesSocials") {
        const socialLinks: { platform: string; url: string }[] = [];
        if (data.linkedin) socialLinks.push({ platform: "LinkedIn", url: data.linkedin });
        if (data.github) socialLinks.push({ platform: "GitHub", url: data.github });
        if (data.portfolio) socialLinks.push({ platform: "Portfolio", url: data.portfolio });
        if (data.resumeFile) {
          const fileName = typeof data.resumeFile === "string" ? data.resumeFile : data.resumeFile.name;
          socialLinks.push({ platform: "resume", url: fileName });
        }
        await api.profiles.jobseeker.updateMyProfile({ socialLinks });
      }

      await refreshProfile();
      if (refreshUser) await refreshUser();
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      closeModal(modalName);
      setEditingEdu({});
      setEditingExp({});
    }
  };

  const handleDeleteEducation = async (index: number) => {
    try {
      const currentEdus = Array.isArray(jobseekerProfile?.educations)
        ? [...jobseekerProfile.educations]
        : [];
      currentEdus.splice(index, 1);
      await api.profiles.jobseeker.updateMyProfile({ educations: currentEdus });
      await refreshProfile();
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  const handleDeleteExperience = async (index: number) => {
    try {
      const currentExps = Array.isArray(jobseekerProfile?.experiences)
        ? [...jobseekerProfile.experiences]
        : [];
      currentExps.splice(index, 1);
      await api.profiles.jobseeker.updateMyProfile({ experiences: currentExps });
      await refreshProfile();
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const handleDeleteSocialLink = async (platform: string) => {
    try {
      const currentLinks = Array.isArray(jobseekerProfile?.socialLinks)
        ? [...jobseekerProfile.socialLinks]
        : [];
      const updated = currentLinks.filter((l) => l.platform !== platform);
      await api.profiles.jobseeker.updateMyProfile({ socialLinks: updated });
      await refreshProfile();
    } catch (error) {
      console.error("Failed to delete social link:", error);
    }
  };

  const handleDeleteBio = async () => {
    try {
      await api.profiles.jobseeker.updateMyProfile({ bio: "" });
      await refreshProfile();
    } catch (error) {
      console.error("Failed to delete bio:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50">
        <Spinner className="h-16 w-16 text-emerald-600" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const initials = getProfileInitials(
    jobseekerProfile?.firstName ?? user?.fullName,
  );

  if (user?.role !== "jobseeker") {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Access denied. This page is only available to jobseekers and skilled workers.
        </div>
      </main>
    );
  }


  const avatarUrl =
    jobseekerProfile?.avatar?.url ||
    (jobseekerProfile?.avatar?.publicId && env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      ? `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${jobseekerProfile.avatar.publicId}`
      : null) ||
    user?.avatarUrl ||
    null;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0">
          <ProfileTopHeader
            initials={initials}
            url={avatarUrl || undefined}
          />

          <div className="w-full grid gap-6 px-4 py-6 sm:px-6 sm:py-9 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-950">
                  <span>Profile Completion</span>
                  <span className="text-emerald-600">
                    {completionPercent}% Complete
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-neutral-600">
                  Complete your profile and link Fayda ID to get the best job and trade booking opportunities.
                </p>
              </section>

              <nav className="space-y-3">
                {checklistItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "basic-info") openModal("basicProfile");
                      else if (item.id === "fayda-kyc") openModal("faydaKyc");
                      else if (item.id === "skills") openModal("basicProfile");
                      else if (item.id === "experience") openModal("experience");
                      else if (item.id === "education") openModal("education");
                      else if (item.id === "resume") openModal("resumesSocials");
                    }}
                    className={
                      `flex h-11 w-full items-center gap-3 rounded-md border px-4 text-left text-sm font-semibold transition cursor-pointer ` +
                      (item.isComplete
                        ? "border-emerald-100 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-slate-200 bg-white text-slate-950 hover:border-emerald-200")
                    }
                  >
                    {item.isComplete ? (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                        <CheckIcon />
                      </span>
                    ) : (
                      <EmptyCircleIcon />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            <section className="grid gap-6 xl:grid-cols-2">
              {/* Profile Card */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                  <button
                    type="button"
                    onClick={() => openModal("profileImage")}
                    className="relative group shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl self-start"
                    title="Click to change profile photo"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Profile Avatar"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-slate-950 text-amber-200 font-black text-2xl sm:text-3xl flex items-center justify-center">
                          {initials || "W"}
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-600 group-hover:bg-emerald-500 text-white rounded-xl shadow-md border-2 border-white transition transform group-hover:scale-110 flex items-center justify-center cursor-pointer">
                      <EditIcon className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  <div className="min-w-0 flex-1 w-full">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-xl font-bold leading-tight text-slate-950">
                            {fullName || user?.fullName || "Worker"}
                          </h2>
                          {jobseekerProfile?.faydaStatus === "VERIFIED" || (user as any)?.verified ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Fayda Verified (FIN: {jobseekerProfile?.faydaFin || user?.faydaFin})
                            </span>
                          ) : jobseekerProfile?.faydaStatus === "PENDING" || (user as any)?.faydaStatus === "PENDING" || (jobseekerProfile?.faydaFin && !(user as any)?.verified) ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
                              <Clock className="w-3 h-3 text-amber-600" />
                              Fayda Pending Review (FIN: {jobseekerProfile?.faydaFin || user?.faydaFin})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 shadow-xs">
                              Fayda Unverified
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-teal-600 mt-0.5">
                          {jobseekerProfile?.bio || jobseekerProfile?.currentPosition || "Skilled Trade Professional"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openModal("basicProfile")}
                        aria-label="Edit profile"
                        className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 transition hover:bg-emerald-50 cursor-pointer shrink-0"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs text-neutral-600 grid-cols-1 sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <CalendarIcon />
                        {jobseekerProfile?.gender ? `${jobseekerProfile.gender.toUpperCase()}` : "Gender not set"}
                      </span>
                      <span className="flex items-center gap-2">
                        <CalendarIcon />
                        {jobseekerProfile?.dateOfBirth || "Birthdate not set"}
                      </span>
                      <span className="flex items-center gap-2 truncate">
                        <MapPinIcon />
                        <span className="truncate">
                          {jobseekerProfile?.location?.city
                            ? `${jobseekerProfile.location.city}, Ethiopia`
                            : typeof jobseekerProfile?.location === "string" && jobseekerProfile.location
                            ? jobseekerProfile.location
                            : "Location not set"}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <PhoneIcon />
                        {jobseekerProfile?.phone || (user as any)?.phone || "Phone not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fayda KYC Identity Card */}
              <div className="xl:col-span-2">
                <ProfileShellCard
                  title="Fayda National ID (KYC Identity)"
                  action={user?.faydaFin || jobseekerProfile?.faydaFin ? "Update Fayda ID" : "Verify with Fayda"}
                  onAction={() => openModal("faydaKyc")}
                >
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950 p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="h-11 w-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black tracking-wider text-emerald-300 uppercase">
                            FDRE Fayda ID (ፋይዳ)
                          </span>
                          {jobseekerProfile?.faydaStatus === "VERIFIED" || (user as any)?.verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" /> VERIFIED
                            </span>
                          ) : jobseekerProfile?.faydaStatus === "PENDING" || (user as any)?.faydaStatus === "PENDING" || (jobseekerProfile?.faydaFin && !(user as any)?.verified) ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                              <Clock className="h-3 w-3" /> PENDING ADMIN REVIEW
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 border border-rose-400/40 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                              <AlertTriangle className="h-3 w-3" /> UNVERIFIED
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono font-bold text-white mt-1 truncate">
                          {jobseekerProfile?.faydaFin || user?.faydaFin ? (
                            `FIN: ${jobseekerProfile?.faydaFin || user?.faydaFin}`
                          ) : (
                            <span className="text-slate-400 font-sans italic">No Fayda Identification Number linked</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModal("faydaKyc")}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm cursor-pointer text-center shrink-0"
                    >
                      {user?.faydaFin || jobseekerProfile?.faydaFin ? "Edit Fayda Details" : "Verify Fayda ID"}
                    </button>
                  </div>
                </ProfileShellCard>
              </div>

              {/* Bio (optional) */}
              <ProfileShellCard
                title="Bio (optional)"
                action="Edit Bio"
                onAction={() => openModal("basicProfile")}
              >
                <div className="rounded-md border border-slate-200 bg-white p-3">
                  <div className="mb-2 flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Edit bio"
                      onClick={() => openModal("basicProfile")}
                      className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                    >
                      <EditIcon />
                    </button>
                    <IconButton label="Delete bio" tone="delete" onClick={handleDeleteBio} />
                  </div>
                  <p className="text-xs text-slate-700 min-h-16 whitespace-pre-wrap break-words overflow-hidden max-w-full leading-relaxed">
                    {jobseekerProfile?.bio || <span className="text-neutral-400 italic">Say something about yourself...</span>}
                  </p>
                </div>
              </ProfileShellCard>

              {/* Manage Credentials */}
              <ProfileShellCard title="Manage Credentials">
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-950">
                    Email
                    <div className="mt-1 flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500">
                      <span>{user?.email}</span>
                      <button
                        className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                        type="button"
                        onClick={() => openModal("changeEmail")}
                      >
                        Change email
                      </button>
                    </div>
                  </label>
                  <label className="block text-xs font-semibold text-slate-950">
                    Password
                    <div className="mt-1 flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500">
                      <span>Change Password</span>
                      <button
                        type="button"
                        aria-label="Edit password"
                        onClick={() => openModal("changePassword")}
                        className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                      >
                        <EditIcon />
                      </button>
                    </div>
                  </label>
                </div>
              </ProfileShellCard>

              {/* Address Lines */}
              <ProfileShellCard
                title="Address Lines"
                action="Edit Address"
                onAction={() => openModal("basicProfile")}
              >
                <div className="space-y-3">
                  {[
                    { label: "Address Line 1", val: jobseekerProfile?.location?.addressLine1 },
                    { label: "Address Line 2", val: jobseekerProfile?.location?.addressLine2 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500"
                    >
                      <span>{item.label}</span>
                      <span className="ml-auto mr-3 text-slate-700 font-medium truncate max-w-[200px]">
                        {item.val || "Not configured"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={`Edit ${item.label}`}
                          onClick={() => openModal("basicProfile")}
                          className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ProfileShellCard>

              {/* Your Skills */}
              <ProfileShellCard
                title="Your Skills"
                action="Add Skills"
                onAction={() => openModal("basicProfile")}
              >
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.skills && jobseekerProfile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {jobseekerProfile.skills.map((skill, sIdx) => {
                        const skillName = typeof skill === "string" ? skill : skill.name;
                        return (
                          <span
                            key={sIdx}
                            className="inline-flex h-7 items-center justify-center rounded-full bg-emerald-100 px-3.5 text-xs font-semibold text-emerald-700 shadow-xs"
                          >
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No skills added yet. Click &quot;Add Skills&quot; to showcase your trade skills.</p>
                  )}
                </div>
              </ProfileShellCard>

              {/* Experiences */}
              <ProfileShellCard
                title={`Your Experiences${jobseekerProfile?.experienceYears ? ` - ${jobseekerProfile.experienceYears} years` : ""}`}
                action="Add Experience"
                onAction={() => {
                  setEditingExp({});
                  openModal("experience");
                }}
              >
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.experiences && jobseekerProfile.experiences.length > 0 ? (
                    <div className="space-y-4">
                      {jobseekerProfile.experiences.map((exp, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                          <div>
                            <h3 className="text-sm font-black text-emerald-600">
                              {exp.position}
                            </h3>
                            <p className="mt-1 text-xs font-bold text-slate-950">
                              {exp.companyName}
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">
                              {exp.startDate ? `${exp.startDate} - ${exp.isCurrent ? "Present" : exp.endDate || "Present"}` : ""}
                            </p>
                            {exp.description && (
                              <p className="mt-2 text-xs text-neutral-600 whitespace-pre-line">
                                {exp.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              aria-label="Edit experience"
                              onClick={() => {
                                setEditingExp({ index: idx, data: exp });
                                openModal("experience");
                              }}
                              className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                            >
                              <EditIcon />
                            </button>
                            <IconButton
                              label="Delete experience"
                              tone="delete"
                              onClick={() => handleDeleteExperience(idx)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No work experience added yet. Click &quot;Add Experience&quot; to highlight your background.</p>
                  )}
                </div>
              </ProfileShellCard>

              {/* Education */}
              <ProfileShellCard
                title="Your Education"
                action="Add Education"
                onAction={() => {
                  setEditingEdu({});
                  openModal("education");
                }}
              >
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.educations && jobseekerProfile.educations.length > 0 ? (
                    <div className="space-y-4">
                      {jobseekerProfile.educations.map((edu, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                          <div>
                            <h3 className="text-sm font-black text-emerald-600">
                              {edu.degree ? `${edu.degree} in ` : ""}{edu.fieldOfStudy}
                            </h3>
                            <p className="mt-1 text-xs font-bold text-slate-950">
                              {edu.schoolName}
                            </p>
                            <p className="mt-1 whitespace-pre-line text-xs text-neutral-500">
                              {edu.startDate ? `${edu.startDate} - ` : ""}{edu.endDate || ""}
                              {edu.description ? `\n${edu.description}` : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              aria-label="Edit education"
                              onClick={() => {
                                setEditingEdu({ index: idx, data: edu });
                                openModal("education");
                              }}
                              className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                            >
                              <EditIcon />
                            </button>
                            <IconButton
                              label="Delete education"
                              tone="delete"
                              onClick={() => handleDeleteEducation(idx)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No education history added yet. Click &quot;Add Education&quot; to add certifications or degrees.</p>
                  )}
                </div>
              </ProfileShellCard>

              {/* Resume & Socials */}
              <ProfileShellCard
                title="Resume & Socials"
                action="Edit Links"
                onAction={() => openModal("resumesSocials")}
              >
                <div className="space-y-3">
                  {jobseekerProfile?.socialLinks && jobseekerProfile.socialLinks.length > 0 ? (
                    jobseekerProfile.socialLinks.map(
                      (link: { platform: string; url: string }) => (
                        <div
                          key={link.platform}
                          className="flex h-9 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500"
                        >
                          <span className="font-bold text-slate-800 mr-2 capitalize">{link.platform}:</span>
                          <span className="truncate flex-1">{link.url}</span>
                          <div className="ml-3 flex items-center gap-1">
                            <button
                              type="button"
                              aria-label={`Edit ${link.platform}`}
                              onClick={() => openModal("resumesSocials")}
                              className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                            >
                              <EditIcon />
                            </button>
                            <IconButton
                              label={`Delete ${link.platform}`}
                              tone="delete"
                              onClick={() => handleDeleteSocialLink(link.platform)}
                            />
                          </div>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No social links or resumes uploaded yet.</p>
                  )}
                </div>
              </ProfileShellCard>
            </section>
          </div>
        </section>
      </div>

      {/* Modals */}
      <EditBasicProfileModal
        isOpen={modals.basicProfile}
        onClose={() => closeModal("basicProfile")}
        initialData={{
          bio: jobseekerProfile?.bio,
          firstName: jobseekerProfile?.firstName?.split(" ")[0],
          lastName: jobseekerProfile?.lastName?.split(" ").slice(1).join(" ") || jobseekerProfile?.lastName,
          phone: jobseekerProfile?.phone || (user as any)?.phone,
          cityLocation: typeof jobseekerProfile?.location === "object" ? jobseekerProfile?.location?.city : jobseekerProfile?.location,
          gender: jobseekerProfile?.gender,
          dateOfBirth: jobseekerProfile?.dateOfBirth,
          addressLine1: jobseekerProfile?.location?.addressLine1,
          addressLine2: jobseekerProfile?.location?.addressLine2,
          skills: (jobseekerProfile?.skills || []).map((s) => (typeof s === "string" ? s : s.name)),
          currentPosition: jobseekerProfile?.currentPosition || jobseekerProfile?.headline,
        }}
        onSave={(data) => handleSave("basicProfile", data)}
      />

      <EditFaydaKycModal
        isOpen={modals.faydaKyc}
        onClose={() => closeModal("faydaKyc")}
        initialData={{
          faydaFin: jobseekerProfile?.faydaFin || user?.faydaFin,
          fullName: fullName,
          dateOfBirth: jobseekerProfile?.dateOfBirth,
          gender: jobseekerProfile?.gender,
          frontDocName: jobseekerProfile?.frontDocName,
          backDocName: jobseekerProfile?.backDocName,
          faydaStatus: jobseekerProfile?.faydaStatus || (user as any)?.faydaStatus,
        }}
        onSave={(data) => handleSave("faydaKyc", data)}
      />

      <EditProfileImageModal
        isOpen={modals.profileImage}
        onClose={() => closeModal("profileImage")}
        currentImage={avatarUrl}
        initials={initials}
        onSave={async (_file, dataUrl) => {
          try {
            await api.client.request("/accounts/jobseekers/upload-avatar", {
              method: "POST",
              body: { avatarUrl: dataUrl },
            });
          } catch (e) {
            console.error("Avatar upload error:", e);
          }
          await refreshProfile();
          if (refreshUser) await refreshUser();
        }}
        onRemove={async () => {
          try {
            await api.client.request("/accounts/jobseekers/upload-avatar", {
              method: "POST",
              body: { avatarUrl: "" },
            });
          } catch (e) {
            console.error("Avatar remove error:", e);
          }
          await refreshProfile();
          if (refreshUser) await refreshUser();
        }}
      />

      <EditEducationModal
        isOpen={modals.education}
        onClose={() => {
          setEditingEdu({});
          closeModal("education");
        }}
        initialData={editingEdu.data}
        onSave={(data) => handleSave("education", data)}
      />

      <EditExperienceModal
        isOpen={modals.experience}
        onClose={() => {
          setEditingExp({});
          closeModal("experience");
        }}
        initialData={editingExp.data}
        onSave={(data) => handleSave("experience", data)}
      />

      <EditResumesAndSocialsModal
        isOpen={modals.resumesSocials}
        onClose={() => closeModal("resumesSocials")}
        initialData={{
          linkedin: jobseekerProfile?.socialLinks?.find((l) => l.platform.toLowerCase() === "linkedin")?.url,
          github: jobseekerProfile?.socialLinks?.find((l) => l.platform.toLowerCase() === "github")?.url,
          portfolio: jobseekerProfile?.socialLinks?.find((l) => l.platform.toLowerCase() === "portfolio")?.url,
          resumeFile: jobseekerProfile?.socialLinks?.find((l) => l.platform.toLowerCase() === "resume")?.url,
        }}
        onSave={(data) => handleSave("resumesSocials", data)}
      />

      <ChangeEmailModal
        isOpen={modals.changeEmail}
        onClose={() => closeModal("changeEmail")}
      />

      <ChangePasswordModal
        isOpen={modals.changePassword}
        onClose={() => closeModal("changePassword")}
      />
    </main>
  );
}
