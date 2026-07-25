"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { feedFilters, feedPosts } from "@/lib/community-data";
import { PostCard } from "./post-card";

export function Feed() {
  const [filter, setFilter] = useState<(typeof feedFilters)[number]>("All");

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          Community Feed
        </h2>
        <Button size="sm" className="gap-1.5">
          <Icon icon="mdi:plus" className="size-4" />
          Create Post
        </Button>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto">
        {feedFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {feedPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
}
