"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";
import { api } from "@/lib/api";

import { EditBasicProfileModal } from "@/features/jobseeker-dashboard/modals/edit-basic-profile-modal";
import { EditProfileImageModal } from "@/features/jobseeker-dashboard/modals/edit-profile-image-modal";
import { EditEducationModal } from "@/features/jobseeker-dashboard/modals/edit-education-modal";
import { EditExperienceModal } from "@/features/jobseeker-dashboard/modals/edit-experience-modal";
import { EditResumesAndSocialsModal } from "@/features/jobseeker-dashboard/modals/edit-resumes-socials-modal";

const STEPS = [
  {
    id: "BASIC",
    title: "Personal Details",
    desc: "Let's start by creating your professional identity.",
  },
  {
    id: "PHOTO",
    title: "Profile Photo",
    desc: "Add a photo so employers can recognize you.",
  },
  {
    id: "EDUCATION",
    title: "Education",
    desc: "Where did you develop your expertise?",
  },
  {
    id: "EXPERIENCE",
    title: "Work Experience",
    desc: "Tell us about your career journey.",
  },
  {
    id: "SOCIALS",
    title: "Social Links",
    desc: "Where can employers see your work?",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { jobseekerProfile, refreshProfile, isLoading } = useProfile();

  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) router.push("/login");
      if (user?.role === "employer") router.push("/dashboard/employer");
    }
  }, [isAuthenticated, user, isLoading, router]);

  const moveNext = async () => {
    setIsModalActive(false);
    await refreshProfile();
    if (stepIndex >= STEPS.length - 1) {
      router.push("/dashboard/profile");
    } else {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setIsModalActive(false);
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      router.push("/dashboard/profile");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-slate-400">
        LOADING...
      </div>
    );

  const currentStep = STEPS[stepIndex];
  if (!currentStep) return null;

  const progress = (stepIndex / STEPS.length) * 100;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
            Complete your Profile
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase">
              Step {stepIndex + 1} / {STEPS.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-10 text-center relative overflow-hidden">
          <h2 className="text-2xl font-bold text-slate-900">
            {currentStep.title}
          </h2>
          <p className="text-slate-500 mt-2 mb-10 text-sm leading-relaxed">
            {currentStep.desc}
          </p>
          <button
            onClick={() => setIsModalActive(true)}
            className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all"
          >
            Start this step
          </button>
          <button
            onClick={handleSkip}
            className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* --- STEP 1: BASIC INFO  --- */}
      {currentStep.id === "BASIC" && (
        <EditBasicProfileModal
          isOpen={isModalActive}
          onClose={() => setIsModalActive(false)}
          initialData={{}}
          onSave={async (data) => {
            setIsSubmitting(true);
            try {
              const payload = {
                ...data,
                phone: data.phoneNumber,
                location: { city: data.location, country: "ETHIOPIA" },
              };

              if (!jobseekerProfile) {
                await api.profiles.jobseeker.createProfile(payload);
              } else {
                await api.profiles.jobseeker.updateMyProfile(payload);
              }
              await moveNext();
            } catch (err: any) {
              alert(err.message || "Failed to save details.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      )}

      {/* --- STEP 2: PHOTO  --- */}
      {currentStep.id === "PHOTO" && (
        <EditProfileImageModal
          isOpen={isModalActive}
          onClose={() => setIsModalActive(false)}
          onSave={async (file) => {
            setIsSubmitting(true);
            try {
              await api.profiles.jobseeker.uploadAvatar(file);
              await moveNext();
            } catch (err: any) {
              alert(err.message || "Photo upload failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      )}

      {currentStep.id === "EDUCATION" && (
        <EditEducationModal
          isOpen={isModalActive}
          onClose={() => setIsModalActive(false)}
          onSave={async (newData) => {
            setIsSubmitting(true);
            try {
              const educations = [
                ...(jobseekerProfile?.educations || []),
                newData,
              ];
              await api.profiles.jobseeker.updateMyProfile({ educations });
              await moveNext();
            } catch (err: any) {
              alert(err.message || "Education save failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      )}

      {currentStep.id === "EXPERIENCE" && (
        <EditExperienceModal
          isOpen={isModalActive}
          onClose={() => setIsModalActive(false)}
          onSave={async (newData) => {
            setIsSubmitting(true);
            try {
              const experiences = [
                ...(jobseekerProfile?.experiences || []),
                newData,
              ];
              await api.profiles.jobseeker.updateMyProfile({ experiences });
              await moveNext();
            } catch (err: any) {
              alert(err.message || "Experience save failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      )}

      {currentStep.id === "SOCIALS" && (
        <EditResumesAndSocialsModal
          isOpen={isModalActive}
          onClose={() => setIsModalActive(false)}
          onSave={async (socialData) => {
            setIsSubmitting(true);
            try {
              await api.profiles.jobseeker.updateMyProfile({
                socialLinks: socialData,
              });
              await moveNext();
            } catch (err: any) {
              alert(err.message || "Socials save failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        />
      )}
    </main>
  );
}
