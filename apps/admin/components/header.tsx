"use client";

import React from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-5 bg-transparent">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
          Hello, Admin
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Welcome back to Workbridge admin dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Filter */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
          <Calendar className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-semibold text-slate-700">
            All period
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-80 h-11 pl-12 pr-4 bg-white border border-slate-100 rounded-xl shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
}
