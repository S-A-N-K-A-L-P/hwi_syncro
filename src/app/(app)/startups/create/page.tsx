'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Rocket, 
  Target, 
  Code2, 
  Users, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Building2, 
  Briefcase, 
  Cpu, 
  CheckCircle2, 
  ArrowLeft,
  Layout,
  PieChart,
  ShieldCheck,
  Globe,
  Database,
  Layers,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/common/ImageUpload";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Niche {
  id: string;
  label: string;
  technologies: string[];
  roles: string[];
}

const STEPS = [
  { id: "identity", label: "Strategic Identity", icon: Target },
  { id: "structure", label: "Market Architecture", icon: Globe },
  { id: "blueprint", label: "Capital Blueprint", icon: PieChart },
  { id: "team", label: "Human Capital", icon: Users },
];

export default function CreateStartupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    problemStatement: "",
    solutionOverview: "",
    industry: "",
    businessModel: "SaaS",
    registrationType: "unregistered",
    equityOffering: "0%",
    status: "ideation",
    primaryTechnology: "",
    techStack: [] as string[],
    requiredRoles: [] as string[],
    logo: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/ecosystem_data.json')
      .then(res => res.json())
      .then(data => setNiches(data.niches));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'industry') {
      const niche = niches.find(n => n.id === value) || null;
      setSelectedNiche(niche);
      setFormData(prev => ({ ...prev, primaryTechnology: "", techStack: [], requiredRoles: [] }));
    }
  };

  const toggleSelection = (field: 'techStack' | 'requiredRoles', item: string) => {
    setFormData(prev => {
      const current = prev[field];
      const next = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
      return { ...prev, [field]: next };
    });
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.tagline) {
        toast.error("Venture Name and Tagline are required for initiation");
        return;
      }
      if (!formData.problemStatement) {
        toast.error("Mission Critical Statement is required");
        return;
      }
    }
    
    if (currentStep === 1 && !formData.industry) {
      toast.error("Please select a Market Vertical to proceed");
      return;
    }

    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.primaryTechnology) {
      toast.error("Primary Infrastructure Language must be selected");
      return;
    }

    if (formData.techStack.length === 0) {
      toast.error("Select at least one Strategic Stack component");
      return;
    }

    setLoading(true);

    try {
      // Ensure description is populated for backend requirements
      const payload = {
        ...formData,
        description: formData.description || formData.problemStatement
      };

      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Venture initialized in the system");
        router.push(`/my-startup`);
      } else {
        toast.error(data.message || "Initialization failed");
      }
    } catch (err) {
      toast.error("Platform communication error. Verify connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in duration-1000">
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/20 rounded-lg text-accent text-[10px] font-bold uppercase tracking-widest">
            <Rocket size={14} className="animate-pulse" />
            Strategic Initiation Phase
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Register <span className="text-accent italic">Venture</span>
          </h1>
          <p className="text-muted text-sm font-medium">Provision your startup metadata into the global execution matrix.</p>
        </div>
        
        {/* Step Indicator - High Density */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border",
                i <= currentStep ? "bg-accent border-accent text-background shadow-lg shadow-accent/10" : "bg-surface-alt border-border-subtle text-muted"
              )}>
                <step.icon size={18} />
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("w-4 h-0.5 mx-0.5 rounded-full", i < currentStep ? "bg-accent" : "bg-border-subtle")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="enterprise-card p-10 md:p-14 space-y-10 bg-surface-alt/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-10">
                    <ImageUpload 
                      label="Corporate Emblem" 
                      folder="logos" 
                      defaultImage={formData.logo}
                      onUpload={(url) => setFormData(prev => ({ ...prev, logo: url }))} 
                    />
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Official Venture Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Nexus Core Technologies"
                        className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl focus:border-accent/40 outline-none transition-all text-sm font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Executive Summary (1-line)</label>
                      <input
                        type="text"
                        name="tagline"
                        required
                        value={formData.tagline}
                        onChange={handleChange}
                        placeholder="e.g. Autonomous infrastructure for global trade"
                        className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl focus:border-accent/40 outline-none transition-all text-sm font-semibold italic"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Mission Critical Statement</label>
                      <textarea
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={handleChange}
                        placeholder="What systemic deficit are you addressing?"
                        className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl focus:border-accent/40 outline-none transition-all text-sm font-semibold min-h-[140px] resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="enterprise-card p-10 md:p-14 space-y-10 bg-surface-alt/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Market Vertical</label>
                    <div className="relative">
                      <select
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl outline-none text-sm font-bold appearance-none cursor-pointer focus:border-accent/40"
                      >
                        <option value="">Select Vertical</option>
                        {niches.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        <ArrowRight size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Monetization Pattern</label>
                    <div className="relative">
                       <select
                        name="businessModel"
                        value={formData.businessModel}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl outline-none text-sm font-bold appearance-none cursor-pointer focus:border-accent/40"
                      >
                        {["SaaS", "Marketplace", "D2C", "B2B", "Infrastructure", "Other"].map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        <ArrowRight size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Systemic Solution Overview</label>
                  <textarea
                    name="solutionOverview"
                    value={formData.solutionOverview}
                    onChange={handleChange}
                    placeholder="Describe your architectural solution and market edge..."
                    className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl focus:border-accent/40 outline-none text-sm font-semibold min-h-[140px] resize-none leading-relaxed"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="enterprise-card p-10 md:p-14 space-y-10 bg-surface-alt/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Lifecycle Positioning</label>
                    <div className="grid grid-cols-1 gap-2">
                      {["ideation", "prototype", "early_users", "revenue", "scaling"].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s})}
                          className={cn(
                            "px-6 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-left border relative group",
                            formData.status === s 
                              ? "bg-accent border-accent text-background shadow-lg shadow-accent/10" 
                              : "bg-background border-border-subtle text-muted hover:border-accent/30"
                          )}
                        >
                          {formData.status === s && <div className="absolute right-4 top-1/2 -translate-y-1/2"><Zap size={14} className="fill-current" /></div>}
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Corporate Registration</label>
                      <div className="relative">
                        <select
                          name="registrationType"
                          value={formData.registrationType}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl outline-none text-sm font-bold appearance-none cursor-pointer focus:border-accent/40"
                        >
                          <option value="unregistered">Non-Registered Project</option>
                          <option value="pvt_ltd">Private Limited Entity</option>
                          <option value="llp">Limited Liability Partnership</option>
                          <option value="sole_proprietorship">Principal Proprietorship</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                           <ArrowRight size={14} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Strategic Equity Pool</label>
                      <div className="relative">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-accent">
                            <PieChart size={18} />
                         </div>
                         <input
                          type="text"
                          name="equityOffering"
                          value={formData.equityOffering}
                          onChange={handleChange}
                          placeholder="e.g. 15% Strategic Allocation"
                          className="w-full pl-14 pr-6 py-5 bg-background border border-border-subtle rounded-xl focus:border-accent/40 outline-none text-sm font-bold"
                        />
                      </div>
                      <p className="text-[9px] font-medium text-muted uppercase tracking-wider ml-1 italic">Authorized pool for architects and institutional partners.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="enterprise-card p-10 md:p-14 space-y-12 bg-surface-alt/10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Primary Infrastructure Language</label>
                  <div className="relative">
                    <select
                      name="primaryTechnology"
                      required
                      disabled={!selectedNiche}
                      value={formData.primaryTechnology}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-background border border-border-subtle rounded-xl outline-none text-sm font-bold appearance-none cursor-pointer disabled:opacity-40 focus:border-accent/40"
                    >
                      <option value="">Select Primary Language</option>
                      {selectedNiche?.technologies.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                        <ArrowRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Database size={14} className="text-accent" /> Strategic Stack
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNiche?.technologies.map(tech => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleSelection('techStack', tech)}
                            className={cn(
                              "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight border transition-all",
                              formData.techStack.includes(tech) 
                                ? "bg-accent border-accent text-background shadow-md shadow-accent/10" 
                                : "bg-background border-border-subtle text-muted hover:border-accent/40"
                            )}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Users size={14} className="text-accent" /> Human Capital Requirements
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNiche?.roles.map(role => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleSelection('requiredRoles', role)}
                            className={cn(
                              "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight border transition-all",
                              formData.requiredRoles.includes(role) 
                                ? "bg-accent border-accent text-background shadow-md shadow-accent/10" 
                                : "bg-background border-border-subtle text-muted hover:border-accent/40"
                            )}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-10 border-t border-border-subtle">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-all disabled:opacity-0"
          >
            <ArrowLeft size={16} /> Previous Phase
          </button>

          {currentStep < STEPS.length - 1 ? (
             <Button
                type="button"
                onClick={nextStep}
                className="h-14 px-10 bg-foreground text-background dark:bg-white dark:text-slate-900 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl transition-all active:scale-95 hover:bg-accent hover:text-background"
             >
               Next Phase <ArrowRight size={16} className="ml-2" />
             </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="h-14 px-14 bg-accent hover:bg-accent/90 text-background rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-2xl shadow-accent/20 transition-all active:scale-95"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Execute Mission Entry <Zap size={18} className="ml-2 fill-current" /></>}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
