"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/shared/section-card";
import {
  settingsTabs,
  notificationSettings,
  connectedAccounts,
  activeSessions,
  themeOptions,
  privacyToggles,
} from "@/lib/settings-data";
import { cn } from "@/lib/utils";

const inputClass = "";
const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  on,
}: {
  label: string;
  desc: string;
  on: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={on} />
    </div>
  );
}

export function SettingsView() {
  const [tab, setTab] = useState<(typeof settingsTabs)[number]["key"]>("Account");
  const { theme, setTheme } = useTheme();

  // Avoid a hydration mismatch: theme is only known on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const activeTheme = mounted ? theme : undefined;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
      {/* Vertical tab nav */}
      <nav className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-2">
          {settingsTabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                tab === t.key
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon icon={t.icon} className="size-4 shrink-0" />
              {t.key}
            </button>
          ))}
        </div>
      </nav>

      <div className="lg:col-span-3">
        {tab === "Account" ? (
          <SectionCard title="Account">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <Input defaultValue="David O." className={inputClass} />
              </Field>
              <Field label="Username">
                <Input defaultValue="davidO" className={inputClass} />
              </Field>
              <Field label="Email">
                <Input defaultValue="omondidavid271@gmail.com" type="email" />
              </Field>
              <Field label="Timezone">
                <select className={selectClass} defaultValue="GMT+0 (London)">
                  <option>GMT+0 (London)</option>
                  <option>GMT-5 (New York)</option>
                  <option>GMT+1 (Berlin)</option>
                  <option>GMT+8 (Singapore)</option>
                </select>
              </Field>
              <Field label="Language">
                <select className={selectClass} defaultValue="English">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </Field>
            </div>
            <Field label="Bio">
              <textarea
                rows={3}
                defaultValue="Multi-asset trader focused on macro and crypto."
                className={cn(selectClass, "mt-4 resize-none")}
              />
            </Field>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </SectionCard>
        ) : null}

        {tab === "Notifications" ? (
          <SectionCard title="Email Notifications">
            <div className="divide-y divide-border">
              {notificationSettings.map((n) => (
                <ToggleRow key={n.key} label={n.label} desc={n.desc} on={n.on} />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {tab === "Security" ? (
          <div className="flex flex-col gap-5">
            <SectionCard title="Password">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Current Password">
                  <Input type="password" placeholder="••••••••" />
                </Field>
                <div />
                <Field label="New Password">
                  <Input type="password" placeholder="••••••••" />
                </Field>
                <Field label="Confirm New Password">
                  <Input type="password" placeholder="••••••••" />
                </Field>
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Update Password</Button>
              </div>
            </SectionCard>

            <SectionCard title="Two-Factor Authentication">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Authenticator app (TOTP)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Require a one-time code at sign-in for extra security.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </SectionCard>

            <SectionCard title="Connected Accounts">
              <ul className="space-y-2.5">
                {connectedAccounts.map((a) => (
                  <li key={a.name} className="flex items-center gap-3">
                    <Icon icon={a.icon} className="size-5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {a.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.detail}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 shrink-0 px-2.5 text-xs"
                    >
                      {a.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Active Sessions">
              <ul className="space-y-3">
                {activeSessions.map((s, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon icon={s.icon} className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        {s.device}
                        {s.current ? (
                          <Badge className="bg-bull/15 text-[10px] text-bull hover:bg-bull/15">
                            This device
                          </Badge>
                        ) : null}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.location} · {s.time}
                      </p>
                    </div>
                    {!s.current ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 shrink-0 px-2.5 text-xs hover:text-bear"
                      >
                        Revoke
                      </Button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        ) : null}

        {tab === "Privacy" ? (
          <SectionCard title="Privacy">
            <div className="divide-y divide-border">
              {privacyToggles.map((p) => (
                <ToggleRow key={p.key} label={p.label} desc={p.desc} on={p.on} />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {tab === "Appearance" ? (
          <SectionCard title="Appearance">
            <p className="mb-3 -mt-1 text-xs text-muted-foreground">
              Choose how Aureon looks to you.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setTheme(o.key)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors",
                    activeTheme === o.key
                      ? "border-primary/40 bg-primary/10"
                      : "border-border hover:bg-accent"
                  )}
                >
                  <Icon
                    icon={o.icon}
                    className={cn(
                      "size-6",
                      activeTheme === o.key
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {o.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Aureon is designed dark-first; your choice is saved to this device.
            </p>
          </SectionCard>
        ) : null}
      </div>
    </div>
  );
}
