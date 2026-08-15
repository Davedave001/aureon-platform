"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Course = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  level: string;
  coverImage: string | null;
  published: boolean;
  lessonCount: number;
};

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

const levelStyle: Record<string, string> = {
  Beginner: "border-bull/30 bg-bull/10 text-bull",
  Intermediate: "border-gold/30 bg-gold/10 text-gold",
  Advanced: "border-bear/30 bg-bear/10 text-bear",
};

export function AcademyView() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Forex");
  const [level, setLevel] = useState("Beginner");
  const [coverImage, setCoverImage] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await apiFetch("/api/courses");
    if (res.ok) {
      const data = (await res.json()) as { isAdmin: boolean; courses: Course[] };
      setCourses(data.courses);
      setIsAdmin(data.isAdmin);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const res = await apiFetch("/api/courses", {
      method: "POST",
      body: JSON.stringify({ title, description, category, level, coverImage }),
    });
    setSaving(false);
    if (res.ok) {
      setTitle("");
      setDescription("");
      setCoverImage("");
      setCreating(false);
      await load();
    }
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      {isAdmin ? (
        <div className="flex justify-end">
          <Button size="sm" className="gap-1.5" onClick={() => setCreating((v) => !v)}>
            <Icon icon={creating ? "mdi:close" : "mdi:plus"} className="size-4" />
            {creating ? "Cancel" : "New Course"}
          </Button>
        </div>
      ) : null}

      {isAdmin && creating ? (
        <SectionCard title="Create Course">
          <form onSubmit={createCourse} className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title (e.g. Forex Foundations)"
            />
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className={selectClass}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <select
                className={selectClass}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["Forex", "Crypto", "Stocks", "Risk Management", "Psychology"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  )
                )}
              </select>
              <select
                className={selectClass}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover image URL (optional)"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={saving || !title.trim()}>
                {saving ? "Creating…" : "Create (draft)"}
              </Button>
            </div>
          </form>
        </SectionCard>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card py-16 text-center">
          <Icon icon="mdi:school-outline" className="size-9 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">No courses yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            {isAdmin
              ? "Create your first course, then add lessons with your video URLs."
              : "Courses are on the way. Check back soon."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/academy/${c.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-secondary">
                {c.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.coverImage}
                    alt={c.title}
                    className="size-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="mdi:play-circle-outline"
                    className="size-12 text-muted-foreground group-hover:text-primary"
                  />
                )}
                {!c.published ? (
                  <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    Draft
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={levelStyle[c.level] ?? levelStyle.Beginner}
                  >
                    {c.level}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {c.category}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">{c.title}</p>
                {c.description ? (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {c.description}
                  </p>
                ) : null}
                <p className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Icon icon="mdi:play-box-multiple-outline" className="size-3.5" />
                  {c.lessonCount} {c.lessonCount === 1 ? "lesson" : "lessons"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
