"use client";

import { useState } from "react";
import { articleCategories } from "@/lib/articles-data";
import { cn } from "@/lib/utils";

export function CategoryTabs() {
  const [active, setActive] = useState<(typeof articleCategories)[number]>("All");

  return (
    <div className="flex gap-1.5 overflow-x-auto border-b border-border pb-3">
      {articleCategories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setActive(c)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            active === c
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
