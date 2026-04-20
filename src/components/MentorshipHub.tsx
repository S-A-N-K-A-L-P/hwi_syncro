"use client";

import { Monitor, Smartphone, Globe, Layers, Cpu, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MENTORS = [
  {
    title: "Mobile App Mastery",
    expert: "App Architect Unit",
    description: "Build high-performance Flutter and React Native cross-platform ecosystems.",
    icon: <Smartphone size={32} className="text-emerald-500" />,
    tags: ["Flutter", "Swift", "Kotlin"]
  },
  {
    title: "Web Engine Design",
    expert: "Vanguard Dev",
    description: "Scale your Next.js and React applications to millions of active users.",
    icon: <Globe size={32} className="text-emerald-500" />,
    tags: ["Next.js", "Turbo", "Vercel"]
  },
  {
    title: "Enterprise Systems",
    expert: "Core Infrastructure",
    description: "Architect secure, distributed enterprise software systems (LLM to OS level).",
    icon: <Layers size={32} className="text-emerald-500" />,
    tags: ["K8s", "Docker", "DevOps"]
  },
  {
    title: "LLM & OS Intelligence",
    expert: "Cognitive Engineer",
    description: "Integrate large language models deeply into system workflows.",
    icon: <Cpu size={32} className="text-emerald-500" />,
    tags: ["Python", "PyTorch", "Rust"]
  }
];

export function MentorshipHub() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">Mentorship Hub</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Connect with specialized architectural units</p>
        </div>
        <Button variant="outline" className="h-10 rounded-xl px-6 border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500/50 transition-all">
          Find More Mentors
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MENTORS.map((mentor, i) => (
          <div key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-500">
                {mentor.icon}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{mentor.expert}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight leading-none">{mentor.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{mentor.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {mentor.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700/30">{tag}</span>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 mt-8 text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest hover:text-emerald-600 transition-colors group/btn">
              Request Mentorship <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
