"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";
import {
  settingsTabs,
  notificationSettings,
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
  checked,
  onCheckedChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

type Prefs = Record<string, unknown>;

export function SettingsView({ initialTab }: { initialTab?: string }) {
  type TabKey = (typeof settingsTabs)[number]["key"];
  const validTab = settingsTabs.find((t) => t.key === initialTab)?.key;
  const [tab, setTab] = useState<TabKey>(validTab ?? "Account");
  const { theme, setTheme } = useTheme();

  // Avoid a hydration mismatch: theme is only known on the client.
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("GMT+0 (London)");
  const [language, setLanguage] = useState("English");
  const [savingAccount, setSavingAccount] = useState(false);
  const [savedAccount, setSavedAccount] = useState(false);

  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (newPw.length < 8) {
      setPwMsg({ ok: false, text: "New password must be at least 8 characters." });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ ok: false, text: "New passwords do not match." });
      return;
    }
    setPwSaving(true);
    const res = await apiFetch("/api/account/password", {
      method: "POST",
      body: JSON.stringify({ currentPassword: curPw, newPassword: newPw }),
    });
    setPwSaving(false);
    if (res.ok) {
      setPwMsg({ ok: true, text: "Password updated." });
      setCurPw("");
      setNewPw("");
      setConfirmPw("");
    } else {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setPwMsg({ ok: false, text: data.error ?? "Could not update password." });
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    void (async () => {
      const [prefRes, profRes] = await Promise.all([
        apiFetch("/api/preferences"),
        apiFetch("/api/profile"),
      ]);
      if (prefRes.ok) {
        const { preferences } = (await prefRes.json()) as { preferences: Prefs };
        setPrefs(preferences ?? {});
        if (typeof preferences?.timezone === "string")
          setTimezone(preferences.timezone);
        if (typeof preferences?.language === "string")
          setLanguage(preferences.language);
      }
      if (profRes.ok) {
        const { profile } = (await profRes.json()) as {
          profile: {
            name: string | null;
            email: string;
            handle: string | null;
            bio: string | null;
          };
        };
        setName(profile.name ?? "");
        setUsername(profile.handle ?? "");
        setEmail(profile.email);
        setBio(profile.bio ?? "");
      }
    })();
  }, []);

  const activeTheme = mounted ? theme : undefined;

  function togglePref(key: string, fallback: boolean) {
    const current =
      typeof prefs[key] === "boolean" ? (prefs[key] as boolean) : fallback;
    const next = { ...prefs, [key]: !current };
    setPrefs(next);
    void apiFetch("/api/preferences", {
      method: "PUT",
      body: JSON.stringify({ preferences: next }),
    });
  }

  function prefOn(key: string, fallback: boolean) {
    return typeof prefs[key] === "boolean" ? (prefs[key] as boolean) : fallback;
  }

  async function saveAccount() {
    setSavingAccount(true);
    setSavedAccount(false);
    await Promise.all([
      apiFetch("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, handle: username, bio }),
      }),
      apiFetch("/api/preferences", {
        method: "PUT",
        body: JSON.stringify({
          preferences: { ...prefs, timezone, language },
        }),
      }),
    ]);
    setPrefs((p) => ({ ...p, timezone, language }));
    setSavingAccount(false);
    setSavedAccount(true);
  }

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
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSavedAccount(false);
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label="Username">
                <Input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setSavedAccount(false);
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label="Email">
                <Input value={email} type="email" disabled />
              </Field>
              <Field label="Timezone">
                <select
                  className={selectClass}
                  value={timezone}
                  onChange={(e) => {
                    setTimezone(e.target.value);
                    setSavedAccount(false);
                  }}
                >
                  <option>GMT+0 (London)</option>
                  <option>GMT-5 (New York)</option>
                  <option>GMT+1 (Berlin)</option>
                  <option>GMT+8 (Singapore)</option>
                </select>
              </Field>
              <Field label="Language">
                <select
                  className={selectClass}
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setSavedAccount(false);
                  }}
                >
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
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setSavedAccount(false);
                }}
                className={cn(selectClass, "mt-4 resize-none")}
              />
            </Field>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => void saveAccount()}
                disabled={savingAccount}
              >
                {savingAccount
                  ? "Saving…"
                  : savedAccount
                    ? "Saved ✓"
                    : "Save Changes"}
              </Button>
            </div>
          </SectionCard>
        ) : null}

        {tab === "Notifications" ? (
          <SectionCard title="Email Notifications">
            <div className="divide-y divide-border">
              {notificationSettings.map((n) => (
                <ToggleRow
                  key={n.key}
                  label={n.label}
                  desc={n.desc}
                  checked={prefOn(n.key, n.on)}
                  onCheckedChange={() => togglePref(n.key, n.on)}
                />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {tab === "Security" ? (
          <div className="flex flex-col gap-5">
            <SectionCard title="Password">
              <form onSubmit={updatePassword}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Current Password">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={curPw}
                      onChange={(e) => setCurPw(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Field>
                  <div />
                  <Field label="New Password">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Field>
                  <Field label="Confirm New Password">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      autoComplete="new-password"
                    />
                  </Field>
                </div>
                <div className="mt-4 flex items-center justify-end gap-3">
                  {pwMsg ? (
                    <span
                      className={cn(
                        "text-xs",
                        pwMsg.ok ? "text-bull" : "text-bear"
                      )}
                    >
                      {pwMsg.text}
                    </span>
                  ) : null}
                  <Button
                    type="submit"
                    size="sm"
                    disabled={pwSaving || !curPw || !newPw || !confirmPw}
                  >
                    {pwSaving ? "Updating…" : "Update Password"}
                  </Button>
                </div>
              </form>
            </SectionCard>

            <SectionCard title="Two-Factor Authentication">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Authenticator app (TOTP)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Require a one-time code at sign-in for extra security.
                    Coming soon.
                  </p>
                </div>
                <Switch checked={false} disabled />
              </div>
            </SectionCard>

          </div>
        ) : null}

        {tab === "Privacy" ? (
          <SectionCard title="Privacy">
            <div className="divide-y divide-border">
              {privacyToggles.map((p) => (
                <ToggleRow
                  key={p.key}
                  label={p.label}
                  desc={p.desc}
                  checked={prefOn(p.key, p.on)}
                  onCheckedChange={() => togglePref(p.key, p.on)}
                />
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
