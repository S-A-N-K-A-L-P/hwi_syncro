import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import User from "@/models/User";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import { Rocket, Users, Code2, ShieldCheck, Mail, Building2, UserCircle, Settings, Share2, Sparkles, Briefcase } from "lucide-react";
import JoinStartupButton from "@/components/startups/JoinStartupButton";

export default async function StartupDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  await dbConnect();
  const session = await getServerSession(authOptions);

  const startup: any = await Startup.findOne({ slug })
    .populate("createdBy", "name avatar bio email")
    .populate("members", "name avatar role")
    .lean();

  if (!startup) {
    notFound();
  }

  const isCreator = session?.user?.id === startup.createdBy?._id?.toString();
  const isMember = startup.members?.some((m: any) => m?._id?.toString() === session?.user?.id);

  return (
    <div className="space-y-8">
      {/* Breadcrumb / Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <Link href="/startups" className="hover:text-emerald-600 transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-200">{startup.name}</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors border border-slate-100 dark:border-slate-800 rounded-lg">
            <Share2 size={16} />
          </button>
          {isCreator && (
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all">
              <Settings size={14} /> Manage
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Startup Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 space-y-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-24 h-24 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-500/10 flex items-center justify-center text-emerald-600 text-4xl font-black">
                {startup.name[0]}
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                   <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">{startup.status}</span>
                   <span className="text-muted text-[10px] font-bold uppercase tracking-widest">• Founded {new Date(startup.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">{startup.name}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">{startup.description}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Code2 size={14} className="text-emerald-500" /> Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {startup.techStack.map((tech: string) => (
                        <span key={tech} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] font-bold uppercase tracking-wider">{tech}</span>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} className="text-emerald-500" /> Hiring Status
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {startup.requiredRoles.map((role: string) => (
                        <div key={role} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl text-[11px] font-black uppercase tracking-widest border border-emerald-500/10 transition-all hover:bg-emerald-500 hover:text-white cursor-pointer group">
                           {role} <Plus size={10} className="group-hover:rotate-90 transition-transform" />
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>

            {!isMember && (
              <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                <JoinStartupButton startupId={startup._id.toString()} />
              </div>
            )}
            
            {isMember && isCreator && (
              <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Invite Code</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">{startup.inviteCode}</p>
                </div>
                <button className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-slate-400 hover:text-emerald-600 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Discussion placeholder or Activity */}
          <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Team Activity and Discussion starting soon</p>
          </div>
        </div>

        {/* Right Column: Team & Stats */}
        <div className="space-y-8">
          {/* Members Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-sm">
             <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                  <Users size={16} className="text-emerald-600" /> Core Team
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full">{startup.members.length}</span>
             </div>

             <div className="space-y-6">
                {startup.members.map((member: any) => (
                  <div key={member._id.toString()} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-bold text-sm text-slate-900 dark:text-white overflow-hidden shadow-xs">
                         {member.avatar ? (
                           <Image src={member.avatar} alt={member.name} width={40} height={40} className="object-cover" />
                         ) : member.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{member.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Member</p>
                      </div>
                    </div>
                    <Mail size={14} className="text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer" />
                  </div>
                ))}
             </div>
          </div>

          {/* Quick Stats Placeholder */}
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Product Stats</h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                 <p className="text-xl font-black text-slate-900 dark:text-white italic leading-none mb-1">0</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Updates</p>
               </div>
               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
                 <p className="text-xl font-black text-slate-900 dark:text-white italic leading-none mb-1">0</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Votes</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Plus } from "lucide-react";
