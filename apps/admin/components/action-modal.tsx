"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  description: string;
  confirmText: string;
  confirmVariant?: "danger" | "warning" | "primary";
}

export function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmVariant = "primary",
}: ActionModalProps) {
  const [reason, setReason] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-[1.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "p-2 rounded-lg",
              confirmVariant === "danger" ? "bg-rose-50 text-rose-500" : 
              confirmVariant === "warning" ? "bg-amber-50 text-amber-500" : "bg-emerald-50 text-emerald-500"
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">{description}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5 ml-1">
                Reason for this action
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type the reason to be sent to the user..."
                className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim()}
            className={cn(
              "px-5 py-2 rounded-xl text-sm font-black transition-all active:scale-95 disabled:opacity-50 disabled:scale-100",
              confirmVariant === "danger" ? "bg-rose-500 text-white shadow-lg shadow-rose-200" : 
              confirmVariant === "warning" ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
