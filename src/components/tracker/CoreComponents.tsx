"use client";

import { motion } from "framer-motion";
import { Shield, Layout, Settings, Share2, MoreHorizontal, Zap, Activity } from "lucide-react";

export function ProjectHeader({ project }: { project: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121214] border border-[#1f1f23] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl"
    >
      {/* Dynamic Background Element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-[100px] group-hover:bg-[#6366f1]/20 transition-all duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
      
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700">
        <Layout className="w-48 h-48 rotate-12 scale-110" />
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center gap-2 backdrop-blur-md"
            >
              <Shield className="w-3.5 h-3.5 text-[#6366f1]" />
              <span className="text-[10px] font-mono font-black text-[#6366f1] uppercase tracking-[0.2em]">
                {project.orgId?.name || "Global Protocol"}
              </span>
            </motion.div>
            <ProjectStatusBadge status={project.status} />
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] font-mono font-bold text-muted uppercase tracking-widest leading-none">
              <Activity className="w-3 h-3" />
              Pulse: Nominal
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase italic leading-[0.9] drop-shadow-sm">
              {project.title}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-[#6366f1] to-transparent rounded-full" />
          </div>
          
          <p className="text-muted text-[16px] font-medium leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-2xl bg-[#17171a] border border-[#1f1f23] text-foreground transition-all shadow-lg"
          >
            <Share2 className="w-4.5 h-4.5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-2xl bg-[#17171a] border border-[#1f1f23] text-foreground transition-all shadow-lg"
          >
            <Settings className="w-4.5 h-4.5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-2xl bg-[#6366f1] text-white font-black text-[14px] uppercase tracking-widest hover:bg-[#4f46e5] transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
          >
            Access Core
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectStatusBadge({ status }: { status: string }) {
  const colors: any = {
    planning: "text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    active: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    completed: "text-[#6366f1] bg-[#6366f1]/10 border-[#6366f1]/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]",
    archived: "text-muted bg-surface/50 border-border-subtle",
  };

  return (
    <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono font-black text-[10px] uppercase tracking-[0.15em] backdrop-blur-md ${colors[status] || colors.planning}`}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-2 h-2 rounded-full bg-current`} 
      />
      {status}
    </div>
  );
}

export function ProjectProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-4 p-6 bg-[#121214] border border-[#1f1f23] rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted" />
          <span className="text-[11px] font-mono font-black text-muted uppercase tracking-[0.2em]">Deployment Integrity</span>
        </div>
        <span className="text-[14px] font-black text-foreground italic uppercase tracking-tighter drop-shadow-sm">{progress}% SYNCED</span>
      </div>
      <div className="h-4 bg-[#17171a] border border-[#1f1f23] rounded-full overflow-hidden p-[3px]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-emerald-400 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] relative"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
}

export function ProjectMetaInfo({ project }: { project: any }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Lead Architect", value: project.lead?.name || "Initializing...", icon: Zap, color: "#6366f1" },
        { label: "Node Strength", value: `${project.members?.length || 0} Operators`, icon: MoreHorizontal, color: "#10b981" },
        { label: "Deployment Hub", value: project.githubRepo ? "GitHub/v2" : "Local Kernel", icon: Layout, color: "#f59e0b" },
        { label: "Health Score", value: "98.2% Nominal", icon: Shield, color: "#ef4444" },
      ].map((item, i) => (
        <motion.div 
          key={i} 
          whileHover={{ y: -5, borderColor: item.color + '40' }}
          className="p-6 bg-[#121214] border border-[#1f1f23] rounded-[1.5rem] transition-all hover:bg-[#17171a] group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-surface border border-border-subtle group-hover:scale-110 transition-transform">
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <span className="text-[9px] font-mono font-black text-muted uppercase tracking-[0.2em]">{item.label}</span>
          </div>
          <p className="text-[14px] font-black text-foreground tracking-tight uppercase italic">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
