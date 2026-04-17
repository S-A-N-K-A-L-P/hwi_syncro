import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Hack With India | Startup Platform",
  description: "Enterprise-grade startup team formation hub.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-16 min-h-screen flex justify-center">
        <div className="w-full max-w-6xl px-4 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      {/* Footer or Bottom Mobile Nav could go here */}
    </div>
  );
}
