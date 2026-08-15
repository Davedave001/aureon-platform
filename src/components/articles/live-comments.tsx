"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { dicebearAvatar } from "@/lib/images";
import { initialsOf } from "@/lib/user-display";

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: string;
  mine: boolean;
};

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString();
}

export function LiveArticleComments({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/articles/${slug}/comments`);
      if (res.ok) {
        const data = (await res.json()) as { comments: Comment[] };
        setComments(data.comments);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    const res = await apiFetch(`/api/articles/${slug}/comments`, {
      method: "POST",
      body: JSON.stringify({ body: text }),
    });
    setPosting(false);
    if (res.ok) {
      const { comment } = (await res.json()) as { comment: Comment };
      setComments((prev) => [comment, ...prev]);
      setText("");
    }
  }

  const meInitials = initialsOf(session?.user?.name, session?.user?.email);

  return (
    <div
      id="comments"
      className="mt-5 scroll-mt-20 rounded-xl border border-border bg-card p-5"
    >
      <h2 className="mb-4 text-sm font-semibold text-foreground">
        Comments ({loading ? "…" : comments.length})
      </h2>

      <form onSubmit={submit} className="mb-4 flex items-center gap-2.5">
        <Avatar className="size-8">
          <AvatarImage
            src={dicebearAvatar(session?.user?.email ?? "me")}
            alt="You"
          />
          <AvatarFallback>{meInitials}</AvatarFallback>
        </Avatar>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Join the conversation..."
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={posting || !text.trim()}>
          {posting ? "Posting…" : "Post"}
        </Button>
      </form>

      {loading ? (
        <p className="py-6 text-center text-xs text-muted-foreground">
          Loading…
        </p>
      ) : comments.length === 0 ? (
        <p className="py-6 text-center text-xs text-muted-foreground">
          Be the first to comment.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex items-start gap-2.5">
              <Avatar className="size-8">
                <AvatarImage src={dicebearAvatar(c.author)} alt={c.author} />
                <AvatarFallback>{c.author.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-foreground">
                    {c.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(c.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground/90">{c.body}</p>
              </div>
              {c.mine ? (
                <Icon
                  icon="mdi:account-circle-outline"
                  className="size-4 shrink-0 text-primary"
                />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
