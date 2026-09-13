"use client";

import { useState } from "react";
import { Modal, Button } from "@repo/ui";
import type { SubscriptionPlan, MockPaymentMethod } from "@repo/types";
import { CheckCircle2, ShieldCheck, Zap, AlertCircle } from "lucide-react";

interface MockCheckoutModalProps {
  plan: SubscriptionPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MockCheckoutModal({
  plan,
  isOpen,
  onClose,
  onSuccess,
}: MockCheckoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<MockPaymentMethod>("telebirr");
  const [phoneNumber, setPhoneNumber] = useState("0912345678");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!plan) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/subscriptions/mock-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          paymentMethod: selectedMethod,
          phoneNumber,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process mock payment.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSuccess ? "Subscription Activated!" : `Upgrade to ${plan.name}`}
      size="md"
    >
      {isSuccess ? (
        <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Payment Successful!</h3>
          <p className="text-sm text-slate-600 max-w-xs">
            Thank you! Your <strong>{plan.name}</strong> is now active. Refreshing your dashboard...
          </p>
        </div>
      ) : (
        <div className="space-y-4 py-1">
          {/* Header Subtitle */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4" /> Instant Demo Activation
          </div>

          {/* Demo Notice Banner */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Demo/Simulation Mode:</strong> No real money will be charged. This simulates Ethiopian mobile payment rails (Telebirr / Chapa / CBE Birr).
            </div>
          </div>

          {/* Plan Summary Card */}
          <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl flex justify-between items-center">
            <div>
              <div className="font-bold text-slate-900 text-sm">{plan.name}</div>
              <div className="text-xs text-slate-500">{plan.durationDays} Days Access</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-emerald-700">
                {plan.price.toLocaleString()} ETB
              </div>
              <div className="text-[11px] text-slate-400">Total Billed</div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod("telebirr")}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === "telebirr"
                    ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 text-emerald-950 font-bold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                <span className="text-lg">📱</span>
                <span className="text-xs font-semibold">Telebirr</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("chapa")}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === "chapa"
                    ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 text-emerald-950 font-bold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                <span className="text-lg">💳</span>
                <span className="text-xs font-semibold">Chapa</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("cbe_birr")}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  selectedMethod === "cbe_birr"
                    ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 text-emerald-950 font-bold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                <span className="text-lg">🏦</span>
                <span className="text-xs font-semibold">CBE Birr</span>
              </button>
            </div>
          </div>

          {/* Mock Phone Number Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {selectedMethod === "telebirr"
                ? "Telebirr Mobile Number"
                : selectedMethod === "cbe_birr"
                ? "CBE Birr Account / Phone"
                : "Billing Mobile Number"}
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="09..."
            />
          </div>

          {error ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              type="button"
              onClick={handlePay}
              isLoading={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/20"
            >
              Pay {plan.price.toLocaleString()} ETB & Activate
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isProcessing}
              className="w-full text-slate-500 text-xs hover:text-slate-700"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Simulated 256-bit SSL Secure Checkout
          </div>
        </div>
      )}
    </Modal>
  );
}

