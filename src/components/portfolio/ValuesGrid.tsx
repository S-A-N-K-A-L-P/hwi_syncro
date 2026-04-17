'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Globe, MessageSquare, Trophy, Rocket, Users, Code, Layout } from 'lucide-react';

const features = [
  {
    icon: <Search className="text-emerald-500" />,
    title: "Discover & Join",
    description: "Explore startups and ideas. Instantly join teams without long applications. Find people based on skills (Dev, Design, Business)."
  },
  {
    icon: <Layout className="text-lime-500" />,
    title: "Collaboration Engine",
    description: "Real-time collaboration across teams. Dedicated workspaces for each startup with task and progress tracking."
  },
  {
    icon: <Trophy className="text-emerald-500" />,
    title: "Hackathons → Startups",
    description: "Participate in hackathons and convert winning ideas into long-term startups. Continue building long after the event ends."
  },
  {
    icon: <Globe className="text-teal-500" />,
    title: "Builder Network",
    description: "Connect with builders across cities. Join national and global events. Get access to mentors and the startup ecosystem."
  },
  {
    icon: <Rocket className="text-emerald-600" />,
    title: "Idea → Impact",
    description: "We don’t stop at networking. We help you build real products with real teams and launch impactful startups."
  },
  {
    icon: <Users className="text-emerald-400" />,
    title: "Founder Ecosystem",
    description: "A community-driven space where founders find teams and innovators turn execution into scalable reality."
  }
];

export const ValuesGrid = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-4"
          >
            Platform Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 uppercase italic tracking-tighter"
          >
            Built for <span className="text-emerald-600 underline decoration-emerald-500/30">Builders</span>
          </motion.h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Inspired by the best hackathon ecosystems, we provide the tools to build, compete, and launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white dark:bg-slate-950 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {React.cloneElement(feature.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors uppercase italic tracking-tight">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


