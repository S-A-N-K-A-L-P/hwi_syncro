import { ProjectProgressProvider } from "@/context/ProjectProgressContext";

export default function ProjectTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectProgressProvider>
      {children}
    </ProjectProgressProvider>
  );
}
