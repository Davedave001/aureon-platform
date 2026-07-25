import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";

const events = [
  { title: "AI in Finance Webinar", date: "MAY 24", meta: "7:00 PM GMT+1" },
  { title: "Crypto Trading Masterclass", date: "MAY 28", meta: "4:00 PM GMT+1" },
  { title: "London Trading Meetup", date: "JUN 05", meta: "6:30 PM GMT+1" },
];

export function UpcomingEvents() {
  return (
    <SectionCard title="Upcoming Events" viewAllHref="/events">
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.title} className="flex items-center gap-3">
            <div className="flex w-11 shrink-0 flex-col items-center rounded-lg border border-border py-1">
              <span className="text-[10px] font-semibold text-primary">
                {e.date.split(" ")[0]}
              </span>
              <span className="text-sm font-bold text-foreground">
                {e.date.split(" ")[1]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {e.title}
              </p>
              <p className="text-xs text-muted-foreground">{e.meta}</p>
            </div>
            <Button size="sm" variant="secondary" className="h-7 px-2.5 text-xs">
              Register
            </Button>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
