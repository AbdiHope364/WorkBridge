"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Eye,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  company: string;
  plan: string;
  amount: number;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed" | "refunded";
  method: string;
  invoice: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    company: "TechCorp Solutions",
    plan: "Business",
    amount: 99,
    currency: "USD",
    date: "Jun 1, 2025",
    status: "completed",
    method: "Visa •••• 4242",
    invoice: "INV-001",
  },
  {
    id: "2",
    company: "Green Energy Ltd",
    plan: "Pro",
    amount: 49,
    currency: "USD",
    date: "May 15, 2025",
    status: "completed",
    method: "Mastercard •••• 5555",
    invoice: "INV-002",
  },
  {
    id: "3",
    company: "Global Logistics",
    plan: "Pro",
    amount: 49,
    currency: "USD",
    date: "May 10, 2025",
    status: "failed",
    method: "Visa •••• 1111",
    invoice: "INV-003",
  },
  {
    id: "4",
    company: "Future Health",
    plan: "Business",
    amount: 99,
    currency: "USD",
    date: "May 5, 2025",
    status: "refunded",
    method: "PayPal",
    invoice: "INV-004",
  },
  {
    id: "5",
    company: "Creative Minds",
    plan: "Pro",
    amount: 49,
    currency: "USD",
    date: "Apr 28, 2025",
    status: "pending",
    method: "Visa •••• 8888",
    invoice: "INV-005",
  },
];

const statusConfig = {
  completed: {
    color: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
    label: "Completed",
  },
  pending: {
    color: "bg-amber-50 text-amber-600",
    icon: Clock,
    label: "Pending",
  },
  failed: { color: "bg-rose-50 text-rose-600", icon: XCircle, label: "Failed" },
  refunded: {
    color: "bg-slate-50 text-slate-600",
    icon: XCircle,
    label: "Refunded",
  },
};

export function PaymentHistory() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(mockPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = mockPayments.slice(startIndex, endIndex);

  const handleViewDetails = (paymentId: string) => {
    // TODO: Implement view payment details
    console.log("View payment details:", paymentId);
  };

  const handleDownloadInvoice = (invoice: string) => {
    // TODO: Implement invoice download
    console.log("Download invoice:", invoice);
  };

  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Payment History
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              Recent transactions and payments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[9px] font-bold text-slate-600 transition-colors">
              <Download className="w-3 h-3 inline mr-1" />
              Export
            </button>
            <button className="px-3 py-1.5 bg-[#4100F2] hover:bg-[#2B00A1] text-white rounded-lg text-[9px] font-bold transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentPayments.map((payment) => {
              const StatusIcon = statusConfig[payment.status].icon;

              return (
                <tr
                  key={payment.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-[10px]">
                        {payment.company.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700 text-[10px] truncate max-w-30">
                        {payment.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium text-slate-600">
                      {payment.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold text-slate-800">
                      ${payment.amount}
                    </span>
                    <span className="text-[8px] font-medium text-slate-400 ml-1">
                      {payment.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium text-slate-500">
                      {payment.date}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3 text-slate-400" />
                      <span className="text-[9px] font-medium text-slate-500">
                        {payment.method}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[8px] font-black uppercase tracking-tighter",
                        statusConfig[payment.status].color,
                      )}
                    >
                      <StatusIcon className="w-2.5 h-2.5" />
                      {statusConfig[payment.status].label}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleViewDetails(payment.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(payment.invoice)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
                        title="Download Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-50 bg-white">
        <p className="text-[10px] font-bold text-slate-500">
          Showing <span className="text-slate-800">{startIndex + 1}</span> to{" "}
          <span className="text-slate-800">
            {Math.min(endIndex, mockPayments.length)}
          </span>{" "}
          of <span className="text-slate-800">{mockPayments.length}</span>{" "}
          payments
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={cn(
              "p-1.5 rounded-lg border border-slate-100 transition-all",
              currentPage === 1
                ? "opacity-50 cursor-not-allowed text-slate-300"
                : "hover:bg-slate-50 text-slate-400",
            )}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-black transition-all",
                  page === currentPage
                    ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                    : "text-slate-500 hover:bg-slate-50",
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={cn(
              "p-1.5 rounded-lg border border-slate-100 transition-all",
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed text-slate-300"
                : "hover:bg-slate-50 text-slate-400",
            )}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
