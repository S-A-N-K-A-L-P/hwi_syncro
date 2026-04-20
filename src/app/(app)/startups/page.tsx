import dbConnect from "@/lib/mongodb";
import Startup from "@/models/Startup";
import { Search, Rocket, Users, Code2, ArrowRight, Filter, Plus, PieChart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import StartupSearchFilters from "@/components/startups/StartupSearchFilters";
import { Button } from "@/components/ui/button";

export default async function ExploreStartupsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; stage?: string; industry?: string }>;
}) {
  const { query, stage, industry } = await searchParams;
  await dbConnect();

  let filter: any = { visibility: "public" };
  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: "i" } },
      { tagline: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }
  if (stage) {
    filter.status = stage;
  }
  if (industry) {
    filter.industry = industry;
  }

  const startups = await Startup.find(filter)
    .populate("createdBy", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-1000">
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden border-b border-border-subtle pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent transition-all">
             <Rocket size={20} />
             <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Strategic Discovery</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Global <span className="text-accent italic">Venture</span> Feed</h1>
          <p className="text-muted text-sm font-medium max-w-xl">Curated marketplace of mission-critical startups seeking institutional architects and strategic scaling.</p>
        </div>
        <Link href="/startups/create">
           <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-background rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-accent/10 transition-all active:scale-95">
             <Plus size={16} className="mr-2" /> Register New Venture
           </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Interaction Matrix */}
        <aside className="lg:col-span-1">
          <StartupSearchFilters initialQuery={query} initialStage={stage} initialIndustry={industry} />
        </aside>

        {/* Ventures Grid */}
        <div className="lg:col-span-3">
          {startups.length === 0 ? (
            <div className="enterprise-card bg-surface-alt/20 border-border-subtle p-20 text-center space-y-6">
              <div className="w-16 h-16 bg-background rounded-2xl border border-border-subtle flex items-center justify-center mx-auto text-muted">
                <Search size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-foreground tracking-tight uppercase">No Ventures Indexed</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Adjust your discovery parameters to view systemic opportunities.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {startups.map((startup: any) => (
                <div key={startup._id.toString()} className="enterprise-card p-8 flex flex-col h-full group hover:bg-surface-alt/50 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl bg-surface-alt border border-border-subtle flex items-center justify-center text-accent font-bold text-xl transition-transform group-hover:scale-105">
                      {startup.logo ? (
                         <img src={startup.logo} alt="" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                         startup.name[0]
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-[9px] font-bold text-accent uppercase tracking-widest bg-accent/5 border border-accent/20 px-3 py-1 rounded-md">
                         {startup.status?.replace('_', ' ') || "Ideation"}
                       </span>
                       <span className="text-[8px] font-mono font-bold text-muted uppercase">ID: {startup._id.toString().slice(-6)}</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors leading-tight">
                          {startup.name}
                        </h3>
                        <p className="text-xs font-medium text-accent italic mt-1 leading-tight">{startup.tagline}</p>
                    </div>
                    
                    <p className="text-muted text-[11px] font-medium line-clamp-3 leading-relaxed">
                      {startup.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                      <div>
                        <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-3">Architect Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {startup.techStack.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="text-[9px] font-bold text-foreground bg-surface-alt px-2 py-0.5 rounded border border-border-subtle">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[9px] font-bold text-muted uppercase tracking-widest mb-3">Cap Allocation</p>
                        <div className="flex items-center gap-2">
                           <PieChart size={12} className="text-accent" />
                           <span className="text-[10px] font-bold text-foreground">{startup.equityOffering || "TBD Equity"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-alt border border-border-subtle flex items-center justify-center">
                         <Users size={12} className="text-muted" />
                      </div>
                      <span className="text-[10px] font-bold text-muted uppercase"> {startup.members.length} Architects</span>
                    </div>
                    
                    <Link 
                      href={`/startups/${startup.slug}`} 
                      className="px-6 py-2.5 bg-foreground text-background dark:bg-white dark:text-slate-900 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-accent dark:hover:bg-accent hover:text-background dark:hover:text-background transition-all"
                    >
                      Audit Venture <ArrowRight size={14} />
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
