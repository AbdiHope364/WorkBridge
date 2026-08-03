"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { api } from "@/lib/api";
type IconProps = SVGProps<SVGSVGElement>;
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  WORKPLACE_TYPES,
  EXPERIENCE_LEVELS,
  BUDGET_TYPES,
} from "@repo/types/jobs";
import type {
  JobCategory,
  JobType,
  WorkplaceType,
  WorkerType,
  ExperienceLevel,
  BudgetType,
} from "@repo/types/jobs";
import { createJobSchema } from "../jobs/lib/job-schemas";

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 6 9 12l6 6M9.5 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
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

function MonitorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14v10H5V6Zm5 14h4m-2-4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m14 6 4 4M4 20l7-7m4-9 5 5-4 4-5-5 4-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4v3m10-3v3M5 8h14v11H5V8Zm3 4h2m3 0h2m-7 3h2m3 0h2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 4 17 8-17 8 4-8-4-8Zm4 8h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m8 8 8 8M16 8l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-medium text-black">
      {children} <span className="text-red-500">*</span>
    </span>
  );
}

function TextField({
  label,
  placeholder,
  icon,
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      {required ? (
        <RequiredLabel>{label}</RequiredLabel>
      ) : (
        <span className="text-sm font-medium text-black">{label}</span>
      )}
      <span className="mt-2 flex h-8 items-center gap-3 border border-[#c9cbd3] bg-white px-4">
        {icon}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#8b8e99]"
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
  required = false,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      {required ? (
        <RequiredLabel>{label}</RequiredLabel>
      ) : (
        <span className="text-sm font-medium text-black">{label}</span>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs text-[#777] outline-none"
      >
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
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        `grid min-h-[38px] grid-cols-[22px_1fr_22px] items-center gap-3 border px-6 text-left ` +
        (selected
          ? "border-[#00aaa8] bg-[#d6eef1]"
          : "border-[#c9cbd3] bg-white")
      }
    >
      <span
        className={
          `grid h-4 w-4 place-items-center rounded-full border ` +
          (selected
            ? "border-[#00aaa8] text-[#00aaa8]"
            : "border-[#777] text-transparent")
        }
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span>
        <strong className="block text-xs font-semibold text-black">
          {title}
        </strong>
        <span className="text-[10px] text-black">{description}</span>
      </span>
      <span className={selected ? "text-[#172653]" : "text-[#888]"}>
        {icon}
      </span>
    </button>
  );
}

function SkillsField({
  skills,
  skillInput,
  onAddSkill,
  onSkillInputChange,
  onRemoveSkill,
}: {
  skills: string[];
  skillInput: string;
  onAddSkill: () => void;
  onSkillInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveSkill: (skill: string) => void;
}) {
  return (
    <label className="block lg:col-span-2">
      <RequiredLabel>Required Skills</RequiredLabel>
      <div className="mt-2 flex min-h-8 flex-wrap items-center gap-2 border border-[#c9cbd3] bg-white px-4 py-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex h-5 items-center gap-2 rounded-full bg-[#cceff1] px-3 text-[10px] text-[#009a9a]"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemoveSkill(skill)}
              className="hover:text-red-500"
            >
              <XIcon className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={skillInput}
          onChange={onSkillInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddSkill();
            }
          }}
          placeholder="Type skill and press Enter..."
          className="min-w-[180px] flex-1 bg-transparent text-xs outline-none placeholder:text-[#8b8e99]"
        />
      </div>
      <p className="mt-2 text-xs text-[#8b8e99]">
        Add 3 or more skills to improve matching accuracy
      </p>
    </label>
  );
}

export function EmployerCreateJobPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const [form, setForm] = useState({
    title: "",
    city: "",
    category: JOB_CATEGORIES[0],
    jobType: "FULL_TIME" as JobType,
    workplaceType: "REMOTE" as WorkplaceType,
    workerType: "DIGITAL" as WorkerType,
    experienceLevel: "INTERMEDIATE" as ExperienceLevel,
    salary: "",
    budget: "MONTHLY" as BudgetType,
    deadline: "",
    description: "",
    skills: [] as string[],
    vacancies: 1,
    isUrgent: false,
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("job_preview");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("📥 Loading saved preview data:", parsedData);

        // Update form with saved data
        setForm({
          title: parsedData.title || "",
          city: parsedData.city || "",
          category: parsedData.category || JOB_CATEGORIES[0],
          jobType: parsedData.jobType || "FULL_TIME",
          workplaceType: parsedData.workplaceType || "REMOTE",
          workerType: parsedData.workerType || "DIGITAL",
          experienceLevel: parsedData.experienceLevel || "INTERMEDIATE",
          salary: parsedData.salary?.toString() || "",
          budget: parsedData.budget || "MONTHLY",
          deadline: parsedData.deadline || "",
          description: parsedData.description || "",
          skills: parsedData.skills || [],
          vacancies: parsedData.vacancies || 1,
          isUrgent: parsedData.isUrgent || false,
        });
      } catch (err) {
        console.error("Error loading saved preview data:", err);
      }
    }

    setIsLoadingForm(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && user && user.role !== "employer") {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateField = (
    field: keyof typeof form,
    value: string | number | boolean | string[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    if (form.skills.includes(value)) {
      alert("Skill already added");
      return;
    }
    updateField("skills", [...form.skills, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      form.skills.filter((s) => s !== skill),
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setIsSubmitting(true);

      const skillsAsObjects = form.skills.map((skill) => ({
        name: skill.trim(),
      }));

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        skills: skillsAsObjects,
        jobType: form.jobType,
        workplaceType: form.workplaceType,
        workerType: form.workerType,
        experienceLevel: form.experienceLevel,
        salary: Number(form.salary),
        budget: form.budget,
        deadline: form.deadline,
        vacancies: form.vacancies,
        isUrgent: form.isUrgent,
        location: {
          city: form.city.trim(),
          country: "ETHIOPIA",
        },
      };

      const result = createJobSchema.safeParse(payload);

      if (!result.success) {
        setError(result.error.issues[0]?.message || "Validation failed");
        return;
      }

      await api.jobs.createJob(result.data);

      sessionStorage.removeItem("job_preview");

      alert("Job posted successfully!");

      router.push("/dashboard/employer");
    } catch (err: any) {
      console.error("Error creating job:", err);

      // Handle specific error cases
      if (err.status === 401) {
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem("workbridge_token");
        router.push("/login");
      } else if (err.status === 403) {
        setError("You do not have permission to create jobs.");
      } else if (err.status === 400) {
        setError(err.message || "Invalid job data. Please check your inputs.");
      } else {
        setError(err.message || "Failed to post job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  //handle save draft
  const handleSaveDraft = async () => {
    setError(null);

    try {
      setIsSubmitting(true);

      const skillsAsObjects = form.skills.map((skill) => ({
        name: skill.trim(),
      }));

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        skills: skillsAsObjects,
        jobType: form.jobType,
        workplaceType: form.workplaceType,
        workerType: form.workerType,
        experienceLevel: form.experienceLevel,
        salary: Number(form.salary),
        budget: form.budget,
        deadline: form.deadline,
        vacancies: form.vacancies,
        isUrgent: form.isUrgent,
        location: {
          city: form.city.trim(),
          country: "ETHIOPIA",
        },
        status: "DRAFT",
      };

      await api.jobs.createJob(payload);

      sessionStorage.removeItem("job_preview");

      alert("Draft saved successfully!");
      router.push("/dashboard/employer");
    } catch (err: any) {
      setError(err.message || "Failed to save draft");
    } finally {
      setIsSubmitting(false);
    }
  };

  //handle preview
  const handlePreview = () => {
    sessionStorage.setItem("job_preview", JSON.stringify(form));
    router.push("/dashboard/employer/create/preview");
  };

  return (
    <main className="min-h-screen w-full bg-[#f7f7fb] text-black">
      <header className="relative flex h-12 items-center justify-center border-b border-[#00aaa8] bg-white">
        <Link
          href="/dashboard/employer"
          aria-label="Back"
          className="absolute left-9 top-1/2 -translate-y-1/2 text-black"
        >
          <BackIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-medium text-black">Create Job Posting</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-4xl px-4 sm:px-8 py-7"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid gap-x-3 gap-y-4 lg:grid-cols-2">
          <label className="block">
            <RequiredLabel>Job Title</RequiredLabel>
            <input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs outline-none placeholder:text-[#8b8e99]"
              required
            />
          </label>

          <label className="block">
            <RequiredLabel>Job Location</RequiredLabel>
            <input
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="e.g. Addis Ababa"
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs outline-none placeholder:text-[#8b8e99]"
              required
            />
          </label>

          <label className="block">
            <RequiredLabel>Job Category</RequiredLabel>
            <select
              value={form.category}
              onChange={(e) =>
                updateField("category", e.target.value as JobCategory)
              }
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs text-[#777] outline-none"
              required
            >
              {JOB_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <RequiredLabel>Job Type</RequiredLabel>
            <select
              value={form.jobType}
              onChange={(e) =>
                updateField("jobType", e.target.value as JobType)
              }
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs text-[#777] outline-none"
              required
            >
              {JOB_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>

          <div className="lg:col-span-2">
            <RequiredLabel>Work Environment</RequiredLabel>
            <div className="mt-2 grid gap-3 lg:grid-cols-2">
              <ChoiceCard
                selected={form.workerType === "DIGITAL"}
                title="Digital"
                description="Software, Design, Web"
                icon={<MonitorIcon className="h-4 w-4" />}
                onClick={() => updateField("workerType", "DIGITAL")}
              />
              <ChoiceCard
                selected={form.workerType === "PHYSICAL"}
                title="Physical"
                description="Driving, Cleaning, Construction"
                icon={<ToolIcon className="h-4 w-4" />}
                onClick={() => updateField("workerType", "PHYSICAL")}
              />
            </div>
          </div>

          <label className="block">
            <RequiredLabel>Workplace Type</RequiredLabel>
            <select
              value={form.workplaceType}
              onChange={(e) =>
                updateField("workplaceType", e.target.value as WorkplaceType)
              }
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs text-[#777] outline-none"
              required
            >
              {WORKPLACE_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <RequiredLabel>Experience Level</RequiredLabel>
            <select
              value={form.experienceLevel}
              onChange={(e) =>
                updateField(
                  "experienceLevel",
                  e.target.value as ExperienceLevel,
                )
              }
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs text-[#777] outline-none"
              required
            >
              {EXPERIENCE_LEVELS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <TextField
            label="Salary"
            placeholder="e.g. 60000"
            value={form.salary}
            onChange={(e) => updateField("salary", e.target.value)}
            required
          />

          <SelectField
            label="Budget Type"
            options={BUDGET_TYPES}
            value={form.budget}
            onChange={(e) =>
              updateField("budget", e.target.value as BudgetType)
            }
            required
          />
          <label className="block">
            <RequiredLabel>Application Deadline</RequiredLabel>
            <span className="mt-2 flex h-8 items-center gap-3 border border-[#c9cbd3] bg-white px-4">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => updateField("deadline", e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#777]"
                required
              />
              <CalendarIcon className="h-4 w-4 shrink-0 text-[#777]" />
            </span>
          </label>

          <SkillsField
            skills={form.skills}
            skillInput={skillInput}
            onAddSkill={addSkill}
            onSkillInputChange={(e) => setSkillInput(e.target.value)}
            onRemoveSkill={removeSkill}
          />

          <label className="block lg:col-span-2">
            <RequiredLabel>Detailed Job Description</RequiredLabel>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the job by including:&#10;  - the role of the seeker&#10;  - what the seeker will work on&#10;  - the qualifications required"
              className="mt-2 h-[103px] w-full resize-none border border-[#c9cbd3] bg-white px-5 py-4 text-sm outline-none placeholder:text-[#777]"
              required
              minLength={20}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-black">
              Number of Vacancies
            </span>
            <input
              type="number"
              value={form.vacancies}
              onChange={(e) => updateField("vacancies", Number(e.target.value))}
              min="1"
              className="mt-2 h-8 w-full border border-[#c9cbd3] bg-white px-4 text-xs outline-none"
            />
          </label>

          <label className="block flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.isUrgent}
              onChange={(e) => updateField("isUrgent", e.target.checked)}
              className="h-4 w-4 accent-[#00aaa8]"
            />
            <span className="text-sm font-medium text-black">
              Mark as Urgent
            </span>
          </label>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center">
          <Link
            href="/dashboard/employer"
            className="inline-flex items-center gap-2 text-xl font-normal text-black hover:text-gray-600"
          >
            <BackIcon className="h-5 w-5" />
            Back
          </Link>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSaveDraft()}
            className="h-7 w-[113px] rounded border border-[#00aaa8] bg-white text-base font-medium text-black hover:bg-gray-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="h-7 w-[113px] rounded border border-[#00aaa8] bg-white text-base font-medium text-[#00aaa8] sm:justify-self-end hover:bg-gray-50"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-7 w-[113px] items-center justify-center gap-2 rounded bg-[#00aaa8] text-base font-semibold text-white hover:bg-[#009999] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Job"}
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
      </form>
    </main>
  );
}
