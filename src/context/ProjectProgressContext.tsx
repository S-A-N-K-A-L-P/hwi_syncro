'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';

export interface ActivityLog {
  _id: string;
  projectId: string;
  user?: string;
  userId?: string;
  userName?: string;
  action: string;
  timestamp: string;
  details?: string;
  metadata?: any;
}

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  progress: number;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  createdAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'archived';
  progress: number;
  lead: { name: string; avatar?: string; _id?: string };
  orgId: { name: string; slug: string; _id: string };
  members: string[];
  techStack: string[];
  githubRepo?: string;
  updatedAt: string;
}

interface ProjectProgressContextType {
  project: Project | null;
  tasks: Task[];
  activityLogs: ActivityLog[];
  loading: boolean;
  error: string | null;
  fetchProjectData: (id?: string) => Promise<void>;
  updateTaskProgress: (taskId: string, progress: number, message?: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

const ProjectProgressContext = createContext<ProjectProgressContextType | undefined>(undefined);

export function ProjectProgressProvider({ children, projectId }: { children: React.ReactNode; projectId?: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const resolvedId = projectId || (params?.id as string);

  const fetchProjectData = useCallback(async (id?: string) => {
    const targetId = id || resolvedId;
    if (!targetId) return;

    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Project Details
      const projectRes = await fetch(`/api/projects?id=${targetId}`);
      if (!projectRes.ok) throw new Error('Failed to fetch project details');
      const projectData = await projectRes.json();
      setProject(projectData);

      // 2. Fetch Tasks
      const tasksRes = await fetch(`/api/project-progress/tasks/project/${targetId}`);
      if (tasksRes.ok) {
        const { tasks } = await tasksRes.json();
        setTasks(tasks || []);
      }

      // 3. Fetch Activity Logs
      const activityRes = await fetch(`/api/activity?projectId=${targetId}`);
      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setActivityLogs(Array.isArray(activityData) ? activityData : activityData.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('ProjectProgressContext Error:', err);
    } finally {
      setLoading(false);
    }
  }, [resolvedId]);

  const updateTaskProgress = async (taskId: string, progress: number, message?: string) => {
    try {
      const res = await fetch('/api/project-progress/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, progress, message }),
      });
      if (!res.ok) throw new Error('Failed to update progress');
      
      // Optimistic update or just refresh
      await fetchProjectData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const refreshAll = () => fetchProjectData();

  // Initial fetch
  useEffect(() => {
    if (resolvedId) {
      fetchProjectData();
    }
  }, [resolvedId, fetchProjectData]);

  const value: ProjectProgressContextType = {
    project,
    tasks,
    activityLogs,
    loading,
    error,
    fetchProjectData,
    updateTaskProgress,
    refreshAll,
  };

  return (
    <ProjectProgressContext.Provider value={value}>
      {children}
    </ProjectProgressContext.Provider>
  );
}

export function useProjectProgress(): ProjectProgressContextType {
  const context = useContext(ProjectProgressContext);
  if (!context) {
    throw new Error('useProjectProgress must be used within ProjectProgressProvider');
  }
  return context;
}
