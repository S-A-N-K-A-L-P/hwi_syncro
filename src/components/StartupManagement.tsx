"use client";

import { useState } from "react";
import { 
  Users, 
  Target, 
  Sparkles, 
  HelpCircle, 
  Activity, 
  Settings, 
  ArrowUpRight,
  ShieldCheck,
  Mail,
  Share2,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StartupStageTracker } from "./StartupStageTracker";
import { RequestManagement } from "./RequestManagement";
import { StartupAssistant } from "./StartupAssistant";
import { MentorshipHub } from "./MentorshipHub";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TABS = [
  { id: "overview", label: "Mission Overview", icon: Target },
  { id: "team", label: "Core Architects", icon: Users },
  { id: "requests", label: "Recruitments", icon: Activity },
  { id: "assistant", label: "Syncro Assist", icon: Sparkles },
  { id: "mentorship", label: "Mentors", icon: HelpCircle },
];

export function StartupManagement({ 
  startup, 
  isLeader 
}: { 
  startup: any; 
  isLeader: boolean 
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="w-32 h-32 rounded-3xl bg-emerald-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-emerald-500/20">
            {startup.name[0]}
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-4">
               <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/10">
                 {isLeader ? "Lead Architect" : "Core Member"}
               </span>
               <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 dark:border-slate-700">
                 {startup.registrationType || "Unregistered"}
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{startup.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">{startup.description}</p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 pt-4 w-full md:w-auto">
             <Button className="flex-1 md:w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-sm">
               <Settings size={16} className="mr-2" /> Startup Settings
             </Button>
             <Button variant="outline" className="flex-1 md:w-full h-14 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-600/50 transition-all shadow-xs">
               <Share2 size={16} className="mr-2" /> Share Concept
             </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.id === "requests" && !isLeader) return null;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                isActive 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Mission Roadmap</h3>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 px-4 py-1.5 rounded-full border border-emerald-500/10">Stage: {startup.status}</span>
              </div>
              <StartupStageTracker currentStage={startup.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-2xl shadow-emerald-500/20 group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),transparent_40%)] pointer-events-none" />
                  <div className="relative space-y-2">
                     <h3 className="text-sm font-black uppercase tracking-widest opacity-80">Invite Core Architects</h3>
                     <p className="text-4xl lg:text-6xl font-black tracking-widest leading-none mb-1 italic uppercase">{startup.inviteCode}</p>
                     <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Architects must apply to join your mission</p>
                  </div>
                  <Button variant="secondary" className="relative self-start h-14 px-8 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                    Copy invite Code
                  </Button>
               </div>

               <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-500" /> Certification Status
                     </p>
                     <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Vanguard Verified</h3>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">Your startup has passed the initial validation check and is now visible to the global mentorship network.</p>
                  </div>
                  <Button variant="outline" className="self-start mt-6 border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-emerald-500/50 transition-all">
                    View Credentials <ArrowUpRight size={14} className="ml-2" />
                  </Button>
               </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <Users size={18} className="text-emerald-600" /> Active Architects
                 </h2>
                 <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full">{startup.members.length} Architects Found</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startup.members.map((member: any) => (
                  <div key={member._id} className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-3xl flex items-center justify-between group hover:border-emerald-500/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-900 dark:text-white relative overflow-hidden group-hover:border-emerald-500/30 transition-all">
                         {member.avatar ? (
                           <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                         ) : member.name[0]}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{member.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{member._id === startup.createdBy._id ? "Lead Architect" : "Engineer"}</p>
                      </div>
                    </div>
                    <Mail size={18} className="text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer" />
                  </div>
                ))}
              </div>
           </div>
        )}

        {activeTab === "requests" && isLeader && (
           <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Pending Applicant Pipeline</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full">Recruitment Active</span>
              </div>
              <RequestManagement startupId={startup._id} />
           </div>
        )}

        {activeTab === "assistant" && (
          <StartupAssistant />
        )}

        {activeTab === "mentorship" && (
           <MentorshipHub />
        )}
      </div>
    </div>
  );
}
