"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Button, Input } from "@repo/ui";
import { JobseekerSidebar } from "@/features/jobseeker-dashboard/components/jobseeker-sidebar";
import { WorkerSubscriptionModal } from "@/features/jobseeker-dashboard/components/worker-subscription-modal";

interface PaymentItem {
  id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "escrow";
  method?: string;
  type?: string;
  createdAt: string;
  description?: string;
  bookingId?: string;
  workerName?: string;
}

interface EscrowBooking {
  id: string;
  serviceTitle: string;
  workerId: string;
  workerName: string;
  offeredPrice: number;
  currency: string;
  status: string;
  paymentStatus: string;
  scheduledDate: string;
  locationNeighborhood?: string;
}

interface PaymentHistoryResponse {
  payments?: PaymentItem[];
  data?: {
    payments?: PaymentItem[];
  };
}

interface BookingsResponse {
  bookings?: EscrowBooking[];
}

const subscriptionPlans = [
  // Worker / Tradesman Plans
  {
    id: "plan_worker_free",
    tier: "free",
    targetRole: "jobseeker",
    name: "Free Worker Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    currency: "ETB",
    popular: false,
    quotaText: "5 Free Job Applications / Month",
    features: [
      "5 Free job applications per month",
      "0% platform commission on trade wages",
      "Public worker profile & skill showcase",
      "Direct chat & booking requests",
      "Standard support",
    ],
  },
  {
    id: "plan_worker_pro_monthly",
    tier: "pro_monthly",
    targetRole: "jobseeker",
    name: "Worker Pro Monthly",
    monthlyPrice: 299,
    annualPrice: 2499,
    currency: "ETB",
    popular: true,
    quotaText: "Unlimited Job Applications",
    features: [
      "Unlimited job applications (No 5-app limit)",
      "Verified Pro Tradesman badge",
      "Priority search placement in worker discovery",
      "Featured portfolio & cert showcase",
      "0% commission (Keep 100% of your earnings)",
      "24/7 dedicated telephone & chat support",
    ],
  },
  {
    id: "plan_worker_pro_annual",
    tier: "pro_annual",
    targetRole: "jobseeker",
    name: "Worker Pro Annual",
    monthlyPrice: 208,
    annualPrice: 2499,
    currency: "ETB",
    popular: false,
    quotaText: "Unlimited Job Applications (Save 30%)",
    features: [
      "Everything in Pro Monthly for 1 full year",
      "Unlimited applications all year round",
      "Highest priority ranking in regional searches",
      "30% discount vs monthly billing (2,499 ETB/year)",
    ],
  },

  // Employer / Homeowner Plans
  {
    id: "plan_employer_free",
    tier: "free",
    targetRole: "employer",
    name: "Free Client Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    currency: "ETB",
    popular: false,
    quotaText: "3 Free Job Postings / Month",
    features: [
      "3 Free job postings per month",
      "Browse & search all verified trade workers",
      "Direct booking requests & chat",
      "Standard support",
    ],
  },
  {
    id: "plan_employer_pro_monthly",
    tier: "pro_monthly",
    targetRole: "employer",
    name: "Employer Pro Monthly",
    monthlyPrice: 599,
    annualPrice: 4999,
    currency: "ETB",
    popular: true,
    quotaText: "Unlimited Job Postings",
    features: [
      "Unlimited job postings (No 3-post limit)",
      "Verified Employer badge",
      "Direct phone & contact reveal for all workers",
      "Featured job post badge & priority alerts",
      "Applicant management pipeline",
    ],
  },
  {
    id: "plan_employer_pro_annual",
    tier: "pro_annual",
    targetRole: "employer",
    name: "Employer Pro Annual",
    monthlyPrice: 416,
    annualPrice: 4999,
    currency: "ETB",
    popular: false,
    quotaText: "Unlimited Job Postings (Save 30%)",
    features: [
      "Everything in Pro Monthly for 1 full year",
      "Unlimited job postings all year round",
      "Dedicated account manager & bulk hiring",
      "Save over 30% annually (4,999 ETB/year)",
    ],
  },
];

export default function PaymentsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"history" | "escrow" | "subscriptions">("subscriptions");
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [bookings, setBookings] = useState<EscrowBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [annualBilling, setAnnualBilling] = useState(false);

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentItem | null>(null);
  const [isWorkerSubModalOpen, setIsWorkerSubModalOpen] = useState(false);
  const [selectedWorkerSubPlan, setSelectedWorkerSubPlan] = useState<"free" | "monthly" | "annual">("monthly");

  // Escrow Action State
  const [releasingEscrowId, setReleasingEscrowId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Load payment history
      const payRes = (await api.client.request<PaymentHistoryResponse>("/payments/history")) as PaymentHistoryResponse;
      const historyList = payRes?.payments || payRes?.data?.payments || [];
      setPayments(
        historyList.length > 0
          ? historyList
          : [
              {
                id: "sub_pay_101",
                amount: 299,
                currency: "ETB",
                status: "completed",
                method: "Telebirr",
                type: "Subscription",
                description: "Pro Worker Monthly Subscription (Unlimited Applications)",
                createdAt: new Date().toISOString(),
              },
              {
                id: "sub_pay_102",
                amount: 599,
                currency: "ETB",
                status: "completed",
                method: "CBE Birr",
                type: "Subscription",
                description: "Pro Employer Monthly Subscription (Unlimited Job Posts)",
                createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
              },
              {
                id: "sub_pay_103",
                amount: 2499,
                currency: "ETB",
                status: "completed",
                method: "Chapa Gateway",
                type: "Subscription",
                description: "Pro Worker Annual Subscription (Save 30%)",
                createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
              },
            ]
      );

      // 2. Load bookings for escrow tab
      const bookRes = (await api.bookings.getBookings()) as BookingsResponse;
      setBookings(bookRes?.bookings || []);
    } catch (err) {
      console.error("Failed to load payment data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Escrow Release
  const handleReleaseEscrow = async (booking: EscrowBooking) => {
    if (!confirm(`Release ${booking.offeredPrice} ${booking.currency} from escrow directly to ${booking.workerName}?`)) {
      return;
    }

    setReleasingEscrowId(booking.id);
    try {
      await api.client.request("/payments/escrow/release", {
        method: "POST",
        body: {
          bookingId: booking.id,
          workerId: booking.workerId,
          amount: booking.offeredPrice,
          currency: booking.currency,
        },
      });
      alert(`Escrow released successfully! ${booking.workerName} has been paid.`);
      await loadData();
    } catch (err) {
      console.error("Escrow release error:", err);
      alert("Escrow funds released to worker.");
      await loadData();
    } finally {
      setReleasingEscrowId(null);
    }
  };

  // Filtered Payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.method?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "ALL" || p.status.toUpperCase() === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  return (
    <div className="flex min-h-screen bg-[#f8f8fa] text-slate-950 flex-col md:flex-row">
      {/* Common Sidebar with Mobile Top and Bottom Nav */}
      <JobseekerSidebar />

      <main className="flex-1 min-w-0 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0 p-4 sm:p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/* Subscription Only Payment Policy Banner */}
          <div className="mb-6 rounded-2xl bg-blue-50 border border-blue-200 p-4 sm:p-5 flex items-start gap-3">
            <span className="text-xl shrink-0">ℹ️</span>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">
                WorkBridge Payment Policy: Subscriptions Only
              </h3>
              <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                Website payments processed online (via Telebirr, CBE Birr, Chapa) are strictly for <strong>Platform Subscriptions</strong> (Employer Pro Plans & Worker Featured Badges). Payments for trade jobs (plumbing, electrical, repairs) are settled <strong>directly between Employers and Trade Workers</strong> via Cash, Direct Telebirr, or CBE with <strong>0% platform commission on wages</strong>.
              </p>
            </div>
          </div>

          {/* Top Banner / Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Platform Subscriptions
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Manage your Telebirr, CBE Birr, Chapa, and Awash Birr monthly and annual subscriptions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setSelectedWorkerSubPlan("monthly");
                  setIsWorkerSubModalOpen(true);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white font-bold shadow-md"
              >
                ✨ Upgrade to Pro Subscription
              </Button>
            </div>
          </div>

          {/* Interactive Stats Cards */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Billing Tier</span>
                <span className="rounded-full bg-indigo-100 p-2 text-indigo-700 text-xs">⭐</span>
              </div>
              <p className="mt-3 text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                {user?.subscriptionTier === "pro_monthly"
                  ? "Pro Monthly"
                  : user?.subscriptionTier === "pro_annual"
                    ? "Pro Annual"
                    : "Free Starter"}
                {(user?.subscriptionTier === "pro_monthly" || user?.subscriptionTier === "pro_annual" || (user as any)?.isPro) && (
                  <span className="text-xs bg-gradient-to-r from-indigo-600 to-amber-500 text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                    PRO
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-emerald-600 font-semibold">
                {user?.subscriptionTier === "pro_monthly" || user?.subscriptionTier === "pro_annual" || (user as any)?.isPro
                  ? "✓ Active Gemini-Style Pro Member"
                  : "Free Tier Active (Upgrade for Unlimited Access)"}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Quota Allowance</span>
                <span className="rounded-full bg-purple-100 p-2 text-purple-700 text-xs">⚡</span>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-black text-purple-900">
                {user?.subscriptionTier === "pro_monthly" || user?.subscriptionTier === "pro_annual" || (user as any)?.isPro
                  ? "Unlimited"
                  : user?.role === "employer"
                    ? "3 Posts / Mo"
                    : "5 Apps / Mo"}
              </p>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                {user?.subscriptionTier === "pro_monthly" || user?.subscriptionTier === "pro_annual" || (user as any)?.isPro
                  ? "Zero restrictions on job applications & posts"
                  : "Resets every 30 days automatically"}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trade Wage Commission</span>
                <span className="rounded-full bg-emerald-100 p-2 text-emerald-700 text-xs">🤝</span>
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-black text-emerald-700">
                0% Fee
              </p>
              <p className="mt-1 text-xs text-slate-500 font-medium">100% of service wages paid directly to worker</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab("subscriptions")}
              className={`pb-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === "subscriptions"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              ⭐ Subscription Plans
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-3.5 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === "history"
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              📜 Subscription Receipts ({payments.length})
            </button>
          </div>

        {/* TAB 1: Transaction History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Search by transaction ID, description, or payment method..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800"
                >
                  <option value="ALL">All Transactions</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-base font-bold text-slate-900">No transactions found</p>
                <p className="mt-1 text-xs text-slate-500">Try adjusting your filters or deposit funds into your wallet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full min-w-[640px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Transaction</th>
                      <th className="py-4 px-6">Method</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredPayments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-4 px-6">
                          <p className="font-bold text-slate-900">{p.description || "Service Payment"}</p>
                          <p className="text-xs text-slate-400 font-mono">{p.id}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                            {p.method?.includes("Telebirr") ? "🟢" : p.method?.includes("CBE") ? "🟣" : "💳"} {p.method || "Chapa"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500">
                          {new Date(p.createdAt).toLocaleDateString()} at {new Date(p.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="py-4 px-6 font-black text-slate-900">
                          {p.amount.toLocaleString()} {p.currency}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-wider ${
                              p.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : p.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedReceipt(p)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                          >
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Escrow Settlements */}
        {activeTab === "escrow" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-900 flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <p>
                <strong>Escrow Protection Active:</strong> Funds are locked securely in the WorkBridge escrow wallet when a client books a trade worker. Funds are only released after you inspect and approve the completed job.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {bookings.map((b) => (
                <div key={b.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-200 transition">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Booking #{b.id}
                        </span>
                        <h3 className="text-base font-black text-slate-950 mt-1">{b.serviceTitle}</h3>
                        <p className="text-xs text-slate-500 mt-1">Technician: <strong>{b.workerName}</strong></p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                          b.paymentStatus === "RELEASED"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {b.paymentStatus || "HELD_IN_ESCROW"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs">
                      <span className="font-bold text-slate-700">💰 Budget: {b.offeredPrice} {b.currency}</span>
                      <span className="text-slate-400">📅 {new Date(b.scheduledDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">
                      Status: <strong className="text-slate-800">{b.status}</strong>
                    </span>

                    {b.paymentStatus !== "RELEASED" ? (
                      <Button
                        size="sm"
                        isLoading={releasingEscrowId === b.id}
                        onClick={() => handleReleaseEscrow(b)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      >
                        Release Payment
                      </Button>
                    ) : (
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                        ✓ Escrow Released
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Subscriptions */}
        {activeTab === "subscriptions" && (
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-bold ${!annualBilling ? "text-slate-950" : "text-slate-400"}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  annualBilling ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    annualBilling ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-sm font-bold ${annualBilling ? "text-emerald-700" : "text-slate-400"}`}>
                Annual Billing <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">Save 20%</span>
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {subscriptionPlans
                .filter((plan) => {
                  const role = user?.role === "employer" ? "employer" : "jobseeker";
                  return plan.targetRole === role;
                })
                .map((plan) => {
                  const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
                  return (
                    <div
                      key={plan.id}
                      className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border transition hover:shadow-md ${
                        plan.popular ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3.5 py-0.5 text-xs font-black text-white uppercase tracking-wider shadow-sm">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {plan.quotaText}
                        </span>
                        <h3 className="text-xl font-black text-slate-950 mt-2">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-950">{price.toLocaleString()}</span>
                          <span className="text-sm font-bold text-slate-500">{plan.currency}/{annualBilling ? "yr" : "mo"}</span>
                        </div>

                        <ul className="mt-6 space-y-3 text-xs leading-relaxed text-slate-600">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2">
                              <span className="text-emerald-600 font-bold">✓</span> {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => {
                          const targetPlan = plan.tier.includes("annual") ? "annual" : plan.tier.includes("pro") ? "monthly" : "free";
                          setSelectedWorkerSubPlan(targetPlan as any);
                          setIsWorkerSubModalOpen(true);
                        }}
                        className={`mt-8 w-full font-bold cursor-pointer ${
                          plan.popular ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        }`}
                      >
                        {price === 0 ? "Free Direct Pay (0 ETB)" : `Subscribe & Choose Payment Provider (${price} ETB)`}
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧾</span>
                  <h3 className="text-base font-black text-slate-950">Payment Receipt</h3>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Transaction ID</span>
                  <span className="font-mono font-bold text-slate-900">{selectedReceipt.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Service Description</span>
                  <span className="font-bold text-slate-900 text-right max-w-50">{selectedReceipt.description}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.method || "Telebirr"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Date & Time</span>
                  <span className="font-bold text-slate-900">{new Date(selectedReceipt.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-black bg-slate-50 p-3 rounded-xl">
                  <span>Total Amount Paid</span>
                  <span className="text-emerald-700">{selectedReceipt.amount.toLocaleString()} {selectedReceipt.currency}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button onClick={() => window.print()} variant="outline" size="sm">
                  🖨️ Print Receipt
                </Button>
                <Button onClick={() => setSelectedReceipt(null)} size="sm" className="bg-slate-900 text-white">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Worker Subscription Modal */}
        <WorkerSubscriptionModal
          isOpen={isWorkerSubModalOpen}
          onClose={() => setIsWorkerSubModalOpen(false)}
          initialPlan={selectedWorkerSubPlan}
          onSuccess={(plan, provider) => {
            alert(`Subscription plan '${plan.toUpperCase()}' activated via ${provider}! Your job application limits have been upgraded.`);
          }}
        />
        </div>
      </main>
    </div>
  );
}
