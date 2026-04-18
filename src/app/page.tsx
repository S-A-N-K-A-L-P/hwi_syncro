import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import Link from "next/link";
import Image from "next/image";
import { ImpactCounters } from "@/components/portfolio/ImpactCounters";
import { ValuesGrid } from "@/components/portfolio/ValuesGrid";
import { CommunityPulse } from "@/components/portfolio/CommunityPulse";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { VisionParallax } from "@/components/portfolio/VisionParallax";
import { MemberSpotlight } from "@/components/portfolio/MemberSpotlight";
import { EventsSection } from "@/components/portfolio/EventsSection";
import { WhoItsFor } from "@/components/portfolio/WhoItsFor";
import { FeaturedEvent } from "@/components/portfolio/FeaturedEvent";
import { PlatformFooter } from "@/components/portfolio/IdeologyFooter";
import { IdeologyCloud } from "@/components/portfolio/IdeologyCloud";
import { DiversitySection } from "@/components/portfolio/DiversitySection";
import { TestimonialCarousel } from "@/components/portfolio/TestimonialCarousel";
import { FutureRoadmap } from "@/components/portfolio/FutureRoadmap";
import { EngagementCTA } from "@/components/portfolio/EngagementCTA";
import { ShieldCheck } from "lucide-react";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Proposal from "@/models/Proposal";
import Activity from "@/models/Activity";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  // Fetch real-time stats
  await dbConnect();
  const [userCount, proposalCount, activityCount] = await Promise.all([
    User.countDocuments(),
    Proposal.countDocuments(),
    Activity.countDocuments()
  ]);

  // Fetch featured projects
  const featuredProjects = await Proposal.find({ 
    createdBy: { $exists: true, $ne: null } 
  })
    .sort({ votes: -1 })
    .limit(3)
    .populate("createdBy", "name avatar")
    .lean();

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20">
              <Image 
                src="/hwi.jpg" 
                alt="Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Hack With</span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">India Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} /> Verified Builder Network
              </span>
            </div>
            <Link href="/login" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all active:scale-95">
              Launch App
            </Link>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <HeroSection />
      </div>
      <ImpactCounters stats={[
        { label: "Community Members", value: userCount, suffix: "+", color: "text-emerald-500" },
        { label: "Products Launched", value: proposalCount, suffix: "", color: "text-teal-500" },
        { label: "Builder Activity", value: activityCount, suffix: "+", color: "text-lime-500" },
      ]} />
      
      <WhoItsFor />

      <FeaturedEvent />
      
      <ValuesGrid />
      
      <EventsSection />

      <ProjectShowcase projects={featuredProjects} />
      
      <div className="bg-slate-50 dark:bg-slate-900/50">
        <IdeologyCloud />
      </div>

      <CommunityPulse />
      <VisionParallax />
      <MemberSpotlight />
      <DiversitySection />
      <TestimonialCarousel />
      <FutureRoadmap />
      <EngagementCTA userCount={userCount} />
      <PlatformFooter />
    </main>
  );
}
