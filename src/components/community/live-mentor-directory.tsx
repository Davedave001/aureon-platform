"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import { dicebearAvatar } from "@/lib/images";

type Mentor = {
  id: string;
  name: string;
  badge: string;
  bio: string | null;
  location: string | null;
};

export function LiveMentorDirectory() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/mentors");
      if (res.ok) {
        const data = (await res.json()) as { mentors: Mentor[] };
        setMentors(data.mentors);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  return (
    <SectionCard title="Mentor Directory">
      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-secondary/40" />
          ))}
        </div>
      ) : mentors.length === 0 ? (
        <div className="py-10 text-center">
          <Icon
            icon="mdi:account-star-outline"
            className="mx-auto size-8 text-muted-foreground"
          />
          <p className="mt-3 text-sm text-foreground">No verified mentors yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Verified traders appear here once their credentials are approved.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m) => (
            <div
              key={m.id}
              className="flex flex-col rounded-xl border border-border p-3.5"
            >
              <Avatar className="size-12">
                <AvatarImage src={dicebearAvatar(m.id)} alt={m.name} />
                <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="mt-2.5 flex items-center gap-1">
                <p className="text-sm font-semibold text-foreground">{m.name}</p>
                <Icon icon="mdi:check-decagram" className="size-4 text-primary" />
              </div>
              <Badge
                variant="outline"
                className="mt-1 w-fit border-gold/30 bg-gold/10 text-[11px] text-gold"
              >
                {m.badge}
              </Badge>
              {m.bio ? (
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {m.bio}
                </p>
              ) : null}
              {m.location ? (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Icon icon="mdi:map-marker-outline" className="size-3" />
                  {m.location}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
