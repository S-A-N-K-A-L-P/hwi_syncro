'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Rocket, Users, User, PlusCircle, Bell, Search, LogOut, Settings, Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Startups", href: "/startups", icon: Rocket },
  { name: "My Startup", href: "/my-startup", icon: Users },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/home" className="flex items-center gap-2 group">
      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/20 group-hover:scale-105 transition-transform">
        <Image src="/hwi.jpg" alt="Logo" fill className="object-cover" />
      </div>
      <div className="flex flex-col -space-y-0.5">
        <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Hack With India</span>
        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Platform</span>
      </div>
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 h-16 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <Logo />
              </div>
              <div className="p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all",
                        isActive 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/10" 
                          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              {session?.user && (
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black overflow-hidden border-2 border-white shadow-sm">
                      {session.user.image ? (
                        <Image src={session.user.image} alt="" width={40} height={40} className="object-cover" />
                      ) : (
                        session.user.name?.[0] || 'U'
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase truncate max-w-[150px]">{session.user.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter truncate max-w-[150px]">{session.user.email}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
                  >
                    <LogOut size={16} /> Logout Session
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

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
                <item.icon size={18} className={cn(isActive ? "text-emerald-600" : "text-slate-400")} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 w-48 transition-all focus:w-64"
            />
          </div>
          
          <button className="hidden sm:flex p-2 text-slate-500 hover:text-emerald-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>

          <Link 
            href="/startups/create" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all active:scale-95"
          >
            <PlusCircle size={16} /> Register
          </Link>
          
          {session?.user && (
            <div className="flex items-center gap-2">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hidden sm:block w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-emerald-500/20">
                    {session.user.image ? (
                      <Image src={session.user.image} alt="" width={32} height={32} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-600 text-white text-[10px] font-black uppercase">
                        {session.user.name?.[0] || 'U'}
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 border-slate-100 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
                  <DropdownMenuLabel className="p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none truncate">{session.user.name}</p>
                      <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800 gap-2">
                    <User size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Operational Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800 gap-2">
                    <Settings size={16} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Platform Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="rounded-lg cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/10 gap-2 text-red-600 dark:text-red-400 font-bold"
                  >
                    <LogOut size={16} />
                    <span className="text-xs">Terminate Session</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
