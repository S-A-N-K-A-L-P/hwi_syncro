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
  { name: "Executive Feed", href: "/home", icon: Home },
  { name: "Global Missions", href: "/startups", icon: Rocket },
  { name: "Venture Console", href: "/my-startup", icon: Users },
  { name: "Portfolio", href: "/profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/home" className="flex items-center gap-3 group">
      <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-border-subtle group-hover:border-accent transition-all">
        <Image src="/hwi.jpg" alt="Logo" fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-sm font-bold text-foreground tracking-tight">HWI Ecosystem</span>
        <span className="text-[9px] font-mono font-semibold text-muted uppercase tracking-widest group-hover:text-accent transition-colors">Enterprise Node</span>
      </div>
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border-subtle h-14 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-muted hover:text-foreground hover:bg-surface-alt rounded-lg transition-colors">
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-border-subtle">
              <div className="p-6 border-b border-border-subtle">
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
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all",
                        isActive 
                          ? "bg-accent/10 text-accent" 
                          : "text-muted hover:text-foreground hover:bg-surface-alt"
                      )}
                    >
                      <item.icon size={16} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative h-full px-4 flex items-center gap-2 group transition-colors",
                  isActive 
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                    : "text-muted hover:text-foreground"
                )}
              >
                <item.icon size={15} className={cn("transition-colors", isActive ? "text-accent" : "text-muted group-hover:text-foreground")} />
                <span className="text-[11px] font-semibold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={13} />
            <input 
              type="text" 
              placeholder="Command search..." 
              className="pl-9 pr-4 py-1.5 bg-surface-alt border border-transparent rounded-lg text-[11px] font-medium outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/30 w-44 transition-all focus:w-60"
            />
          </div>
          
          <button className="hidden sm:flex p-2 text-muted hover:text-foreground transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full border-2 border-background" />
          </button>

          <Link 
            href="/startups/create" 
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-accent hover:bg-accent/90 text-background rounded-lg text-[11px] font-bold tracking-tight shadow-sm transition-all active:scale-95"
          >
            <PlusCircle size={14} /> Initiate Venture
          </Link>
          
          {session?.user && (
            <div className="flex items-center gap-2">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-7 h-7 rounded-lg bg-surface-alt border border-border-subtle cursor-pointer overflow-hidden transition-all hover:border-accent">
                    {session.user.image ? (
                      <Image src={session.user.image} alt="" width={28} height={28} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-accent text-background text-[10px] font-bold">
                        {session.user.name?.[0] || 'U'}
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-1 shadow-2xl enterprise-glass">
                  <div className="p-3 mb-1">
                    <p className="text-xs font-bold text-foreground leading-tight truncate">{session.user.name}</p>
                    <p className="text-[10px] font-medium text-muted truncate mt-1">{session.user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border-subtle" />
                  <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-surface-alt gap-2 py-2">
                    <User size={14} className="text-muted" />
                    <span className="text-xs font-medium">Platform Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-surface-alt gap-2 py-2">
                    <Settings size={14} className="text-muted" />
                    <span className="text-xs font-medium">Security & Access</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border-subtle" />
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="rounded-lg cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/10 gap-2 text-red-500 font-bold py-2"
                  >
                    <LogOut size={14} />
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
