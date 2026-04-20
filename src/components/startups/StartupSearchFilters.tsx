'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StartupSearchFiltersProps {
  initialQuery?: string;
  initialStage?: string;
  initialIndustry?: string;
}

export default function StartupSearchFilters({ initialQuery, initialStage, initialIndustry }: StartupSearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");
  const [stage, setStage] = useState(initialStage || "");
  const [industry, setIndustry] = useState(initialIndustry || "");

  const updateFilters = (newFilters: { query?: string; stage?: string; industry?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.query !== undefined) {
      if (newFilters.query) params.set("query", newFilters.query);
      else params.delete("query");
    }
    
    if (newFilters.stage !== undefined) {
      if (newFilters.stage) params.set("stage", newFilters.stage);
      else params.delete("stage");
    }
    
    if (newFilters.industry !== undefined) {
      if (newFilters.industry) params.set("industry", newFilters.industry);
      else params.delete("industry");
    }

    router.push(`/startups?${params.toString()}`);
  };

  const clearFilters = () => {
    setQuery("");
    setStage("");
    setIndustry("");
    router.push("/startups");
  };

  return (
    <div className="enterprise-card p-6 sticky top-24 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4">
        <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
          <Filter size={14} className="text-accent" /> Filter Matrix
        </h3>
        {(query || stage || industry) && (
          <button 
            onClick={clearFilters}
            className="text-[9px] font-bold text-muted hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            Clear <X size={12} />
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Market Search</label>
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={13} />
          <input 
            type="text" 
            placeholder="Search mission..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateFilters({ query })}
            className="w-full pl-9 pr-4 py-2.5 bg-surface-alt border border-border-subtle rounded-lg text-[12px] font-medium focus:ring-1 focus:ring-accent/30 focus:border-accent/30 transition-all outline-none"
          />
        </div>
      </div>

      {/* Stage Filter */}
      <div className="space-y-3">
        <label className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Lifecycle Stage</label>
        <div className="flex flex-wrap gap-1.5">
          {["ideation", "prototype", "early_users", "revenue", "scaling"].map(s => (
            <button
              key={s}
              onClick={() => {
                const next = stage === s ? "" : s;
                setStage(next);
                updateFilters({ stage: next });
              }}
              className={cn(
                "px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all border",
                stage === s 
                  ? "bg-accent border-accent text-background shadow-lg shadow-accent/10" 
                  : "bg-background border-border-subtle text-muted hover:border-accent/20"
              )}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Industry Filter */}
      <div className="space-y-2">
        <label className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Industry Vertical</label>
        <select 
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            updateFilters({ industry: e.target.value });
          }}
          className="w-full px-4 py-2.5 bg-surface-alt border border-border-subtle rounded-lg text-[12px] font-medium focus:ring-1 focus:ring-accent/30 focus:border-accent/30 outline-none appearance-none cursor-pointer"
        >
          <option value="">All Industry Verticals</option>
          <option value="fintech">Fintech & Banking</option>
          <option value="healthtech">Health & Lifesciences</option>
          <option value="edtech">Education & Edtech</option>
          <option value="ecommerce">E-commerce & Retail</option>
          <option value="ai_ml">Artificial Intelligence</option>
          <option value="cleantech">Sustainability & Green</option>
        </select>
      </div>

      <button
        onClick={() => updateFilters({ query, stage, industry })}
        className="w-full py-3 bg-foreground text-background dark:bg-white dark:text-slate-900 rounded-lg font-bold text-[10px] uppercase tracking-widest shadow-sm transition-all active:scale-95"
      >
        Re-index Results
      </button>
    </div>
  );
}
