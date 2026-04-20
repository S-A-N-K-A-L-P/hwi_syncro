"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Rocket, 
  Target, 
  ArrowUpRight, 
  MoreHorizontal, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RequestManagement } from "./RequestManagement";
import { StartupAssistant } from "./StartupAssistant";
import { MentorshipHub } from "./MentorshipHub";
import { ProductBuilder } from "./ProductBuilder";
import { TaskManager } from "./TaskManager";
import { FundingTraction } from "./FundingTraction";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface StartupManagementProps {
  startup: any;
  activeTab: string;
  isLeader: boolean;
}

export function StartupManagement({ startup, activeTab, isLeader }: StartupManagementProps) {
  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section: Enterprise Dashboard Style */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-2 border-b border-border-subtle">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-surface-alt border border-border-subtle flex items-center justify-center text-accent font-bold text-xl shadow-sm">
               {startup.logo ? (
                 <Image src={startup.logo} alt="" width={48} height={48} className="w-full h-full object-cover rounded-xl" />
               ) : (
                 startup.name?.[0]
               )}
             </div>
             <div>
               <div className="flex items-center gap-2">
                 <h1 className="text-2xl font-bold tracking-tight text-foreground">{startup.name}</h1>
                 <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-widest border border-accent/20">
                   {startup.status}
                 </span>
               </div>
               <p className="text-xs font-medium text-muted mt-0.5 max-w-xl">{startup.tagline}</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
             {startup.members?.slice(0, 4).map((m: any, i: number) => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-alt flex items-center justify-center text-[10px] font-bold text-muted ring-1 ring-border-subtle">
                 {m.name?.[0] || 'U'}
               </div>
             ))}
             {startup.members?.length > 4 && (
               <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                 +{startup.members.length - 4}
               </div>
             )}
          </div>
          <Button variant="outline" className="h-10 rounded-lg text-xs font-bold gap-2 px-4 border-border-subtle hover:bg-surface-alt">
            <Globe size={14} className="text-muted" /> Public Profile
          </Button>
          {isLeader && (
             <Button className="h-10 rounded-lg bg-accent hover:bg-accent/90 text-background text-xs font-bold gap-2 px-6 shadow-lg shadow-accent/10">
               <Zap size={14} className="fill-current" /> Execute Command
             </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Console View */}
        {(activeTab === "overview" || !activeTab) && (
          <div className="space-y-8">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: "Deployment Health", value: "98.2%", icon: ShieldCheck, color: "text-emerald-500", trend: "+1.2%" },
                 { label: "Active Contributors", value: startup.members?.length || 0, icon: Users, color: "text-blue-500", trend: "Stable" },
                 { label: "Sprint Velocity", value: "14 pts", icon: Rocket, color: "text-purple-500", trend: "-2.4%" },
                 { label: "Runway Index", value: "6.4mo", icon: BarChart3, color: "text-amber-500", trend: "+0.5%" },
               ].map((stat) => (
                 <div key={stat.label} className="enterprise-card p-6 flex flex-col justify-between hover:border-accent/30">
                    <div className="flex justify-between items-start">
                       <div className={cn("p-2 rounded-lg bg-surface-alt border border-border-subtle", stat.color)}>
                         <stat.icon size={16} />
                       </div>
                       <span className={cn(
                         "text-[10px] font-bold",
                         stat.trend.startsWith('+') ? "text-emerald-500" : stat.trend === 'Stable' ? "text-muted" : "text-red-500"
                       )}>{stat.trend}</span>
                    </div>
                    <div className="mt-4">
                       <p className="text-[10px] font-medium text-muted uppercase tracking-wider">{stat.label}</p>
                       <p className="text-xl font-bold mt-1">{stat.value}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Strategic Roadmap */}
               <div className="lg:col-span-2 enterprise-card p-8 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <Target size={16} className="text-accent" /> Strategic Roadmap
                      </h3>
                      <p className="text-[10px] font-medium text-muted">Current objectives and mission-critical milestones</p>
                    </div>
                    <button className="text-muted hover:text-foreground p-1 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[
                      { step: "Discovery & Validation", desc: "User interviews and problem-solution fit analysis", status: "completed", date: "Jan 12" },
                      { step: "Core Infrastructure", desc: "Setting up base architecture and CI/CD pipelines", status: "active", date: "Present" },
                      { step: "Alpha Deployment", desc: "Initial launch to closed group of 100 enterprise users", status: "pending", date: "Feb 15" },
                      { step: "Scaling & Integration", desc: "Third-party API ecosystem and multi-region support", status: "pending", date: "Mar 30" },
                    ].map((step, idx) => (
                      <div key={step.step} className="flex gap-4 relative group">
                        {idx !== 3 && <div className="absolute left-3 top-8 bottom-[-24px] w-0.5 bg-border-subtle" />}
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 relative z-10 transition-colors",
                          step.status === 'completed' ? "bg-accent border-accent text-background" : 
                          step.status === 'active' ? "bg-background border-accent text-accent animate-pulse" : 
                          "bg-background border-border-subtle text-muted"
                        )}>
                          {step.status === 'completed' ? <ShieldCheck size={12} /> : idx + 1}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex justify-between items-start">
                             <h4 className={cn("text-[13px] font-bold", step.status === 'pending' ? "text-muted" : "text-foreground")}>{step.step}</h4>
                             <span className="text-[10px] font-mono font-medium text-muted uppercase">{step.date}</span>
                          </div>
                          <p className="text-[11px] text-muted mt-1 leading-relaxed max-w-md">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Advisor Panel */}
               <div className="space-y-8">
                  <div className="enterprise-card p-8 bg-surface-alt/30 border-accent/20 relative overflow-hidden group">
                     <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                        <Zap size={140} />
                     </div>
                     <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-background">
                              <Sparkles size={16} />
                           </div>
                           <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Active Protocol</h3>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[11px] font-bold text-foreground leading-relaxed">
                              "Infrastructure scaling detected. Recommendation: Optimize database indices for global read-latency."
                           </p>
                           <Button variant="outline" className="w-full justify-between h-10 text-[10px] uppercase font-bold border-accent/20 hover:bg-accent hover:text-background transition-all">
                              Deploy Solution <ChevronRight size={14} />
                           </Button>
                        </div>
                     </div>
                  </div>

                  <div className="enterprise-card p-6 space-y-4 shadow-xl shadow-black/5 bg-accent/5 border-accent/10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted">Upcoming Milestone</h3>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-background border border-border-subtle flex items-center justify-center">
                          <Clock size={16} className="text-accent" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-foreground">Launch Beta Phase</p>
                          <p className="text-[10px] text-muted font-medium">In 12 days • Global Market</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Modular Component Views */}
        {activeTab === "team" && <RequestManagement startupId={startup._id} />}
        {activeTab === "product" && <ProductBuilder />}
        {activeTab === "tasks" && <TaskManager />}
        {activeTab === "assistant" && <StartupAssistant />}
        {activeTab === "mentors" && <MentorshipHub />}
        {activeTab === "funding" && <FundingTraction />}
        
        {activeTab === "settings" && (
          <div className="enterprise-card p-10 space-y-8 bg-surface-alt/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background border border-border-subtle flex items-center justify-center">
                 <Settings size={20} className="text-muted" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">System Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {["Profile Visibility", "Member Permissions", "AI Core Preferences", "External Integrations"].map(opt => (
                 <div key={opt} className="p-6 bg-background rounded-xl border border-border-subtle hover:border-accent/40 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                       <span className="text-[13px] font-semibold text-foreground">{opt}</span>
                       <ArrowRight size={14} className="text-muted group-hover:translate-x-1 group-hover:text-accent transition-all" />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
