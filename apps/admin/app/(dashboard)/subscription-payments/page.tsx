// app/subscription-payments/page.tsx
"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { SubscriptionStats } from "@/features/subscriptions/components/subscription-stats";
import { SubscriptionPlans } from "@/features/subscriptions/components/subscription-plans";
import { PaymentHistory } from "@/features/subscriptions/components/payment-history";
import { ActiveSubscriptions } from "@/features/subscriptions/components/active-subscriptions";

export default function SubscriptionPaymentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Subscription & Payments"
        description="Manage platform subscriptions and payment transactions"
      />
      <main className="flex-1">
        <SubscriptionStats />
        <div className="px-10 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SubscriptionPlans />
            </div>
            <div className="lg:col-span-1">
              <ActiveSubscriptions />
            </div>
          </div>
          <div className="mt-6">
            <PaymentHistory />
          </div>
        </div>
      </main>
    </div>
  );
}
