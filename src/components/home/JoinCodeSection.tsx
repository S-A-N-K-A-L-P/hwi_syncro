'use client';

import { useState } from "react";
import { Search, Hash, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function JoinCodeSection() {
  const [searchValue, setSearchValue] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/startups?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/startups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Joined startup successfully!");
        router.push(`/my-startup`);
      } else {
        toast.error(data.message || "Invalid invite code");
      }
    } catch (err) {
      toast.error("Failed to join. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search startups by name or skills..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-sm font-medium"
        />
      </form>

      <div className="hidden md:flex items-center text-slate-300 dark:text-slate-700 font-bold px-2 uppercase text-[10px]">OR</div>

      {/* Join Code Input */}
      <form onSubmit={handleJoinByCode} className="flex flex-row md:w-80 relative group">
        <div className="relative flex-1">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Invite Code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-sm font-bold uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-medium"
          />
        </div>
        <button 
          type="submit"
          disabled={loading || !joinCode.trim()}
          className="px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Join"}
        </button>
      </form>
    </div>
  );
}
