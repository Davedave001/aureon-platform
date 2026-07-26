"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Idea = {
  id: string;
  symbol: string;
  side: string;
  entry: string | null;
  target: string | null;
  stop: string | null;
  note: string | null;
  confidence: number;
  createdAt: string;
};

export function TradeJournal() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("");
  const [entry, setEntry] = useState("");
  const [target, setTarget] = useState("");
  const [stop, setStop] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/trade-ideas");
      if (res.ok) {
        const data = (await res.json()) as { ideas: Idea[] };
        setIdeas(data.ideas);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function save(side: "buy" | "sell") {
    const sym = symbol.trim().toUpperCase();
    if (!sym) return;
    setBusy(true);
    const res = await apiFetch("/api/trade-ideas", {
      method: "POST",
      body: JSON.stringify({ symbol: sym, side, entry, target, stop }),
    });
    setBusy(false);
    if (res.ok) {
      const { idea } = (await res.json()) as { idea: Idea };
      setIdeas((prev) => [idea, ...prev]);
      setSymbol("");
      setEntry("");
      setTarget("");
      setStop("");
    }
  }

  async function remove(id: string) {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    await apiFetch(`/api/trade-ideas/${id}`, { method: "DELETE" });
  }

  return (
    <SectionCard title="Trade Journal (Ideas Only — Not Live Trading)">
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          className="h-8 text-xs"
        />
        <Input
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Entry"
          className="h-8 text-xs"
        />
        <Input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
          className="h-8 text-xs"
        />
        <Input
          value={stop}
          onChange={(e) => setStop(e.target.value)}
          placeholder="Stop"
          className="h-8 text-xs"
        />
      </div>
      <div className="mb-3 flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-bull/30 text-bull hover:bg-bull/10"
          disabled={busy || !symbol.trim()}
          onClick={() => void save("buy")}
        >
          <Icon icon="mdi:arrow-up-bold-circle-outline" className="size-4" />
          Save Buy Idea
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-bear/30 text-bear hover:bg-bear/10"
          disabled={busy || !symbol.trim()}
          onClick={() => void save("sell")}
        >
          <Icon icon="mdi:arrow-down-bold-circle-outline" className="size-4" />
          Save Sell Idea
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium">Asset</th>
              <th className="py-1.5 pr-3 font-medium">Side</th>
              <th className="py-1.5 pr-3 font-medium">Entry</th>
              <th className="py-1.5 pr-3 font-medium">Target</th>
              <th className="py-1.5 pr-3 font-medium">Stop</th>
              <th className="py-1.5 pr-3 font-medium">Date</th>
              <th className="py-1.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {ideas.map((t) => (
              <tr key={t.id} className="border-t border-border">
                <td className="py-2 pr-3 font-medium text-foreground">
                  {t.symbol}
                </td>
                <td className="py-2 pr-3">
                  <span
                    className={
                      t.side === "sell"
                        ? "text-xs font-medium text-bear"
                        : "text-xs font-medium text-bull"
                    }
                  >
                    {t.side === "sell" ? "Sell" : "Buy"}
                  </span>
                </td>
                <td className="py-2 pr-3 text-foreground">{t.entry ?? "—"}</td>
                <td className="py-2 pr-3 text-bull">{t.target ?? "—"}</td>
                <td className="py-2 pr-3 text-bear">{t.stop ?? "—"}</td>
                <td className="py-2 pr-3 text-muted-foreground">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 text-right">
                  <button
                    type="button"
                    aria-label="Delete idea"
                    onClick={() => void remove(t.id)}
                    className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-bear"
                  >
                    <Icon icon="mdi:delete-outline" className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && ideas.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-xs text-muted-foreground"
                >
                  No saved ideas yet. Add a symbol above and save a buy or sell
                  idea.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
