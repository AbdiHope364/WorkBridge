"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@repo/ui";
import type { Booking, BookingStatus } from "@repo/types/bookings";

interface BookingsListProps {
  role: "worker" | "client";
  onStatusChange?: () => void;
}

const statusBadgeStyles: Record<BookingStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  ACCEPTED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  DECLINED: "bg-rose-100 text-rose-800 border-rose-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED: "bg-purple-100 text-purple-800 border-purple-200",
  CANCELLED: "bg-slate-100 text-slate-800 border-slate-200",
};

export function BookingsList({ role, onStatusChange }: BookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await api.bookings.getBookings({
        role,
        status: filterStatus === "ALL" ? undefined : filterStatus,
      });
      setBookings(res.bookings || []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [role, filterStatus]);

  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      setActionLoadingId(bookingId);
      await api.bookings.updateBookingStatus(bookingId, { status: newStatus });
      await loadBookings();
      onStatusChange?.();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(err instanceof Error ? err.message : "Failed to update booking status");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Status Filter Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {role === "worker" ? "Incoming Client Bookings & Requests" : "My Booked Trade Services"}
          </h2>
          <p className="text-xs text-slate-500">
            {role === "worker"
              ? "Review direct client hire requests, accept jobs, and manage on-site task completion."
              : "Track booked technicians, schedule confirmation, and job status in real time."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5">
          {["ALL", "PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === st
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
            📅
          </div>
          <h3 className="text-base font-bold text-slate-900">No bookings found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            {role === "worker"
              ? "You do not have any bookings matching this filter. Keep your profile verified to receive direct client requests."
              : "You have not booked any trade professionals yet. Browse verified electricians, plumbers, and carpenters to book."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {bookings.map((b) => {
            const isWorker = role === "worker";
            const isLoadingThis = actionLoadingId === b.id;

            return (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-emerald-200 hover:shadow-md transition"
              >
                <div>
                  {/* Top info row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        {isWorker ? (
                          b.clientAvatar ? (
                            <img src={b.clientAvatar} alt={b.clientName} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-bold text-slate-700">
                              {b.clientName.charAt(0)}
                            </div>
                          )
                        ) : b.workerAvatar ? (
                          <img src={b.workerAvatar} alt={b.workerName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-emerald-700">
                            {b.workerName.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {isWorker ? `Client: ${b.clientName}` : `Worker: ${b.workerName}`}
                        </p>
                        <h3 className="text-base font-black text-slate-950 line-clamp-1">{b.serviceTitle}</h3>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                        statusBadgeStyles[b.status] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {b.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-xl bg-slate-50 px-2.5 py-1 font-semibold text-slate-700 border border-slate-100">
                      📍 {b.locationNeighborhood || b.address}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-xl bg-slate-50 px-2.5 py-1 font-semibold text-slate-700 border border-slate-100">
                      📅 {new Date(b.scheduledDate).toLocaleDateString()} at {new Date(b.scheduledDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-2.5 py-1 font-black text-emerald-800 border border-emerald-100">
                      💰 {b.offeredPrice} {b.currency}
                    </span>
                    {b.urgency.includes("Emergency") && (
                      <span className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-2.5 py-1 font-bold text-rose-700 border border-rose-100">
                        🚨 Emergency
                      </span>
                    )}
                  </div>

                  {/* Contact row */}
                  {(b.clientPhone || b.workerPhone) && (
                    <div className="mt-3 text-xs text-slate-500 font-medium">
                      📞 Contact Phone:{" "}
                      <span className="font-bold text-slate-800">
                        {isWorker ? b.clientPhone || "Available upon accept" : b.workerPhone || "+251 911 000 000"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  {isWorker && b.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        isLoading={isLoadingThis}
                        onClick={() => handleUpdateStatus(b.id, "DECLINED")}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        isLoading={isLoadingThis}
                        onClick={() => handleUpdateStatus(b.id, "ACCEPTED")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      >
                        Accept Booking
                      </Button>
                    </>
                  )}

                  {isWorker && b.status === "ACCEPTED" && (
                    <Button
                      size="sm"
                      isLoading={isLoadingThis}
                      onClick={() => handleUpdateStatus(b.id, "IN_PROGRESS")}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    >
                      Start Work
                    </Button>
                  )}

                  {isWorker && b.status === "IN_PROGRESS" && (
                    <Button
                      size="sm"
                      isLoading={isLoadingThis}
                      onClick={() => handleUpdateStatus(b.id, "COMPLETED")}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                    >
                      Mark Completed
                    </Button>
                  )}

                  {!isWorker && b.status === "PENDING" && (
                    <Button
                      size="sm"
                      variant="outline"
                      isLoading={isLoadingThis}
                      onClick={() => handleUpdateStatus(b.id, "CANCELLED")}
                      className="text-slate-600"
                    >
                      Cancel Request
                    </Button>
                  )}

                  {b.status === "COMPLETED" && (
                    <span className="text-xs font-bold text-purple-700">
                      ✓ Service Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
