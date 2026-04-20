import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Startup from "@/models/Startup";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Rocket, Plus, Search } from "lucide-react";
import Image from "next/image";
import { StartupManagement } from "@/components/StartupManagement";

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
    <div className="max-w-7xl mx-auto py-10 px-6">
      <StartupManagement 
        startup={JSON.parse(JSON.stringify(startup))} 
        isLeader={isLeader} 
      />
    </div>
  );
}
