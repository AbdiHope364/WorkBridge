// app/reports-moderation/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Flag,
  User,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Mail,
  Building2,
  FileText,
  MoreVertical,
  Ban,
  Shield,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define types
type ReportType = "Job" | "User" | "Message" | "Company";
type ReportStatus = "Pending" | "Resolved" | "Dismissed" | "Action Required";
type ReportPriority = "High" | "Medium" | "Low";

interface Report {
  id: string;
  reportedBy: string;
  reportedByEmail: string;
  reportedUser: string;
  reportedUserId: string;
  content: string;
  description: string;
  type: ReportType;
  date: string;
  status: ReportStatus;
  priority: ReportPriority;
  attachments: string[];
  history: {
    action: string;
    date: string;
    user: string;
  }[];
  relatedContent: {
    title: string;
    company: string;
    postedDate: string;
  };
}

// Type configurations
const typeConfig: Record<
  ReportType,
  { color: string; icon: React.ElementType; label: string }
> = {
  Job: {
    color: "bg-blue-50 text-blue-600",
    icon: Briefcase,
    label: "Job Report",
  },
  User: {
    color: "bg-purple-50 text-purple-600",
    icon: User,
    label: "User Report",
  },
  Message: {
    color: "bg-orange-50 text-orange-600",
    icon: MessageSquare,
    label: "Message Report",
  },
  Company: {
    color: "bg-cyan-50 text-cyan-600",
    icon: Flag,
    label: "Company Report",
  },
};

const statusConfig: Record<
  ReportStatus,
  { color: string; icon: React.ElementType; label: string }
> = {
  Pending: {
    color: "bg-amber-50 text-amber-600 border-amber-200",
    icon: Clock,
    label: "Pending Review",
  },
  Resolved: {
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: CheckCircle2,
    label: "Resolved",
  },
  Dismissed: {
    color: "bg-slate-50 text-slate-600 border-slate-200",
    icon: XCircle,
    label: "Dismissed",
  },
  "Action Required": {
    color: "bg-rose-50 text-rose-600 border-rose-200",
    icon: AlertTriangle,
    label: "Action Required",
  },
};

const priorityColors: Record<ReportPriority, string> = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

// Mock data with proper typing
const mockReports: Record<string, Report> = {
  "1": {
    id: "1",
    reportedBy: "Sarah Johnson",
    reportedByEmail: "sarah.j@email.com",
    reportedUser: "TechCorp Solutions",
    reportedUserId: "TC123",
    content: "Inappropriate job posting content",
    description:
      "This job posting contains offensive language and discriminatory requirements that violate our community guidelines.",
    type: "Job",
    date: "June 24, 2025",
    status: "Pending",
    priority: "High",
    attachments: ["screenshot1.png", "screenshot2.png"],
    history: [
      {
        action: "Reported",
        date: "June 24, 2025 10:30 AM",
        user: "Sarah Johnson",
      },
      {
        action: "Assigned to moderator",
        date: "June 24, 2025 11:15 AM",
        user: "System",
      },
    ],
    relatedContent: {
      title: "Senior Developer Position",
      company: "TechCorp Solutions",
      postedDate: "June 20, 2025",
    },
  },
  "2": {
    id: "2",
    reportedBy: "Mike Peters",
    reportedByEmail: "mike.p@email.com",
    reportedUser: "John Doe",
    reportedUserId: "JD789",
    content: "Suspicious user behavior",
    description:
      "User has been sending unsolicited messages to multiple job seekers asking for personal information.",
    type: "User",
    date: "June 23, 2025",
    status: "Action Required",
    priority: "Medium",
    attachments: ["chat_logs.pdf"],
    history: [
      {
        action: "Reported",
        date: "June 23, 2025 2:45 PM",
        user: "Mike Peters",
      },
      {
        action: "Investigation started",
        date: "June 23, 2025 4:00 PM",
        user: "Moderator",
      },
    ],
    relatedContent: {
      title: "User Account",
      company: "Individual",
      postedDate: "Joined: Jan 2025",
    },
  },
};

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  useEffect(() => {
    // In production, fetch from API
    const fetchReport = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const id = params.id as string;
        const data = mockReports[id];
        if (data) {
          setReport(data);
        }
        setLoading(false);
      }, 500);
    };

    fetchReport();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4100F2] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading report details...
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-800">
            Report not found
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            The report you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-[#4100F2] text-white rounded-lg font-bold hover:bg-[#2B00A1] transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const TypeIcon = typeConfig[report.type].icon;
  const StatusIcon = statusConfig[report.status].icon;
  const priorityColor = priorityColors[report.priority];

  const handleAction = (action: string) => {
    setSelectedAction(action);
    console.log(`Performing action: ${action} on report ${report.id}`);

    // Update status locally
    if (action === "resolve") {
      setReport({ ...report, status: "Resolved" });
    } else if (action === "dismiss") {
      setReport({ ...report, status: "Dismissed" });
    } else if (action === "escalate") {
      setReport({ ...report, status: "Action Required" });
    }

    setSelectedAction(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                Report Details
              </h1>
              <p className="text-sm text-slate-500">Report #{report.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold text-slate-700 transition-colors">
              <MoreVertical className="w-4 h-4 inline mr-1" />
              More
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Priority Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Status
                </p>
                <div
                  className={cn(
                    "flex items-center gap-2 mt-1 px-3 py-1.5 rounded-lg w-fit",
                    statusConfig[report.status].color,
                  )}
                >
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-xs font-bold">
                    {statusConfig[report.status].label}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Priority
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={cn("w-2.5 h-2.5 rounded-full", priorityColor)}
                  />
                  <span className="text-sm font-bold text-slate-700">
                    {report.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Report Content
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        typeConfig[report.type].color,
                      )}
                    >
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {report.content}
                      </p>
                      <p className="text-xs text-slate-500">
                        {typeConfig[report.type].label}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm text-slate-600">{report.description}</p>
                </div>
                {report.attachments && report.attachments.length > 0 && (
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Attachments
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {report.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-medium text-slate-600">
                            {file}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Content */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Related Content
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {report.relatedContent.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {report.relatedContent.company}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {report.relatedContent.postedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Reported By */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Reported By
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-base">
                  {report.reportedBy.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {report.reportedBy}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{report.reportedByEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & History */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-100 sticky top-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleAction("resolve")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Resolve Report
                </button>
                <button
                  onClick={() => handleAction("dismiss")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-bold transition-all active:scale-95"
                >
                  <XCircle className="w-4 h-4" />
                  Dismiss
                </button>
                <button
                  onClick={() => handleAction("escalate")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Escalate
                </button>
                <div className="border-t border-slate-100 pt-3 mt-2">
                  <button
                    onClick={() => handleAction("ban")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-bold transition-all active:scale-95"
                  >
                    <Ban className="w-4 h-4" />
                    Ban User
                  </button>
                  <button
                    onClick={() => handleAction("delete")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-rose-600 rounded-lg text-sm font-bold transition-all active:scale-95 mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Content
                  </button>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                History
              </h3>
              <div className="space-y-4">
                {report.history.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-[#4100F2] mt-1.5" />
                      {index < report.history.length - 1 && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-200" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {item.action}
                      </p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        by {item.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#4100F2] to-[#2B00A1] rounded-xl p-6 text-white">
              <p className="text-xs font-black text-white/80 uppercase tracking-wider mb-2">
                Report Summary
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-white/80">Report ID</span>
                  <span className="text-sm font-bold">#{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/80">Type</span>
                  <span className="text-sm font-bold">{report.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/80">Date</span>
                  <span className="text-sm font-bold">{report.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-white/80">Priority</span>
                  <span className="text-sm font-bold">{report.priority}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
