"use client";

import React, { useState } from "react";
import {
  Check,
  Crown,
  Building2,
  Users,
  Briefcase,
  MessageSquare,
  CreditCard,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
  features: PlanFeature[];
  popular?: boolean;
  icon: React.ElementType;
  color: string;
  badge?: string;
}

const mockPlans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for getting started",
    price: 0,
    currency: "USD",
    interval: "monthly",
    icon: Users,
    color: "bg-slate-500",
    features: [
      { label: "3 job postings per month", included: true },
      { label: "Basic support", included: true },
      { label: "5 applications per month", included: true },
      { label: "Company profile", included: true },
      { label: "Advanced analytics", included: false },
      { label: "Priority support", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing businesses",
    price: 49,
    currency: "USD",
    interval: "monthly",
    popular: true,
    icon: Briefcase,
    color: "bg-[#4100F2]",
    badge: "Most Popular",
    features: [
      { label: "25 job postings per month", included: true },
      { label: "Priority support", included: true },
      { label: "Unlimited applications", included: true },
      { label: "Company profile", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Priority support", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "For large organizations",
    price: 99,
    currency: "USD",
    interval: "monthly",
    icon: Building2,
    color: "bg-amber-500",
    features: [
      { label: "Unlimited job postings", included: true },
      { label: "24/7 Priority support", included: true },
      { label: "Unlimited applications", included: true },
      { label: "Company profile", included: true },
      { label: "Advanced analytics", included: true },
      { label: "Priority support", included: true },
      { label: "API access", included: true },
    ],
  },
];

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const handleSubscribe = (planId: string) => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to plan: ${planId} (${billingInterval})`);
  };

  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Subscription Plans
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              Choose the plan that best fits your needs
            </p>
          </div>
          {/* Billing Toggle */}
          <div className="flex items-center bg-slate-50 p-1 rounded-lg">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={cn(
                "px-4 py-1.5 rounded-md text-[10px] font-black transition-all",
                billingInterval === "monthly"
                  ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval("yearly")}
              className={cn(
                "px-4 py-1.5 rounded-md text-[10px] font-black transition-all",
                billingInterval === "yearly"
                  ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              Yearly <span className="text-emerald-500">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const Icon = plan.icon;
            const yearlyPrice = plan.price * 12 * 0.8; // 20% discount

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-xl border-2 transition-all cursor-pointer",
                  isSelected
                    ? "border-[#4100F2] bg-purple-50/30 shadow-lg shadow-purple-100"
                    : "border-slate-100 hover:border-slate-300",
                  plan.popular && "border-amber-200 bg-amber-50/30",
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-2 right-4">
                    <span className="px-3 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center mb-2",
                          plan.color,
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-base font-black text-slate-800">
                        {plan.name}
                      </h5>
                      <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                        {plan.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#4100F2] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-black text-slate-900">
                      $
                      {billingInterval === "monthly"
                        ? plan.price
                        : Math.round(yearlyPrice)}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      /{billingInterval === "monthly" ? "mo" : "yr"}
                    </span>
                    {billingInterval === "yearly" && plan.price > 0 && (
                      <p className="text-[9px] font-medium text-emerald-600 mt-0.5">
                        Save ${Math.round(plan.price * 12 - yearlyPrice)}{" "}
                        annually
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "w-3 h-3 flex-shrink-0",
                            feature.included
                              ? "text-emerald-500"
                              : "text-slate-300",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] font-medium",
                            feature.included
                              ? "text-slate-700"
                              : "text-slate-400 line-through",
                          )}
                        >
                          {feature.label}
                        </span>
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <button className="text-[9px] font-bold text-[#4100F2] hover:underline">
                        +{plan.features.length - 4} more features
                      </button>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id);
                    }}
                    className={cn(
                      "w-full py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95",
                      isSelected
                        ? "bg-[#4100F2] text-white hover:bg-[#2B00A1] shadow-md shadow-purple-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    )}
                  >
                    {plan.price === 0 ? "Get Started" : "Subscribe Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
