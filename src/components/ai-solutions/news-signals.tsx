"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Signal = {
  id: string;
  source: string;
  author: string | null;
  headline: string;
  url: string | null;
  instrument: string | null;
  direction: string | null;
  sentiment: string | null;
  impact: string;
  confidence: number;
  createdAt: string;
};

type Order = {
  id: string;
  instrument: string;
  direction: string;
  lot: number;
  status: string;
  createdAt: string;
  signal: { headline: string; source: string } | null;
};

type Config = {
  enabled: boolean;
  maxLot: number;
  instruments: string;
  minConfidence: number;
  minImpact: string;
};

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString();
}

const impactStyle: Record<string, string> = {
  high: "border-bear/30 bg-bear/10 text-bear",
  medium: "border-gold/30 bg-gold/10 text-gold",
  low: "border-border bg-secondary text-muted-foreground",
};

export function NewsSignalsView() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [signals, setSignals] = useState<Signal[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  // admin push form
  const [pushHeadline, setPushHeadline] = useState("");
  const [pushing, setPushing] = useState(false);

  const loadFeed = useCallback(async () => {
    const [sRes, oRes] = await Promise.all([
      apiFetch("/api/news-signals"),
      apiFetch("/api/trade-orders"),
    ]);
    if (sRes.ok) setSignals(((await sRes.json()) as { signals: Signal[] }).signals);
    if (oRes.ok) setOrders(((await oRes.json()) as { orders: Order[] }).orders);
  }, []);

  useEffect(() => {
    void (async () => {
      const cRes = await apiFetch("/api/auto-trade");
      if (cRes.ok) setConfig(((await cRes.json()) as { config: Config }).config);
      await loadFeed();
    })();
  }, [loadFeed]);

  async function saveConfig(next: Config) {
    setConfig(next);
    setSaving(true);
    const res = await apiFetch("/api/auto-trade", {
      method: "PUT",
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (res.ok) {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 1500);
    }
  }

  async function pushSignal(e: React.FormEvent) {
    e.preventDefault();
    if (!pushHeadline.trim()) return;
    setPushing(true);
    const res = await apiFetch("/api/news-signals", {
      method: "POST",
      body: JSON.stringify({ headline: pushHeadline, source: "manual" }),
    });
    setPushing(false);
    if (res.ok) {
      setPushHeadline("");
      await loadFeed();
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Honest execution banner */}
      <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/5 p-4">
        <Icon icon="mdi:flash-outline" className="mt-0.5 size-5 shrink-0 text-gold" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            News-trading engine — alerts live, execution simulated
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Signals and notifications are real. Auto-trade currently records{" "}
            <span className="font-medium text-foreground">simulated</span> orders
            because no MT5 execution bridge is connected yet. Connect one to make
            orders live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Auto-trade control panel */}
        <div className="lg:col-span-1">
          <SectionCard title="Auto-Trade">
            {!config ? (
              <div className="h-40 animate-pulse rounded-lg bg-secondary/40" />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {config.enabled ? "Enabled" : "Disabled"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Master switch / kill-switch
                    </p>
                  </div>
                  <Switch
                    checked={config.enabled}
                    onCheckedChange={(v) => saveConfig({ ...config, enabled: v })}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Max lot size per trade
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={config.maxLot}
                    onChange={(e) =>
                      setConfig({ ...config, maxLot: Number(e.target.value) })
                    }
                    onBlur={() => saveConfig(config)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Minimum confidence: {config.minConfidence}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={config.minConfidence}
                    onChange={(e) =>
                      setConfig({ ...config, minConfidence: Number(e.target.value) })
                    }
                    onMouseUp={() => saveConfig(config)}
                    onTouchEnd={() => saveConfig(config)}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Minimum impact
                  </label>
                  <select
                    className={selectClass}
                    value={config.minImpact}
                    onChange={(e) =>
                      saveConfig({ ...config, minImpact: e.target.value })
                    }
                  >
                    <option value="high">High only</option>
                    <option value="medium">Medium and above</option>
                    <option value="low">Any</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Instruments allowlist
                  </label>
                  <Input
                    placeholder="e.g. XAUUSD, EURUSD (blank = all)"
                    value={config.instruments}
                    onChange={(e) =>
                      setConfig({ ...config, instruments: e.target.value })
                    }
                    onBlur={() => saveConfig(config)}
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Comma-separated. Leave blank to allow every instrument.
                  </p>
                </div>

                {saving ? (
                  <p className="text-xs text-muted-foreground">Saving…</p>
                ) : savedMsg ? (
                  <p className="text-xs text-bull">Saved.</p>
                ) : null}
              </div>
            )}
          </SectionCard>

          {isAdmin ? (
            <div className="mt-5">
              <SectionCard title="Push test signal (admin)">
                <form onSubmit={pushSignal} className="space-y-2.5">
                  <textarea
                    rows={3}
                    value={pushHeadline}
                    onChange={(e) => setPushHeadline(e.target.value)}
                    placeholder="e.g. Trump announces new 25% tariffs on all imports"
                    className={selectClass}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full"
                    disabled={pushing || !pushHeadline.trim()}
                  >
                    {pushing ? "Pushing…" : "Push through pipeline"}
                  </Button>
                </form>
              </SectionCard>
            </div>
          ) : null}
        </div>

        {/* Signals feed + orders */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <SectionCard title="Live News Signals">
            {signals.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <Icon
                  icon="mdi:newspaper-variant-outline"
                  className="size-8 text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  No signals yet. They appear here the moment a source posts
                  market-moving news.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {signals.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-lg border border-border bg-card p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {s.headline}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {s.author ? `${s.author} · ` : ""}
                          {s.source} · {timeAgo(s.createdAt)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`shrink-0 capitalize ${impactStyle[s.impact] ?? impactStyle.low}`}
                      >
                        {s.impact}
                      </Badge>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      {s.instrument ? (
                        <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                          {s.instrument}
                        </Badge>
                      ) : null}
                      {s.direction && s.direction !== "neutral" ? (
                        <span
                          className={
                            "flex items-center gap-1 text-xs font-semibold " +
                            (s.direction === "buy" ? "text-bull" : "text-bear")
                          }
                        >
                          <Icon
                            icon={
                              s.direction === "buy"
                                ? "mdi:arrow-up-bold"
                                : "mdi:arrow-down-bold"
                            }
                            className="size-3.5"
                          />
                          {s.direction.toUpperCase()}
                        </span>
                      ) : null}
                      <span className="text-xs text-muted-foreground">
                        {s.confidence}% confidence
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="My Auto-Trade Orders">
            {orders.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No orders yet. Enable auto-trade and orders generated from
                signals will show here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="py-1.5 pr-3 font-medium">Instrument</th>
                      <th className="py-1.5 pr-3 font-medium">Side</th>
                      <th className="py-1.5 pr-3 font-medium">Lot</th>
                      <th className="py-1.5 pr-3 font-medium">Status</th>
                      <th className="py-1.5 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-t border-border">
                        <td className="py-2 pr-3 font-medium text-foreground">
                          {o.instrument}
                        </td>
                        <td
                          className={
                            "py-2 pr-3 font-semibold " +
                            (o.direction === "buy" ? "text-bull" : "text-bear")
                          }
                        >
                          {o.direction.toUpperCase()}
                        </td>
                        <td className="py-2 pr-3 text-foreground">{o.lot}</td>
                        <td className="py-2 pr-3">
                          <Badge
                            variant="outline"
                            className="border-gold/30 bg-gold/10 capitalize text-gold"
                          >
                            {o.status}
                          </Badge>
                        </td>
                        <td className="py-2 text-muted-foreground">
                          {timeAgo(o.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
