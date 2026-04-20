"use client";

import { useState } from "react";
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Upload, 
  ArrowUpRight,
  ShieldCheck,
  Target,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FundingTraction() {
  const [isDataRoomUnlocked, setIsDataRoomUnlocked] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
           <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Investor Data Room</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Centralized traction and funding repository</p>
              </div>
              <Button className="h-10 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase">
                <Upload size={14} className="mr-2" /> Upload Pitch Deck
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-emerald-600 shadow-sm">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Runway</p>
                    <p className="text-2xl font-black italic">6 Months</p>
                 </div>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-blue-600 shadow-sm">
                    <DollarSign size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Round</p>
                    <p className="text-2xl font-black italic">Pre-Seed</p>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50 dark:border-slate-800 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Traction Metrics (Live Sync)</h4>
              <div className="h-48 w-full bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
                 <BarChart3 size={40} className="text-slate-200 dark:text-slate-700" />
                 <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white dark:from-slate-900 to-transparent text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Sync with Revenue API to unlock charts</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="p-10 bg-emerald-600 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-20">
                <Target size={150} />
              </div>
              <h3 className="text-lg font-black uppercase italic tracking-tight relative z-10">Investor Readiness</h3>
              <div className="space-y-2 relative z-10">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span>Profile Strength</span>
                    <span>45%</span>
                 </div>
                 <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-white" />
                 </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-relaxed relative z-10">Completing your business model and tagline increased your rank by 12% among VCs.</p>
           </div>

           <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest italic">Featured Deck</h3>
              <div className="flex items-center gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                 <FileText className="text-red-500" size={24} />
                 <div>
                    <p className="text-[10px] font-black uppercase">Startup_Deck_V2.pdf</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Updated 2 days ago</p>
                 </div>
              </div>
              <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-2">
                Replace File
              </Button>
           </div>
        </div>
      </div>

      <div className="p-10 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-500">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Data Vault</span>
            </div>
            <h4 className="text-xl font-black uppercase italic tracking-tighter">Secure Equity Cap Table</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">All sensitive stakeholder data is locked behind founder-only permissions.</p>
         </div>
         <Button className="h-14 px-10 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">
           Manage Equity
         </Button>
      </div>
    </div>
  );
}
