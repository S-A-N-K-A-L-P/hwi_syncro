import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { Search, Rocket, Zap, ArrowRight, Star, Plus, ShieldCheck, Globe, Trophy } from "lucide-react";
import Link from "next/link";
import JoinCodeSection from "@/components/home/JoinCodeSection";

export default async function HomePage() {
  await dbConnect();

  const featuredStartups = await Startup.find({ visibility: "public" })
    .populate("createdBy", "name avatar")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return (
    <div className="relative isolate">
      {/* Decorative background elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-emerald-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="space-y-12">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-emerald-500/5">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
          
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">Ecosystem Active</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-[0.95]">
                Forge Your <span className="text-emerald-600">Startup</span> Future
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-xl mx-auto uppercase tracking-wide">
                The high-performance landscape for Indian innovators to connect, build, and scale world-class ventures.
              </p>
            </div>
            
            <JoinCodeSection />
          </div>
        </section>

        {/* High-Density Registry Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <ShieldCheck size={18} />
                 </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Verified Registry</h2>
              </div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest pl-10">Explore tactical startup nodes across the network</p>
            </div>
            <Link href="/startups" className="text-[10px] font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
              All Units <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStartups.map((startup: any) => (
              <div key={startup._id.toString()} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 hover:border-emerald-500/30 transition-all group flex flex-col h-full overflow-hidden relative">
                {/* Tactical Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 -mr-8 -mt-8 rotate-45 group-hover:bg-emerald-500/10 transition-colors" />

                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-emerald-600 font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                    {startup.name[0]}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{startup.status}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 px-1">
                      <Star size={10} className="fill-current" />
                      <span className="text-[9px] font-bold uppercase tracking-tighter italic">Top Tier</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight group-hover:text-emerald-600 transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium line-clamp-3 leading-relaxed">
                    {startup.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {startup.techStack.slice(0, 3).map((tech: string) => (
                      <span key={tech} className="text-[8px] font-black text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-md uppercase tracking-widest border border-slate-200/50 dark:border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                   <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900" />
                    ))}
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[8px] font-bold text-emerald-600 border-2 border-white dark:border-slate-900">
                      +5
                    </div>
                   </div>
                   <Link 
                    href={`/startups/${startup.slug}`} 
                    className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-900 dark:text-white tracking-widest hover:text-emerald-600 transition-colors"
                  >
                    Deploy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Create Startup CTA Card */}
            <Link href="/startups/create" className="relative h-full min-h-[320px] rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-8 gap-6 hover:border-emerald-600 hover:bg-emerald-50/20 dark:hover:bg-emerald-900/5 transition-all group overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative bg-white dark:bg-slate-900 p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Plus size={32} className="text-emerald-600" />
               </div>
               <div className="space-y-2 relative">
                <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Forge New Unit</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-[150px]">Register your startup in the ecosystem registry</p>
               </div>
            </Link>
          </div>
        </section>

        {/* Pulse / Activity Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                <Globe size={120} className="text-emerald-500" />
              </div>
              <div className="relative space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <Trophy size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Global Vanguard</h3>
                  <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">Join the most active community of builders across 50+ sectors.</p>
                </div>
                <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                  Join Discord
                </button>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 flex flex-col justify-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Mission Updates</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 items-start group cursor-pointer">
                      <div className="w-1 h-8 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                      <div>
                        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">New Hackathon Initialized</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">2 Hours Ago // Node India</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
