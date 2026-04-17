'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, UserCircle, Lightbulb } from 'lucide-react';

const targets = [
  {
    role: "Developers",
    action: "Build Real Products",
    description: "Connect with founders and designers to turn code into impactful software solutions.",
    icon: <Code className="text-emerald-500" />
  },
  {
    role: "Designers",
    action: "Design Real Startups",
    description: "Craft premium user experiences for emerging products and shape future identities.",
    icon: <Palette className="text-lime-500" />
  },
  {
    role: "Founders",
    action: "Find Real Teams",
    description: "Discover motivated builders who share your vision and are ready to execute.",
    icon: <UserCircle className="text-teal-500" />
  },
  {
    role: "Innovators",
    action: "Execute Real Ideas",
    description: "Transform abstract concepts into workable prototypes and scalable businesses.",
    icon: <Lightbulb className="text-yellow-500" />
  }
];

export const WhoItsFor = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4"
          >
            Who is it for?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-6"
          >
            Built for <span className="text-emerald-600">You</span>
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Whether you're a seasoned engineer or a first-time founder, Hack With India is your engine for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targets.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group p-8 bg-white dark:bg-slate-950 rounded-4xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {React.cloneElement(target.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase italic tracking-tight">{target.role}</h3>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
                {target.action}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {target.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
