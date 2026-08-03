"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  WORKPLACE_TYPES,
  EXPERIENCE_LEVELS,
  BUDGET_TYPES,
} from "@repo/types/jobs";

type IconProps = SVGProps<SVGSVGElement>;

// --- Icons ---
function BackIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function MonitorIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function ToolIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// --- Components ---
function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold text-slate-700 mb-1.5 block">
      {children} <span className="text-red-500">*</span>
    </span>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <RequiredLabel>{label}</RequiredLabel>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <label className="block">
      <RequiredLabel>{label}</RequiredLabel>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 h-11 w-full border border-slate-200 bg-white px-4 text-sm text-slate-700 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 appearance-none transition-all cursor-pointer bg-no-repeat bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22%2364748b%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M19%209l-7%207-7-7%22%3E%3C/path%3E%3C/svg%3E')] bg-right-[1rem] bg-center bg-[length:1.25rem]"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChoiceCard({
  title,
  description,
  icon,
  selected = false,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selected ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600" : "border-slate-100 bg-white hover:border-slate-200"}`}
    >
      <div
        className={`p-2.5 rounded-lg ${selected ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{description}</div>
      </div>
      <div
        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-teal-600 bg-teal-600" : "border-slate-200"}`}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

function SkillsField({
  skills,
  skillInput,
  setSkillInput,
  onAddSkill,
  onRemoveSkill,
}: {
  skills: string[];
  skillInput: string;
  setSkillInput: (v: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (s: string) => void;
}) {
  return (
    <div className="block lg:col-span-2">
      <RequiredLabel>Required Skills</RequiredLabel>
      <div className="mt-1 flex min-h-[50px] flex-wrap items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-lg focus-within:border-teal-500 transition-all shadow-inner">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700 border border-teal-100"
          >
            {skill}
            <button
              type="button"
              title={`Remove ${skill}`}
              aria-label={`Remove ${skill}`}
              onClick={() => onRemoveSkill(skill)}
            >
              <XIcon className="h-3.5 w-3.5 hover:text-red-500 transition-colors" />
            </button>
          </span>
        ))}
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), onAddSkill())
          }
          placeholder="Type skill and press Enter..."
          className="min-w-[180px] flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

export function EmployerEditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [initialData, setInitialData] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    city: "",
    category: "",
    jobType: "",
    workplaceType: "",
    workerType: "",
    experienceLevel: "",
    salary: "",
    budget: "",
    deadline: "",
    description: "",
    skills: [] as string[],
    vacancies: 1,
    isUrgent: false,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsFetching(true);
        const response = (await api.jobs.getJob(jobId)) as any;

        const job = response.data || response;

        if (!job) {
          setError("Job data not found.");
          return;
        }

        const mappedData = {
          title: job.title || "",
          city: job.location?.city || "",
          category: job.category || "",
          jobType: job.jobType || "",
          workplaceType: job.workplaceType || "",
          workerType: job.workerType || "",
          experienceLevel: job.experienceLevel || "",
          salary: String(job.salary || ""),
          budget: job.budget || "",
          deadline: job.deadline?.split("T")[0] || "",
          description: job.description || "",
          vacancies: job.vacancies || 1,
          isUrgent: job.isUrgent || false,
          skills:
            job.skills?.map((s: any) => (typeof s === "string" ? s : s.name)) ||
            [],
        };

        setForm(mappedData);
        setInitialData(mappedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load job details.");
      } finally {
        setIsFetching(false);
      }
    };

    if (jobId && isAuthenticated) fetchJob();
  }, [jobId, isAuthenticated]);

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || form.skills.includes(value)) return;
    updateField("skills", [...form.skills, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      form.skills.filter((s) => s !== skill),
    );
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Build PATCH payload with only changed fields
      const patchPayload: any = {};

      Object.keys(form).forEach((key) => {
        const currentVal = (form as any)[key];
        const initialVal = (initialData as any)[key];

        // Array comparison (Skills)
        if (Array.isArray(currentVal)) {
          if (
            currentVal.length !== initialVal.length ||
            currentVal.some((v, i) => v !== initialVal[i])
          ) {
            patchPayload.skills = currentVal.map((name) => ({ name }));
          }
        }
        // Nested Object comparison (Location)
        else if (key === "city") {
          if (currentVal !== initialVal) {
            patchPayload.location = { city: currentVal, country: "ETHIOPIA" };
          }
        }
        // Numeric conversion
        else if (key === "salary" || key === "vacancies") {
          if (String(currentVal) !== String(initialVal)) {
            patchPayload[key] = Number(currentVal);
          }
        }
        // Simple primitives
        else if (currentVal !== initialVal) {
          patchPayload[key] = currentVal;
        }
      });

      if (Object.keys(patchPayload).length === 0) {
        alert("No changes detected.");
        setIsSubmitting(false);
        return;
      }

      await api.jobs.updateJob(jobId, patchPayload);
      alert("Job updated successfully");
      router.push("/dashboard/employer/my-jobs");
    } catch (err: any) {
      setError(err.message || "Update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20 text-slate-900">
      <header className="sticky top-0 z-10 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/employer/my-jobs"
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <BackIcon className="h-5 w-5 text-slate-600" />
            </Link>
            <h1 className="text-xl font-bold tracking-tight">
              Edit Job Posting
            </h1>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleUpdateJob}
        className="max-w-4xl mx-auto px-4 mt-8 space-y-8 animate-in fade-in duration-500"
      >
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded shadow-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
            Core Details
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField
              label="Job Title"
              placeholder="..."
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
            <TextField
              label="Job Location"
              placeholder="..."
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
            />
            <SelectField
              label="Job Category"
              options={JOB_CATEGORIES}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            />
            <SelectField
              label="Job Type"
              options={JOB_TYPES}
              value={form.jobType}
              onChange={(e) => updateField("jobType", e.target.value)}
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
            Work Environment
          </h2>
          <div className="space-y-6">
            <div>
              <RequiredLabel>Worker Type</RequiredLabel>
              <div className="grid gap-4 md:grid-cols-2 mt-3">
                <ChoiceCard
                  selected={form.workerType === "DIGITAL"}
                  title="Digital"
                  description="Tech, Design, Remote Work"
                  icon={<MonitorIcon className="h-5 w-5" />}
                  onClick={() => updateField("workerType", "DIGITAL")}
                />
                <ChoiceCard
                  selected={form.workerType === "PHYSICAL"}
                  title="Physical"
                  description="On-site, Manual, Technical"
                  icon={<ToolIcon className="h-5 w-5" />}
                  onClick={() => updateField("workerType", "PHYSICAL")}
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <SelectField
                label="Workplace Type"
                options={WORKPLACE_TYPES}
                value={form.workplaceType}
                onChange={(e) => updateField("workplaceType", e.target.value)}
              />
              <SelectField
                label="Experience Level"
                options={EXPERIENCE_LEVELS}
                value={form.experienceLevel}
                onChange={(e) => updateField("experienceLevel", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
            Description & Requirements
          </h2>
          <div className="grid gap-6">
            <SkillsField
              skills={form.skills}
              skillInput={skillInput}
              setSkillInput={setSkillInput}
              onAddSkill={addSkill}
              onRemoveSkill={removeSkill}
            />
            <div className="block lg:col-span-2">
              <RequiredLabel>Detailed Job Description</RequiredLabel>
              <textarea
                title="Detailed Job Description"
                placeholder="Describe the job requirements and responsibilities"
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full min-h-[300px] p-5 mt-1 rounded-xl border border-slate-200 bg-white text-base leading-relaxed outline-none focus:border-teal-500 transition-all resize-y shadow-inner"
                required
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
            Compensation & Deadlines
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField
              label="Salary (ETB)"
              type="number"
              value={form.salary}
              onChange={(e) => updateField("salary", e.target.value)}
              placeholder="0"
            />
            <SelectField
              label="Budget Type"
              options={BUDGET_TYPES}
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
            />
            <TextField
              label="Deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              placeholder="Select date"
            />
            <TextField
              label="Vacancies"
              type="number"
              value={form.vacancies}
              onChange={(e) => updateField("vacancies", e.target.value)}
              placeholder="1"
            />
          </div>
        </section>

        <div className="flex items-center justify-between gap-6 pt-10 border-t border-slate-200">
          <Link
            href="/dashboard/employer/my-jobs"
            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2"
          >
            <BackIcon className="h-4 w-4" /> Cancel Changes
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-10 rounded-xl bg-teal-600 text-sm font-bold text-white hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
