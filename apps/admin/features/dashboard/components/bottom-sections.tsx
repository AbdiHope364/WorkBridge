"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Monitor,
  Palette,
  Megaphone,
  HeartPulse,
  MoreHorizontal,
} from "lucide-react";
import { api } from "@/lib/api";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Development: Monitor,
  Design: Palette,
  Marketing: Megaphone,
  Health: HeartPulse,
};

const DEFAULT_ICON = MoreHorizontal;

const CATEGORY_COLORS: Record<string, string> = {
  Development: "#00D47E",
  Design: "#4100F2",
  Marketing: "#C41AF7",
  Health: "#FFA000",
  Other: "#64748b",
};

export function BottomSections() {
  const [categories, setCategories] = React.useState<{ name: string; count: number }[]>([]);
  const [verificationData, setVerificationData] = React.useState<{ name: string; value: number; color: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    void Promise.all([
      api.admin.getDashboardCategories(),
      api.admin.getDashboardVerifications(),
    ])
      .then(([cats, verifications]) => {
        if (!mounted) return;
        setCategories(cats);
        setVerificationData(verifications);
      })
      .catch((requestError: unknown) => {
        if (mounted) setError(requestError instanceof Error ? requestError.message : "Unable to load sections.");
      })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-8">
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 h-64 animate-pulse" />
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 h-64 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return <div className="px-10 pb-8 text-sm text-rose-600">{error}</div>;
  }

  const totalVerifications = verificationData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-8">
      {/* Top Job Categories */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Top Job Categories
        </h3>

        <div className="space-y-4">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.name] || DEFAULT_ICON;
            const color = CATEGORY_COLORS[cat.name] || "#64748b";
            const percentage = cat.count > 0 ? Math.round((cat.count / categories.reduce((s, c) => s + c.count, 0)) * 100) : 0;
            return (
              <div key={cat.name} className="flex items-center gap-4">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Icon className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700">
                      {cat.name}
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      {cat.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Overview */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 self-start mb-6">
          Verification Overview
        </h3>

        <div className="h-[220px] w-full relative">
          {verificationData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-black text-slate-800 leading-none">
              {totalVerifications}
            </p>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
              Total Requests
            </p>
          </div>
        </div>

        <div className="w-full mt-4 grid grid-cols-3 gap-2">
          {verificationData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
