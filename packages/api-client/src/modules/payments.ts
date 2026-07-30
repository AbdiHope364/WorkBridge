import type { PaymentIntent } from "@repo/types/payments";
import type { ApiClient } from "../http";

export function createPaymentsService(api: ApiClient) {
  return {
    createChapaCheckout(applicationId: string) {
      return api.request<PaymentIntent>("/payments/chapa/checkout", {
        method: "POST",
        body: { applicationId },
      });
    },
  };
}
