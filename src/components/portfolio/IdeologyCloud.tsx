'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  "Collaboration", "Focus", "Innovation", "Efficiency", "Growth", "Design", 
  "Software", "Integrity", "Open Source", "Global", "Accessibility", "Reliability",
  "Community", "User Experience", "Performance", "Launch", "Build", "Mobile", "Web"
];

export const IdeologyCloud = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-mono text-slate-400 uppercase tracking-widest">Our Focus</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.1, 
                color: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                borderColor: "#10b981"
              }}
              className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-lg font-bold text-slate-600 dark:text-slate-400 cursor-default transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};
