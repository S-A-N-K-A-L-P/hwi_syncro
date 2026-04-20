'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowRight, Hash, MessageSquare, Briefcase, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface JoinStartupButtonProps {
  startupId: string;
}

const ROLES = ["Developer", "Designer", "Growth", "Product", "Operations", "Marketing"];

export default function JoinStartupButton({ startupId }: JoinStartupButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const router = useRouter();

  const handleJoin = async (isCode: boolean = false) => {
    if (!isCode && !role) {
      toast.error("Please select a role");
      return;
    }

    setLoading(true);
    try {
      const payload: any = isCode ? { inviteCode } : { startupId, role, message };
      if (!isCode) payload.role = role;

      const res = await fetch("/api/startups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (isCode) {
          toast.success("Welcome to the team!");
          router.refresh();
        } else {
          toast.success("Request submitted to Lead Architect");
          setHasRequested(true);
          setIsDialogOpen(false);
        }
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

  if (hasRequested) {
    return (
      <div className="flex items-center gap-3 p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-500/20 rounded-2xl text-emerald-600">
         <CheckCircle2 size={24} />
         <div className="space-y-1">
           <p className="text-xs font-black uppercase tracking-widest">Request Pending</p>
           <p className="text-[10px] font-medium opacity-80 uppercase leading-none">The Lead Architect is reviewing your profile.</p>
         </div>
      </div>
    );
  }

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2 group min-w-[200px]"
                >
                  Apply for Mission <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">Draft your Proposal</DialogTitle>
                  <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    The Lead Architect will review your portfolio before approval.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-6 border-t border-slate-50 dark:border-slate-800 mt-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <Briefcase size={12} /> Target Role
                    </label>
                    <Select onValueChange={setRole}>
                      <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-800 border-none h-14 rounded-xl text-xs font-bold px-4">
                        <SelectValue placeholder="Select your expertise" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        {ROLES.map(r => (
                          <SelectItem key={r} value={r} className="text-xs font-bold">{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                       <MessageSquare size={12} /> Your Pitch
                    </label>
                    <Textarea 
                      placeholder="Why should you be part of this architectural team?"
                      className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-medium min-h-[120px] p-4 placeholder:text-[10px] placeholder:font-black placeholder:uppercase"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button 
                    onClick={() => handleJoin(false)}
                    disabled={loading || !role}
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Transmit Request"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <button
              onClick={() => setShowInviteInput(true)}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Hash size={16} /> Fast-Track Invite
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
              className="bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:text-[10px] flex-1"
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
