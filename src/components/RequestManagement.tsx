"use client";

import { useState, useEffect } from "react";
import { Check, X, User, MessageSquare, Briefcase } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function RequestManagement({ startupId }: { startupId: string }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/startups/requests?status=pending");
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (requestId: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/startups/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Request ${status} successfully!`);
        fetchRequests(); // Refresh list
      } else {
        toast.error(data.message || "Failed to process request");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-400 font-bold uppercase text-[10px] animate-pulse">Scanning for architects...</div>;

  if (requests.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No pending missions</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request: any) => (
        <div key={request._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-emerald-500/20 transition-all shadow-sm">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white relative overflow-hidden">
               {request.userId.avatar ? (
                 <Image src={request.userId.avatar} alt={request.userId.name} fill className="object-cover" />
               ) : <User size={24} />}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{request.userId.name}</h4>
              <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                <Briefcase size={12} /> {request.role}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {request.userId.skills?.slice(0, 3).map((skill: string) => (
                   <span key={skill} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-md text-[8px] font-bold">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 dark:bg-slate-800/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
             <div className="flex items-start gap-2 mb-1">
               <MessageSquare size={10} className="text-slate-400 mt-0.5" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Architect's Pitch</p>
             </div>
             <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic">{request.message}</p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
             <Button 
               onClick={() => handleAction(request._id, "approved")}
               className="flex-1 md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-6"
             >
               <Check size={16} className="mr-2" /> Approve
             </Button>
             <Button 
               onClick={() => handleAction(request._id, "rejected")}
               variant="outline"
               className="flex-1 md:w-auto border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500/50 rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-6"
             >
               <X size={16} className="mr-2" /> Deny
             </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
