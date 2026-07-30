export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: "ETB";
  status: PaymentStatus;
  checkoutUrl?: string;
  createdAt: string;
}
