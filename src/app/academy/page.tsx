import { AppShell } from "@/components/layout/app-shell";
import { AcademyView } from "@/components/academy/academy-view";

export default function AcademyPage() {
  return (
    <AppShell
      title="Academy"
      subtitle="Learn to trade — courses, lessons, and video tutorials."
    >
      <AcademyView />
    </AppShell>
  );
}
