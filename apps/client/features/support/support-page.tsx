"use client";

import React, { useState, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { JobseekerSidebar } from "../jobseeker-dashboard/components/jobseeker-sidebar";
import { EmployerSidebar } from "../employer-dashboard/components/employer-sidebar";
import {
  LifeBuoy,
  Search,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  HelpCircle,
  Clock,
  FileQuestion,
  ExternalLink,
} from "lucide-react";
import { Button } from "@repo/ui";

interface SupportPageProps {
  role?: "jobseeker" | "employer";
}

export function SupportPage({ role: propRole }: SupportPageProps) {
  const { user } = useAuth();
  const role = propRole || (user?.role === "employer" ? "employer" : "jobseeker");
  const isEmployer = role === "employer";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("all");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Support Ticket Form State
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("general");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketUrgency, setTicketUrgency] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    subject: string;
    createdAt: string;
  } | null>(null);

  // Role-specific FAQ Database
  const faqs = useMemo(() => {
    const commonFaqs = [
      {
        category: "fayda",
        question: "What is Fayda Identification (FIN) and why is it required?",
        answer:
          "Fayda is Ethiopia's National Digital ID Program (NIDP). WorkBridge integrates Fayda to verify the real identity of skilled workers and homeowners. Fayda-verified accounts build trust, prevent fraud, and ensure safety during in-home maintenance visits.",
      },
      {
        category: "payments",
        question: "How does the 0% commission direct payment work?",
        answer:
          "WorkBridge charges 0% platform commission on tradesman earnings. Clients and workers agree on milestones and pricing directly, and payments are settled transparently via Telebirr, CBE Birr, or direct bank transfer without hidden middleman fees.",
      },
      {
        category: "account",
        question: "How do I update my phone number or city location?",
        answer:
          "Go to Account Settings from your dashboard sidebar. You can edit your contact phone number, primary city (e.g. Addis Ababa), and sub-city/neighborhood anytime.",
      },
    ];

    if (isEmployer) {
      return [
        {
          category: "hiring",
          question: "How do I post a job for household maintenance or construction?",
          answer:
            "Click 'Post a New Job' from your employer overview. Specify the required trade (e.g., Electrician, Plumber, Painter), job location, timeframe, and budget. Your job will instantly be visible to verified workers in your area.",
        },
        {
          category: "hiring",
          question: "How do I communicate with applicants?",
          answer:
            "Once workers apply or when you browse 'Find Workers', you can start an instant chat thread or view their verified Fayda status and contact details directly in the Messages tab.",
        },
        {
          category: "fayda",
          question: "Why should homeowners verify their Fayda ID?",
          answer:
            "Verified homeowners receive a '🛡️ Fayda Verified Homeowner' trust badge on all job postings. Top-rated tradesmen apply up to 2x faster to verified households knowing the work location is authenticated and secure.",
        },
        {
          category: "safety",
          question: "What should I do if a worker does not show up on time?",
          answer:
            "You can message or call the worker directly through WorkBridge. If they are unavailable, you can cancel the booking without penalty or reach out to our 24/7 support line for immediate assistance.",
        },
        ...commonFaqs,
      ];
    } else {
      return [
        {
          category: "jobs",
          question: "How do I find and apply for skilled trade jobs?",
          answer:
            "Navigate to 'Find Jobs' in your worker sidebar. You can filter by category (Plumbing, Electrical, Masonry, Carpentry, etc.) and location. Click 'Apply Now' to submit your proposal directly to the client.",
        },
        {
          category: "fayda",
          question: "How do I get the Fayda Verified Worker badge?",
          answer:
            "Go to your Profile or Settings > Fayda KYC tab. Enter your 16-digit Fayda FIN number and upload a clear photo of your Fayda ID front and back. Our admin team verifies credentials within 24 hours.",
        },
        {
          category: "payments",
          question: "When and how do I receive payments for completed jobs?",
          answer:
            "Clients pay you directly upon milestone completion or job inspection. WorkBridge never holds your money or deducts cuts—100% of the agreed wage goes directly into your Telebirr, CBE, or cash account.",
        },
        {
          category: "safety",
          question: "How does WorkBridge protect workers on job sites?",
          answer:
            "WorkBridge requires homeowners and employers to submit location and identity verification. You can check the employer's Fayda Verified badge before accepting any in-home or on-site job.",
        },
        ...commonFaqs,
      ];
    }
  }, [isEmployer]);

  // Filtered FAQs based on category & search query
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeFaqCategory === "all" || faq.category === activeFaqCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeFaqCategory, searchQuery]);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate real-time ticket dispatch
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newTicketId = `WB-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket({
        id: newTicketId,
        subject: ticketSubject,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      setTicketSubject("");
      setTicketMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8fa] text-slate-950 flex-col md:flex-row">
      {/* Dynamic Role Sidebar */}
      {isEmployer ? <EmployerSidebar /> : <JobseekerSidebar />}

      {/* Main Support Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0">
        {/* Top Desktop Header */}
        <header className="hidden md:flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <h1 className="text-xl font-black text-[#14214a] tracking-tight">
              WorkBridge Support &amp; Help Center
            </h1>
            <p className="text-xs text-slate-500">
              {isEmployer
                ? "Help with hiring, job postings, payments, and Fayda homeowner verification"
                : "Help with worker bookings, trade skills, 0% commission, and Fayda KYC"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Clock className="w-3.5 h-3.5" /> 24/7 Ethiopian Support Available
            </span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
          {/* Hero Search Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0b241b] via-[#103e2c] to-[#0b241b] p-6 sm:p-10 text-white shadow-sm overflow-hidden border border-emerald-800">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <LifeBuoy className="w-3.5 h-3.5" /> Official WorkBridge Support
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                How can we help you today?
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Search our knowledge base for answers regarding Fayda KYC, milestone payments, job applications, or open a support ticket.
              </p>

              {/* Search Bar */}
              <div className="relative pt-2">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. 'Fayda ID verification', '0% commission', 'milestone payment')..."
                  className="w-full h-12 rounded-2xl bg-white text-slate-900 pl-12 pr-4 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phone Hotline */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-emerald-300 transition group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Direct Phone Support</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 8:00 AM – 8:00 PM EAT</p>
              </div>
              <a
                href="tel:+251911000000"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>+251 900 000 000</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Email Support */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-emerald-300 transition group">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Email Help Desk</h3>
                <p className="text-xs text-slate-500 mt-0.5">Average response under 2 hours</p>
              </div>
              <a
                href="mailto:support@workbridge.et"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                <span>support@workbridge.et</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* In-App Direct Chat */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-emerald-300 transition group">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Live Support Chat</h3>
                <p className="text-xs text-slate-500 mt-0.5">Instant help for active bookings</p>
              </div>
              <a
                href="/dashboard/messages"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <span>Open Chat Messages</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Fayda KYC Assistance */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:border-emerald-300 transition group">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Fayda KYC Center</h3>
                <p className="text-xs text-slate-500 mt-0.5">Assistance with NIDP ID scans</p>
              </div>
              <a
                href={isEmployer ? "/dashboard/employer/profile" : "/dashboard/settings"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                <span>Verify Your ID</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Frequently Asked Questions Section */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-emerald-600" />
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-slate-500">
                  Instant answers tailored to your {isEmployer ? "Homeowner / Client" : "Skilled Worker"} account
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  { id: "all", label: "All Topics" },
                  { id: "fayda", label: "Fayda KYC" },
                  { id: "payments", label: "Payments" },
                  { id: isEmployer ? "hiring" : "jobs", label: isEmployer ? "Hiring" : "Finding Jobs" },
                  { id: "safety", label: "Safety & Trust" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFaqCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      activeFaqCategory === tab.id
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List Accordions */}
            <div className="divide-y divide-slate-100 space-y-1">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className="pt-3 pb-3">
                      <button
                        type="button"
                        onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 hover:text-emerald-700 transition cursor-pointer py-1"
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="mt-2 text-xs text-slate-600 leading-relaxed pl-6 pr-4 animate-fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No matching questions found for &quot;{searchQuery}&quot;. Feel free to submit a support ticket below.
                </div>
              )}
            </div>
          </section>

          {/* Submit a Support Ticket Section */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  Submit a Support Ticket
                </h3>
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Fast Resolution
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Have an urgent issue with an active job or verification? Our support team in Addis Ababa will assist you promptly.
              </p>
            </div>

            {submittedTicket && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-800 text-sm">
                    Support Ticket Created Successfully! (Ref #{submittedTicket.id})
                  </p>
                  <p className="text-emerald-700">
                    We have received your ticket &quot;{submittedTicket.subject}&quot; at {submittedTicket.createdAt}. A support officer has been assigned and will reply to your account email shortly.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Ticket Subject *
                  </label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Question on Fayda KYC"
                    className="w-full h-11 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Issue Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="general">General Support</option>
                    <option value="fayda">Fayda KYC Verification</option>
                    <option value="booking">Job Booking &amp; Scheduling</option>
                    <option value="payment">Direct Payment Query</option>
                    <option value="safety">Trust &amp; Safety Incident</option>
                    <option value="technical">Bug / Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Urgency Level
                  </label>
                  <select
                    value={ticketUrgency}
                    onChange={(e) => setTicketUrgency(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="medium">Medium - Normal Request</option>
                    <option value="high">High - Urgent Job Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Please describe what happened, including any job title or reference number if applicable..."
                  className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>WorkBridge Safety &amp; Dispute Protection Policy</span>
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Ticket
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
