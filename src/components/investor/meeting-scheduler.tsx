"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";
import { meetingTypes, availableTimes } from "@/lib/investor-data";
import { cn } from "@/lib/utils";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const calendarWeeks: (number | null)[][] = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];

export function MeetingScheduler() {
  const [meetingType, setMeetingType] = useState<(typeof meetingTypes)[number]["key"]>("online");
  const [day, setDay] = useState(24);
  const [time, setTime] = useState("10:00 AM");

  return (
    <SectionCard title="Meeting Scheduler">
      <p className="mb-3 -mt-1 text-xs text-muted-foreground">
        Choose a convenient time and meeting type.
      </p>

      <div className="grid grid-cols-3 gap-2">
        {meetingTypes.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMeetingType(m.key)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-2.5 text-center transition-colors",
              meetingType === m.key
                ? "border-primary/40 bg-primary/10"
                : "border-border hover:bg-accent"
            )}
          >
            <Icon
              icon={m.icon}
              className={cn(
                "size-4",
                meetingType === m.key ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="text-[11px] font-medium text-foreground">
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Icon icon="mdi:chevron-left" className="size-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">May 2024</span>
        <Icon icon="mdi:chevron-right" className="size-4 text-muted-foreground" />
      </div>

      <table className="mt-2 w-full text-center text-[11px]">
        <thead>
          <tr className="text-muted-foreground">
            {weekdays.map((w) => (
              <th key={w} className="pb-1 font-medium">
                {w[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((week, i) => (
            <tr key={i}>
              {week.map((d, j) => (
                <td key={j} className="py-0.5">
                  {d ? (
                    <button
                      type="button"
                      onClick={() => setDay(d)}
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full mx-auto transition-colors",
                        d === day
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      {d}
                    </button>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 mb-1.5 text-xs font-medium text-foreground">
        Available Times · May {day}
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {availableTimes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTime(t)}
            className={cn(
              "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
              t === time
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <SoonButton className="mt-4 w-full">
        <Icon icon="mdi:calendar-check" className="size-4" />
        Confirm Meeting
      </SoonButton>
    </SectionCard>
  );
}
