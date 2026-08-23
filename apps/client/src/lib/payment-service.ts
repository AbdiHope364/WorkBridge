"use client";

import { api } from './api';
import { loadStripe } from '@stripe/stripe-js';

// For Chapa (Ethiopia/Africa)
interface ChapaPaymentResponse {
  checkout_url: string;
  transaction_id: string;
}

// For Stripe
interface StripePaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

class PaymentService {
  async initializeChapaPayment(applicationId: string): Promise<ChapaPaymentResponse> {
    return api.payments.createChapaCheckout(applicationId);
  }

  async initializeStripePayment(amount: number, currency: string = 'usd') {
    const response = await api.payments.createIntent({ amount, currency });
    return response;
  }

  async confirmPayment(paymentIntentId: string) {
    return api.payments.confirm({ paymentIntentId });
  }

  async getPaymentHistory(userId: string) {
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
