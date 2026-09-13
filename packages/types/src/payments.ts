export type PaymentStatus = "pending" | "paid" | "completed" | "failed" | "refunded";

export type MockPaymentMethod = "telebirr" | "chapa" | "cbe_birr";

export type SubscriptionTier = "free" | "pro_monthly" | "pro_annual";

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "past_due";

export type UserTargetRole = "jobseeker" | "employer";

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  targetRole: UserTargetRole;
  name: string;
  description: string;
  price: number;
  currency: "ETB";
  interval: "monthly" | "annual" | "free";
  durationDays: number;
  features: string[];
  applicationLimit?: number; // undefined or -1 means unlimited
  jobPostLimit?: number;      // undefined or -1 means unlimited
  isPopular?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  planId: string;
  targetRole: UserTargetRole;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  paymentId?: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockPaymentRequest {
  planId: string;
  paymentMethod: MockPaymentMethod;
  phoneNumber?: string;
  accountNumber?: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  subscriptionId?: string;
  bookingId?: string;
  amount: number;
  currency: "ETB";
  status: PaymentStatus;
  paymentMethod: MockPaymentMethod | string;
  transactionReference: string;
  description: string;
  createdAt: string;
}

export interface UserQuotas {
  tier: SubscriptionTier;
  isPro: boolean;
  applicationsUsed: number;
  applicationsLimit: number; // -1 for unlimited
  applicationsRemaining: number; // -1 for unlimited
  jobPostsUsed: number;
  jobPostsLimit: number; // -1 for unlimited
  jobPostsRemaining: number; // -1 for unlimited
  subscriptionExpiresAt?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: "ETB";
  status: PaymentStatus;
  checkoutUrl?: string;
  createdAt: string;
}
