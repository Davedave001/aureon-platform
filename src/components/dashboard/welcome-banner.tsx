"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WelcomeBanner() {
  const { data: session } = useSession();
  const firstName =
    session?.user?.name?.trim().split(/\s+/)[0] ??
    session?.user?.email?.split("@")[0] ??
    "there";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-black p-6 shadow-[inset_0_1px_0_rgba(233,219,180,0.08),0_20px_40px_-20px_rgba(0,0,0,0.8)] sm:p-8"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Crect width='28' height='28' fill='none' stroke='rgba(233,219,180,0.08)' stroke-width='1'/%3E%3C/svg%3E\")",
      }}
    >
      {/* soft gold glow, top-right — radial, not a linear color-shift across the whole panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      {/* inner top highlight edge, like light catching a lacquered edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40"
      />

      {/* The banner background is always black, so its text stays light in
          both themes (do not use theme-aware foreground tokens here). */}
      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="text-primary italic">{firstName}</span> 👋
          </h2>
          <p className="mt-1.5 max-w-md text-sm text-white/70">
            Stay informed. Stay ahead. Let AI power your decisions.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/ai-solutions?tab=news"
              className={cn(buttonVariants({ variant: "default" }), "shadow-md")}
            >
              Explore News Terminal
            </Link>
            <Link
              href="/ai-solutions"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "gap-1.5 border-primary/30 bg-transparent text-white hover:bg-primary/10 hover:text-white"
              )}
            >
              <Icon icon="mdi:creation" className="size-4" />
              Ask AI Assistant
            </Link>
          </div>
        </div>

        <div className="hidden size-20 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white/[0.03] text-primary lg:flex">
          <Icon icon="mdi:chart-line-variant" className="size-9" />
        </div>
      </div>
    </div>
  );
}
