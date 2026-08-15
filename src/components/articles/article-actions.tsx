"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/**
 * Client-side engagement actions for an article. Save/Like persist in
 * localStorage (per browser) so the state survives reloads without a backend;
 * Share uses the Web Share API with a clipboard fallback; Comment scrolls to
 * the live comments section.
 */
export function ArticleActions({
  slug,
  likes,
  comments,
}: {
  slug: string;
  likes: number;
  comments: number;
}) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(localStorage.getItem(`article:${slug}:saved`) === "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(localStorage.getItem(`article:${slug}:liked`) === "1");
  }, [slug]);

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    localStorage.setItem(`article:${slug}:saved`, next ? "1" : "0");
  }

  function toggleLiked() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`article:${slug}:liked`, next ? "1" : "0");
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <button
        type="button"
        onClick={toggleSaved}
        className={cn(
          "flex items-center gap-1 hover:text-foreground",
          saved && "text-primary"
        )}
      >
        <Icon
          icon={saved ? "mdi:bookmark" : "mdi:bookmark-outline"}
          className="size-4"
        />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={toggleLiked}
        className={cn(
          "flex items-center gap-1 hover:text-foreground",
          liked && "text-bear"
        )}
      >
        <Icon
          icon={liked ? "mdi:heart" : "mdi:heart-outline"}
          className="size-4"
        />
        {likes + (liked ? 1 : 0)}
      </button>
      <a href="#comments" className="flex items-center gap-1 hover:text-foreground">
        <Icon icon="mdi:comment-outline" className="size-4" />
        {comments}
      </a>
      <button
        type="button"
        onClick={() => void share()}
        className="flex items-center gap-1 hover:text-foreground"
      >
        <Icon
          icon={copied ? "mdi:check" : "mdi:share-variant-outline"}
          className="size-4"
        />
        {copied ? "Copied" : "Share"}
      </button>
    </div>
  );
}
