// features/settings/components/security-settings.tsx
"use client";

import React, { useState } from "react";
import {
  Lock,
  Key,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Mail,
  RefreshCw,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SecuritySettingsData {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;
  loginHistory: {
    device: string;
    location: string;
    date: string;
    ip: string;
  }[];
}

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [settings, setSettings] = useState<SecuritySettingsData>({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    passwordLastChanged: "May 15, 2025",
    loginHistory: [
      {
        device: "Chrome on Windows",
        location: "San Francisco, CA",
        date: "Jun 24, 2025 10:30 AM",
        ip: "192.168.1.1",
      },
      {
        device: "Safari on iPhone",
        location: "San Francisco, CA",
        date: "Jun 23, 2025 8:15 PM",
        ip: "192.168.1.2",
      },
      {
        device: "Firefox on MacOS",
        location: "Los Angeles, CA",
        date: "Jun 22, 2025 2:45 PM",
        ip: "192.168.1.3",
      },
    ],
  });

  const handleTwoFactorToggle = () => {
    setSettings((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log("Password change requested");
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            Security Settings
          </h4>
          <p className="text-[9px] font-medium text-slate-400 mt-0.5">
            Manage your account security and authentication
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Password Change */}
          <div>
            <h5 className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-3">
              Change Password
            </h5>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-[#4100F2] text-white rounded-lg text-[10px] font-bold hover:bg-[#2B00A1] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Update Password
              </button>
            </form>
          </div>

          <div className="border-t border-slate-100 pt-6">
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#4100F2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Two-Factor Authentication
                  </p>
                  <p className="text-[9px] font-medium text-slate-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <button
                onClick={handleTwoFactorToggle}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors flex-shrink-0",
                  settings.twoFactorEnabled ? "bg-emerald-500" : "bg-slate-300",
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm",
                    settings.twoFactorEnabled
                      ? "translate-x-6"
                      : "translate-x-0.5",
                  )}
                />
              </button>
            </div>

            {/* Session Timeout */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mt-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Session Timeout
                  </p>
                  <p className="text-[9px] font-medium text-slate-400">
                    Automatically log out after inactivity
                  </p>
                </div>
              </div>
              <select
                value={settings.sessionTimeout}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    sessionTimeout: parseInt(e.target.value),
                  }))
                }
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={240}>4 hours</option>
              </select>
            </div>

            {/* Password Last Changed */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mt-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Password Last Changed
                </p>
                <p className="text-[9px] font-medium text-slate-400">
                  {settings.passwordLastChanged}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
            Login History
          </h4>
          <p className="text-[9px] font-medium text-slate-400 mt-0.5">
            Recent login activity on your account
          </p>
        </div>

        <div className="divide-y divide-slate-50">
          {settings.loginHistory.map((login, index) => (
            <div
              key={index}
              className="p-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {login.device}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] text-slate-400">
                      <span>{login.location}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                      <span>IP: {login.ip}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-medium text-slate-400">
                  {login.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
          <button className="text-[9px] font-bold text-[#4100F2] hover:text-[#2B00A1] transition-colors">
            View Full History
          </button>
        </div>
      </div>
    </div>
  );
}
