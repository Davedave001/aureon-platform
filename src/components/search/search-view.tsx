"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import {
  searchCategories,
  searchResults,
  recentSearches,
  trendingSearches,
  type SearchCategory,
} from "@/lib/search-data";
import { cn } from "@/lib/utils";

export function SearchView() {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<SearchCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchResults.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.meta.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const counts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = searchResults.filter(
      (r) =>
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.meta.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
    const map: Record<string, number> = { All: base.length };
    for (const r of base) map[r.category] = (map[r.category] ?? 0) + 1;
    return map;
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Search input */}
      <div className="relative">
        <Icon
          icon="mdi:magnify"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search communities, articles, events, mentors, projects..."
          className="h-12 bg-card pr-10 pl-11 text-base"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Icon icon="mdi:close" className="size-4" />
          </button>
        ) : null}
      </div>

      {!hasQuery ? (
        /* Empty state */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-sm font-semibold text-foreground">
              Recent Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Icon icon="mdi:fire" className="size-4 text-primary" />
              Trending
            </p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-foreground transition-colors hover:bg-primary/10"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Category filters */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-border pb-3">
            {searchCategories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  category === c.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon icon={c.icon} className="size-4" />
                {c.key}
                {counts[c.key] ? (
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-[11px]",
                      category === c.key
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {counts[c.key]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Results */}
          <p className="text-xs text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
            <span className="text-foreground">&ldquo;{query}&rdquo;</span>
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card py-16 text-center">
              <Icon
                icon="mdi:text-search"
                className="mx-auto size-8 text-muted-foreground"
              />
              <p className="mt-3 text-sm font-medium text-foreground">
                No results found
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            <ul className="overflow-hidden rounded-xl border border-border bg-card">
              {filtered.map((r, i) => (
                <li key={i}>
                  <Link
                    href={r.href}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon icon={r.icon} className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {r.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.meta}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                      {r.category}
                    </span>
                    <Icon
                      icon="mdi:arrow-top-right"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                  </Link>
                  {i < filtered.length - 1 ? (
                    <div className="mx-4 border-t border-border" />
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
