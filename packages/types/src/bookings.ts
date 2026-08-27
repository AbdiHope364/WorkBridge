export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TradeCategory =
  | "Electrician"
  | "Plumber"
  | "Carpenter"
  | "HVAC & Cooling"
  | "Masonry & Construction"
  | "Painting & Finishing"
  | "Appliance Repair"
  | "Welder & Metalwork"
  | "General Labor"
  | "Cleaner"
  | string;

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAvatar?: string;
  workerId: string;
  workerName: string;
  workerAvatar?: string;
  workerTrade?: string;
  workerPhone?: string;
  serviceTitle: string;
  category: TradeCategory;
  description: string;
  address: string;
  locationNeighborhood?: string;
  scheduledDate: string;
  urgency: "Emergency / Immediate" | "Same Day" | "Scheduled";
  offeredPrice: number;
  currency: string;
  status: BookingStatus;
  notes?: string;
  paymentStatus?: "UNPAID" | "ESCROWED" | "PAID" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  workerId: string;
  serviceTitle: string;
  category: string;
  description: string;
  address: string;
  locationNeighborhood?: string;
  scheduledDate: string;
  urgency?: "Emergency / Immediate" | "Same Day" | "Scheduled";
  offeredPrice: number;
  currency?: string;
  clientPhone?: string;
}

export interface UpdateBookingStatusDto {
  status: BookingStatus;
  notes?: string;
}

