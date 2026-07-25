import { Icon } from "@iconify/react";
import { SectionCard } from "@/components/shared/section-card";

const notifications = [
  {
    icon: "mdi:heart",
    text: "Your article received 12 new likes",
    time: "10m ago",
    tone: "bg-rose-400/15 text-rose-400",
  },
  {
    icon: "mdi:message-outline",
    text: "New reply in Forex Community",
    time: "25m ago",
    tone: "bg-sky-400/15 text-sky-400",
  },
  {
    icon: "mdi:calendar-clock-outline",
    text: "Event reminder: AI in Finance Webinar",
    time: "1h ago",
    tone: "bg-amber-400/15 text-amber-400",
  },
];

export function NotificationsPreview() {
  return (
    <SectionCard title="Notifications" viewAllHref="/notifications">
      <ul className="space-y-3.5">
        {notifications.map((n, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full ${n.tone}`}
            >
              <Icon icon={n.icon} className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm leading-snug text-foreground">{n.text}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
