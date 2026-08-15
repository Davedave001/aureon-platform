"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/shared/section-card";
import { apiFetch } from "@/lib/api";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  duration: string | null;
  order: number;
  completed: boolean;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  level: string;
  coverImage: string | null;
  published: boolean;
  lessons: Lesson[];
};

const selectClass =
  "w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

export function CourseDetail({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  // admin lesson form
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lTitle, setLTitle] = useState("");
  const [lUrl, setLUrl] = useState("");
  const [lDuration, setLDuration] = useState("");
  const [lDesc, setLDesc] = useState("");
  const [savingLesson, setSavingLesson] = useState(false);

  async function load() {
    const res = await apiFetch(`/api/courses/${courseId}`);
    if (res.ok) {
      const data = (await res.json()) as { isAdmin: boolean; course: Course };
      setCourse(data.course);
      setIsAdmin(data.isAdmin);
      setActiveId((prev) => prev ?? data.course.lessons[0]?.id ?? null);
    } else {
      setCourse(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const active = course?.lessons.find((l) => l.id === activeId) ?? null;
  const completedCount = course?.lessons.filter((l) => l.completed).length ?? 0;
  const total = course?.lessons.length ?? 0;
  const pct = total ? Math.round((completedCount / total) * 100) : 0;

  async function toggleComplete(lessonId: string) {
    // optimistic
    setCourse((c) =>
      c
        ? {
            ...c,
            lessons: c.lessons.map((l) =>
              l.id === lessonId ? { ...l, completed: !l.completed } : l
            ),
          }
        : c
    );
    await apiFetch(`/api/lessons/${lessonId}/progress`, { method: "POST" });
  }

  async function addLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!lTitle.trim() || !lUrl.trim()) return;
    setSavingLesson(true);
    const res = await apiFetch(`/api/courses/${courseId}/lessons`, {
      method: "POST",
      body: JSON.stringify({
        title: lTitle,
        videoUrl: lUrl,
        duration: lDuration,
        description: lDesc,
      }),
    });
    setSavingLesson(false);
    if (res.ok) {
      setLTitle("");
      setLUrl("");
      setLDuration("");
      setLDesc("");
      setShowLessonForm(false);
      await load();
    }
  }

  async function deleteLesson(lessonId: string) {
    await apiFetch(`/api/lessons/${lessonId}`, { method: "DELETE" });
    await load();
  }

  async function togglePublish() {
    if (!course) return;
    const res = await apiFetch(`/api/courses/${courseId}`, {
      method: "PATCH",
      body: JSON.stringify({ published: !course.published }),
    });
    if (res.ok) setCourse({ ...course, published: !course.published });
  }

  async function deleteCourse() {
    await apiFetch(`/api/courses/${courseId}`, { method: "DELETE" });
    router.push("/academy");
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-card" />;
  }
  if (!course) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <Icon icon="mdi:alert-circle-outline" className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Course not found.</p>
        <Link href="/academy" className="text-xs font-medium text-primary hover:underline">
          Back to Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/academy"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Icon icon="mdi:arrow-left" className="size-3.5" />
            Academy
          </Link>
          <h1 className="mt-1 text-xl font-bold text-foreground">{course.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              {course.level}
            </Badge>
            <span>{course.category}</span>
            <span>· {total} lessons</span>
          </div>
        </div>

        {isAdmin ? (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => void togglePublish()}>
              {course.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-bear hover:text-bear"
              onClick={() => void deleteCourse()}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>

      {total > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-border bg-black">
              {active ? (
                <video
                  key={active.id}
                  src={active.videoUrl}
                  controls
                  controlsList="nodownload"
                  poster={course.coverImage ?? undefined}
                  className="aspect-video w-full bg-black"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="flex aspect-video items-center justify-center text-white/60">
                  Select a lesson
                </div>
              )}
            </div>
            {active ? (
              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {active.title}
                    </h2>
                    {active.duration ? (
                      <p className="text-xs text-muted-foreground">{active.duration}</p>
                    ) : null}
                  </div>
                  <Button
                    size="sm"
                    variant={active.completed ? "outline" : "default"}
                    className="gap-1.5"
                    onClick={() => void toggleComplete(active.id)}
                  >
                    <Icon
                      icon={active.completed ? "mdi:check-circle" : "mdi:check-circle-outline"}
                      className="size-4"
                    />
                    {active.completed ? "Completed" : "Mark complete"}
                  </Button>
                </div>
                {active.description ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                    {active.description}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Lesson list */}
          <div className="flex flex-col gap-4">
            <SectionCard title={`Progress — ${pct}%`}>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {completedCount} of {total} lessons complete
              </p>
            </SectionCard>

            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-3">
                <p className="text-sm font-semibold text-foreground">Lessons</p>
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setShowLessonForm((v) => !v)}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <Icon icon={showLessonForm ? "mdi:close" : "mdi:plus"} className="size-3.5" />
                    {showLessonForm ? "Cancel" : "Add"}
                  </button>
                ) : null}
              </div>

              {isAdmin && showLessonForm ? (
                <form onSubmit={addLesson} className="space-y-2 border-b border-border p-3">
                  <Input value={lTitle} onChange={(e) => setLTitle(e.target.value)} placeholder="Lesson title" className="h-8 text-xs" />
                  <Input value={lUrl} onChange={(e) => setLUrl(e.target.value)} placeholder="Direct video URL (.mp4)" className="h-8 text-xs" />
                  <Input value={lDuration} onChange={(e) => setLDuration(e.target.value)} placeholder="Duration (e.g. 12:30)" className="h-8 text-xs" />
                  <textarea rows={2} value={lDesc} onChange={(e) => setLDesc(e.target.value)} placeholder="Description (optional)" className={selectClass} />
                  <Button type="submit" size="sm" className="w-full" disabled={savingLesson || !lTitle.trim() || !lUrl.trim()}>
                    {savingLesson ? "Adding…" : "Add lesson"}
                  </Button>
                </form>
              ) : null}

              <ul className="max-h-[480px] overflow-y-auto p-2">
                {course.lessons.map((l, i) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(l.id)}
                      className={
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors " +
                        (l.id === activeId ? "bg-primary/10" : "hover:bg-accent")
                      }
                    >
                      <Icon
                        icon={
                          l.completed
                            ? "mdi:check-circle"
                            : l.id === activeId
                              ? "mdi:play-circle"
                              : "mdi:play-circle-outline"
                        }
                        className={
                          "size-5 shrink-0 " +
                          (l.completed ? "text-bull" : "text-muted-foreground")
                        }
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-foreground">
                          {i + 1}. {l.title}
                        </span>
                        {l.duration ? (
                          <span className="block text-[11px] text-muted-foreground">
                            {l.duration}
                          </span>
                        ) : null}
                      </span>
                      {isAdmin ? (
                        <Icon
                          icon="mdi:delete-outline"
                          className="size-4 shrink-0 text-muted-foreground hover:text-bear"
                          onClick={(e) => {
                            e.stopPropagation();
                            void deleteLesson(l.id);
                          }}
                        />
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card py-16 text-center">
          <Icon icon="mdi:play-box-outline" className="size-9 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">No lessons yet</p>
          <p className="text-xs text-muted-foreground">
            {isAdmin ? "Use “Add” to create your first lesson." : "Lessons are coming soon."}
          </p>
          {isAdmin ? (
            <Button size="sm" className="mt-2" onClick={() => setShowLessonForm(true)}>
              Add a lesson
            </Button>
          ) : null}
        </div>
      )}

      {/* admin lesson form when there are no lessons yet */}
      {isAdmin && total === 0 && showLessonForm ? (
        <SectionCard title="Add Lesson">
          <form onSubmit={addLesson} className="space-y-2.5">
            <Input value={lTitle} onChange={(e) => setLTitle(e.target.value)} placeholder="Lesson title" />
            <Input value={lUrl} onChange={(e) => setLUrl(e.target.value)} placeholder="Direct video URL (.mp4)" />
            <Input value={lDuration} onChange={(e) => setLDuration(e.target.value)} placeholder="Duration (e.g. 12:30)" />
            <textarea rows={2} value={lDesc} onChange={(e) => setLDesc(e.target.value)} placeholder="Description (optional)" className={selectClass} />
            <Button type="submit" size="sm" disabled={savingLesson || !lTitle.trim() || !lUrl.trim()}>
              {savingLesson ? "Adding…" : "Add lesson"}
            </Button>
          </form>
        </SectionCard>
      ) : null}
    </div>
  );
}
