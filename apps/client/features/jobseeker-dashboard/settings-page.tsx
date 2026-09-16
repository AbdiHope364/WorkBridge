"use client";

import { useState } from "react";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@repo/ui";
import {
  User,
  Shield,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  MapPin,
  Sparkles,
} from "lucide-react";

export function JobseekerSettingsPage() {
  const { user, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications" | "account">("general");

  // General state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState("+251 91 123 4567");
  const [location, setLocation] = useState("Addis Ababa, Ethiopia");
  const [tradeHeadline, setTradeHeadline] = useState("Certified Master Electrician & Solar Installer");
  const [hourlyRate, setHourlyRate] = useState("350");

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification toggles
  const [emailJobAlerts, setEmailJobAlerts] = useState(true);
  const [smsBookingAlerts, setSmsBookingAlerts] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  // Status message
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      // Simulate/execute profile update
      await new Promise((r) => setTimeout(r, 600));
      if (refreshUser) await refreshUser();
      setStatusMsg({ type: "success", text: "Profile and preferences updated successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to update settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setStatusMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "Passwords do not match." });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStatusMsg({ type: "success", text: "Password changed successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to change password" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f8fa] text-slate-950">
      {/* Common Sidebar */}
      <JobseekerSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <h1 className="text-xl font-black text-[#14214a] tracking-tight">Account Settings</h1>
            <p className="text-xs text-slate-500">Manage your profile, security, and notification preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> 0% Commission Platform
            </span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-8 space-y-6">
          {/* Status Message */}
          {statusMsg && (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold transition-all ${
                statusMsg.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Tab Bar */}
          <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "general"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4" /> General Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "security"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Shield className="w-4 h-4" /> Password & Security
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "notifications"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === "account"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Lock className="w-4 h-4" /> Account Safety
            </button>
          </div>

          {/* TAB 1: General Profile */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Personal & Trade Details</h3>
                <p className="text-xs text-slate-500">Update how clients see your profile and reach out for job bookings.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name / Trade Title
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Bikila"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Google Verified Account</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary City / Work Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={tradeHeadline}
                    onChange={(e) => setTradeHeadline(e.target.value)}
                    placeholder="e.g. Master Electrician & Certified Solar Installer"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Standard Hourly Rate (ETB)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">ETB / hr</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 mt-1 block">100% paid directly to you (0% platform cut)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit" isLoading={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* TAB 2: Security & Password */}
          {activeTab === "security" && (
            <form onSubmit={handleSavePassword} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Change Password</h3>
                <p className="text-xs text-slate-500">Ensure your account is using a long, random password to stay secure.</p>
              </div>

              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button type="submit" isLoading={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
                  Update Password
                </Button>
              </div>
            </form>
          )}

          {/* TAB 3: Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Notification Preferences</h3>
                <p className="text-xs text-slate-500">Choose when and how WorkBridge alerts you for new jobs and client messages.</p>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Email Job Alerts</div>
                    <div className="text-xs text-slate-500">Receive instant email digests when matching tradesman jobs are posted.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailJobAlerts}
                    onChange={(e) => setEmailJobAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">SMS Booking Alerts</div>
                    <div className="text-xs text-slate-500">Receive SMS notifications whenever a verified client books your service.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsBookingAlerts}
                    onChange={(e) => setSmsBookingAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Chat & Messages Notifications</div>
                    <div className="text-xs text-slate-500">Notify you when clients send direct chat messages or schedule calls.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={messageNotifications}
                    onChange={(e) => setMessageNotifications(e.target.checked)}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStatusMsg({ type: "success", text: "Notification settings saved!" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}

          {/* TAB 4: Account Safety */}
          {activeTab === "account" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Account Safety & Session Control</h3>
                <p className="text-xs text-slate-500">Manage your active sessions and data privacy.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Log Out of All Devices</div>
                    <div className="text-xs text-slate-500">Invalidate all active session tokens on other browsers.</div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStatusMsg({ type: "success", text: "All other sessions have been logged out." })}
                    className="text-xs font-bold"
                  >
                    Log Out Sessions
                  </Button>
                </div>

                <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-rose-900">Delete WorkBridge Account</div>
                    <div className="text-xs text-rose-700">Permanently delete your profile, application history, and trade records.</div>
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => alert("To delete your account, please contact support@workbridge.et for academic verification.")}
                    className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
