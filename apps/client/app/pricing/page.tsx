"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Container, Button } from "@repo/ui";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";
import { MockCheckoutModal } from "@/features/pricing/components/mock-checkout-modal";
import type { SubscriptionPlan, UserQuotas } from "@repo/types";
import Link from "next/link";

export default function PricingPage() {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [quotas, setQuotas] = useState<UserQuotas | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Set default role tab to logged-in user's role
  useEffect(() => {
    if (user?.role === "employer") {
      setTargetRole("employer");
    } else {
      setTargetRole("jobseeker");
    }
  }, [user]);

  const loadData = useCallback(async () => {
    try {
      const [plansRes, currentRes] = await Promise.all([
        fetch("/api/subscriptions/plans"),
        user ? fetch("/api/subscriptions/current") : Promise.resolve(null),
      ]);

      if (plansRes.ok) {
        const data = await plansRes.json();
        setPlans(data.plans || []);
      }

      if (currentRes && currentRes.ok) {
        const data = await currentRes.json();
        setQuotas(data.quotas || null);
      }
    } catch (err) {
      console.error("Failed to load plans:", err);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredPlans = plans.filter((p) => p.targetRole === targetRole);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.tier === "free") return;
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Simple, Transparent Freemium Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Accelerate Your Work with WorkBridge Pro
          </h1>
          <p className="text-slate-600 text-lg">
            Start completely for free. Upgrade when you need unlimited applications, verified trade badges, or priority job postings.
          </p>

          {/* Role Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300">
            <button
              onClick={() => setTargetRole("jobseeker")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                targetRole === "jobseeker"
                  ? "bg-white text-emerald-800 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              👷 For Tradesmen & Workers
            </button>
            <button
              onClick={() => setTargetRole("employer")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                targetRole === "employer"
                  ? "bg-white text-emerald-800 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🏢 For Employers & Clients
            </button>
          </div>

          {/* Current Quota Banner for logged-in users */}
          {user && quotas ? (
            <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm inline-flex items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" /> Current Plan: {quotas.isPro ? "Pro Member" : "Free Starter"}
              </span>
              <span className="text-slate-300">|</span>
              {user.role === "jobseeker" ? (
                <span>
                  Applications:{" "}
                  <strong>
                    {quotas.applicationsRemaining === -1
                      ? "Unlimited (Pro)"
                      : `${quotas.applicationsRemaining} of 5 remaining`}
                  </strong>
                </span>
              ) : (
                <span>
                  Job Posts:{" "}
                  <strong>
                    {quotas.jobPostsRemaining === -1
                      ? "Unlimited (Pro)"
                      : `${quotas.jobPostsRemaining} of 3 remaining`}
                  </strong>
                </span>
              )}
            </div>
          ) : null}

          {/* 0% Commission Guarantee Card */}
          <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4 border border-emerald-500/30 text-left">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4" /> 100% Direct Settlement Model
              </div>
              <h3 className="text-base font-bold text-white">0% Platform Fee on Trade Wages</h3>
              <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                WorkBridge takes zero commission from tradesmen earnings. Clients pay workers directly upon job completion. Subscriptions only cover platform listing and application quotas.
              </p>
            </div>
            <div className="shrink-0 bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-2 rounded-xl text-center">
              <span className="block text-2xl font-black text-emerald-400">0%</span>
              <span className="text-[9px] text-slate-300 uppercase font-bold tracking-wider">Commission</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {filteredPlans.map((plan) => {
            const isCurrent =
              quotas &&
              ((plan.tier === "free" && !quotas.isPro) ||
                (plan.tier === quotas.tier));

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all flex flex-col justify-between ${
                  plan.isPopular
                    ? "bg-slate-900 text-white shadow-2xl ring-4 ring-emerald-500/30 scale-105 z-10"
                    : "bg-white text-slate-900 border border-slate-200 shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.isPopular ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                ) : null}

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3
                      className={`text-xl font-bold ${
                        plan.isPopular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  <p
                    className={`text-sm mb-6 ${
                      plan.isPopular ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price === 0 ? "Free" : `${plan.price.toLocaleString()} ETB`}
                    </span>
                    {plan.price > 0 ? (
                      <span
                        className={`text-xs ${
                          plan.isPopular ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        /{plan.interval === "monthly" ? "month" : "year"}
                      </span>
                    ) : null}
                  </div>

                  <div
                    className={`border-t mb-6 ${
                      plan.isPopular ? "border-slate-800" : "border-slate-100"
                    }`}
                  />

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.isPopular ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        />
                        <span
                          className={
                            plan.isPopular ? "text-slate-200" : "text-slate-700"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to action */}
                <div>
                  {isCurrent ? (
                    <div
                      className={`w-full py-3 rounded-xl text-center font-bold text-sm ${
                        plan.isPopular
                          ? "bg-slate-800 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      ✓ Your Current Plan
                    </div>
                  ) : plan.price === 0 ? (
                    <Link
                      href="/register"
                      className="block w-full py-3 rounded-xl text-center font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                    >
                      Get Started Free
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition ${
                        plan.isPopular
                          ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                    >
                      Upgrade with Mock Payment <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ & Safe Demo Note */}
        <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
          <h4 className="text-lg font-bold text-slate-900">
            Simulated Ethiopian Payment Gateway & Platform Model
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            WorkBridge operates on a <strong>pure subscription access model</strong>. We charge <strong>0% commission</strong> on client-worker trade service transactions. Clients pay workers directly upon service inspection (Cash or Telebirr P2P).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <strong>Prototype Demo Notice:</strong> Platform subscription upgrades (Telebirr, CBE Birr, Chapa) run on a sandbox simulation engine for educational and evaluation purposes, granting instant Pro access without real monetary charges.
          </p>
        </div>
      </Container>

      {/* Mock Checkout Modal */}
      <MockCheckoutModal
        plan={selectedPlan}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
}
