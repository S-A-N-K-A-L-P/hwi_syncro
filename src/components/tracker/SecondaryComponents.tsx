"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

export function ProjectTimeline({ activities }: { activities: any[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1f1f23] font-mono mb-6 px-1">Tactical Timeline</h3>
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-[#1f1f23]">
        {activities.map((act, i) => (
          <div key={i} className="relative flex items-start gap-8 group">
            <div className="relative z-10 mt-1 w-10 h-10 rounded-xl bg-[#121214] border border-[#1f1f23] flex items-center justify-center group-hover:border-[#6366f1]/30 transition-all shrink-0">
               <Clock className="w-4 h-4 text-[#9ca3af]" />
            </div>
            <div className="flex-1 pb-4 border-b border-[#1f1f23]/50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-bold text-[#e5e7eb] tracking-tight">{act.title}</p>
                <span className="text-[10px] font-mono font-bold text-[#1f1f23] uppercase">{act.time}</span>
              </div>
              <p className="text-[12px] text-[#9ca3af] leading-relaxed italic">{act.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectHealthIndicator() {
  return (
    <div className="p-6 bg-[#121214] border border-[#1f1f23] rounded-3xl space-y-6">
       <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1f1f23] font-mono">System Health</span>
          <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
       </div>
       
       <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className={`h-8 rounded-lg border border-[#1f1f23] ${i < 7 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#17171a]'}`} />
          ))}
       </div>
       <p className="text-[11px] text-[#9ca3af] font-medium leading-relaxed">
          Protocol integrity and deployment signals are within nominal parameters. 
          No critical failures detected in current build layer.
       </p>
    </div>
  );
}

export function ProjectOrgBadge({ org }: { org: any }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#121214] border border-[#1f1f23] rounded-2xl group hover:border-[#6366f1]/20 transition-all">
       <div className="w-12 h-12 rounded-xl bg-[#17171a] border border-[#1f1f23] flex items-center justify-center font-black text-[#e5e7eb] text-xl italic group-hover:text-[#6366f1]">
          {org?.name?.[0] || "O"}
       </div>
       <div className="flex flex-col">
          <span className="text-[9px] font-mono font-bold text-[#1f1f23] uppercase tracking-widest">Authority Node</span>
          <span className="text-[14px] font-bold text-[#e5e7eb] tracking-tighter uppercase italic">{org?.name || "Initializing..."}</span>
       </div>
    </div>
  );
}

export function ProjectLeadCard({ lead }: { lead: any }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#121214] border border-[#1f1f23] rounded-2xl group hover:border-[#2a2a2f] transition-all">
       <div className="w-12 h-12 rounded-full border-2 border-[#1f1f23] overflow-hidden grayscale group-hover:grayscale-0 transition-all">
          <img src={lead?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=tushar"} alt="Lead" className="w-full h-full object-cover" />
       </div>
       <div className="flex flex-col">
          <span className="text-[9px] font-mono font-bold text-[#1f1f23] uppercase tracking-widest">Lead Architect</span>
          <span className="text-[14px] font-bold text-[#e5e7eb] tracking-tight uppercase hover:text-[#6366f1] transition-colors cursor-pointer">{lead?.name || "Tushar G."}</span>
       </div>
    </div>
  );
}
