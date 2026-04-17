import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { Search, Rocket, Users, Code2, ArrowRight, Filter, Plus } from "lucide-react";
import Link from "next/link";
import StartupSearchFilters from "@/components/startups/StartupSearchFilters";

export default async function ExploreStartupsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; tech?: string; role?: string }>;
}) {
  const { query, tech, role } = await searchParams;
  await dbConnect();

  let filter: any = { visibility: "public" };
  if (query) {
    filter.name = { $regex: query, $options: "i" };
  }
  if (tech) {
    filter.techStack = { $in: [tech] };
  }
  if (role) {
    filter.requiredRoles = { $in: [role] };
  }

  const startups = await Startup.find(filter)
    .populate("createdBy", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Explore Startups</h1>
          <p className="text-muted text-sm font-medium mt-1">Discover teams building the future and find your next mission.</p>
        </div>
        <Link href="/startups/create" className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm transition-all active:scale-95 w-fit">
          <Plus size={16} /> Register Startup
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <StartupSearchFilters initialQuery={query} initialTech={tech} initialRole={role} />
        </aside>

        {/* Startups Grid */}
        <div className="lg:col-span-3">
          {startups.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search size={32} />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 dark:text-white uppercase italic">No startups found</p>
                <p className="text-xs font-medium text-slate-500 uppercase mt-1 tracking-widest">Try adjusting your search or filters</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {startups.map((startup: any) => (
                <div key={startup._id.toString()} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all hover:border-emerald-500/20 group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-emerald-600 font-bold text-xl">
                      {startup.name[0]}
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                      {startup.status || "Ideation"}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
                      {startup.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-3 mb-6 leading-relaxed">
                      {startup.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {startup.techStack.map((tech: string) => (
                            <span key={tech} className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-wider">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Looking For</p>
                        <div className="flex flex-wrap gap-2">
                          {startup.requiredRoles.map((role: string) => (
                            <span key={role} className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-lg uppercase tracking-wider">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{startup.members.length} Members</span>
                    </div>
                    
                    <Link 
                      href={`/startups/${startup.slug}`} 
                      className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                    >
                      View Team <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
