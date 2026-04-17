"use client";

import { motion, Reorder } from "framer-motion";
import { 
  MoreVertical, Plus, CheckCircle2, Circle, 
  AlertCircle, Clock, Zap, Shield, Settings,
  Workflow, ArrowRight, History
} from "lucide-react";
import { useState } from "react";

// 1. Kanban Board
export function KanbanBoard({ columns }: { columns: any[] }) {
  return (
    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 min-h-[600px]">
      {columns.map((col, i) => (
        <KanbanColumn key={col.id} column={col} index={i} />
      ))}
      <button className="h-fit px-8 py-4 rounded-3xl border-2 border-dashed border-[#1f1f23] text-[#1f1f23] hover:text-[#9ca3af] hover:border-[#2a2a2f] transition-all font-mono font-bold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
        + Add Protocol Column
      </button>
    </div>
  );
}

// 2. Kanban Column
export function KanbanColumn({ column, index }: { column: any, index: number }) {
  return (
    <div className="w-[320px] shrink-0 space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          <h3 className="text-[12px] font-black text-[#e5e7eb] uppercase tracking-tighter italic">
            {column.title}
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-[#17171a] border border-[#1f1f23] text-[9px] font-mono font-bold text-[#1f1f23]">
            {column.tasks?.length || 0}
          </span>
        </div>
        <div className="flex items-center gap-1">
           <button className="p-1.5 rounded-lg hover:bg-[#121214] text-[#1f1f23] transition-colors"><Plus className="w-4 h-4" /></button>
           <button className="p-1.5 rounded-lg hover:bg-[#121214] text-[#1f1f23] transition-colors"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="space-y-3 min-h-[100px]">
        {column.tasks.map((task: any, i: number) => (
          <KanbanCard key={task.id} task={task} index={i} />
        ))}
      </div>
    </div>
  );
}

// 3. Kanban Card
export function KanbanCard({ task, index }: { task: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="p-4 bg-[#121214] border border-[#1f1f23] rounded-2xl hover:border-[#2a2a2f] transition-all shadow-sm group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5 ">
           {task.tags?.map((t: string) => (
             <span key={t} className="px-2 py-0.5 rounded-md bg-[#17171a] border border-[#1f1f23] text-[8px] font-mono font-bold text-[#1f1f23] uppercase tracking-wider">
               {t}
             </span>
           ))}
        </div>
        <span className={`text-[8px] font-black uppercase tracking-widest ${
          task.priority === 'CRITICAL' ? 'text-red-500' : 'text-[#1f1f23]'
        }`}>
          {task.priority || 'NORMAL'}
        </span>
      </div>

      <h4 className="text-[14px] font-bold text-[#e5e7eb] tracking-tight leading-snug group-hover:text-[#6366f1] transition-colors">
        {task.title}
      </h4>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-1.5">
           {[1, 2].map((i) => (
             <div key={i} className="w-6 h-6 rounded-full border-2 border-[#121214] bg-[#17171a] overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=node${i+index}`} className="w-full h-full object-cover" />
             </div>
           ))}
        </div>
        <div className="flex items-center gap-3 opacity-40 group-hover:opacity-80 transition-opacity">
           <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#e5e7eb]">
              <Zap className="w-3 h-3" /> {task.xp || 10}
           </div>
           <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#e5e7eb]">
              <Clock className="w-3 h-3" /> {task.deadline || "3d"}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

// 4. Workflow Stages (Lifecycle visualization)
export function WorkflowStages({ stages }: { stages: any[] }) {
  return (
    <div className="p-8 bg-[#121214] border border-[#1f1f23] rounded-3xl space-y-8">
      <div className="flex items-center gap-3">
         <Workflow className="w-5 h-5 text-[#6366f1]" />
         <h4 className="text-xl font-bold text-[#e5e7eb] uppercase italic tracking-tighter">Governance Workflow</h4>
      </div>

      <div className="flex items-center justify-between gap-4">
        {stages.map((stage, i) => (
          <div key={stage.label} className="relative flex-1 flex flex-col items-center gap-3">
             <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
               stage.status === 'completed' ? 'bg-[#6366f1]/10 border-[#6366f1] text-[#6366f1]' : 
               stage.status === 'active' ? 'bg-amber-500/10 border-amber-500 text-amber-500 animate-pulse' : 
               'bg-[#17171a] border-[#1f1f23] text-[#1f1f23]'
             }`}>
                {stage.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
             </div>
             <span className="text-[10px] font-mono font-bold text-[#e5e7eb] uppercase tracking-widest">{stage.label}</span>
             {i < stages.length - 1 && (
               <div className="absolute top-5 left-[calc(50%+25px)] w-[calc(100%-50px)] h-0.5 bg-[#1f1f23]">
                  <ArrowRight className="absolute -right-1.5 -top-1.5 w-3.5 h-3.5 text-[#1f1f23]" />
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Automation Rules (No-code triggers)
export function AutomationRules({ rules }: { rules: any[] }) {
  return (
    <div className="p-6 bg-[#121214] border border-[#1f1f23] rounded-3xl space-y-6">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Zap className="w-4 h-4 text-amber-500" />
             <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e5e7eb] font-mono">Automation Signals</h5>
          </div>
          <button className="text-[10px] font-bold text-[#6366f1] underline uppercase tracking-widest">New Protocol</button>
       </div>

       <div className="space-y-3">
          {rules.map((rule, i) => (
            <div key={i} className="p-4 bg-[#17171a] border border-[#1f1f23] rounded-xl flex items-center justify-between group hover:border-[#2a2a2f] transition-all">
               <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#e5e7eb] tracking-tight">{rule.trigger}</span>
                  <span className="text-[9px] font-mono font-bold text-[#1f1f23] uppercase mt-1">IF {rule.event} THEN {rule.action}</span>
               </div>
               <div className="w-8 h-8 rounded-lg bg-[#b0b0b0]/5 border border-[#1f1f23] flex items-center justify-center">
                  <Settings className="w-3.5 h-3.5 text-[#1f1f23] group-hover:text-[#6366f1]" />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

// 6. Task History (Audit trail)
export function TaskHistory({ logs }: { logs: any[] }) {
  return (
    <div className="p-6 bg-[#121214] border border-[#1f1f23] rounded-3xl space-y-6">
       <div className="flex items-center gap-3">
          <History className="w-4 h-4 text-[#6366f1]" />
          <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e5e7eb] font-mono">Operation Logs</h5>
       </div>
       <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 group">
               <div className="mt-1 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#1f1f23] group-hover:bg-[#6366f1] transition-all" />
                  <div className="w-[1px] h-8 bg-[#1f1f23]" />
               </div>
               <div className="flex-1">
                  <p className="text-[12px] text-[#9ca3af] leading-tight mb-1">
                    <span className="font-bold text-[#e5e7eb]">{log.user}</span> {log.action}
                  </p>
                  <span className="text-[9px] font-mono font-bold text-[#1f1f23] uppercase">{log.time}</span>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}
