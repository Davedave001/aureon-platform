"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { dicebearAvatar } from "@/lib/images";
import { categories } from "@/lib/community-data";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  communityKey: string;
  title: string;
  body: string;
  createdAt: string;
  author: string;
  votes: number;
  comments: number;
  votedByMe: boolean;
  mine: boolean;
};

type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: string;
  mine: boolean;
};

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(iso).toLocaleDateString();
}

export function LiveFeed({ filterCommunity }: { filterCommunity?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [community, setCommunity] = useState<string>(
    filterCommunity ?? categories[0].name
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);

  // Keep the create-post community in sync with the browsed one (render-time
  // adjustment — no effect needed).
  const [prevFilter, setPrevFilter] = useState(filterCommunity);
  if (filterCommunity !== prevFilter) {
    setPrevFilter(filterCommunity);
    if (filterCommunity) setCommunity(filterCommunity);
  }

  async function load(forCommunity?: string) {
    setLoading(true);
    try {
      const url = forCommunity
        ? `/api/posts?community=${encodeURIComponent(forCommunity)}`
        : "/api/posts";
      const res = await apiFetch(url);
      if (res.ok) {
        const data = (await res.json()) as { posts: Post[] };
        setPosts(data.posts);
      }
    } finally {
      setLoading(false);
    }
  }

  // Refetch when the selected community changes (fetch-on-change effect).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(filterCommunity);
  }, [filterCommunity]);

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setPosting(true);
    const res = await apiFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ communityKey: community, title, body }),
    });
    setPosting(false);
    if (res.ok) {
      const { post } = (await res.json()) as { post: Post };
      setPosts((prev) => [post, ...prev]);
      setTitle("");
      setBody("");
      setShowForm(false);
    }
  }

  async function toggleVote(post: Post) {
    // optimistic
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? {
              ...p,
              votedByMe: !p.votedByMe,
              votes: p.votes + (p.votedByMe ? -1 : 1),
            }
          : p
      )
    );
    const res = await apiFetch(`/api/posts/${post.id}/vote`, { method: "POST" });
    if (res.ok) {
      const { votes, votedByMe } = (await res.json()) as {
        votes: number;
        votedByMe: boolean;
      };
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, votes, votedByMe } : p))
      );
    }
  }

  async function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await apiFetch(`/api/posts/${id}`, { method: "DELETE" });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          Community Feed
        </h2>
        <Button size="sm" className="gap-1.5" onClick={() => setShowForm((v) => !v)}>
          <Icon icon={showForm ? "mdi:close" : "mdi:plus"} className="size-4" />
          {showForm ? "Cancel" : "Create Post"}
        </Button>
      </div>

      {showForm ? (
        <form
          onSubmit={createPost}
          className="mb-4 space-y-2.5 rounded-lg border border-border p-3"
        >
          <select
            className={selectClass}
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
          <textarea
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your analysis or question…"
            className={selectClass}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={posting || !title.trim() || !body.trim()}
            >
              {posting ? "Posting…" : "Post"}
            </Button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          <div className="h-24 animate-pulse rounded-lg bg-secondary/40" />
          <div className="h-24 animate-pulse rounded-lg bg-secondary/40" />
        </div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No posts yet. Be the first to start a discussion.
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <PostRow
              key={p.id}
              post={p}
              onVote={() => void toggleVote(p)}
              onDelete={() => void deletePost(p.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function PostRow({
  post,
  onVote,
  onDelete,
}: {
  post: Post;
  onVote: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [count, setCount] = useState(post.comments);

  async function toggleComments() {
    const next = !open;
    setOpen(next);
    if (next && !loaded) {
      const res = await apiFetch(`/api/posts/${post.id}/comments`);
      if (res.ok) {
        const data = (await res.json()) as { comments: Comment[] };
        setComments(data.comments);
        setLoaded(true);
      }
    }
  }

  async function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await apiFetch(`/api/posts/${post.id}/comments`, {
      method: "POST",
      body: JSON.stringify({ body: text }),
    });
    if (res.ok) {
      const { comment } = (await res.json()) as { comment: Comment };
      setComments((prev) => [...prev, comment]);
      setCount((c) => c + 1);
      setText("");
    }
  }

  return (
    <li className="rounded-lg border border-border bg-card p-3.5">
      <div className="flex items-start gap-3">
        <Avatar className="size-9">
          <AvatarImage src={dicebearAvatar(post.author)} alt={post.author} />
          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {post.author}
            </span>
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-[11px] text-primary"
            >
              {post.communityKey}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {timeAgo(post.createdAt)}
            </span>
            {post.mine ? (
              <button
                type="button"
                aria-label="Delete post"
                onClick={onDelete}
                className="ml-auto text-muted-foreground hover:text-bear"
              >
                <Icon icon="mdi:delete-outline" className="size-4" />
              </button>
            ) : null}
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">
            {post.title}
          </p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
            {post.body}
          </p>

          <div className="mt-2.5 flex items-center gap-5 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={onVote}
              className={cn(
                "flex items-center gap-1 transition-colors hover:text-primary",
                post.votedByMe && "text-primary"
              )}
            >
              <Icon
                icon={
                  post.votedByMe
                    ? "mdi:arrow-up-bold-circle"
                    : "mdi:arrow-up-bold-circle-outline"
                }
                className="size-4"
              />
              {post.votes}
            </button>
            <button
              type="button"
              onClick={() => void toggleComments()}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Icon icon="mdi:comment-outline" className="size-4" />
              {count}
            </button>
          </div>

          {open ? (
            <div className="mt-3 space-y-2.5 border-t border-border pt-3">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={dicebearAvatar(c.author)} alt={c.author} />
                    <AvatarFallback className="text-[9px]">
                      {c.author.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs">
                      <span className="font-medium text-foreground">
                        {c.author}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        · {timeAgo(c.createdAt)}
                      </span>
                    </p>
                    <p className="text-xs text-foreground/90">{c.body}</p>
                  </div>
                </div>
              ))}
              {loaded && comments.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No comments yet.
                </p>
              ) : null}
              <form onSubmit={addComment} className="flex gap-2 pt-1">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment…"
                  className="h-8 text-xs"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 shrink-0 px-2.5"
                  disabled={!text.trim()}
                >
                  Reply
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
