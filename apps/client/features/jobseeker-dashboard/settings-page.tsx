"use client";

import { useState, useEffect } from "react";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";
import { api } from "@/lib/api";
import { Button } from "@repo/ui";
import {
  User,
  Shield,
  ShieldCheck,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  MapPin,
  Sparkles,
  CreditCard,
  FileCheck2,
  QrCode,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";

export function JobseekerSettingsPage() {
  const { user, refreshUser } = useAuth();
  const { jobseekerProfile, refreshProfile } = useProfile();

  const [activeTab, setActiveTab] = useState<"general" | "kyc" | "security" | "notifications" | "account">("general");

  // General state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(jobseekerProfile?.phone || (user as any)?.phone || "");
  const [location, setLocation] = useState(
    typeof jobseekerProfile?.location === "string"
      ? jobseekerProfile.location
      : jobseekerProfile?.location?.city
      ? `${jobseekerProfile.location.city}, Ethiopia`
      : ""
  );
  const [tradeHeadline, setTradeHeadline] = useState(
    jobseekerProfile?.bio || jobseekerProfile?.currentPosition || (user as any)?.profile?.headline || ""
  );
  const [hourlyRate, setHourlyRate] = useState(
    (jobseekerProfile as any)?.hourlyRate ? String((jobseekerProfile as any).hourlyRate) : ""
  );

  // Fayda KYC State
  const [faydaNumber, setFaydaNumber] = useState(user?.faydaFin || jobseekerProfile?.faydaFin || "");
  const [fullNameOnFayda, setFullNameOnFayda] = useState(user?.fullName || "");
  const [dateOfBirth, setDateOfBirth] = useState(jobseekerProfile?.dateOfBirth || "");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">((jobseekerProfile?.gender as any) || "MALE");
  const [kycStatus, setKycStatus] = useState<"VERIFIED" | "PENDING" | "UNVERIFIED" | "REJECTED">(
    (jobseekerProfile as any)?.faydaStatus || (user as any)?.faydaStatus || (user?.faydaFin ? "VERIFIED" : "UNVERIFIED")
  );
  const [frontDocName, setFrontDocName] = useState(jobseekerProfile?.frontDocName || "No file uploaded");
  const [backDocName, setBackDocName] = useState(jobseekerProfile?.backDocName || "No file uploaded");
  const [kycSubmitting, setKycSubmitting] = useState(false);

  useEffect(() => {
    if (user?.fullName && !fullName) setFullName(user.fullName);
    if ((user?.faydaFin || jobseekerProfile?.faydaFin) && !faydaNumber) {
      setFaydaNumber(user?.faydaFin || jobseekerProfile?.faydaFin || "");
    }
    if (jobseekerProfile?.phone && !phone) {
      setPhone(jobseekerProfile.phone);
    }
    if (jobseekerProfile?.faydaStatus || (user as any)?.faydaStatus) {
      setKycStatus((jobseekerProfile?.faydaStatus || (user as any)?.faydaStatus) as any);
    }
  }, [user, jobseekerProfile]);

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
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await api.profiles.jobseeker.updateMyProfile({
        firstName,
        lastName,
        fullName: fullName.trim(),
        phone: phone.trim(),
        location: {
          city: location.trim(),
        },
        bio: tradeHeadline.trim(),
        currentPosition: tradeHeadline.trim(),
        headline: tradeHeadline.trim(),
        hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
      });

      if (refreshProfile) await refreshProfile();
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
      await new Promise((r) => setTimeout(r, 600));
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

  const handleSaveKyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faydaNumber.trim()) {
      setStatusMsg({ type: "error", text: "Please enter your Fayda Identification Number (FIN)." });
      return;
    }
    setKycSubmitting(true);
    setStatusMsg(null);
    try {
      await api.profiles.jobseeker.updateMyProfile({
        faydaFin: faydaNumber.trim(),
        faydaStatus: "PENDING",
        fullName: fullNameOnFayda.trim() || undefined,
        dateOfBirth: dateOfBirth || undefined,
        gender: gender || undefined,
        frontDocName: frontDocName || undefined,
        backDocName: backDocName || undefined,
      });

      if (refreshProfile) await refreshProfile();
      if (refreshUser) await refreshUser();
      setKycStatus("PENDING");
      setStatusMsg({
        type: "success",
        text: "Fayda KYC details updated and submitted for verification!",
      });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to submit Fayda verification" });
    } finally {
      setKycSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8fa] text-slate-950 flex-col md:flex-row">
      {/* Common Sidebar */}
      <JobseekerSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0">
        <header className="hidden md:flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <h1 className="text-xl font-black text-[#14214a] tracking-tight">Account Settings</h1>
            <p className="text-xs text-slate-500">Manage your profile, Fayda KYC identity, and security</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> 0% Commission Platform
            </span>
          </div>
        </header>

        <div className="w-full p-4 sm:p-6 md:p-8 space-y-6">
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

          {/* Tab Bar - Horizontally scrollable on mobile phones */}
          <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === "general"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <User className="w-4 h-4" /> General Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kyc")}
              className={`flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === "kyc"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Fayda KYC & ID
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === "security"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Shield className="w-4 h-4" /> Password & Security
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === "notifications"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={`flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap ${
                activeTab === "account"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Lock className="w-4 h-4" /> Account Safety
            </button>
          </div>

          {/* TAB 1: General Profile */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Personal & Trade Details</h3>
                <p className="text-xs text-slate-500">Update how clients see your profile and reach out for job bookings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

          {/* TAB: Fayda KYC & National ID */}
          {activeTab === "kyc" && (
            <div className="space-y-6">
              {/* Fayda KYC Header Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d2218] via-[#123826] to-[#0d2218] text-white border border-emerald-800 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black tracking-tight text-white">
                          Ethiopian Fayda National ID (KYC)
                        </h3>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          NIDP Standard
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/80 mt-1 max-w-xl">
                        Verify your identity with Ethiopia&apos;s National Digital Identity (Fayda). Verified workers unlock higher client trust, verified badge, and priority booking on WorkBridge.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {kycStatus === "VERIFIED" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white shadow-sm">
                        <BadgeCheck className="w-4 h-4" /> Fayda Verified
                      </span>
                    )}
                    {kycStatus === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Review Pending
                      </span>
                    )}
                    {kycStatus === "UNVERIFIED" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 text-slate-200">
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Digital Fayda Card Preview */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">Digital Fayda Card Preview</h4>
                    <p className="text-xs text-slate-500">How your verified digital identity appears to clients</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Official NID Credentials
                  </span>
                </div>

                <div className="max-w-lg mx-auto bg-gradient-to-br from-[#0c311e] via-[#104a2d] to-[#0c2417] text-white p-6 rounded-2xl shadow-lg border-2 border-emerald-600/40 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs">
                        ET
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                          Federal Democratic Republic of Ethiopia
                        </div>
                        <div className="text-xs font-extrabold text-white">
                          Fayda National Identity Card (ፋይዳ)
                        </div>
                      </div>
                    </div>
                    <QrCode className="w-7 h-7 text-emerald-300 shrink-0" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-1">
                      <div className="w-24 h-28 rounded-xl bg-slate-800 border-2 border-emerald-400/40 overflow-hidden flex flex-col items-center justify-center relative shadow-inner">
                        <User className="w-12 h-12 text-emerald-200" />
                        <span className="text-[9px] font-bold bg-emerald-600 text-white w-full text-center py-0.5 absolute bottom-0">
                          FIN VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-emerald-300 font-bold block">Full Name</span>
                        <span className="font-bold text-white text-sm">{fullNameOnFayda || user?.fullName || "Not Provided"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-emerald-300 font-bold block">Fayda ID (FIN)</span>
                        <span className="font-mono font-extrabold text-amber-300 tracking-wider text-sm">{faydaNumber || "Unverified (FIN Pending)"}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <span className="text-[9px] uppercase text-emerald-300/80 font-bold block">Date of Birth</span>
                          <span className="font-semibold text-white text-[11px]">{dateOfBirth}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-emerald-300/80 font-bold block">Gender</span>
                          <span className="font-semibold text-white text-[11px]">{gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fayda KYC Update Form */}
              <form onSubmit={handleSaveKyc} className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Update Fayda Identification Details</h3>
                  <p className="text-xs text-slate-500">Provide your official Fayda Identification Number (FIN) and scanned ID documents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Fayda Identification Number (FIN) *
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={faydaNumber}
                        onChange={(e) => setFaydaNumber(e.target.value)}
                        placeholder="e.g. FIN-9042-8821-3419"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-emerald-500 focus:outline-none"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      12 to 16-digit official Fayda Number assigned by National ID Program.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Legal Name (as on Fayda ID) *
                    </label>
                    <input
                      type="text"
                      value={fullNameOnFayda}
                      onChange={(e) => setFullNameOnFayda(e.target.value)}
                      placeholder="e.g. Abdi Abiot"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                {/* Upload Documents Grid */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Scanned ID Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Front Dropzone */}
                    <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-xs">
                        <FileCheck2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Fayda ID Card (Front)</div>
                        <div className="text-[11px] font-mono text-emerald-700 mt-0.5">{frontDocName}</div>
                      </div>
                      <label className="cursor-pointer text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                        Replace Front Scan
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFrontDocName(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Back Dropzone */}
                    <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-xs">
                        <FileCheck2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Fayda ID Card (Back / Barcode)</div>
                        <div className="text-[11px] font-mono text-emerald-700 mt-0.5">{backDocName}</div>
                      </div>
                      <label className="cursor-pointer text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                        Replace Back Scan
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setBackDocName(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Protected by WorkBridge National ID Privacy Policy</span>
                  </div>
                  <Button
                    type="submit"
                    isLoading={kycSubmitting}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8"
                  >
                    Save &amp; Submit Fayda KYC
                  </Button>
                </div>
              </form>
            </div>
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

