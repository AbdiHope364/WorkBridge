"use client";

import React from "react";
import Link from "next/link";
import { 
  Eye, 
  Ban, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Circle,
  CheckCircle2,
  Clock,
  Building2,
  User,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";

interface Employer {
  id: string;
  companyName: string;
  type: "Company" | "Individual";
  contactPerson: string;
  industry: string;
  location: string;
  status: "Active" | "Inactive";
  verification: "Verified" | "Pending";
  joinedOn: string;
}

const mockEmployers: Employer[] = [
  { id: "1", companyName: "TechCorp Solutions", type: "Company", contactPerson: "John Smith", industry: "Software Development", location: "Addis Ababa", status: "Active", verification: "Verified", joinedOn: "Jan 12, 2025" },
  { id: "2", companyName: "Green Energy Ltd", type: "Company", contactPerson: "Amara Okoro", industry: "Renewable Energy", location: "Nairobi", status: "Active", verification: "Verified", joinedOn: "Feb 05, 2025" },
  { id: "3", companyName: "Abdisa Leta", type: "Individual", contactPerson: "Abdisa Leta", industry: "Residential Construction", location: "Addis Ababa", status: "Active", verification: "Verified", joinedOn: "Mar 01, 2025" },
  { id: "4", companyName: "Global Logistics", type: "Company", contactPerson: "David Chen", industry: "Transportation", location: "Mombasa", status: "Inactive", verification: "Pending", joinedOn: "Mar 10, 2025" },
  { id: "5", companyName: "Sara Ahmed", type: "Individual", contactPerson: "Sara Ahmed", industry: "Interior Design", location: "Cairo", status: "Active", verification: "Verified", joinedOn: "Mar 20, 2025" },
  { id: "6", companyName: "Creative Minds", type: "Company", contactPerson: "Elena Rodriguez", industry: "Marketing & Design", location: "Cairo", status: "Active", verification: "Verified", joinedOn: "Apr 15, 2025" },
];

export function EmployersTable() {
  const [activeModal, setActiveModal] = React.useState<{ type: "suspend" | "delete", id: string } | null>(null);
  const [filterType, setFilterType] = React.useState<"All" | "Company" | "Individual">("All");

  const handleAction = (reason: string) => {
    // TODO: Integrate with backend to perform suspension or deletion
    console.log(`${activeModal?.type} employer ${activeModal?.id} with reason: ${reason}`);
    setActiveModal(null);
  };

  const filteredEmployers = mockEmployers.filter(emp => 
    filterType === "All" || emp.type === filterType
  );

  return (
    <div className="px-10 pb-10">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {(["All", "Company", "Individual"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                filterType === type 
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              {type === "All" ? "All Employers" : type === "Company" ? "Companies" : "Individuals"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Advanced Filter</span>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {/* Modal for Suspend/Delete */}
        <ActionModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          onConfirm={handleAction}
          title={activeModal?.type === "suspend" ? "Suspend Employer" : "Delete Employer"}
          description={activeModal?.type === "suspend" 
            ? "Are you sure you want to suspend this company? All their active jobs will be hidden." 
            : "Are you sure you want to delete this company? This will permanently remove all their data and jobs."}
          confirmText={activeModal?.type === "suspend" ? "Confirm Suspension" : "Delete Permanently"}
          confirmVariant={activeModal?.type === "suspend" ? "warning" : "danger"}
        />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Employer</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Type</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase whitespace-nowrap">Contact</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Industry</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Status</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Verification</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Joined</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight text-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredEmployers.map((employer) => (
              <tr key={employer.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center border",
                      employer.type === "Company" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {employer.type === "Company" ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <span className="font-black text-slate-800 text-xs tracking-tight truncate max-w-[150px]">{employer.companyName}</span>
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md",
                    employer.type === "Company" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {employer.type}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-bold text-slate-700 whitespace-nowrap">{employer.contactPerson}</td>
                <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500 truncate max-w-[120px]">{employer.industry}</td>
                <td className="px-5 py-2.5">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                    employer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    <Circle className={cn("w-2 h-2 fill-current")} />
                    {employer.status}
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                    employer.verification === "Verified" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {employer.verification === "Verified" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                    {employer.verification}
                  </div>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-bold text-slate-700 whitespace-nowrap">{employer.joinedOn}</td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <Link 
                      href={`/employers/${employer.id}`}
                      className="p-1.5 bg-slate-100/80 hover:bg-slate-200 text-slate-700 rounded-md transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button 
                      onClick={() => setActiveModal({ type: "suspend", id: employer.id })}
                      className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-md transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setActiveModal({ type: "delete", id: employer.id })}
                      className="p-1.5 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-md transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-white">
          <p className="text-[11px] font-bold text-slate-500 italic">
            Showing <span className="text-slate-800">1 to {filteredEmployers.length}</span> of <span className="text-slate-800">1,200</span>
          </p>
          
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, "...", 84].map((page, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all",
                    page === 1 ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
