"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiFetch } from "@/lib/api";
import { initialsOf, roleLabel } from "@/lib/user-display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Topbar({
  title,
  subtitle,
  userName,
  userRole,
  userInitials,
  nav,
}: {
  title: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  nav?: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    let active = true;
    apiFetch("/api/notifications")
      .then(async (res) => {
        if (!active || !res.ok) return;
        const data = (await res.json()) as { unread?: number };
        setNotificationCount(data.unread ?? 0);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const displayName =
    userName ?? session?.user?.name ?? session?.user?.email ?? "Account";
  const displayRole = userRole ?? roleLabel(session?.user?.role);
  const displayInitials =
    userInitials ?? initialsOf(session?.user?.name, session?.user?.email);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("q");
    const q = typeof value === "string" ? value.trim() : "";
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur supports-backdrop-filter:bg-background/70 sm:gap-4 sm:px-6">
      {nav}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>

      <form
        onSubmit={handleSearch}
        role="search"
        className="relative hidden w-full max-w-sm md:block"
      >
        <Icon
          icon="mdi:magnify"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          name="q"
          type="search"
          placeholder="Search..."
          className="bg-secondary/60 pr-14 pl-9"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </form>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <Tooltip>
          <TooltipTrigger
            aria-label="Messages (coming soon)"
            className="relative flex size-9 cursor-not-allowed items-center justify-center rounded-full text-muted-foreground/60"
          >
            <Icon icon="mdi:message-text-outline" className="size-[18px]" />
          </TooltipTrigger>
          <TooltipContent>Messages — coming soon</TooltipContent>
        </Tooltip>
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon icon="mdi:bell-outline" className="size-[18px]" />
          {notificationCount > 0 ? (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          ) : null}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors hover:bg-accent">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                {displayInitials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block max-w-[10rem] truncate text-sm font-medium text-foreground">
                {displayName}
              </span>
              <span className="block text-[11px] text-gold">
                {displayRole}
              </span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem render={<Link href="/profile" />}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/settings" />}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/billing" />}>
                Billing Centre
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
