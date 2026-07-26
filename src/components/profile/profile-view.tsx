"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import { dicebearAvatar } from "@/lib/images";
import { roleLabel } from "@/lib/user-display";

type Profile = {
  id: string;
  name: string | null;
  email: string;
  handle: string | null;
  bio: string | null;
  location: string | null;
  role: string;
  createdAt: string;
};

const inputClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/profile");
      if (res.ok) {
        const { profile: p } = (await res.json()) as { profile: Profile };
        setProfile(p);
        setName(p.name ?? "");
        setHandle(p.handle ?? "");
        setBio(p.bio ?? "");
        setLocation(p.location ?? "");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await apiFetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify({ name, handle, bio, location }),
    });
    setSaving(false);
    if (res.ok) {
      const { profile: p } = (await res.json()) as { profile: Profile };
      setProfile(p);
      setEditing(false);
    }
  }

  if (loading || !profile) {
    return <div className="h-48 animate-pulse rounded-2xl bg-card" />;
  }

  const displayName = profile.name || profile.email;
  const joined = new Date(profile.createdAt).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-5">
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
              <AvatarImage
                src={dicebearAvatar(profile.email)}
                alt={displayName}
              />
              <AvatarFallback>{displayName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-white">{displayName}</h2>
              <p className="text-sm text-white/60">
                {profile.handle ? `@${profile.handle}` : profile.email}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                <span className="text-primary">{roleLabel(profile.role)}</span>
                {profile.location ? (
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:map-marker-outline" className="size-3.5" />
                    {profile.location}
                  </span>
                ) : null}
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:calendar-blank-outline" className="size-3.5" />
                  Joined {joined}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-1.5 border-primary/30 text-white hover:bg-primary/10 hover:text-white"
            onClick={() => setEditing((v) => !v)}
          >
            <Icon
              icon={editing ? "mdi:close" : "mdi:pencil-outline"}
              className="size-4"
            />
            {editing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {editing ? (
        <SectionCard title="Edit Profile">
          <form onSubmit={save} className="space-y-3.5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Display Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Handle
                </label>
                <Input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="username"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Location
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community about yourself…"
                className={inputClass}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </SectionCard>
      ) : (
        <SectionCard title="About">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {profile.bio ||
              "No bio yet. Click “Edit Profile” to tell the community about yourself."}
          </p>
        </SectionCard>
      )}
    </div>
  );
}
