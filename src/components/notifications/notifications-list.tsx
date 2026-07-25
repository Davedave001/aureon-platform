import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { notifications } from "@/lib/notifications-data";

export function NotificationsList() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          All Notifications
        </h2>
        <div className="flex items-center gap-4 text-xs">
          <button className="flex items-center gap-1 font-medium text-primary hover:underline">
            <Icon icon="mdi:check-all" className="size-4" />
            Mark all as read
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Icon icon="mdi:sort-variant" className="size-4" />
            Newest
          </button>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {notifications.map((n, i) => (
          <li key={i} className="flex items-start gap-3 py-3.5">
            <span
              className={
                "mt-1.5 size-1.5 shrink-0 rounded-full " +
                (n.unread ? "bg-primary" : "bg-transparent")
              }
            />
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${n.tone}`}
            >
              <Icon icon={n.icon} className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {n.title}
                </p>
                {n.isNew ? (
                  <Badge className="bg-primary/15 text-[10px] text-primary hover:bg-primary/15">
                    New
                  </Badge>
                ) : null}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {n.text}
              </p>
              {n.progress ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-20 shrink-0 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                    {n.progress.label}
                  </span>
                  <Progress
                    value={n.progress.value}
                    className="w-24 [&_[data-slot=progress-track]]:h-1.5"
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {n.progress.value}%
                  </span>
                </div>
              ) : null}
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {n.time}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">
          Showing 1 to 8 of 12 notifications
        </p>
        <div className="flex items-center gap-1">
          <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
            <Icon icon="mdi:chevron-left" className="size-4" />
          </button>
          <button className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
            1
          </button>
          <button className="flex size-7 items-center justify-center rounded-md text-xs text-muted-foreground hover:bg-accent">
            2
          </button>
          <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
            <Icon icon="mdi:chevron-right" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
