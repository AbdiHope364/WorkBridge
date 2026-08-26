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

  async getPaymentHistory(_userId?: string): Promise<PaymentItem[]> {
    // This would use the payments API to get history
    // For now, return empty array or mock data
    return [];
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
