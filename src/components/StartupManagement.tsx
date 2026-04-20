"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { StartupStageTracker } from "./StartupStageTracker";
import { RequestManagement } from "./RequestManagement";
import { StartupAssistant } from "./StartupAssistant";
import { MentorshipHub } from "./MentorshipHub";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const TABS = [
  { id: "overview", label: "Overview", icon: Target },
  { id: "team", label: "Architects", icon: Users },
  { id: "product", label: "Product Builder", icon: Layout },
  { id: "tasks", label: "Task Engine", icon: ListChecks },
  { id: "assistant", label: "AI Assistant", icon: Sparkles },
  { id: "mentors", label: "Mentors", icon: HelpCircle },
  { id: "funding", label: "Funding", icon: PieChart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function StartupManagement({ 
  startup, 
  isLeader,
  initialTab = "overview"
}: { 
  startup: any; 
  isLeader: boolean;
  initialTab?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = initialTab;

  const handleTabChange = (tabId: string) => {
    router.push(`/my-startup/${tabId}`);
  };

  const getStageAdvice = () => {
    switch (startup.status) {
      case 'ideation': return "Focus on problem validation. Conduct at least 15 potential user interviews to verify your problem statement before building the prototype.";
      case 'prototype': return "Execute rapid prototyping. Use the AI Product Builder to scaffold your MVP and test core functionality with a small cohort.";
      case 'early_users': return "Optimize for retention. Track how frequently your 'Alpha' users return and fix friction points in the onboarding flow.";
      case 'revenue': return "Stabilize unit economics. Ensure your CAC is lower than LTV and prepare your first professional pitch deck for investors.";
      case 'scaling': return "Automate and delegate. Expand your 'Architect' team and focus on multi-channel growth strategies.";
      default: return "Define your next milestone and assign tasks to your core team.";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Internal Sidebar for Startup Dashboard */}
      <div className="w-full lg:w-64 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
           <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                {startup.name[0]}
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate w-32">{startup.name}</h2>
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{startup.status}</p>
              </div>
           </div>
           
           <nav className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                      isActive 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" 
                        : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
           </nav>
        </div>

        {isLeader && (
           <div className="bg-emerald-600 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-emerald-500/20">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80">Invite Code</h3>
              <p className="text-2xl font-black tracking-widest italic">{startup.inviteCode}</p>
              <Button size="sm" className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black text-[10px] uppercase">
                Copy Code
              </Button>
           </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                   <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white mb-1">Mission Roadmap</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth progression and current trajectory</p>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 px-4 py-2 rounded-full border border-emerald-500/10">Stage: {startup.status}</span>
              </div>
              <StartupStageTracker currentStage={startup.status} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                 {[
                   { label: "Active Users", value: startup.kpis?.users || 0, change: "+12%" },
                   { label: "Revenue", value: `$${startup.kpis?.revenue || 0}`, change: "+5%" },
                   { label: "Growth", value: `${startup.kpis?.growth || 0}%`, change: "+2%" },
                 ].map((kpi, i) => (
                   <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white italic">{kpi.value}</p>
                      <p className="text-[9px] font-bold text-emerald-500">{kpi.change} This Week</p>
                   </div>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-emerald-500" size={24} />
                    <h3 className="text-lg font-black uppercase italic tracking-tight">Mission Metadata</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registration</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{startup.registrationType || "Not Registered"}</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Model</span>
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{startup.businessModel || "SaaS"}</span>
                     </div>
                     <div className="flex justify-between items-center py-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Equity Pool</span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase">{startup.equityOffering || "0%"}</span>
                     </div>
                  </div>
               </div>

               <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                    <Rocket size={120} />
                  </div>
                  <h3 className="text-lg font-black uppercase italic tracking-tight relative z-10">Next Strategic Move</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed relative z-10">
                    {startup.status === 'ideation' 
                      ? "Focus on problem validation. Conduct at least 15 potential user interviews to verify your problem statement before building the prototype."
                      : "Prepare for beta launch. Ensure your core product loop is stable and you have a basic onboarding flow for early users."
                    }
                  </p>
                  <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl relative z-10">
                    Get AI Blueprint
                  </Button>
               </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
           <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-6">
                   <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                     <Users size={18} className="text-emerald-600" /> Active Architects
                   </h2>
                   <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-full">{startup.members.length} Architects</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {startup.members.map((member: any) => (
                    <div key={member._id} className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold relative overflow-hidden">
                           {member.avatar ? <Image src={member.avatar} alt={member.name} fill className="object-cover" /> : member.name[0]}
                        </div>
                        <div>
                           <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{member.name}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{member._id === startup.createdBy._id ? "Lead Architect" : "Engineer"}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-300 hover:text-emerald-600"><Mail size={18} /></Button>
                    </div>
                  ))}
                </div>
              </div>

              {isLeader && (
                <div className="space-y-6">
                   <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white px-4">Applicant Pool</h3>
                   <RequestManagement startupId={startup._id} />
                </div>
              )}
           </div>
        )}

        {/* Placeholder sections for the new deep features */}
        {activeTab === "product" && (
          <div className="p-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] text-center space-y-6 shadow-sm">
             <Layout size={48} className="mx-auto text-emerald-600 opacity-20" />
             <div>
               <h3 className="text-xl font-black uppercase italic tracking-tight">AI Product Builder</h3>
               <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto uppercase mt-2">Initialize your Mobile, Web, or AI Product using architectural scaffolding templates.</p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
               {["Mobile App", "Web Platform", "AI Engine"].map(type => (
                 <div key={type} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group">
                   <h4 className="text-[10px] font-black uppercase mb-1">{type}</h4>
                   <p className="text-[8px] font-bold text-slate-400 uppercase">Beta Scaffolding</p>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === "tasks" && (
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest">Sprint Execution</h3>
                <Button className="bg-emerald-600 text-white font-black text-[10px] uppercase">New Mission Task</Button>
              </div>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">Initialize Backend Architecture</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Priority: High • AI Suggested</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full">To Do</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === "assistant" && <StartupAssistant />}
        {activeTab === "mentors" && <MentorshipHub />}
        
        {activeTab === "funding" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8">
                <h3 className="text-sm font-black uppercase tracking-widest">Investor Readiness</h3>
                <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-4">
                   <PieChart size={32} className="mx-auto text-slate-300" />
                   <p className="text-[10px] font-black uppercase text-slate-400">Upload Pitch Deck to start tracking metrics</p>
                   <Button variant="outline" className="text-[10px] uppercase font-black">Upload Deck (.PDF)</Button>
                </div>
             </div>
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest">Current Traction</h3>
                <div className="space-y-4">
                   <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-emerald-500" />
                   </div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase text-center">33% Investor Ready</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === "settings" && (
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest">Ecosystem Settings</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50 dark:border-slate-800">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 text-xs font-bold uppercase tracking-widest">
                    <option>Public Mission</option>
                    <option>Stealth Mode</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recruitment status</label>
                  <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest rounded-xl">
                    Accepting Applications
                  </Button>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
