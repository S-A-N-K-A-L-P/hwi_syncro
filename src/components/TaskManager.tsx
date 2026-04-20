"use client";

import { useState } from "react";
import { 
  ListChecks, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Bot, 
  Plus, 
  Calendar,
  Zap,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MOCK_TASKS = [
  { id: 1, title: "Initialize Backend Architecture", status: "in-progress", priority: "high", isAI: true, deadline: "2 days" },
  { id: 2, title: "Design Landing Page UI", status: "pending", priority: "medium", isAI: false, deadline: "5 days" },
  { id: 3, title: "User Interview Analysis", status: "pending", priority: "high", isAI: true, deadline: "1 day" },
  { id: 4, title: "Legal Registration Setup", status: "completed", priority: "medium", isAI: false, deadline: "Done" },
];

export function TaskManager() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return "text-red-500 bg-red-500/10";
      case 'medium': return "text-amber-500 bg-amber-500/10";
      default: return "text-slate-500 bg-slate-500/10";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic tracking-tighter">Sprint Execution</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your startup roadmap and tasks</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2">
             <Calendar size={14} className="mr-2" /> Calendar
           </Button>
           <Button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
             <Plus size={16} className="mr-2" /> New Task
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Backlog", count: 2, color: "bg-slate-100 dark:bg-slate-800" },
           { label: "Active Sprints", count: 1, color: "bg-blue-500" },
           { label: "Completed", count: 12, color: "bg-emerald-500" },
         ].map(stat => (
           <div key={stat.label} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400">{stat.label}</span>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", stat.color)} />
                <span className="text-sm font-black italic">{stat.count}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="space-y-4 pt-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-6 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/20 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                task.status === 'completed' ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500" : "bg-slate-50 dark:bg-slate-900 text-slate-300"
              )}>
                {task.status === 'completed' ? <CheckCircle2 size={20} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
              </div>
              <div className="space-y-1">
                <h4 className={cn(
                  "text-xs font-black uppercase tracking-tight",
                  task.status === 'completed' ? "line-through text-slate-400" : "text-slate-900 dark:text-white"
                )}>{task.title}</h4>
                <div className="flex items-center gap-3">
                   <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-md", getPriorityColor(task.priority))}>
                     {task.priority} Priority
                   </span>
                   <span className="text-[8px] font-bold text-slate-400 uppercase flex items-center gap-1">
                     <Clock size={10} /> {task.deadline}
                   </span>
                   {task.isAI && (
                     <span className="text-[8px] font-black uppercase text-purple-500 flex items-center gap-1 bg-purple-500/5 px-2 py-0.5 rounded-md">
                       <Bot size={10} /> AI Assigned
                     </span>
                   )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               {task.isAI && task.status !== 'completed' && (
                 <Button variant="outline" className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border-purple-500/30 text-purple-500 hover:bg-purple-500 hover:text-white transition-all">
                   Execute with AI
                 </Button>
               )}
               <button className="text-slate-300 hover:text-slate-600 dark:hover:text-slate-200">
                 <MoreVertical size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-slate-900 rounded-[2.5rem] relative overflow-hidden group border border-slate-800">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.05),transparent_40%)]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
               <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 flex items-center justify-center md:justify-start gap-2">
                 <Zap size={16} /> Dynamic Roadmap
               </h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-sm">AI has identified 3 bottlenecks in your current sprint cycle. Deploy automated solutions?</p>
            </div>
            <Button className="h-14 px-10 bg-white text-slate-900 hover:bg-emerald-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl">
              Optimize Sprint
            </Button>
         </div>
      </div>
    </div>
  );
}
