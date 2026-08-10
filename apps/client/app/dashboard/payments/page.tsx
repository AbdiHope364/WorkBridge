"use client";

import { useState, useEffect } from 'react';
import { paymentService } from '@/lib/payment-service';
import { useAuth } from '@/contexts/auth-context';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  description?: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPaymentHistory();
    }
  }, [user]);

  const loadPaymentHistory = async () => {
    setLoading(true);
    try {
      const data = await paymentService.getPaymentHistory(user?.id || '');
      setPayments(data);
    } catch (error) {
      console.error('Failed to load payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: string) => {
    try {
      // Implementation for subscription
      console.log('Subscribing to plan:', plan);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const plans = [
    { id: 'basic', name: 'Basic', price: '$9/month', features: ['5 job applications', 'Basic support'] },
    { id: 'pro', name: 'Pro', price: '$29/month', features: ['Unlimited applications', 'Priority support', 'Profile boost'] },
    { id: 'enterprise', name: 'Enterprise', price: '$99/month', features: ['All Pro features', 'Dedicated account manager', 'Custom solutions'] },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Payments & Subscriptions</h1>

      {/* Subscription Plans */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-teal-600 mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment History */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No payment history found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{payment.description || 'Payment'}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {payment.currency} {payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                        ${payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${payment.status === 'failed' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
