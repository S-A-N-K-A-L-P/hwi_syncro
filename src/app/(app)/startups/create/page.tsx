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
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/common/ImageUpload";
import { cn } from "@/lib/utils";

interface Niche {
  id: string;
  label: string;
  technologies: string[];
  roles: string[];
}

const STEPS = [
  { id: "identity", label: "The Soul", icon: Target },
  { id: "structure", label: "The Structure", icon: Layout },
  { id: "blueprint", label: "The Blueprint", icon: PieChart },
  { id: "team", label: "The Team", icon: Users },
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
    if (currentStep === 0 && (!formData.name || !formData.tagline)) {
      toast.error("Name and Tagline are required");
      return;
    }
    if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Startup registered successfully!");
        router.push(`/my-startup`);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            <Rocket size={12} className="animate-pulse" />
            Founder Journey
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
            Register <span className="text-emerald-600">Startup</span>
          </h1>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500",
                i <= currentStep ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              )}>
                <step.icon size={16} />
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("w-6 h-0.5 mx-1", i < currentStep ? "bg-emerald-600" : "bg-slate-100 dark:bg-slate-800")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <ImageUpload 
                      label="Launchpad Emblem" 
                      folder="logos" 
                      defaultImage={formData.logo}
                      onUpload={(url) => setFormData({ ...formData, logo: url })} 
                    />
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Startup Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. BioForge Dynamics"
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-sm font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tagline (1-line pitch)</label>
                      <input
                        type="text"
                        name="tagline"
                        required
                        value={formData.tagline}
                        onChange={handleChange}
                        placeholder="e.g. Decarbonizing the aviation industry"
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Problem Statement</label>
                      <textarea
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={handleChange}
                        placeholder="What critical issue are you solving?"
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-sm font-bold min-h-[120px] resize-none"
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
              <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Industry Niche</label>
                    <select
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="">Select Niche</option>
                      {niches.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Model</label>
                    <select
                      name="businessModel"
                      value={formData.businessModel}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                    >
                      {["SaaS", "Marketplace", "D2C", "B2B", "Service", "Other"].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposed Solution</label>
                  <textarea
                    name="solutionOverview"
                    value={formData.solutionOverview}
                    onChange={handleChange}
                    placeholder="How does your product solve the problem?"
                    className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold min-h-[120px] resize-none"
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
              <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Stage</label>
                    <div className="grid grid-cols-1 gap-2">
                      {["ideation", "prototype", "early_users", "revenue", "scaling"].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({...formData, status: s})}
                          className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left border",
                            formData.status === s ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500"
                          )}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registration Type</label>
                      <select
                        name="registrationType"
                        value={formData.registrationType}
                        onChange={handleChange}
                        className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
                      >
                        <option value="unregistered">Not Registered</option>
                        <option value="pvt_ltd">Private Limited</option>
                        <option value="llp">LLP</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Equity Offering (Optional)</label>
                      <div className="relative">
                         <PieChart size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input
                          type="text"
                          name="equityOffering"
                          value={formData.equityOffering}
                          onChange={handleChange}
                          placeholder="e.g. 5-10%"
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold"
                        />
                      </div>
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
              <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Technology</label>
                  <select
                    name="primaryTechnology"
                    required
                    disabled={!selectedNiche}
                    value={formData.primaryTechnology}
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Select Core Tech</option>
                    {selectedNiche?.technologies.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Cpu size={14} className="text-emerald-500" /> Tech Stack Stack
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNiche?.technologies.map(tech => (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleSelection('techStack', tech)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                              formData.techStack.includes(tech) ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400"
                            )}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Briefcase size={14} className="text-blue-500" /> Roles Needed
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNiche?.roles.map(role => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleSelection('requiredRoles', role)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                              formData.requiredRoles.includes(role) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400"
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

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || loading}
            className="flex items-center gap-3 px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-0"
          >
            <ArrowLeft size={18} /> Take Step Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all active:scale-95"
            >
              Next Phase <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-4 px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 transition-all active:scale-95"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Initiate Mission <Rocket size={20} /></>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
