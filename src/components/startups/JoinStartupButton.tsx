'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowRight, Hash } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface JoinStartupButtonProps {
  startupId: string;
}

export default function JoinStartupButton({ startupId }: JoinStartupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const router = useRouter();

  const handleJoin = async (isCode: boolean = false) => {
    setLoading(true);
    try {
      const res = await fetch("/api/startups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isCode ? { inviteCode } : { startupId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome to the team!");
        router.refresh();
        setShowInviteInput(false);
      } else {
        toast.error(data.message || "Could not join startup");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full sm:w-auto">
      <AnimatePresence mode="wait">
        {!showInviteInput ? (
          <motion.div 
            key="actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => handleJoin(false)}
              disabled={loading}
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2 group min-w-[200px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Request to Join <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
            
            <button
              onClick={() => setShowInviteInput(true)}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Hash size={16} /> Use Invite Code
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="invite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col sm:flex-row gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <input 
              type="text" 
              placeholder="Enter Code (e.g. HWI-XXXX)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:text-[10px]"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleJoin(true)}
                disabled={loading || !inviteCode}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : "Verify & Join"}
              </button>
              <button
                onClick={() => setShowInviteInput(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-black uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
