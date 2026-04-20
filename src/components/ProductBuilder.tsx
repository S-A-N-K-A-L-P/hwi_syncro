"use client";

import { useState } from "react";
import { 
  Layout, 
  Smartphone, 
  Globe, 
  Cpu, 
  Sparkles, 
  Code2, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCT_TYPES = [
  { 
    id: "mobile", 
    label: "Mobile App", 
    icon: Smartphone, 
    desc: "Build cross-platform iOS & Android solutions",
    scaffolds: ["E-commerce", "Social Network", "SaaS Dashboard", "Fitness Tracker"]
  },
  { 
    id: "web", 
    label: "Web Platform", 
    icon: Globe, 
    desc: "High-performance Next.js or React web apps",
    scaffolds: ["Marketplace", "Enterprise CRM", "Analytics Dashboard", "Community Board"]
  },
  { 
    id: "ai", 
    label: "AI Engine", 
    icon: Cpu, 
    desc: "Neural networks and LLM-integrated services",
    scaffolds: ["Chatbot API", "Image Processor", "Data Predictor", "Content Generator"]
  },
];

export function ProductBuilder() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedScaffold, setSelectedScaffold] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
    }, 3000);
  };

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-12 text-center space-y-8 shadow-sm"
      >
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 border border-emerald-500/20">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Architectural Blueprint Ready</h3>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest px-10">I have generated the core tech stack, entry points, and database schema for your "{selectedScaffold}" project.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto pt-6">
           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Tech Stack</p>
              <p className="text-xs font-bold uppercase">Next.js 16, Tailwind, Prisma, PostgreSQL</p>
           </div>
           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Structure</p>
              <p className="text-xs font-bold uppercase">Modular Monolith architecture</p>
           </div>
        </div>
        <div className="flex gap-4 justify-center pt-6">
           <Button className="h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
             Download Source (.zip)
           </Button>
           <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest" onClick={() => setIsCompleted(false)}>
             Build Another
           </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-10 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-600" /> AI Product Builder
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select a mission category to begin scaffolding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCT_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => { setSelectedType(type.id); setSelectedScaffold(null); }}
              className={cn(
                "p-8 rounded-[2rem] border-2 transition-all text-left flex flex-col justify-between min-h-[220px] group",
                isActive 
                  ? "bg-slate-900 border-slate-900 text-white shadow-2xl" 
                  : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-emerald-500/30"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                isActive ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-950 text-slate-400 border border-slate-100 dark:border-slate-800"
              )}>
                <Icon size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase italic tracking-tight">{type.label}</h4>
                <p className={cn("text-[9px] font-bold uppercase tracking-widest leading-relaxed", isActive ? "text-slate-400" : "text-slate-500")}>
                  {type.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8 pt-6 border-t border-slate-50 dark:border-slate-800"
          >
            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Base Blueprint</label>
               <div className="flex flex-wrap gap-3">
                  {PRODUCT_TYPES.find(t => t.id === selectedType)?.scaffolds.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedScaffold(s)}
                      className={cn(
                        "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all",
                        selectedScaffold === s 
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-lg" 
                          : "bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-emerald-500/50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                 <Code2 size={100} />
               </div>
               <div className="relative z-10 space-y-6">
                 <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tighter">Initialize Scaffolding?</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase mt-2">AI will generate UI wireframes, a suggested tech stack, and a basic code scaffold for your {selectedScaffold}.</p>
                 </div>
                 <Button 
                   onClick={handleGenerate}
                   disabled={!selectedScaffold || isGenerating}
                   className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all"
                 >
                   {isGenerating ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                   {isGenerating ? "GENERATING ARCHITECTURE..." : "EXECUTE SCAFFOLD GENERATOR"}
                 </Button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
