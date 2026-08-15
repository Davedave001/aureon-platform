import { AppShell } from "@/components/layout/app-shell";
import { CourseDetail } from "@/components/academy/course-detail";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Academy" subtitle="Course">
      <CourseDetail courseId={id} />
    </AppShell>
  );
}
