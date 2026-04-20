"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: "ideation", label: "Ideation", description: "Market research & core concept" },
  { id: "prototype", label: "Prototype", description: "MVP & Technical Architecture" },
  { id: "user_gathering", label: "Early Access", description: "Community & beta testing" },
  { id: "revenue", label: "Monetization", description: "Business model & first clients" },
  { id: "expanding", label: "Expanding", description: "Scaling team & infrastructure" },
];

export function StartupStageTracker({ currentStage }: { currentStage: string }) {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-emerald-500 z-0 transition-all duration-1000" 
          style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />

        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center group">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4",
                  isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                  isCurrent ? "bg-white dark:bg-slate-900 border-emerald-500 text-emerald-500 shadow-lg shadow-emerald-500/20" :
                  "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-300"
                )}
              >
                {isCompleted ? <CheckCircle2 size={20} /> : 
                 isCurrent ? <Clock size={20} className="animate-pulse" /> : 
                 <Circle size={20} fill="currentColor" className="opacity-10" />}
              </div>
              
              <div className="mt-4 text-center">
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-widest leading-none",
                  isCurrent ? "text-slate-900 dark:text-white" : "text-slate-400"
                )}>
                  {stage.label}
                </p>
                <p className="hidden md:block text-[8px] font-bold text-slate-400 mt-1 max-w-[80px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
