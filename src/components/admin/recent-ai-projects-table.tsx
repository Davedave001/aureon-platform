import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionCard } from "@/components/shared/section-card";
import { recentAiProjects } from "@/lib/admin-data";

const statusTone: Record<string, string> = {
  "In Progress": "border-primary/30 bg-primary/10 text-primary",
  Review: "border-gold/30 bg-gold/10 text-gold",
  Development: "border-sky-400/30 bg-sky-400/10 text-sky-400",
  Planning: "border-border bg-secondary text-muted-foreground",
};

export function RecentAiProjectsTable() {
  return (
    <SectionCard title="Recent AI Projects" viewAllHref="/admin">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Project</th>
              <th className="py-1.5 pr-3 font-medium">Client</th>
              <th className="py-1.5 pr-3 font-medium">Status</th>
              <th className="py-1.5 pr-3 font-medium">Progress</th>
              <th className="py-1.5 font-medium">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {recentAiProjects.map((p) => (
              <tr key={p.project} className="border-t border-border">
                <td className="py-2 pr-3 font-medium text-foreground">
                  {p.project}
                </td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {p.client}
                </td>
                <td className="py-2 pr-3">
                  <Badge variant="outline" className={statusTone[p.status]}>
                    {p.status}
                  </Badge>
                </td>
                <td className="py-2 pr-3">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={p.progress}
                      className="w-16 [&_[data-slot=progress-track]]:h-1.5"
                    />
                    <span className="text-xs text-muted-foreground">
                      {p.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-2 text-muted-foreground">{p.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
