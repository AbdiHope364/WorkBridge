"use client";

import React from "react";
import { Search, ChevronDown, Calendar, Menu } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const { toggle } = useSidebar();
  const { user } = useAuth();
  const [period, setPeriod] = React.useState("All period");
  const [showPeriodDropdown, setShowPeriodDropdown] = React.useState(false);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-4 sm:py-5 bg-transparent border-b border-slate-100/60 lg:border-none">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors lg:hidden shadow-2xs"
          aria-label="Open Navigation Sidebar"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">
            Hello, {user?.name || "Admin"}
          </h1>
          <p className="text-slate-500 font-medium text-xs sm:text-sm">
            Welcome back to WorkBridge Admin Portal
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Interactive Date Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors shrink-0 text-xs sm:text-sm font-semibold text-slate-700"
          >
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>{period}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {showPeriodDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
              {["All period", "Today", "This Week", "This Month", "This Year"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setPeriod(opt);
                    setShowPeriodDropdown(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative group flex-1 sm:flex-initial">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search dashboard, users..."
            className="w-full sm:w-64 md:w-80 h-10 pl-10 pr-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-xs sm:text-sm font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
}
