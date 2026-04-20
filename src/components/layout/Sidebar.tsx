"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  User,
  Settings,
  ShieldCheck,
  ListChecks,
  Lightbulb,
  Zap,
  LogOut,
  Rocket,
  Target,
  Users,
  Layout,
  Sparkles,
  PieChart,
  ArrowLeft
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import ThemeModeToggle from "@/components/theme/ThemeModeToggle";
import { cn } from "@/lib/utils";

const navigation = [
  {
    group: "Strategy", items: [
      { name: "Venture Console", href: "/my-startup", icon: Rocket },
      { name: "Discovery Engine", href: "/startups", icon: Search },
    ]
  },
  {
    group: "Executive", items: [
      { name: "Global Feed", href: "/feed", icon: Home },
      { name: "Innovation Lab", href: "/ideas", icon: Lightbulb },
    ]
  },
  {
    group: "Network", items: [
      { name: "Briefings", href: "/notifications", icon: Bell },
    ]
  },
  {
    group: "Systems", items: [
      { name: "Portfolio", href: "/profile", icon: User, dynamic: true },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

const startupNavigation = [
  { name: "Strategic Overview", icon: Target, id: "overview" },
  { name: "Human Capital", icon: Users, id: "team" },
  { name: "Infrastructure", icon: Layout, id: "product" },
  { name: "Operations", icon: ListChecks, id: "tasks" },
  { name: "AI Core", icon: Sparkles, id: "assistant" },
  { name: "Board of Mentors", icon: Zap, id: "mentors" },
  { name: "Capital & Traction", icon: PieChart, id: "funding" },
  { name: "Console Settings", icon: Settings, id: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userProfileHref = session?.user ? `/profile/${(session.user as any).id}` : "/login";

  return (
    <aside className="h-screen sticky top-0 flex flex-col bg-background border-r border-border-subtle w-64 overflow-y-auto z-40">
      {/* Brand Identity */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-background shadow-lg shadow-accent/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-foreground tracking-tighter text-base leading-none">PIXEL CORE</span>
          <span className="text-[8px] font-mono font-bold text-muted uppercase tracking-[0.3em] mt-1">Enterprise OS</span>
        </div>
      </div>

      {/* Navigation Matrix */}
      <nav className="flex-1 px-4 space-y-7 mt-4">
        {pathname.startsWith("/my-startup") ? (
          <div>
            <div className="flex items-center gap-2 px-3 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
               <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest">
                 Mission Control
               </h3>
            </div>
            <div className="space-y-0.5">
              {startupNavigation.map((item) => {
                const isActive = pathname === `/my-startup/${item.id}` || (item.id === 'overview' && pathname === '/my-startup');

                return (
                  <Link
                    key={item.id}
                    href={`/my-startup/${item.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium transition-all group relative",
                      isActive
                        ? "text-foreground bg-surface-alt border border-border-subtle shadow-sm"
                        : "text-muted hover:text-foreground hover:bg-surface-alt/50"
                    )}
                  >
                    {isActive && (
                      <div className="absolute -left-1 w-1 h-3 bg-accent rounded-full" />
                    )}
                    <item.icon className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border-subtle">
               <Link
                href="/feed"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold text-muted hover:text-accent transition-all group"
               >
                 <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                 Return to Platform
               </Link>
            </div>
          </div>
        ) : (
          navigation.map((group) => (
            <div key={group.group}>
              <h3 className="px-3 text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-3">
                {group.group}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const href = item.dynamic ? userProfileHref : item.href;
                  const isActive = pathname === href || (item.dynamic && pathname.startsWith("/profile/"));

                  return (
                    <Link
                      key={item.name}
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium transition-all group relative",
                        isActive
                          ? "text-foreground bg-surface-alt border border-border-subtle shadow-sm"
                          : "text-muted hover:text-foreground hover:bg-surface-alt/50"
                      )}
                    >
                      {isActive && (
                        <div className="absolute -left-1 w-1 h-3 bg-accent rounded-full" />
                      )}
                      <item.icon className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                      )} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* System Administration */}
        {!pathname.startsWith("/my-startup") && session?.user && (session.user as any).role === "pixel_head" && (
          <div className="pt-2">
            <h3 className="px-3 text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Governance</h3>
            <div className="space-y-1">
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium transition-all group relative",
                  pathname === "/admin" ? "bg-surface-alt border border-border-subtle text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                <ShieldCheck className={cn("w-4 h-4", pathname === "/admin" ? "text-accent" : "text-muted group-hover:text-foreground")} />
                Control Center
              </Link>
              <Link
                href="/admin/projects"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium transition-all group relative",
                  pathname.startsWith("/admin/projects") ? "bg-surface-alt border border-border-subtle text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                <ListChecks className={cn("w-4 h-4", pathname.startsWith("/admin/projects") ? "text-accent" : "text-muted group-hover:text-foreground")} />
                System Progress
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Identity Module */}
      <div className="p-4 border-t border-border-subtle mt-auto bg-surface-alt/20">
        <div className="mb-4">
          <ThemeModeToggle />
        </div>
        <Link
          href={userProfileHref}
          className="flex items-center gap-3 p-2 hover:bg-surface-alt rounded-xl transition-all group border border-transparent hover:border-border-subtle"
        >
          <div className="w-9 h-9 rounded-lg bg-surface-alt border border-border-strong flex items-center justify-center text-[13px] font-bold text-foreground overflow-hidden">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="" width={36} height={36} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent text-background text-xs font-bold">
                 {session?.user?.name?.[0] || '?'}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-foreground truncate tracking-tight">{session?.user?.name || "Unidentified Node"}</p>
            <p className="text-[9px] font-mono font-bold text-muted truncate uppercase tracking-tighter mt-0.5">
              {(session?.user as any)?.role?.replace('_', ' ') || "Guest Access"}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
