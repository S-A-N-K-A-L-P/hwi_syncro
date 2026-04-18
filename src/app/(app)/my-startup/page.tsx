import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Startup from "@/models/Startup";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Rocket, Plus, Search, Users, ShieldCheck, Mail, Share2, Settings, Code2, Copy, Zap, Info } from "lucide-react";
import Image from "next/image";

export default async function MyStartupPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  
  // Find user and their startup
  const dbUser: any = await User.findById(session.user.id).lean();
  if (!dbUser) redirect("/login");

  let startup = null;

  if (dbUser.currentStartup) {
    startup = await Startup.findById(dbUser.currentStartup)
      .populate("members", "name avatar email role bio")
      .populate("createdBy", "name avatar")
      .lean() as any;
  }

  // Case 1: User not in a startup
  if (!startup) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-12 md:p-20 text-center space-y-10 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
          
          <div className="relative space-y-8">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100 dark:border-slate-700">
              <Rocket size={48} className="animate-pulse" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
                You're not in a <span className="text-emerald-600">Startup</span> yet
              </h1>
              <p className="text-slate-500 max-w-lg mx-auto font-medium text-lg leading-relaxed">
                Start your journey by building your own team or joining an existing mission across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link 
                href="/startups/create" 
                className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Plus size={20} /> Register a Startup
              </Link>
              <Link 
                href="/startups" 
                className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:border-emerald-600/50 transition-all flex items-center justify-center gap-3 shadow-xs"
              >
                <Search size={20} /> Explore Startups
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLeader = startup.createdBy?._id?.toString() === session.user.id;

  // Case 2: User is in a startup
  return (
    <div className="space-y-8">
      {/* Header Info */}
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
               <span className="text-muted text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={14} /> Certified Team
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{startup.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">{startup.description}</p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 pt-4 w-full md:w-auto">
             <button className="flex-1 md:w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-sm">
               <Settings size={16} /> Manage Team
             </button>
             <button className="flex-1 md:w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-xs">
               <Share2 size={16} /> Dashboard
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Management Dashboard */}
        <div className="lg:col-span-2 space-y-8">
           {/* Team Info Section */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                 <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                   <Users size={16} className="text-emerald-600" /> Core Architects
                 </h2>
                 <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">{startup.members.length} Total</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {startup.members.map((member: any) => (
                   <div key={member._id.toString()} className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-900 dark:text-white relative overflow-hidden group-hover:border-emerald-500/30 transition-all">
                           {member.avatar ? (
                             <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                           ) : member.name[0]}
                        </div>
                        <div>
                           <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{member.name}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{member._id.toString() === startup.createdBy._id.toString() ? "Leader" : "Member"}</p>
                        </div>
                      </div>
                      <Mail size={16} className="text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Invite Code Control */}
           <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),transparent_40%)] pointer-events-none" />
              <div className="relative space-y-2 text-center md:text-left">
                 <h3 className="text-sm font-black uppercase tracking-widest opacity-80 backdrop-blur-sm">Exclusive Invite Code</h3>
                 <p className="text-4xl md:text-5xl font-black tracking-widest leading-none mb-1 italic uppercase">{startup.inviteCode}</p>
                 <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Share this code with your elite team</p>
              </div>
              <button className="relative px-8 py-5 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                <Copy size={18} /> Copy Code
              </button>
           </div>
        </div>

        {/* Sidebar: Details & Settings */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-sm">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Code2 size={14} className="text-emerald-500" /> Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {startup.techStack.map((tech: string) => (
                      <span key={tech} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-bold uppercase tracking-wider">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-emerald-500" /> Recruitment
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {startup.requiredRoles.map((role: string) => (
                      <span key={role} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">{role}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 min-w-[40px]">
                      <Info size={20} />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Ecosystem Tip</p>
                      <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase">Founders who update their tech stacks weekly get 2.4x more builder requests.</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
