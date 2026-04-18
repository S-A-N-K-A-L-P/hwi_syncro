'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Rocket, Target, Code2, Users, ArrowRight, Loader2, Sparkles, Building2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/common/ImageUpload";

export default function CreateStartupPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    techStack: "",
    requiredRoles: "",
    logo: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        router.push(`/discover`); // Redirect to explore page for now or startup dashboard if it exists
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
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
          <Target size={12} className="animate-pulse" />
          Founder Dashboard
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none mb-6">
          Register Your <span className="text-emerald-600">Startup</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
          Define your vision, list your requirements, and find the elite builders who will help you scale from Idea to Impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-emerald-500/5"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <ImageUpload 
                label="Launchpad Emblem (Logo)" 
                folder="logos" 
                defaultImage={formData.logo}
                onUpload={(url) => setFormData({ ...formData, logo: url })} 
              />

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Startup Name (Must be unique)</label>
                <div className="relative group">
                  <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. InnovateX"
                    className="w-full pl-14 pr-5 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">One-Line Mission / Description</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What are you building? (e.g. A decentralized platform for solar energy sharing...)"
                  className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400 min-h-[120px] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Tech Stack (Comma separated)</label>
                  <div className="relative group">
                    <Code2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      name="techStack"
                      required
                      value={formData.techStack}
                      onChange={handleChange}
                      placeholder="React, AWS, Python..."
                      className="w-full pl-14 pr-5 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] ml-1">Roles Needed (Comma separated)</label>
                  <div className="relative group">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      name="requiredRoles"
                      required
                      value={formData.requiredRoles}
                      onChange={handleChange}
                      placeholder="Frontend, Pitcher, Designer..."
                      className="w-full pl-14 pr-5 py-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-emerald-500/50 outline-none transition-all text-slate-900 dark:text-white text-sm font-bold placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed mt-8 uppercase tracking-[0.3em] text-xs active:scale-95 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Initialize Startup <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-500" /> Tips
            </h3>
            <ul className="space-y-4">
              <li className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="text-emerald-600 font-black tracking-[0.1em] uppercase block mb-1 underline underline-offset-4 decoration-emerald-500/30">Unique Name</span>
                  Ensure your startup's name stands out in the Explore page.
              </li>
              <li className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="text-emerald-600 font-black tracking-[0.1em] uppercase block mb-1 underline underline-offset-4 decoration-emerald-500/30">Clear Mission</span>
                  Founders with clear missions find the best teams quickly.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
