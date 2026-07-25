import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { dicebearAvatar } from "@/lib/images";
import type { feedPosts } from "@/lib/community-data";

type Post = (typeof feedPosts)[number];

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <Avatar className="size-9">
          <AvatarImage src={dicebearAvatar(post.seed)} alt={post.author} />
          <AvatarFallback>{post.author.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {post.author}
            </span>
            {post.verified ? (
              <Icon icon="mdi:check-decagram" className="size-4 text-primary" />
            ) : null}
            {post.role ? (
              <Badge
                variant="outline"
                className="border-gold/30 bg-gold/10 text-[11px] text-gold"
              >
                {post.role}
              </Badge>
            ) : null}
            <span className="text-xs text-muted-foreground">{post.time}</span>
            {post.pinned ? (
              <Badge className="ml-auto gap-1 bg-primary/15 text-[11px] text-primary hover:bg-primary/15">
                <Icon icon="mdi:pin" className="size-3" />
                Pinned
              </Badge>
            ) : null}
          </div>

          <p className="mt-2 text-sm font-semibold text-foreground">
            {post.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{post.body}</p>

          {post.type === "poll" ? (
            <div className="mt-3 space-y-2">
              {post.options.map((o) => (
                <div key={o.label} className="relative overflow-hidden rounded-lg border border-border">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/15"
                    style={{ width: `${o.pct}%` }}
                  />
                  <div className="relative z-10 flex items-center justify-between px-3 py-2 text-sm">
                    <span className="text-foreground">{o.label}</span>
                    <span className="font-medium text-foreground">{o.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon icon="mdi:arrow-up-bold-circle-outline" className="size-4" />
              {post.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:comment-outline" className="size-4" />
              {post.comments}
            </span>
            {post.type === "poll" ? (
              <span className="flex items-center gap-1">
                <Icon icon="mdi:poll" className="size-4" />
                Vote
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Icon icon="mdi:share-variant-outline" className="size-4" />
                Share
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
