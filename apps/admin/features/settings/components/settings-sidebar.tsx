// features/settings/components/settings-sidebar.tsx
"use client";

import React from "react";
import {
  Settings,
  Shield,
  Bell,
  Palette,
  Puzzle,
  User,
  Key,
  Globe,
  Mail,
  Lock,
  Eye,
  CreditCard,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  description?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic platform settings",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Security & authentication",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alert preferences",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme & branding",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Puzzle,
    description: "Third-party connections",
  },
];

export function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden sticky top-6">
      <div className="p-4 border-b border-slate-50">
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
          Settings
        </h4>
        <p className="text-[9px] font-medium text-slate-400 mt-0.5">
          Manage your preferences
        </p>
      </div>

      <nav className="p-2 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left group",
                isActive
                  ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                  : "hover:bg-slate-50 text-slate-600 hover:text-slate-900",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-600",
                )}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-[10px] font-bold transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-700 group-hover:text-slate-900",
                  )}
                >
                  {item.label}
                </p>
                <p
                  className={cn(
                    "text-[8px] font-medium truncate transition-colors",
                    isActive
                      ? "text-white/70"
                      : "text-slate-400 group-hover:text-slate-500",
                  )}
                >
                  {item.description}
                </p>
              </div>
              {isActive && (
                <div className="w-1 h-6 bg-white rounded-full flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-2">
          Quick Actions
        </p>
        <div className="space-y-1.5">
          <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors text-left">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] font-medium text-slate-600">
              Profile Settings
            </span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors text-left">
            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] font-medium text-slate-600">
              Billing Info
            </span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors text-left">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] font-medium text-slate-600">
              Team Management
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
