'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, ExternalLink, Trophy, Globe, MapPin, Sparkles, Rocket } from 'lucide-react';

const coreTeam = [
  { name: "Tushar", role: "Core Architect", bio: "Engineering high-performance systems and scalable builder infrastructure.", icon: "T" },
  { name: "Anish Krishna Sharma", role: "Marketing Lead", bio: "Driving growth and ecosystem engagement through strategic community building.", icon: "A" },
  { name: "Anant", role: "Technical Head", bio: "Mastering complex technology stacks to empower builders across India.", icon: "A" }
];

export const MemberSpotlight = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
            The <span className="text-emerald-600">Architects</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.4em] mt-4">
            Building the foundations of the startup ecosystem
          </p>
        </div>

        {/* Founder Glory Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2),transparent_40%)] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <Trophy size={14} className="text-emerald-200" /> Legendary Founder
                </div>
                
                <div>
                  <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-4">
                    Aviral <br /> Bhardwaj
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-emerald-50 italic opacity-90 max-w-lg">
                    "From Idea to Impact: Redefining how India builds startups."
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="text-5xl md:text-7xl font-black tracking-tighter text-emerald-200">200+</div>
                    <div className="text-xs font-black uppercase tracking-widest leading-relaxed">
                      Hackathons Completed <br /> Across the Globe
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    {["Google", "Microsoft", "AWS"].map(office => (
                      <div key={office} className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
                        <MapPin size={12} /> {office} Office
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 pt-6">
                  <Github className="w-6 h-6 hover:text-emerald-200 cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 hover:text-emerald-200 cursor-pointer transition-colors" />
                  <ExternalLink className="w-6 h-6 hover:text-emerald-200 cursor-pointer transition-colors" />
                </div>
              </div>

              <div className="relative hidden lg:flex justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full animate-pulse" />
                  <div className="relative w-full h-full rounded-[4rem] bg-emerald-700/50 border-4 border-white/20 flex items-center justify-center overflow-hidden rotate-6 group-hover:rotate-0 transition-transform duration-700">
                    <div className="text-9xl font-black text-white/20 select-none">AV</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Rocket size={120} className="text-white drop-shadow-2xl animate-bounce" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 px-8 py-6 bg-white rounded-3xl shadow-2xl text-emerald-600 -rotate-3 group-hover:rotate-0 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">Current Mission</p>
                    <p className="text-lg font-black uppercase italic tracking-tight">Hack With India</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Architects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className="mb-8 relative w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                <div className="text-emerald-600 font-black text-xl group-hover:text-white transition-colors">
                  {member.icon}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 uppercase italic tracking-tighter">{member.name}</h3>
                <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                <Github size={18} className="text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors" />
                <Twitter size={18} className="text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors" />
                <ExternalLink size={18} className="text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors" />
              </div>
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
