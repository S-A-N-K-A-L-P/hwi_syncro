"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, AlertCircle, ShieldCheck, User } from "lucide-react";

export function ProjectTimeline({ activities }: { activities: any[] }) {
  return (
    <div className="space-y-8 p-8 bg-[#121214] border border-[#1f1f23] rounded-[2rem] shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/5 rounded-full blur-3xl" />
      
      <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-muted font-mono mb-8 px-1 flex items-center gap-2">
        <Clock className="w-3.5 h-3.5" />
        Tactical Timeline
      </h3>
      
      <div className="relative space-y-10 before:absolute before:inset-0 before:ml-[1.15rem] before:h-full before:w-px before:bg-gradient-to-b before:from-[#6366f1]/50 before:via-[#1f1f23] before:to-transparent">
        {activities.map((act, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex items-start gap-8 group"
          >
            <div className="relative z-10 mt-1.5 w-2.5 h-2.5 rounded-full bg-[#121214] border-2 border-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform" />
            
            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <p className="text-[14px] font-black text-foreground tracking-tight uppercase italic group-hover:text-[#6366f1] transition-colors">
                  {act.title}
                </p>
                <span className="text-[10px] font-mono font-black text-muted uppercase bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  {act.time}
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed font-medium bg-gradient-to-r from-muted to-muted/80 bg-clip-text">
                {act.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ProjectHealthIndicator() {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-[#121214] border border-[#1f1f23] rounded-[2rem] space-y-8 shadow-xl"
    >
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted font-mono">System Health</span>
          </div>
          <motion.div 
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
          />
       </div>
       
       <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.div 
              key={i} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`h-10 rounded-xl border transition-all duration-500 ${i < 8 ? 'bg-emerald-500/10 border-emerald-500/20 shadow-inner' : 'bg-[#17171a] border-[#1f1f23]'}`} 
            />
          ))}
       </div>
       
       <div className="space-y-4">
         <p className="text-[12px] text-muted font-bold leading-relaxed uppercase tracking-tight italic">
            Protocol integrity and deployment signals are within nominal parameters. 
            No critical failures detected in current build layer.
         </p>
         <div className="flex items-center gap-2 text-[10px] font-mono font-black text-[#6366f1] uppercase">
           <AlertCircle className="w-3 h-3" />
           Next Refresh: 04:20:00
         </div>
       </div>
    </motion.div>
  );
}

export function ProjectOrgBadge({ org }: { org: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, backgroundColor: '#17171a' }}
      className="flex items-center gap-5 p-5 bg-[#121214] border border-[#1f1f23] rounded-[1.5rem] group transition-all cursor-pointer"
    >
       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#17171a] to-[#121214] border border-[#1f1f23] flex items-center justify-center font-black text-foreground text-2xl italic group-hover:text-[#6366f1] group-hover:border-[#6366f1]/30 transition-all shadow-lg">
          {org?.name?.[0] || "O"}
       </div>
       <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono font-black text-muted uppercase tracking-[0.2em] leading-none">Authority Node</span>
          <span className="text-[16px] font-black text-foreground tracking-tighter uppercase italic group-hover:text-foreground transition-colors">{org?.name || "Initializing..."}</span>
       </div>
    </motion.div>
  );
}

export function ProjectLeadCard({ lead }: { lead: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, backgroundColor: '#17171a' }}
      className="flex items-center gap-5 p-5 bg-[#121214] border border-[#1f1f23] rounded-[1.5rem] group transition-all"
    >
       <div className="relative">
         <div className="w-14 h-14 rounded-full border-2 border-[#1f1f23] overflow-hidden group-hover:border-[#6366f1]/50 transition-all shadow-lg">
            <img src={lead?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lead?.name || 'default'}`} alt="Lead" className="w-full h-full object-cover" />
         </div>
         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#6366f1] rounded-full border-4 border-[#121214] flex items-center justify-center">
           <User size={10} className="text-white" />
         </div>
       </div>
       <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono font-black text-muted uppercase tracking-[0.2em] leading-none">Lead Architect</span>
          <span className="text-[16px] font-black text-foreground tracking-tighter uppercase hover:text-[#6366f1] transition-colors cursor-pointer">{lead?.name || "Initializing..."}</span>
       </div>
    </motion.div>
  );
}
