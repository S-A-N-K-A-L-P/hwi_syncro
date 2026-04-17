"use client";

import { motion } from "framer-motion";
import { List, User, Activity, ShieldCheck, PieChart } from "lucide-react";

export function TrackerTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: "overview", label: "Protocol Overview", icon: ShieldCheck },
    { id: "tasks", label: "Tactical Ops", icon: List },
    { id: "contributors", label: "Node Operators", icon: User },
    { id: "activity", label: "Signal Feed", icon: Activity },
    { id: "verification", label: "Final Audit", icon: PieChart },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#1f1f23] rounded-2xl overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap group ${
              isActive 
                ? "bg-[#17171a] border border-[#1f1f23] text-[#e5e7eb]" 
                : "text-[#1f1f23] hover:text-[#9ca3af]"
            }`}
          >
            <tab.icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#6366f1]" : "group-hover:text-[#6366f1]/50"}`} />
            <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
