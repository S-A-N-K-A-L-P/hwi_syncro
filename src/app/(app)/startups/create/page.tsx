'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Rocket, Target, Code2, Users, ArrowRight, Loader2, Sparkles, Building2, Briefcase, Cpu, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/common/ImageUpload";
import { cn } from "@/lib/utils";

interface Niche {
  id: string;
  label: string;
  technologies: string[];
  roles: string[];
}

export default function CreateStartupPage() {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
    
    if (name === 'niche') {
      const niche = niches.find(n => n.id === value) || null;
      setSelectedNiche(niche);
      // Reset dependent fields
      setFormData(prev => ({ 
        ...prev, 
        primaryTechnology: "", 
        techStack: [], 
        requiredRoles: [] 
      }));
    }
  };

  const toggleSelection = (field: 'techStack' | 'requiredRoles', item: string) => {
    setFormData(prev => {
      const current = prev[field];
      const next = current.includes(item) 
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.primaryTechnology) {
      toast.error("Please select a primary technology");
      return;
    }
    
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
        router.push(`/startups`);
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
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
          <Target size={12} className="animate-pulse" />
          Founder Dashboard
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none mb-6">
          Register Your <span className="text-emerald-600">Startup</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
          Define your niche, select your tech stack, and find the specialized talent needed to scale your vision.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-8"
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <CheckCircle2 size={18} />
               </div>
               <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">1. General Identity</h3>
            </div>

            <ImageUpload 
              label="Launchpad Emblem (Logo)" 
              folder="logos" 
              defaultImage={formData.logo}
              onUpload={(url) => setFormData({ ...formData, logo: url })} 
            />

            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Startup Name</label>
              <div className="relative group">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. BioForge Dynamics"
                  className="w-full pl-14 pr-5 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Mission Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="What problem are you solving?"
                className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400 min-h-[120px] resize-none"
              />
            </div>
          </motion.div>

          {/* Ecosystem Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5 space-y-8"
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Cpu size={18} />
               </div>
               <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">2. Specialized Core</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Industry Niche</label>
                <select
                  name="niche"
                  required
                  onChange={handleChange}
                  className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold appearance-none cursor-pointer"
                >
                  <option value="">Select Domain</option>
                  {niches.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Primary Technology</label>
                <select
                  name="primaryTechnology"
                  required
                  disabled={!selectedNiche}
                  value={formData.primaryTechnology}
                  onChange={handleChange}
                  className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="">Select Core Tech</option>
                  {selectedNiche?.technologies.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <AnimatePresence>
              {selectedNiche && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-8 pt-4 overflow-hidden"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">All Technologies Involved</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedNiche.technologies.map(tech => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleSelection('techStack', tech)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                            formData.techStack.includes(tech)
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                              : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-emerald-500/50"
                          )}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Specialized Roles Needed</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedNiche.roles.map(role => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleSelection('requiredRoles', role)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                            formData.requiredRoles.includes(role)
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                              : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-blue-500/50"
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-slate-900 text-white space-y-6">
            <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2 text-emerald-500">
              <Sparkles size={18} /> Vision Logic
            </h3>
            <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase">
              By selecting a niche, you stabilize your ecosystem. It helps specialized contributors find your mission easier among the noise.
            </p>
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-500 border border-slate-800">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Verified ID</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-emerald-500 border border-slate-800">
                  <Briefcase size={16} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Hiring Priority</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedNiche}
            className="w-full py-8 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[2rem] shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.3em] text-[10px] active:scale-95 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Initialize Mission <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
