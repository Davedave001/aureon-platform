"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/shared/section-card";
import { quickActions } from "@/lib/ai-solutions-data";

export function AiChatAssistant() {
  const [message, setMessage] = useState("");

  return (
    <SectionCard title="AI Chat Assistant">
      <div className="mb-3 -mt-1 flex items-center gap-1.5 text-xs text-bull">
        <span className="size-1.5 rounded-full bg-bull" />
        Online
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Your AI copilot for smarter business decisions.
      </p>

      <ul className="space-y-2">
        {quickActions.map((a) => (
          <li key={a.title}>
            <button
              type="button"
              className="flex w-full items-start gap-2.5 rounded-lg border border-border p-2.5 text-left transition-colors hover:bg-accent"
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
            </button>
          </li>
        ))}
      </ul>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1"
        />
        <Button type="submit" size="icon" aria-label="Send message">
          <Icon icon="mdi:send" className="size-4" />
        </Button>
      </form>
    </SectionCard>
  );
}
