import { AppShell } from "@/components/layout/app-shell";
import { CategoryTabs } from "@/components/articles/category-tabs";
import { ArticleView } from "@/components/articles/article-view";
import { CommentsSection } from "@/components/articles/comments-section";
import { AiSummary } from "@/components/articles/ai-summary";
import { RelatedArticles } from "@/components/articles/related-articles";
import { NewsletterWidget } from "@/components/articles/newsletter-widget";

export default function ArticlesPage() {
  return (
    <AppShell
      title="Articles & Knowledge Center"
      subtitle="Learn. Explore. Stay ahead."
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <CategoryTabs />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ArticleView />
            <CommentsSection />
          </div>

          <div className="flex flex-col gap-5">
            <AiSummary />
            <RelatedArticles />
            <NewsletterWidget />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
