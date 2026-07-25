import { AppShell } from "@/components/layout/app-shell";
import { ProjectCards } from "@/components/ai-solutions/project-cards";
import { WorkspaceStatsRow } from "@/components/ai-solutions/stats-row";
import { ProjectTracker } from "@/components/ai-solutions/project-tracker";
import { MeetingsList } from "@/components/ai-solutions/meetings-list";
import { DeliverablesTable } from "@/components/ai-solutions/deliverables-table";
import { NewRequestForm } from "@/components/ai-solutions/new-request-form";
import { AiChatAssistant } from "@/components/ai-solutions/ai-chat-assistant";

export default function AiSolutionsPage() {
  return (
    <AppShell
      title="AI Solutions Workspace"
      subtitle="Build. Automate. Scale with AI."
    >
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <ProjectCards />
            <WorkspaceStatsRow />
            <ProjectTracker />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MeetingsList />
              <DeliverablesTable />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <NewRequestForm />
            <AiChatAssistant />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
