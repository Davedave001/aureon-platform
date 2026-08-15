import { redirect } from "next/navigation";

// News Terminal now lives inside the AI Solutions hub. Keep this route so
// existing links and bookmarks continue to work.
export default function NewsTerminalPage() {
  redirect("/ai-solutions?tab=news");
}
