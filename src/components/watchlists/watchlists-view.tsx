"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

type Item = { id: string; symbol: string };
type Watchlist = { id: string; name: string; items: Item[] };

export function WatchlistsView() {
  const [lists, setLists] = useState<Watchlist[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newListName, setNewListName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/watchlists");
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { watchlists: Watchlist[] };
      setLists(data.watchlists);
      setActiveId((cur) => cur ?? data.watchlists[0]?.id ?? null);
    } catch {
      setError("Couldn't load your watchlists. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch the user's watchlists once on mount. Setting the loading flag here
    // is the intended effect behavior (syncing with the API), which the lint
    // heuristic over-flags.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  const active = lists.find((l) => l.id === activeId) ?? null;

  async function createList(e: React.FormEvent) {
    e.preventDefault();
    const name = newListName.trim();
    if (!name) return;
    setCreating(true);
    const res = await apiFetch("/api/watchlists", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setCreating(false);
    if (res.ok) {
      const { watchlist } = (await res.json()) as { watchlist: Watchlist };
      setLists((prev) => [...prev, { ...watchlist, items: watchlist.items ?? [] }]);
      setActiveId(watchlist.id);
      setNewListName("");
    }
  }

  async function deleteList(id: string) {
    setBusy(true);
    const res = await apiFetch(`/api/watchlists/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) {
      setLists((prev) => {
        const next = prev.filter((l) => l.id !== id);
        if (activeId === id) setActiveId(next[0]?.id ?? null);
        return next;
      });
    }
  }

  async function addSymbol(e: React.FormEvent) {
    e.preventDefault();
    if (!active) return;
    const symbol = newSymbol.trim().toUpperCase();
    if (!symbol) return;
    setBusy(true);
    const res = await apiFetch(`/api/watchlists/${active.id}/items`, {
      method: "POST",
      body: JSON.stringify({ symbol }),
    });
    setBusy(false);
    if (res.ok) {
      const { item } = (await res.json()) as { item: Item };
      setLists((prev) =>
        prev.map((l) =>
          l.id === active.id ? { ...l, items: [...l.items, item] } : l
        )
      );
      setNewSymbol("");
    }
  }

  async function removeItem(itemId: string) {
    if (!active) return;
    const listId = active.id;
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((i) => i.id !== itemId) }
          : l
      )
    );
    await apiFetch(`/api/watchlists/${listId}/items/${itemId}`, {
      method: "DELETE",
    });
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <div className="h-64 animate-pulse rounded-xl bg-card lg:col-span-1" />
        <div className="h-64 animate-pulse rounded-xl bg-card lg:col-span-3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card py-16 text-center">
        <Icon
          icon="mdi:alert-circle-outline"
          className="mx-auto size-8 text-bear"
        />
        <p className="mt-3 text-sm text-foreground">{error}</p>
        <Button size="sm" className="mt-3" onClick={() => void load()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
      {/* Watchlist selector */}
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            My Watchlists
          </h2>
          <ul className="space-y-1.5">
            {lists.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(w.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                    activeId === w.id
                      ? "bg-primary/10 ring-1 ring-primary/30"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon
                    icon="mdi:heart-outline"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {w.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {w.items.length} assets
                    </span>
                  </span>
                </button>
              </li>
            ))}
            {lists.length === 0 ? (
              <li className="px-2.5 py-6 text-center text-xs text-muted-foreground">
                No watchlists yet. Create one below.
              </li>
            ) : null}
          </ul>

          <form onSubmit={createList} className="mt-3 flex gap-2">
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New watchlist name"
              className="h-8 text-xs"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 shrink-0 px-2.5"
              disabled={creating || !newListName.trim()}
            >
              <Icon icon="mdi:plus" className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Asset table */}
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-border bg-card p-4">
          {active ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {active.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {active.items.length} assets
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <form onSubmit={addSymbol} className="flex items-center gap-2">
                    <div className="relative">
                      <Icon
                        icon="mdi:magnify"
                        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        value={newSymbol}
                        onChange={(e) => setNewSymbol(e.target.value)}
                        placeholder="Add symbol..."
                        className="h-8 w-40 bg-secondary/60 pl-8 text-xs"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 gap-1.5"
                      disabled={busy || !newSymbol.trim()}
                    >
                      <Icon icon="mdi:plus" className="size-4" />
                      Add
                    </Button>
                  </form>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 hover:text-bear"
                    onClick={() => void deleteList(active.id)}
                    disabled={busy}
                  >
                    <Icon icon="mdi:delete-outline" className="size-4" />
                    Delete list
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">Symbol</th>
                      <th className="py-2 pr-3 text-right font-medium">Price</th>
                      <th className="py-2 pr-3 text-right font-medium">
                        Change
                      </th>
                      <th className="py-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.items.map((it) => (
                      <tr key={it.id} className="border-t border-border">
                        <td className="py-2.5 pr-3 font-medium text-foreground">
                          {it.symbol}
                        </td>
                        <td className="py-2.5 pr-3 text-right text-muted-foreground">
                          —
                        </td>
                        <td className="py-2.5 pr-3 text-right text-muted-foreground">
                          —
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            type="button"
                            aria-label={`Remove ${it.symbol}`}
                            onClick={() => void removeItem(it.id)}
                            className="ml-auto flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-bear"
                          >
                            <Icon icon="mdi:delete-outline" className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {active.items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-10 text-center text-xs text-muted-foreground"
                        >
                          No symbols yet. Add one above.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                Your lists and symbols are saved to your account. Live prices
                require a connected market-data provider.
              </p>
            </>
          ) : (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Select or create a watchlist to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
