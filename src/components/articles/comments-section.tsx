import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { article, comments } from "@/lib/articles-data";
import { dicebearAvatar } from "@/lib/images";

export function CommentsSection() {
  return (
    <div className="mt-5 rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Comments ({article.comments})
        </h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <Icon icon="mdi:sort-variant" className="size-4" />
          Newest
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2.5">
        <Avatar className="size-8">
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <Input placeholder="Join the conversation..." className="flex-1" />
      </div>

      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.author} className="flex items-start gap-2.5">
            <Avatar className="size-8">
              <AvatarImage src={dicebearAvatar(c.seed)} alt={c.author} />
              <AvatarFallback>{c.author.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">
                  {c.author}
                </span>
                {c.badge ? (
                  <Badge
                    variant="outline"
                    className="border-gold/30 bg-gold/10 text-[11px] text-gold"
                  >
                    {c.badge}
                  </Badge>
                ) : null}
                <span className="text-xs text-muted-foreground">
                  {c.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/90">{c.text}</p>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground">
                  <Icon icon="mdi:reply" className="size-3.5" />
                  Reply
                </button>
                <button className="flex items-center gap-1 hover:text-foreground">
                  <Icon icon="mdi:thumb-up-outline" className="size-3.5" />
                  {c.likes}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
