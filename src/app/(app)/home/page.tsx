import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { Search, Rocket, Zap, ArrowRight, Star, Plus } from "lucide-react";
import Link from "next/link";
import JoinCodeSection from "@/components/home/JoinCodeSection";

export default async function HomePage() {
  await dbConnect();

  const featuredStartups = await Startup.find({ visibility: "public" })
    .populate("createdBy", "name avatar")
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <div className="space-y-10">
      {/* Search & Join Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Welcome to the Ecosystem</h1>
            <p className="text-muted text-xs font-bold uppercase tracking-widest">Discover startups, join teams, and build the future.</p>
          </div>
          
          <JoinCodeSection />
        </div>
      </section>

      {/* Featured Startups Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Rocket className="text-emerald-600" size={20} />
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Featured Startups</h2>
          </div>
          <Link href="/startups" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 hover:underline underline-offset-4">
            Explore All <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStartups.map((startup: any) => (
            <div key={startup._id.toString()} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-xs hover:shadow-md hover:border-emerald-500/20 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-emerald-600 font-bold">
                  {startup.name[0]}
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest opacity-80">{startup.status}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-emerald-600 transition-colors">
                  {startup.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-2 leading-relaxed mb-4">
                  {startup.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {startup.techStack.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href={`/startups/${startup.slug}`} 
                className="w-full py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                View Startup <ArrowRight size={12} />
              </Link>
            </div>
          ))}
          
          {/* Create Startup CTA Card */}
          <Link href="/startups/create" className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-600/50 hover:bg-emerald-50/10 transition-all group min-h-[250px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all">
              <Plus size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Register a Startup</p>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase">Start your journey today</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Announcements / Ecosystem Activity placeholder */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Ecosystem Pulse</h3>
            <p className="text-xs font-medium text-slate-500 max-w-md">Connect with founders, find mentors, and get real-world feedback on your startup projects.</p>
          </div>
          <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
            Join Community Discord
          </button>
        </div>
      </section>
    </div>
  );
}
