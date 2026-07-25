import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { secureDocuments } from "@/lib/investor-data";

export function SecureDocuments() {
  return (
    <SectionCard title="Secure Documents" viewAllHref="/investor-centre">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Upload your documents securely.
      </p>
      <ul className="space-y-3">
        {secureDocuments.map((d) => (
          <li key={d.name} className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Icon icon={d.icon} className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{d.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {d.meta}
              </p>
            </div>
            {d.status === "Uploaded" ? (
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-bull">
                <Icon icon="mdi:check-circle" className="size-3.5" />
                Uploaded
              </span>
            ) : (
              <Button size="sm" variant="outline" className="h-7 shrink-0 px-2.5 text-xs">
                Upload
              </Button>
            )}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
