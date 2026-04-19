"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ProjectHeader,
  ProjectProgressBar,
  ProjectMetaInfo
} from "@/components/tracker/CoreComponents";
import {
  ProjectTimeline,
  ProjectHealthIndicator,
  ProjectOrgBadge,
  ProjectLeadCard
} from "@/components/tracker/SecondaryComponents";
import { TrackerTabs } from "@/components/tracker/TrackerTabs";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProjectProgress } from "@/context/ProjectProgressContext";

// Core Functional Components
import { TaskList } from "@/components/tracker/TaskComponents";
import { ContributorList } from "@/components/tracker/ContributorComponents";
import { VerificationPanel, ContributionLog } from "@/components/tracker/VerificationComponents";

// Advanced Tactical Components
import { KanbanBoard, WorkflowStages, AutomationRules, TaskHistory } from "@/components/tracker/advanced/KanbanBoard";
import { SkillMatrix, BandwidthTracker, TeamHeatmap, ReputationAllocation } from "@/components/tracker/advanced/ResourceManagement";
import { DeploymentPulse, BuildLogViewer, GitHubSyncCard, ActivityPulse } from "@/components/tracker/advanced/TelemetryComponents";
import { BurnDownChart, VelocityTracker, ComplexityIndicator } from "@/components/tracker/advanced/AnalyticsComponents";
import { SocialStats, TaskComments, NodeContextCard } from "@/components/tracker/advanced/SocialComponents";

export default function ProjectTrackerPage() {
  const { id } = useParams();
  const { project, tasks, activityLogs, loading, error } = useProjectProgress();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#6366f1] animate-spin" />
    </div>
  );

  if (error || !project) return (
    <div className="flex flex-col h-[80vh] items-center justify-center space-y-4">
      <p className="text-red-500 font-mono font-bold">NODE_OFFLINE: {error || "Project context not initialized"}</p>
      <Link href="/ideas" className="px-6 py-2 bg-surface border border-border-subtle rounded-xl text-xs font-bold uppercase tracking-widest">
        Return to Ideas
      </Link>
    </div>
  );

  // Map tasks to Kanban columns
  const kanbanColumns = [
    { id: 1, title: "Backlog", tasks: tasks.filter(t => t.status === "pending").map(t => ({ id: t._id, title: t.title, tags: [t.priority.toUpperCase()], xp: 20, priority: t.priority.toUpperCase() })) },
    { id: 2, title: "Active Signal", tasks: tasks.filter(t => t.status === "in-progress").map(t => ({ id: t._id, title: t.title, tags: [t.priority.toUpperCase()], xp: 50, priority: t.priority.toUpperCase() })) },
    { id: 3, title: "Verified", tasks: tasks.filter(t => t.status === "completed").map(t => ({ id: t._id, title: t.title, tags: [t.priority.toUpperCase()], xp: 30, priority: t.priority.toUpperCase() })) },
  ];

  // Map activities to timeline
  const timelineActivities = activityLogs.slice(0, 5).map(log => ({
    title: log.action,
    time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    description: log.userName || "System"
  }));

  return (
    <div className="max-w-350 mx-auto space-y-8 pb-20">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/ideas" className="p-2.5 rounded-xl bg-surface border border-border-subtle text-muted hover:text-foreground hover:border-border-strong transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">Tactical Layer / Tracking</span>
          <span className="text-[13px] font-bold text-foreground tracking-tight">Deployment Node {id?.toString().slice(-6) || "INITIAL"}</span>
        </div>
      </div>

      {/* Main Header */}
      <ProjectHeader project={project} />

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <TrackerTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ProjectProgressBar progress={project.progress} />
                    <SocialStats />
                  </div>
                  <ProjectMetaInfo project={project} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <ProjectTimeline activities={timelineActivities.length > 0 ? timelineActivities : [
                      { title: "Kernel Initialized", time: "00:00", description: "Project system synchronized." }
                    ]} />
                    <div className="space-y-8">
                      <ComplexityIndicator score={84} />
                      <div className="bg-surface border border-border-subtle rounded-3xl p-8 space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted font-mono">System Summary</h4>
                        <p className="text-[14px] text-muted leading-relaxed italic">
                          This project is currently in the <strong>{project.status.toUpperCase()}</strong> phase. All active nodes ({tasks.length}) are reporting synchronized states.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-2">
                          {(project.techStack || ["NEXT.JS", "MONGODB", "FRAMER"]).map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border-subtle text-[10px] font-mono font-bold text-foreground uppercase tracking-widest">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2"><BurnDownChart /></div>
                    <VelocityTracker />
                  </div>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="space-y-12">
                  <WorkflowStages stages={[
                    { label: "Design", status: "completed" },
                    { label: "Protocol", status: "completed" },
                    { label: "Alpha", status: project.progress < 50 ? "active" : "completed" },
                    { label: "Beta", status: project.progress >= 50 && project.progress < 90 ? "active" : project.progress >= 90 ? "completed" : "pending" },
                    { label: "Stable", status: project.progress >= 90 ? "active" : "pending" },
                  ]} />

                  <div className="pt-4 border-t border-border-subtle">
                    <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter mb-8">Tactical Ops Node</h3>
                    <KanbanBoard columns={kanbanColumns} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AutomationRules rules={[
                      { trigger: "Task Approved", event: "Status -> Verified", action: "Reputation +10" },
                      { trigger: "PR Merged", event: "Main Branch Node", action: "Update Progress" },
                    ]} />
                    <TaskHistory logs={activityLogs.filter(l => l.metadata?.taskId).map(l => ({
                      user: l.userName || "Unknown",
                      action: l.action,
                      time: new Date(l.timestamp).toLocaleDateString()
                    }))} />
                  </div>
                </div>
              )}

              {activeTab === "contributors" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SkillMatrix skills={[
                      { name: "React / Next", value: 98 },
                      { name: "Node Telemetry", value: 74 },
                      { name: "Design Matrix", value: 82 },
                      { name: "Security Protocols", value: 65 },
                      { name: "Kernel Logic", value: 91 },
                    ]} />
                    <div className="space-y-8">
                      <NodeContextCard user={project.lead} />
                      <ReputationAllocation />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2"><BandwidthTracker team={[
                      { name: project.lead.name, load: 85 },
                    ]} /></div>
                    <TeamHeatmap />
                  </div>
                  <h3 className="text-2xl font-black text-[#e5e7eb] italic uppercase tracking-tighter pt-8 border-t border-[#1f1f23]">Active Collective</h3>
                  <ContributorList
                    members={[
                      { name: project.lead.name, role: "Lead Architect", reputation: 450, rank: 1, contributions: 24 },
                    ]}
                  />
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                      <DeploymentPulse project={project} />
                      <BuildLogViewer />
                    </div>
                    <div className="space-y-8">
                      <GitHubSyncCard repo={{ repoName: project.githubRepo || "artsy-v2-core", owner: "pixel-collective", syncStatus: "syncing", defaultBranch: "main" }} />
                      <ActivityPulse />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[#1f1f23]">
                    <TaskComments />
                  </div>
                </div>
              )}

              {activeTab === "verification" && (
                <VerificationPanel
                  contributions={[]} // Could be fetched from context if implemented
                  onVerify={async (id, status) => {
                    // Verification logic
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Sidebar Stats */}
        <div className="lg:col-span-4 space-y-6">
          <ProjectOrgBadge org={project.orgId} />
          <ProjectLeadCard lead={project.lead} />
          <ProjectHealthIndicator />

          <div className="p-6 bg-[#6366f1]/5 border border-[#6366f1]/10 rounded-3xl space-y-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6366f1] font-mono">Verification Signal</h4>
            <p className="text-[12px] text-[#6366f1]/80 leading-relaxed font-medium">
              This project requires final manual audit by the <strong>Collective Head</strong> before protocol release.
            </p>
            <button className="w-full py-3 rounded-2xl bg-[#6366f1] text-white font-bold text-[12px] uppercase tracking-widest hover:bg-[#4f46e5] transition-all">
              Request Final Audit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
