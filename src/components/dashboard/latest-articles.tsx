import { SectionCard } from "@/components/shared/section-card";

const articles = [
  {
    title: "How Quantum Computing Will Affect Blockchain in the Next 5 Years",
    meta: "May 20, 2024 · 8 min read",
  },
  {
    title: "Top 5 AI Tools Every Trader Should Know in 2024",
    meta: "May 18, 2024 · 6 min read",
  },
];

export function LatestArticles() {
  return (
    <SectionCard title="Latest Articles" viewAllHref="/articles">
      <ul className="space-y-3.5">
        {articles.map((a) => (
          <li key={a.title}>
            <p className="text-sm leading-snug font-medium text-foreground">
              {a.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
