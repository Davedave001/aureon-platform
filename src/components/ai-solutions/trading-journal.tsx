"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SoonButton } from "@/components/shared/soon-button";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Summary = {
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  net_profit: number;
};

type Report = {
  observed_trades?: number;
  assessment?: string[];
  action_plan?: string[];
};

const analytics = [
  {
    icon: "mdi:chart-bell-curve-cumulative",
    title: "Performance",
    desc: "Expectancy, risk-reward, drawdown and your equity curve.",
  },
  {
    icon: "mdi:brain",
    title: "Behaviour",
    desc: "Automatic revenge-trading and overtrading detection.",
  },
  {
    icon: "mdi:compass-outline",
    title: "Edge discovery",
    desc: "Which pairs, sessions, setups and emotions actually make you money.",
  },
  {
    icon: "mdi:robot-happy-outline",
    title: "AI Coach report",
    desc: "A written review of your trading with concrete, personalised actions.",
  },
];

function money(n: number) {
  return `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}

export function TradingJournal() {
  const [status, setStatus] = useState<"checking" | "unavailable" | "ready">(
    "checking"
  );
  const [summary, setSummary] = useState<Summary | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [importing, setImporting] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadSummary() {
    const res = await apiFetch("/api/coach/performance/summary");
    if (res.ok) {
      const json = (await res.json()) as { data?: Summary };
      setSummary(json.data ?? null);
      setStatus("ready");
    } else {
      // 503/502 => coach container not connected yet
      setStatus("unavailable");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSummary();
  }, []);

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setMsg(null);
    const form = new FormData();
    form.append("file", file);
    const res = await apiFetch("/api/coach/imports/mt5", {
      method: "POST",
      body: form,
    });
    setImporting(false);
    if (fileRef.current) fileRef.current.value = "";
    if (res.ok) {
      const json = (await res.json().catch(() => ({}))) as {
        imported?: number;
        skipped?: number;
      };
      setMsg(
        `Imported ${json.imported ?? 0} trades` +
          (json.skipped ? `, skipped ${json.skipped} duplicates.` : ".")
      );
      void loadSummary();
    } else {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg(json.error ?? "Import failed. Check the file format (MT5/Exness CSV).");
    }
  }

  async function generateReport() {
    setReporting(true);
    const res = await apiFetch("/api/coach/performance/coach-report");
    setReporting(false);
    if (res.ok) {
      const json = (await res.json()) as { data?: Report };
      setReport(json.data ?? null);
    }
  }

  // --- Coach not deployed yet: show the informational scaffold ---
  if (status !== "ready") {
    return (
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon icon="mdi:notebook-edit-outline" className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                MCP Trading Journal
              </h2>
              <p className="text-xs text-muted-foreground">
                Import your MetaTrader history and let the AI coach analyse it.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <SoonButton className="gap-1.5">
              <Icon icon="mdi:file-upload-outline" className="size-4" />
              Import MT5 trades
            </SoonButton>
            <SoonButton variant="outline" className="gap-1.5">
              <Icon icon="mdi:file-document-outline" className="size-4" />
              Generate coach report
            </SoonButton>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {status === "checking"
              ? "Checking the coach service…"
              : "The analytics engine is ready. Live import activates once the coach service container is connected to your account."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {analytics.map((a) => (
            <SectionCard key={a.title} title={a.title}>
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon icon={a.icon} className="size-4" />
                </div>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    );
  }

  // --- Coach connected: live journal ---
  const hasTrades = (summary?.total_trades ?? 0) > 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon icon="mdi:notebook-edit-outline" className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                MCP Trading Journal
              </h2>
              <p className="text-xs text-muted-foreground">
                Import your MetaTrader / Exness history and get AI coaching.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-bull">
            <span className="size-1.5 rounded-full bg-bull" />
            Connected
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={onImport}
            className="hidden"
          />
          <Button
            className="gap-1.5"
            disabled={importing}
            onClick={() => fileRef.current?.click()}
          >
            <Icon icon="mdi:file-upload-outline" className="size-4" />
            {importing ? "Importing…" : "Import trades (CSV)"}
          </Button>
          <Button
            variant="outline"
            className="gap-1.5"
            disabled={reporting || !hasTrades}
            onClick={() => void generateReport()}
          >
            <Icon icon="mdi:file-document-outline" className="size-4" />
            {reporting ? "Analysing…" : "Generate coach report"}
          </Button>
          {msg ? (
            <span className="text-xs text-muted-foreground">{msg}</span>
          ) : null}
        </div>
      </div>

      {hasTrades && summary ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Total Trades" value={String(summary.total_trades)} />
          <Stat label="Win Rate" value={`${summary.win_rate}%`} />
          <Stat
            label="Net Profit"
            value={money(summary.net_profit)}
            tone={summary.net_profit >= 0 ? "bull" : "bear"}
          />
          <Stat
            label="Win / Loss"
            value={`${summary.winning_trades} / ${summary.losing_trades}`}
          />
        </div>
      ) : (
        <SectionCard title="No trades yet">
          <p className="text-sm text-muted-foreground">
            Import a MetaTrader 5 or Exness trade-history CSV to see your
            performance and unlock the AI coach report.
          </p>
        </SectionCard>
      )}

      {report ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SectionCard title="Assessment">
            <ul className="space-y-2">
              {(report.assessment ?? []).map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Icon
                    icon="mdi:eye-check-outline"
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Action plan">
            <ul className="space-y-2">
              {(report.action_plan ?? []).map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Icon
                    icon="mdi:arrow-right-circle-outline"
                    className="mt-0.5 size-4 shrink-0 text-bull"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "bull" | "bear";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={
          "mt-1 text-lg font-bold " +
          (tone === "bull"
            ? "text-bull"
            : tone === "bear"
              ? "text-bear"
              : "text-foreground")
        }
      >
        {value}
      </p>
    </div>
  );
}
