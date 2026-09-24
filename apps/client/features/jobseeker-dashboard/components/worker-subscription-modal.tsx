"use client";

import { useState } from "react";
import { Button, Input } from "@repo/ui";

export interface WorkerSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: "free" | "monthly" | "annual";
  onSuccess?: (plan: string, provider: string) => void;
}

const PLANS = [
  {
    id: "free",
    name: "Free Direct Pay",
    priceText: "0 ETB",
    period: "Forever",
    badge: "5 Free Apps / Month",
    color: "border-slate-200 bg-slate-50 text-slate-900",
    description: "5 Free job applications per month. Free direct client wage settlement with 0% platform commission.",
  },
  {
    id: "monthly",
    name: "Monthly Subscription",
    priceText: "299 ETB",
    period: "/ month",
    badge: "Unlimited Applications",
    popular: true,
    color: "border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20",
    description: "Unlimited job applications every month, Verified Pro Worker badge, and priority search placement.",
  },
  {
    id: "annual",
    name: "Annual Subscription",
    priceText: "2,499 ETB",
    period: "/ year",
    badge: "Save 30% (2 Months Free)",
    color: "border-teal-500 bg-teal-50/50 text-teal-950",
    description: "Unlimited job applications all year round, highest search ranking, and 30% discount vs monthly billing.",
  },
];

const PAYMENT_PROVIDERS = [
  {
    id: "Telebirr",
    name: "Telebirr Mobile Wallet",
    icon: "🟢",
    badge: "Ethio Telecom",
    color: "border-emerald-500 bg-emerald-50/60 text-emerald-950",
  },
  {
    id: "CBE Birr",
    name: "CBE Birr",
    icon: "🟣",
    badge: "Commercial Bank of Ethiopia",
    color: "border-purple-500 bg-purple-50/60 text-purple-950",
  },
  {
    id: "Chapa",
    name: "Chapa Gateway",
    icon: "💳",
    badge: "Cards & Banking Apps",
    color: "border-sky-500 bg-sky-50/60 text-sky-950",
  },
  {
    id: "Awash Birr",
    name: "Awash Birr / Bank Transfer",
    icon: "🏛️",
    badge: "Awash Bank",
    color: "border-amber-500 bg-amber-50/60 text-amber-950",
  },
];

export function WorkerSubscriptionModal({
  isOpen,
  onClose,
  initialPlan = "monthly",
  onSuccess,
}: WorkerSubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "monthly" | "annual">(initialPlan);
  const [selectedProvider, setSelectedProvider] = useState("Telebirr");
  const [phone, setPhone] = useState("+251 ");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.(selectedPlan, selectedProvider);
        onClose();
        setSuccess(false);
      }, 1800);
    }, 1000);
  };

  const activePlanObj = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <h2 className="text-lg font-black text-slate-950">Job Application Subscription</h2>
            </div>
            <p className="text-xs text-slate-500">
              Select your subscription plan & preferred payment provider
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-950">Subscription Activated!</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md">
                Your <strong>{activePlanObj.name}</strong> ({activePlanObj.priceText}) has been successfully funded via <strong>{selectedProvider}</strong>. Enjoy unlimited job applications!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Select Plan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Choose Job Application Plan
                </label>
                <div className="grid gap-3">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id as any)}
                      className={`relative flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition ${
                        selectedPlan === plan.id ? plan.color : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === plan.id}
                          onChange={() => setSelectedPlan(plan.id as any)}
                          className="mt-1 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-slate-950">{plan.name}</span>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              {plan.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{plan.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-base font-black text-slate-950">{plan.priceText}</span>
                        <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Payment Provider */}
              {selectedPlan !== "free" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    2. Select Payment Provider
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PAYMENT_PROVIDERS.map((provider) => (
                      <button
                        type="button"
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition cursor-pointer ${
                          selectedProvider === provider.id
                            ? provider.color
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="text-xl">{provider.icon}</span>
                        <div>
                          <div className="text-xs font-bold">{provider.name}</div>
                          <div className="text-[10px] text-slate-500">{provider.badge}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Registered Phone */}
                  <div className="mt-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Registered {selectedProvider} Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 911 000 000"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  {selectedPlan === "free"
                    ? "Confirm Free Direct Pay Plan"
                    : `Pay & Subscribe (${activePlanObj.priceText}) via ${selectedProvider}`}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

