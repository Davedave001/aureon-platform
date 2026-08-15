import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { quickActions } from "@/lib/ai-solutions-data";

export function AiChatAssistant() {
  return (
    <SectionCard title="AI Chat Assistant">
      <div className="mb-3 -mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-muted-foreground/50" />
        Coming soon
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Your AI copilot for smarter business decisions. In the meantime, use
        “New AI Solution Request” to tell us what you need.
      </p>

      <ul className="space-y-2">
        {quickActions.map((a) => (
          <li
            key={a.title}
            className="flex w-full items-start gap-2.5 rounded-lg border border-border p-2.5 text-left"
          >
            <Icon icon={a.icon} className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="min-w-0">
              <span className="block text-xs font-medium text-foreground">
                {a.title}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {a.meta}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex gap-2">
        <Input placeholder="Ask anything..." className="flex-1" disabled />
        <Button size="icon" aria-label="Send message" disabled title="Coming soon">
          <Icon icon="mdi:send" className="size-4" />
        </Button>
      </div>
    </SectionCard>
  );
}
