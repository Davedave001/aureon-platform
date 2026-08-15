import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArticleActions } from "./article-actions";
import { article } from "@/lib/articles-data";
import { dicebearAvatar, stockPhotos } from "@/lib/images";

export function ArticleView() {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <Link
          href="/articles"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Icon icon="mdi:arrow-left" className="size-4" />
          Back to Articles
        </Link>
        <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
          {article.category}
        </Badge>
      </div>

      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {article.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{article.subtitle}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarImage src={dicebearAvatar(article.authorSeed)} alt={article.author} />
            <AvatarFallback>{article.author.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium text-foreground">
              {article.author}
            </span>
            {article.verified ? (
              <Icon icon="mdi:check-decagram" className="size-4 text-primary" />
            ) : null}
          </div>
          <span className="text-xs text-muted-foreground">
            {article.date} · {article.readTime}
          </span>
        </div>

        <ArticleActions
          slug="ai-transforming-financial-markets-2024"
          likes={article.likes}
          comments={article.comments}
        />
      </div>

      <div className="relative mt-4 aspect-[16/7] w-full overflow-hidden rounded-lg">
        <Image
          src={stockPhotos.aiRobotMarkets}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      <div className="mt-5 text-sm leading-relaxed text-foreground/90">
        <p>{article.intro}</p>
        {article.sections.map((s) => (
          <div key={s.heading} className="mt-5">
            <h2 className="text-lg font-semibold text-foreground">
              {s.heading}
            </h2>
            <p className="mt-2">{s.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
