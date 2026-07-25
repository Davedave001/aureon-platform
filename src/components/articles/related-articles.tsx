import Image from "next/image";
import { SectionCard } from "@/components/shared/section-card";
import { relatedArticles } from "@/lib/articles-data";
import { stockPhotos } from "@/lib/images";

export function RelatedArticles() {
  return (
    <SectionCard title="Related Articles" viewAllHref="/articles">
      <ul className="space-y-3">
        {relatedArticles.map((a) => (
          <li key={a.title} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={stockPhotos[a.image]}
                alt={a.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm leading-snug font-medium text-foreground">
                {a.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {a.readTime}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
