// features/settings/components/notification-settings.tsx
"use client";

import React, { useState } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
  Megaphone,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  email: boolean;
  inApp: boolean;
  push: boolean;
  icon: React.ElementType;
  color: string;
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "job_alerts",
      label: "Job Alerts",
      description: "New job postings matching your preferences",
      email: true,
      inApp: true,
      push: false,
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "application_updates",
      label: "Application Updates",
      description: "Status changes on job applications",
      email: true,
      inApp: true,
      push: true,
      icon: CheckCircle2,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "messages",
      label: "Messages",
      description: "New messages and conversations",
      email: false,
      inApp: true,
      push: true,
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "platform_updates",
      label: "Platform Updates",
      description: "New features and platform improvements",
      email: true,
      inApp: false,
      push: false,
      icon: Megaphone,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: "security_alerts",
      label: "Security Alerts",
      description: "Suspicious activity and security notifications",
      email: true,
      inApp: true,
      push: true,
      icon: AlertCircle,
      color: "bg-rose-100 text-rose-600",
    },
    {
      id: "employer_activity",
      label: "Employer Activity",
      description: "Updates from employers you follow",
      email: false,
      inApp: true,
      push: false,
      icon: Users,
      color: "bg-cyan-100 text-cyan-600",
    },
  ]);

  const togglePreference = (
    id: string,
    channel: "email" | "inApp" | "push",
  ) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, [channel]: !pref[channel] } : pref,
      ),
    );
  };

  const toggleAll = (id: string, value: boolean) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id
          ? { ...pref, email: value, inApp: value, push: value }
          : pref,
      ),
    );
  };

  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Notification Preferences
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              Choose how you want to receive notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // TODO: Implement bulk update
                console.log("Save all preferences");
              }}
              className="px-4 py-2 bg-[#4100F2] text-white rounded-lg text-[10px] font-bold hover:bg-[#2B00A1] transition-colors"
            >
              Save All
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-50">
        <div className="flex items-center gap-6 text-[9px] font-bold text-slate-500">
          <span>Channel</span>
          <div className="flex items-center gap-6 ml-auto">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              Email
            </span>
            <span className="flex items-center gap-1.5">
              <Bell className="w-3 h-3" />
              In-App
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3" />
              Push
            </span>
            <span className="flex items-center gap-1.5">
              <Settings className="w-3 h-3" />
              All
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-50">
        {preferences.map((pref) => {
          const Icon = pref.icon;
          const allEnabled = pref.email && pref.inApp && pref.push;

          return (
            <div
              key={pref.id}
              className="p-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      pref.color,
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">
                      {pref.label}
                    </p>
                    <p className="text-[8px] font-medium text-slate-400">
                      {pref.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Email Toggle */}
                  <button
                    onClick={() => togglePreference(pref.id, "email")}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      pref.email
                        ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200",
                    )}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>

                  {/* In-App Toggle */}
                  <button
                    onClick={() => togglePreference(pref.id, "inApp")}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      pref.inApp
                        ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200",
                    )}
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </button>

                  {/* Push Toggle */}
                  <button
                    onClick={() => togglePreference(pref.id, "push")}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      pref.push
                        ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200",
                    )}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  {/* All Toggle */}
                  <button
                    onClick={() => toggleAll(pref.id, !allEnabled)}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      allEnabled
                        ? "bg-[#4100F2] text-white hover:bg-[#2B00A1]"
                        : "bg-slate-100 text-slate-400 hover:bg-slate-200",
                    )}
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <p className="text-[8px] font-medium text-slate-400 text-center">
          Notification settings are saved automatically
        </p>
      </div>
    </div>
  );
}
