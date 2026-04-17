'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Users, ArrowRight, Bell } from 'lucide-react';

export const FeaturedEvent = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-12">
          {/* Text Content */}
          <div className="text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Bell size={12} className="animate-pulse" />
              Upcoming Event
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6 leading-tight"
            >
              Join Us at Our <span className="text-emerald-600">Next Big Launch</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed"
            >
              Be part of the movement that's transforming the startup ecosystem in India. Connect with mentors, investors, and elite builders.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-emerald-600">
                  <Calendar size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Date</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">Coming Soon</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Location</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">Pan India (Hybrid)</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all">
                Join Startup <ArrowRight size={16} />
              </button>
              <button className="px-10 py-5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Image Content - Full Container Width */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden group border border-slate-100 dark:border-slate-800"
            >
              <div className="relative aspect-[21/9] md:aspect-[3/1] lg:aspect-[3.5/1] rounded-[2rem] overflow-hidden">
                <Image 
                  src="/current-event.png" 
                  alt="Current Event" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-slate-50 dark:border-slate-800 rotate-12 group-hover:rotate-0 transition-transform">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Live</span>
                <span className="text-lg font-black text-slate-900 dark:text-white italic uppercase leading-none">Soon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
