'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Rocket, Users, User, PlusCircle, Bell, Search } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Startups", href: "/startups", icon: Rocket },
  { name: "My Startup", href: "/my-startup", icon: Users },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 h-16 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <Image src="/hwi.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Hack With India</span>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative h-full px-5 flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive 
                    ? "text-emerald-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-emerald-600" : "text-slate-400")} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 w-48 transition-all focus:w-64"
            />
          </div>
          
          <button className="p-2 text-slate-500 hover:text-emerald-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>

          <Link 
            href="/startups/create" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95"
          >
            <PlusCircle size={16} /> Register Startup
          </Link>
          
          {/* User Profile Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
