// components/management-header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Filter, ChevronDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
  checked?: boolean;
}

interface ManagementHeaderProps {
  title: string;
  description: string;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  showFilter?: boolean;
}

export function ManagementHeader({
  title,
  description,
  onSearch,
  onFilterChange,
  searchPlaceholder = "Search anything...",
  filterOptions = [],
  showFilter = true,
}: ManagementHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value];

      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    if (onFilterChange) {
      onFilterChange([]);
    }
  };

  const getFilterLabel = (value: string) => {
    const option = filterOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <header className="flex items-center justify-between px-10 py-6 bg-transparent flex-wrap gap-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-0.5">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div
          className={cn(
            "relative group",
            isSearchFocused && "ring-4 ring-emerald-500/10 rounded-xl",
          )}
        >
          <Search
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
              isSearchFocused ? "text-emerald-500" : "text-slate-400",
            )}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-80 h-11 pl-12 pr-10 bg-white border border-slate-100 rounded-xl shadow-sm outline-none focus:border-emerald-500 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Filter Button with Dropdown */}
        {showFilter && (
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border shadow-sm transition-all active:scale-95 group",
                selectedFilters.length > 0
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-100 hover:border-slate-300",
              )}
            >
              <Filter
                className={cn(
                  "w-5 h-5 transition-colors",
                  selectedFilters.length > 0
                    ? "text-emerald-500"
                    : "text-slate-400 group-hover:text-emerald-500",
                )}
              />
              <span
                className={cn(
                  "text-sm font-bold",
                  selectedFilters.length > 0
                    ? "text-emerald-700"
                    : "text-slate-700",
                )}
              >
                Filter
              </span>
              {selectedFilters.length > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {selectedFilters.length}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isFilterOpen && "rotate-180",
                  selectedFilters.length > 0
                    ? "text-emerald-500"
                    : "text-slate-400",
                )}
              />
            </button>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Filter by
                    </span>
                    {selectedFilters.length > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-2 max-h-56 overflow-y-auto">
                  {filterOptions.length > 0 ? (
                    filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleFilter(option.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left",
                          selectedFilters.includes(option.value)
                            ? "bg-emerald-50 text-emerald-700"
                            : "hover:bg-slate-50 text-slate-700",
                        )}
                      >
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                        {selectedFilters.includes(option.value) && (
                          <Check className="w-4 h-4 text-emerald-500" />
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No filter options available
                    </p>
                  )}
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-2 bg-[#4100F2] text-white rounded-lg text-sm font-bold hover:bg-[#2B00A1] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
