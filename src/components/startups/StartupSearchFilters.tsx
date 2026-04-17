'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";

interface StartupSearchFiltersProps {
  initialQuery?: string;
  initialTech?: string;
  initialRole?: string;
}

export default function StartupSearchFilters({ initialQuery, initialTech, initialRole }: StartupSearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");
  const [tech, setTech] = useState(initialTech || "");
  const [role, setRole] = useState(initialRole || "");

  const updateFilters = (newFilters: { query?: string; tech?: string; role?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.query !== undefined) {
      if (newFilters.query) params.set("query", newFilters.query);
      else params.delete("query");
    }
    
    if (newFilters.tech !== undefined) {
      if (newFilters.tech) params.set("tech", newFilters.tech);
      else params.delete("tech");
    }
    
    if (newFilters.role !== undefined) {
      if (newFilters.role) params.set("role", newFilters.role);
      else params.delete("role");
    }

    router.push(`/startups?${params.toString()}`);
  };

  const clearFilters = () => {
    setQuery("");
    setTech("");
    setRole("");
    router.push("/startups");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
          <Filter size={16} className="text-emerald-600" /> Filters
        </h3>
        {(query || tech || role) && (
          <button 
            onClick={clearFilters}
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            Clear All <X size={12} />
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Search Keywords</label>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Startup name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateFilters({ query })}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[12px] font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Tech Stack Filter */}
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Primary Technology</label>
        <select 
          value={tech}
          onChange={(e) => {
            setTech(e.target.value);
            updateFilters({ tech: e.target.value });
          }}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[12px] font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none cursor-pointer"
        >
          <option value="">All Technologies</option>
          <option value="React">React</option>
          <option value="Next.js">Next.js</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Blockchain">Blockchain</option>
        </select>
      </div>

      {/* Roles Filter */}
      <div className="space-y-2">
        <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Roles Needed</label>
        <select 
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            updateFilters({ role: e.target.value });
          }}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[12px] font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none cursor-pointer"
        >
          <option value="">All Roles</option>
          <option value="Frontend">Frontend Dev</option>
          <option value="Backend">Backend Dev</option>
          <option value="Designer">UI Designer</option>
          <option value="Marketing">Marketing Lead</option>
          <option value="Founder">Co-Founder</option>
        </select>
      </div>

      <button
        onClick={() => updateFilters({ query, tech, role })}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm transition-all active:scale-95"
      >
        Apply Selection
      </button>
    </div>
  );
}
