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
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";

interface Jobseeker {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  status: "Active" | "Inactive";
  verification: "Verified" | "Pending" | "Unverified";
  joinedOn: string;
}

const mockJobseekers: Jobseeker[] = [
  { id: "1", name: "Mark Smith", email: "marksmith@example.com", phone: "+2519000004", skills: ["C#", ".NET", "Oracle", "+2"], status: "Inactive", verification: "Unverified", joinedOn: "September, 10, 2025" },
  { id: "2", name: "Abdisa Leta", email: "abdisaleta@gmail.com", phone: "+2519000000", skills: ["React.js", "Node.js", "MongoDb", "+2"], status: "Active", verification: "Verified", joinedOn: "May, 04, 2025" },
  { id: "3", name: "Sara Ahmed", email: "saraahmed@example.com", phone: "+2519000001", skills: ["Python", "Django", "PostgreSQL", "+3"], status: "Active", verification: "Verified", joinedOn: "June, 15, 2025" },
  { id: "4", name: "John Doe", email: "johndoe@example.com", phone: "+2519000002", skills: ["Java", "Spring", "MySQL", "+4"], status: "Inactive", verification: "Pending", joinedOn: "July, 20, 2025" },
  { id: "5", name: "Linda Torres", email: "lindatorres@example.com", phone: "+2519000003", skills: ["PHP", "Laravel", "SQLite", "+1"], status: "Active", verification: "Verified", joinedOn: "August, 30, 2025" },
];

export function JobseekersTable() {
  const [activeModal, setActiveModal] = React.useState<{ type: "suspend" | "delete", id: string } | null>(null);

  const handleAction = (reason: string) => {
    // TODO: Integrate with backend to perform suspension or deletion
    console.log(`${activeModal?.type} user ${activeModal?.id} with reason: ${reason}`);
    setActiveModal(null);
  };

  return (
    <div className="px-10 pb-10">
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {/* Modal for Suspend/Delete */}
        <ActionModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          onConfirm={handleAction}
          title={activeModal?.type === "suspend" ? "Suspend User" : "Delete User"}
          description={activeModal?.type === "suspend" 
            ? "Are you sure you want to suspend this user? They will lose access to their account until reinstated." 
            : "Are you sure you want to delete this user? This action is permanent and cannot be undone."}
          confirmText={activeModal?.type === "suspend" ? "Confirm Suspension" : "Delete Permanently"}
          confirmVariant={activeModal?.type === "suspend" ? "warning" : "danger"}
        />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">User</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Email</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase whitespace-nowrap">Phone Number</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Skills</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Status</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Verification</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">Joined</th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight text-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockJobseekers.map((jobseeker) => (
              <tr key={jobseeker.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-100 text-xs">
                      {jobseeker.name.charAt(0)}
                    </div>
                    <span className="font-black text-slate-800 text-xs tracking-tight truncate max-w-[120px]">{jobseeker.name}</span>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500 truncate max-w-[150px]">{jobseeker.email}</td>
                <td className="px-5 py-2.5 text-[11px] font-bold text-slate-700">{jobseeker.phone}</td>
                <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500 truncate max-w-[150px]">{jobseeker.skills.join(", ")}</td>
                <td className="px-5 py-2.5">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                    jobseeker.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    <Circle className={cn("w-2 h-2 fill-current")} />
                    {jobseeker.status}
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                    jobseeker.verification === "Verified" ? "bg-emerald-50 text-emerald-600" : 
                    jobseeker.verification === "Pending" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                  )}>
                    {jobseeker.verification === "Verified" ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                    {jobseeker.verification}
                  </div>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-bold text-slate-700 whitespace-nowrap">{jobseeker.joinedOn}</td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <Link 
                      href={`/jobseekers/${jobseeker.id}`}
                      className="p-1.5 bg-slate-100/80 hover:bg-slate-200 text-slate-700 rounded-md transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button 
                      onClick={() => setActiveModal({ type: "suspend", id: jobseeker.id })}
                      className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-md transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setActiveModal({ type: "delete", id: jobseeker.id })}
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
            Showing <span className="text-slate-800">1 to 5</span> of <span className="text-slate-800">12,845</span>
          </p>
          
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, "...", 804].map((page, i) => (
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
