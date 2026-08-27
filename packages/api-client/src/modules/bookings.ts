import type { Booking, CreateBookingDto, UpdateBookingStatusDto } from "@repo/types/bookings";
import type { ApiClient } from "../http";

export function createBookingsService(api: ApiClient) {
  return {
    getBookings(params?: { role?: "client" | "worker"; status?: string }) {
      const searchParams = new URLSearchParams();
      if (params?.role) searchParams.set("role", params.role);
      if (params?.status) searchParams.set("status", params.status);
      const query = searchParams.toString();
      return api.request<{ bookings: Booking[]; total: number }>(
        `/bookings${query ? `?${query}` : ""}`,
      );
    },

    getBookingById(id: string) {
      return api.request<{ booking: Booking }>(`/bookings/${id}`);
    },

    createBooking(payload: CreateBookingDto) {
      return api.request<{ booking: Booking; message: string }>("/bookings", {
        method: "POST",
        body: payload,
      });
    },

    updateBookingStatus(id: string, payload: UpdateBookingStatusDto) {
      return api.request<{ booking: Booking; message: string }>(
        `/bookings/${id}/status`,
        {
          method: "PATCH",
          body: payload,
        },
      );
    },
  };
}

