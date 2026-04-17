'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export const PlatformFooter = () => {
  return (
    <footer className="py-20 bg-slate-950 border-t border-slate-900 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
           <h2 className="text-2xl font-black text-white mb-6 italic uppercase tracking-tighter">Hack With <span className="text-emerald-500">India</span></h2>
           <p className="text-slate-500 max-w-sm font-medium leading-relaxed">India's collaborative startup platform where builders don't just network — they build together. From <span className="text-emerald-500 font-bold uppercase italic tracking-tighter">Idea → Impact</span>.</p>
        </div>
        <div>
           <h4 className="text-white font-black mb-4 uppercase tracking-widest text-[10px]">Ecosystem</h4>
           <ul className="text-slate-500 space-y-2 text-sm font-bold">
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">Hackathons</a></li>
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">Build Challenges</a></li>
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">Startup Showcase</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-black mb-4 uppercase tracking-widest text-[10px]">Connect</h4>
           <ul className="text-slate-500 space-y-2 text-sm font-bold">
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">Twitter</a></li>
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">GitHub</a></li>
             <li><a href="#" className="hover:text-emerald-500 transition-colors uppercase italic tracking-tighter">Discord</a></li>
           </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 text-slate-600 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
         <div className="flex items-center gap-2">
           <span>© 2026 Hack With India Builder Network. All rights reserved.</span>
         </div>
         <div className="flex items-center gap-4">
           <span className="font-mono uppercase tracking-tighter flex items-center gap-1.5 font-bold">
             Built by <Heart size={12} className="text-emerald-500 fill-current" /> the community
           </span>
           <div className="h-4 w-px bg-slate-800 hidden md:block" />
           <span className="text-white font-black uppercase tracking-widest italic">Founded by Aviral</span>
         </div>
      </div>
    </footer>
  );
};
