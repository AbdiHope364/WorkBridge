"use client";

import { useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import { Button, Input } from "@repo/ui";
import type { TradeCategory } from "@repo/types/bookings";

interface WorkerToBook {
  id: string;
  name: string;
  avatar?: string;
  trade?: string;
  hourlyRate?: number | string;
  currency?: string;
  location?: string;
  phone?: string;
  isEmergencyAvailable?: boolean;
}

interface BookWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: WorkerToBook;
  onBookingSuccess?: () => void;
}

const tradeCategories: TradeCategory[] = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "HVAC & Cooling",
  "Masonry & Construction",
  "Painting & Finishing",
  "Appliance Repair",
  "Welder & Metalwork",
  "General Labor",
  "Cleaner",
];

export function BookWorkerModal({
  isOpen,
  onClose,
  worker,
  onBookingSuccess,
}: BookWorkerModalProps) {
  const [serviceTitle, setServiceTitle] = useState("");
  const [category, setCategory] = useState<string>(worker.trade || "Electrician");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState(worker.location || "Addis Ababa");
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [urgency, setUrgency] = useState<"Emergency / Immediate" | "Same Day" | "Scheduled">(
    worker.isEmergencyAvailable ? "Emergency / Immediate" : "Scheduled"
  );
  const [offeredPrice, setOfferedPrice] = useState<number | string>(
    typeof worker.hourlyRate === "number" ? worker.hourlyRate * 3 : 1500
  );
  const currency = worker.currency || "ETB";
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!serviceTitle.trim()) {
      setError("Please enter the service or task title.");
      return;
    }
    if (!address.trim()) {
      setError("Please provide the physical site address.");
      return;
    }
    if (!description.trim()) {
      setError("Please describe the physical job requirements.");
      return;
    }
    if (!offeredPrice || Number(offeredPrice) <= 0) {
      setError("Please specify a valid price offer.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.bookings.createBooking({
        workerId: worker.id,
        serviceTitle: serviceTitle.trim(),
        category,
        description: description.trim(),
        address: address.trim(),
        locationNeighborhood: neighborhood.trim(),
        scheduledDate: new Date(scheduledDate).toISOString(),
        urgency,
        offeredPrice: Number(offeredPrice),
        currency,
        clientPhone: clientPhone.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        onBookingSuccess?.();
        onClose();
        setSuccess(false);
      }, 1800);
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit booking request. Please make sure you are signed in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-emerald-50">
              {worker.avatar ? (
                <Image
                  src={worker.avatar}
                  alt={worker.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-bold text-emerald-700">
                  {worker.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-950">Book {worker.name}</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  {worker.trade || "Skilled Specialist"}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Rate: {worker.hourlyRate || 350} {worker.currency || "ETB"}/hr • Location: {worker.location || "Addis Ababa"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-950">Booking Request Sent!</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md">
                We have notified <span className="font-semibold">{worker.name}</span>. You will receive an instant alert once the worker accepts your request.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                  {error}
                </div>
              )}

              {/* Service Title & Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service / Task Needed *
                  </label>
                  <Input
                    placeholder="e.g. Fix Kitchen Pipe Leak, Rewire Breaker"
                    value={serviceTitle}
                    onChange={(e) => setServiceTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Trade Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {tradeCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Physical Site Address & Neighborhood */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Physical Site Address *
                  </label>
                  <Input
                    placeholder="e.g. Bole Atlas, Villa 24 / Apartment 3B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Neighborhood / City
                  </label>
                  <Input
                    placeholder="e.g. Bole, CMC, Kazanchis, Addis Ababa"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />
                </div>
              </div>

              {/* Date, Urgency & Price Offer */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Scheduled Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Urgency Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as typeof urgency)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Emergency / Immediate">🚨 Emergency (Immediate)</option>
                    <option value="Same Day">⚡ Same Day</option>
                    <option value="Scheduled">📅 Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Offered Budget ({currency}) *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="1500"
                      value={offeredPrice}
                      onChange={(e) => setOfferedPrice(e.target.value)}
                      required
                    />
                    <span className="inline-flex items-center justify-center px-3 rounded-xl border border-slate-200 bg-slate-100 text-xs font-black text-slate-800">
                      ETB
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Phone for quick on-site coordination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Contact Phone Number (for worker call)
                </label>
                <Input
                  type="tel"
                  placeholder="+251 911 000 000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>

              {/* Task Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Job Details & Problem Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-3.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Direct Settlement Notice */}
              <div className="rounded-xl bg-emerald-50/90 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-start gap-2.5">
                <span className="font-bold shrink-0 mt-0.5">💡 Direct Settlement:</span>
                <span>Clients pay tradesmen directly upon job completion (Cash / Telebirr P2P). WorkBridge charges <strong>0% commission</strong> on service wages.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Send Booking Request
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

