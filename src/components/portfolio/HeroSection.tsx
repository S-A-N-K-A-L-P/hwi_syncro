'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MousePointer2, Sparkles, User, Rocket, Zap } from 'lucide-react';

const ORBS = Array.from({ length: 20 }, (_, i) => ({
  width: 100 + ((i * 37) % 400),
  height: 100 + ((i * 53) % 400),
  left: `${(i * 13) % 100}%`,
  top: `${(i * 29) % 100}%`,
  x: ((i * 19) % 100) - 50,
  y: ((i * 23) % 100) - 50,
  duration: 12 + ((i * 7) % 10),
}));

export const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-6">
      {/* Background Micro-animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/10 dark:bg-emerald-400/5 blur-2xl"
            style={{
              width: orb.width,
              height: orb.height,
              left: orb.left,
              top: orb.top,
            }}
            animate={{
              x: [0, orb.x, 0],
              y: [0, orb.y, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="relative z-10 mb-8"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/30 border-4 border-emerald-500/20"
          >
            <Image 
              src="/hwi.jpg" 
              alt="Hack with India Logo" 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-emerald-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute -inset-8 border border-emerald-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center max-w-5xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-black mb-8 border border-emerald-100 dark:border-emerald-800 uppercase tracking-widest shadow-sm"
        >
          <Sparkles size={14} className="fill-current" />
          <span>India’s Premium Builder Network</span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.85] uppercase italic">
          Hack with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">India</span>
        </h1>

        <div className="flex flex-col items-center gap-4 mb-10 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-slate-900 dark:text-white font-black uppercase italic tracking-tight leading-tight">
            Where builders don’t just network — <span className="text-emerald-600">they build together.</span>
          </p>
          <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            From <span className="text-emerald-600 font-bold">Idea → Impact</span>. We don’t stop at networking. We help you build real products with real teams and launch real startups.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/feed">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs flex items-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.3)] uppercase tracking-widest transition-all"
            >
              <Zap size={16} /> Join Platform
            </motion.button>
          </Link>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs flex items-center gap-3 shadow-xl shadow-slate-500/20 uppercase tracking-widest transition-all"
            >
              <Rocket size={16} /> Start a Startup
            </motion.button>
          </Link>
        </div>

        {/* Founder Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600">
            <User size={16} />
          </div>
          <div className="flex flex-col items-start translate-y-0.5 text-left">
            <span className="text-[10px] uppercase font-black tracking-tighter text-slate-400 leading-none">Founder</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Aviral</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-2" />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10"
      >
        <MousePointer2 className="text-emerald-400 dark:text-emerald-600 opacity-50" size={24} />
      </motion.div>
    </section>
  );
};


