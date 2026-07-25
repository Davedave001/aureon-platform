import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/profile-data";
import { dicebearAvatar } from "@/lib/images";

export function ProfileHeader() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-black p-5 shadow-[inset_0_1px_0_rgba(233,219,180,0.08),0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:p-6"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Crect width='28' height='28' fill='none' stroke='rgba(233,219,180,0.08)' stroke-width='1'/%3E%3C/svg%3E\")",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-20 ring-2 ring-primary/30">
            <AvatarImage src={dicebearAvatar(profile.seed)} alt={profile.name} />
            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              {profile.verified ? (
                <Icon icon="mdi:check-decagram" className="size-5 text-primary" />
              ) : null}
            </div>
            <p className="text-sm text-white/60">{profile.handle}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
              <span className="text-primary">{profile.role}</span>
              <span className="flex items-center gap-1">
                <Icon icon="mdi:map-marker-outline" className="size-3.5" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="mdi:calendar-blank-outline" className="size-3.5" />
                {profile.joined}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-1.5 border-primary/30 text-white hover:bg-primary/10 hover:text-white"
        >
          <Icon icon="mdi:pencil-outline" className="size-4" />
          Edit Profile
        </Button>
      </div>

      <div className="relative z-10 mt-5 grid grid-cols-4 gap-3">
        {profile.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-primary/15 bg-white/[0.03] px-3 py-2.5 text-center backdrop-blur-md"
          >
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className="text-[11px] text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
