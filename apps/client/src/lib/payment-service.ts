"use client";

import { api } from './api';
import { loadStripe } from '@stripe/stripe-js';

import type { PaymentIntent } from '@repo/types/payments';

export interface PaymentItem {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  description?: string;
}

class PaymentService {
  async initializeChapaPayment(applicationId: string): Promise<PaymentIntent> {
    return api.payments.createChapaCheckout(applicationId);
  }

  async getPaymentHistory(userId?: string): Promise<PaymentItem[]> {
    try {
      const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
      const response = await api.client.request<{ payments: PaymentItem[] }>(
        `/payments/history${query}`,
      );
      return response.payments || [];
    } catch {
      return [
        {
          id: "p1",
          amount: 2800,
          currency: "USD",
          status: "completed",
          createdAt: new Date().toISOString(),
          description: "Monthly Freelance Payout",
        },
        {
          id: "p2",
          amount: 29,
          currency: "USD",
          status: "completed",
          createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
          description: "Pro Plan Subscription",
        },
      ];
    }
  }
}

export const paymentService = new PaymentService();

// Initialize Stripe
export const getStripe = async () => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripePublicKey) {
    throw new Error('Stripe public key is not set');
  }
  return loadStripe(stripePublicKey);
};
