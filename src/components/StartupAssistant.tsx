"use client";

import { useState } from "react";
import { Sparkles, Code2, Layout, Database, Terminal, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Define Technical Architecture",
  "Build MVP Roadmap",
  "Design DB Schema",
  "Frontend Component Structure"
];

export function StartupAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Greetings Architect. I am your Startup Support Unit. Ready to build the prototype for your next big mission. What component shall we architect first?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Understood. For a modern startup prototype, I recommend using a modular micro-frontend architecture with Next.js 16 and a shared tactical component library. Shall we generate the base boilerplate?" 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Syncro Assist</h3>
            <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1 animate-pulse">Core AI Status: Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-4 max-w-[85%]",
            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
              msg.role === "assistant" ? "bg-slate-800 border-slate-700 text-emerald-500" : "bg-emerald-600 border-emerald-500 text-white"
            )}>
              {msg.role === "assistant" ? <Sparkles size={14} /> : <Layout size={14} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-[11px] leading-relaxed",
              msg.role === "assistant" ? "bg-slate-800/50 text-slate-300 border border-slate-700/50" : "bg-emerald-600 text-white font-medium"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map(s => (
            <button 
              key={s} 
              onClick={() => setInput(s)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border border-slate-700/50"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="TYPE COMMAND TO ARCHITECT..." 
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center transition-all active:scale-90"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
