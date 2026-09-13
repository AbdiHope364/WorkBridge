import type {
  PaymentIntent,
  SubscriptionPlan,
  UserSubscription,
  MockPaymentRequest,
  PaymentTransaction,
  UserQuotas,
} from "@repo/types";
import type { ApiClient } from "../http";

export function createPaymentsService(api: ApiClient) {
  return {
    getSubscriptionPlans(targetRole?: "jobseeker" | "employer") {
      const query = targetRole ? `?targetRole=${targetRole}` : "";
      return api.request<{ plans: SubscriptionPlan[] }>(`/subscriptions/plans${query}`);
    },

    getCurrentSubscription() {
      return api.request<{
        subscription: UserSubscription | null;
        quotas: UserQuotas;
      }>("/subscriptions/current");
    },

    getUserQuotas() {
      return api.request<UserQuotas>("/subscriptions/quotas");
    },

    processMockCheckout(payload: MockPaymentRequest) {
      return api.request<{
        success: boolean;
        message: string;
        subscription: UserSubscription;
        transaction: PaymentTransaction;
      }>("/subscriptions/mock-checkout", {
        method: "POST",
        body: payload,
      });
    },

    getPaymentHistory() {
      return api.request<{ transactions: PaymentTransaction[] }>("/payments/history");
    },

    createChapaCheckout(applicationId: string) {
      return api.request<PaymentIntent>("/payments/chapa/checkout", {
        method: "POST",
        body: { applicationId },
      });
    },
  };
}
