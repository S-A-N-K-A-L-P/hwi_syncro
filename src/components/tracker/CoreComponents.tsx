"use client";

import { motion } from "framer-motion";
import { Shield, Layout, Settings, Share2, MoreHorizontal, Zap } from "lucide-react";

export function ProjectHeader({ project }: { project: any }) {
  return (
    <div className="bg-[#121214] border border-[#1f1f23] rounded-3xl p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Layout className="w-32 h-32 rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#6366f1]" />
              <span className="text-[10px] font-mono font-bold text-[#6366f1] uppercase tracking-widest">
                {project.orgId?.name || "Global Protocol"}
              </span>
            </div>
            <ProjectStatusBadge status={project.status} />
          </div>
          
          <h1 className="text-4xl font-black text-[#e5e7eb] tracking-tighter uppercase italic leading-none">
            {project.title}
          </h1>
          <p className="text-[#9ca3af] text-[15px] font-medium leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 rounded-2xl bg-[#17171a] border border-[#1f1f23] text-[#e5e7eb] hover:border-[#2a2a2f] transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-3 rounded-2xl bg-[#17171a] border border-[#1f1f23] text-[#e5e7eb] hover:border-[#2a2a2f] transition-all">
            <Settings className="w-4 h-4" />
          </button>
          <button className="px-6 py-3 rounded-2xl bg-[#6366f1] text-white font-bold text-[13px] uppercase tracking-wider hover:bg-[#4f46e5] transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            Join Tactical Team
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectStatusBadge({ status }: { status: string }) {
  const colors: any = {
    planning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    active: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    completed: "text-[#6366f1] bg-[#6366f1]/10 border-[#6366f1]/20",
    archived: "text-[#9ca3af] bg-[#1f1f23] border-[#1f1f23]",
  };

  return (
    <div className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-mono font-bold text-[10px] uppercase tracking-widest ${colors[status] || colors.planning}`}>
      <div className={`w-1.5 h-1.5 rounded-full fill-current`} />
      {status}
    </div>
  );
}

export function ProjectProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold text-[#1f1f23] uppercase tracking-[0.2em]">Deployment Integrity</span>
        <span className="text-[13px] font-black text-[#e5e7eb] italic uppercase tracking-tighter">{progress}% COMPLETE</span>
      </div>
      <div className="h-3 bg-[#17171a] border border-[#1f1f23] rounded-full overflow-hidden p-0.5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-[#6366f1] to-emerald-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]"
        />
      </div>
    </div>
  );
}

export function ProjectMetaInfo({ project }: { project: any }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Lead Architect", value: project.lead?.name || "Initializing...", icon: Zap },
        { label: "Node Strength", value: `${project.members?.length || 0} Operators`, icon: MoreHorizontal },
        { label: "Deployment Hub", value: project.githubRepo ? "GitHub/v2" : "Local Kernel", icon: Layout },
        { label: "Health Score", value: "98.2% Nominal", icon: Shield },
      ].map((item, i) => (
        <div key={i} className="p-5 bg-[#121214] border border-[#1f1f23] rounded-2xl hover:border-[#2a2a2f] transition-all">
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="w-3.5 h-3.5 text-[#1f1f23]" />
            <span className="text-[9px] font-mono font-bold text-[#1f1f23] uppercase tracking-widest">{item.label}</span>
          </div>
          <p className="text-[13px] font-bold text-[#e5e7eb] tracking-tight">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
