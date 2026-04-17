'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Rocket, Users, Target } from 'lucide-react';

const events = [
  {
    title: "Hackathons",
    type: "Offline + Online",
    description: "Intense building sessions to collaborate, compete, and create impactful solutions.",
    icon: <Trophy className="text-emerald-500" />
  },
  {
    title: "Build Challenges",
    type: "Weekly",
    description: "Rapid prototyping challenges to sharpen your skills and build real products.",
    icon: <Target className="text-lime-500" />
  },
  {
    title: "Startup Showcases",
    type: "Monthly",
    description: "Pitch your products to mentors, investors, and the builder community.",
    icon: <Rocket className="text-emerald-600" />
  },
  {
    title: "Hiring Events",
    type: "Networking",
    description: "Connect with startups and companies looking for top-tier builders.",
    icon: <Users className="text-teal-500" />
  }
];

export const EventsSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4"
            >
              Active Ecosystem
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter"
            >
              Build. Compete. <span className="text-emerald-600">Launch.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 dark:text-slate-400 max-w-sm text-right font-medium"
          >
            From national hackathons to startup showcases, we host the events that drive innovation forward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                {React.cloneElement(event.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                {event.type}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 uppercase italic tracking-tight">{event.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
