"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { adminNav, systemStatus } from "@/lib/admin-data";

function NavGroup({ title, items }: { title: string; items: { label: string; href: string; icon: string }[] }) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Icon icon={item.icon} className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function AdminSidebarContent() {
  const allOperational = systemStatus.every((s) => s.status === "Operational");

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <NavGroup title="Management" items={adminNav.management} />
        <NavGroup title="Content" items={adminNav.content} />
        <NavGroup title="Finance" items={adminNav.finance} />
        <NavGroup title="System" items={adminNav.system} />
      </nav>

      <div className="space-y-3 p-3">
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-2">
            <span
              className={
                "size-2 rounded-full " + (allOperational ? "bg-bull" : "bg-gold")
              }
            />
            <span className="text-xs font-medium text-foreground">
              {allOperational ? "All Systems Operational" : "Degraded Performance"}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Last checked: 2 mins ago
          </p>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border p-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-foreground">
              Admin
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Super Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
      <AdminSidebarContent />
    </aside>
  );
}
