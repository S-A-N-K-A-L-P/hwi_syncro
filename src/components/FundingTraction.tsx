"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Target, 
  ArrowUpRight,
  Lock,
  Search,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FundingTraction() {
  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-1000">
      {/* Capital Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="enterprise-card p-10 space-y-10 relative overflow-hidden">
             <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
             
             <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight">Institutional Data Room</h3>
                  <p className="text-[11px] font-medium text-muted uppercase tracking-widest">Secure repository for capital raising & due diligence</p>
                </div>
                <div className="flex gap-3">
                   <Button variant="outline" className="h-10 rounded-lg text-xs font-bold border-border-subtle hover:bg-surface-alt">
                      <Lock size={14} className="mr-2 text-muted" /> Access Logs
                   </Button>
                   <Button className="h-10 rounded-lg bg-accent hover:bg-accent/90 text-background text-xs font-bold shadow-lg shadow-accent/10">
                      <Upload size={14} className="mr-2" /> Upload Asset
                   </Button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative z-10">
                {[
                  { label: "Capital Target", value: "$2.5M", icon: DollarSign, color: "text-accent" },
                  { label: "Current Runway", value: "11.4 Mo", icon: TrendingUp, color: "text-emerald-500" },
                  { label: "Dilution Cap", value: "15.0%", icon: BarChart3, color: "text-blue-500" },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 bg-surface-alt/40 rounded-xl border border-border-subtle group hover:border-accent/40 transition-colors">
                     <div className={cn("w-8 h-8 rounded-lg bg-background border border-border-subtle flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.color)}>
                        <stat.icon size={16} />
                     </div>
                     <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">{stat.label}</p>
                     <p className="text-xl font-bold mt-2 tracking-tight">{stat.value}</p>
                  </div>
                ))}
             </div>

             <div className="pt-10 border-t border-border-subtle space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                   <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Core Assets & Documentation</h4>
                   <button className="text-[10px] font-bold text-accent uppercase hover:underline">View All Documents</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { name: "Executive_Summary_Q1.pdf", size: "2.4 MB", type: "PDF", date: "2 days ago" },
                     { name: "Financial_Model_v4.xlsx", size: "12.1 MB", type: "XLS", date: "5 days ago" },
                     { name: "Cap_Table_Structure.pdf", size: "1.2 MB", type: "PDF", date: "Jan 12" },
                     { name: "Legal_Compliance_Kit.zip", size: "45.0 MB", type: "ZIP", date: "Dec 20" },
                   ].map((file) => (
                     <div key={file.name} className="flex items-center justify-between p-4 bg-background border border-border-subtle rounded-xl hover:bg-surface-alt transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center text-muted group-hover:bg-accent group-hover:text-background transition-colors">
                              <FileText size={18} />
                           </div>
                           <div>
                              <p className="text-[12px] font-bold text-foreground truncate max-w-[150px]">{file.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-[9px] font-mono font-bold text-muted">{file.type}</span>
                                 <span className="w-1 h-1 rounded-full bg-border-subtle" />
                                 <span className="text-[9px] font-medium text-muted uppercase">{file.size}</span>
                              </div>
                           </div>
                        </div>
                        <ChevronRight size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Tactical Readiness Column */}
        <div className="space-y-8">
           <div className="enterprise-card p-10 bg-accent text-background relative overflow-hidden shadow-2xl shadow-accent/20 border-none">
              <div className="absolute right-0 top-0 opacity-10 -translate-y-1/4 translate-x-1/4">
                 <ShieldCheck size={200} />
              </div>
              <div className="relative z-10 space-y-8">
                 <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight leading-none">Investor Readiness</h3>
                    <p className="text-[10px] font-bold text-background/80 uppercase tracking-widest">Protocol Alignment Check</p>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-bold uppercase">System Score</span>
                       <span className="text-3xl font-black italic tracking-tighter">78/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-background/20 rounded-full overflow-hidden">
                       <div className="h-full w-[78%] bg-background shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t border-background/20 space-y-4">
                    <p className="text-[11px] font-medium leading-relaxed opacity-90">
                       Increasing data room transparency by uploading the Financial Model improved your score by 12 points.
                    </p>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
                       Optimize Protocol <ArrowUpRight size={14} />
                    </button>
                 </div>
              </div>
           </div>

           <div className="enterprise-card p-8 space-y-6">
              <div className="flex items-center gap-2">
                 <Search size={14} className="text-accent" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Investor Discovery</h4>
              </div>
              <div className="p-4 rounded-xl border border-border-subtle bg-surface-alt/20 space-y-3">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <p className="text-[11px] font-bold text-foreground">Strategic Matching</p>
                       <p className="text-[10px] text-muted leading-tight">3 Institutional VCs match your current profile.</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-background border border-border-subtle flex items-center justify-center">
                       <Target size={14} className="text-accent" />
                    </div>
                 </div>
                 <Button variant="outline" className="w-full h-8 text-[9px] uppercase font-bold border-border-subtle hover:bg-accent hover:text-background transition-all">
                    View Potential Matches
                 </Button>
              </div>
           </div>
        </div>
      </div>
      
      {/* Transactional Integrity Footer */}
      <div className="enterprise-card p-8 bg-surface-alt/10 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-background border border-border-subtle flex items-center justify-center text-accent shadow-sm">
               <ShieldCheck size={28} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-foreground">Encrypted Execution Layer</h4>
               <p className="text-[11px] text-muted font-medium">All financial metadata is hashed and stored in our secure institutional vault.</p>
            </div>
         </div>
         <div className="flex gap-3">
            <Button variant="outline" className="h-10 rounded-lg text-xs font-bold border-border-subtle px-6">Manage Stakeholders</Button>
            <Button className="h-10 rounded-lg bg-foreground text-background dark:bg-white dark:text-slate-900 text-xs font-bold px-8 hover:bg-accent transition-colors">
               Issue Equity Term
            </Button>
         </div>
      </div>
    </div>
  );
}
