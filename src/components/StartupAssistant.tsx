"use client";

import { useState } from "react";
import { Sparkles, Code2, Layout, Database, Terminal, Send, Bot, Lightbulb, PieChart, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Build MVP Roadmap",
  "Design DB Schema",
  "Pitch Deck Generation",
  "Market Analysis",
  "Suggest Monetization"
];

const RESPONSES: Record<string, string> = {
  "Build MVP Roadmap": "I've structured a 4-week sprint for your MVP: Week 1 focuses on core authentication and database schema. Week 2 on primary features. Week 3 on the feedback loop. Week 4 on deployment and monitoring. Would you like the detailed task list?",
  "Design DB Schema": "For your startup, I recommend a relational PostgreSQL schema with tables for Users, StartupProfiles, Tasks, and TransactionRecords. I can generate the Prisma or Mongoose models for you now.",
  "Market Analysis": "Based on current trends in your niche, there is a 24% gap in high-performance enterprise tools. Your primary competitors are established but slow to innovate. A 'SaaS' model with a focus on 'Speed' is your main differentiator.",
  "Pitch Deck Generation": "I can generate headlines and data points for 10 slides: 1. The Vision, 2. The Problem, 3. The Solution, 4. Tech Edge, 5. Market Size, 6. Traction, 7. Team, 8. Business Model, 9. Competition, 10. The Ask. Which slide shall we detail?",
  "Suggest Monetization": "I recommend a 'Freemium' model with a 'Pro' tier for deeper analytics and a 'Team' seat-based pricing for scaling organizations. This aligns with your goal of user gathering while building revenue early.",
};

export function StartupAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Greetings Architect. I am your Startup Support Unit. Ready to validate your idea, architect your stack, or generate your pitch. What shall we execute first?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: query }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response logic
    setTimeout(() => {
      const response = RESPONSES[query] || "Mission processed. I have analyzed your request and recommend a modular deployment strategy using the latest cloud-native technologies. Would you like me to generate the implementation blueprint?";
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Syncro Assist</h3>
            <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1 animate-pulse italic">Neural Engine: Active</p>
          </div>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[8px] font-black uppercase text-slate-400">Architect Mode</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-4 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all",
              msg.role === "assistant" ? "bg-slate-800 border-slate-700 text-emerald-500 shadow-lg shadow-emerald-500/5" : "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20"
            )}>
              {msg.role === "assistant" ? <Sparkles size={14} /> : <Terminal size={14} />}
            </div>
            <div className={cn(
              "p-5 rounded-2xl text-[11px] leading-relaxed shadow-sm",
              msg.role === "assistant" ? "bg-slate-800/50 text-slate-300 border border-slate-700/50" : "bg-emerald-600 text-white font-medium italic"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-4 max-w-[85%] items-center">
             <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-emerald-500 flex items-center justify-center animate-pulse">
               <Bot size={14} />
             </div>
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
             </div>
           </div>
        )}
      </div>

      {/* Commands / Quick Actions */}
      <div className="px-8 pb-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button 
              key={s} 
              onClick={() => handleSend(s)}
              disabled={isTyping}
              className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-700/50 hover:border-emerald-500/30 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-8 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 relative z-10">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isTyping}
            placeholder={isTyping ? "PROCESSING MISSION DATA..." : "TRANSMIT COMMAND TO UNIT..."}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-600 disabled:opacity-50"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
