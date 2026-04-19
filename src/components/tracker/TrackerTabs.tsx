"use client";

import { motion } from "framer-motion";
import { List, User, Activity, ShieldCheck, PieChart } from "lucide-react";

export function TrackerTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: "overview", label: "Protocol", icon: ShieldCheck },
    { id: "tasks", label: "Tactical Ops", icon: List },
    { id: "contributors", label: "Operators", icon: User },
    { id: "activity", label: "Signal Feed", icon: Activity },
    { id: "verification", label: "Final Audit", icon: PieChart },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#1f1f23] rounded-[1.25rem] overflow-x-auto no-scrollbar shadow-inner relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-[1rem] transition-all whitespace-nowrap group relative ${
              isActive 
                ? "text-foreground" 
                : "text-muted hover:text-foreground/70"
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-[1rem] shadow-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <tab.icon className={`w-4 h-4 transition-all relative z-10 ${isActive ? "text-[#6366f1] scale-110" : "group-hover:text-[#6366f1]/50"}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
