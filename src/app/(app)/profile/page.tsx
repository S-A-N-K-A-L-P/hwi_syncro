import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Startup from "@/models/Startup";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserCircle, Mail, MapPin, GraduationCap, Code2, Briefcase, Calendar, Edit2, Link as LinkIcon, Users, Hexagon } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await dbConnect();
  const user: any = await User.findById(session.user.id).lean();
  if (!user) redirect("/login");
  let startup = null;

  if (user.currentStartup) {
    startup = await Startup.findById(user.currentStartup).lean() as any;
  }

  return (
    <div className="space-y-8">
      {/* LinkedIn-style Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="h-48 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)] bg-slate-50 dark:bg-slate-800" />
        
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 -mt-16">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900 shadow-xl overflow-hidden flex items-center justify-center font-black text-4xl text-emerald-600 italic uppercase">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.name} width={128} height={128} className="object-cover" />
                ) : user.name[0]}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-emerald-600 transition-colors">
                <Edit2 size={14} />
              </button>
            </div>
            
            <div className="flex gap-4 mb-2">
               <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/10 transition-all flex items-center gap-2">
                 <Edit2 size={14} /> Edit Profile
               </button>
               <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700">
                 Settings
               </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{user.name}</h1>
                <Hexagon size={16} className="text-emerald-500 opacity-20 fill-emerald-500" />
              </div>
              <p className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em]">
                {user.role} <span className="text-slate-200 dark:text-slate-800 mx-2">|</span> {user.universityName || "Alumni"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><MapPin size={14} /> {user.location || "India"}</div>
              <div className="flex items-center gap-1.5"><Calendar size={14} /> Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              <div className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About & Skills */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-sm">
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-4">Professional Bio</h2>
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
               {user.bio || "No biography provided yet. Tell the ecosystem about your mission."}
             </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-8 shadow-sm">
             <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 pb-4 flex items-center justify-between">
               Tech Stack & Skills
               <button className="text-[10px] text-emerald-600 hover:underline">Add Skill</button>
             </h2>
             <div className="flex flex-wrap gap-2">
               {user.skills && user.skills.length > 0 ? user.skills.map((skill: string) => (
                 <span key={skill} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] font-bold uppercase tracking-wider border border-slate-100 dark:border-slate-700">
                   {skill}
                 </span>
               )) : (
                 <p className="text-xs text-slate-400 font-medium italic">No skills listed yet.</p>
               )}
             </div>
          </div>
        </div>

        {/* Sidebar: Education & Current Startup */}
        <div className="space-y-8">
           {/* Current Startup */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Current Startup</h3>
              {startup ? (
                <Link href="/my-startup" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-xl group-hover:scale-105 transition-transform">
                    {startup.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{startup.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Builder</p>
                  </div>
                </Link>
              ) : (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic uppercase tracking-wider">Not part of any startup yet.</p>
                  <Link href="/startups" className="block text-center py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-emerald-600/30 transition-all">
                    Find a Team
                  </Link>
                </div>
              )}
           </div>

           {/* Education */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Education</h3>
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                   <GraduationCap size={20} />
                 </div>
                 <div className="space-y-1">
                   <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{user.universityName}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Batch Enrollment: {user.enrollmentNumber}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
