"use client";

import { useState } from "react";
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Sparkles, 
  ChevronRight, 
  Layout, 
  Terminal, 
  Code2, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Box,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PRODUCT_TYPES = [
  { 
    id: "web", 
    label: "Web Platform", 
    icon: Globe, 
    desc: "Scaleable React/Next.js infrastructure with enterprise-grade SSR.",
    options: ["SaaS Dashboard", "Marketplace Engine", "Data Visualization Suite"]
  },
  { 
    id: "mobile", 
    label: "Mobile Application", 
    icon: Smartphone, 
    desc: "Cross-platform Flutter/React Native solutions for global reach.",
    options: ["Fintech Wallet", "Health Monitor", "Social Interaction Layer"]
  },
  { 
    id: "ai", 
    label: "AI Environment", 
    icon: Sparkles, 
    desc: "Autonomous LLM agents and predictive intelligence models.",
    options: ["Cognitive Assistant", "Predictive Analytics", "Dynamic Content Gen"]
  }
];

export function ProductBuilder() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Infrastructure Blueprint Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border-subtle">
         <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight">Product Architecture Engine</h3>
            <p className="text-[11px] font-medium text-muted uppercase tracking-widest">Initialize and scaffold mission-critical software infrastructure</p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/5 rounded-lg border border-accent/20">
            <Layers size={14} className="text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Blueprint Active</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Navigation Sidebar */}
        <div className="hidden lg:block space-y-6">
           {[
             { id: 1, label: "Core Environment", icon: Box },
             { id: 2, label: "Architectural Pattern", icon: Layout },
             { id: 3, label: "Data Schema & Auth", icon: ShieldCheck },
             { id: 4, label: "Infrastructure Deployment", icon: Zap },
           ].map((s) => (
             <div key={s.id} className={cn(
               "flex items-center gap-4 p-4 rounded-xl transition-all border",
               step === s.id ? "bg-surface-alt border-border-subtle shadow-sm" : "border-transparent text-muted opacity-60"
             )}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center border",
                  step === s.id ? "bg-background border-accent text-accent" : "bg-transparent border-border-subtle text-muted"
                )}>
                   <s.icon size={16} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Phase 0{s.id}</span>
                   <span className={cn("text-[12px] font-bold mt-1", step === s.id ? "text-foreground" : "text-muted")}>{s.label}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Main Configuration Console */}
        <div className="lg:col-span-3 space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {PRODUCT_TYPES.map((type) => (
                   <button
                     key={type.id}
                     onClick={() => {
                        setSelectedType(type.id);
                     }}
                     className={cn(
                       "enterprise-card p-8 text-left space-y-6 group hover:border-accent/40",
                       selectedType === type.id ? "border-accent ring-1 ring-accent/20 shadow-lg" : ""
                     )}
                   >
                     <div className={cn(
                       "w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                       selectedType === type.id ? "bg-accent text-background" : "bg-surface-alt border border-border-subtle text-muted"
                     )}>
                       <type.icon size={24} />
                     </div>
                     <div className="space-y-2">
                       <h4 className="text-[13px] font-bold uppercase tracking-wide">{type.label}</h4>
                       <p className="text-[11px] text-muted leading-relaxed">{type.desc}</p>
                     </div>
                     <div className={cn(
                       "pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
                       selectedType === type.id ? "text-accent" : "text-muted group-hover:text-accent"
                     )}>
                       Select Pattern <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                     </div>
                   </button>
                 ))}
               </div>

               {selectedType && (
                  <div className="enterprise-card p-10 space-y-8 bg-surface-alt/20 border-accent/10 animate-in zoom-in-95 duration-500">
                     <div className="flex justify-between items-center">
                        <div className="space-y-1">
                           <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Configuration Required</h4>
                           <p className="text-[11px] font-medium text-muted">Initialize the selected core environment patterns.</p>
                        </div>
                        <Terminal size={20} className="text-muted" />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PRODUCT_TYPES.find(t => t.id === selectedType)?.options.map(opt => (
                           <div key={opt} className="p-4 bg-background border border-border-subtle rounded-xl flex items-center justify-between group cursor-pointer hover:border-accent/50 transition-all">
                              <span className="text-[12px] font-semibold text-foreground">{opt}</span>
                              <div className="w-6 h-6 rounded-md bg-surface-alt flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-colors">
                                 <PlusCircle size={14} />
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="pt-6 border-t border-border-subtle flex justify-end">
                        <Button 
                          onClick={() => setStep(2)}
                          className="h-12 px-10 bg-accent hover:bg-accent/90 text-background rounded-lg text-xs font-bold tracking-tight shadow-xl shadow-accent/10"
                        >
                           Proceed to Architecture Phase
                        </Button>
                     </div>
                  </div>
               )}
            </div>
          )}

          {step > 1 && (
             <div className="enterprise-card p-20 text-center space-y-6 animate-in zoom-in-95 duration-700">
                <div className="w-20 h-20 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto text-accent border border-accent/10">
                   <Code2 size={40} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-bold tracking-tight text-foreground">Generating Structural Scaffolding</h3>
                   <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">AI is currently provisioning your enterprise environment based on established mission patterns.</p>
                </div>
                <div className="flex justify-center pt-4">
                   <Button 
                     variant="outline" 
                     onClick={() => setStep(1)}
                     className="h-10 rounded-lg text-xs font-bold border-border-subtle"
                   >
                     Abort Pipeline
                   </Button>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Infrastructure Integrity Layer */}
      <div className="enterprise-card p-10 bg-surface-alt/10 border-border-subtle flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-background border border-border-subtle flex items-center justify-center text-muted shadow-sm">
               <ShieldCheck size={28} />
            </div>
            <div>
               <h4 className="text-sm font-bold text-foreground leading-none">Security Hardened Blueprints</h4>
               <p className="text-[11px] text-muted font-medium mt-2">All generated architecture adheres to high-end infrastructure security protocols.</p>
            </div>
         </div>
         <Button variant="outline" className="h-11 px-8 rounded-lg text-xs font-bold border-border-subtle hover:bg-accent hover:text-background transition-all">
            Audit Infrastructure
         </Button>
      </div>
    </div>
  );
}

function PlusCircle({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}
